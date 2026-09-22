import type { TrackKey } from "../data/tracks";

export type TutorialMeta = {
  track: TrackKey;
  slug: string;
  dayLabel: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  estimatedMinutes: number;
  order: number;
  fileName: string;
  contentPath: string;
};

export type TutorialVideo = {
  title: string;
  url: string;
  description?: string;
};

export type TocItem = {
  level: number;
  text: string;
  id: string;
};
