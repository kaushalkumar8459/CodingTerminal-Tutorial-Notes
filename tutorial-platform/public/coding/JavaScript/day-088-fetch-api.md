# Day 088 — Fetch API (GET, POST, PUT, DELETE)

Matches Tutorial Day 88 (The Fetch API). Use a public API (e.g.
`https://jsonplaceholder.typicode.com`) or a local mock JSON file. No limit on how many
requests you try.

## Basic

1. Fetch a single user by ID and log their name.
2. Fetch a list of posts and log how many were returned.
3. Fetch a single post by ID and log its title.
4. Log the `response.status` and `response.ok` for a successful request.
5. Log the `response.status` for a request to a deliberately invalid URL/ID (e.g.
   an ID that doesn't exist) and observe the status code.

## POST, PUT, DELETE

6. Send a POST request creating a new post (title, body, userId), and log the created
   result returned by the API.
7. Send a PUT request updating an existing post's title, and log the result.
8. Send a DELETE request removing a post, and log the response status to confirm success.
9. Build a small `createPost(title, body, userId)` async function wrapping the POST
   request cleanly.

## Concept

10. Build a function `getUserWithPosts(userId)` that fetches a user AND their posts
    using two separate fetch calls — decide whether these two calls should be
    sequential or parallel (revisit Day 86-87), and implement accordingly.
11. Add custom headers to one of your requests (e.g. `Accept: application/json`) and
    confirm the request still works correctly.
12. Build a small reusable `apiRequest(url, options)` wrapper function that all your
    other functions use internally, to avoid repeating fetch boilerplate everywhere.

## Interview-style questions

13. Why does `fetch()`'s Promise resolve even for a 404 or 500 error response, instead
    of rejecting?
14. What's the difference between `response.json()` and `response.text()`?
15. Why do you need `JSON.stringify()` when sending a request body, but NOT when
    reading `response.json()`?

## Notes

- `fetch()` only REJECTS for genuine network failures (no internet, DNS failure, etc.)
  — HTTP error status codes (404, 500) are still "successful" fetches from `fetch()`'s
  perspective. Day 89 covers exactly how to detect and handle these properly.
- Keep your reusable `apiRequest()` wrapper — you'll build on it further in the Day 89-90
  practice.
