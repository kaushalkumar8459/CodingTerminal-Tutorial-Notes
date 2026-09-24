import { MongoClient, type Db } from "mongodb";
import { appConfig } from "./config.js";

const { uri, dbName } = appConfig.database;

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase() {
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not configured. Set it in the backend .env file.",
    );
  }

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
  }

  return db;
}

export async function getDatabase(): Promise<Db> {
  if (!db) {
    const connectedDb = await connectToDatabase();
    if (!connectedDb) {
      throw new Error("Database connection could not be established.");
    }
    return connectedDb;
  }

  return db;
}

export async function closeDatabase() {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}
