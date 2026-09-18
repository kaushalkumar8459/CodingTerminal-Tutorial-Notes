import os from "node:os";
import fs from "node:fs/promises";
import type { IncomingMessage } from "node:http";
import type { Plugin } from "vite";

const MAX_TEXT_LENGTH = 5000;

type Language = "english" | "hindi";

// Newest-generation Microsoft neural voices, tuned for the most natural, human-like prosody.
const VOICES: Record<Language, Record<"male" | "female", string>> = {
  english: {
    male: "en-US-AndrewMultilingualNeural",
    female: "en-US-AvaMultilingualNeural",
  },
  hindi: {
    male: "hi-IN-MadhurNeural",
    female: "hi-IN-SwaraNeural",
  },
};

type TextChunk = { text: string; bold: boolean };

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

function readJsonBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk: Buffer) => {
      raw += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("Invalid JSON body."));
      }
    });
    req.on("error", reject);
  });
}

export function ttsMiddlewarePlugin(): Plugin {
  return {
    name: "tts-middleware",
    configureServer(server) {
      server.middlewares.use("/api/tts", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end("Method Not Allowed");
          return;
        }

        try {
          const body = await readJsonBody(req);
          const text = typeof body.text === "string" ? body.text.trim() : "";
          const gender = body.gender === "female" ? "female" : "male";
          const language: Language =
            body.language === "hindi" ? "hindi" : "english";
          const rate =
            typeof body.rate === "string" && /^[+-]\d+%$/.test(body.rate)
              ? body.rate
              : "+0%";

          if (!text) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Text is required." }));
            return;
          }
          if (text.length > MAX_TEXT_LENGTH) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                error: `Text must be ${MAX_TEXT_LENGTH} characters or fewer.`,
              }),
            );
            return;
          }

          const voice = VOICES[language][gender];
          const { OUTPUT_FORMAT } = await import("msedge-tts");
          const chunks = splitIntoChunks(text);
          if (chunks.length === 0) chunks.push({ text, bold: false });

          const audio = await synthesizeChunks(
            voice,
            OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3,
            chunks,
            rate,
          );

          res.statusCode = 200;
          res.setHeader("Content-Type", "audio/mpeg");
          res.setHeader(
            "Content-Disposition",
            'attachment; filename="speech.mp3"',
          );
          res.end(audio);
        } catch (err) {
          console.error(
            "TTS generation failed:",
            err instanceof Error ? err.message : err,
          );
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error:
                "Failed to generate audio. Check your internet connection and try again.",
            }),
          );
        }
      });
    },
  };
}
