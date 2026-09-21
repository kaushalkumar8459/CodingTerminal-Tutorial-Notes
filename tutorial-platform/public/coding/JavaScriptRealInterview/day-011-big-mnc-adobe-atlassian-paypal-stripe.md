# Day 011 — Big MNC Interview Patterns: Adobe, Atlassian, PayPal & Stripe

> **Purpose:** Company-oriented frontend interview preparation based on publicly documented interview guides and reported interview patterns.
>
> These are **not guarantees of future interview questions**. Treat them as documented practice signals and verify the current interview format with the recruiter.

---

## 1. Adobe

Adobe frontend interviews commonly combine JavaScript/React fundamentals, UI coding, debugging, performance, and client-side architecture. Public interview material also includes polyfills, async traversal, closures, and UI components. citeturn0search2turn0search5

### JavaScript / Coding

1. Implement a polyfill for `Array.prototype.reduce`.
2. Given an asynchronous `getAllLinks(url)` API, return all descendant links while handling circular dependencies.
3. Find all leaders in an array.
4. Implement a custom React interval hook and avoid stale/double interval behavior.
5. Explain closures and how they affect callbacks and timers.
6. Debug a Promise-based task runner.
7. Discuss time and space complexity for recursive versus iterative traversal.

### UI / Browser

8. Build an accordion using vanilla JavaScript or React.
9. Build a reusable accessible component and explain keyboard navigation.
10. Investigate a slow UI and identify rendering, network, and JavaScript bottlenecks.
11. Explain Critical Rendering Path and practical frontend performance improvements.

### Senior Follow-ups

- How would you virtualize a large tree/file structure?
- How would you handle millions of notifications?
- How would you design streaming progress for an AI-style UI?
- Where should caching, retries, and API error handling live?
- How would you measure the improvement after optimization?

**Focus:** JavaScript fundamentals + UI coding + async + performance + architecture.

---

## 2. Atlassian

Atlassian's public frontend interview guide describes browser coding, JavaScript coding, frontend system design, management, and values rounds. Public question material includes search widgets, API-driven lists, tree UIs, and JavaScript fundamentals. citeturn0search1turn0search7

### JavaScript / Coding

12. Explain array operations such as `push`, `pop`, and `unshift` without relying on documentation.
13. Explain and use `Promise.any()`.
14. Explain async generators, `await`, `yield`, and `for await...of`.
15. Build a chainable fetch-based API client.
16. Implement debounce or throttle and explain the difference.
17. Build a small state machine for a UI workflow.
18. Write tests/assertions for JavaScript behavior.

### Browser / Machine Coding

19. Build a custom search widget using HTML, CSS, and JavaScript.
20. Fetch todo items from an API and render them incrementally.
21. Build a file explorer for nested directories.
22. Add accessibility semantics to a tree/file explorer.
23. Build a tab interface whose selected tab can be represented in the URL.
24. Implement undo/redo behavior for a text editor.
25. Build a feature-flag UI and explain state transitions.
26. Debug an existing frontend implementation and identify the root cause rather than only patching symptoms.

### System Design

27. Design a Jira/Trello-style board.
28. Design a collaborative document/editor experience.
29. Design a notification/activity system.
30. Design a frontend architecture for feature flags.

### Senior Follow-ups

- How does the design behave with 100k+ records?
- How do you preserve browser responsiveness?
- How would you test the component?
- What happens when the API schema changes?
- How would you coordinate shared frontend architecture across multiple teams?

**Focus:** browser coding + JavaScript + product UI + system design + collaboration.

---

## 3. PayPal

PayPal frontend interviews combine JavaScript/React, DSA, UI coding, and payment-oriented system design. Public preparation material highlights checkout reliability, security, accessibility, retries, idempotency, and embedded payment SDK concerns. citeturn0search3turn0search4

### JavaScript / DSA

31. Build an asynchronous data-wrapper class with read/create operations and explicit error handling.
32. Implement a cart with quantity updates, removal, and derived totals.
33. Solve a minimum-path triangle dynamic-programming problem.
34. Implement a Min Stack with constant-time minimum lookup.
35. Find the nearest exit from an entrance using BFS.
36. Find the longest substring without repeating characters.
37. Reverse the words in a string.
38. Explain throttle versus debounce and implement both.
39. Explain Promise execution order and async JavaScript behavior.

### React / UI

40. Build a shopping cart UI with predictable state updates.
41. Build an accessible payment form.
42. Build a data table with pagination and loading/error states.
43. Build a contact form backed by an API.
44. Design reusable validation for payment fields.
45. Explain React reconciliation, Virtual DOM, and rendering behavior.

### Payment System Design

46. Design a checkout flow from browser to backend.
47. Design an embedded payment SDK.
48. Design a multi-currency payment UI.
49. Design a payment-status flow that remains correct after retries or page refresh.
50. Design secure handling of payment tokens and sensitive data.

### Senior Follow-ups

- What happens if the payment succeeds but the browser loses connection?
- How do you prevent duplicate submissions?
- Where should idempotency be enforced?
- How should retries behave?
- How would you support slow networks and mobile devices?
- Which data belongs in the browser versus the server?
- How would you test payment failure and recovery paths?

**Focus:** JavaScript + React + DSA + payments + reliability + security.

---

## 4. Stripe

Stripe frontend interviews emphasize practical product engineering: UI coding, JavaScript utilities, API integration, debugging, system design, accessibility, and reliable async workflows. Public interview material includes forms, data tables, data transformation/selection, and API-backed frontend work. citeturn0search0

### JavaScript / Coding

51. Build a contact form that submits data to a backend API.
52. Merge rows belonging to the same user.
53. Filter rows based on a set of requirements.
54. Implement a data-processing queue.
55. Add concurrency limits to asynchronous operations.
56. Implement debounce for an API-backed search.
57. Explain Promise sequencing, failure handling, and cancellation.

### UI / Machine Coding

58. Build a paginated user data table.
59. Build an accessible form with validation and submission states.
60. Build an API-backed dashboard.
61. Implement loading, empty, success, and error states.
62. Prevent duplicate submissions when a request is already in progress.
63. Build a reusable component API with clear success/error callbacks.

### System Design

64. Design a checkout frontend.
65. Design a merchant dashboard.
66. Design a webhook-monitoring UI.
67. Design a billing analytics dashboard.
68. Design a dispute/refund workflow.
69. Design a developer API-log viewer.

### Senior Follow-ups

- How do you make payment state correct when the server changes asynchronously?
- How do you handle duplicate events?
- How do you retry safely?
- How do permissions affect the UI?
- How would you instrument frontend failures?
- How do you separate frontend responsibilities from backend responsibilities?
- How would you design for accessibility and slow networks?

**Focus:** practical engineering + API integration + correctness + reliability + system design.

---

# Cross-Company Interview Pattern

The four companies show a useful progression for frontend interviews:

### Beginner / Core

- JavaScript fundamentals
- Arrays and strings
- Promises and async/await
- DOM manipulation
- Basic UI components
- Forms and validation

### Intermediate

- Polyfills
- Debounce/throttle
- API clients
- Pagination
- Search/filter
- Recursive tree UI
- Error/loading states
- Testing

### Advanced

- Concurrency
- Retry and cancellation
- Performance optimization
- Accessibility
- Large-data rendering
- State architecture
- Frontend system design
- API reliability

### Senior / 7–10 Years

Expect the interviewer to move beyond "can you code this?" and ask:

1. Why did you choose this architecture?
2. What happens at 100k/1M records?
3. What happens when the network fails?
4. How do you prevent duplicate requests?
5. How do you handle race conditions?
6. How do you test the design?
7. How do you monitor production failures?
8. How do you make it accessible?
9. What belongs on the client versus server?
10. How would multiple teams maintain this system?

---

# Source Classification

| Source type | Use |
|---|---|
| Company/official interview guidance | Process and expectations |
| Frontend Interview Handbook | Public company-specific interview patterns |
| GreatFrontEnd | Curated known-question and preparation material |
| Candidate reports | Additional real-world signals |
| Practice repositories | Additional exercises, not proof of company questions |

## Important Rule for CodingTerminals

Do **not** label every practice problem as:

> "Asked in Adobe/Atlassian/PayPal/Stripe interview"

Instead use:

> "Publicly documented interview question/pattern"

or

> "Company-oriented practice based on public interview reports."

This keeps the interview repository accurate and avoids presenting practice questions as guaranteed current questions.

## Sources

- GreatFrontEnd — Adobe Front End Interview Guide
- Frontend Interview Handbook — Adobe Front End Interview Questions
- GreatFrontEnd — Atlassian Front End Interview Guide
- Frontend Interview Handbook — Atlassian Front End Interview Questions
- GreatFrontEnd — PayPal Front End Interview Guide
- GreatFrontEnd — PayPal Frontend Interview Questions: Prep Guide for 2026
- GreatFrontEnd — Stripe Front End Interview Guide

Last reviewed: September 2026.
