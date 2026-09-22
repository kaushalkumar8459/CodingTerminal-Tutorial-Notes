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
