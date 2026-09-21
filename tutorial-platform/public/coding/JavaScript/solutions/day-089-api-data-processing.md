# Day 089 — Solution: API Data Processing

```js
const searchUsers = (users, term) =>
  users.filter((user) => user.name.toLowerCase().includes(term.toLowerCase()));
const filterPostsByUser = (posts, userId) =>
  posts.filter((post) => post.userId === userId);
const sortPostsByTitle = (posts, direction = "asc") =>
  [...posts].sort((a, b) =>
    direction === "desc"
      ? b.title.localeCompare(a.title)
      : a.title.localeCompare(b.title),
  );
function paginate(items, page, pageSize) {
  return items.slice((page - 1) * pageSize, page * pageSize);
}
const searchAndPaginate = (users, term, page, pageSize) =>
  paginate(searchUsers(users, term), page, pageSize);

async function safeFetch(url, options) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return { data: await response.json(), error: null };
  } catch (error) {
    return { data: null, error };
  }
}
```

**8. Deliberate failure**

```js
const result = await safeFetch(
  "https://jsonplaceholder.typicode.com/users/9999",
);
if (result.error) console.error(result.error.message);
```

**9. Loading-aware processing**

```js
async function loadSearchPage(url, term, page, pageSize) {
  let isLoading = true;
  try {
    const result = await safeFetch(url);
    if (result.error) throw result.error;
    return paginate(searchUsers(result.data, term), page, pageSize);
  } finally {
    isLoading = false;
    console.log("loading:", isLoading);
  }
}
```

## Interview-style questions

**10.** `safeFetch()` centralizes status checks and converts failures into a consistent result shape.

**11.** Choose a page size based on screen space, response size, network cost, interaction speed, and whether users prefer pagination or infinite scroll.

**12.** Client-side processing is fast for small already-loaded data and reduces requests; server-side processing scales better for large data and avoids downloading unused records.
