export const tracks = [
  { key: "javascript", label: "JavaScript" },
  { key: "java", label: "Java" },
  { key: "react", label: "React" },
  { key: "nodejs", label: "Node.js" },
  { key: "python", label: "Python" },
  { key: "nextjs", label: "Next.js" },
] as const;

export type TrackKey = (typeof tracks)[number]["key"];

export function isTrackKey(value: string): value is TrackKey {
  return tracks.some((track) => track.key === value);
}

export function getTrackLabel(track: TrackKey) {
  return tracks.find((item) => item.key === track)?.label ?? track;
}
