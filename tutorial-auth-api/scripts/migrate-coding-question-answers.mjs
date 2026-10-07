import { setServers } from "node:dns";
import path from "node:path";
import process from "node:process";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import {
  buildQuestionAnswerPairs,
  extractCodingContextMarkdown,
} from "./question-answer-normalization.mjs";

dotenv.config({ path: path.resolve(process.cwd(), ".env.development") });
dotenv.config();

const uri = process.env.MONGODB_URI?.trim() || "mongodb://localhost:27017";
const dbName = process.env.MONGODB_DB_NAME?.trim() || "tutorial_platform";
const collectionName = process.env.MONGODB_LESSONS_COLLECTION?.trim() || "codingterminallearning_lessons";
const dnsServers = (process.env.MONGODB_DNS_SERVERS?.trim() || "1.1.1.1,8.8.8.8")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);
const applyChanges = process.argv.includes("--apply");
const pruneSolutionBody = process.argv.includes("--prune-solution-body");
const args = process.argv.slice(2);
const moveContext = args.includes("--move-context");
const trackOptionIndex = args.indexOf("--track");
const trackOptionValue = trackOptionIndex >= 0 ? args[trackOptionIndex + 1] : null;

if (trackOptionIndex >= 0 && (!trackOptionValue || trackOptionValue.startsWith("--"))) {
  throw new Error("Pass a track after --track (e.g. --track htmlinterview).");
}

if (uri.startsWith("mongodb+srv://")) {
  setServers(dnsServers);
}

const client = new MongoClient(uri);

try {
  await client.connect();
  const collection = client.db(dbName).collection(collectionName);
  const filter = {
    contentPath: /^coding\//,
    body: { $type: "string" },
    ...(trackOptionValue ? { track: trackOptionValue } : {}),
  };
  const cursor = collection.find(filter, {
    projection: {
      _id: 1,
      track: 1,
      slug: 1,
      body: 1,
      contextMarkdown: 1,
      solutionBody: 1,
      questions: 1,
    },
  });

  let scanned = 0;
  let eligible = 0;
  let questionArraysUpdated = 0;
  let solutionBodiesPruned = 0;
  let bodiesMoved = 0;

  for await (const document of cursor) {
    scanned += 1;
    const storedQuestions = Array.isArray(document.questions) && document.questions.length > 0
      ? document.questions
      : null;
    const questions = storedQuestions ?? buildQuestionAnswerPairs(document.body, document.solutionBody ?? "");
    if (questions.length === 0) {
      continue;
    }

    eligible += 1;
    const questionsAreCurrent = JSON.stringify(document.questions ?? []) === JSON.stringify(questions);
    const contextMarkdown = extractCodingContextMarkdown(document.body);
    const contextIsCurrent = document.contextMarkdown === contextMarkdown;
    const shouldMoveBody = moveContext && typeof document.body === "string";
    const shouldPruneSolutionBody = (pruneSolutionBody || moveContext) && typeof document.solutionBody === "string";
    if (
      questionsAreCurrent &&
      contextIsCurrent &&
      !shouldMoveBody &&
      !shouldPruneSolutionBody
    ) {
      continue;
    }

    if (!questionsAreCurrent) {
      questionArraysUpdated += 1;
    }
    if (shouldPruneSolutionBody) {
      solutionBodiesPruned += 1;
    }
    if (shouldMoveBody) {
      bodiesMoved += 1;
    }

    if (applyChanges) {
      const update = { $set: { updatedAt: new Date() } };
      if (!questionsAreCurrent) {
        update.$set.questions = questions;
      }
      if (moveContext) {
        update.$set.contextMarkdown = contextMarkdown;
      }
      const unset = {};
      if (shouldMoveBody) {
        unset.body = "";
      }
      if (shouldPruneSolutionBody) {
        unset.solutionBody = "";
      }
      if (Object.keys(unset).length > 0) {
        update.$unset = unset;
      }
      await collection.updateOne(
        { _id: document._id },
        update,
      );
    }
  }

  const action = applyChanges ? "Updated" : "Would update";
  console.log(`${action} Q&A arrays on ${questionArraysUpdated} eligible lessons.`);
  if (pruneSolutionBody) {
    console.log(`${applyChanges ? "Removed" : "Would remove"} solutionBody from ${solutionBodiesPruned} eligible lessons.`);
  }
  if (moveContext) {
    console.log(`${applyChanges ? "Moved" : "Would move"} body content to contextMarkdown and remove body from ${bodiesMoved} eligible lessons.`);
  }
  console.log(`Scanned ${scanned} coding lessons in ${dbName}.${collectionName}.`);
  if (!applyChanges) {
    console.log("Dry run only. Pass --apply to write the question-answer arrays.");
  }
} catch (error) {
  console.error("Question-answer migration failed:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await client.close();
}