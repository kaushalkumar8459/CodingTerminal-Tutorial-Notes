import dotenv from "dotenv";
import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import helmet from "helmet";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const runtimeMode = process.env.NODE_ENV === "production" ? "production" : "development";
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

const app = express();
const port = Number(process.env.PORT ?? 4001);
const frontendOrigin = process.env.FRONTEND_ORIGIN ?? "http://localhost:5173";
const jwtSecret = process.env.JWT_SECRET ?? "replace-me-in-production";

const credentialBook: Record<UserRole, { username: string; password: string }> = {
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

app.post("/auth/login", (req: Request<unknown, unknown, LoginBody>, res: Response) => {
  const role = req.body.role;
  const username = req.body.username?.trim().toLowerCase() ?? "";
  const password = req.body.password ?? "";

  if (role !== "admin" && role !== "user") {
    return res.status(400).json({ ok: false, message: "Role must be admin or user." });
  }

  const expectedCredential = credentialBook[role];

  if (username !== expectedCredential.username || password !== expectedCredential.password) {
    return res.status(401).json({ ok: false, message: "Invalid credentials." });
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
});

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
    return res.status(401).json({ ok: false, message: "Missing bearer token." });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload & AuthUser;

    if ((decoded.role !== "admin" && decoded.role !== "user") || typeof decoded.username !== "string") {
      return res.status(401).json({ ok: false, message: "Invalid token payload." });
    }

    return res.json({
      ok: true,
      user: {
        username: decoded.username,
        role: decoded.role,
      },
    });
  } catch {
    return res.status(401).json({ ok: false, message: "Token is invalid or expired." });
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

app.post("/tutorials/save", async (req: Request<unknown, unknown, SaveTutorialBody>, res: Response) => {
  const contentPath = req.body.contentPath?.trim() ?? "";
  const rawContent = req.body.rawContent ?? "";

  if (!contentPath || !rawContent) {
    return res.status(400).json({ ok: false, message: "contentPath and rawContent are required." });
  }

  if (!isSafeContentPath(contentPath)) {
    return res.status(400).json({ ok: false, message: "Invalid content path." });
  }

  try {
    const publicRoot = path.resolve(process.cwd(), "..", "tutorial-platform", "public");
    const targetPath = path.resolve(publicRoot, contentPath);

    if (!targetPath.startsWith(publicRoot)) {
      return res.status(400).json({ ok: false, message: "Resolved path is outside allowed directory." });
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
    return res.status(500).json({ ok: false, message: "Failed to write tutorial file." });
  }
});

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
