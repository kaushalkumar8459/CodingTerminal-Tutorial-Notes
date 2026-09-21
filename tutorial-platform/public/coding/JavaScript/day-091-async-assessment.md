# Day 091 — Async Assessment: Advanced API Challenge

Matches Tutorial Day 91 (Async JavaScript Project). Combines fetch, Promises,
async/await, error handling, parallel requests, and data transformation. No limit on
how far you extend this.

## Challenge

Build a function `buildReport(userIds)` that, given an array of user IDs:

1. Fetches each user's full profile (in PARALLEL, using `Promise.all()` or
   `Promise.allSettled()` — decide which fits better and justify your choice in a comment).
2. For each successfully fetched user, also fetches their posts (a SECOND round of
   parallel requests).
3. Combines each user with their posts into one object:
   `{ user, posts, postCount: posts.length }`.
4. Handles individual failures gracefully — if one user's data fails to load, the
   REST of the report should still be generated (don't let one failure break everything).
5. Returns a final report object: `{ successCount, failureCount, results }`.

## Requirements checklist

6. Use `async/await` throughout — no raw `.then()` chains for the main flow.
7. Include proper `response.ok` checking for every fetch.
8. Use `Promise.allSettled()` somewhere in the flow to handle partial failures.
9. Add a `retryFetch(url, maxAttempts)` helper and use it for at least one of the
   fetch calls.
10. Add clear `console.log()` output tracing the report's progress (e.g. "Fetching
    user 3 of 5...") — useful both for debugging and for understanding execution order.

## Interview-style questions

11. Why does fetching each user's POSTS need to happen in a SEPARATE round of
    requests, after the user data itself has been fetched?
12. What would happen to your report if you used `Promise.all()` instead of
    `Promise.allSettled()` for the user fetches, and one of them failed?
13. Walk through, step by step, the exact order operations would happen in in your
    `buildReport()` function, including which parts run in parallel vs sequentially.

## Notes

- This is intentionally the most complex async challenge in the course so far — take
  your time, build it incrementally (get single-user fetching working first, then
  parallelize, then add posts, then add failure handling).
- This exact combination of skills (parallel fetching, partial failure handling,
  retries, data combination) mirrors real production API integration work closely.
