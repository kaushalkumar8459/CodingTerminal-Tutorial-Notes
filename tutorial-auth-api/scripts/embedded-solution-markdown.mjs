export const EMBEDDED_SOLUTION_START = "<!-- codingterminal-solution:start -->";
export const EMBEDDED_SOLUTION_END = "<!-- codingterminal-solution:end -->";

export function mergePracticeAndSolution(practiceMarkdown, solutionMarkdown) {
  const newline = practiceMarkdown.includes("\r\n") ? "\r\n" : "\n";
  return [
    practiceMarkdown.trimEnd(),
    EMBEDDED_SOLUTION_START,
    solutionMarkdown.trim(),
    EMBEDDED_SOLUTION_END,
    "",
  ].join(`${newline}${newline}`);
}

export function splitEmbeddedSolution(markdown) {
  const start = markdown.indexOf(EMBEDDED_SOLUTION_START);
  if (start < 0) {
    return { practiceMarkdown: markdown, solutionMarkdown: "" };
  }

  const solutionStart = start + EMBEDDED_SOLUTION_START.length;
  const end = markdown.indexOf(EMBEDDED_SOLUTION_END, solutionStart);
  if (end < 0) {
    throw new Error("Embedded solution start marker has no matching end marker.");
  }

  return {
    practiceMarkdown: markdown.slice(0, start).trimEnd(),
    solutionMarkdown: markdown.slice(solutionStart, end).trim(),
  };
}