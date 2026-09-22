# Day 013 — Big MNC Interview Patterns: Discord, Coinbase, Figma & Lyft

> **Purpose:** Company-oriented frontend interview preparation based on publicly documented interview guides and reported interview patterns.
>
> These are documented interview signals and practice patterns, **not guarantees of future questions**. Verify the current interview loop with the recruiter.

---

## 1. Discord

Discord frontend interviews are useful preparation for real-time, communication-heavy applications. Public frontend interview material emphasizes JavaScript, UI coding, asynchronous behavior, performance, and frontend architecture.

### JavaScript / Coding

1. Implement debounce and explain why it is useful for search/input events.
2. Implement throttle for high-frequency events such as scrolling.
3. Build an EventEmitter with subscribe, unsubscribe, and emit behavior.
4. Implement a concurrency-limited Promise queue.
5. Explain Promise execution order with mixed synchronous and asynchronous operations.
6. Build a retry utility with configurable attempts.
7. Implement cancellation for an asynchronous operation.
8. Explain closures and how they can create unexpected memory retention.

### UI / Machine Coding

9. Build a chat message list.
10. Build a message composer with keyboard shortcuts.
11. Implement infinite scrolling for message history.
12. Build a user/emoji autocomplete component.
13. Build a typing-indicator component.
14. Implement unread-message tracking.
15. Build a notification/toast system.

### System Design

16. Design a real-time chat frontend.
17. Design a channel/message sidebar.
18. Design presence and typing indicators.
19. Design message history loading and pagination.
20. Design notifications for a large multi-channel application.

### Senior Follow-ups

- How do you preserve scroll position while loading older messages?
- How do you prevent duplicate messages?
- What happens when the WebSocket disconnects?
- How do you reconnect without losing events?
- How do you render thousands of messages efficiently?
- How would you handle accessibility for real-time updates?

**Focus:** real-time UI + async JavaScript + performance + state synchronization.

---

## 2. Coinbase

Coinbase frontend interviews are particularly useful for applications involving financial data, forms, real-time updates, security, and correctness. Public interview preparation emphasizes JavaScript/TypeScript, React/UI coding, API integration, and frontend system design.

### JavaScript / Coding

21. Implement a currency-conversion utility.
22. Format monetary values without introducing floating-point surprises.
23. Build a polling utility with cancellation.
24. Implement debounce for market/search input.
25. Implement a Promise concurrency limiter.
26. Design an immutable state update helper.
27. Explain event-loop behavior in a price-update application.
28. Handle stale asynchronous responses safely.

### UI / Machine Coding

29. Build a cryptocurrency price table.
30. Build a buy/sell form with validation.
31. Build a currency selector with search.
32. Build a transaction-history table with pagination.
33. Build a real-time price widget.
34. Add loading, error, retry, and offline states.
35. Build an accessible confirmation dialog for a transaction.

### System Design

36. Design a trading/portfolio dashboard.
37. Design a real-time market-price frontend.
38. Design transaction-history browsing.
39. Design a multi-currency wallet UI.
40. Design a secure authentication/session experience.

### Senior Follow-ups

- How do you prevent stale prices from overwriting newer prices?
- How do you handle WebSocket reconnection?
- How do you format financial values correctly?
- What data should never be trusted from the client?
- How do you prevent duplicate transaction submissions?
- How do you handle browser refresh during an in-progress operation?
- How would you test financial calculations?

**Focus:** correctness + real-time data + financial UI + security + reliability.

---

## 3. Figma

Figma-style frontend interviews are valuable for preparing editor-heavy applications involving canvas rendering, collaboration, complex state, and performance. Public interview material includes practical JavaScript/UI exercises and frontend system-design themes.

### JavaScript / Coding

41. Implement a tree structure for nested design layers.
42. Traverse a deeply nested layer tree.
43. Implement undo/redo for editor commands.
44. Implement a command pattern for reversible operations.
45. Build an observable state store.
46. Implement memoization for expensive calculations.
47. Design a selection manager for multiple objects.
48. Implement throttled pointer/mouse movement handling.

### UI / Machine Coding

49. Build a draggable/resizable panel.
50. Build a nested layer/tree explorer.
51. Build a color-picker component.
52. Build a toolbar with keyboard shortcuts.
53. Build a modal/dialog system.
54. Build a canvas-selection interaction.
55. Implement drag-and-drop between nested layers.
56. Render a large collection of objects without blocking the main thread.

### System Design

57. Design a collaborative design editor.
58. Design real-time cursor/presence updates.
59. Design document/layer state management.
60. Design undo/redo and version history.
61. Design asset loading for a large design document.
62. Design a plugin architecture for an editor.

### Senior Follow-ups

- How would you render thousands of objects?
- When would you use Canvas, SVG, or DOM?
- How would you avoid unnecessary re-renders?
- How would you synchronize collaborative edits?
- How would you resolve conflicting changes?
- How would you keep undo/redo memory-efficient?
- How would you isolate third-party plugins?

**Focus:** complex state + rendering + collaboration + editor architecture.

---

## 4. Lyft

Lyft frontend interview preparation covers practical JavaScript, UI coding, maps/location-oriented experiences, performance, and frontend system design. Public interview material includes common frontend coding patterns and application-oriented UI problems.

### JavaScript / Coding

63. Implement debounce for map/search input.
64. Implement throttle for map movement events.
65. Build a Promise-based request queue.
66. Implement retry with exponential backoff.
67. Find overlapping time intervals.
68. Implement a priority queue for scheduled operations.
69. Explain closures, prototypes, and event-loop behavior.
70. Design an immutable update helper.

### UI / Machine Coding

71. Build an autocomplete pickup/drop-off field.
72. Build a ride-status progress component.
73. Build a trip-history table.
74. Build a filterable list of rides.
75. Build a modal for ride confirmation.
76. Build a location/search component with keyboard navigation.
77. Build a notification system for ride-state changes.

### System Design

78. Design a ride-booking frontend.
79. Design a map + ride-list interface.
80. Design real-time driver-location updates.
81. Design ride-status updates.
82. Design trip history and filtering.
83. Design a frontend architecture for multiple location-aware applications.

### Senior Follow-ups

- How do you avoid rendering every map/location update?
- How do you handle poor network connectivity?
- What happens when driver location updates arrive out of order?
- How do you prevent duplicate ride requests?
- How do you preserve state when the user navigates away and returns?
- How would you test location-dependent UI?
- How would you handle accessibility for map-heavy interfaces?

**Focus:** location-aware UI + real-time updates + async flows + performance.

---

# Cross-Company Pattern

These companies introduce four important frontend interview themes.

### Beginner

- JavaScript fundamentals
- Promise basics
- Array/object operations
- Debounce
- Throttle
- DOM events
- Forms

### Intermediate

- EventEmitter
- Promise queues
- Retry logic
- Autocomplete
- Pagination
- Infinite scrolling
- Real-time UI
- Notification systems

### Advanced

- Concurrency limits
- Cancellation
- Race-condition prevention
- WebSocket reconnect
- Virtualization
- Large-data rendering
- Complex state management

### Senior / 7–10 Years

Be prepared to explain:

1. State ownership
2. Data consistency
3. Real-time synchronization
4. Failure recovery
5. Performance budgets
6. Accessibility
7. Security boundaries
8. Observability
9. Testing strategy
10. Scalability

---

# Company-Oriented Scenario Practice

Use these as interview simulations rather than memorizing answers.

### Scenario 1 — Real-Time Chat

> You receive 500 messages per second. Design the frontend so the browser remains responsive.

Discuss:

- batching
- virtualization
- WebSocket buffering
- scroll anchoring
- unread state
- memory management

### Scenario 2 — Financial Dashboard

> Prices update every few milliseconds. The UI must remain accurate without excessive rendering.

Discuss:

- throttling
- batching
- stale-response protection
- numeric formatting
- WebSocket lifecycle
- visibility-based updates

### Scenario 3 — Collaborative Editor

> Multiple users edit the same document simultaneously.

Discuss:

- local state
- server synchronization
- conflict handling
- optimistic updates
- undo/redo
- reconnect behavior

### Scenario 4 — Location Application

> Driver location changes continuously while the user watches the trip.

Discuss:

- event frequency
- rendering strategy
- map performance
- out-of-order events
- network failures
- accessibility alternatives

---

# Important CodingTerminals Rule

Keep the source classification explicit:

### Known / Documented

The question or pattern is explicitly listed in a public interview guide or candidate report.

### Company-Oriented

The problem is derived from the company's publicly documented product/interview themes.

### General Practice

The problem is useful preparation but is not evidence that the company asked it.

Do **not** write:

> "Asked in Coinbase interview"

unless the source explicitly supports that claim.

---

# Sources

Use current public company interview guides, candidate reports, and reputable frontend interview resources as the source hierarchy.

Recommended source hierarchy:

1. Company interview guidance
2. GreatFrontEnd / Frontend Interview Handbook
3. Candidate interview reports
4. GitHub interview repositories
5. LeetCode Discuss
6. General practice repositories

Last reviewed: September 2026.
