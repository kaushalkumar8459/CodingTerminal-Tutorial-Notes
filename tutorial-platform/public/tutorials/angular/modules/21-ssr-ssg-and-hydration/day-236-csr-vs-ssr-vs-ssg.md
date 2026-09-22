# Day 236 — CSR vs SSR vs SSG

## Goal

Understand the three primary Angular rendering modes and when hybrid rendering makes sense.

## Concept

**CSR** renders in the browser.

**SSR** renders HTML on the server for the request.

**SSG / prerendering** generates HTML at build time.

Angular's hybrid rendering lets different routes use different modes.

## Decision Thinking

Ask:

- Does the page need SEO?
- Is content static or dynamic?
- Does the first response need user-specific data?
- Is a server required?
- How frequently does content change?

Typical examples:

- marketing/about page → SSG
- public product detail → SSG or SSR depending on freshness
- personalized dashboard → CSR or SSR depending on requirements
- mixed application → hybrid

## Exercise

Classify ten JobHub routes as CSR, SSR, or SSG and explain the reason for each.

## Common Mistakes

- Assuming SSR is automatically better for every route.
- Using SSR for content that can be generated once.
- Ignoring server cost and caching.
- Treating SEO as the only reason to use SSR.

## Interview Questions

1. What is CSR?
2. What is SSR?
3. What is SSG?
4. Why use hybrid rendering?

## Outcome

You can choose a rendering strategy based on application requirements.
