---
title: API Data Processing
slug: day-090-api-data-processing
dayLabel: Day 90
level: Advanced
estimatedMinutes: 30
order: 90
track: javascript
---

# Day 90 [Advanced]: API Data Processing

## Goal

Learn to properly parse, transform, and display real API data — bringing together JSON handling with everything learned about arrays/objects in Module 3.

## Prerequisites

- Day 88–89 (Fetch API, error handling), Module 3 (array/object methods)

## Explanation

Once you've successfully fetched data, the real work often begins: parsing the **JSON response** into usable JavaScript objects, then **transforming** that data into exactly the shape your program needs (reusing `.map()`, `.filter()`, `.reduce()` from Module 3), and finally **displaying** it in a useful way. Real API responses are often messier or differently-shaped than you'd like — this is exactly where the reshaping techniques from Day 45 ("transforming API-style data") apply directly to genuine data.

## Topic by Topic

### Topic 1: Parsing JSON responses

Theory:
`response.json()` parses the response body text into a real JavaScript value (usually an object or array) — but it can fail if the response isn't valid JSON.

Code Example:

```js
async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) throw new Error(`Status ${response.status}`);

  const users = await response.json(); // parses JSON text into a real array of objects
  console.log(Array.isArray(users)); // true
  return users;
}
```

**Explanation:** `response.json()` itself returns a Promise (since parsing can take a moment for large responses), so it needs its own `await` — this is exactly the two-step `await` pattern introduced on Day 88.

**Key Points:**

- `response.json()` returns a Promise — always `await` it separately from the `fetch()` call itself.
- The result is a real JavaScript object/array, ready for normal array/object methods.
- If the response body isn't valid JSON, `.json()` itself will reject — worth wrapping in `try/catch`.

### Topic 2: Transforming raw API data

Theory:
Real API data often needs reshaping before use — renaming fields, computing derived values, or filtering out irrelevant records — using the exact `.map()`/`.filter()` techniques from Day 45.

Code Example:

```js
async function getFormattedUsers() {
  const users = await getUsers();

  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    city: user.address.city, // reaching into nested API data
  }));
}
```

**Explanation:** The raw API response includes more fields than needed (like a nested `address` object) — `.map()` reshapes each user into exactly the simplified structure the rest of the program actually needs.

**Key Points:**

- Real API data often needs reshaping — this directly reuses Day 45's "transforming API-style data" techniques.
- Reaching into nested API fields (like `user.address.city`) is extremely common.
- Keep this reshaping logic in one dedicated function, so the rest of your program works with clean, predictable data.

### Topic 3: Combining fetch, error handling, and transformation

Theory:
A complete, realistic API function combines fetching, error handling (Day 89), and data transformation (this topic) into one clean, reusable function.

Code Example:

```js
async function fetchAndFormatUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error(`Status ${response.status}`);

    const rawUsers = await response.json();
    return rawUsers
      .filter((user) => user.email.includes("@")) // basic sanity filter
      .map((user) => ({ id: user.id, name: user.name, email: user.email }));
  } catch (error) {
    console.log("Failed to fetch/format users:", error.message);
    return [];
  }
}
```

**Explanation:** This single function handles the ENTIRE flow — fetch, check for errors, parse, filter, and reshape — returning a clean, ready-to-use array (or an empty array on failure, a sensible fallback).

**Key Points:**

- Combining fetch + error handling + transformation into one function is the standard real-world pattern.
- Returning a sensible fallback (like an empty array) on failure keeps calling code simple.
- This pattern directly prepares you for tomorrow's full User Management Dashboard project.

### Topic 4: Displaying processed data

Theory:
Once data is fetched and transformed, "displaying" it (even just via `console.log` in this course, or DOM manipulation in a real app) is the final step of the flow.

Code Example:

```js
async function displayUserSummary() {
  const users = await fetchAndFormatUsers();

  users.forEach((user) => {
    console.log(`${user.name} <${user.email}>`);
  });

  console.log(`Total users: ${users.length}`);
}
```

**Explanation:** By the time this function runs, `users` is already clean, formatted data — display logic doesn't need to know anything about fetching, error handling, or the original raw API shape.

**Key Points:**

- Keeping fetch/transform logic SEPARATE from display logic makes each part easier to test and reuse.
- This separation of concerns pattern scales well as programs grow larger.
- This is exactly the shape of code you'll build for the User Management Dashboard tomorrow.

## Recap

- `response.json()` parses response data, itself requiring an `await`.
- Real API data often needs reshaping with `.map()`/`.filter()`, reusing Day 45's techniques.
- Combining fetch, error handling, and transformation into one clean function, separate from display logic, is the standard real-world pattern.

## What's Next

Practice for today: `public/coding/JavaScript/day-090-user-management-dashboard.md` — a complete API project. Day 91 wraps up Module 6 with a final Async JavaScript project.
