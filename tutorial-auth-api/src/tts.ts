import os from "node:os";
import fs from "node:fs/promises";

type Language = "english" | "hindi";
type Gender = "male" | "female";
type TextChunk = { text: string; bold: boolean };

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

// Splits text into paragraphs, then into bold/normal runs based on **markdown** markers (asterisks are stripped).
function splitIntoChunks(text: string): TextChunk[] {
  const chunks: TextChunk[] = [];

  for (const rawParagraph of text.split(/\n+/)) {
    const paragraph = rawParagraph.trim();
    if (!paragraph) continue;

    for (const part of paragraph.split(/(\*\*[^*]+\*\*)/g)) {
      const boldMatch = /^\*\*([^*]+)\*\*$/.exec(part);
      if (boldMatch) {
        const boldText = stripEmoji(boldMatch[1]);
        if (boldText) chunks.push({ text: boldText, bold: true });
      } else {
        const normalText = stripEmoji(part);
        if (normalText) chunks.push({ text: normalText, bold: false });
      }
    }
  }

  return chunks;
}

// The free Edge TTS endpoint only reliably handles one prosody request per connection, so each
// chunk gets its own short-lived synthesis call and the resulting MP3 buffers are concatenated.
async function synthesizeChunks(
  voice: string,
  outputFormat: import("msedge-tts").OUTPUT_FORMAT,
  chunks: TextChunk[],
  baseRate: string,
): Promise<Buffer> {
  const { MsEdgeTTS } = await import("msedge-tts");
  const buffers: Buffer[] = [];
  const baseRateNumber = parseInt(baseRate, 10) || 0;
  const boldRateNumber = baseRateNumber - 12;
  const boldRate = `${boldRateNumber >= 0 ? "+" : ""}${boldRateNumber}%`;

  for (const chunk of chunks) {
    // "x-loud" is an absolute SSML volume level, so it stays audible regardless of the base volume,
    // and combined with a higher pitch + slower rate it reads as clearly stressed/bold.
    const options = chunk.bold
      ? { rate: boldRate, pitch: "+18%", volume: "x-loud" }
      : { rate: baseRate, volume: "soft" };

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
  rate: string,
): Promise<Buffer> {
  if (text.length > MAX_TEXT_LENGTH) {
    throw new Error(`Text must be ${MAX_TEXT_LENGTH} characters or fewer.`);
  }

  const voice = VOICES[language][gender];
  const { OUTPUT_FORMAT } = await import("msedge-tts");
  const chunks = splitIntoChunks(text);
  if (chunks.length === 0) chunks.push({ text, bold: false });

  return synthesizeChunks(
    voice,
    OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3,
    chunks,
    rate,
  );
}
