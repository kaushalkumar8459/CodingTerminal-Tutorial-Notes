import dotenv from "dotenv";
import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import helmet from "helmet";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { synthesizeSpeech } from "./tts.js";

const runtimeMode =
  process.env.NODE_ENV === "production" ? "production" : "development";
dotenv.config({ path: `.env.${runtimeMode}` });
dotenv.config();

type UserRole = "admin" | "user";

type AuthUser = {
  username: string;
  role: UserRole;
};

type LoginBody = {
  username?: string;
  password?: string;
  role?: UserRole;
};

type SaveTutorialBody = {
  contentPath?: string;
  rawContent?: string;
};

type TtsBody = {
  text?: string;
  gender?: "male" | "female";
  language?: "english" | "hindi";
  rate?: "slow" | "normal" | "fast";
};

type YouTubeDetailsBody = {
  url?: string;
};

type VideoSuggestionsBody = {
  title?: string;
  description?: string;
  hashtags?: string[];
  videoUrl?: string;
  videoContext?: string;
};

const app = express();
const port = Number(process.env.PORT ?? 4001);
const frontendOrigin = process.env.FRONTEND_ORIGIN ?? "http://localhost:5173";
const jwtSecret = process.env.JWT_SECRET ?? "replace-me-in-production";

const credentialBook: Record<UserRole, { username: string; password: string }> =
  {
    admin: {
      username: (process.env.ADMIN_USERNAME ?? "admin").trim().toLowerCase(),
      password: process.env.ADMIN_PASSWORD ?? "admin123",
    },
    user: {
      username: (process.env.USER_USERNAME ?? "user").trim().toLowerCase(),
      password: process.env.USER_PASSWORD ?? "user123",
    },
  };

app.use(helmet());
app.use(cors({ origin: frontendOrigin, credentials: true }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "tutorial-auth-api" });
});

function getYouTubeVideoId(rawUrl: string) {
  try {
    const url = new URL(rawUrl);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    let videoId = "";

    if (host === "youtu.be") {
      videoId = url.pathname.slice(1).split("/")[0] ?? "";
    } else if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "music.youtube.com"
    ) {
      videoId = url.searchParams.get("v") ?? "";

      if (!videoId) {
        const [route, id] = url.pathname.split("/").filter(Boolean);
        if (route === "shorts" || route === "embed" || route === "live") {
          videoId = id ?? "";
        }
      }
    }

    return /^[a-zA-Z0-9_-]{11}$/.test(videoId) ? videoId : null;
  } catch {
    return null;
  }
}

function extractHashtags(description: string) {
  return [...new Set(description.match(/#[\p{L}\p{N}_]+/gu) ?? [])].slice(
    0,
    30,
  );
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

app.post(
  "/youtube/suggestions",
  async (
    req: Request<unknown, unknown, VideoSuggestionsBody>,
    res: Response,
  ) => {
    const title = req.body.title?.trim() ?? "";
    const description = req.body.description?.trim() ?? "";
    const hashtags = isStringArray(req.body.hashtags)
      ? req.body.hashtags.slice(0, 30)
      : [];
    const videoUrl = req.body.videoUrl?.trim() ?? "";
    const videoContext = req.body.videoContext?.trim().slice(0, 2000) ?? "";
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    const model = process.env.GEMINI_MODEL?.trim() || "gemini-2.0-flash";

    if (!title) {
      return res
        .status(400)
        .json({ ok: false, message: "Video title is required." });
    }

    if (!apiKey) {
      return res.status(503).json({
        ok: false,
        message:
          "Configure GEMINI_API_KEY on the server to generate AI suggestions.",
      });
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `Create improved YouTube metadata from the untrusted source data below. The video URL is contextual reference only; do not claim to have accessed it. Give priority to the creator-provided video context when it is supplied. Return JSON only with title, description, hashtags, and keywords. Title must be concise and under 100 characters. Provide 5-12 relevant hashtags, each starting with #, and 5-15 keywords. Do not invent factual claims, links, or credentials.\n\nVideo URL: ${videoUrl || "Not supplied"}\n\nCreator-provided video context: ${videoContext || "Not supplied"}\n\nSource title: ${title}\n\nSource description: ${description.slice(0, 6000)}\n\nExisting hashtags: ${hashtags.join(" ")}`,
                  },
                ],
              },
            ],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.6,
            },
          }),
        },
      );

      if (!response.ok) {
        const errorPayload = (await response.json().catch(() => ({}))) as {
          error?: { message?: string };
        };
        const message =
          errorPayload.error?.message?.replace(
            /key=[^\s&]+/gi,
            "key=[redacted]",
          ) ?? "Unknown Gemini API error.";
        return res.status(response.status).json({
          ok: false,
          message: `Gemini API: ${message}`,
        });
      }

      const payload = (await response.json()) as {
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      };
      const text = payload.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      const suggestion = JSON.parse(text) as Record<string, unknown>;

      if (
        typeof suggestion.title !== "string" ||
        typeof suggestion.description !== "string" ||
        !isStringArray(suggestion.hashtags) ||
        !isStringArray(suggestion.keywords)
      ) {
        throw new Error("Gemini returned an invalid suggestion format.");
      }

      return res.json({
        ok: true,
        suggestions: {
          title: suggestion.title.trim().slice(0, 100),
          description: suggestion.description.trim().slice(0, 6000),
          hashtags: suggestion.hashtags
            .map((hashtag) => hashtag.trim())
            .filter((hashtag) => /^#[\p{L}\p{N}_]+$/u.test(hashtag))
            .slice(0, 15),
          keywords: suggestion.keywords
            .map((keyword) => keyword.trim())
            .filter(Boolean)
            .slice(0, 15),
        },
      });
    } catch (error) {
      console.error("Gemini suggestion generation failed:", error);
      return res.status(502).json({
        ok: false,
        message: "Unable to generate AI suggestions right now.",
      });
    }
  },
);

app.post(
  "/youtube/details",
  async (req: Request<unknown, unknown, YouTubeDetailsBody>, res: Response) => {
    const videoId = getYouTubeVideoId(req.body.url?.trim() ?? "");
    const apiKey = process.env.YOUTUBE_API_KEY?.trim();

    if (!videoId) {
      return res.status(400).json({
        ok: false,
        message: "Enter a valid YouTube video URL.",
      });
    }

    if (!apiKey) {
      return res.status(503).json({
        ok: false,
        message:
          "Configure YOUTUBE_API_KEY on the server to look up video details.",
      });
    }

    try {
      const apiUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
      apiUrl.searchParams.set("part", "snippet");
      apiUrl.searchParams.set("id", videoId);
      apiUrl.searchParams.set("key", apiKey);

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`YouTube API responded with ${response.status}.`);
      }

      const payload = (await response.json()) as {
        items?: Array<{
          snippet?: {
            title?: string;
            description?: string;
            thumbnails?: Record<string, { url?: string }>;
          };
        }>;
      };
      const snippet = payload.items?.[0]?.snippet;

      if (!snippet?.title) {
        return res.status(404).json({
          ok: false,
          message: "No public video was found for this URL.",
        });
      }

      const description = snippet.description ?? "";
      const thumbnailUrl =
        snippet.thumbnails?.maxres?.url ??
        snippet.thumbnails?.standard?.url ??
        snippet.thumbnails?.high?.url ??
        snippet.thumbnails?.medium?.url ??
        snippet.thumbnails?.default?.url ??
        "";

      return res.json({
        ok: true,
        video: {
          title: snippet.title,
          description,
          hashtags: extractHashtags(description),
          thumbnailUrl,
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        },
      });
    } catch (error) {
      console.error("YouTube details lookup failed:", error);
      return res.status(502).json({
        ok: false,
        message: "Unable to retrieve video details from YouTube right now.",
      });
    }
  },
);

app.post(
  "/auth/login",
  (req: Request<unknown, unknown, LoginBody>, res: Response) => {
    const role = req.body.role;
    const username = req.body.username?.trim().toLowerCase() ?? "";
    const password = req.body.password ?? "";

    if (role !== "admin" && role !== "user") {
      return res
        .status(400)
        .json({ ok: false, message: "Role must be admin or user." });
    }

    const expectedCredential = credentialBook[role];

    if (
      username !== expectedCredential.username ||
      password !== expectedCredential.password
    ) {
      return res
        .status(401)
        .json({ ok: false, message: "Invalid credentials." });
    }

    const user: AuthUser = {
      username: expectedCredential.username,
      role,
    };

    const token = jwt.sign(user, jwtSecret, { expiresIn: "8h" });

    return res.json({
      ok: true,
      message: "Login successful.",
      token,
      user,
    });
  },
);

function readToken(req: Request) {
  const authorizationHeader = req.header("authorization") ?? "";

  if (!authorizationHeader.startsWith("Bearer ")) {
    return "";
  }

  return authorizationHeader.slice(7);
}

app.get("/auth/validate", (req, res) => {
  const token = readToken(req);

  if (!token) {
    return res
      .status(401)
      .json({ ok: false, message: "Missing bearer token." });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload & AuthUser;

    if (
      (decoded.role !== "admin" && decoded.role !== "user") ||
      typeof decoded.username !== "string"
    ) {
      return res
        .status(401)
        .json({ ok: false, message: "Invalid token payload." });
    }

    return res.json({
      ok: true,
      user: {
        username: decoded.username,
        role: decoded.role,
      },
    });
  } catch {
    return res
      .status(401)
      .json({ ok: false, message: "Token is invalid or expired." });
  }
});

function isSafeContentPath(contentPath: string) {
  if (!contentPath.startsWith("tutorials/") || !contentPath.endsWith(".md")) {
    return false;
  }

  if (contentPath.includes("..") || path.isAbsolute(contentPath)) {
    return false;
  }

  return true;
}

app.post(
  "/tutorials/save",
  async (req: Request<unknown, unknown, SaveTutorialBody>, res: Response) => {
    const contentPath = req.body.contentPath?.trim() ?? "";
    const rawContent = req.body.rawContent ?? "";

    if (!contentPath || !rawContent) {
      return res.status(400).json({
        ok: false,
        message: "contentPath and rawContent are required.",
      });
    }

    if (!isSafeContentPath(contentPath)) {
      return res
        .status(400)
        .json({ ok: false, message: "Invalid content path." });
    }

    try {
      const publicRoot = path.resolve(
        process.cwd(),
        "..",
        "tutorial-platform",
        "public",
      );
      const targetPath = path.resolve(publicRoot, contentPath);

      if (!targetPath.startsWith(publicRoot)) {
        return res.status(400).json({
          ok: false,
          message: "Resolved path is outside allowed directory.",
        });
      }

      await mkdir(path.dirname(targetPath), { recursive: true });
      await writeFile(targetPath, rawContent, "utf8");

      return res.json({
        ok: true,
        message: `Saved ${contentPath}`,
        savedPath: contentPath,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ ok: false, message: "Failed to write tutorial file." });
    }
  },
);

const MAX_TTS_TEXT_LENGTH = 10000;

function createAudioFileName(date = new Date()) {
  const timestamp = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
    String(date.getHours()).padStart(2, "0"),
    String(date.getMinutes()).padStart(2, "0"),
    String(date.getSeconds()).padStart(2, "0"),
  ].join("-");

  return `speech-${timestamp}.mp3`;
}

app.post(
  "/tts",
  async (req: Request<unknown, unknown, TtsBody>, res: Response) => {
    const text = req.body.text?.trim() ?? "";
    const gender = req.body.gender === "female" ? "female" : "male";
    const language = req.body.language === "hindi" ? "hindi" : "english";
    const rate =
      req.body.rate === "slow" || req.body.rate === "fast"
        ? req.body.rate
        : "normal";

    if (!text) {
      return res.status(400).json({ ok: false, message: "Text is required." });
    }
    if (text.length > MAX_TTS_TEXT_LENGTH) {
      return res.status(400).json({
        ok: false,
        message: `Text must be ${MAX_TTS_TEXT_LENGTH} characters or fewer.`,
      });
    }

    try {
      const audio = await synthesizeSpeech(text, gender, language, rate);
      if (audio.length === 0) {
        throw new Error("Speech provider returned no playable audio.");
      }
      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${createAudioFileName()}"`,
      );
      return res.send(audio);
    } catch (error) {
      console.error("TTS generation failed:", error);
      return res.status(500).json({
        ok: false,
        message:
          "Failed to generate audio. Check your internet connection and try again.",
      });
    }
  },
);

app.use((_req, res) => {
  res.status(404).json({ ok: false, message: "Route not found." });
});

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({ ok: false, message: "Internal server error." });
});

app.listen(port, () => {
  console.log(`tutorial-auth-api running at http://localhost:${port}`);
});
