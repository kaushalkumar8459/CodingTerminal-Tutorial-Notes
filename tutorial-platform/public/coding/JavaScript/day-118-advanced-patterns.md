# Day 118 — Advanced Patterns (Event Emitter, Promise Simulator, Async Retry, Rate Limiter)

Bonus practice, building on Module 6's async knowledge. No limit on how many
variations you try.

## Event Emitter

1. Build an `EventEmitter` class with `on(eventName, callback)`, `off(eventName,
callback)`, and `emit(eventName, ...args)` — a mini version of Node.js's built-in
   EventEmitter.
2. Test it: register two different listeners for the same event, `emit()` it, and
   confirm both run with the correct arguments.
3. Confirm `off()` correctly stops a specific listener from being called again.

## Promise Simulator & Async Retry

4. Build your own minimal `myPromise` implementation (a simplified version) with
   `.then()`/`.catch()` support — purely for understanding, not for real use (research-level,
   optional/stretch).
5. Build `retry(asyncFn, maxAttempts, delayMs)` — calls an async function, and if it
   rejects, retries it (with a delay) up to `maxAttempts` times before finally failing.
6. Test `retry()` against a function that fails a fixed number of times before
   succeeding, confirming it eventually resolves correctly.

## Rate Limiter

7. Build a simple `rateLimiter(fn, maxCalls, windowMs)` — wraps `fn` so it can only be
   called `maxCalls` times within any `windowMs` period; extra calls are rejected or
   queued (your choice — document which behavior you picked).
8. Test it by calling the rate-limited function rapidly and confirming excess calls
   are correctly blocked/delayed.

## Interview-style questions

9. How does a custom `EventEmitter` relate to the DOM's built-in
   `addEventListener`/`dispatchEvent` system?
10. Why is `retry()` a genuinely useful pattern for real-world network requests
    (connect this back to Day 90's retry practice)?
11. What's the practical difference between a rate limiter and the debounce/throttle
    utilities from Day 106-107?

## Notes

- These four patterns are all "senior-level" JavaScript patterns that show up in real
  production systems and system-design-style interview questions.
- `retry()` directly extends the Day 90 User Management Dashboard's `retryFetch()`
  helper — reuse and refine that if you built it there.
