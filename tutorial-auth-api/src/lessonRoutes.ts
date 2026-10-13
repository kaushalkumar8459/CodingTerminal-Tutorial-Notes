import { Router, type NextFunction, type Request, type Response } from "express";
import type { Document } from "mongodb";
import { getDatabase } from "./db.js";
import { getLessonCollectionName, resolveLanguageFromTrack } from "./config.js";
import { sanitizeLessonHtml } from "./contentSanitizer.js";

const TRACK_LABELS: Record<string, string> = {
  html: "HTML",
  javascript: "JavaScript",
  java: "Java",
  react: "React",
  angular: "Angular",
  angularinterview: "Angular Interview",
  nodejs: "Node.js",
  python: "Python",
  nextjs: "Next.js",
};
// Second-level menu under the track bar; `path` is a frontend route prefix.
const TRACK_SECTIONS: Record<string, Array<{ label: string; path: string }>> = {
  html: [
    { label: "Tutorial", path: "/learn/html" },
    { label: "Coding", path: "/coding/htmlinterview" },
  ],
  javascript: [
    { label: "JS Tutorial", path: "/learn/javascript" },
    { label: "Problem Solving", path: "/coding/javascriptproblemsolving" },
    { label: "Coding Practice", path: "/coding/javascript" },
    { label: "Real Interview Coding", path: "/coding/javascriptrealinterview" },
    { label: "Browser & DOM", path: "/coding/javascriptbrowser" },
    { label: "Interview Revision", path: "/coding/javascriptinterviewrevision" },
    { label: "Machine Coding", path: "/coding/javascriptmachinecoding" },
    { label: "TypeScript", path: "/coding/typescript" },
  ],
  angular: [
    { label: "Angular Tutorial", path: "/learn/angular" },
    { label: "Angular Interview", path: "/learn/angularinterview" },
  ],
  angularinterview: [{ label: "Interview Tutorial", path: "/learn/angularinterview" }],
};
// Tracks that also have a coding-practice area at /coding/<track>.
const TRACKS_WITH_CODING = new Set(["java", "react", "nodejs", "python", "nextjs"]);

function sectionsFor(track: string) {
  if (TRACK_SECTIONS[track]) return TRACK_SECTIONS[track];
  const sections = [{ label: "Tutorial", path: `/learn/${track}` }];
  if (TRACKS_WITH_CODING.has(track)) sections.push({ label: "Coding Practice", path: `/coding/${track}` });
  return sections;
}
// Module headings shown in the left menu; modules without a title fall back to "Module n".
const MODULE_TITLES: Record<string, Record<number, string>> = {
  javascript: {
    1: "JavaScript Fundamentals",
    2: "Control Flow & Problem Solving",
    3: "Strings, Numbers, Arrays & Objects",
    4: "Modern JavaScript & Functions",
    5: "OOP & Advanced Objects",
    6: "Asynchronous JavaScript",
    7: "Browser, DOM & Professional JavaScript",
  },
  angular: {
    1: "Angular Fundamentals",
    2: "Templates & Data Binding",
    3: "Control Flow & Rendering",
    4: "Routing & Navigation",
    5: "Component Communication",
    6: "Directives & Pipes",
    7: "Component Composition",
    8: "Services & Dependency Injection",
    9: "Lifecycle & Component Runtime",
    10: "Signals & Modern Reactivity",
    11: "Forms",
    12: "HTTP & API Integration",
    13: "Authentication & Authorization",
    14: "Complete Angular Project",
    15: "TypeScript Deep Dive",
    16: "RxJS Deep Dive",
    17: "State Management",
    18: "CDK, Material & Accessibility",
    19: "Testing",
    20: "Performance",
    21: "SSR, SSG & Hydration",
    22: "Security",
    23: "Enterprise Angular Architecture",
    24: "Micro Frontends",
    25: "Final Enterprise Project",
    26: "Interview Preparation",
    27: "Angular AI & MCP",
  },
};
const LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];
const NAV_PROJECTION = { _id: 0, track: 1, title: 1, order: 1, moduleNumber: 1, level: 1, estimatedMinutes: 1 } as const;
export type LessonInput = {
  title?: string;
  level?: string;
  estimatedMinutes?: number;
  order?: number;
  moduleNumber?: number;
  status?: string;
  isActive?: boolean;
  contentKind?: "tutorial" | "coding" | "reference";
  bodyHtml?: string;
};

async function lessons() {
  const db = await getDatabase();
  return db.collection<Document>(getLessonCollectionName());
}

function pickFields(input: LessonInput) {
  const fields: Record<string, unknown> = {};
  if (typeof input.title === "string" && input.title.trim()) fields.title = input.title.trim();
  if (LEVELS.includes(String(input.level))) fields.level = input.level;
  if (Number.isFinite(input.estimatedMinutes)) fields.estimatedMinutes = Number(input.estimatedMinutes);
  if (Number.isFinite(input.order)) fields.order = Number(input.order);
  if (Number.isFinite(input.moduleNumber)) fields.moduleNumber = Number(input.moduleNumber);
  if (typeof input.status === "string" && input.status.trim()) fields.status = input.status.trim();
  if (typeof input.isActive === "boolean") fields.isActive = input.isActive;
  if (input.contentKind) fields.contentKind = input.contentKind;
  return fields;
}

export async function saveLesson(track: string, currentTitle: string, input: LessonInput) {
  const bodyHtml = sanitizeLessonHtml(String(input.bodyHtml ?? ""));
  if (!bodyHtml) {
    return { ok: false as const, status: 400, message: "bodyHtml is required." };
  }

  const fields = pickFields(input);
  const nextTitle = String(fields.title ?? currentTitle);

  if (nextTitle !== currentTitle && (await (await lessons()).findOne({ track, title: nextTitle, contentFormat: "html" }))) {
    return { ok: false as const, status: 409, message: "Another lesson already uses this title." };
  }

  const result = await (await lessons()).updateOne(
    { track, title: currentTitle, contentFormat: "html" },
    { $set: { ...fields, bodyHtml, contentFormat: "html", updatedAt: new Date() } },
  );

  if (result.matchedCount === 0) {
    return { ok: false as const, status: 404, message: "Lesson not found." };
  }
  return { ok: true as const, title: nextTitle };
}

export async function createLesson(track: string, input: LessonInput) {
  const fields = pickFields(input);
  const title = String(fields.title ?? "");
  const contentKind = String(fields.contentKind ?? "tutorial");
  const bodyHtml = sanitizeLessonHtml(String(input.bodyHtml ?? ""));

  if (!title || !bodyHtml) {
    return { ok: false as const, status: 400, message: "title and bodyHtml are required." };
  }
  if (await (await lessons()).findOne({ track, title, contentFormat: "html", contentKind })) {
    return { ok: false as const, status: 409, message: "A lesson with this title already exists." };
  }

  const now = new Date();
  await (await lessons()).insertOne({
    level: "Beginner",
    estimatedMinutes: 30,
    order: 1,
    moduleNumber: 0,
    status: "active",
    isActive: true,
    ...fields,
    track,
    language: resolveLanguageFromTrack(track),
    deletedAt: null,
    youtubeVideos: [],
    bodyHtml,
    contentFormat: "html",
    contentKind,
    createdAt: now,
    updatedAt: now,
  });
  return { ok: true as const, title };
}

export function createLessonRouter(
  requireAdmin: (req: Request, res: Response, next: NextFunction) => void,
  isAdmin: (req: Request) => boolean,
) {
  const router = Router();
  // Learners only ever see active, non-deleted lessons; admins can opt in to everything.
  const visibleOnly = { isActive: { $ne: false }, deletedAt: null };

  // Drives both the primary (track) and secondary (lesson) navigation menus.
  router.get("/nav", async (req, res) => {
    try {
      const showAll = req.query.includeInactive === "1" && isAdmin(req);
      const docs = await (await lessons())
        .find({ contentFormat: "html", contentKind: { $nin: ["coding", "reference"] }, ...(showAll ? {} : visibleOnly) }, { projection: NAV_PROJECTION })
        .sort({ track: 1, moduleNumber: 1, order: 1, title: 1 })
        .toArray();

      const byTrack = new Map<string, Document[]>();
      for (const doc of docs) {
        byTrack.set(doc.track, [...(byTrack.get(doc.track) ?? []), doc]);
      }

      const tracks = [...byTrack.entries()].map(([track, items]) => ({
        track,
        label: TRACK_LABELS[track] ?? track.charAt(0).toUpperCase() + track.slice(1),
        sections: sectionsFor(track),
        moduleTitles: MODULE_TITLES[track] ?? {},
        lessons: items,
      }));

      res.json({ ok: true, tracks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, message: "Failed to load navigation." });
    }
  });

  router.get("/:track/:title", async (req, res) => {
    try {
      const doc = await (await lessons()).findOne(
        {
          track: req.params.track,
          title: req.params.title,
          contentFormat: "html",
          contentKind: { $nin: ["coding", "reference"] },
          ...(isAdmin(req) ? {} : visibleOnly),
        },
      );

      if (!doc) {
        res.status(404).json({ ok: false, message: "Lesson not found." });
        return;
      }
      res.json({ ok: true, lesson: doc });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, message: "Failed to load lesson." });
    }
  });

  router.post("/:track", requireAdmin, async (req: Request<{ track: string }, unknown, LessonInput>, res) => {
    try {
      const result = await createLesson(req.params.track, req.body ?? {});
      if (!result.ok) {
        res.status(result.status).json({ ok: false, message: result.message });
        return;
      }
      res.status(201).json({ ok: true, title: result.title });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, message: "Failed to create lesson." });
    }
  });

  router.put("/:track/:title", requireAdmin, async (req: Request<{ track: string; title: string }, unknown, LessonInput>, res) => {
    try {
      const result = await saveLesson(req.params.track, req.params.title, req.body ?? {});
      if (!result.ok) {
        res.status(result.status).json({ ok: false, message: result.message });
        return;
      }
      res.json({ ok: true, title: result.title });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, message: "Failed to save lesson." });
    }
  });

  return router;
}

type CodingLessonInput = {
  title?: string;
  order?: number;
  isActive?: boolean;
  bodyHtml?: string;
  contextHtml?: string;
  solutionHtml?: string;
};

// Admin-only editing of coding-practice lessons, which are keyed by track + slug.
export function createCodingLessonRouter(requireAdmin: (req: Request, res: Response, next: NextFunction) => void) {
  const router = Router();
  router.use(requireAdmin);
  const codingFilter = (track: string) => ({ track, contentFormat: "html", contentKind: "coding" });

  router.get("/:track", async (req, res) => {
    try {
      const docs = await (await lessons())
        .find(codingFilter(req.params.track), { projection: { _id: 0, track: 1, slug: 1, title: 1, order: 1, isActive: 1 } })
        .sort({ order: 1, slug: 1 })
        .toArray();
      res.json({ ok: true, lessons: docs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, message: "Failed to load coding lessons." });
    }
  });

  router.get("/:track/:slug", async (req, res) => {
    try {
      const doc = await (await lessons()).findOne({ ...codingFilter(req.params.track), slug: req.params.slug });
      if (!doc) {
        res.status(404).json({ ok: false, message: "Lesson not found." });
        return;
      }
      res.json({ ok: true, lesson: doc });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, message: "Failed to load lesson." });
    }
  });

  router.put("/:track/:slug", async (req: Request<{ track: string; slug: string }, unknown, CodingLessonInput>, res) => {
    try {
      const input = req.body ?? {};
      const fields: Record<string, unknown> = { updatedAt: new Date() };
      if (typeof input.title === "string" && input.title.trim()) fields.title = input.title.trim();
      if (Number.isFinite(input.order)) fields.order = Number(input.order);
      if (typeof input.isActive === "boolean") fields.isActive = input.isActive;
      for (const key of ["bodyHtml", "contextHtml", "solutionHtml"] as const) {
        if (typeof input[key] === "string") fields[key] = sanitizeLessonHtml(input[key]);
      }

      const result = await (await lessons()).updateOne(
        { ...codingFilter(req.params.track), slug: req.params.slug },
        { $set: fields },
      );
      if (result.matchedCount === 0) {
        res.status(404).json({ ok: false, message: "Lesson not found." });
        return;
      }
      res.json({ ok: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, message: "Failed to save lesson." });
    }
  });

  return router;
}
