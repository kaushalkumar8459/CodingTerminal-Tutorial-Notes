# Day 244 — SSR Data Transfer, Caching and Production Architecture

## Goal

Prevent duplicate data fetching and unsafe server-side caching.

## HTTP Transfer Cache

Angular can cache eligible HttpClient responses during SSR and reuse them during hydration to avoid unnecessary browser requests. By default, eligible GET and HEAD requests can participate in transfer caching, while requests involving authorization or certain cache-control conditions are excluded.

## Security Boundary

Be careful with:

- authenticated responses;
- cookies;
- authorization headers;
- user-specific resource data;
- shared server/CDN caches.

Never expose one user's server-rendered data to another user through an incorrect cache configuration.

## Resource Data

Angular resources can also transfer server-resolved data to the browser when configured with a stable resource id, but user-specific resource data requires careful cache design because serialized data becomes part of the HTML.

## Exercise

Review JobHub SSR requests and classify each as:

- safe to transfer;
- must remain request-specific;
- should not be shared;
- should be explicitly excluded.

## Common Mistakes

- Caching authenticated responses in a shared cache.
- Including sensitive headers in transferred data.
- Assuming all GET requests are safe to share.
- Ignoring cache invalidation.

## Interview Questions

1. What is HTTP transfer cache?
2. Why can SSR caching create security problems?
3. Which requests need special care?
4. How does hydration avoid duplicate API work?

## Outcome

You can design SSR data flow with both performance and security in mind.
