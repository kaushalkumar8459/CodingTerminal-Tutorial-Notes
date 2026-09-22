import { useEffect, useMemo, useRef, useState } from "react";

type AudioPlayerProps = Readonly<{
  markdown: string;
  title: string;
}>;

/** Strip markdown syntax and return plain readable text */
function markdownToPlainText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, "Code block omitted.")   // fenced code blocks
    .replace(/`[^`]+`/g, "")                              // inline code
    .replace(/!\[.*?\]\(.*?\)/g, "")                      // images
    .replace(/\]\([^)\s]*\)/g, "")                        // strip link URLs ](url)
    .replace(/[[\]]/g, "")                                 // strip remaining brackets
    .replace(/^#{1,6}\s+/gm, "")                          // headings
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, "$1")        // bold/italic
    .replace(/^[ \t]*[-*+][ \t]+/gm, "")                  // unordered list bullets
    .replace(/^[ \t]*\d+\.[ \t]+/gm, "")                  // ordered list numbers
    .replace(/^[ \t]*>[ \t]+/gm, "")                      // blockquotes
    .replace(/\n{3,}/g, "\n\n")                           // collapse extra blank lines
    .trim();
}

function splitTextIntoSpeechChunks(text: string) {
  const normalizedText = text.replace(/\s+/g, " ").trim();

  if (!normalizedText) {
    return [];
  }

  const sentences = normalizedText.match(/[^.!?]+[.!?]?/g) ?? [normalizedText];
  const chunks: string[] = [];
  let currentChunk = "";

  const pushChunk = (value: string) => {
    const trimmedValue = value.trim();

    if (trimmedValue) {
      chunks.push(trimmedValue);
    }
  };

  const splitOversizedSentence = (sentence: string) => {
    const words = sentence.split(" ");
    let wordChunk = "";

    for (const word of words) {
      const wordCandidate = wordChunk ? `${wordChunk} ${word}` : word;

      if (wordCandidate.length <= 260) {
        wordChunk = wordCandidate;
        continue;
      }

      pushChunk(wordChunk);
      wordChunk = word;
    }

    return wordChunk;
  };

  for (const sentence of sentences) {
    const nextSentence = sentence.trim();

    if (!nextSentence) {
      continue;
    }

    const candidate = currentChunk ? `${currentChunk} ${nextSentence}` : nextSentence;

    if (candidate.length <= 260) {
      currentChunk = candidate;
      continue;
    }

    pushChunk(currentChunk);

    if (nextSentence.length <= 260) {
      currentChunk = nextSentence;
      continue;
    }

    currentChunk = splitOversizedSentence(nextSentence);
  }

  pushChunk(currentChunk);

  return chunks;
}

export function AudioPlayer({ markdown, title }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [rate, setRate] = useState(1);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const playbackTokenRef = useRef(0);
  const chunks = useMemo(() => {
    const plainText = `${title}. ${markdownToPlainText(markdown)}`;
    return splitTextIntoSpeechChunks(plainText);
  }, [markdown, title]);

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setIsSupported(false);
    }
  }, []);

  // Stop speech when the markdown content changes (user navigated to a new lesson)
  useEffect(() => {
    return () => {
      playbackTokenRef.current += 1;
      window.speechSynthesis?.cancel();
    };
  }, [markdown]);

  useEffect(() => {
    setCurrentChunkIndex(0);
    setIsPlaying(false);
    setIsPaused(false);
    playbackTokenRef.current += 1;
    window.speechSynthesis?.cancel();
  }, [chunks]);

  const stop = () => {
    playbackTokenRef.current += 1;
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentChunkIndex(0);
  };

  const playChunkSequence = (index: number, playbackRate: number, token: number) => {
    const nextChunk = chunks[index];

    if (!nextChunk) {
      utteranceRef.current = null;
      setIsPlaying(false);
      setIsPaused(false);
      return;
    }

    setCurrentChunkIndex(index);

    const utterance = new SpeechSynthesisUtterance(nextChunk);
    utterance.rate = playbackRate;
    utterance.lang = "en-US";

    utterance.onend = () => {
      if (playbackTokenRef.current !== token) {
        return;
      }

      const nextIndex = index + 1;

      if (nextIndex >= chunks.length) {
        utteranceRef.current = null;
        setIsPlaying(false);
        setIsPaused(false);
        return;
      }

      playChunkSequence(nextIndex, playbackRate, token);
    };

    utterance.onerror = () => {
      if (playbackTokenRef.current !== token) {
        return;
      }

      utteranceRef.current = null;
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const startPlayback = (index: number, playbackRate = rate) => {
    if (chunks.length === 0) {
      return;
    }

    const clampedIndex = Math.max(0, Math.min(index, chunks.length - 1));
    const token = playbackTokenRef.current + 1;
    playbackTokenRef.current = token;
    window.speechSynthesis.cancel();
    playChunkSequence(clampedIndex, playbackRate, token);
  };

  const play = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    startPlayback(currentChunkIndex);
  };

  const pause = () => {
    window.speechSynthesis.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const seekBy = (direction: -1 | 1) => {
    if (chunks.length === 0) {
      return;
    }

    const nextIndex = Math.max(0, Math.min(currentChunkIndex + direction, chunks.length - 1));

    if (nextIndex === currentChunkIndex) {
      return;
    }

    if (isPlaying || isPaused) {
      startPlayback(nextIndex);
      return;
    }

    setCurrentChunkIndex(nextIndex);
  };

  const handleRateChange = (newRate: number) => {
    setRate(newRate);

    if (isPlaying || isPaused) {
      startPlayback(currentChunkIndex, newRate);
    }
  };

  if (!isSupported) {
    return null;
  }

  let playButtonLabel: string;
  if (isPlaying) {
    playButtonLabel = "Pause audio";
  } else if (isPaused) {
    playButtonLabel = "Resume audio";
  } else {
    playButtonLabel = "Play audio";
  }

  let statusText: string;
  let statusClass: string;
  if (isPlaying) {
    statusText = "Playing\u2026";
    statusClass = "bg-emerald-100 text-emerald-700";
  } else if (isPaused) {
    statusText = "Paused";
    statusClass = "bg-amber-100 text-amber-700";
  } else {
    statusText = "Ready";
    statusClass = "bg-slate-100 text-slate-500";
  }

  const progressPercent = chunks.length > 0 ? ((currentChunkIndex + 1) / chunks.length) * 100 : 0;
  const partLabel = chunks.length > 0 ? `Part ${currentChunkIndex + 1} of ${chunks.length}` : "No audio";

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">Listen to this lesson</span>
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusClass}`}>
          {statusText}
        </span>
        <span className="text-xs text-slate-500">{partLabel}</span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={isPlaying ? pause : play}
          aria-label={playButtonLabel}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 active:scale-95"
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 translate-x-px">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        <button
          type="button"
          onClick={() => seekBy(-1)}
          aria-label="Previous audio section"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M18.53 5.22a.75.75 0 0 1-.31 1.02L11.5 10v4l6.72 3.76a.75.75 0 1 1-.72 1.3l-7.13-4A.75.75 0 0 1 10 14.4V9.6a.75.75 0 0 1 .37-.66l7.13-4a.75.75 0 0 1 1.03.28Z" />
            <path d="M6.75 4.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-1.5 0V5.25a.75.75 0 0 1 .75-.75Z" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => seekBy(1)}
          aria-label="Next audio section"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M5.78 4.94a.75.75 0 0 1 1.03-.28l7.13 4a.75.75 0 0 1 .37.66v4.8a.75.75 0 0 1-.37.66l-7.13 4a.75.75 0 0 1-.72-1.3L12.81 14v-4L6.09 6.24a.75.75 0 0 1-.31-1.02Z" />
            <path d="M17.25 4.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-1.5 0V5.25a.75.75 0 0 1 .75-.75Z" />
          </svg>
        </button>

        {(isPlaying || isPaused) && (
          <button
            type="button"
            onClick={stop}
            aria-label="Stop audio"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:bg-rose-50 hover:text-rose-600 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9z" clipRule="evenodd" />
            </svg>
          </button>
        )}

        <div className="min-w-40 flex-1">
          <div className="h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-linear-to-r from-cyan-500 to-sky-500 transition-[width] duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-xs text-slate-500">Speed:</span>
          {[0.75, 1, 1.25, 1.5, 2].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => handleRateChange(r)}
              className={`rounded-lg border px-2 py-0.5 text-xs font-semibold transition ${
                rate === r
                  ? "border-cyan-400 bg-cyan-100 text-cyan-800"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-cyan-50"
              }`}
            >
              {r}×
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
