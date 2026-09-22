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
