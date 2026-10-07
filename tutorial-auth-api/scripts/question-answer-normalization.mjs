function normalizeSectionName(value) {
  if (/^\s*answers?\s*$/i.test(value)) {
    return "concept";
  }

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

function getPairKey(section, number) {
  return `${section}::${number}`;
}

function parseAnswerNumbers(value) {
  const range = /^(\d+)\s*[-–—]\s*(\d+)$/.exec(value.trim());
  if (!range) {
    return [Number(value)];
  }

  const first = Number(range[1]);
  const last = Number(range[2]);
  if (last < first || last - first > 50) {
    return [];
  }

  return Array.from({ length: last - first + 1 }, (_, index) => first + index);
}

function parsePracticeMarkdown(markdown) {
  const questions = [];
  let question = null;
  let section = "";
  let sectionKey = "";
  let insideCodeFence = false;

  const flushQuestion = () => {
    if (question) {
      questions.push(question);
      question = null;
    }
  };

  for (const line of markdown.split(/\r?\n/)) {
    const isFence = /^\s*```/.test(line) || /^\d+\.\s+```/.test(line);

    if (!insideCodeFence) {
      const heading = /^(#{1,6})\s+(.+)$/.exec(line);
      if (heading) {
        flushQuestion();
        if (heading[1] === "##") {
          section = heading[2].trim();
          sectionKey = normalizeSectionName(section);
        }
        continue;
      }

      const numberedQuestion = /^(\d+)\.\s+(.+)$/.exec(line);
      if (numberedQuestion) {
        flushQuestion();
        question = {
          number: Number(numberedQuestion[1]),
          section,
          sectionKey,
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
    }
    if (isFence) {
      insideCodeFence = !insideCodeFence;
    }
  }

  flushQuestion();
  return questions;
}

function parseSolutionMarkdown(markdown) {
  const answers = new Map();
  const duplicateKeys = new Set();
  const sections = new Map();
  const duplicateSections = new Set();
  let answer = null;
  let section = "";
  let sectionKey = "";
  let insideCodeFence = false;

  const flushAnswer = () => {
    if (!answer) {
      return;
    }

    const content = answer.lines.join("\n").trim();
    if (content) {
      for (const number of answer.numbers) {
        const pairKey = getPairKey(answer.sectionKey, number);
        if (answers.has(pairKey)) {
          duplicateKeys.add(pairKey);
        } else {
          answers.set(pairKey, { ...answer, number, lines: [content] });
        }
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
        section = heading[1].trim();
        sectionKey = normalizeSectionName(section);
        if (sectionKey) {
          if (sections.has(sectionKey)) {
            duplicateSections.add(sectionKey);
          } else {
            sections.set(sectionKey, {
              section,
              lines: [],
              hasNumberedAnswers: false,
            });
          }
        }
        continue;
      }

      const boldAnswer = /^\*\*((?:\d+\s*[-–—]\s*\d+)|\d+)(?:\.\s*([^*]*?)|\s+([^*]+))?\*\*(?:\s+(.*))?$/.exec(line);
      const malformedBoldAnswer = /^\*\*((?:\d+\s*[-–—]\s*\d+)|\d+)\.\s+(.+)$/.exec(line);
      const numberedAnswer = /^(\d+)\.\s+(.+)$/.exec(line);
      const answerMatch = boldAnswer ?? malformedBoldAnswer ?? numberedAnswer;

      if (answerMatch) {
        flushAnswer();
        const sectionContent = sections.get(sectionKey);
        if (sectionContent) {
          sectionContent.hasNumberedAnswers = true;
        }
        const numbers = parseAnswerNumbers(answerMatch[1]);
        if (numbers.length === 0) {
          continue;
        }
        const inlineAnswer = boldAnswer ? boldAnswer[4] : numberedAnswer?.[2];
        answer = {
          number: numbers[0],
          numbers,
          section,
          sectionKey,
          lines: inlineAnswer ? [inlineAnswer] : [],
        };
        continue;
      }
    }

    if (answer) {
      answer.lines.push(line);
    }
    sections.get(sectionKey)?.lines.push(line);
    if (isFence) {
      insideCodeFence = !insideCodeFence;
    }
  }

  flushAnswer();
  return { answers, duplicateKeys, sections, duplicateSections };
}

export function inspectQuestionAnswerPairing(practiceMarkdown, solutionMarkdown) {
  const questions = parsePracticeMarkdown(practiceMarkdown);
  const { answers, duplicateKeys } = parseSolutionMarkdown(solutionMarkdown);
  return {
    questionCount: questions.length,
    matchedCount: questions.filter((question) =>
      answers.has(getPairKey(question.sectionKey, question.number)),
    ).length,
    missing: questions
      .filter((question) => !answers.has(getPairKey(question.sectionKey, question.number)))
      .map((question) => ({ number: question.number, section: question.section })),
    duplicates: [...duplicateKeys],
  };
}

export function buildQuestionAnswerPairs(practiceMarkdown, solutionMarkdown) {
  const questions = parsePracticeMarkdown(practiceMarkdown);
  if (questions.length === 0) {
    return [];
  }

  const questionKeys = new Set();
  for (const question of questions) {
    const pairKey = getPairKey(question.sectionKey, question.number);
    if (questionKeys.has(pairKey)) {
      return [];
    }
    questionKeys.add(pairKey);
  }

  const { answers, duplicateKeys, sections, duplicateSections } = parseSolutionMarkdown(solutionMarkdown);
  if ([...duplicateKeys].some((key) => questionKeys.has(key))) {
    return [];
  }

  const questionCountsByNumber = new Map();
  for (const question of questions) {
    questionCountsByNumber.set(question.number, (questionCountsByNumber.get(question.number) ?? 0) + 1);
  }
  for (const question of questions) {
    const genericAnswer = answers.get(getPairKey("", question.number));
    if (
      genericAnswer &&
      question.sectionKey &&
      questionCountsByNumber.get(question.number) === 1
    ) {
      answers.set(getPairKey(question.sectionKey, question.number), genericAnswer);
    }
  }

  const questionsBySection = new Map();
  for (const question of questions) {
    if (!question.sectionKey) {
      continue;
    }
    const sectionQuestions = questionsBySection.get(question.sectionKey) ?? [];
    sectionQuestions.push(question);
    questionsBySection.set(question.sectionKey, sectionQuestions);
  }

  for (const [sectionKey, sectionQuestions] of questionsBySection) {
    const solutionSection = sections.get(sectionKey);
    if (
      sectionQuestions.length !== 1 ||
      solutionSection?.hasNumberedAnswers ||
      duplicateSections.has(sectionKey)
    ) {
      continue;
    }

    const answer = solutionSection?.lines.join("\n").trim();
    const pairKey = getPairKey(sectionKey, sectionQuestions[0].number);
    if (answer && !answers.has(pairKey)) {
      answers.set(pairKey, {
        number: sectionQuestions[0].number,
        section: solutionSection.section,
        sectionKey,
        lines: [answer],
      });
    }
  }

  if (questions.some((question) => !answers.has(getPairKey(question.sectionKey, question.number)))) {
    return [];
  }

  return questions.map((question, index) => ({
    id: `${question.sectionKey || "general"}-${question.number}`,
    order: index + 1,
    number: question.number,
    section: question.section,
    promptMarkdown: question.lines.join("\n").trim(),
    answerMarkdown: answers.get(getPairKey(question.sectionKey, question.number)).lines.join("\n"),
  }));
}

export function extractCodingContextMarkdown(markdown) {
  const embeddedSolutionStart = "<!-- codingterminal-solution:start -->";
  const embeddedSolutionIndex = markdown.indexOf(embeddedSolutionStart);
  if (embeddedSolutionIndex >= 0) {
    markdown = markdown.slice(0, embeddedSolutionIndex);
  }

  const retainedLines = [];
  let skipQuestion = false;
  let insideCodeFence = false;

  for (const line of markdown.split(/\r?\n/)) {
    const isFence = /^\s*```/.test(line) || /^\d+\.\s+```/.test(line);

    if (!insideCodeFence) {
      const heading = /^(#{1,6})\s+/.exec(line);
      if (heading) {
        skipQuestion = false;
      } else if (/^\d+\.\s+/.test(line)) {
        skipQuestion = true;
        if (isFence) {
          insideCodeFence = !insideCodeFence;
        }
        continue;
      }
    }

    if (!skipQuestion) {
      retainedLines.push(line);
    }

    if (isFence) {
      insideCodeFence = !insideCodeFence;
    }
  }

  const lines = retainedLines.filter((line, index) => {
    const heading = /^(#{1,6})\s+/.exec(line);
    if (!heading) {
      return true;
    }

    const level = heading[1].length;
    for (let nextIndex = index + 1; nextIndex < retainedLines.length; nextIndex += 1) {
      const nextLine = retainedLines[nextIndex];
      const nextHeading = /^(#{1,6})\s+/.exec(nextLine);
      if (nextHeading && nextHeading[1].length <= level) {
        break;
      }
      if (nextLine.trim()) {
        return true;
      }
    }

    return false;
  });

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}