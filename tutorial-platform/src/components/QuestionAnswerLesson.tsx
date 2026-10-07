import { MarkdownLesson } from "./MarkdownLesson";
import type { CodingQuestionAnswer } from "../types/codingQuestionAnswer";

type MarkdownSegment = {
  type: "markdown";
  markdown: string;
};

type QuestionSegment = {
  type: "question";
  number: number;
  section: string;
  question: string;
  answer: string;
};

type QuestionAnswerSegment = MarkdownSegment | QuestionSegment;

type QuestionBlock = {
  number: number;
  section: string;
  lines: string[];
};

type AnswerBlock = {
  number: number;
  section: string;
  lines: string[];
};

function normalizeSectionName(value: string) {
  return value
    .toLowerCase()
    .replace(/^\s*\d+\s*(?:[-–—]\s*\d+)?\s*[.:)\s-]*/, "")
    .replace(/\([^)]*\)/g, " ")
    .replace(/\basynchronous\b/g, "async")
    .replace(/\bproblem\s+solving\b/g, " ")
    .replace(/\b(questions?|answers?|solutions?|tasks?|practice|style)\b/g, " ")
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

function getPairKey(section: string, number: number) {
  return `${section}::${number}`;
}

function splitPracticeMarkdown(markdown: string) {
  const segments: Array<MarkdownSegment | QuestionBlock> = [];
  let markdownLines: string[] = [];
  let question: QuestionBlock | null = null;
  let section = "";
  let insideCodeFence = false;

  const flushMarkdown = () => {
    const content = markdownLines.join("\n").trim();
    if (content) {
      segments.push({ type: "markdown", markdown: content });
    }
    markdownLines = [];
  };

  const flushQuestion = () => {
    if (question) {
      segments.push(question);
      question = null;
    }
  };

  for (const line of markdown.split(/\r?\n/)) {
    const isFence = /^\s*```/.test(line) || /^\d+\.\s+```/.test(line);

    if (!insideCodeFence) {
      const heading = /^(#{1,6})\s+(.+)$/.exec(line);
      if (heading) {
        flushQuestion();
        markdownLines.push(line);
        if (heading[1] === "##") {
          section = normalizeSectionName(heading[2]);
        }
        continue;
      }

      const numberedQuestion = /^(\d+)\.\s+(.+)$/.exec(line);
      if (numberedQuestion) {
        flushQuestion();
        flushMarkdown();
        question = {
          number: Number(numberedQuestion[1]),
          section,
          lines: [numberedQuestion[2]],
        };
        if (isFence) {
          insideCodeFence = !insideCodeFence;
        }
        continue;
      }
    }

    if (question) {
      question.lines.push(line);
    } else {
      markdownLines.push(line);
    }

    if (isFence) {
      insideCodeFence = !insideCodeFence;
    }
  }

  flushQuestion();
  flushMarkdown();
  return segments;
}

function extractAnswers(markdown: string) {
  const answers = new Map<string, AnswerBlock>();
  const duplicateKeys = new Set<string>();
  const sections = new Map<string, { lines: string[]; hasNumberedAnswers: boolean }>();
  let answer: AnswerBlock | null = null;
  let section = "";
  let insideCodeFence = false;

  const flushAnswer = () => {
    if (!answer) {
      return;
    }

    const content = answer.lines.join("\n").trim();
    if (content) {
      const pairKey = getPairKey(answer.section, answer.number);
      if (answers.has(pairKey)) {
        duplicateKeys.add(pairKey);
      } else {
        answers.set(pairKey, { ...answer, lines: [content] });
      }
    }
    answer = null;
  };

  for (const line of markdown.split(/\r?\n/)) {
    const isFence = /^\s*```/.test(line);

    if (!insideCodeFence) {
      const heading = /^##\s+(.+)$/.exec(line);
      if (heading) {
        flushAnswer();
        section = normalizeSectionName(heading[1]);
        if (section) {
          sections.set(section, { lines: [], hasNumberedAnswers: false });
        }
        continue;
      }

      const boldAnswer = /^\*\*(\d+)\.\s+(.+?)\*\*(?:\s+(.*))?$/.exec(line);
      const numberedAnswer = /^(\d+)\.\s+(.+)$/.exec(line);
      const answerMatch = boldAnswer ?? numberedAnswer;

      if (answerMatch) {
        flushAnswer();
        const number = Number(answerMatch[1]);
        const inlineAnswer = boldAnswer ? boldAnswer[3] : numberedAnswer?.[2];
        answer = {
          number,
          section,
          lines: inlineAnswer ? [inlineAnswer] : [],
        };
        const sectionContent = sections.get(section);
        if (sectionContent) {
          sectionContent.hasNumberedAnswers = true;
        }
        continue;
      }
    }

    if (answer) {
      answer.lines.push(line);
    }
    const sectionContent = sections.get(section);
    if (sectionContent) {
      sectionContent.lines.push(line);
    }
    if (isFence) {
      insideCodeFence = !insideCodeFence;
    }
  }

  flushAnswer();
  return { answers, duplicateKeys, sections };
}

export function buildQuestionAnswerSegments(
  practiceMarkdown: string,
  solutionMarkdown: string,
  storedQuestionAnswers: CodingQuestionAnswer[] = [],
): QuestionAnswerSegment[] | null {
  if (!practiceMarkdown.trim() && storedQuestionAnswers.length > 0) {
    return [...storedQuestionAnswers]
      .sort((first, second) => first.order - second.order)
      .map((item) => ({
        type: "question",
        number: item.number,
        section: item.section,
        question: item.promptMarkdown,
        answer: item.answerMarkdown,
      }));
  }

  const parsedPractice = splitPracticeMarkdown(practiceMarkdown);
  const questions = parsedPractice.filter((segment): segment is QuestionBlock => "number" in segment);
  if (questions.length === 0) {
    return null;
  }

  const questionKeys = new Set<string>();
  for (const question of questions) {
    const pairKey = getPairKey(question.section, question.number);
    if (questionKeys.has(pairKey)) {
      return null;
    }
    questionKeys.add(pairKey);
  }

  const { answers, duplicateKeys, sections } = extractAnswers(solutionMarkdown);
  if (storedQuestionAnswers.length === 0 && [...duplicateKeys].some((key) => questionKeys.has(key))) {
    return null;
  }

  const storedAnswersByKey = new Map<string, CodingQuestionAnswer>();
  for (const storedQuestionAnswer of storedQuestionAnswers) {
    const sectionKey = normalizeSectionName(storedQuestionAnswer.section);
    const pairKey = getPairKey(sectionKey, storedQuestionAnswer.number);
    if (storedAnswersByKey.has(pairKey)) {
      return null;
    }
    storedAnswersByKey.set(pairKey, storedQuestionAnswer);
    answers.set(pairKey, {
      number: storedQuestionAnswer.number,
      section: storedQuestionAnswer.section,
      lines: [storedQuestionAnswer.answerMarkdown],
    });
  }

  const questionsBySection = new Map<string, QuestionBlock[]>();
  for (const question of questions) {
    if (!question.section) {
      continue;
    }
    const sectionQuestions = questionsBySection.get(question.section) ?? [];
    sectionQuestions.push(question);
    questionsBySection.set(question.section, sectionQuestions);
  }

  for (const [sectionName, sectionQuestions] of questionsBySection) {
    const solutionSection = sections.get(sectionName);
    if (
      storedQuestionAnswers.length > 0 ||
      sectionQuestions.length !== 1 ||
      solutionSection?.hasNumberedAnswers
    ) {
      continue;
    }
    const answer = solutionSection?.lines.join("\n").trim();
    const pairKey = getPairKey(sectionQuestions[0].section, sectionQuestions[0].number);
    if (answer && !answers.has(pairKey)) {
      answers.set(pairKey, {
        number: sectionQuestions[0].number,
        section: sectionName,
        lines: [answer],
      });
    }
  }

  if (questions.some((question) => !answers.has(getPairKey(question.section, question.number)))) {
    return null;
  }

  return parsedPractice.map((segment) => {
    if (!("number" in segment)) {
      return segment;
    }

    return {
      type: "question",
      number: segment.number,
      section: segment.section,
      question:
        storedAnswersByKey.get(getPairKey(segment.section, segment.number))?.promptMarkdown.trim() ||
        segment.lines.join("\n").trim(),
      answer: answers.get(getPairKey(segment.section, segment.number))?.lines.join("\n") ?? "",
    };
  });
}

type QuestionAnswerLessonProps = Readonly<{
  segments: QuestionAnswerSegment[];
}>;

export function QuestionAnswerLesson({ segments }: QuestionAnswerLessonProps) {
  return (
    <div className="space-y-4">
      {segments.map((segment, index) => segment.type === "markdown" ? (
        <MarkdownLesson key={`markdown-${index}`} markdown={segment.markdown} onHashLinkClick={() => {}} />
      ) : (
        <article key={`question-${segment.section}-${segment.number}`} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <p className="text-xs font-bold uppercase text-cyan-800">Question {segment.number}</p>
          <MarkdownLesson markdown={segment.question} onHashLinkClick={() => {}} />
          <details className="mt-4 overflow-hidden rounded-lg border border-emerald-200 bg-emerald-50/60">
            <summary className="cursor-pointer px-4 py-3 text-sm font-bold text-emerald-900 hover:bg-emerald-100">
              Show answer
            </summary>
            <div className="border-t border-emerald-200 px-4 pb-4">
              <MarkdownLesson markdown={segment.answer} onHashLinkClick={() => {}} />
            </div>
          </details>
        </article>
      ))}
    </div>
  );
}