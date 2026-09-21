# Day 014 — Big MNC Interview Patterns: OpenAI, Microsoft, Bloomberg & Walmart

> **Purpose:** Company-oriented frontend interview preparation based on publicly available interview guidance, interview-preparation resources, and reported patterns.
>
> **Important:** OpenAI and Microsoft have current public frontend interview guides with documented question banks. Bloomberg and Walmart do not appear in the current GreatFrontEnd company-guide index, so the Bloomberg/Walmart sections below are **company-oriented practice**, not claims that these exact questions were asked. citeturn0search0turn0search2

---

## 1. OpenAI

Current public frontend interview material describes practical product-engineering interviews involving coding, UI implementation, system design, project discussion, and communication. Publicly listed examples include contact forms, data merging, data selection, and flight booking; reported preparation areas include streaming interfaces, cancellation, concurrent requests, testing, performance, and full-stack API boundaries. citeturn0search1

### JavaScript / Coding

1. Build a contact form that submits feedback and contact information to an API.
2. Merge rows belonging to the same user.
3. Filter rows according to a set of requirements.
4. Implement bounded asynchronous concurrency.
5. Implement cancellation for an in-flight request.
6. Implement debounce for search.
7. Explain Promise execution order.
8. Build a small observable/state-management utility.
9. Implement safe retry behavior for an API request.
10. Explain how streaming data should be consumed by the browser.

### UI / Machine Coding

11. Build a ChatGPT-style streaming chat interface.
12. Render streamed text incrementally.
13. Add Stop/Cancel behavior while a response is streaming.
14. Build a model-selection control.
15. Build a file/artifact panel.
16. Build a flight-booking form with validation and loading/error states.
17. Build an accessible rich-text editor.
18. Handle concurrent conversations without mixing response state.

### System Design

19. Design a streaming AI chat frontend.
20. Design a coding-agent workspace.
21. Design a file/artifact editing surface.
22. Design a model playground with configuration controls.
23. Design an AI response history/search experience.
24. Design a frontend architecture for tool-using AI agents.

### Senior Follow-ups

- How does the client process tokens incrementally?
- What happens when the user cancels a request?
- How do you prevent an old response from updating a new conversation?
- How would you reconnect after a network interruption?
- Where should conversation state live?
- How would you handle long conversations?
- How would you measure streaming latency?
- How do you test nondeterministic AI responses?

**Focus:** streaming + async state + cancellation + product UI + system design.

---

## 2. Microsoft

Microsoft's public technical guidance emphasizes problem solving, design, coding, testing, and customer-aware engineering. Current frontend preparation material covers products such as Teams, Outlook, Bing, Copilot, and Microsoft 365, with strong emphasis on accessibility, performance, API contracts, security, and testing. citeturn0search2

### JavaScript / Coding

25. Implement a throttle utility.
26. Implement a retry utility with backoff.
27. Implement a JavaScript SDK method with throttling and retries.
28. Explain event bubbling, capturing, and delegation.
29. Implement pagination for API data.
30. Implement a concurrency-limited async queue.
31. Explain Promise, async/await, and event-loop behavior.
32. Implement memoization for an expensive calculation.
33. Implement a data transformation utility with TypeScript types.

### UI / Machine Coding

34. Build a phone keypad interface.
35. Build a todo/form application.
36. Build an address-book interface with pagination and API calls.
37. Build a Teams-style chat interface.
38. Build a responsive data table.
39. Build an accessible dropdown/menu.
40. Build a notification center.
41. Build an email compose interface with autosave.

### System Design

42. Design a Teams chat frontend.
43. Design an Outlook-style email client.
44. Design a calendar and notification system.
45. Design a Bing/Copilot search experience.
46. Design a Microsoft 365 design-system component platform.
47. Design an Office-style collaborative document editor.

### Senior Follow-ups

- How do you keep the main thread responsive?
- How would you virtualize a large Teams message list?
- How do you support keyboard and screen-reader navigation?
- How would you handle offline/reconnect behavior?
- How do API contracts evolve without breaking clients?
- How would you monitor frontend failures?
- How do enterprise permissions affect UI state?

**Focus:** enterprise UI + accessibility + performance + API design + testing.

---

## 3. Bloomberg — Company-Oriented Practice

Bloomberg is included here as a **company-oriented preparation track**, rather than a list of verified Bloomberg-specific questions. The exercises reflect frontend patterns relevant to data-heavy financial applications: JavaScript/TypeScript, high-frequency data updates, tables, charts, search, and performance.

### JavaScript / Coding

48. Implement a debounced financial-symbol search.
49. Implement throttling for rapidly changing market data.
50. Build a concurrency-limited API request queue.
51. Implement a time-series aggregation function.
52. Merge updates from multiple data streams by instrument ID.
53. Detect and discard stale updates.
54. Implement a memoized calculation for derived financial metrics.
55. Format numbers, percentages, and currencies without losing precision.
56. Design a small observable store for live market data.

### UI / Machine Coding

57. Build a stock/market data table with sorting and filtering.
58. Build a ticker/search autocomplete.
59. Build a real-time price widget.
60. Build a dashboard with multiple independent data panels.
61. Build a chart container with loading/error/empty states.
62. Build a paginated transaction/history table.
63. Build a keyboard-accessible command/search palette.

### System Design

64. Design a real-time financial dashboard.
65. Design a high-frequency market-data UI.
66. Design a searchable financial instrument platform.
67. Design a customizable trader dashboard.
68. Design client-side caching for frequently requested market data.

### Senior Follow-ups

- What happens when updates arrive out of order?
- How do you avoid rendering every incoming event?
- How do you prevent stale data from overwriting fresh data?
- Which calculations should happen in a Web Worker?
- How would you keep charts responsive?
- How would you test correctness under high update frequency?

**Classification:** Company-oriented practice.

---

## 4. Walmart — Company-Oriented Practice

Walmart is included as a **company-oriented preparation track**, not as a claim that these exact questions were asked. The exercises focus on large-scale commerce: search, product listings, carts, checkout, inventory, accessibility, performance, and resilient API-driven UI.

### JavaScript / Coding

69. Implement debounce for product search.
70. Implement pagination/infinite scrolling for product data.
71. Build a concurrency-limited product-request queue.
72. Merge inventory updates into an existing product collection.
73. Deduplicate product records by ID.
74. Implement optimistic state updates with rollback.
75. Implement retry behavior for idempotent API requests.
76. Design a cache with expiration for product data.

### UI / Machine Coding

77. Build a product-search interface.
78. Build a product listing with filtering and sorting.
79. Build an accessible shopping cart.
80. Build a quantity selector with optimistic updates.
81. Build a checkout form with validation.
82. Build an order-history table.
83. Build a store/product autocomplete.
84. Build loading, empty, error, and retry states for a commerce page.

### System Design

85. Design a large-scale e-commerce storefront.
86. Design product search and filtering.
87. Design a shopping-cart frontend.
88. Design a checkout frontend.
89. Design an inventory-aware product page.
90. Design a personalized product recommendation surface.

### Senior Follow-ups

- How do you handle millions of products?
- How would you optimize an image-heavy product page?
- What happens when inventory changes during checkout?
- How do you prevent duplicate cart/checkout requests?
- How would you handle partial API failures?
- What should be cached?
- How would you make the storefront accessible?
- How would you measure Core Web Vitals?

**Classification:** Company-oriented practice.

---

# Cross-Company Pattern

These four companies highlight an important evolution in modern frontend interviews.

### Beginner

- JavaScript fundamentals
- Promises
- Arrays/objects
- DOM/events
- Forms
- Basic UI components

### Intermediate

- Debounce/throttle
- API integration
- Pagination
- Autocomplete
- Data tables
- State management
- Error/loading states

### Advanced

- Streaming
- Cancellation
- Concurrency
- Retry/backoff
- Optimistic updates
- Virtualization
- Real-time data
- Performance

### Senior / 7–10 Years

Be ready to discuss:

1. Architecture
2. State ownership
3. API boundaries
4. Performance
5. Accessibility
6. Security
7. Reliability
8. Observability
9. Testing
10. Scalability

---

# Interview Simulation Set

## Simulation 1 — AI Chat

> Build a streaming chat UI. The server sends partial response chunks. The user can cancel the response and immediately start another request.

Discuss:

- streaming
- cancellation
- race conditions
- state ownership
- error recovery
- testing

## Simulation 2 — Enterprise Chat

> Design a Teams-style chat interface that can contain thousands of messages.

Discuss:

- virtualization
- pagination
- scroll anchoring
- unread state
- accessibility
- reconnection

## Simulation 3 — Financial Dashboard

> Market data can update hundreds of times per second.

Discuss:

- batching
- throttling
- Web Workers
- rendering strategy
- stale data
- memory

## Simulation 4 — E-commerce

> A product's inventory can change while the customer is checking out.

Discuss:

- optimistic UI
- server validation
- rollback
- idempotency
- retries
- error states

---

# Source Classification Rule

CodingTerminals should maintain these labels:

### Known / Documented

The question is explicitly listed in a public company interview guide or candidate report.

### Company-Oriented

The problem is derived from the company's product domain and publicly described frontend interview themes.

### General Practice

The problem is useful for preparation but has no company-specific evidence.

**Never turn a company-oriented exercise into a claimed interview question.**

For example:

> ❌ "Walmart asks this question."

Use:

> ✅ "Walmart-oriented frontend practice."

This distinction is especially important for companies without a dedicated current public frontend question guide.

---

# Sources

- GreatFrontEnd — OpenAI Front End Interview Guide
- GreatFrontEnd — Microsoft Front End Interview Guide
- GreatFrontEnd — Company Interview Guide Index
- GreatFrontEnd — Front End Interview Playbook
- GreatFrontEnd — GFE 75 / curated frontend interview questions

The current company index lists dedicated public guides for OpenAI and Microsoft but does **not** list Bloomberg or Walmart; therefore those two sections are intentionally marked as company-oriented practice. citeturn0search0turn0search3

Last reviewed: September 2026.
