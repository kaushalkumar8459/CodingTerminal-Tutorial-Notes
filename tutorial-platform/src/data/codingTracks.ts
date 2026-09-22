export const codingTracks = [
  { key: "javascript", label: "JavaScript" },
  { key: "javascriptproblemsolving", label: "JS Problem Solving" },
  { key: "javascriptrealinterview", label: "Real JS Interview" },
  { key: "javascriptbrowser", label: "JS Browser & DOM" },
  { key: "javascriptinterviewrevision", label: "JS Interview Revision" },
  { key: "javascriptmachinecoding", label: "JS Machine Coding" },
  { key: "typescript", label: "TypeScript" },
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
