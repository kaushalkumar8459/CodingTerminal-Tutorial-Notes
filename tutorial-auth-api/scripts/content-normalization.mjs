export function normalizeLessonBody(markdown) {
  let body = String(markdown).replace(/^\uFEFF/, "");

  if (body.startsWith("---")) {
    const endIndex = body.indexOf("\n---", 3);
    if (endIndex !== -1) {
      body = body.slice(endIndex + 4).replace(/^\r?\n/, "");
    }
  }

  return body.replace(/^(#\s+.*?)\s+\[(?:Beginner|Intermediate|Advanced|Expert)\](?=\s|:)/m, "$1");
}

export function isLessonMarkdownFile(fileName) {
  const normalizedName = String(fileName).toLowerCase();

  if (
    normalizedName === "readme.md" ||
    normalizedName.includes("roadmap") ||
    normalizedName.includes("syllabus") ||
    normalizedName.includes("curriculum") ||
    normalizedName.includes("checklist") ||
    normalizedName.includes("audit")
  ) {
    return false;
  }

  return /^day-\d+(?:[-_]\d+)?[-_]/i.test(String(fileName));
}
