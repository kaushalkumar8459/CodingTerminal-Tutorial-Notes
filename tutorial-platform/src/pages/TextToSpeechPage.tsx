import { useEffect, useMemo, useRef, useState } from "react";

const MAX_LEN = 5000;
const FEMALE_HINTS = ["female", "zira", "susan", "samantha", "victoria", "hazel", "aria", "jenny", "karen", "moira", "tessa"];
const MALE_HINTS = ["male", "david", "mark", "daniel", "alex", "fred", "george", "guy", "james"];

type Gender = "male" | "female";
type Language = "english" | "hindi";

function pickVoice(voices: SpeechSynthesisVoice[], gender: Gender, language: Language) {
  if (!voices.length) return null;
  const localeVoices = voices.filter((v) => v.lang.toLowerCase().startsWith(language === "hindi" ? "hi" : "en"));
  const pool = localeVoices.length ? localeVoices : voices;
  const hints = gender === "female" ? FEMALE_HINTS : MALE_HINTS;
  return pool.find((v) => hints.some((h) => v.name.toLowerCase().includes(h))) ?? pool[0];
}

export function TextToSpeechPage() {
  const [text, setText] = useState("Hello! This is a sample of text to speech conversion.");
  const [gender, setGender] = useState<Gender>("male");
  const [language, setLanguage] = useState<Language>("english");
  const [rate, setRate] = useState(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [status, setStatus] = useState<{ message: string; isError: boolean } | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
      window.speechSynthesis?.cancel();
    };
  }, []);

  const charCount = useMemo(() => `${text.length} / ${MAX_LEN}`, [text]);

  function speak(trimmed: string) {
    const utterance = new SpeechSynthesisUtterance(trimmed);
    const voice = pickVoice(voices, gender, language);
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    utterance.onstart = () => {
      setIsSpeaking(true);
      setStatus({ message: "Playing preview…", isError: false });
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setStatus({ message: "Preview finished.", isError: false });
    };
    utterance.onerror = (event) => {
      setIsSpeaking(false);
      // "canceled"/"interrupted" fire when we stop it ourselves — not a real failure.
      if (event.error === "canceled" || event.error === "interrupted") return;
      setStatus({ message: "Preview playback failed.", isError: true });
    };
    window.speechSynthesis.speak(utterance);
  }

  function handlePreviewToggle() {
    if (!("speechSynthesis" in window)) {
      return setStatus({ message: "Speech preview is not supported in this browser.", isError: true });
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setStatus({ message: "Stopped.", isError: false });
      return;
    }

    const trimmed = text.trim();
    if (!trimmed) return setStatus({ message: "Please enter some text first.", isError: true });

    // Chrome can silently fail the very first speak() right after a cancel(); a short delay avoids it.
    window.speechSynthesis.cancel();
    setTimeout(() => speak(trimmed), 50);
  }

  async function handleDownload() {
    const trimmed = text.trim();
    if (!trimmed) return setStatus({ message: "Please enter some text first.", isError: true });

    setIsDownloading(true);
    setStatus({ message: "Generating audio…", isError: false });

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed, gender, language }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to generate audio.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      audioUrlRef.current = url;

      const a = document.createElement("a");
      a.href = url;
      a.download = "speech.mp3";
      document.body.appendChild(a);
      a.click();
      a.remove();

      setStatus({ message: "Audio downloaded successfully.", isError: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to generate audio.";
      setStatus({ message, isError: true });
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ecfeff,#fff8e7_42%,#eef2ff)] text-slate-900">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Tools</p>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">🔊 Text to Speech</h1>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          Type some text, choose a voice, then preview it in your browser or download it as a real audio file.
          Wrap words in <strong>**double asterisks**</strong> to make the downloaded audio speak them with emphasis (louder, slightly slower).
        </p>

        <div className="mt-6 rounded-2xl border border-white/60 bg-white/80 p-4 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.55)] backdrop-blur sm:p-6">
          <textarea
            value={text}
            maxLength={MAX_LEN}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste text here..."
            className="min-h-36 w-full resize-y rounded-xl border border-slate-300 p-3 text-sm focus:border-cyan-500 focus:outline-none"
          />
          <div className="mt-1 text-right text-xs text-slate-500">{charCount}</div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label className="text-sm font-semibold text-slate-700" htmlFor="tts-language">Language:</label>
            <select
              id="tts-language"
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="english">English</option>
              <option value="hindi">Hindi (भारतीय आवाज़)</option>
            </select>

            <label className="text-sm font-semibold text-slate-700" htmlFor="tts-gender">Voice:</label>
            <select
              id="tts-gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <label className="text-sm font-semibold text-slate-700" htmlFor="tts-rate">Speed:</label>
            <select
              id="tts-rate"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value={0.75}>Slow</option>
              <option value={1}>Normal</option>
              <option value={1.25}>Fast</option>
            </select>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handlePreviewToggle}
              className={`w-48 shrink-0 cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${
                isSpeaking ? "bg-slate-700 hover:bg-slate-800" : "bg-cyan-600 hover:bg-cyan-700"
              }`}
            >
              {isSpeaking ? "■ Stop" : "▶ Preview in browser"}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-48 shrink-0 cursor-pointer rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              ⬇ {isDownloading ? "Generating…" : "Download audio"}
            </button>
          </div>

          {status ? (
            <p className={`mt-3 text-sm ${status.isError ? "text-rose-600" : "text-slate-600"}`}>{status.message}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
