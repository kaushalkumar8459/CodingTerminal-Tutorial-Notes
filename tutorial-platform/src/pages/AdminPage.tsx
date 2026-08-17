import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MarkdownLesson } from "../components/MarkdownLesson";
import { tracks, type TrackKey } from "../data/tracks";
import { tutorials } from "../data/tutorials";
import { formatYouTubeVideoList, loadTutorialDocument, parseYouTubeVideosField, saveTutorialDocument, type TutorialDocument } from "../services/contentAdmin";
import type { TutorialMeta } from "../types/tutorial";

function buildEmptyDocument(tutorial: TutorialMeta): TutorialDocument {
  return {
    title: tutorial.title,
    slug: tutorial.slug,
    dayLabel: tutorial.dayLabel,
    level: tutorial.level,
    estimatedMinutes: tutorial.estimatedMinutes,
    order: tutorial.order,
    track: tutorial.track,
    body: "",
    contentPath: tutorial.contentPath,
    fileName: tutorial.fileName,
    youtubeVideos: [],
  };
}

function useTutorialEditorState(selectedTutorial: TutorialMeta | null) {
  const [document, setDocument] = useState<TutorialDocument | null>(null);
  const [youtubeVideosText, setYoutubeVideosText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!selectedTutorial) {
      setDocument(null);
      setYoutubeVideosText("");
      setIsLoading(false);
      setStatusMessage("");
      setErrorMessage("");
      return;
    }

    let isCancelled = false;

    setDocument(null);
    setYoutubeVideosText("");

    const fetchDocument = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        setStatusMessage("");
        const loadedDocument = await loadTutorialDocument(selectedTutorial);

        if (!isCancelled) {
          setDocument(loadedDocument);
          setYoutubeVideosText(formatYouTubeVideoList(loadedDocument.youtubeVideos));
        }
      } catch (error) {
        if (!isCancelled) {
          setDocument(buildEmptyDocument(selectedTutorial));
          setYoutubeVideosText("");
          setErrorMessage(error instanceof Error ? error.message : "Unable to load tutorial content.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void fetchDocument();

    return () => {
      isCancelled = true;
    };
  }, [selectedTutorial]);

  return {
    document,
    setDocument,
    youtubeVideosText,
    setYoutubeVideosText,
    isLoading,
    statusMessage,
    setStatusMessage,
    errorMessage,
    setErrorMessage,
  };
}

function useSelectedSlugSync(
  selectedTutorial: TutorialMeta | null,
  selectedSlug: string,
  setSelectedSlug: (value: string) => void,
) {
  useEffect(() => {
    if (!selectedTutorial) {
      setSelectedSlug("");
      return;
    }

    if (selectedTutorial.slug !== selectedSlug) {
      setSelectedSlug(selectedTutorial.slug);
    }
  }, [selectedSlug, selectedTutorial, setSelectedSlug]);
}

function useTutorialSave(
  document: TutorialDocument | null,
  setStatusMessage: (value: string) => void,
  setErrorMessage: (value: string) => void,
) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = useCallback(async () => {
    if (!document) {
      return;
    }

    try {
      setIsSaving(true);
      setStatusMessage("");
      setErrorMessage("");
      const result = await saveTutorialDocument(document);

      if (!result.ok) {
        setErrorMessage(result.message);
        return;
      }

      setStatusMessage(result.message);
    } finally {
      setIsSaving(false);
    }
  }, [document, setErrorMessage, setStatusMessage]);

  return {
    isSaving,
    handleSave,
  };
}

type YouTubeVideosEditorProps = Readonly<{
  value: string;
  onChange: (nextValue: string) => void;
}>;

function YouTubeVideosEditor({ value, onChange }: YouTubeVideosEditorProps) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-700">
      <span>YouTube Videos</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={"Title | https://youtube.com/watch?v=... | optional description\nSecond video | https://youtu.be/..."}
        className="min-h-30 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-emerald-500"
      />
      <p className="text-xs font-normal text-slate-500">
        One video per line. Use: title | url | optional description. Leave blank if the lesson has no videos.
      </p>
    </label>
  );
}

export function AdminPage() {
  const [selectedTrack, setSelectedTrack] = useState<TrackKey>("react");
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState("");
  const [editorView, setEditorView] = useState<"edit" | "preview" | "split">("edit");
  const filteredTutorials = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tutorials
      .filter((tutorial) => tutorial.track === selectedTrack)
      .filter((tutorial) => {
        if (!normalizedQuery) {
          return true;
        }

        const haystack = `${tutorial.dayLabel} ${tutorial.title} ${tutorial.slug}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      })
      .sort((left, right) => left.order - right.order);
  }, [query, selectedTrack]);

  const selectedTutorial = useMemo(
    () => filteredTutorials.find((tutorial) => tutorial.slug === selectedSlug) ?? filteredTutorials[0] ?? null,
    [filteredTutorials, selectedSlug],
  );

  const {
    document,
    setDocument,
    youtubeVideosText,
    setYoutubeVideosText,
    isLoading,
    statusMessage,
    setStatusMessage,
    errorMessage,
    setErrorMessage,
  } = useTutorialEditorState(selectedTutorial);
  const { isSaving, handleSave } = useTutorialSave(document, setStatusMessage, setErrorMessage);

  useSelectedSlugSync(selectedTutorial, selectedSlug, setSelectedSlug);

  const handleFieldChange = <Key extends keyof TutorialDocument>(field: Key, value: TutorialDocument[Key]) => {
    setDocument((currentDocument) => {
      if (!currentDocument) {
        return currentDocument;
      }

      return {
        ...currentDocument,
        [field]: value,
      };
    });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f0fdf4,#fff7ed_42%,#eff6ff)] text-slate-900">
      <div className="mx-auto max-w-[1600px] px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-10">
        <header className="mb-4 rounded-2xl border border-white/60 bg-white/80 p-4 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.55)] backdrop-blur sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 sm:text-xs">Admin Studio</p>
              <h1 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">Manage Tutorial Content</h1>
              <p className="mt-2 text-sm text-slate-700">
                Edit lesson metadata and markdown here. Save will call a separate content backend when configured.
              </p>
            </div>

            <Link
              to="/react"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50"
            >
              Open Learner Site
            </Link>
          </div>
        </header>

        <div className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-slate-200/70 bg-white/80 p-4 shadow-[0_12px_35px_-20px_rgba(15,23,42,0.55)] backdrop-blur sm:p-5">
            <div className="grid gap-3">
              <label className="text-sm font-semibold text-slate-700" htmlFor="admin-track-selector">
                Track
              </label>
              <select
                id="admin-track-selector"
                value={selectedTrack}
                onChange={(event) => setSelectedTrack(event.target.value as TrackKey)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-emerald-500"
              >
                {tracks.map((track) => (
                  <option key={track.key} value={track.key}>
                    {track.label}
                  </option>
                ))}
              </select>

              <label className="text-sm font-semibold text-slate-700" htmlFor="admin-lesson-search">
                Search lesson
              </label>
              <input
                id="admin-lesson-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title, day, or slug"
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-emerald-500"
              />
            </div>

            <ul className="mt-4 max-h-[70vh] space-y-2 overflow-y-auto pr-1">
              {filteredTutorials.map((tutorial) => {
                const isActive = tutorial.slug === selectedTutorial?.slug;

                return (
                  <li key={`${tutorial.track}-${tutorial.slug}`}>
                    <button
                      type="button"
                      onClick={() => setSelectedSlug(tutorial.slug)}
                      className={`w-full rounded-2xl border px-3 py-3 text-left transition ${
                        isActive
                          ? "border-emerald-400 bg-emerald-50 text-slate-950"
                          : "border-transparent bg-slate-50/70 text-slate-700 hover:border-emerald-200 hover:bg-emerald-50/70"
                      }`}
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{tutorial.dayLabel}</p>
                      <p className="text-sm font-semibold leading-snug">{tutorial.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{tutorial.slug}</p>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          <section className="min-w-0 rounded-3xl border border-slate-200/70 bg-white/90 p-4 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.7)] sm:p-6">
            {selectedTutorial && document ? (
              <div className="space-y-5">
                <div className="grid gap-4 lg:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    <span>Title</span>
                    <input
                      type="text"
                      value={document.title}
                      onChange={(event) => handleFieldChange("title", event.target.value)}
                      className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-emerald-500"
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    <span>Slug</span>
                    <input
                      type="text"
                      value={document.slug}
                      onChange={(event) => handleFieldChange("slug", event.target.value)}
                      className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-emerald-500"
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    <span>Day Label</span>
                    <input
                      type="text"
                      value={document.dayLabel}
                      onChange={(event) => handleFieldChange("dayLabel", event.target.value)}
                      className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-emerald-500"
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    <span>Level</span>
                    <select
                      value={document.level}
                      onChange={(event) => handleFieldChange("level", event.target.value as TutorialMeta["level"])}
                      className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-emerald-500"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </label>

                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    <span>Estimated Minutes</span>
                    <input
                      type="number"
                      min={1}
                      value={document.estimatedMinutes}
                      onChange={(event) => handleFieldChange("estimatedMinutes", Number(event.target.value))}
                      className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-emerald-500"
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    <span>Order</span>
                    <input
                      type="number"
                      min={1}
                      value={document.order}
                      onChange={(event) => handleFieldChange("order", Number(event.target.value))}
                      className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-emerald-500"
                    />
                  </label>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                  <p>File: {document.contentPath}</p>
                  <p>Backend save target: {import.meta.env.VITE_CONTENT_API_BASE_URL || "Not configured"}</p>
                </div>

                <YouTubeVideosEditor
                  value={youtubeVideosText}
                  onChange={(nextValue) => {
                    setYoutubeVideosText(nextValue);

                    if (document) {
                        handleFieldChange("youtubeVideos", parseYouTubeVideosField(nextValue));
                    }
                  }}
                />

                <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-700">Content Editor</p>

                    <div className="inline-flex rounded-xl border border-slate-300 bg-slate-50 p-1">
                      {([
                        { key: "edit", label: "Edit" },
                        { key: "preview", label: "Preview" },
                        { key: "split", label: "Split" },
                      ] as const).map((item) => {
                        const isActive = editorView === item.key;

                        return (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => setEditorView(item.key)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${
                              isActive
                                ? "bg-emerald-500 text-white"
                                : "text-slate-700 hover:bg-emerald-50"
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className={editorView === "split" ? "grid gap-4 xl:grid-cols-2" : "grid gap-4"}>
                    {editorView !== "preview" ? (
                      <label className="grid gap-2 text-sm font-semibold text-slate-700">
                            <span>Markdown Content</span>
                        <textarea
                          value={document.body}
                          onChange={(event) => handleFieldChange("body", event.target.value)}
                              className="min-h-140 rounded-2xl border border-slate-300 bg-white px-3 py-3 font-mono text-sm text-slate-800 outline-none focus:border-emerald-500"
                        />
                      </label>
                    ) : null}

                    {editorView !== "edit" ? (
                      <div className="grid gap-2">
                        <p className="text-sm font-semibold text-slate-700">Preview</p>
                        <div className="min-h-140 max-h-[70vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4">
                          <MarkdownLesson markdown={document.body} onHashLinkClick={() => undefined} />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                {statusMessage ? <p className="text-sm font-semibold text-emerald-700">{statusMessage}</p> : null}
                {errorMessage ? <p className="text-sm font-semibold text-rose-700">{errorMessage}</p> : null}

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => selectedTutorial && setDocument(buildEmptyDocument(selectedTutorial))}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Reset Metadata
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleSave()}
                    disabled={isSaving || isLoading}
                    className="rounded-xl border border-emerald-500 bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSaving ? "Saving..." : "Save to Backend"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-sm text-slate-600">
                {isLoading ? "Loading tutorial..." : "Pick a tutorial from the left to start editing."}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}