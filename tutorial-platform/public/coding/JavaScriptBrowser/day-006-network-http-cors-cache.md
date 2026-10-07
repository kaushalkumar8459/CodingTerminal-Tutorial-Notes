# Day 006 — HTTP, CORS & Browser Networking

## HTTP Basics

1. Explain request and response.
2. Understand methods such as GET, POST, PUT, PATCH, and DELETE.
3. Explain status-code categories.
4. Understand headers and content types.
5. Explain request and response bodies.

## CORS

6. Explain same-origin policy.
7. Explain CORS response headers.
8. Understand simple requests vs preflighted requests.
9. Explain the OPTIONS preflight.
10. Understand credentials and CORS configuration.

## Cache

11. Explain browser caching at a high level.
12. Understand Cache-Control and freshness.
13. Explain ETag and conditional requests.
14. Understand cache invalidation trade-offs.

## Fetch

15. Use fetch with headers and JSON.
16. Handle HTTP failures explicitly.
17. Cancel requests with AbortController.
18. Distinguish network failure from an HTTP error response.

## Interview Questions

19. What is CORS?
20. Why does a browser send an OPTIONS request?
21. What is same-origin policy?
22. Why can Postman call an API that a browser blocks?
23. What is ETag?

## Practice

Build a small API client that handles loading, HTTP errors, cancellation, retries, and cached responses.

<!-- codingterminal-solution:start -->

# Day 006 Solutions — HTTP, CORS & Browser Networking

## Fetch Error Handling

```js
async function requestJson(url, options) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}
```

## CORS

A browser may send an OPTIONS preflight when the cross-origin request requires permission to use the intended method, headers, or other request characteristics.

The server must return compatible CORS headers. CORS is enforced by browsers; it is not a general server-to-server security mechanism.

## Cache Validation

With an ETag, the browser can send a conditional request:

```http
If-None-Match: "abc123"
```

The server may respond with `304 Not Modified`, allowing the cached representation to be reused.

## Interview Takeaway

Postman is not subject to the browser's same-origin enforcement, which is why an API can work there while a browser request is blocked by CORS policy.

<!-- codingterminal-solution:end -->

