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
