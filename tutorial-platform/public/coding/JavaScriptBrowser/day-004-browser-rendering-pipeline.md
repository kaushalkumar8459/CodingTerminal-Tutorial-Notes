# Day 004 — Browser Rendering Pipeline

## Rendering Stages

1. Explain parsing, DOM construction, CSS processing, layout, paint, and compositing at a high level.
2. Distinguish layout/reflow from paint/repaint.
3. Explain compositing.
4. Identify JavaScript work that can block rendering.
5. Explain why long tasks hurt interaction responsiveness.

## Layout

6. Identify common layout-triggering reads.
7. Explain layout thrashing.
8. Batch DOM reads and writes.
9. Prefer transform/opacity for suitable animations.

## Animation

10. Explain `requestAnimationFrame()`.
11. Compare CSS animations with JavaScript-driven animations.
12. Avoid updating layout on every scroll event without scheduling.

## Interview Questions

13. What is reflow?
14. What is repaint?
15. What is compositing?
16. What is layout thrashing?
17. Why is requestAnimationFrame useful?

## Practice

Create an animated list and compare a layout-heavy implementation with a transform-based implementation using browser performance tools.

<!-- codingterminal-solution:start -->

# Day 004 Solutions — Browser Rendering Pipeline

## Avoid Layout Thrashing

Risky pattern:

```js
for (const item of items) {
  const height = item.offsetHeight;
  item.style.height = height + 10 + "px";
}
```

A better approach is to separate reads from writes:

```js
const heights = items.map((item) => item.offsetHeight);

items.forEach((item, index) => {
  item.style.height = `${heights[index] + 10}px`;
});
```

## requestAnimationFrame

```js
requestAnimationFrame(() => {
  element.style.transform = "translateX(100px)";
});
```

Transforms can often be handled without changing layout, making them suitable for many animations.

## Interview Takeaway

Reflow/layout recalculates geometry. Paint draws pixels. Compositing combines rendered layers. These stages are related but not interchangeable.

<!-- codingterminal-solution:end -->

