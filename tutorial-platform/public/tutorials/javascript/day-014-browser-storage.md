---
title: Browser Storage - Local Storage and Session Storage
slug: day-014-browser-storage
dayLabel: Day 14
level: Beginner
estimatedMinutes: 25
order: 14
track: javascript
---

# Day 14 [Beginner]: Browser Storage — Local Storage and Session Storage

## Goal

Learn how to save data directly in the browser using Local Storage and Session Storage, so information can survive page reloads (or even browser restarts).

## Prerequisites

- Day 1–13 (core JavaScript, basic DOM/events)

## Explanation

Normally, all your JavaScript variables disappear the moment a page is refreshed or closed. **Browser storage** solves this by letting you save small amounts of data directly in the browser, tied to a specific website.

There are two main options: **Local Storage** keeps data even after the browser is closed and reopened — it persists until explicitly cleared. **Session Storage** keeps data only for the current tab's session — it disappears once that tab is closed.

Both work through a simple key-value API: `setItem(key, value)` to save, `getItem(key)` to read, `removeItem(key)` to delete one entry, and `clear()` to wipe everything. One important limitation: both storages can only store **strings** — so to save objects or arrays, you need to convert them using `JSON.stringify()` and `JSON.parse()` (a full topic on Day 100).

## Topic by Topic

### Topic 1: Local Storage basics

Theory:
Local Storage saves key-value pairs in the browser that persist even after the browser is fully closed and reopened.

Practical:
Use Local Storage for things that should "remember" a user across visits — like saved notes, a theme preference, or items in a cart.

Code Example:

```js
localStorage.setItem("username", "Aarav");
console.log(localStorage.getItem("username")); // "Aarav"

localStorage.removeItem("username");
console.log(localStorage.getItem("username")); // null - it's gone
```

**Explanation:** `setItem` saves the value under the key `"username"`; `getItem` retrieves it later — even after closing and reopening the browser, as long as `removeItem`/`clear()` hasn't run.

**Key Points:**

- `localStorage.setItem(key, value)` saves data.
- `localStorage.getItem(key)` reads it back (returns `null` if not found).
- `localStorage.removeItem(key)` deletes one entry; `localStorage.clear()` deletes everything.

### Topic 2: Session Storage basics

Theory:
Session Storage works exactly like Local Storage (same methods), but the data only lasts for the current browser tab's session — it clears automatically when that tab is closed.

Practical:
Use Session Storage for temporary, tab-specific data — like a multi-step form's progress that shouldn't persist after the user leaves.

Code Example:

```js
sessionStorage.setItem("step", "2");
console.log(sessionStorage.getItem("step")); // "2"
// Closing this tab clears it automatically
```

**Explanation:** The API is identical to Local Storage, but the _lifespan_ of the data is different — tied to the tab session instead of being permanent.

**Key Points:**

- Same methods as Local Storage: `setItem`, `getItem`, `removeItem`, `clear`.
- Data disappears automatically once the tab is closed.
- Good for short-lived, tab-specific data that shouldn't linger.

### Topic 3: Storing objects and arrays with JSON

Theory:
Both storages only store strings. To store an object or array, convert it to a string first with `JSON.stringify()`, and convert it back with `JSON.parse()` when reading it.

Practical:
This pattern — stringify to save, parse to read — is something you'll use constantly for any "remembered" data more complex than a single value.

Code Example:

```js
const user = { name: "Diya", age: 24 };

localStorage.setItem("user", JSON.stringify(user)); // convert to string to save

const savedUserText = localStorage.getItem("user");
const savedUser = JSON.parse(savedUserText); // convert back to an object

console.log(savedUser.name); // Diya
```

**Explanation:** `JSON.stringify()` turns the object into text so storage can hold it; `JSON.parse()` turns that text back into a real usable object.

**Key Points:**

- Storage can only hold strings — always `JSON.stringify()` objects/arrays before saving.
- Always `JSON.parse()` when reading them back out.
- Forgetting this step is a very common bug — you'll get a string like `"[object Object]"` instead of real data.

### Topic 4: Storage limitations and Local vs Session Storage

Theory:
Browser storage has a size limit (typically around 5–10MB per site, varying by browser) and should never be used for sensitive data, since it's easily readable via DevTools.

Practical:
Choose Local Storage for data that should persist across visits (preferences, saved drafts); choose Session Storage for short-lived, per-tab data (temporary form state, one-time flags).

Code Example:

```js
// Local Storage - persists across browser restarts
localStorage.setItem("theme", "dark");

// Session Storage - gone once this tab closes
sessionStorage.setItem("currentPage", "checkout");
```

**Explanation:** Both are simple to use, but picking the right one depends on how long you actually want the data to stick around.

**Key Points:**

- Storage size is limited (a few MB) — not meant for large datasets.
- Never store sensitive data (passwords, tokens) in either storage — it isn't secure.
- Local Storage = persistent across sessions; Session Storage = only for the current tab.

## Recap

- Local Storage persists data across browser restarts; Session Storage lasts only for the current tab.
- Both use the same API: `setItem`, `getItem`, `removeItem`, `clear`.
- Storage only holds strings — use `JSON.stringify()`/`JSON.parse()` for objects and arrays.
- Never store sensitive data in browser storage; it isn't secure.

## What's Next

Practice for today: `public/coding/JavaScript/day-014-local-storage.md` — build a Persistent Notes App. Day 15 wraps up Module 1 with a full revision and the Personal Expense Tracker project.
