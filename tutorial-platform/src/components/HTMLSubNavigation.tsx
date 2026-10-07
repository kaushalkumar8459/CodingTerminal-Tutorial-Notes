import { Link, useLocation } from "react-router-dom";
import { getTutorialsByTrack } from "../data/tutorials";

export function HTMLSubNavigation() {
  const location = useLocation();
  const firstTutorial = getTutorialsByTrack("html")[0];
  const isPractice = location.pathname.startsWith("/coding/htmlinterview");
  const links = [
    {
      label: "HTML Tutorial",
      to: firstTutorial ? `/html/tutorial/${firstTutorial.slug}` : "/html",
      isActive: !isPractice,
    },
    {
      label: "HTML Practice",
      to: "/coding/htmlinterview",
      isActive: isPractice,
    },
  ];

  return (
    <nav aria-label="HTML sections" className="mt-3 overflow-hidden rounded-xl border border-cyan-200 bg-cyan-50/80">
      <div className="flex items-stretch overflow-x-auto whitespace-nowrap">
        {links.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            aria-current={link.isActive ? "page" : undefined}
            className={`flex h-10 shrink-0 items-center border-r border-cyan-100 px-3 text-xs font-semibold transition sm:px-4 sm:text-sm ${
              link.isActive ? "bg-cyan-600 text-white" : "text-cyan-900 hover:bg-cyan-100"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}