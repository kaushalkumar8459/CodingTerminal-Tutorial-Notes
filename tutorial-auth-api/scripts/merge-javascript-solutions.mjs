import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";
import {
  EMBEDDED_SOLUTION_START,
  mergePracticeAndSolution,
} from "./embedded-solution-markdown.mjs";

const currentDir = process.cwd();
const projectRoot = path.basename(currentDir) === "tutorial-auth-api"
  ? path.resolve(currentDir, "..")
  : currentDir;
const codingRoot = path.join(
  projectRoot,
  "tutorial-platform",
  "public",
  "coding",
);
const applyChanges = process.argv.includes("--apply");
const dayFilePattern = /^day-\d+.*\.md$/i;
const inlineSolutionPattern = /<details\b[^>]*>\s*<summary>\s*Show\s+(?:solution|answer)\s*<\/summary>/i;

async function main() {
  const folders = (await fs.readdir(codingRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory());
  const summaries = [];

  for (const folder of folders) {
    const trackRoot = path.join(codingRoot, folder.name);
    const solutionsRoot = path.join(trackRoot, "solutions");
    let solutionEntries;
    try {
      solutionEntries = await fs.readdir(solutionsRoot, { withFileTypes: true });
    } catch {
      continue;
    }

    const solutionFiles = solutionEntries
      .filter((entry) => entry.isFile() && dayFilePattern.test(entry.name))
      .map((entry) => entry.name);
    const practiceEntries = await fs.readdir(trackRoot, { withFileTypes: true });
    const practiceFiles = new Set(
      practiceEntries
        .filter((entry) => entry.isFile() && dayFilePattern.test(entry.name))
        .map((entry) => entry.name),
    );
    const summary = {
      track: folder.name,
      merged: 0,
      alreadyMerged: 0,
      inlineIncluded: 0,
      unmatchedSolutions: 0,
    };

    for (const fileName of solutionFiles) {
      if (!practiceFiles.has(fileName)) {
        summary.unmatchedSolutions += 1;
        continue;
      }

      const practicePath = path.join(trackRoot, fileName);
      const solutionPath = path.join(solutionsRoot, fileName);
      const practiceMarkdown = await fs.readFile(practicePath, "utf8");

      if (practiceMarkdown.includes(EMBEDDED_SOLUTION_START)) {
        summary.alreadyMerged += 1;
        continue;
      }

      const hasInlineSolutions = inlineSolutionPattern.test(practiceMarkdown);

      const solutionMarkdown = await fs.readFile(solutionPath, "utf8");
      summary.merged += 1;
      if (hasInlineSolutions) {
        summary.inlineIncluded += 1;
      }
      if (!applyChanges) {
        continue;
      }

      await fs.writeFile(
        practicePath,
        mergePracticeAndSolution(practiceMarkdown, solutionMarkdown),
        "utf8",
      );
      await fs.unlink(solutionPath);
    }

    if (applyChanges) {
      try {
        await fs.rmdir(solutionsRoot);
      } catch (error) {
        if (error.code !== "ENOTEMPTY" && error.code !== "ENOENT") {
          throw error;
        }
      }
    }

    if (
      summary.merged > 0 ||
      summary.alreadyMerged > 0 ||
      summary.inlineIncluded > 0 ||
      summary.unmatchedSolutions > 0
    ) {
      summaries.push(summary);
    }
  }

  const totalMerged = summaries.reduce((total, summary) => total + summary.merged, 0);
  console.log(`${applyChanges ? "Merged" : "Would merge"} ${totalMerged} solution files across coding tracks.`);
  for (const summary of summaries) {
    console.log(
      `  ${summary.track}: ${summary.merged} to merge, ${summary.alreadyMerged} already merged, ${summary.inlineIncluded} include inline answers, ${summary.unmatchedSolutions} unmatched.`,
    );
  }
  if (!applyChanges) {
    console.log("Dry run only. Pass --apply to embed matching solutions and remove duplicate files.");
  }
}

main().catch((error) => {
  console.error("Coding solution merge failed:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});