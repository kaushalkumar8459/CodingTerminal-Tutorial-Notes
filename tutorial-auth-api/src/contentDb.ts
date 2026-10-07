import { ObjectId } from "mongodb";
import { getDatabase } from "./db.js";
import { getLessonCollectionName, resolveLanguageFromTrack } from "./config.js";

export type LessonLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export type CodingQuestionAnswer = {
  id: string;
  order: number;
  number: number;
  section: string;
  promptMarkdown: string;
  answerMarkdown: string;
};

export type TutorialLessonDocument = {
  _id?: ObjectId;
  language: string;
  track: string;
  slug: string;
  title: string;
  dayLabel: string;
  level: LessonLevel;
  estimatedMinutes: number;
  order: number;
  moduleNumber: number;
  moduleSlug: string;
  contentPath: string;
  body?: string;
  contextMarkdown?: string;
  solutionBody?: string;
  questions?: CodingQuestionAnswer[];
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
  });
}

export async function findLessonsByTrack(track: string) {
  const db = await getDatabase();
  const collection = db.collection<TutorialLessonDocument>(getLessonCollectionName());

  return collection
    .find({ track })
    .sort({ order: 1, slug: 1 })
    .toArray();
}

export async function upsertLesson(lesson: Partial<TutorialLessonDocument>) {
  const db = await getDatabase();

  if (!lesson.track) {
    throw new Error("track is required to resolve the lesson language.");
  }

  const collection = db.collection<TutorialLessonDocument>(getLessonCollectionName());

  const payload = {
    ...lesson,
    language: lesson.language ?? resolveLanguageFromTrack(lesson.track),
    updatedAt: new Date(),
    ...(lesson.createdAt ? {} : { createdAt: new Date() }),
  };

  const filter = {
    track: lesson.track,
    slug: lesson.slug,
  };

  const result = await collection.updateOne(
    filter,
    { $set: payload },
    { upsert: true },
  );

  return {
    ok: true,
    matchedCount: result.matchedCount,
    modifiedCount: result.modifiedCount,
    upsertedCount: result.upsertedCount,
  };
}
