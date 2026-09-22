import type { TocItem } from "../types/tutorial";

type TableOfContentsProps = {
  items: TocItem[];
  onHashLinkClick: (hash: string) => void;
};

export function TableOfContents({ items, onHashLinkClick }: Readonly<TableOfContentsProps>) {
  if (items.length === 0) {
    return null;
  }

  const handleHashLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    onHashLinkClick(href);
  };

  return (
    <aside className="max-h-[calc(50vh-2rem)] overflow-y-auto overscroll-contain rounded-3xl border border-slate-200/70 bg-white/80 p-5 shadow-[0_12px_35px_-20px_rgba(15,23,42,0.55)] backdrop-blur">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">On This Page</h2>
      <nav className="mt-4">
        <ul className="space-y-2 text-sm">
          {items.map((item) => (
            <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
              <a
                href={`#${item.id}`}
                className="inline-flex rounded-md px-2 py-1 text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-700"
                onClick={(event) => handleHashLinkClick(event, `#${item.id}`)}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
