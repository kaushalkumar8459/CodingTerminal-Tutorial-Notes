# Day 088 — Solution: Fetch API

```js
const API = "https://jsonplaceholder.typicode.com";

async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    headers: { Accept: "application/json", ...options.headers },
    ...options,
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

const user = await apiRequest(`${API}/users/1`);
console.log(user.name);
const posts = await apiRequest(`${API}/posts`);
console.log(posts.length);
const post = await apiRequest(`${API}/posts/1`);
console.log(post.title);
const response = await fetch(`${API}/users/1`);
console.log(response.status, response.ok);
const missing = await fetch(`${API}/posts/9999`);
console.log(missing.status);
```

**6–9. POST, PUT, DELETE**

```js
const createPost = (title, body, userId) =>
  apiRequest(`${API}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, userId }),
  });
const updated = await apiRequest(`${API}/posts/1`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Updated" }),
});
const deleted = await fetch(`${API}/posts/1`, { method: "DELETE" });
console.log(updated, deleted.status);
```

**10. User and posts in parallel**

```js
async function getUserWithPosts(userId) {
  const [user, posts] = await Promise.all([
    apiRequest(`${API}/users/${userId}`),
    apiRequest(`${API}/posts?userId=${userId}`),
  ]);
  return { user, posts };
}
```

## Interview-style questions

**13.** Fetch resolves for HTTP errors because it successfully received an HTTP response; callers must check `response.ok`.

**14.** `response.json()` parses JSON into JavaScript data; `response.text()` returns the raw response body as a string.

**15.** Request bodies must be serialized into JSON text; `response.json()` performs the reverse parsing for the received body.
