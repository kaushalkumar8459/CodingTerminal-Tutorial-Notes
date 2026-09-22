import { Link, useLocation } from "react-router-dom";
import { getTutorialsByTrack } from "../data/tutorials";

type AngularSubNavigationProps = {
  active?: "tutorial" | "interview";
};

export function AngularSubNavigation({ active }: Readonly<AngularSubNavigationProps>) {
  const location = useLocation();
  const firstTutorial = getTutorialsByTrack("angular")[0];
  const firstInterview = getTutorialsByTrack("angularinterview")[0];

  const activeSection =
    active ??
    (location.pathname.startsWith("/angularinterview") ? "interview" : "tutorial");

  const links = [
    {
      key: "tutorial",
      label: "Angular Tutorial",
      to: firstTutorial ? `/angular/tutorial/${firstTutorial.slug}` : "/angular",
    },
    {
      key: "interview",
      label: "Angular Interview",
      to: firstInterview ? `/angularinterview/tutorial/${firstInterview.slug}` : "/angularinterview",
    },
  ] as const;

  return (
    <nav aria-label="Angular sections" className="mt-3 overflow-hidden rounded-xl border border-cyan-200 bg-cyan-50/80">
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
