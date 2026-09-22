# Day 007 Solutions — Browser Performance & Core Web Vitals

## Investigation Workflow

1. Reproduce the slow interaction.
2. Record a Performance trace.
3. Identify long tasks.
4. Inspect network waterfalls.
5. Check layout and rendering work.
6. Measure the change after optimization.

## Core Web Vitals

- **LCP:** loading performance for the largest relevant content element.
- **INP:** responsiveness of interactions.
- **CLS:** visual stability.

## Practical Fixes

For a layout shift caused by an image:

```css
.hero-image {
  aspect-ratio: 16 / 9;
  width: 100%;
}
```

Reserving the expected space reduces unexpected movement.

## Interview Takeaway

Performance work should be evidence-driven: profile, identify a bottleneck, change it, then measure again.
