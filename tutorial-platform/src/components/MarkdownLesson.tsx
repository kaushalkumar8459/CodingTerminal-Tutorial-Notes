import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";

type MarkdownLessonProps = {
  markdown: string;
  onHashLinkClick: (hash: string) => void;
};
export function MarkdownLesson({ markdown, onHashLinkClick }: MarkdownLessonProps) {
  const [copiedBlockId, setCopiedBlockId] = React.useState<string | null>(null);
  const copyFeedbackTimeoutRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (copyFeedbackTimeoutRef.current !== null) {
        window.clearTimeout(copyFeedbackTimeoutRef.current);
      }
    };
  }, []);

  const getCodeText = (children: React.ReactNode) => {
    return React.Children.toArray(children)
      .map((child) => (typeof child === "string" ? child : ""))
      .join("")
      .replace(/\n$/, "");
  };

  const handleCopyCode = async (blockId: string, codeText: string) => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopiedBlockId(blockId);

      if (copyFeedbackTimeoutRef.current !== null) {
        window.clearTimeout(copyFeedbackTimeoutRef.current);
      }

      copyFeedbackTimeoutRef.current = window.setTimeout(() => {
        setCopiedBlockId(null);
      }, 1500);
    } catch {
      setCopiedBlockId(null);
    }
  };

  const handleHashLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) {
      return;
    }

    event.preventDefault();
    onHashLinkClick(href);
  };

  const resolveSamePageHash = (href: string) => {
    if (href.startsWith("#")) {
      return href;
    }

    try {
      const resolvedUrl = new URL(href, window.location.href);
      const sameOrigin = resolvedUrl.origin === window.location.origin;
      const samePath = resolvedUrl.pathname === window.location.pathname;

      if (sameOrigin && samePath && resolvedUrl.hash) {
        return resolvedUrl.hash;
      }
    } catch {
      return null;
    }

    return null;
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mb-5 text-2xl font-bold leading-tight text-slate-950 sm:text-3xl md:mb-6 md:text-5xl">{children}</h1>
        ),
        h2: ({ children }) => {
          return (
            <h2 className="mt-8 scroll-mt-24 border-b border-slate-200 pb-3 text-xl font-bold text-slate-900 sm:mt-10 sm:text-2xl">
              {children}
            </h2>
          );
        },
        h3: ({ children }) => {
          return (
            <h3 className="mt-6 scroll-mt-24 text-lg font-semibold text-slate-900 sm:mt-8 sm:text-xl">
              {children}
            </h3>
          );
        },
        p: ({ children }) => <p className="mt-3 break-words leading-7 text-slate-700 sm:mt-4 sm:leading-8">{children}</p>,
        ul: ({ children }) => <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700 sm:mt-4 sm:pl-6">{children}</ul>,
        ol: ({ children }) => <ol className="mt-3 list-decimal space-y-2 pl-5 text-slate-700 sm:mt-4 sm:pl-6">{children}</ol>,
        li: ({ children }) => <li className="leading-7">{children}</li>,
        code: ({ className, children, ...props }) => {
          const language = className?.replace("language-", "") ?? "";
          const isBlock = className?.includes("language-") ?? false;

          if (isBlock) {
            const codeText = getCodeText(children);
            const blockId = `${language}:${codeText.length}:${codeText.slice(0, 30)}`;
            const isCopied = copiedBlockId === blockId;

            return (
              <div className="-mx-1 mt-4 overflow-x-auto rounded-2xl border border-slate-300/60 bg-slate-950 p-3 text-xs text-slate-100 shadow-inner sm:mx-0 sm:mt-5 sm:p-4 sm:text-sm">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">{language || "code"}</div>
                  <button
                    type="button"
                    onClick={() => void handleCopyCode(blockId, codeText)}
                    className="rounded-md border border-cyan-300/50 bg-cyan-400/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-cyan-100 transition hover:bg-cyan-400/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                    aria-label="Copy code block"
                  >
                    {isCopied ? "Copied" : "Copy"}
                  </button>
                </div>
                <code className={className} {...props}>
                  {children}
                </code>
              </div>
            );
          }

          return (
            <code className="rounded-md bg-cyan-100 px-1.5 py-0.5 font-medium break-all text-cyan-900" {...props}>
              {children}
            </code>
          );
        },
        blockquote: ({ children }) => (
          <blockquote className="mt-4 rounded-r-2xl border-l-4 border-cyan-400 bg-cyan-50/80 px-3 py-3 text-slate-700 sm:mt-5 sm:px-4">
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div className="-mx-1 mt-4 overflow-x-auto rounded-2xl border border-slate-300/70 sm:mx-0 sm:mt-5">
            <table className="min-w-full border-collapse text-left text-sm">{children}</table>
          </div>
        ),
        th: ({ children }) => <th className="bg-slate-100 px-3 py-2 font-semibold text-slate-800">{children}</th>,
        td: ({ children }) => <td className="border-t border-slate-200 px-3 py-2 text-slate-700">{children}</td>,
        a: ({ href, children }) => {
          const link = href ?? "#";
          const samePageHash = resolveSamePageHash(link);
          const isHashLink = Boolean(samePageHash);
          const isExternalLink = /^https?:\/\//i.test(link) && !samePageHash;
          const resolvedHref = samePageHash ?? link;

          return (
            <a
              href={resolvedHref}
              className="font-medium text-cyan-700 underline decoration-cyan-300 underline-offset-4"
              onClick={(event) => {
                if (isHashLink) {
                  handleHashLinkClick(event, resolvedHref);
                }
              }}
              {...(isExternalLink ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {children}
            </a>
          );
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
