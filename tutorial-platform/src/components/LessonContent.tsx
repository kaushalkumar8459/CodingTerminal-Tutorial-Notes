import { useState } from "react";
import type { ParsedLesson } from "../utils/lessonContent";
import "./lesson-content.css";

// Learner JavaScript runs in a sandboxed frame; console output is printed into the page.
function buildScriptDocument(code: string) {
  const payload = JSON.stringify(code).replace(/</g, "\\u003c");
  return `<!doctype html><body style="margin:8px;font:14px ui-monospace,monospace"><div id="out"></div><script>
const out=document.getElementById("out");
const fmt=(v)=>{if(typeof v==="string")return v;try{return JSON.stringify(v)}catch(e){return String(v)}};
const write=(isError,args)=>{const line=document.createElement("div");line.style.whiteSpace="pre-wrap";if(isError)line.style.color="#b91c1c";line.textContent=args.map(fmt).join(" ");out.appendChild(line)};
console.log=(...a)=>write(false,a);console.info=console.log;console.warn=(...a)=>write(true,a);console.error=(...a)=>write(true,a);
window.onerror=(message)=>{write(true,[message]);return true};
try{new Function(${payload})()}catch(e){write(true,[e.message])}
</script></body>`;
}

function TryItExample({ code, language }: Readonly<{ code: string; language: "html" | "javascript" }>) {
  const toDocument = (source: string) => (language === "javascript" ? buildScriptDocument(source) : source);
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState(code);
  const [result, setResult] = useState(() => toDocument(code));

  return (
    <div className="lesson-example">
      <pre>
        <code>{code}</code>
      </pre>
      <div className="lesson-example-actions">
        <button type="button" className="lesson-example-button" onClick={() => setIsOpen((value) => !value)}>
          {isOpen ? "Close" : "Try it Yourself »"}
        </button>
      </div>
      {isOpen ? (
        <div className="lesson-tryit">
          <div>
            <p className="lesson-tryit-label">Edit the code</p>
            <textarea aria-label="Edit example code" value={draft} spellCheck={false} onChange={(event) => setDraft(event.target.value)} />
            <button type="button" className="lesson-example-button" onClick={() => setResult(toDocument(draft))}>
              Run »
            </button>
          </div>
          <div>
            <p className="lesson-tryit-label">{language === "javascript" ? "Output" : "Result"}</p>
            {/* allow-scripts without allow-same-origin keeps learner code isolated from the app. */}
            <iframe title="Example result" sandbox="allow-scripts" srcDoc={result} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function LessonContent({ lesson }: Readonly<{ lesson: ParsedLesson }>) {
  return (
    <div className="lesson-html">
      {lesson.segments.map((segment) =>
        segment.kind === "example" ? (
          <TryItExample key={segment.key} code={segment.code} language={segment.language} />
        ) : (
          <div key={segment.key} dangerouslySetInnerHTML={{ __html: segment.html }} />
        ),
      )}
    </div>
  );
}
