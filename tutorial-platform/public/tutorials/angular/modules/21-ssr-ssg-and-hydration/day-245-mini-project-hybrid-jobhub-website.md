# Day 245 — Mini Project: Hybrid JobHub Website

## Goal

Build a hybrid-rendered JobHub website that combines CSR, SSR, SSG, and hydration intentionally.

## Project

Create these routes:

- / — public landing page
- /about — static company information
- /jobs/:id — public job detail
- /profile — authenticated profile
- /admin — authenticated admin workspace

## Rendering Plan

Choose a render mode for each route and document the reason.

Suggested exercise:

- static public content → prerender;
- dynamic public content → SSR or prerender depending on freshness;
- personalized application screens → CSR or SSR depending on product requirements.

Do not copy the suggestion blindly. Justify every route.

## Requirements

### SSR and SSG

- enable Angular SSR;
- configure server routes;
- prerender appropriate public routes;
- keep authenticated content protected.

### Hydration

- enable client hydration;
- verify server/client DOM consistency;
- diagnose at least one deliberate hydration issue.

### Performance

- use @defer for suitable secondary UI;
- consider incremental hydration;
- avoid duplicate API requests;
- inspect transfer-cache behavior.

### Production Review

Document:

- hosting model;
- server runtime;
- CDN/cache strategy;
- invalidation strategy;
- authenticated-data boundaries;
- monitoring;
- rollback plan.

## Final Review

Answer:

1. Why is each route CSR, SSR, or SSG?
2. What problem does hydration solve?
3. What caused or could cause a hydration mismatch?
4. Which data must never be shared through a public cache?
5. What would you measure after deployment?

## Interview Walkthrough

Explain:

rendering strategy → server rendering → hydration → data transfer → caching → deployment trade-offs

## Outcome

You can design and explain a production-oriented Angular hybrid rendering architecture.
