import { LessonContent } from "./LessonContent";
import { parseLessonHtml } from "../utils/lessonContent";

type HtmlQuestion = {
  id: string;
  order: number;
  number: number;
  section: string;
  promptHtml: string;
  answerHtml: string;
};

export function QuestionAnswerContent({ questions }: Readonly<{ questions: HtmlQuestion[] }>) {
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <article key={question.id} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <p className="text-xs font-bold uppercase text-indigo-800">
            {question.section ? `${question.section} · ` : ""}Question {question.number}
          </p>
          <div className="mt-3">
            <LessonContent lesson={parseLessonHtml(question.promptHtml)} />
          </div>
          <details className="mt-4 overflow-hidden rounded-lg border border-indigo-200 bg-indigo-50/60">
            <summary className="cursor-pointer px-4 py-3 text-sm font-bold text-indigo-900 hover:bg-indigo-100">
              Show answer
            </summary>
            <div className="border-t border-indigo-200 px-4 pb-4">
              <LessonContent lesson={parseLessonHtml(question.answerHtml)} />
            </div>
          </details>
        </article>
      ))}
    </div>
  );
}
