import { promises as fs } from "node:fs";
import { setServers } from "node:dns";
import path from "node:path";
import process from "node:process";
import { MongoClient } from "mongodb";
import { EJSON } from "bson";
import dotenv from "dotenv";

const currentDir = process.cwd();
const runtimeMode = process.env.NODE_ENV === "production" ? "production" : "development";

dotenv.config({ path: path.resolve(currentDir, `.env.${runtimeMode}`) });
dotenv.config();

const uri = process.env.MONGODB_URI?.trim() || "mongodb://localhost:27017";
const dbName = process.env.MONGODB_DB_NAME?.trim() || "tutorial_platform";
const dnsServers = (process.env.MONGODB_DNS_SERVERS?.trim() || "1.1.1.1,8.8.8.8")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);

if (uri.startsWith("mongodb+srv://")) {
  setServers(dnsServers);
}

// Pass a collection name as the first CLI arg to export only that collection.
const args = process.argv.slice(2);
const collectionFilter = args.find((arg) => !arg.startsWith("--"))?.trim() || null;

const trackArg = args.find((arg) => arg.startsWith("--track="))?.slice("--track=".length).trim();
const rawFilterArg = args.find((arg) => arg.startsWith("--filter="))?.slice("--filter=".length).trim();
const filterFileArg = args.find((arg) => arg.startsWith("--filter-file="))?.slice("--filter-file=".length).trim();

async function buildQuery() {
  let query = {};

  if (trackArg) {
    query = { ...query, track: trackArg };
  }

  if (rawFilterArg) {
    query = { ...query, ...JSON.parse(rawFilterArg) };
  }

  if (filterFileArg) {
    const fileContents = await fs.readFile(path.resolve(currentDir, filterFileArg), "utf8");
    query = { ...query, ...JSON.parse(fileContents) };
  }

  return query;
}

const outputDir = path.resolve(currentDir, "exports", new Date().toISOString().replace(/[:.]/g, "-"));

async function main() {
  const query = await buildQuery();
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);

    const allCollections = await db.listCollections().toArray();
    const targetCollections = collectionFilter
      ? allCollections.filter((info) => info.name === collectionFilter)
      : allCollections;

    if (targetCollections.length === 0) {
      throw new Error(
        collectionFilter
          ? `Collection "${collectionFilter}" was not found in database "${dbName}".`
          : `No collections found in database "${dbName}".`,
      );
    }

    await fs.mkdir(outputDir, { recursive: true });

    for (const { name } of targetCollections) {
      const documents = await db.collection(name).find(query).toArray();
      const filePath = path.join(outputDir, `${name}.json`);
      await fs.writeFile(filePath, EJSON.stringify(documents, undefined, 2), "utf8");
      console.log(`Exported ${documents.length} documents from "${name}" -> ${filePath}`);
    }

    console.log(`Export complete: ${outputDir}`);
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error("Export failed:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
