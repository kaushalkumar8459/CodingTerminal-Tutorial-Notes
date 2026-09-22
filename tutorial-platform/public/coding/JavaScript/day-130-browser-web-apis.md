# Day 130 — Browser Web APIs

## Fetch API

1. Make a GET request with `fetch()`.
2. Handle non-2xx HTTP responses explicitly.
3. Parse JSON safely.
4. Send headers and a request body.
5. Handle network failures separately from HTTP failures.

## AbortController

6. Cancel an in-flight fetch request.
7. Connect an AbortSignal to a timeout or user action.
8. Explain why cancellation is important for search/autocomplete requests.

## IntersectionObserver

9. Detect when an element enters the viewport.
10. Implement lazy loading with IntersectionObserver.
11. Implement infinite-scroll triggering with a sentinel element.
12. Disconnect the observer during cleanup.

## ResizeObserver

13. Observe element size changes.
14. Build a responsive component that reacts to its container size.
15. Avoid feedback loops caused by observer-triggered layout changes.

## MutationObserver

16. Observe DOM additions/removals/attribute changes.
17. Batch DOM-related reactions appropriately.
18. Disconnect observers when their lifecycle ends.

## Interview Questions

19. Fetch failure vs HTTP error: what is the difference?
20. Why use AbortController?
21. IntersectionObserver vs scroll event?
22. ResizeObserver vs window resize?
23. When is MutationObserver appropriate?
24. How do browser observers affect performance?

## Practice Checklist

Build an autocomplete flow that cancels stale requests, debounces user input, and uses an observer for a lazy-loaded result section.
