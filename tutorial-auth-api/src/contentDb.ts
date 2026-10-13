import { ObjectId } from "mongodb";
import { getDatabase } from "./db.js";
import { getLessonCollectionName } from "./config.js";

export type LessonLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export type CodingQuestionHtml = {
  id: string;
  order: number;
  number: number;
  section: string;
  promptHtml: string;
  answerHtml: string;
};

export type TutorialLessonDocument = {
  _id?: ObjectId;
  language: string;
  track: string;
  slug?: string;
  title: string;
  level?: LessonLevel;
  estimatedMinutes?: number;
  order: number;
  moduleNumber: number;
  contentFormat?: "html";
  contentKind?: "tutorial" | "coding" | "reference";
  bodyHtml?: string;
  contextHtml?: string;
  solutionHtml?: string;
  questionsHtml?: CodingQuestionHtml[];
  status?: string;
  isActive?: boolean;
  deletedAt?: Date | null;
  youtubeVideos: Array<{ title: string; url: string; description?: string }>;
  createdAt: Date;
  updatedAt: Date;
};

export async function findLessonByTrackAndSlug(track: string, slug: string) {
  const db = await getDatabase();
  const collection = db.collection<TutorialLessonDocument>(getLessonCollectionName());

  return collection.findOne({
    track,
    slug,
    contentFormat: "html",
    contentKind: "coding",
  });
}

export async function findLessonsByTrack(track: string) {
  const db = await getDatabase();
  const collection = db.collection<TutorialLessonDocument>(getLessonCollectionName());

  return collection
    .find({ track, contentFormat: "html", contentKind: "coding" })
    .sort({ order: 1, slug: 1 })
    .toArray();
}
