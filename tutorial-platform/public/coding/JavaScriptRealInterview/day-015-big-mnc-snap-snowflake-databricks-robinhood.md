# Day 015 — Big MNC Interview Patterns: Snap, Snowflake, Databricks & Robinhood

> **Purpose:** Company-oriented frontend interview preparation using current public company interview guides and reported interview patterns.
>
> Where a question is explicitly listed in a public company guide, it is labeled **Known / Documented**. Other exercises are **Company-Oriented** practice and should not be presented as confirmed interview questions.

---

## 1. Snap

Current public frontend interview material describes Snap interviews as a combination of JavaScript/UI coding, data structures, system design, and behavioral evaluation. Publicly listed frontend questions include debounce, EventEmitter, file explorer, accessibility, state management, networking, and graph-related topics. citeturn0search2

### Known / Documented Patterns

1. Implement debounce.
2. Implement an EventEmitter.
3. Build a file explorer.
4. Build an accessible file explorer.
5. Work with asynchronous JavaScript.
6. Solve recursion/tree problems.
7. Discuss graph/topological-sort problems.
8. Design frontend state management.
9. Explain browser networking.
10. Discuss frontend performance.

### Company-Oriented UI Practice

11. Build a Snapchat-style Stories carousel.
12. Build an ephemeral message component with automatic expiration.
13. Build a typing indicator.
14. Build an infinite Spotlight-style feed.
15. Build an image/video tile that pauses when it leaves the viewport.
16. Build a notification center.
17. Build a virtualized chat history.

### System Design

18. Design a real-time chat frontend.
19. Design an ephemeral-media client.
20. Design a Spotlight-style video feed.
21. Design Snap Map frontend state and viewport loading.
22. Design notifications for a large user base.

### Senior Follow-ups

- How would WebSocket reconnection work?
- How would you prevent duplicate messages?
- How would you virtualize chat history?
- How would you handle offline sends?
- How would you prioritize media preloading?
- How would you measure p90 frontend latency?
- How would you make real-time updates accessible?

**Focus:** real-time UI + networking + media performance + frontend system design.

---

## 2. Snowflake

Current public Snowflake frontend material emphasizes JavaScript, React, UI coding, large data interfaces, state management, async behavior, accessibility, and complex data-heavy products such as worksheets, result grids, dashboards, and AI-assisted SQL experiences. Publicly listed questions include data tables, debounce, and JSON.stringify-style JavaScript implementation. citeturn0search5turn0search6

### Known / Documented Patterns

23. Build a user data table with pagination.
24. Build a generalized data table with pagination, sorting, and filtering.
25. Implement debounce.
26. Implement JSON.stringify-style serialization.
27. Build interactive UI components.
28. Work with asynchronous state.
29. Solve recursion/data-structure problems.
30. Discuss accessibility in complex data interfaces.

### Company-Oriented Coding

31. Merge two sorted result sets.
32. Implement virtualized rendering for a large query-result table.
33. Build a column-resizing data grid.
34. Implement row selection for a large dataset.
35. Build a schema/tree explorer.
36. Implement search/filter for thousands of rows.
37. Build a query-status state machine.
38. Implement cancellation for a long-running query request.

### UI / Machine Coding

39. Build a SQL-result data table.
40. Build a tabbed SQL workspace.
41. Build a dashboard with resizable tiles.
42. Build a file/schema explorer.
43. Build an accessible command palette.
44. Build loading/error/empty states for long-running queries.

### System Design

45. Design a large-scale data table.
46. Design a browser-based SQL workspace.
47. Design a dashboard builder.
48. Design a schema explorer.
49. Design an AI-assisted SQL interface.

### Senior Follow-ups

- How do you render 100k rows?
- When should virtualization be used?
- How would you handle column virtualization?
- How do you cancel a long-running request?
- How do you preserve state across tabs?
- How do you handle slow queries?
- How would permissions affect the UI?
- How would you test a complex data grid?

**Focus:** data-heavy UI + virtualization + state + accessibility + performance.

---

## 3. Databricks

Current public Databricks frontend interview material describes a relatively technical process: algorithmic coding can appear even for frontend candidates, alongside UI coding and client-side system design. Publicly listed frontend questions include data tables, file explorers, tabs, state management, accessibility, async behavior, OOP, and networking. citeturn0search3

### Known / Documented Patterns

50. Build a user data table with pagination.
51. Build a generalized data table with sorting/filtering/pagination.
52. Build a file explorer.
53. Build a tabs component.
54. Discuss state management.
55. Solve asynchronous JavaScript problems.
56. Discuss OOP concepts.
57. Discuss frontend networking.
58. Solve algorithmic/data-structure problems.

### Company-Oriented Coding

59. Traverse a DAG representing workflow dependencies.
60. Detect a cycle in a workflow graph.
61. Build an autocomplete component for a SQL editor.
62. Implement cancellation for query execution.
63. Build a concurrency-limited request manager.
64. Merge paginated query results.
65. Implement incremental rendering for large result sets.
66. Build a query-history search utility.

### UI / Machine Coding

67. Build a notebook-style editor.
68. Build a SQL workspace with tabs.
69. Build a workflow/DAG visualization.
70. Build a large query-result table.
71. Build a schema browser.
72. Build an accessible command/search palette.

### System Design

73. Design a collaborative notebook frontend.
74. Design a SQL editor.
75. Design a workflow/DAG UI.
76. Design a large query-result viewer.
77. Design a frontend architecture for data dashboards.

### Senior Follow-ups

- How would you render a graph with thousands of nodes?
- How would you prevent query results from blocking the browser?
- How do you handle cancellation and stale responses?
- How would you synchronize collaborative edits?
- How do you cache schema metadata?
- How would you design permissions for data tools?

**Focus:** algorithms + data tooling + large datasets + client architecture.

---

## 4. Robinhood

Current public Robinhood frontend material describes practical product-engineering interviews around brokerage surfaces such as streaming prices, charts, watchlists, order tickets, options chains, transfers, and account flows. Publicly listed questions include data tables, debounce, EventEmitter, autocomplete, and UI coding. citeturn0search1

### Known / Documented Patterns

78. Build a user data table with pagination.
79. Build a generalized data table with pagination, sorting, and filtering.
80. Implement debounce.
81. Implement an EventEmitter.
82. Build autocomplete.
83. Work with async behavior and event handling.
84. Implement or reason about an LRU-style cache.
85. Transform/parse a quote or trade feed.
86. Build a sorting visualization with vanilla JavaScript.

### Company-Oriented Coding

87. Merge real-time price updates into a watchlist.
88. Discard stale market-data updates.
89. Implement a concurrency-limited API queue.
90. Implement reconnect/resync logic for a live data stream.
91. Format financial values without unsafe floating-point assumptions.
92. Implement optimistic order-state updates with rollback.
93. Build a polling utility with cancellation.
94. Memoize expensive portfolio calculations.

### UI / Machine Coding

95. Build a live watchlist.
96. Build a stock/crypto price table.
97. Build a symbol-search autocomplete.
98. Build an order-ticket form.
99. Build a transaction-history table.
100. Build a price chart with multiple time ranges.
101. Build an accessible confirmation dialog.
102. Build loading, degraded, and reconnecting states.

### System Design

103. Design a live price-chart frontend.
104. Design a real-time watchlist.
105. Design an options-chain UI.
106. Design an order-entry frontend.
107. Design portfolio/transaction history.
108. Design client-side handling for real-time market streams.

### Senior Follow-ups

- How do you handle out-of-order price updates?
- How do you prevent stale data from replacing fresh data?
- How do you handle WebSocket reconnect and resync?
- How do you avoid rendering every market-data event?
- How do you guarantee correct monetary formatting?
- What happens if an order succeeds but the browser loses connection?
- How do you prevent duplicate submissions?
- How would you test correctness under high-frequency updates?

**Focus:** real-time data + correctness + financial UI + reliability.

---

# Cross-Company Pattern

These four companies create a strong advanced frontend track.

### Beginner

- JavaScript fundamentals
- Arrays/objects
- Promises
- Debounce
- DOM/events
- Basic components

### Intermediate

- EventEmitter
- Autocomplete
- Data tables
- Pagination
- File explorer
- Tabs
- Async state
- API integration

### Advanced

- Virtualization
- Large datasets
- WebSocket/reconnect
- Concurrency
- Cancellation
- Race-condition prevention
- Graph/DAG rendering
- Real-time updates

### Senior / 7–10 Years

Be prepared to explain:

1. Architecture decisions
2. State ownership
3. Data consistency
4. Rendering strategy
5. Performance
6. Accessibility
7. Security
8. Failure recovery
9. Observability
10. Testing strategy

---

# Interview Simulation Set

## Simulation 1 — Live Trading UI

> A market-data service sends hundreds of updates per second for thousands of symbols.

Discuss:

- batching
- render scheduling
- stale-event detection
- WebSocket reconnect
- memory
- accessibility

## Simulation 2 — SQL Workspace

> Users run long-running queries and receive large result sets.

Discuss:

- cancellation
- streaming/pagination
- virtualization
- query state
- permissions
- error recovery

## Simulation 3 — Collaborative Notebook

> Multiple users can edit a notebook simultaneously.

Discuss:

- document model
- synchronization
- conflict handling
- optimistic updates
- presence
- reconnect

## Simulation 4 — Social Chat

> Users can send messages while temporarily offline.

Discuss:

- local queue
- message IDs
- retry
- deduplication
- ordering
- optimistic UI

---

# CodingTerminals Source Classification

### Known / Documented

Explicitly listed in a current public company interview guide or clearly attributed candidate report.

### Company-Oriented

Derived from the company's public product/interview themes and useful for realistic preparation.

### General Practice

Useful interview preparation with no company-specific evidence.

Do **not** convert company-oriented exercises into claims such as:

> "Asked in Snowflake interview"

unless the source explicitly supports that statement.

---

# Sources

- GreatFrontEnd — Snap Front End Interview Guide
- GreatFrontEnd — Snowflake Front End Interview Guide
- GreatFrontEnd — Databricks Front End Interview Guide
- GreatFrontEnd — Robinhood Front End Interview Guide
- GreatFrontEnd — Company Interview Guide Index

The current public company index includes dedicated guides for Snap, Snowflake, Databricks, and Robinhood. citeturn0search0

Last reviewed: September 2026.
