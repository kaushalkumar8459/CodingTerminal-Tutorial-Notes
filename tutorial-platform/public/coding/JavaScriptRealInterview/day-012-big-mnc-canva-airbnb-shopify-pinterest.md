# Day 012 — Big MNC Interview Patterns: Canva, Airbnb, Shopify & Pinterest

> **Purpose:** Company-oriented frontend interview preparation based on publicly documented interview guides and reported patterns.
>
> These are **documented interview signals and practice patterns**, not guarantees of future questions. Confirm the current loop with the recruiter.

---

## 1. Canva

Canva's current frontend process emphasizes practical product engineering, JavaScript/TypeScript fluency, UI work, frontend system design, technical communication, and AI-assisted coding. Publicly documented questions include array-method polyfills, debounce, promise-based JavaScript, an in-memory comment service, and editor-style UI work. citeturn0search0turn0search5

### JavaScript / Coding

1. Implement ~Array.prototype.filter~.
2. Implement ~Array.prototype.map~.
3. Implement ~Array.prototype.reduce~.
4. Implement debounce for expensive UI events.
5. Build an in-memory comment service with add/get/update/delete operations.
6. Explain Promise execution and common async JavaScript behavior.
7. Design an undo/redo manager for editor actions.
8. Deep-clone nested editor/document state safely.

### UI / Machine Coding

9. Build a crossword-style interactive game.
10. Build a modular drag-and-drop editor.
11. Handle canvas interactions such as pointer movement and selection.
12. Build an accessible editor toolbar.
13. Design a media-upload component with progress, retry, and cancellation.
14. Build a design-editor state model that supports selection and layer ordering.

### System Design

15. Design a collaborative design editor.
16. Design real-time cursor/presence updates.
17. Design a large media-upload pipeline.
18. Design an infinite/template gallery with image-heavy content.
19. Design undo/redo and document history.

### Senior Follow-ups

- How would you keep canvas rendering responsive?
- How would you handle thousands of editor objects?
- What happens when the connection drops during collaboration?
- How would you reconcile concurrent updates?
- How would you optimize image/media loading?
- How would you test complex editor state?

**Focus:** editor architecture + JavaScript/TypeScript + performance + collaboration + UI engineering.

---

## 2. Airbnb

Airbnb frontend interviews are strongly product-oriented. Public material includes JavaScript utilities, autocomplete, form interactions, state management, accessibility, performance, networking, and marketplace-style system design. A documented JavaScript example is a Backbone.Model-style observable data class; UI examples include autocomplete and interactive widgets. citeturn0search1turn0search3

### JavaScript / Coding

20. Implement a Backbone.Model-style class that stores attributes and notifies listeners when values change.
21. Extend the model with a global change listener.
22. Implement ~unset~ while preserving listeners.
23. Implement debounce.
24. Implement a cancelable/flushable debounce.
25. Implement a simple Promise.
26. Explain closures and callback behavior.
27. Design a small observable state store.

### UI / Machine Coding

28. Build an autocomplete component backed by an API.
29. Support keyboard navigation in autocomplete results.
30. Build a star-rating widget inside a form.
31. Build an image carousel.
32. Build a travel-search form with loading/error/empty states.
33. Build a listing-card component with responsive image handling.
34. Implement filters whose state can be restored from the URL.

### System Design

35. Design a travel-booking frontend.
36. Design location autocomplete.
37. Design host-guest messaging.
38. Design a listing/search page with filters and map synchronization.
39. Design a checkout/reservation flow.

### Senior Follow-ups

- How do you keep search results responsive during rapid typing?
- How do you avoid stale API responses replacing newer results?
- How would you handle internationalization?
- How would you optimize image-heavy listing pages?
- What happens if reservation state changes while the user is checking out?
- How would accessibility affect the design?

**Focus:** product UI + async state + autocomplete/search + marketplace flows + accessibility.

---

## 3. Shopify

Shopify frontend interviews emphasize practical product building and iterative pair programming. Publicly documented questions include data tables, debounce, image carousels, and modal dialogs. Senior frontend preparation also includes commerce-oriented system design such as checkout, inventory, storefront search, and merchant admin. citeturn0search2

### JavaScript / Coding

40. Implement debounce.
41. Implement async request handling with loading and error states.
42. Design a small state-management abstraction.
43. Explain event propagation and event delegation.
44. Explain browser storage choices and their trade-offs.
45. Build a reusable validation utility.

### UI / Machine Coding

46. Build a data table with pagination.
47. Build an image carousel.
48. Build a reusable modal dialog.
49. Build a product-search interface.
50. Build a shopping cart with quantity updates.
51. Build a checkout form with validation.
52. Build a merchant dashboard table with sorting/filtering.
53. Add accessible keyboard interactions to a reusable component.

### System Design

54. Design an e-commerce checkout frontend.
55. Design a merchant-admin dashboard.
56. Design storefront product search.
57. Design inventory-management UI.
58. Design a frontend architecture for checkout extensions.

### Senior Follow-ups

- How would you handle 100k products?
- How would you avoid unnecessary table rendering?
- How would you support optimistic cart updates?
- What happens when checkout APIs fail?
- How would you make components reusable across merchant applications?
- How would you handle accessibility across a design system?

**Focus:** product engineering + UI components + commerce + accessibility + scalable frontend architecture.

---

## 4. Pinterest

Pinterest frontend interviews combine algorithmic coding, React/frontend coding, frontend system design, and behavioral discussion. Public material includes reachability/graph-style problems, content moderation scenarios, React UI, image-heavy interfaces, infinite scrolling, virtualization, and performance. citeturn0search4turn0search6

### JavaScript / DSA

59. Solve a Jump Game-style reachability problem.
60. Given an array and starting index, determine whether a zero value can be reached.
61. Track visited indexes to avoid recursive cycles.
62. Convert the recursive solution into an iterative queue-based solution.
63. Process a stream of comments and detect inappropriate language.
64. Implement array transformation/filtering logic.
65. Explain when BFS is preferable to DFS for a UI-related data problem.

### UI / Machine Coding

66. Build a Pinterest-style masonry grid.
67. Build an infinite-scroll feed.
68. Implement virtualization for a large image list.
69. Build a Pin/card component with responsive images.
70. Build a search/filter experience for visual content.
71. Build a save/bookmark interaction with optimistic UI.
72. Handle loading, empty, error, and retry states.

### System Design

73. Design a visual discovery feed.
74. Design an image-heavy masonry grid.
75. Design infinite scrolling for thousands of Pins.
76. Design image loading and responsive image delivery.
77. Design a personalized feed frontend.
78. Design client-side caching for frequently viewed content.

### Senior Follow-ups

- How do you prevent the browser from holding thousands of images?
- When should you use virtualization?
- How would you prioritize image loading?
- How would you preserve scroll position?
- How would you handle duplicate feed requests?
- How would you measure frontend performance?
- How would you make the feed accessible?

**Focus:** React/UI + algorithms + image performance + infinite scroll + frontend system design.

---

# Cross-Company Pattern

These four companies add another important layer to the interview roadmap.

### Beginner

- Array methods
- Promise basics
- Debounce
- DOM/events
- Forms
- Basic UI components

### Intermediate

- Autocomplete
- Data tables
- Image carousel
- Modal
- Observable state
- Pagination
- Infinite scrolling
- API error handling

### Advanced

- Virtualization
- Large image feeds
- Editor state
- Undo/redo
- Optimistic UI
- Race-condition handling
- Cancellation
- Performance optimization

### Senior / 7–10 Years

Prepare to explain:

1. Architecture decisions
2. State ownership
3. API boundaries
4. Performance bottlenecks
5. Accessibility
6. Failure recovery
7. Caching
8. Observability
9. Testing strategy
10. Scalability and maintainability

---

# Important CodingTerminals Rule

Use three labels consistently:

### Known / Documented
The question or pattern is explicitly listed in a public company interview guide or candidate report.

### Company-Oriented
The problem is designed from the company's publicly documented product/interview themes.

### General Practice
The problem is useful preparation but is **not evidence that the company asked it**.

Never convert a general practice problem into:

> "Asked in Pinterest interview"

unless the source actually supports that statement.

---

# Sources

- GreatFrontEnd — Canva Front End Interview Guide
- Frontend Interview Handbook — Canva Front End Interview Questions
- GreatFrontEnd — Airbnb Front End Interview Guide
- Frontend Interview Handbook — Airbnb Front End Interview Questions
- GreatFrontEnd — Shopify Front End Interview Guide
- Frontend Interview Handbook / GreatFrontEnd — Pinterest Front End Interview Questions
- GreatFrontEnd company interview guide index

Last reviewed: September 2026.
