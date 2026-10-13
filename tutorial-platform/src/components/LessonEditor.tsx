import { useEffect, type ReactNode } from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import { Node } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { TableKit } from "@tiptap/extension-table";
import "./lesson-content.css";

// Wraps one code block; the learner view turns it into an interactive "Try it Yourself" example.
const ExampleBlock = Node.create({
  name: "exampleBlock",
  group: "block",
  content: "codeBlock",
  defining: true,
  parseHTML: () => [{ tag: "div.lesson-example" }],
  renderHTML: () => ["div", { class: "lesson-example" }, 0],
});

const Callout = Node.create({
  name: "callout",
  group: "block",
  content: "block+",
  defining: true,
  addAttributes() {
    return { variant: { default: "note" } };
  },
  parseHTML: () => [
    {
      tag: "div.lesson-callout",
      getAttrs: (element) => ({ variant: element.classList.contains("lesson-callout-tip") ? "tip" : "note" }),
    },
  ],
  renderHTML: ({ node }) => ["div", { class: `lesson-callout lesson-callout-${node.attrs.variant}` }, 0],
});

const extensions = [StarterKit.configure({ link: { openOnClick: false } }), TableKit, ExampleBlock, Callout];

function ToolbarButton({
  label,
  active = false,
  disabled = false,
  onClick,
  children,
}: Readonly<{ label: string; active?: boolean; disabled?: boolean; onClick: () => void; children: ReactNode }>) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={`flex h-9 min-w-9 items-center justify-center rounded-md border px-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
        active ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 bg-white text-slate-700 hover:bg-emerald-50"
      }`}
    >
      {children}
    </button>
  );
}

const Divider = () => <span className="mx-1 h-6 w-px bg-slate-300" aria-hidden="true" />;

type LessonEditorProps = Readonly<{
  documentKey: string;
  html: string;
  onChange: (html: string) => void;
}>;

export function LessonEditor({ documentKey, html, onChange }: LessonEditorProps) {
  const editor = useEditor(
    {
      extensions,
      content: html,
      immediatelyRender: false,
      editorProps: { attributes: { class: "lesson-html ProseMirror", "aria-label": "Lesson content editor" } },
      onUpdate: ({ editor: current }) => onChange(current.getHTML()),
    },
    [documentKey],
  );

  const state = useEditorState({
    editor,
    selector: ({ editor: current }) => ({
      bold: current?.isActive("bold") ?? false,
      italic: current?.isActive("italic") ?? false,
      code: current?.isActive("code") ?? false,
      h2: current?.isActive("heading", { level: 2 }) ?? false,
      h3: current?.isActive("heading", { level: 3 }) ?? false,
      bullet: current?.isActive("bulletList") ?? false,
      ordered: current?.isActive("orderedList") ?? false,
      link: current?.isActive("link") ?? false,
      inTable: current?.isActive("table") ?? false,
      note: current?.isActive("callout", { variant: "note" }) ?? false,
      tip: current?.isActive("callout", { variant: "tip" }) ?? false,
      canUndo: current?.can().undo() ?? false,
      canRedo: current?.can().redo() ?? false,
    }),
  });

  useEffect(() => {
    // Seeds the parent with normalized HTML so Save works before the first keystroke.
    if (editor) onChange(editor.getHTML());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  if (!editor || !state) {
    return <div className="min-h-96 animate-pulse rounded-xl bg-slate-50" aria-label="Loading editor" />;
  }

  const chain = () => editor.chain().focus();

  const setLink = () => {
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL (https://...)", previous ?? "https://");
    if (url === null) return;
    if (url.trim() === "") {
      chain().extendMarkRange("link").unsetLink().run();
      return;
    }
    chain().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  const toggleCallout = (variant: "note" | "tip") => {
    if (editor.isActive("callout")) {
      chain().lift("callout").run();
      return;
    }
    chain().wrapIn("callout", { variant }).run();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-300 bg-white">
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 p-2">
        <ToolbarButton label="Bold" active={state.bold} onClick={() => chain().toggleBold().run()}>
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton label="Italic" active={state.italic} onClick={() => chain().toggleItalic().run()}>
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton label="Inline code" active={state.code} onClick={() => chain().toggleCode().run()}>
          {"</>"}
        </ToolbarButton>
        <ToolbarButton label="Link" active={state.link} onClick={setLink}>
          Link
        </ToolbarButton>
        <Divider />
        <ToolbarButton label="Heading 2" active={state.h2} onClick={() => chain().toggleHeading({ level: 2 }).run()}>
          H2
        </ToolbarButton>
        <ToolbarButton label="Heading 3" active={state.h3} onClick={() => chain().toggleHeading({ level: 3 }).run()}>
          H3
        </ToolbarButton>
        <ToolbarButton label="Paragraph" onClick={() => chain().setParagraph().run()}>
          P
        </ToolbarButton>
        <ToolbarButton label="Bulleted list" active={state.bullet} onClick={() => chain().toggleBulletList().run()}>
          • List
        </ToolbarButton>
        <ToolbarButton label="Numbered list" active={state.ordered} onClick={() => chain().toggleOrderedList().run()}>
          1. List
        </ToolbarButton>
        <Divider />
        <ToolbarButton
          label="Example box (code with Try it Yourself)"
          onClick={() =>
            chain()
              .insertContent({ type: "exampleBlock", content: [{ type: "codeBlock", attrs: { language: "html" } }] })
              .run()
          }
        >
          Example
        </ToolbarButton>
        <ToolbarButton
          label="JavaScript example (runs and shows output)"
          onClick={() =>
            chain()
              .insertContent({ type: "exampleBlock", content: [{ type: "codeBlock", attrs: { language: "javascript" } }] })
              .run()
          }
        >
          JS Example
        </ToolbarButton>
        <ToolbarButton label="Note callout" active={state.note} onClick={() => toggleCallout("note")}>
          Note
        </ToolbarButton>
        <ToolbarButton label="Tip callout" active={state.tip} onClick={() => toggleCallout("tip")}>
          Tip
        </ToolbarButton>
        <ToolbarButton label="Insert table" onClick={() => chain().insertTable({ rows: 3, cols: 2, withHeaderRow: true }).run()}>
          Table
        </ToolbarButton>
        {state.inTable ? (
          <>
            <ToolbarButton label="Add row below" onClick={() => chain().addRowAfter().run()}>
              +Row
            </ToolbarButton>
            <ToolbarButton label="Add column after" onClick={() => chain().addColumnAfter().run()}>
              +Col
            </ToolbarButton>
            <ToolbarButton label="Delete row" onClick={() => chain().deleteRow().run()}>
              -Row
            </ToolbarButton>
            <ToolbarButton label="Delete column" onClick={() => chain().deleteColumn().run()}>
              -Col
            </ToolbarButton>
            <ToolbarButton label="Delete table" onClick={() => chain().deleteTable().run()}>
              Del table
            </ToolbarButton>
          </>
        ) : null}
        <Divider />
        <ToolbarButton label="Undo" disabled={!state.canUndo} onClick={() => chain().undo().run()}>
          ↶
        </ToolbarButton>
        <ToolbarButton label="Redo" disabled={!state.canRedo} onClick={() => chain().redo().run()}>
          ↷
        </ToolbarButton>
      </div>
      <div className="max-h-[70vh] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
