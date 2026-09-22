import { Link, useLocation } from "react-router-dom";
import { getTutorialsByTrack } from "../data/tutorials";

type JavaScriptSubNavigationProps = {
  active?: "tutorial" | "problem-solving" | "coding" | "interview" | "real-interview";
};

export function JavaScriptSubNavigation({ active }: Readonly<JavaScriptSubNavigationProps>) {
  const location = useLocation();
  const firstTutorial = getTutorialsByTrack("javascript")[0];
  const activeSection = active ?? (
    location.pathname.startsWith("/coding/javascriptrealinterview")
      ? "real-interview"
      : location.pathname.startsWith("/coding/javascriptproblemsolving")
          ? "problem-solving"
      : location.pathname.startsWith("/coding/javascript")
          ? "coding"
          : /\/javascript\/tutorial\/day-02[5-7]-/.test(location.pathname)
              ? "problem-solving"
          : "tutorial"
  );

  const links = [
    {
      key: "tutorial",
      label: "JS Tutorial",
      to: firstTutorial ? `/javascript/tutorial/${firstTutorial.slug}` : "/javascript",
    },
    {
      key: "problem-solving",
      label: "Problem Solving",
      to: "/coding/javascriptproblemsolving",
    },
    { key: "coding", label: "Coding Practice", to: "/coding/javascript" },
    { key: "real-interview", label: "Real Interview Coding", to: "/coding/javascriptrealinterview" },
  ] as const;

  return (
    <nav aria-label="JavaScript sections" className="mt-3 overflow-hidden rounded-xl border border-cyan-200 bg-cyan-50/80">
      <div className="flex items-stretch overflow-x-auto whitespace-nowrap">
        {links.map((link) => {
          const isActive = link.key === activeSection;
          return (
            <Link
              key={link.key}
              to={link.to}
              aria-current={isActive ? "page" : undefined}
              className={`flex h-10 shrink-0 items-center border-r border-cyan-100 px-3 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                isActive ? "bg-cyan-600 text-white" : "text-cyan-900 hover:bg-cyan-100"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
