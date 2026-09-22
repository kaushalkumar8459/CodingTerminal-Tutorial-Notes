# Day 131 Solutions — Web Storage, Cookies & IndexedDB

## 1. Safe localStorage JSON

```js
function readJson(key) {
  const value = localStorage.getItem(key);

  if (value === null) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

localStorage.setItem("settings", JSON.stringify({ theme: "dark" }));
```

## 2. sessionStorage

```js
sessionStorage.setItem("draft", JSON.stringify({ name: "Kaushal" }));
```

Session storage is scoped to the origin and browser tab/session behavior; it is not a secure secret store.

## 3. IndexedDB starter

```js
const request = indexedDB.open("CodingTerminalDB", 1);

request.onupgradeneeded = () => {
  const db = request.result;
  db.createObjectStore("questions", { keyPath: "id" });
};

request.onsuccess = () => {
  const db = request.result;
  const transaction = db.transaction("questions", "readwrite");
  transaction.objectStore("questions").put({
    id: 1,
    title: "Event Loop"
  });
};
```

## Interview Takeaway

Use localStorage for small simple persistence, not as a general database. IndexedDB is designed for structured client-side data and larger offline-oriented use cases.
