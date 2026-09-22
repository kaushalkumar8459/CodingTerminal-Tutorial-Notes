# Day 009 — Big MNC Frontend Interview Questions: Google, Meta, Amazon & Microsoft

> This set is a **source-attributed interview-preparation collection**. Questions are paraphrased from publicly available company interview guides and candidate-reported material. They are not presented as guaranteed current questions for every team or interview loop.

## Google

### 1. Throttle a function
Implement a reusable throttle utility that limits how frequently a function can execute.

**What to discuss:** leading/trailing execution, timer cleanup, arguments, `this`, and edge cases.

### 2. Debounce a callback
Create a function that delays execution until calls stop for a specified period.

**What to discuss:** cancellation, repeated calls, preserving arguments and receiver.

### 3. Traverse HTML nodes with DFS
Given a DOM subtree, traverse its descendants depth-first and perform an operation on matching nodes.

**What to discuss:** recursion vs explicit stack and DOM-specific edge cases.

### 4. Build a Google-Docs-style outline
Given a hierarchy of headings, render or transform it into a navigable outline.

**What to discuss:** tree traversal, DOM generation, event handling, and incremental updates.

### 5. Design an emoji autocomplete
Design the frontend behavior for searching and selecting emoji suggestions while typing.

**What to discuss:** indexing/search, keyboard navigation, debouncing, accessibility, caching, and rendering performance.

### 6. Streaming/generator problem
Process a stream of file/API data incrementally using JavaScript generators or async iteration.

**What to discuss:** backpressure, memory usage, cancellation, and error handling.

---

## Meta

### 7. Implement an Event Emitter
Create an event emitter supporting subscription, unsubscription, and event emission.

**What to discuss:** multiple listeners, listener removal, once-only listeners, mutation during emit, and memory leaks.

### 8. Implement a `classnames` utility
Accept strings, arrays, and conditional objects and return one correctly formatted class-name string.

**What to discuss:** recursion, falsy values, nested arrays, and API design.

### 9. Manage an asynchronous callback queue
Design a small utility that accepts asynchronous operations and invokes queued callbacks in the required order.

**What to discuss:** concurrency, ordering, errors, cancellation, and race conditions.

### 10. Build a DOM utility
Implement a utility that finds or transforms matching DOM nodes efficiently.

**What to discuss:** traversal strategy, selectors, event delegation, and avoiding unnecessary DOM work.

### 11. Frontend coding + DSA
Be prepared for a combination of JavaScript coding and standard algorithmic problems rather than assuming every round is UI-only.

**What to discuss:** choosing the right data structure, complexity, and communicating the solution before coding.

---

## Amazon

### 12. Vanilla JavaScript UI implementation
Build a small interactive component using HTML, CSS, and JavaScript without relying on a framework.

**What to discuss:** semantic HTML, state, events, accessibility, testing, and maintainability.

### 13. Search/filter/sort UI
Implement a data-driven interface supporting search, filtering, sorting, and pagination.

**What to discuss:** state modeling, debouncing, URL state, server vs client filtering, and performance.

### 14. Retry with backoff
Implement a reusable API retry mechanism with bounded retries and increasing delays.

**What to discuss:** retryable status codes, jitter, cancellation, idempotency, and observability.

### 15. Frontend performance investigation
A page is slow on a low-bandwidth device. Explain how you would identify and fix the bottleneck.

**What to discuss:** Core Web Vitals, network waterfall, JavaScript cost, rendering, images, caching, and measurement.

### 16. Accessible interactive component
Build a component that works with keyboard navigation and assistive technology.

**What to discuss:** semantic elements, focus management, ARIA only where necessary, and testing.

### 17. Leadership/behavioral scenario
Describe a situation where you disagreed with a technical decision and explain how you handled the disagreement and final decision.

**What to discuss:** context, trade-offs, communication, action, and measurable outcome.

---

## Microsoft

### 18. Tic-tac-toe in vanilla JavaScript
Build a playable tic-tac-toe interface.

**What to discuss:** state model, win detection, rendering, input handling, reset behavior, and testability.

### 19. Chat interface
Design and implement a chat-style UI similar to a collaboration application.

**What to discuss:** message state, optimistic updates, pagination, real-time updates, accessibility, and failure states.

### 20. Chess using OOP
Model a chess game using object-oriented JavaScript.

**What to discuss:** inheritance/composition, board state, legal moves, separation of rules from UI, and testing.

### 21. Phone keypad input
Implement old-style multi-tap phone input where repeated presses cycle through characters and a timeout commits the current character.

**What to discuss:** timers, state machines, keyboard/input events, and cleanup.

### 22. JavaScript SDK with throttling and retry
Design an SDK that exposes a stable API while internally handling throttling and retry behavior.

**What to discuss:** public contracts, error types, cancellation, concurrency limits, and testability.

---

## Interview Classification

| Question | Company guide | Primary skill |
|---|---|---|
| Throttle | Google | JavaScript / performance |
| Debounce | Google | JavaScript / browser |
| DOM DFS | Google | DOM / algorithms |
| Event Emitter | Meta | JavaScript / design patterns |
| Classnames | Meta | JavaScript / API design |
| Async callback queue | Meta | Async JavaScript |
| Vanilla UI | Amazon | DOM / accessibility |
| Retry with backoff | Amazon | Async / networking |
| Performance investigation | Amazon | Web performance |
| Tic-tac-toe | Microsoft | Machine coding |
| Chat UI | Microsoft | UI architecture |
| Chess OOP | Microsoft | OOP / JavaScript |
| Phone keypad | Microsoft | State / timers |
| SDK design | Microsoft | API design / async |

## Source Notes

- Google Front End Interview Handbook: https://www.frontendinterviewhandbook.com/companies/google-front-end-interview-questions
- Meta Front End Interview Handbook: https://www.frontendinterviewhandbook.com/companies/meta-front-end-interview-questions
- Microsoft Front End Interview Handbook: https://www.frontendinterviewhandbook.com/companies/microsoft-front-end-interview-questions
- Frontend Interview Handbook company index: https://www.frontendinterviewhandbook.com/company-interview-questions
- GreatFrontEnd company guides: https://www.greatfrontend.com/interviews/company
- Amazon official Front End Engineer interview preparation: https://amazon.jobs/content/en/how-we-hire/university/front-end-engineer

## Important

Company interview questions vary by role, level, team, interviewer, location, and hiring cycle. Use these as **documented/public interview-preparation signals**, not as a promise that the same question will appear in a future interview.
