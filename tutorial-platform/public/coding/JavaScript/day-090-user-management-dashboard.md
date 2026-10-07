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

<!-- codingterminal-solution:start -->

# Day 090 — Solution: User Management Dashboard

```js
const API = "https://jsonplaceholder.typicode.com/users";
let users = [];
let isLoading = false;
let errorMessage = "";

async function retryFetch(operation, maxAttempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

async function fetchUsers() {
  isLoading = true;
  errorMessage = "";
  try {
    const response = await fetch(API);
    if (!response.ok)
      throw new Error(`Unable to load users: ${response.status}`);
    users = await response.json();
    return users;
  } catch (error) {
    errorMessage = error.message;
    throw error;
  } finally {
    isLoading = false;
  }
}

const searchUsers = (term) =>
  users.filter((user) =>
    `${user.name} ${user.email}`.toLowerCase().includes(term.toLowerCase()),
  );
const filterUsers = (city) =>
  users.filter((user) => user.address.city === city);
const sortUsers = (field = "name", direction = "asc") =>
  [...users].sort((a, b) => {
    const comparison =
      typeof a[field] === "string"
        ? a[field].localeCompare(b[field])
        : a[field] - b[field];
    return direction === "desc" ? -comparison : comparison;
  });
const getUserDetails = (id) => users.find((user) => user.id === id);
function deleteUser(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index >= 0) users.splice(index, 1);
  return users;
}

async function loadDashboard() {
  try {
    await retryFetch(fetchUsers, 3);
    return { searchUsers, filterUsers, sortUsers, getUserDetails, deleteUser };
  } catch (error) {
    console.error(errorMessage || error.message);
    return null;
  }
}
```

The data-fetching function owns loading/error state, while search, filtering, sorting, details, and local deletion operate on already-loaded data.

## Interview-style questions

Separating fetching from local transformations makes each part easier to test and prevents network concerns from being mixed with presentation logic. `retryFetch()` stops after a bounded number of attempts; a short backoff can be added between attempts, but unlimited retries should be avoided.

<!-- codingterminal-solution:end -->

