import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  buildQuestionAnswerPairs,
  extractCodingContextMarkdown,
} from "../scripts/question-answer-normalization.mjs";
import {
  mergePracticeAndSolution,
  splitEmbeddedSolution,
} from "../scripts/embedded-solution-markdown.mjs";

const codingRoot = new URL("../../tutorial-platform/public/coding/", import.meta.url);

async function readCodingFile(relativePath) {
  return readFile(new URL(relativePath, codingRoot), "utf8");
}

async function readCodingPair(trackFolder, fileName) {
  const markdown = await readCodingFile(`${trackFolder}/${fileName}`);
  const embedded = splitEmbeddedSolution(markdown);
  if (embedded.solutionMarkdown) {
    return embedded;
  }

  const solutionMarkdown = await readCodingFile(`${trackFolder}/solutions/${fileName}`);
  return {
    practiceMarkdown: embedded.practiceMarkdown,
    solutionMarkdown,
  };
}

test("pairs JavaScript, HTML, and grouped problem-solving question sets", async () => {
  const [javascript, html, problem] = await Promise.all([
    readCodingPair("JavaScript", "day-001-variables-and-output.md"),
    readCodingPair("htmlinterview", "day-001-introduction-to-html.md"),
    readCodingPair("JavaScriptProblemSolving", "day-001-javascript-interview-problem-solving.md"),
  ]);

  const javascriptPairs = buildQuestionAnswerPairs(javascript.practiceMarkdown, javascript.solutionMarkdown);
  const htmlPairs = buildQuestionAnswerPairs(html.practiceMarkdown, html.solutionMarkdown);
  const problemPairs = buildQuestionAnswerPairs(problem.practiceMarkdown, problem.solutionMarkdown);

  assert.equal(javascriptPairs.length, 24);
  assert.equal(htmlPairs.length, 10);
  assert.equal(problemPairs.length, 50);
  assert.match(htmlPairs[0].answerMarkdown, /<!doctype html>/i);
});

test("does not pair same-numbered questions from unrelated sections", async () => {
  const { practiceMarkdown, solutionMarkdown } = await readCodingPair(
    "JavaScriptInterviewRevision",
    "day-001-javascript-core-revision.md",
  );

  assert.deepEqual(buildQuestionAnswerPairs(practiceMarkdown, solutionMarkdown), []);
});

test("moves non-question lesson context out of the Markdown body", async () => {
  const { practiceMarkdown } = await readCodingPair(
    "htmlinterview",
    "day-001-introduction-to-html.md",
  );
  const context = extractCodingContextMarkdown(practiceMarkdown);

  assert.match(context, /Matches Tutorial Day 1/);
  assert.match(context, /## Notes/);
  assert.doesNotMatch(context, /Create a complete HTML document/);
  assert.doesNotMatch(context, /## Basic/);
});

test("keeps lesson context after numbered questions with fenced code", async () => {
  const { practiceMarkdown } = await readCodingPair("JavaScript", "day-049-hoisting-challenges.md");
  const context = extractCodingContextMarkdown(practiceMarkdown);

  assert.match(context, /write down your\s+prediction\s+before/i);
  assert.match(context, /## Notes/);
  assert.doesNotMatch(context, /console\.log\(a\)/);
});

test("creates complete Q&A arrays for all HTML interview lessons", async () => {
  const htmlRoot = new URL("htmlinterview/", codingRoot);
  const fileNames = (await (await import("node:fs/promises")).readdir(htmlRoot))
    .filter((fileName) => /^day-\d+.*\.md$/.test(fileName));

  assert.equal(fileNames.length, 19);

  for (const fileName of fileNames) {
    const { practiceMarkdown, solutionMarkdown } = await readCodingPair("htmlinterview", fileName);
    assert.ok(
      buildQuestionAnswerPairs(practiceMarkdown, solutionMarkdown).length > 0,
      `${fileName} should have paired Q&A`,
    );
  }
});

test("parses hoisting solutions with answer markers before inline answers", async () => {
  const { practiceMarkdown, solutionMarkdown } = await readCodingPair(
    "JavaScript",
    "day-049-hoisting-challenges.md",
  );

  assert.equal(buildQuestionAnswerPairs(practiceMarkdown, solutionMarkdown).length, 20);
});

test("pairs arithmetic, function, and truthy/falsy JavaScript assessments", async () => {
  const stems = [
    ["day-004-arithmetic-operators", 24],
    ["day-009-functions", 24],
    ["day-012-truthy-falsy", 23],
  ];

  for (const [stem, expectedCount] of stems) {
    const pair = await readCodingPair("JavaScript", `${stem}.md`);
    assert.equal(
      buildQuestionAnswerPairs(pair.practiceMarkdown, pair.solutionMarkdown).length,
      expectedCount,
      stem,
    );
  }
});

test("round-trips a practice and solution into one Markdown file", () => {
  const practice = "# Day 1\n\n## Practice\n\n1. Do the task.";
  const solution = "# Day 1 Solution\n\n**1. Answer**\n\n```js\nconsole.log(1);\n```";
  const merged = mergePracticeAndSolution(practice, solution);
  const split = splitEmbeddedSolution(merged);

  assert.equal(split.practiceMarkdown, practice);
  assert.equal(split.solutionMarkdown, solution);
});