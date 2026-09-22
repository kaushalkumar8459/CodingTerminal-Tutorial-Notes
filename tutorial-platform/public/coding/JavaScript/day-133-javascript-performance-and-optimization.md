# Day 133 — JavaScript Performance & Optimization

## Function-Level Optimization

1. Implement debounce.
2. Implement throttle.
3. Implement memoization.
4. Avoid unnecessary repeated computation.
5. Measure before optimizing.

## Loading Performance

6. Explain lazy loading.
7. Explain code splitting.
8. Use dynamic imports for optional features.
9. Reduce unnecessary JavaScript shipped initially.

## Runtime Performance

10. Avoid blocking the main thread.
11. Batch expensive work.
12. Use Web Workers for suitable CPU-heavy tasks.
13. Avoid unnecessary DOM reads/writes that trigger layout work.
14. Use requestAnimationFrame for animation-related updates.

## Memory Performance

15. Identify retained references.
16. Bound caches.
17. Clean up listeners, timers, observers, and workers.

## Rendering Performance

18. Explain layout, paint, and compositing.
19. Avoid layout thrashing.
20. Use virtualization for very large lists.

## Measuring Performance

21. Use browser Performance tools to locate long tasks.
22. Interpret basic Core Web Vitals concepts.
23. Compare before/after measurements rather than guessing.

## Interview Questions

24. Debounce vs throttle?
25. What causes layout thrashing?
26. How can a large JavaScript bundle hurt performance?
27. When should you use a Worker?
28. How do you investigate a slow page?
29. How can you optimize a large list?

## Practice Checklist

Take a slow search page and optimize it using debouncing, request cancellation, lazy rendering, and measured performance improvements.
