# Day 231 — Images, Fonts and Asset Performance

## Goal
Optimize assets that can dominate initial page loading.

## Images
Angular's NgOptimizedImage provides performance-oriented behavior including lazy loading for non-priority images, responsive srcset generation, and LCP prioritization. It also uses image dimensions to help prevent layout shift.

~~~html
<img ngSrc="assets/images/jobhub-hero.jpg" width="1200" height="630" priority alt="JobHub dashboard" />
~~~

Use priority for an image that is actually part of the LCP experience.

## Fonts
Consider reducing font variants, using appropriate formats, avoiding unnecessary blocking resources, and loading only required weights/styles.

## Exercise
Audit JobHub hero images, logos, profile images, icons, and fonts. Record dimensions, approximate sizes, and loading behavior.

## Common Mistakes
- Shipping huge source images for small cards.
- Missing image dimensions.
- Marking every image as priority.
- Loading unused font weights.

## Interview Questions
1. What is LCP?
2. Why do image dimensions matter?
3. What does NgOptimizedImage provide?
4. Why should only appropriate images be prioritized?

## Outcome
You treat static assets as part of application performance.