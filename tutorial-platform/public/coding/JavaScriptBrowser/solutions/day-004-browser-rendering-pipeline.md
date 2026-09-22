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
