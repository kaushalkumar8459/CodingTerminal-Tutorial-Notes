---
title: API Calls with Axios and Query Basics
slug: day-026-api-calls-with-axios-query-basics
dayLabel: Day 26
level: Intermediate
estimatedMinutes: 120
order: 26
track: react
---
# Day 26 [Intermediate]: API Calls with Axios and Query Basics

## Goal

Build a reliable mental model for HTTP requests with Axios and understand the fundamentals of **query keys and server-state libraries**. By the end of the lesson you should be able to choose between raw Axios and a query library, design stable query keys, handle HTTP failures correctly, and build an API layer that can grow beyond one component.

> **Important:** Axios and TanStack Query solve different problems. Axios is an HTTP client. TanStack Query is a server-state management library. They can be used together, but a query key is not an Axios concept.

## Prerequisites

- Day 25: Fetch API calls
- `async` / `await`
- `try` / `catch` / `finally`
- React `useEffect` and state
- HTTP basics: method, URL, status code, headers, body

## Learning Outcomes

You should be able to:

- install and configure Axios
- make GET, POST, PATCH, and DELETE requests
- understand Axios request and response objects
- distinguish transport errors from HTTP errors
- use `axios.isAxiosError` safely
- configure headers, params, timeout, and base URLs
- create a reusable Axios instance
- separate API services from UI components
- pass query parameters with `params`
- distinguish query parameters from path parameters
- explain what server state means
- understand query keys as cache identity
- design stable query keys for filters and pagination
- explain why query keys should contain every value that changes the result
- understand the role of TanStack Query without confusing it with Axios
- avoid common API and caching mistakes

---

## 1. Axios vs Fetch: What Problem Does Axios Solve?

You learned `fetch` on Day 25. Axios is another HTTP client with a different API and a number of conveniences.

### Fetch

```js
const response = await fetch(url);

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

const data = await response.json();
```

### Axios

```js
const response = await axios.get(url);
const data = response.data;
```

Axios automatically transforms JSON responses when appropriate and rejects the promise for HTTP status codes outside the successful range by default.

### The important distinction

Axios is **not required** to use React, and it does not automatically provide caching, deduplication, pagination management, or server-state synchronization.

Think of the stack like this:

```text
React
  ↓
UI + component state
  ↓
TanStack Query (optional)
  ↓
Axios / fetch
  ↓
HTTP API
```

You can also use Axios directly:

```text
React → Axios → API
```

---

## 2. Installation

```bash
npm install axios
```

Then:

```jsx
import axios from "axios";
```

For a real application, keep Axios configuration in a dedicated module rather than creating different configurations inside every component.

---

## 3. Basic GET Request

```jsx
import axios from "axios";

async function getPosts() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );

  return response.data;
}
```

### Response shape

Conceptually, Axios gives you a response object containing information such as:

```js
{
  data,
  status,
  statusText,
  headers,
  config,
  request
}
```

Most application code starts with:

```js
response.data
```

but `status` and `headers` can also matter.

---

## 4. HTTP Methods

### GET

```js
await axios.get("/posts");
```

### POST

```js
await axios.post("/posts", {
  title: "React",
  body: "Learning Axios",
});
```

### PATCH

Use PATCH when partially updating a resource:

```js
await axios.patch("/posts/10", {
  title: "Updated title",
});
```

### PUT

PUT generally represents replacing a resource representation:

```js
await axios.put("/posts/10", {
  title: "New title",
  body: "New body",
});
```

The exact semantics depend on the API contract. Do not assume every backend treats PUT and PATCH identically.

### DELETE

```js
await axios.delete("/posts/10");
```

---

## 5. Query Parameters

Query parameters are values after `?` in a URL.

```text
/products?category=books&sort=price
```

With Axios, prefer `params` rather than manually concatenating strings:

```js
const response = await axios.get("/products", {
  params: {
    category: "books",
    sort: "price",
  },
});
```

Axios builds the encoded query string for you.

### Why `params` is better

Instead of:

```js
`/products?category=${category}&sort=${sort}`
```

use:

```js
axios.get("/products", {
  params: { category, sort },
});
```

This is easier to extend and reduces manual URL-building errors.

---

## 6. Query Parameters vs Path Parameters

These are different concepts.

### Path parameter

```text
/users/42
```

The `42` identifies a specific resource.

```js
axios.get(`/users/${userId}`);
```

### Query parameter

```text
/users?role=admin&page=2
```

These commonly control filtering, sorting, searching, or pagination.

```js
axios.get("/users", {
  params: {
    role: "admin",
    page: 2,
  },
});
```

A good API client keeps these concepts explicit.

---

## 7. Create a Reusable Axios Instance

Do not repeat the base URL and common configuration in every component.

```js
// api/client.js
import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
```

Then:

```js
import { apiClient } from "./client";

export async function getPosts() {
  const response = await apiClient.get("/posts");
  return response.data;
}
```

### Why this matters

A shared client gives you one place to configure:

- base URL
- timeout
- common headers
- authentication strategy
- interceptors
- environment-specific configuration

---

## 8. Environment Variables

Do not hard-code environment-specific API URLs throughout the application.

For Vite:

```env
VITE_API_BASE_URL=https://api.example.com
```

Read it with:

```js
import.meta.env.VITE_API_BASE_URL
```

### Security warning

Frontend environment variables are **not secrets**. Anything shipped to the browser can potentially be inspected by users.

Never put private API keys, database passwords, or server-only credentials into a client-side environment variable.

---

## 9. API Service Layer

A component should ideally describe **what data it needs**, not contain every URL and HTTP detail.

```js
// api/posts.js
import { apiClient } from "./client";

export async function getPosts(params = {}) {
  const response = await apiClient.get("/posts", { params });
  return response.data;
}

export async function getPost(id) {
  const response = await apiClient.get(`/posts/${id}`);
  return response.data;
}

export async function createPost(payload) {
  const response = await apiClient.post("/posts", payload);
  return response.data;
}
```

Now the component can use:

```js
const posts = await getPosts({ page: 1, limit: 10 });
```

This separation becomes increasingly valuable as the application grows.

---

## 10. Error Handling: Axios Does Not Mean Every Failure Is the Same

There are several failure categories.

### HTTP error

The server responded with a status such as `404`, `401`, `422`, or `500`.

Axios normally rejects these responses.

### Network/request error

The browser could not complete the request, for example because of connectivity or CORS/network conditions.

### Cancellation

The request was intentionally aborted.

### Client-side error

Your own code may throw before or after the request.

A useful handler:

```js
import axios from "axios";

try {
  const response = await apiClient.get("/posts");
  setData(response.data);
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error("HTTP error:", error.response.status);
    } else if (error.request) {
      console.error("Request sent but no response received");
    } else {
      console.error("Axios setup error:", error.message);
    }
  } else {
    console.error("Unexpected error", error);
  }
}
```

Do not blindly assume every caught value has `response.data`.

---

## 11. Loading, Error, Empty, and Success States

Axios does not manage your React UI state for you.

```jsx
const [data, setData] = useState([]);
const [status, setStatus] = useState("idle");
const [error, setError] = useState(null);
```

A request can transition through:

```text
idle
 ↓
loading
 ↓
 ├── success
 ├── empty
 └── error
```

Keep this model consistent with Day 27, where these UI states become a dedicated topic.

---

## 12. Axios Cancellation

Modern Axios supports `AbortController`.

```jsx
useEffect(() => {
  const controller = new AbortController();

  async function loadPosts() {
    try {
      const response = await apiClient.get("/posts", {
        signal: controller.signal,
      });

      setPosts(response.data);
    } catch (error) {
      if (error.code === "ERR_CANCELED") return;
      setError("Unable to load posts");
    }
  }

  loadPosts();

  return () => controller.abort();
}, []);
```

Cancellation is especially useful when a component unmounts or a newer request makes an older request irrelevant.

---

# 13. Axios Interceptors — Introduction

Interceptors allow cross-cutting request/response behavior.

```js
apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
```

Common uses include:

- authentication headers
- request logging
- response normalization
- centralized error handling
- token refresh workflows

Do not put complicated business logic into interceptors without a clear reason. They affect many requests and can make debugging difficult.

---

# 14. What Is Server State?

Not all application data is the same.

### Client state

Owned by the current UI:

```text
isModalOpen
selectedTab
inputValue
```

### Server state

Data that comes from a remote system and can change outside the current component:

```text
users
products
orders
notifications
```

Server state introduces concerns such as:

- caching
- stale data
- refetching
- retries
- synchronization
- deduplication
- pagination
- invalidation
- optimistic updates

This is where libraries such as **TanStack Query** become useful.

---

# 15. Query Keys

A query key identifies a piece of server data in a query cache.

For example:

```js
["posts"]
```

A detail query might be:

```js
["post", 42]
```

A filtered list might be:

```js
["posts", { status: "published", page: 2 }]
```

### The core rule

> Every variable that changes the result of the query should be represented in the query key.

For example, this is dangerous conceptually:

```js
["products"]
```

if the actual request changes based on `category` and `page`.

Prefer:

```js
["products", { category, page }]
```

This allows the query library to distinguish the datasets.

---

# 16. Query Keys Are Not Axios

This distinction is critical.

Axios:

```text
HTTP client
```

TanStack Query:

```text
Server-state/cache/query management
```

Axios does not create a cache merely because you call:

```js
axios.get("/posts");
```

Likewise, defining:

```js
const key = ["posts"];
```

does nothing by itself unless a query library uses that key.

---

# 17. Query Key Design Examples

### List

```js
["products"]
```

### Detail

```js
["product", productId]
```

### Search

```js
["products", { search }]
```

### Pagination

```js
["products", { page, pageSize }]
```

### Filter + sort

```js
[
  "products",
  {
    category,
    sort,
    page,
  },
]
```

Avoid creating multiple unrelated cache names for the same conceptual resource without a reason.

---

# 18. Query Key Stability

Prefer predictable, serializable values.

Good:

```js
["users", { role, page }]
```

Be cautious with values whose identity or serialization changes unexpectedly.

The goal is that logically identical requests produce logically identical query keys.

This makes caching, invalidation, refetching, and debugging much easier to reason about.

---

# 19. Axios + TanStack Query Conceptually

A query function can use Axios:

```js
async function fetchPosts() {
  const response = await apiClient.get("/posts");
  return response.data;
}
```

Then a query library can manage that server state:

```jsx
const query = useQuery({
  queryKey: ["posts"],
  queryFn: fetchPosts,
});
```

The responsibilities are now clearer:

```text
Axios
  → makes HTTP request

TanStack Query
  → manages server-state lifecycle/cache

React
  → renders UI
```

You will study query libraries in much greater depth later. For Day 26, focus on the mental model rather than memorizing APIs.

---

# 20. End-to-End Axios Example

```jsx
import { useEffect, useState } from "react";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
});

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      try {
        setStatus("loading");
        setError(null);

        const response = await apiClient.get("/posts", {
          params: { _limit: 5 },
          signal: controller.signal,
        });

        setPosts(response.data);
        setStatus("success");
      } catch (error) {
        if (axios.isAxiosError(error) && error.code === "ERR_CANCELED") {
          return;
        }

        setError("Unable to load posts.");
        setStatus("error");
      }
    }

    loadPosts();

    return () => controller.abort();
  }, []);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>{error}</p>;
  if (status === "success" && posts.length === 0) {
    return <p>No posts found.</p>;
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### What this example demonstrates

- Axios instance
- GET request
- query parameters
- explicit request status
- error handling
- cancellation
- stable list keys
- separation between transport and UI concerns

---

# 21. Common Mistakes

## Mistake 1: Assuming Axios automatically caches

It does not. Axios is an HTTP client.

## Mistake 2: Treating all errors as `error.message`

Useful for a simple UI, but production code often needs to distinguish HTTP, network, cancellation, and unexpected errors.

## Mistake 3: Hard-coding API URLs everywhere

Use a shared client and environment-specific configuration.

## Mistake 4: Exposing secrets in frontend configuration

Anything shipped to the browser is potentially visible.

## Mistake 5: Manually building query strings everywhere

Prefer Axios `params`.

## Mistake 6: Leaving result-changing values out of query keys

If `page` changes the result, the key should represent `page`.

## Mistake 7: Putting every API call directly in components

As applications grow, move transport details into services or query functions.

## Mistake 8: Confusing Axios cancellation with an HTTP failure

Cancellation is an intentional lifecycle event and often should not show a generic error message.

---

# 22. Debugging Scenarios

### Scenario 1: The server returns 404, but your `catch` never runs

Check whether you are actually using Axios or a wrapper that changes its error behavior. Axios normally rejects non-2xx HTTP responses.

### Scenario 2: Filters change but cached data appears wrong

If using a query library, inspect whether the filter values are represented in the query key.

### Scenario 3: API URL works locally but not in production

Check environment configuration and build-time variables. Do not assume `.env` values are automatically available in every frontend build tool.

### Scenario 4: User navigates away while a request is pending

Use cancellation where appropriate and ensure an aborted request does not incorrectly update UI state.

### Scenario 5: Every component has its own Axios configuration

Extract a shared Axios instance and service layer.

---

# 23. Hands-on Labs

## Lab 1 — Axios Posts

Build a posts page with:

- Axios GET
- loading state
- error state
- empty state
- retry button

## Lab 2 — Search Parameters

Create a product search UI:

```text
Search: react
Category: books
Page: 2
```

Send these using:

```js
params: { search, category, page }
```

## Lab 3 — API Service Layer

Create:

```text
src/
├── api/
│   ├── client.js
│   └── products.js
└── components/
    └── ProductList.jsx
```

Move all HTTP details out of the component.

## Lab 4 — Query Key Design

For a product screen supporting search, category, sort, and pagination, design a stable query key.

Expected idea:

```js
["products", { search, category, sort, page }]
```

## Lab 5 — Failure Classification

Simulate:

- 404
- 500
- offline/network failure
- cancellation

Display an appropriate UI message for each category.

---

# 24. Assessment Quiz

### Q1. What is Axios?

An HTTP client for making requests from JavaScript applications.

### Q2. Where is the response body normally available?

`response.data`.

### Q3. Does Axios automatically provide application-level caching?

No.

### Q4. What does `params` represent?

Query-string parameters sent with the request.

### Q5. What is a path parameter?

A value embedded in the resource path, such as `/users/42`.

### Q6. What is a query key?

A stable identifier used by a server-state/query library to identify cached data.

### Q7. Should every variable that changes query results be represented in the query key?

Yes, when using a query library whose cache is keyed by that data.

### Q8. Is a query key an Axios feature?

No.

### Q9. Why use an Axios instance?

To centralize configuration such as base URL, timeout, headers, and interceptors.

### Q10. Why should frontend environment variables not contain secrets?

Because client-side values can be exposed to the browser/user.

---

# 25. Interview Questions and Answers

### Beginner

**How do you make a GET request with Axios?**

```js
const response = await axios.get(url);
```

Then read `response.data`.

**How do you send query parameters?**

```js
axios.get("/products", {
  params: { category: "books" },
});
```

**How do you send a POST body?**

```js
axios.post("/posts", payload);
```

### Intermediate

**Why create an Axios instance?**

To centralize request configuration and cross-cutting behavior.

**How is Axios different from fetch?**

Both make HTTP requests, but Axios provides a different API and conveniences such as automatic JSON transformation and rejection of non-2xx responses by default.

**How do you distinguish an HTTP failure from a network failure?**

With Axios, an HTTP response is available as `error.response`, while a request that was sent without a response is represented by `error.request`. The exact handling should still be based on the Axios error shape and application requirements.

### Advanced

**Why should query keys include filters?**

Because different filters represent different server datasets. The cache must be able to distinguish those datasets.

**What is the difference between Axios and TanStack Query?**

Axios handles HTTP transport. TanStack Query manages server-state concerns such as caching, invalidation, refetching, and synchronization.

**When would you use Axios without TanStack Query?**

For simple applications, one-off requests, or cases where the application's server-state requirements are small enough to manage manually.

**When would you introduce a query library?**

When repeated server-state patterns such as caching, invalidation, retries, background refetching, pagination, and deduplication become significant.

**How would you design query keys for a filtered paginated list?**

Include all result-changing inputs in a stable structure:

```js
["products", { search, category, sort, page }]
```

---

# 26. Final Task — Product Explorer

Build a Product Explorer using Axios.

### Requirements

- [ ] Axios instance
- [ ] Environment-based API URL
- [ ] Product list
- [ ] Search query
- [ ] Category filter
- [ ] Pagination
- [ ] Loading state
- [ ] Error state
- [ ] Empty state
- [ ] Retry
- [ ] Product detail request
- [ ] API service module
- [ ] Request cancellation where appropriate
- [ ] Query-key design documented
- [ ] No secrets in frontend configuration

### Architecture target

```text
ProductExplorer
      ↓
Product service
      ↓
Axios instance
      ↓
HTTP API
```

If a query library is introduced, the architecture becomes:

```text
ProductExplorer
      ↓
TanStack Query
      ↓
Product query function
      ↓
Axios instance
      ↓
HTTP API
```

---

# 27. Day 26 Self-Check

You are ready to continue when you can explain, without notes:

- why Axios is different from fetch
- why Axios does not equal caching
- how `params` works
- path vs query parameters
- why a shared Axios instance helps
- why frontend environment variables are not secrets
- how to classify Axios errors
- why cancellation matters
- what server state means
- what a query key represents
- why result-changing variables belong in query keys
- when a query library becomes useful

---

# Day 26 Outcome

You now have a complete mental model for the next stage of React data fetching:

```text
Day 25
Fetch fundamentals
     ↓
Day 26
Axios + query-key fundamentals
     ↓
Day 27
Loading / Error / Empty states
     ↓
Day 28
Weather App
```

The key lesson is not simply **"Axios is easier than fetch."** The deeper lesson is understanding the separation between **HTTP transport, UI request state, and server-state management**. That distinction becomes critical as React applications grow.
