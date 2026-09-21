export const codingTracks = [
  { key: "javascript", label: "JavaScript" },
  { key: "java", label: "Java" },
  { key: "react", label: "React" },
  { key: "nodejs", label: "Node.js" },
  { key: "python", label: "Python" },
  { key: "nextjs", label: "Next.js" },
] as const;

export type CodingTrackKey = (typeof codingTracks)[number]["key"];

export function isCodingTrackKey(value: string): value is CodingTrackKey {
  return codingTracks.some((track) => track.key === value);
}

export function getCodingTrackLabel(track: CodingTrackKey) {
  return codingTracks.find((item) => item.key === track)?.label ?? track;
}
