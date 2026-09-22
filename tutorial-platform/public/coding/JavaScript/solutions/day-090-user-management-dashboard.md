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
