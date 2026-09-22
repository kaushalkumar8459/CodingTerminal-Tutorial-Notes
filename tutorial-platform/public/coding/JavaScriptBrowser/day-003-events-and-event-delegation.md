# Day 003 — Events & Event Delegation

## Event Model

1. Explain event targets and listeners.
2. Explain capturing, target, and bubbling phases.
3. Use `addEventListener()`.
4. Explain `event.target` vs `event.currentTarget`.
5. Use `preventDefault()` and `stopPropagation()` appropriately.

## Event Delegation

6. Explain why event delegation works.
7. Build delegated click handling for a dynamic list.
8. Use `closest()` to locate the actionable element.
9. Avoid delegation bugs caused by nested elements.
10. Explain when delegation is not appropriate.

## Listener Lifecycle

11. Remove listeners correctly.
12. Use AbortController to manage listener cleanup.
13. Avoid anonymous-handler removal mistakes.
14. Identify listeners that can create lifecycle and memory problems.

## Practical Events

15. Handle keyboard events.
16. Handle pointer and mouse events.
17. Handle form submission.
18. Distinguish input, change, and submit behavior.

## Interview Questions

19. Capturing vs bubbling?
20. target vs currentTarget?
21. What is event delegation?
22. Why can event delegation improve performance?
23. When would you use stopPropagation?

## Practice

Build a dynamic todo list using event delegation so newly added items require no additional click listeners.
