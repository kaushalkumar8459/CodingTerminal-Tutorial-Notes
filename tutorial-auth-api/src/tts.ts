import os from "node:os";
import fs from "node:fs/promises";

type Language = "english" | "hindi";
type Gender = "male" | "female";
type SpeechRate = "slow" | "normal" | "fast";
type TextChunk = { text: string };

const MAX_TEXT_LENGTH = 10000;

// Newest-generation Microsoft neural voices, tuned for the most natural, human-like prosody.
const VOICES: Record<Language, Record<Gender, string>> = {
  english: {
    male: "en-US-AndrewMultilingualNeural",
    female: "en-US-AvaMultilingualNeural",
  },
  hindi: {
    male: "hi-IN-MadhurNeural",
    female: "hi-IN-SwaraNeural",
  },
};

// Emoji/pictographs aren't speakable and can make the free endpoint return an empty audio stream.
function stripEmoji(text: string): string {
  return text
    .replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "")
    .trim();
}

// Split plain text into speakable paragraphs.
function splitIntoChunks(text: string): TextChunk[] {
  return text
    .split(/\n+/)
    .map(stripEmoji)
    .filter(Boolean)
    .map((paragraph) => ({ text: paragraph }));
}

// The free Edge TTS endpoint only reliably handles one prosody request per connection, so each
// chunk gets its own short-lived synthesis call and the resulting MP3 buffers are concatenated.
async function synthesizeChunks(
  voice: string,
  outputFormat: import("msedge-tts").OUTPUT_FORMAT,
  chunks: TextChunk[],
  baseRate: SpeechRate,
): Promise<Buffer> {
  const { MsEdgeTTS } = await import("msedge-tts");
  const buffers: Buffer[] = [];
  const edgeRate = baseRate === "normal" ? "medium" : baseRate;

  for (const chunk of chunks) {
    const options = { rate: edgeRate, volume: "soft" };

    const tts = new MsEdgeTTS();
    await tts.setMetadata(voice, outputFormat);

    let audioFilePath: string;
    try {
      ({ audioFilePath } = await tts.toFile(os.tmpdir(), chunk.text, options));
    } catch (err) {
      // A stray, unspeakable fragment (e.g. leftover punctuation) shouldn't fail the whole request.
      console.warn(
        "Skipping unspeakable chunk:",
        chunk.text,
        err instanceof Error ? err.message : err,
      );
      continue;
    }

    buffers.push(await fs.readFile(audioFilePath));
    const metadataFilePath = audioFilePath.replace(/\.mp3$/, ".json");
    await Promise.all([
      fs.unlink(audioFilePath).catch(() => {}),
      fs.unlink(metadataFilePath).catch(() => {}),
    ]);
  }

  return Buffer.concat(buffers);
}

export async function synthesizeSpeech(
  text: string,
  gender: Gender,
  language: Language,
  rate: SpeechRate,
): Promise<Buffer> {
  if (text.length > MAX_TEXT_LENGTH) {
    throw new Error(`Text must be ${MAX_TEXT_LENGTH} characters or fewer.`);
  }

  const voice = VOICES[language][gender];
  const { OUTPUT_FORMAT } = await import("msedge-tts");
  const chunks = splitIntoChunks(text);
  if (chunks.length === 0) chunks.push({ text });

  return synthesizeChunks(
    voice,
    OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3,
    chunks,
    rate,
  );
}
