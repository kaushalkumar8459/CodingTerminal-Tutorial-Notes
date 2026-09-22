# Day 232 — Network Performance and HTTP Caching

## Goal
Reduce unnecessary network work and improve responsiveness.

## Concept
Network performance depends on request count, size, latency, dependency chains, caching, compression, and server response time.

Ask: Can this request be avoided, reused, parallelized, or delayed?

## Caching
Caching can exist in the browser, CDN, application, and server/database. Client caching is not a replacement for server-side authorization.

## Exercise
Use the Network panel for JobHub and identify duplicate requests, avoidable sequential requests, oversized responses, cacheable responses, and requests that could be delayed.

## Common Mistakes
- Caching everything indefinitely.
- Making independent requests sequential.
- Sending full records when a small projection is enough.
- Ignoring cache invalidation.

## Interview Questions
1. What is a request waterfall?
2. Browser cache vs application state?
3. How do duplicate requests hurt performance?
4. When should data not be cached?

## Outcome
You can reason about network performance as part of end-to-end Angular performance.