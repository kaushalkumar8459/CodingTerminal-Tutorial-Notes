import { useEffect, useRef, useState } from "react";
import Editor, { type OnChange } from "@monaco-editor/react";

const RUNNABLE_LANGUAGES = new Set(["javascript", "typescript", "python"]);
const PYODIDE_VERSION = "0.26.4";

type PyodideStdStream = { batched: (text: string) => void };
type PyodideInterface = {
  setStdout: (options: PyodideStdStream) => void;
  setStderr: (options: PyodideStdStream) => void;
  runPythonAsync: (code: string) => Promise<unknown>;
};

declare global {
  interface Window {
    loadPyodide?: (options?: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

// Cached across editor instances so the ~10MB Python runtime is only ever downloaded once per page session.
let pyodidePromise: Promise<PyodideInterface> | null = null;

function loadPyodideRuntime(): Promise<PyodideInterface> {
  if (pyodidePromise) {
    return pyodidePromise;
  }

  pyodidePromise = new Promise((resolve, reject) => {
    const indexURL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

    const initialize = () => {
      window
        .loadPyodide?.({ indexURL })
        .then(resolve)
        .catch(reject);
    };

    if (window.loadPyodide) {
      initialize();
      return;
    }

    const script = document.createElement("script");
    script.src = `${indexURL}pyodide.js`;
    script.onload = initialize;
    script.onerror = () => reject(new Error("Failed to load the Python runtime."));
    document.body.appendChild(script);
  });

  return pyodidePromise;
}

export const SUPPORTED_EDITOR_LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "cpp", label: "C++" },
  { value: "c", label: "C" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "sql", label: "SQL" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "json", label: "JSON" },
  { value: "shell", label: "Shell" },
] as const;

type SupportedLanguage = (typeof SUPPORTED_EDITOR_LANGUAGES)[number]["value"];

type OutputLine = {
  type: "log" | "error";
  text: string;
};

type CodeEditorProps = {
  storageKey: string;
  defaultLanguage?: SupportedLanguage;
  defaultValue?: string;
  readOnly?: boolean;
};

// Runs untrusted JS/TS in a sandboxed, scriptable-only iframe and relays console output back via postMessage.
function buildSandboxHtml(code: string) {
  const serializedCode = JSON.stringify(code);
  return `<!doctype html><html><body><script>
    const send = (type, payload) => parent.postMessage({ __codeEditor: true, type, payload }, "*");
    const stringifyArg = (value) => {
      if (typeof value === "string") return value;
      try { return JSON.stringify(value, null, 2); } catch { return String(value); }
    };
    console.log = (...args) => send("log", args.map(stringifyArg).join(" "));
    console.error = (...args) => send("error", args.map(stringifyArg).join(" "));
    window.onerror = (message) => { send("error", String(message)); return true; };
    try {
      new Function(${serializedCode})();
    } catch (err) {
      send("error", err instanceof Error ? err.message : String(err));
    }
  </script></body></html>`;
}

export function CodeEditor({ storageKey, defaultLanguage = "javascript", defaultValue = "", readOnly = false }: Readonly<CodeEditorProps>) {
  const [language, setLanguage] = useState<SupportedLanguage>(defaultLanguage);
  const [code, setCode] = useState(() => {
    try {
      return window.localStorage.getItem(storageKey) ?? defaultValue;
    } catch {
      return defaultValue;
    }
  });
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const isRunnable = RUNNABLE_LANGUAGES.has(language);

  useEffect(() => {
    if (readOnly) return;
    try {
      window.localStorage.setItem(storageKey, code);
    } catch {
      // ignore storage failures (private browsing, quota exceeded, etc.)
    }
  }, [code, readOnly, storageKey]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const data = event.data as { __codeEditor?: boolean; type?: "log" | "error"; payload?: string } | null;
      if (!data?.__codeEditor || !data.type || data.payload === undefined) {
        return;
      }
      setOutput((previous) => [...previous, { type: data.type as "log" | "error", text: data.payload as string }]);
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleChange: OnChange = (value) => {
    if (readOnly) return;
    setCode(value ?? "");
  };

  const handleRun = () => {
    setOutput([]);

    if (language === "python") {
      setIsRunning(true);
      loadPyodideRuntime()
        .then(async (pyodide) => {
          pyodide.setStdout({ batched: (text) => setOutput((previous) => [...previous, { type: "log", text }]) });
          pyodide.setStderr({ batched: (text) => setOutput((previous) => [...previous, { type: "error", text }]) });
          await pyodide.runPythonAsync(code);
        })
        .catch((error: unknown) => {
          const message = error instanceof Error ? error.message : String(error);
          setOutput((previous) => [...previous, { type: "error", text: message }]);
        })
        .finally(() => setIsRunning(false));
      return;
    }

    if (iframeRef.current) {
      iframeRef.current.srcdoc = buildSandboxHtml(code);
    }
  };

  const handleReset = () => {
    setCode(defaultValue);
    setOutput([]);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
      {!readOnly ? <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-900 px-3 py-2">
        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value as SupportedLanguage)}
          aria-label="Editor language"
          className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-xs font-semibold text-slate-100"
        >
          {SUPPORTED_EDITOR_LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-md border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:bg-slate-800"
          >
            Reset
          </button>
          {isRunnable ? (
            <button
              type="button"
              onClick={handleRun}
              disabled={isRunning}
              className="rounded-md bg-cyan-500 px-3 py-1 text-xs font-bold text-cyan-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isRunning ? "Running..." : "\u25B6 Run"}
            </button>
          ) : (
            <span className="text-[11px] text-slate-400">Run is available for JavaScript/TypeScript/Python only</span>
          )}
        </div>
      </div> : null}

      <Editor
        height="320px"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={handleChange}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          scrollBeyondLastLine: false,
          alwaysConsumeMouseWheel: false,
          readOnly,
        } as Parameters<typeof Editor>[0]["options"]}
      />

      {!readOnly && isRunnable ? (
        <div className="border-t border-slate-800 bg-black">
          <p className="border-b border-slate-800 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Console Output
          </p>
          <div className="max-h-40 space-y-1 overflow-y-auto px-3 py-2 font-mono text-xs">
            {output.length === 0 ? (
              <p className="text-slate-600">
                {isRunning ? "Starting Python runtime (first run downloads it, may take a few seconds)..." : "Click Run to see output here."}
              </p>
            ) : (
              output.map((line, index) => (
                <p key={`${index}-${line.text}`} className={line.type === "error" ? "text-rose-400" : "text-emerald-300"}>
                  {line.text}
                </p>
              ))
            )}
          </div>
          <iframe ref={iframeRef} title="Code sandbox" sandbox="allow-scripts" className="hidden" />
        </div>
      ) : null}
    </div>
  );
}

export default CodeEditor;
