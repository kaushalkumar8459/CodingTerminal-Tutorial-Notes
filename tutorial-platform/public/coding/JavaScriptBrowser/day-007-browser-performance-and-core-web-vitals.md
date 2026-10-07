# Day 007 — Browser Performance & Core Web Vitals

## Performance Measurement

1. Use the Performance panel to inspect long tasks.
2. Identify network bottlenecks.
3. Identify excessive scripting and rendering work.
4. Compare before and after measurements.
5. Understand why performance should be measured rather than guessed.

## Core Web Vitals

6. Explain Largest Contentful Paint (LCP).
7. Explain Interaction to Next Paint (INP).
8. Explain Cumulative Layout Shift (CLS).
9. Understand that metrics are user-experience measurements, not just JavaScript benchmarks.

## Optimization

10. Lazy-load non-critical resources.
11. Reduce unnecessary JavaScript.
12. Optimize images and fonts.
13. Avoid layout shifts by reserving space.
14. Break up long JavaScript tasks.
15. Use caching and compression appropriately.

## Interview Questions

16. What does LCP measure?
17. What does INP measure?
18. What causes CLS?
19. How would you investigate a slow page?
20. How can a large JavaScript bundle affect UX?

## Practice

Take a page with a large image, heavy JavaScript, and dynamic content. Identify three bottlenecks and measure the improvement after each change.

<!-- codingterminal-solution:start -->

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

<!-- codingterminal-solution:end -->

