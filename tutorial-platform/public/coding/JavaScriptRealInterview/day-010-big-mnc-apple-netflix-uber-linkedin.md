# Day 010 — Big MNC Frontend Interview Questions: Apple, Netflix, Uber & LinkedIn

> This set is a **source-attributed interview-preparation collection**. Questions are paraphrased from public company interview guides and candidate-reported material. They are not guarantees of what a future interview will ask.

## Apple

### 1. Implement Array prototype methods
Implement methods such as `map`, `reduce`, `flat`, or `concat` without using the built-in implementation.

**Follow-ups:** sparse arrays, callback arguments, mutation, edge cases, and complexity.

### 2. Execute promises sequentially
Given an array of asynchronous operations, execute them one after another and preserve the result order.

**Follow-ups:** rejection handling, cancellation, and whether later tasks should continue after failure.

### 3. Build a photo-ordering tool
Create a vanilla JavaScript UI where users can select/order photos.

**Follow-ups:** state management, DOM updates, keyboard support, accessibility, and performance.

### 4. Build a progress-bar group
Create multiple progress bars that fill over time.

**Follow-ups:** cancellation, restart, concurrency limits, and cleanup.

### 5. Build a multi-step form
Implement a multi-step form where data is preserved as the user moves between steps.

**Follow-ups:** validation, navigation state, persistence, accessibility, and state management.

### 6. Bug-hunt an existing application
Given an existing frontend codebase, identify and fix JavaScript/UI bugs.

**Follow-ups:** reproduce → isolate → fix → regression test.

### 7. Web-performance investigation
Explain how you would diagnose a slow page.

**Discuss:** network waterfall, JavaScript execution, rendering, layout, caching, images, Core Web Vitals, and measurement.

---

## Netflix

### 8. JavaScript fundamentals
Explain closures, promises, `this`, prototypes, asynchronous execution, and browser APIs.

**Senior follow-up:** explain how these concepts affect a production application.

### 9. Build a media/content UI
Create a content browsing interface with lists/cards and user interactions.

**Follow-ups:** loading states, pagination, lazy loading, keyboard navigation, and responsive behavior.

### 10. Design a video-streaming frontend
Design the frontend architecture for a Netflix-like streaming application.

**Discuss:** API boundaries, playback state, caching, adaptive media behavior, CDN interaction, error states, analytics, and accessibility.

### 11. Optimize a large content feed
A page contains thousands of content cards.

**Discuss:** virtualization, lazy loading, image optimization, memoization, pagination/infinite scroll, and rendering cost.

### 12. Frontend system-design scenario
Design a scalable frontend for a high-traffic media product.

**Discuss:** component architecture, state boundaries, caching, performance budgets, observability, and failure handling.

---

## Uber

### 13. Implement a rate limiter
Implement a JavaScript utility that allows at most N requests within a rolling time window.

**Follow-ups:** concurrent callers, cleanup, fairness, distributed vs client-side limits, and memory usage.

### 14. Implement an async process queue with concurrency
Given asynchronous tasks, run at most N tasks concurrently.

**Follow-ups:** task failure, error callbacks, cancellation, retries, ordering, and starvation.

### 15. Batch data with a timeout
Send data immediately when the batch reaches its maximum size. If the timeout occurs first, send the partial batch.

**Follow-ups:** timer cleanup, race conditions, flush, retry, and backpressure.

### 16. Implement Map Async Limit
Map an asynchronous function over a collection while limiting the number of active operations.

**Follow-ups:** preserve order, fail-fast vs collect-errors, cancellation, and concurrency control.

### 17. Build a progress-bar queue
A button creates progress bars. Only a fixed number may run simultaneously; queued bars start when previous ones finish.

**Follow-ups:** cancellation, completion events, queue fairness, and cleanup.

### 18. Design a calendar application
Design a calendar-like frontend for scheduling events.

**Discuss:** time zones, recurring events, optimistic updates, conflict handling, pagination, caching, and accessibility.

---

## LinkedIn

### 19. Implement getElementsByClassName
Implement a DOM traversal utility that returns elements matching a class name.

**Follow-ups:** recursive vs iterative traversal, live vs static results, performance, and DOM edge cases.

### 20. Build a tooltip
Create an accessible tooltip component.

**Follow-ups:** positioning, viewport boundaries, keyboard focus, hover/focus behavior, and cleanup.

### 21. Build a top navigation bar
Implement a responsive navigation bar.

**Follow-ups:** mobile behavior, keyboard navigation, accessibility, sticky positioning, and performance.

### 22. Implement memoization
Create a reusable memoization utility.

**Follow-ups:** multiple arguments, object arguments, cache invalidation, memory growth, and cache-key strategy.

### 23. Implement infinite scrolling
Load additional content as the user approaches the end of a list.

**Follow-ups:** pagination, duplicate requests, loading states, cancellation, IntersectionObserver, accessibility, and error recovery.

### 24. JavaScript/web fundamentals
Explain event delegation, closures, promises, callbacks, browser APIs, and DOM behavior.

**Senior follow-up:** explain where each concept affects production frontend architecture.

### 25. Reverse a doubly linked list
Reverse a doubly linked list while correctly updating both `next` and `prev` pointers.

**Follow-ups:** complexity, empty list, single node, and pointer invariants.

---

## Cross-company senior follow-ups

For each problem above, be ready for these follow-ups:

1. What happens with 100,000 items?
2. How would you prevent memory leaks?
3. How would you cancel an in-flight operation?
4. What happens when the network fails?
5. How would you test it?
6. What would you log or monitor in production?
7. What accessibility requirements apply?
8. How would you prevent duplicate requests?
9. What changes if multiple users perform the operation concurrently?
10. What would you change for a mobile/slow-device environment?

## Source Classification

| Company | Examples | Primary interview area |
|---|---|---|
| Apple | Array polyfills, sequential promises, UI coding, progress bars, multi-step forms | JS + UI + performance |
| Netflix | Streaming UI, frontend architecture, performance | System design + UI |
| Uber | Rate limiter, async queue, batching, concurrency | Advanced JavaScript |
| LinkedIn | DOM traversal, tooltip, infinite scroll, memoization | Vanilla JS + UI |

## Source Notes

- Apple Front End Interview Handbook: https://www.frontendinterviewhandbook.com/companies/apple-front-end-interview-questions
- Uber Front End Interview Handbook: https://www.frontendinterviewhandbook.com/companies/uber-front-end-interview-questions
- LinkedIn Front End Interview Handbook: https://www.frontendinterviewhandbook.com/companies/linkedin-front-end-interview-questions
- Company interview index: https://www.frontendinterviewhandbook.com/company-interview-questions

## Important

Interview processes vary by role, level, team, location, interviewer, and hiring cycle. Public candidate reports are useful signals but do not establish that a question will appear in a future interview.
