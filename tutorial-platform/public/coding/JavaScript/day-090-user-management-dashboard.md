# Day 090 — API Project: User Management Dashboard

Matches Tutorial Day 90 (API Data Processing). No limit on how far you extend this project.

## Project: User Management Dashboard

Using a public API (e.g. `https://jsonplaceholder.typicode.com/users`) or a local mock
JSON file, build a complete data-driven system with:

1. **Fetch users** — load the full user list, with proper `response.ok` error handling.
2. **Search** — filter users by name or email as the "search term" changes.
3. **Filter** — filter users by some derived property (e.g. company name, city).
4. **Sort** — sort users by name or by ID, ascending/descending.
5. **Details** — a function `getUserDetails(id)` returning one user's full info
   (including nested address/company data).
6. **Delete** — simulate deleting a user (remove from your local in-memory array,
   since the public API won't persist real deletes).
7. **Loading** — track a loading state while the initial fetch is in progress.
8. **Error** — handle and display a clear error message if the fetch fails.
9. **Retry** — implement a `retryFetch(fn, maxAttempts)` helper that retries a failed
   fetch operation up to a maximum number of attempts before giving up.

## Suggested build order

1. Build the core `fetchUsers()` with proper error handling and loading state.
2. Build `searchUsers()`, `filterUsers()`, `sortUsers()` operating on the fetched data.
3. Build `getUserDetails(id)`.
4. Build `deleteUser(id)` (local array manipulation).
5. Build `retryFetch()` and wrap your initial fetch with it.
6. Combine everything into one `loadDashboard()` function that fetches, then supports
   search/filter/sort/details/delete on the loaded data.

## Interview-style questions

- Why is separating "fetch and error handling" from "search/filter/sort" (which
  operate on already-loaded data) a good practice?
- How would `retryFetch()` decide when to give up vs. try again? What are reasonable
  limits (max attempts, delay between retries)?

## Notes

- This project directly combines Days 88-90's tutorial content — treat it as your
  checkpoint before Day 91's final Module 6 assessment project.
- No limit on extending: consider adding a simple "undo delete" feature, or caching
  fetched data using the `Map`-based cache pattern from Day 73.
