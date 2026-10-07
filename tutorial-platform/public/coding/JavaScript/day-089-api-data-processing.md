# Day 089 — API Data Processing

Matches Tutorial Day 89 (API Error Handling). No limit on how many you build.

## Basic

1. Fetch a list of users and implement `searchUsers(users, term)` filtering by name.
2. Fetch a list of posts and implement `filterPostsByUser(posts, userId)`.
3. Fetch a list of posts and implement `sortPostsByTitle(posts, direction)`.
4. Implement basic pagination: `paginate(items, page, pageSize)` returning just the
   items for that page.
5. Combine search + pagination together into one function.

## Concept — proper error handling

6. Wrap all of today's fetch calls with proper `response.ok` checks (from Day 89),
   throwing descriptive errors for bad responses.
7. Build a `safeFetch(url)` wrapper that returns `{ data, error }` instead of throwing,
   so calling code can handle errors without a `try/catch` every single time.
8. Test your error handling by deliberately fetching a non-existent resource (bad ID
   or bad URL) and confirming your error handling triggers correctly.
9. Add a loading state (from Day 89's pattern) to a function that fetches, searches,
   AND paginates a large dataset — track `isLoading` correctly around the whole process.

## Interview-style questions

10. Why is it useful to build a reusable `safeFetch()`-style wrapper instead of adding
    `try/catch` everywhere individually?
11. How would you decide the right page size for pagination in a real application?
12. What's the benefit of doing search/filter/sort on already-fetched data (client-side)
    versus asking the API to do it server-side? What are the tradeoffs?

## Notes

- This day directly combines Module 3's array method skills (search, filter, sort) with
  Module 6's async/error-handling skills — a realistic combination you'll use constantly
  in real applications.
- Keep your `safeFetch()`/pagination helpers — you'll reuse them directly in tomorrow's
  User Management Dashboard project.

<!-- codingterminal-solution:start -->

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

<!-- codingterminal-solution:end -->

