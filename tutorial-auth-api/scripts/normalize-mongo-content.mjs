import { setServers } from "node:dns";
import path from "node:path";
import process from "node:process";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { normalizeLessonBody } from "./content-normalization.mjs";

dotenv.config({ path: path.resolve(process.cwd(), ".env.development") });
dotenv.config();

const uri = process.env.MONGODB_URI?.trim() || "mongodb://localhost:27017";
const dbName = process.env.MONGODB_DB_NAME?.trim() || "tutorial_platform";
const collectionName = process.env.MONGODB_LESSONS_COLLECTION?.trim() || "codingterminallearning_lessons";
const dnsServers = (process.env.MONGODB_DNS_SERVERS?.trim() || "1.1.1.1,8.8.8.8")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);

if (uri.startsWith("mongodb+srv://")) {
  setServers(dnsServers);
}

const client = new MongoClient(uri);
await client.connect();
const collection = client.db(dbName).collection(collectionName);
let updated = 0;

for await (const document of collection.find({ body: { $type: "string" } }, { projection: { _id: 1, body: 1 } })) {
  const body = normalizeLessonBody(document.body);
  if (body !== document.body) {
    await collection.updateOne(
      { _id: document._id },
      { $set: { body, updatedAt: new Date() } },
    );
    updated += 1;
  }
}

console.log(`Normalized ${updated} lesson bodies in ${dbName}.${collectionName}`);
await client.close();
