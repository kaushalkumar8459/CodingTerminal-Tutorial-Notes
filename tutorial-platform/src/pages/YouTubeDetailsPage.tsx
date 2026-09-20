import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const apiBaseUrl = import.meta.env.VITE_AUTH_API_BASE_URL?.trim() || "";
const STORAGE_KEY = "youtube-details-sticky-note";

type VideoDetails = {
  title: string;
  description: string;
  hashtags: string[];
  thumbnailUrl: string;
  videoUrl: string;
};

type VideoSuggestions = {
  title: string;
  description: string;
  hashtags: string[];
  keywords: string[];
};

type StoredYouTubeDetails = {
  url: string;
  details: VideoDetails | null;
  aiSuggestions: VideoSuggestions | null;
  videoContext: string;
};

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isVideoDetails(value: unknown): value is VideoDetails {
  if (!value || typeof value !== "object") return false;
  const data = value as Record<string, unknown>;
  return typeof data.title === "string" &&
    typeof data.description === "string" &&
    isStringArray(data.hashtags) &&
    typeof data.thumbnailUrl === "string" &&
    typeof data.videoUrl === "string";
}

function isVideoSuggestions(value: unknown): value is VideoSuggestions {
  if (!value || typeof value !== "object") return false;
  const data = value as Record<string, unknown>;
  return typeof data.title === "string" &&
    typeof data.description === "string" &&
    isStringArray(data.hashtags) &&
    isStringArray(data.keywords);
}

function loadStoredYouTubeDetails(): StoredYouTubeDetails {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { url: "", details: null, aiSuggestions: null, videoContext: "" };

    const data = JSON.parse(raw) as Record<string, unknown>;
    return {
      url: typeof data.url === "string" ? data.url : "",
      details: isVideoDetails(data.details) ? data.details : null,
      aiSuggestions: isVideoSuggestions(data.aiSuggestions) ? data.aiSuggestions : null,
      videoContext: typeof data.videoContext === "string" ? data.videoContext.slice(0, 2000) : "",
    };
  } catch {
    return { url: "", details: null, aiSuggestions: null, videoContext: "" };
  }
}

const STOP_WORDS = new Set([
  "about", "after", "and", "are", "but", "for", "from", "have", "how", "into",
  "its", "just", "more", "not", "our", "that", "the", "this", "to", "with", "you",
]);

function createSuggestions(details: VideoDetails) {
  const words = `${details.title} ${details.description}`
    .toLowerCase()
    .match(/[\p{L}\p{N}]{3,}/gu) ?? [];
  const keywords = [...new Set(words.filter((word) => !STOP_WORDS.has(word)))].slice(0, 12);
  const hashtags = [...new Set([
    ...details.hashtags,
    ...keywords.slice(0, 8).map((word) => `#${word.replace(/[^\p{L}\p{N}_]/gu, "")}`),
  ])].filter((hashtag) => hashtag.length > 1).slice(0, 15);
  const title = details.title.trim().replace(/\s+/g, " ").slice(0, 100);
  const description = [
    details.description.trim(),
    "",
    hashtags.join(" "),
  ].filter(Boolean).join("\n");

  return { title, keywords, hashtags, description };
}

export function YouTubeDetailsPage() {
  const [storedDetails] = useState(loadStoredYouTubeDetails);
  const [url, setUrl] = useState(storedDetails.url);
  const [details, setDetails] = useState<VideoDetails | null>(storedDetails.details);
  const [status, setStatus] = useState<{ message: string; isError: boolean } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<VideoSuggestions | null>(storedDetails.aiSuggestions);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<{ message: string; isError: boolean } | null>(null);
  const [videoContext, setVideoContext] = useState(storedDetails.videoContext);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      url,
      details,
      aiSuggestions,
      videoContext,
    } satisfies StoredYouTubeDetails));
  }, [aiSuggestions, details, url, videoContext]);

  function handleClearSavedDetails() {
    localStorage.removeItem(STORAGE_KEY);
    setUrl("");
    setDetails(null);
    setAiSuggestions(null);
    setAiFeedback(null);
    setVideoContext("");
    setStatus({ message: "Saved video details cleared.", isError: false });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      setStatus({ message: "Enter a YouTube video URL.", isError: true });
      return;
    }

    if (!apiBaseUrl) {
      setStatus({ message: "Configure VITE_AUTH_API_BASE_URL to look up video details.", isError: true });
      return;
    }

    setIsLoading(true);
    setStatus(null);
    setDetails(null);
    setAiSuggestions(null);
    setAiFeedback(null);
    setVideoContext("");

    try {
      const response = await fetch(`${apiBaseUrl}/youtube/details`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmedUrl }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to load video details.");
      }

      setDetails(data.video);
    } catch (error) {
      setStatus({
        message: error instanceof Error ? error.message : "Unable to load video details.",
        isError: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCopyDetails() {
    if (!details) return;

    const content = [
      details.title,
      "",
      details.description,
      "",
      details.hashtags.join(" "),
      details.videoUrl,
    ].filter(Boolean).join("\n");

    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setStatus({ message: "Video details copied.", isError: false });
      window.setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setStatus({ message: "Could not copy video details in this browser.", isError: true });
    }
  }

  async function handleCopySuggestions() {
    if (!details) return;

    const suggestions = aiSuggestions ?? createSuggestions(details);
    const content = [
      `Suggested title: ${suggestions.title}`,
      "",
      "Suggested description:",
      suggestions.description,
      "",
      `Keywords: ${suggestions.keywords.join(", ")}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setStatus({ message: "Suggestions copied.", isError: false });
      window.setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setStatus({ message: "Could not copy suggestions in this browser.", isError: true });
    }
  }

  async function handleGenerateAiSuggestions() {
    if (!details || !apiBaseUrl) return;

    setIsGeneratingSuggestions(true);
    setAiFeedback(null);

    try {
      const response = await fetch(`${apiBaseUrl}/youtube/suggestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: details.title,
          description: details.description,
          hashtags: details.hashtags,
          videoUrl: details.videoUrl,
          videoContext: videoContext.trim(),
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to generate AI suggestions.");
      }

      setAiSuggestions(data.suggestions);
      setAiFeedback({ message: "AI suggestions are ready.", isError: false });
    } catch (error) {
      setAiFeedback({
        message: error instanceof Error ? error.message : "Unable to generate AI suggestions.",
        isError: true,
      });
    } finally {
      setIsGeneratingSuggestions(false);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ecfeff,#fff8e7_42%,#eef2ff)] text-slate-900">
      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 transition hover:text-cyan-700"
        >
          &larr; Back to Home
        </Link>

        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Tools</p>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">YouTube Details</h1>
        <div className="mt-3 flex items-center justify-between gap-3 text-xs">
          <span className="font-semibold text-amber-700">Saved automatically on this device</span>
          <button
            type="button"
            onClick={handleClearSavedDetails}
            className="font-semibold text-slate-500 underline-offset-2 hover:text-rose-600 hover:underline"
          >
            Clear saved details
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex gap-2 rounded-xl border border-white/60 bg-white/80 p-3 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.55)] backdrop-blur sm:p-4"
        >
          <label className="sr-only" htmlFor="youtube-url">YouTube video URL</label>
          <input
            id="youtube-url"
            type="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-cyan-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isLoading ? (
              <>
                <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Loading...
              </>
            ) : "Get details"}
          </button>
        </form>

        {status ? (
          <p className={`mt-3 text-sm ${status.isError ? "text-rose-600" : "text-slate-600"}`}>{status.message}</p>
        ) : null}

        {details ? (
          <article className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_12px_30px_-24px_rgba(15,23,42,0.6)]">
            <img
              src={details.thumbnailUrl}
              alt=""
              className="aspect-video w-full bg-slate-100 object-cover"
            />
            <div className="p-4 sm:p-6">
              <h2 className="text-xl font-bold text-slate-950">{details.title}</h2>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">{details.description || "No description available."}</p>

              {details.hashtags.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2" aria-label="Video hashtags">
                  {details.hashtags.map((hashtag) => (
                    <span key={hashtag} className="rounded-md bg-cyan-50 px-2 py-1 text-xs font-semibold text-cyan-800">
                      {hashtag}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleCopyDetails}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-cyan-50"
                >
                  {isCopied ? "Copied!" : "Copy details"}
                </button>
                {isCopied ? (
                  <span role="status" className="inline-flex items-center text-sm font-semibold text-emerald-700">
                    Copied to clipboard
                  </span>
                ) : null}
                <a
                  href={details.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-cyan-50"
                >
                  Open on YouTube
                </a>
              </div>

              {(() => {
                const suggestions = aiSuggestions ?? createSuggestions(details);

                return (
                  <section className="mt-6 border-t border-slate-200 pt-5" aria-labelledby="suggestions-heading">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 id="suggestions-heading" className="text-base font-bold text-slate-950">Suggested metadata</h3>
                      <button
                        type="button"
                        onClick={handleCopySuggestions}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-cyan-50"
                      >
                        Copy suggestions
                      </button>
                      <button
                        type="button"
                        onClick={handleGenerateAiSuggestions}
                        disabled={isGeneratingSuggestions}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                      >
                        {isGeneratingSuggestions ? (
                          <>
                            <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                            Generating...
                          </>
                        ) : "AI improve suggestions"}
                      </button>
                    </div>

                    {aiFeedback ? (
                      <p role="status" className={`mt-4 text-sm font-semibold ${aiFeedback.isError ? "text-rose-600" : "text-emerald-700"}`}>
                        {aiFeedback.message}
                      </p>
                    ) : null}
                    <label className="mt-4 block text-sm font-semibold text-slate-700" htmlFor="video-context">
                      Video context for AI (optional)
                    </label>
                    <textarea
                      id="video-context"
                      value={videoContext}
                      maxLength={2000}
                      onChange={(event) => setVideoContext(event.target.value)}
                      placeholder="Describe what happens in the video, its audience, key products, tone, or important words."
                      className="mt-2 min-h-24 w-full resize-y rounded-lg border border-slate-300 bg-white p-3 text-sm font-normal outline-none transition focus:border-cyan-500"
                    />
                    <p className="mt-1 text-right text-xs font-normal text-slate-500">{videoContext.length} / 2000</p>

                    <div className="mt-4 space-y-4 text-sm">
                      <div>
                        <p className="font-semibold text-slate-700">Title</p>
                        <p className="mt-1 text-slate-900">{suggestions.title}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-700">Hashtags</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {suggestions.hashtags.map((hashtag) => (
                            <span key={hashtag} className="rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-800">{hashtag}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-700">Keywords</p>
                        <p className="mt-1 text-slate-700">{suggestions.keywords.join(", ")}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-700">Description</p>
                        <p className="mt-1 whitespace-pre-wrap leading-6 text-slate-700">{suggestions.description || "Add a description for this video."}</p>
                      </div>
                    </div>
                  </section>
                );
              })()}
            </div>
          </article>
        ) : null}
      </main>
    </div>
  );
}
