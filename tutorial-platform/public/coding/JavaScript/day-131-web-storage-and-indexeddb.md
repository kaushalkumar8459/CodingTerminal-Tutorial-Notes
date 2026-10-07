# Day 131 — Web Storage, Cookies & IndexedDB

## localStorage

1. Store and retrieve strings with localStorage.
2. Serialize structured data with JSON.
3. Handle missing and invalid stored data.
4. Explain persistence and origin scoping.

## sessionStorage

5. Explain how sessionStorage differs from localStorage.
6. Build a temporary form-draft store.
7. Handle storage quota and serialization failures.

## Cookies

8. Explain cookie name/value, expiry, path, domain, Secure, and SameSite at a practical level.
9. Explain the difference between HttpOnly and JavaScript-readable cookies.
10. Understand why sensitive session cookies commonly use HttpOnly and Secure.
11. Explain SameSite behavior at a high level.

## IndexedDB

12. Explain when IndexedDB is preferable to localStorage.
13. Create an object store.
14. Add, read, update, and delete records.
15. Use indexes for lookup.
16. Handle database version upgrades.
17. Design a small offline-first cache.

## Interview Questions

18. localStorage vs sessionStorage?
19. Cookies vs localStorage?
20. Why can HttpOnly cookies not be read by JavaScript?
21. When would you choose IndexedDB?
22. What happens when browser storage quota is exceeded?
23. What should not be stored in browser storage?

## Practice Checklist

Build a small offline cache with IndexedDB and a fallback strategy for unavailable or invalid cached data.

<!-- codingterminal-solution:start -->

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

<!-- codingterminal-solution:end -->

