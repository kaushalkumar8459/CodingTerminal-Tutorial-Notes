---
title: Async JavaScript Project
slug: day-091-async-javascript-project
dayLabel: Day 91
level: Advanced
estimatedMinutes: 40
order: 91
track: javascript
---

# Day 91 [Advanced]: Async JavaScript Project

## Goal

Bring together everything from Module 6 — the event loop, Promises, async/await, and the Fetch API — into one complete, realistic project.

## Prerequisites

- Day 77–90 (all of Module 6)

## Explanation

Module 6 covered a huge amount of conceptual ground: the mechanics of asynchronous execution (execution context, call stack, runtime, event loop), Promises and their combinators, async/await syntax, and real network requests with the Fetch API and proper error handling. Today's project — a **Weather / Product / User API Dashboard** (pick whichever domain interests you most) — combines all of it into one cohesive, realistic application.

## Topic by Topic

### Topic 1: Project scope and data source

Theory:
Choose a domain (weather, products, or users) and a corresponding public API (or mock JSON), then plan out the core features your dashboard needs.

Code Example:

```js
// Example: Weather Dashboard using a public weather API (needs an API key in practice)
async function getWeather(city) {
  const response = await fetch(`https://api.example.com/weather?city=${city}`);
  if (!response.ok) throw new Error(`Weather fetch failed: ${response.status}`);
  return response.json();
}
```

**Explanation:** Whichever domain you choose, the core pattern is the same: fetch, check `response.ok`, parse, and return clean data — exactly the pattern practiced across Days 88-90.

**Key Points:**

- Choose ONE domain to keep the project focused: weather, products, or users.
- Reuse the fetch + error-check + parse pattern from Days 88-90 as your foundation.
- Plan your core features before writing code: what should this dashboard actually DO?

### Topic 2: Combining Promise combinators for multiple data sources

Theory:
Real dashboards often need MULTIPLE pieces of data loaded together — this is where `Promise.all()`/`Promise.allSettled()` (Day 83-85) apply directly.

Code Example:

```js
async function loadDashboard(cities) {
  const results = await Promise.allSettled(
    cities.map((city) => getWeather(city)),
  );

  return results.map((result, index) => ({
    city: cities[index],
    success: result.status === "fulfilled",
    data: result.status === "fulfilled" ? result.value : null,
    error: result.status === "rejected" ? result.reason.message : null,
  }));
}
```

**Explanation:** `Promise.allSettled()` ensures that even if fetching weather for ONE city fails, the others still load successfully — each result is individually checked and formatted, rather than the whole dashboard failing due to one bad request.

**Key Points:**

- `Promise.allSettled()` is often the right choice for dashboards, since partial failures shouldn't break the whole page.
- Mapping over `.allSettled()`'s results to build a clean, consistent output shape is a common, valuable pattern.
- This directly reuses Day 84-85's combinator knowledge in a realistic scenario.

### Topic 3: Full error handling and loading states throughout

Theory:
A production-quality dashboard tracks loading and error states for EVERY async operation, not just the initial load — including retries, refreshes, and individual item failures.

Code Example:

```js
class Dashboard {
  #isLoading = false;
  #error = null;
  #data = [];

  async load(cities) {
    this.#isLoading = true;
    this.#error = null;
    try {
      this.#data = await loadDashboard(cities);
    } catch (error) {
      this.#error = error.message;
    } finally {
      this.#isLoading = false;
    }
  }

  getState() {
    return { isLoading: this.#isLoading, error: this.#error, data: this.#data };
  }
}
```

**Explanation:** This combines Module 5's class/encapsulation skills (private fields, controlled state access) with Module 6's async patterns (loading/error tracking with `try/finally`) — a genuinely realistic, production-style structure.

**Key Points:**

- Combining OOP (Module 5) with async patterns (Module 6) reflects how real applications are actually structured.
- Private state (`#isLoading`, `#error`, `#data`) with a `getState()` method keeps the dashboard's internals encapsulated.
- This structure could be directly adapted into a real framework component later.

### Topic 4: Extending the project

Theory:
Once the core dashboard works, extend it with additional realistic features that combine earlier skills.

Practical:
Consider adding: a search/filter feature (Module 3 skills) on the loaded data, a refresh button that re-fetches with a loading state, a retry mechanism for failed individual items (from Day 90), or caching previously loaded data using a `Map` (Day 73) to avoid redundant re-fetching.

**Key Points:**

- This capstone project is meant to combine skills from across MULTIPLE modules, not just Module 6 in isolation.
- Treat this as a genuine checkpoint before Module 7's DOM and browser-focused final project (Day 110).
- No limit on how far you extend this — it's a great candidate for a personal portfolio project.

## Recap

- The Async JavaScript Project combines fetch, error handling, Promise combinators, and async/await into one realistic dashboard.
- `Promise.allSettled()` is often the right tool when partial failures across multiple data sources shouldn't break the whole page.
- Combining OOP (Module 5) with async patterns (Module 6) reflects genuine real-world application structure.

## What's Next

Practice for today: `public/coding/JavaScript/day-091-async-assessment.md` — the Module 6 assessment challenge. Day 92 begins Module 7 with an introduction to the DOM.
