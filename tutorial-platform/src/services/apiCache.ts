const TTL_MS = 10 * 60 * 1000;
const STORAGE_PREFIX = "api-cache:";

type Entry = { value: unknown; expiresAt: number };

const memory = new Map<string, Entry>();
const inFlight = new Map<string, Promise<unknown>>();

function readStored(key: string): Entry | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_PREFIX + key);
    return raw ? (JSON.parse(raw) as Entry) : null;
  } catch {
    return null;
  }
}

function writeStored(key: string, entry: Entry) {
  try {
    window.sessionStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(entry));
  } catch {
    // Quota exceeded or storage unavailable: memory cache still works.
  }
}

// Returns a fresh cached value (memory, then sessionStorage) or runs the loader once per key.
export async function cached<T>(key: string, loader: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const entry = memory.get(key) ?? readStored(key);
  if (entry && entry.expiresAt > now) {
    memory.set(key, entry);
    return entry.value as T;
  }

  const pending = inFlight.get(key);
  if (pending) return pending as Promise<T>;

  const promise = loader()
    .then((value) => {
      const fresh = { value, expiresAt: Date.now() + TTL_MS };
      memory.set(key, fresh);
      writeStored(key, fresh);
      return value;
    })
    .finally(() => inFlight.delete(key));
  inFlight.set(key, promise);
  return promise;
}

// Returns the cached value without expiry checks, for instant first paint.
export function peekCached<T>(key: string): T | undefined {
  const entry = memory.get(key) ?? readStored(key);
  return entry && entry.expiresAt > Date.now() ? (entry.value as T) : undefined;
}

export function invalidateCache(prefix = "") {
  for (const key of [...memory.keys()]) if (key.startsWith(prefix)) memory.delete(key);
  try {
    for (const storageKey of Object.keys(window.sessionStorage)) {
      if (storageKey.startsWith(STORAGE_PREFIX + prefix)) window.sessionStorage.removeItem(storageKey);
    }
  } catch {
    // Storage unavailable.
  }
}
