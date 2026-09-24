import { ObjectId } from "mongodb";
import { getDatabase } from "./db.js";
import { appConfig } from "./config.js";

export type LessonLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export type TutorialLessonDocument = {
  _id?: ObjectId;
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
  body: string;
  youtubeVideos: Array<{ title: string; url: string; description?: string }>;
  createdAt: Date;
  updatedAt: Date;
};

const lessonCollectionName = appConfig.database.collections.lessons;

export async function findLessonByTrackAndSlug(track: string, slug: string) {
  const db = await getDatabase();
  const collection = db.collection<TutorialLessonDocument>(lessonCollectionName);

  return collection.findOne({
    track,
    slug,
  });
}

export async function findLessonsByTrack(track: string) {
  const db = await getDatabase();
  const collection = db.collection<TutorialLessonDocument>(lessonCollectionName);

  return collection
    .find({ track })
    .sort({ order: 1, slug: 1 })
    .toArray();
}

export async function upsertLesson(lesson: Partial<TutorialLessonDocument>) {
  const db = await getDatabase();
  const collection = db.collection<TutorialLessonDocument>(lessonCollectionName);

  const payload = {
    ...lesson,
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
