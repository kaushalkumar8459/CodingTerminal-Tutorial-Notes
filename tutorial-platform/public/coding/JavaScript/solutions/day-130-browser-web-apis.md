# Day 130 Solutions — Browser Web APIs

## 1. Fetch with HTTP error handling

```js
async function getUsers(signal) {
  const response = await fetch("/api/users", { signal });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}
```

## 2. Abort a request

```js
const controller = new AbortController();

fetch("/api/search?q=javascript", {
  signal: controller.signal
});

controller.abort();
```

## 3. IntersectionObserver

```js
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      loadMore();
    }
  }
});

observer.observe(document.querySelector("#sentinel"));
```

Cleanup:

```js
observer.disconnect();
```

## Interview Takeaway

Fetch does not reject merely because the server returns 404 or 500. Check `response.ok` or the status explicitly.
