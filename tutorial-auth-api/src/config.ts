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
    collections: {
      lessons: process.env.MONGODB_LESSONS_COLLECTION?.trim() || "lessons",
      modules: process.env.MONGODB_MODULES_COLLECTION?.trim() || "modules",
      tracks: process.env.MONGODB_TRACKS_COLLECTION?.trim() || "tracks",
    },
  },
} as const;
