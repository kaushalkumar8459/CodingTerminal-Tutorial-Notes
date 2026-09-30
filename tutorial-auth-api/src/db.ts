import { setServers } from "node:dns";
import { MongoClient, type Db } from "mongodb";
import { appConfig } from "./config.js";

const { uri, dbName, dnsServers } = appConfig.database;

if (uri.startsWith("mongodb+srv://")) {
  setServers(dnsServers);
}

let client: MongoClient | null = null;
let db: Db | null = null;
let connectionPromise: Promise<Db> | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not configured. Set it in the backend .env file.",
    );
  }

  if (db) {
    return db;
  }

  if (!connectionPromise) {
    const nextClient = new MongoClient(uri);
    connectionPromise = (async () => {
      try {
        await nextClient.connect();
        const connectedDb = nextClient.db(dbName);
        client = nextClient;
        db = connectedDb;
        return connectedDb;
      } catch (error) {
        await nextClient.close().catch(() => undefined);
        throw error;
      } finally {
        connectionPromise = null;
      }
    })();
  }

  return connectionPromise;
}

export async function getDatabase(): Promise<Db> {
  return db ?? connectToDatabase();
}

export async function closeDatabase() {
  if (connectionPromise) {
    await connectionPromise.catch(() => undefined);
  }

  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}
