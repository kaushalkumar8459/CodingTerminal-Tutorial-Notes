# Day 127 — Memory Management & Garbage Collection

## Memory Model

1. Explain stack and heap at a practical JavaScript level.
2. Identify values and references in nested objects.
3. Explain reachability and why garbage collection can reclaim unreachable objects.
4. Distinguish memory usage from memory leaks.

## Garbage Collection

5. Explain mark-and-sweep at a high level.
6. Identify references that keep objects reachable.
7. Explain why manually freeing normal JavaScript objects is unnecessary.
8. Recognize cases where garbage collection cannot reclaim an object because a reference remains.

## Memory Leaks

9. Identify accidental global references.
10. Identify forgotten timers and intervals.
11. Identify event listeners that remain attached unnecessarily.
12. Identify closures retaining large objects.
13. Identify detached DOM nodes retained by JavaScript.
14. Explain how caches can become unbounded.

## Weak References

15. Use `WeakMap` for object-associated metadata.
16. Explain why WeakMap keys do not prevent garbage collection.
17. Compare WeakMap with Map.
18. Explain the limitations of WeakMap and WeakSet.

## Debugging

19. Use browser memory snapshots to investigate retained objects.
20. Explain retained size vs shallow size at a high level.
21. Design a cleanup strategy for subscriptions, observers, timers, and listeners.

## Interview Questions

22. What is a memory leak in JavaScript?
23. Can a closure cause a memory leak?
24. Why would you use WeakMap instead of Map?
25. What is a detached DOM node?
26. How would you investigate a growing browser heap?

## Practice Checklist

For every long-lived listener, timer, observer, cache, and subscription, identify who owns it and when it should be cleaned up.
