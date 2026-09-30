import dotenv from "dotenv";
import path from "node:path";

const runtimeMode =
  process.env.NODE_ENV === "production" ? "production" : "development";

dotenv.config({ path: path.resolve(process.cwd(), `.env.${runtimeMode}`) });
dotenv.config();

export const appConfig = {
  port: Number(process.env.PORT ?? 4001),
  frontendOrigin: process.env.FRONTEND_ORIGIN ?? "http://localhost:5173",
  jwtSecret: process.env.JWT_SECRET ?? "replace-me-in-production",
  auth: {
    adminUsername: (process.env.ADMIN_USERNAME ?? "admin").trim().toLowerCase(),
    adminPassword: process.env.ADMIN_PASSWORD ?? "admin123",
    userUsername: (process.env.USER_USERNAME ?? "user").trim().toLowerCase(),
    userPassword: process.env.USER_PASSWORD ?? "user123",
  },
  database: {
    uri: process.env.MONGODB_URI?.trim() ?? "",
    dbName: process.env.MONGODB_DB_NAME?.trim() || "tutorial_platform",
    dnsServers: (process.env.MONGODB_DNS_SERVERS?.trim() || "1.1.1.1,8.8.8.8")
      .split(",")
      .map((server) => server.trim())
      .filter(Boolean),
    collectionPrefix: process.env.MONGODB_COLLECTION_PREFIX?.trim() || "codingterminallearning",
    collections: {
      lessons: process.env.MONGODB_LESSONS_COLLECTION?.trim() || "codingterminallearning_lessons",
      modules: process.env.MONGODB_MODULES_COLLECTION?.trim() || "codingterminallearning_modules",
      tracks: process.env.MONGODB_TRACKS_COLLECTION?.trim() || "codingterminallearning_tracks",
    },
  },
} as const;

// Base language ids, ordered longest/most-specific first so variant tracks
// (e.g. "javascriptmachinecoding", "angularinterview") resolve correctly.
const KNOWN_LANGUAGES = [
  "typescript",
  "javascript",
  "angular",
  "nextjs",
  "nodejs",
  "python",
  "react",
  "java",
] as const;

export function resolveLanguageFromTrack(track: string): string {
  const normalized = track.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
  const match = KNOWN_LANGUAGES.find((language) => normalized.startsWith(language));
  return match ?? (normalized || "general");
}

export function getLessonCollectionName(): string {
  return appConfig.database.collections.lessons;
}
