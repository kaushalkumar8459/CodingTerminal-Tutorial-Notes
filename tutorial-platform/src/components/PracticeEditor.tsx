import { lazy, Suspense, useState } from "react";

// Deferred import: Monaco's bundle is only fetched once the learner actually opens the editor.
const CodeEditor = lazy(() => import("./CodeEditor"));

type PracticeEditorProps = {
  storageKey: string;
  defaultValue?: string;
};

export function PracticeEditor({ storageKey, defaultValue }: Readonly<PracticeEditorProps>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.55)] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-700 sm:text-xs">Practice</p>
          <h2 className="mt-1 text-sm font-bold text-slate-900 sm:text-base">Try it yourself in the code editor</h2>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="rounded-lg border border-cyan-300 bg-cyan-50 px-4 py-2 text-xs font-bold text-cyan-800 transition hover:bg-cyan-100 sm:text-sm"
        >
          {isOpen ? "Hide Editor" : "\u{1F9D1}\u200D\u{1F4BB} Open Code Editor"}
        </button>
      </div>

      {isOpen ? (
        <div className="mt-4">
          <Suspense
            fallback={
              <div className="flex h-80 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-500">
                Loading editor...
              </div>
            }
          >
            <CodeEditor storageKey={storageKey} defaultValue={defaultValue} />
          </Suspense>
        </div>
      ) : null}
    </section>
  );
}
