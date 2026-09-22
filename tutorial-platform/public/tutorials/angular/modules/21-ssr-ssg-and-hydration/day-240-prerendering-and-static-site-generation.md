# Day 240 — Prerendering and Static Site Generation

## Goal

Understand build-time generation and when SSG is a better fit than request-time SSR.

## Concept

Prerendering generates static HTML during the build. It is useful for stable public content such as documentation, marketing pages, and product catalogs. Angular server routing uses RenderMode.Prerender for this strategy. citeturn0search2turn0search6

## Trade-offs

Benefits:

- fast initial HTML;
- CDN-friendly delivery;
- no per-request rendering server required.

Costs:

- build-time generation;
- rebuild required for content changes;
- unsuitable for highly personalized content.

## Exercise

Convert the JobHub public company/about page into a prerendered route.

## Common Mistakes

- Prerendering user-specific content.
- Forgetting that generated pages can become stale.
- Generating thousands of unnecessary pages at every build.
- Treating SSG as identical to SSR.

## Interview Questions

1. What is SSG?
2. When is SSG useful?
3. What is the main difference between SSG and SSR?
4. Why can prerendered content become stale?

## Outcome

You can identify pages that benefit from build-time generation.
