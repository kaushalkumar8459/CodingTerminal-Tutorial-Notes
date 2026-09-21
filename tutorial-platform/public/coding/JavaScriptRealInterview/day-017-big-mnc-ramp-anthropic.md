# Day 017 — Big MNC / AI Company Patterns: Ramp & Anthropic

## 1. Ramp

Ramp's public frontend guide describes practical, speed-focused React/TypeScript work: data tables, filters, pagination, approval workflows, autocomplete, async state, debugging, and frontend system design. citeturn1search0

### Known / Documented Patterns

1. Implement a chainable fetch-based API client.
2. Build a paginated data table.
3. Build a generalized table with pagination, sorting, and filtering.
4. Implement debounce.
5. Work with API-backed state.
6. Debug stale-closure and loading-state issues.
7. Handle filter and pagination edge cases.
8. Build practical React UI under time constraints.

### Company-Oriented Practice

9. Build a transaction dashboard.
10. Build a multi-select transaction filter.
11. Build an employee/vendor autocomplete.
12. Build an approval-policy editor.
13. Build a bill-pay multi-step workflow.
14. Build inline editing with optimistic updates.
15. Build a bug-fix exercise over an existing React application.

### System Design

16. Design a transaction dashboard with server-side filtering.
17. Design an approval-routing UI.
18. Design a bill-pay workflow with document upload.
19. Design accounting/integration status UI.

### Senior Follow-ups

- How do you normalize approval state?
- How do you handle cursor pagination?
- How do you avoid stale closures?
- How do you make optimistic updates reversible?
- How do you design reusable financial UI primitives?
- How would you monitor production failures?

**Focus:** practical React + async state + fintech workflows + speed.

---

## 2. Anthropic

Anthropic's current frontend guide emphasizes practical product engineering around Claude-like experiences: streaming chat, long context, file uploads, tool permissions, async control, text processing, and AI-product system design. Publicly listed questions include localStorage with expiry, Map Async, Map Async Limit, and Map With History. citeturn1search2

### Known / Documented Patterns

20. Implement localStorage with expiry.
21. Implement async map.
22. Implement async map with a concurrency limit.
23. Implement a timestamp-based history lookup.
24. Handle async retries/cancellation.
25. Build practical UI with JavaScript/TypeScript.
26. Discuss browser storage/networking.
27. Discuss accessibility and performance.

### Company-Oriented Practice

28. Build a streaming AI chat interface.
29. Implement Stop/Cancel for generation.
30. Build conversation history with long-context handling.
31. Build file upload and processing states.
32. Build a tool-permission confirmation dialog.
33. Build an artifact preview panel.
34. Build a source/citation display.
35. Build a model/tool configuration panel.

### System Design

36. Design a Claude-style streaming chat.
37. Design an artifact workspace.
38. Design a tool-using AI agent UI.
39. Design conversation search/history.
40. Design frontend handling for model latency and partial failure.

### Senior Follow-ups

- How do you process streamed tokens?
- How do you cancel generation?
- How do you prevent stale responses?
- How do you handle tool permission state?
- How do you separate trusted UI from model-generated content?
- How would you design retry and reconnect?
- How would you test nondeterministic AI output?
- What belongs in the browser versus backend?

**Focus:** async control + streaming + AI product UI + safety boundaries.

---

## AI Frontend Interview Simulation

> Build a chat UI where the server streams partial responses, the user can cancel generation, attach files, and approve tool actions.

Cover:

- streaming transport
- cancellation
- race conditions
- upload state
- permission state
- retries
- error recovery
- accessibility
- observability
- testing

### Source Classification

**Known / Documented:** explicitly listed by a current public guide.

**Company-Oriented:** derived from the company's product and engineering themes.

Never present a company-oriented AI exercise as a confirmed interview question.

Last reviewed: September 2026.
