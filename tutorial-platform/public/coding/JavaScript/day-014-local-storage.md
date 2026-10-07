# Day 014 — Local Storage

Matches Tutorial Day 14 (Browser Storage). No limit on how many you solve/extend.

## Basic

1. Save your name to Local Storage and read it back with `getItem`.
2. Save a number as a string to Local Storage, read it back, and convert it back to a number.
3. Remove a single key from Local Storage and confirm it's gone (`getItem` returns `null`).
4. Clear all of Local Storage and confirm every key is gone.
5. Save an object using `JSON.stringify()`, then read and `JSON.parse()` it back.
6. Save an array of strings using JSON, then read it back and print each item.
7. Check if a key exists in Local Storage before trying to use its value.
8. Save a value to Session Storage instead of Local Storage, and describe how its lifetime differs.
9. Overwrite an existing Local Storage key with a new value and confirm the update.
10. Save today's date (as a string) to Local Storage as a "last visited" marker.

## Concept

11. Build a `saveUser(user)` / `loadUser()` pair of functions that stringify/parse automatically.
12. Build a "theme preference" toggle that saves `"light"`/`"dark"` to Local Storage and
    reads it back on page load.
13. Build a simple visit counter that increments a number in Local Storage every time the
    page loads.
14. Handle the case where a key doesn't exist yet (first-time visit) without crashing.
15. Build a function `clearAppData()` that removes only your app's specific keys, without
    wiping unrelated Local Storage data.

## Project: Persistent Notes App

16. Build a small notes app with:
    - An input + "Add Note" button.
    - Notes are displayed in a list on the page.
    - Each note has a "Delete" button.
    - All notes are saved to Local Storage as a JSON array.
    - When the page is reloaded, previously saved notes still appear.

## Interview-style questions

17. Why can Local Storage only store strings, and what's the standard workaround for
    storing objects/arrays?
18. What's the practical difference between Local Storage and Session Storage?
19. Why should you avoid storing sensitive data (like passwords) in Local Storage?

## Notes

- Always wrap `JSON.parse()` calls in a `try/catch` in real projects — corrupted or
  missing data can otherwise crash your app (a light preview of Day 89's error handling).
- Test your Notes App by refreshing the page after adding notes — if they disappear,
  something in your save/load logic needs fixing.

<!-- codingterminal-solution:start -->

# Day 014 — Solution: Local Storage

Reference solutions for `day-014-local-storage.md`. Try the practice file yourself
first before checking these.

## Basic

**1. Save and read your name**

```js
localStorage.setItem("name", "Kabir");
console.log(localStorage.getItem("name")); // "Kabir"
```

**2. Save a number, read it back as a number**

```js
localStorage.setItem("age", "28");
const age = Number(localStorage.getItem("age"));
console.log(age, typeof age); // 28 "number"
```

**3. Remove a key**

```js
localStorage.removeItem("name");
console.log(localStorage.getItem("name")); // null
```

**4. Clear everything**

```js
localStorage.clear();
console.log(localStorage.length); // 0
```

**5. Save/read an object with JSON**

```js
const user = { name: "Zoe", age: 25 };
localStorage.setItem("user", JSON.stringify(user));

const savedUser = JSON.parse(localStorage.getItem("user"));
console.log(savedUser.name); // "Zoe"
```

**6. Save/read an array**

```js
const fruits = ["apple", "banana", "cherry"];
localStorage.setItem("fruits", JSON.stringify(fruits));

const savedFruits = JSON.parse(localStorage.getItem("fruits"));
savedFruits.forEach((fruit) => console.log(fruit));
```

**7. Check if a key exists**

```js
if (localStorage.getItem("theme") !== null) {
  console.log("Theme is set:", localStorage.getItem("theme"));
} else {
  console.log("No theme set yet");
}
```

**8. Session Storage**

```js
sessionStorage.setItem("tempFlag", "true");
console.log(sessionStorage.getItem("tempFlag")); // "true"
// Difference: sessionStorage is cleared automatically once this browser TAB closes;
// localStorage persists even after closing and reopening the browser entirely.
```

**9. Overwrite an existing key**

```js
localStorage.setItem("theme", "light");
localStorage.setItem("theme", "dark"); // overwrites the previous value
console.log(localStorage.getItem("theme")); // "dark"
```

**10. "Last visited" marker**

```js
localStorage.setItem("lastVisited", new Date().toISOString());
console.log(localStorage.getItem("lastVisited"));
```

## Concept

**11. `saveUser`/`loadUser`**

```js
function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function loadUser() {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}

saveUser({ name: "Ishaan", age: 30 });
console.log(loadUser()); // { name: "Ishaan", age: 30 }
```

**12. Theme preference toggle**

```js
function setTheme(theme) {
  localStorage.setItem("theme", theme);
  document.body.classList.toggle("dark-mode", theme === "dark");
}

function loadTheme() {
  const theme = localStorage.getItem("theme") || "light";
  document.body.classList.toggle("dark-mode", theme === "dark");
}

setTheme("dark");
loadTheme(); // applies dark mode on page load
```

**13. Visit counter**

```js
function incrementVisitCount() {
  const current = Number(localStorage.getItem("visitCount")) || 0;
  const updated = current + 1;
  localStorage.setItem("visitCount", String(updated));
  return updated;
}

console.log(incrementVisitCount()); // 1, then 2, then 3 ... each time the page loads
```

**14. Handle a missing key without crashing**

```js
function getVisitCount() {
  const raw = localStorage.getItem("visitCount");
  return raw === null ? 0 : Number(raw); // safe default for first-time visitors
}

console.log(getVisitCount()); // 0 on first visit, never crashes
```

**15. `clearAppData()` — only your app's keys**

```js
function clearAppData() {
  const appKeys = ["user", "theme", "visitCount", "lastVisited"];
  appKeys.forEach((key) => localStorage.removeItem(key));
}

clearAppData(); // removes only these specific keys, leaving anything else untouched
```

<!-- codingterminal-solution:end -->

