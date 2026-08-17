import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AudioPlayer } from "../components/AudioPlayer";
import { MarkdownLesson } from "../components/MarkdownLesson";
import { TableOfContents } from "../components/TableOfContents";
import { getTutorialBySlug, getTutorialsByTrack } from "../data/tutorials";
import { getTrackLabel, isTrackKey } from "../data/tracks";
import { parseFrontmatter, parseYouTubeVideosField } from "../services/contentAdmin";
import type { TutorialVideo } from "../types/tutorial";
import { extractTableOfContents, slugifyHeading, stripLeadingH1 } from "../utils/markdown";

type TutorialPageProps = {
  isRightPanelCollapsed: boolean;
};

type CachedLessonContent = {
  markdown: string;
  youtubeVideos: TutorialVideo[];
};

const lessonMarkdownCache = new Map<string, CachedLessonContent>();

// Called after an admin save so the learner view refetches instead of showing stale cached content.
export function invalidateLessonMarkdownCache(contentPath?: string) {
  if (contentPath) {
    lessonMarkdownCache.delete(contentPath);
  } else {
    lessonMarkdownCache.clear();
  }
}

function getYouTubeEmbedUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace(/^www\./, "");

    if (!hostname.includes("youtube.com") && hostname !== "youtu.be") {
      return null;
    }

    if (hostname === "youtu.be") {
      const videoId = parsedUrl.pathname.split("/").find(Boolean) ?? "";
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null;
    }

    const watchVideoId = parsedUrl.searchParams.get("v");
    if (watchVideoId) {
      return `https://www.youtube-nocookie.com/embed/${watchVideoId}`;
    }

    const shortsMatch = /^\/shorts\/([^/]+)/.exec(parsedUrl.pathname);
    if (shortsMatch?.[1]) {
      return `https://www.youtube-nocookie.com/embed/${shortsMatch[1]}`;
    }

    return null;
  } catch {
    return null;
  }
}

function YouTubeVideosSection({ videos }: Readonly<{ videos: TutorialVideo[] }>) {
  if (videos.length === 0) {
    return null;
  }

  return (
    <section className="max-h-[calc(50vh-2rem)] overflow-hidden rounded-2xl border border-rose-100 bg-rose-50/70 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.35)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-100 px-3 py-2.5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-700 sm:text-xs">YouTube Section</p>
          <h3 className="mt-0.5 text-sm font-bold text-slate-900">Lesson videos</h3>
        </div>
        <p className="text-[11px] font-semibold text-rose-700 sm:text-xs">
          {videos.length} video{videos.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="space-y-4 overflow-y-auto p-3 sm:p-4">
        {videos.map((video) => {
          const embedUrl = getYouTubeEmbedUrl(video.url);

          return (
            <article key={`${video.url}-${video.title}`} className="overflow-hidden rounded-2xl border border-rose-100 bg-white">
              <div className="bg-slate-950">
                {embedUrl ? (
                  <iframe
                    className="aspect-video w-full"
                    src={embedUrl}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center px-4 text-center text-sm text-slate-200">
                    YouTube preview unavailable for this link.
                  </div>
                )}
              </div>

              <div className="space-y-2 p-4">
                <h4 className="text-sm font-bold text-slate-900 sm:text-base">{video.title}</h4>
                {video.description ? <p className="text-sm leading-6 text-slate-600">{video.description}</p> : null}
                <a
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                >
                  Watch on YouTube
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

type MobileTocDrawerProps = Readonly<{
  items: ReturnType<typeof extractTableOfContents>;
  isOpen: boolean;
  onClose: () => void;
  onHashLinkClick: (hash: string) => void;
}>;

function MobileTocDrawer({ items, isOpen, onClose, onHashLinkClick }: MobileTocDrawerProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="On this page menu"
      className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-[1px] xl:hidden"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section className="absolute inset-x-0 bottom-0 max-h-[78vh] overflow-y-auto rounded-t-3xl border border-slate-200 bg-white p-4 shadow-2xl">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">On This Page</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
          >
            Close
          </button>
        </div>

        <nav>
          <ul className="max-h-[62vh] space-y-2 overflow-y-auto pr-1 text-sm">
            {items.map((item) => (
              <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
                <a
                  href={`#${item.id}`}
                  className="inline-flex rounded-md px-2 py-1 text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-700"
                  onClick={(event) => {
                    event.preventDefault();
                    onHashLinkClick(`#${item.id}`);
                  }}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </div>
  );
}

type TutorialStatePanelProps = Readonly<{
  isLoading: boolean;
  error: string;
  track: string | null;
  tutorialFileName?: string;
}>;

function getTutorialStatePanel({ isLoading, error, track, tutorialFileName }: TutorialStatePanelProps) {
  if (isLoading) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 text-slate-700 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.7)] sm:p-10">
        Loading lesson content...
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-3xl border border-rose-200 bg-rose-50 p-5 text-rose-700 sm:p-8">
        {error}
      </section>
    );
  }

  if (!track) {
    return (
      <section className="rounded-3xl border border-rose-200 bg-rose-50 p-5 text-rose-700 sm:p-8">
        Invalid tutorial track. Please pick React, Node.js, or Python.
      </section>
    );
  }

  if (!tutorialFileName) {
    return null;
  }

  return null;
}

export function TutorialPage({ isRightPanelCollapsed }: Readonly<TutorialPageProps>) {
  const { track: routeTrack, slug } = useParams();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [markdown, setMarkdown] = useState("");
  const [youtubeVideos, setYoutubeVideos] = useState<TutorialVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isMobileTocDrawerOpen, setIsMobileTocDrawerOpen] = useState(false);

  const track = routeTrack && isTrackKey(routeTrack) ? routeTrack : null;
  const trackTutorials = useMemo(() => (track ? getTutorialsByTrack(track) : []), [track]);
  const tutorial = track && slug ? getTutorialBySlug(track, slug) : undefined;
  const tocItems = useMemo(() => extractTableOfContents(markdown), [markdown]);
  const currentTutorialIndex = tutorial ? trackTutorials.findIndex((item) => item.slug === tutorial.slug) : -1;
  const previousTutorial = currentTutorialIndex > 0 ? trackTutorials[currentTutorialIndex - 1] : null;
  const nextTutorial =
    currentTutorialIndex >= 0 && currentTutorialIndex < trackTutorials.length - 1
      ? trackTutorials[currentTutorialIndex + 1]
      : null;

  useEffect(() => {
    if (!isMobileTocDrawerOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileTocDrawerOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileTocDrawerOpen]);

  const syncRenderedHeadingIds = useCallback(() => {
    if (!contentRef.current || tocItems.length === 0) {
      return [] as HTMLElement[];
    }

    const headingElements = Array.from(contentRef.current.querySelectorAll<HTMLElement>("h2, h3"));

    headingElements.forEach((element, index) => {
      const headingItem = tocItems[index];
      const fallbackId = slugifyHeading(element.textContent ?? "");
      const nextId = headingItem?.id ?? fallbackId;

      if (!nextId) {
        return;
      }

      element.id = nextId;
      element.dataset.sectionId = nextId;
    });

    return headingElements;
  }, [tocItems]);

  useEffect(() => {
    if (!tutorial) {
      setError("This tutorial is not available yet.");
      setIsLoading(false);
      setMarkdown("");
      setYoutubeVideos([]);
      return;
    }

    let isMounted = true;

    const loadMarkdown = async () => {
      try {
        setIsLoading(true);
        setError("");
        const cachedContent = lessonMarkdownCache.get(tutorial.contentPath);

        if (cachedContent) {
          setMarkdown(cachedContent.markdown);
          setYoutubeVideos(cachedContent.youtubeVideos);
          return;
        }

        const response = await fetch(`/${tutorial.contentPath}`, { cache: "no-store" });

        if (!response.ok) {
          throw new Error(`Unable to load ${tutorial.fileName}`);
        }

        const content = await response.text();

        if (isMounted) {
          const { frontmatter, body } = parseFrontmatter(content);
          const normalizedContent = stripLeadingH1(body);
          const youtubeVideos = parseYouTubeVideosField(frontmatter.youtubeVideos);

          lessonMarkdownCache.set(tutorial.contentPath, {
            markdown: normalizedContent,
            youtubeVideos,
          });
          setMarkdown(normalizedContent);
          setYoutubeVideos(youtubeVideos);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load tutorial.");
          setMarkdown("");
          setYoutubeVideos([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadMarkdown();

    return () => {
      isMounted = false;
    };
  }, [tutorial]);

  const scrollToSection = useCallback((hash: string, behavior: ScrollBehavior = "smooth") => {
    const targetId = decodeURIComponent(hash.replace(/^#/, ""));
    if (!targetId) {
      return false;
    }

    window.history.replaceState(null, "", `#${targetId}`);

    const headingElements = syncRenderedHeadingIds();

    const targetElement =
      document.getElementById(targetId) ??
      headingElements.find((element) => element.id === targetId) ??
      headingElements.find((element) => element.dataset.sectionId === targetId) ??
      headingElements.find((element) => slugifyHeading(element.textContent ?? "") === targetId);

    if (!targetElement) {
      return false;
    }

    const topOffset = 96;
    const targetTop = window.scrollY + targetElement.getBoundingClientRect().top - topOffset;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior,
    });

    setIsMobileTocDrawerOpen(false);

    return true;
  }, [syncRenderedHeadingIds]);

  useEffect(() => {
    if (!markdown) {
      return;
    }

    const scrollToCurrentHash = () => {
      const currentHash = window.location.hash;
      if (!currentHash) {
        return;
      }

      let remainingAttempts = 8;

      const tryScroll = () => {
        const scrolled = scrollToSection(currentHash);
        remainingAttempts -= 1;

        if (scrolled || remainingAttempts <= 0) {
          return;
        }

        window.setTimeout(tryScroll, 80);
      };

      tryScroll();
    };

    const frameId = window.requestAnimationFrame(scrollToCurrentHash);
    window.addEventListener("hashchange", scrollToCurrentHash);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("hashchange", scrollToCurrentHash);
    };
  }, [markdown, scrollToSection]);

  useEffect(() => {
    if (!contentRef.current) {
      return;
    }

    syncRenderedHeadingIds();
  }, [markdown, syncRenderedHeadingIds]);

  const statePanel = getTutorialStatePanel({
    isLoading,
    error,
    track,
    tutorialFileName: tutorial?.fileName,
  });

  if (statePanel) {
    return statePanel;
  }

  if (!tutorial) {
    return null;
  }

  const activeTrack = track ?? "react";

  return (
    <div className="space-y-3">
      <div className="flex justify-end xl:hidden">
        <button
          type="button"
          onClick={() => setIsMobileTocDrawerOpen(true)}
          className="rounded-xl border border-slate-300 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-cyan-50"
        >
          Open On This Page
        </button>
      </div>

      <div className={`grid gap-4 sm:gap-6 ${isRightPanelCollapsed ? "" : "xl:grid-cols-[minmax(0,1fr)_280px]"}`}>
        <article className="min-w-0 rounded-3xl border border-slate-200/70 bg-white/90 p-4 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.7)] sm:p-6 md:p-10">
          <header className="mb-5 rounded-2xl bg-linear-to-r from-cyan-100 via-emerald-100 to-amber-100 p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">{getTrackLabel(activeTrack)} Track</p>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-800">{tutorial.dayLabel}</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">{tutorial.title}</h2>
            <p className="mt-2 text-xs text-slate-700 sm:text-sm">
              Level: <span className="font-semibold">{tutorial.level}</span> • Estimated Time: {tutorial.estimatedMinutes} mins
            </p>
            <AudioPlayer markdown={markdown} title={tutorial.title} />
          </header>

          {tocItems.length > 0 ? (
            <section className="mb-6 rounded-2xl border border-cyan-200 bg-cyan-50/70 p-4 sm:p-5" aria-label="Lesson syllabus">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-800">Syllabus</h3>
                <p className="text-xs font-semibold text-cyan-800">
                  {tocItems.length} section{tocItems.length === 1 ? "" : "s"}
                </p>
              </div>

              <ol className="mt-3 space-y-1.5 text-sm text-slate-700 sm:mt-4">
                {tocItems.map((item) => (
                  <li key={`syllabus-${item.id}`} className={item.level === 3 ? "pl-4" : ""}>
                    <a
                      href={`#${item.id}`}
                      className="inline-flex rounded-md px-2 py-1 transition hover:bg-cyan-100 hover:text-cyan-800"
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToSection(`#${item.id}`);
                      }}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          <div ref={contentRef} className="space-y-6">
            <MarkdownLesson markdown={markdown} onHashLinkClick={scrollToSection} />
          </div>

          <div className="mt-10 border-t border-slate-200 pt-5">
            <div className="flex items-center justify-between gap-3">
              {previousTutorial ? (
                <Link
                  to={`/${track}/tutorial/${previousTutorial.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-cyan-50 sm:text-sm"
                >
                  <span aria-hidden="true">←</span>
                  <span>Prev</span>
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-400 sm:text-sm">
                  <span aria-hidden="true">←</span>
                  <span>Prev</span>
                </span>
              )}

              {nextTutorial ? (
                <Link
                  to={`/${track}/tutorial/${nextTutorial.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-cyan-50 sm:text-sm"
                >
                  <span>Next</span>
                  <span aria-hidden="true">→</span>
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-400 sm:text-sm">
                  <span>Next</span>
                  <span aria-hidden="true">→</span>
                </span>
              )}
            </div>
          </div>
        </article>
        {!isRightPanelCollapsed ? (
          <aside className="hidden xl:block">
            <div className="sticky top-6 space-y-6 pr-1">
              <TableOfContents items={tocItems} onHashLinkClick={scrollToSection} />
              <YouTubeVideosSection videos={youtubeVideos} />
            </div>
          </aside>
        ) : null}
      </div>

      <MobileTocDrawer
        items={tocItems}
        isOpen={isMobileTocDrawerOpen}
        onClose={() => setIsMobileTocDrawerOpen(false)}
        onHashLinkClick={scrollToSection}
      />

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-5 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white/95 text-slate-700 shadow-lg transition hover:bg-cyan-50"
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        ↑
      </button>
    </div>
  );
}
