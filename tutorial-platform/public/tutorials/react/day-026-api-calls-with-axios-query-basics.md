# Day 26 [Intermediate]: API Calls with Axios + Query Basics

## Index

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Learning Outcomes](#learning-outcomes)
- [Core Mental Model](#core-mental-model)
- [Axios vs Fetch](#axios-vs-fetch)
- [Topic by Topic](#topic-by-topic)
- [Query Parameters](#query-parameters)
- [Axios Configuration](#axios-configuration)
- [API Service Layer](#api-service-layer)
- [Error Handling](#error-handling)
- [Cancellation](#cancellation)
- [Interceptors](#interceptors)
- [Axios and Server State](#axios-and-server-state)
- [End-to-End Practical](#end-to-end-practical)
- [Common Mistakes](#common-mistakes)
- [Debugging Lab](#debugging-lab)
- [Hands-on Exercises](#hands-on-exercises)
- [Assessment](#assessment)
- [Interview Questions](#interview-questions)
- [Verification Checklist](#verification-checklist)
- [Day 26 Outcome](#day-26-outcome)

## Goal

Learn how to use **Axios** for HTTP communication in React applications and understand where Axios ends and a server-state/query library begins.

The goal is not to memorize `axios.get()`. You should be able to design a request layer that handles parameters, headers, errors, cancellation, and reusable configuration without coupling every component directly to HTTP details.

## Prerequisites

- Days 1–25
- React components, props, and state
- `useEffect` and cleanup
- JavaScript promises and `async`/`await`
- HTTP basics: methods, status codes, headers, JSON

## Learning Outcomes

By the end you can:

- install and configure Axios
- perform GET/POST/PUT/PATCH/DELETE requests
- distinguish query parameters from path parameters
- use `params` safely instead of manually concatenating query strings
- create reusable Axios instances
- centralize base URLs and common headers
- model loading/success/empty/error states
- distinguish HTTP errors from network/cancellation errors
- cancel requests with `AbortController`
- use interceptors deliberately
- separate transport code from UI components
- explain why Axios does not provide server-state caching by itself
- explain where TanStack Query fits

## Core Mental Model

```text
React component
      |
      v
UI action / effect
      |
      v
Application service
      |
      v
Axios instance
      |
      +--> base URL
      +--> headers
      +--> interceptors
      |
      v
HTTP API
      |
      v
Response / error
      |
      v
React UI state or server-state cache
```

Keep these concerns separate:

| Concern | Typical responsibility |
|---|---|
| Component | UI + user interaction |
| Service | API/domain operation |
| Axios | HTTP transport |
| Query library | Cache, synchronization, invalidation |
| Backend | Authentication/authorization and business rules |

## Axios vs Fetch

Axios is a promise-based HTTP client. It adds conveniences such as configurable instances, request/response interceptors, automatic JSON transformation for common responses, and a consistent client API.

`fetch()` is built into modern browsers and is often sufficient. Axios is useful when an application benefits from centralized HTTP configuration and cross-cutting request behavior.

Neither is automatically “better.” Choose based on project requirements.

## Installation

```bash
npm install axios
```

Then:

```jsx
import axios from "axios";
```

## Topic by Topic

### 1. Basic GET

```jsx
const response = await axios.get("https://api.example.com/users");
console.log(response.data);
```

Axios resolves the parsed response data through `response.data` for normal JSON responses.

### 2. Query Parameters

Prefer `params`:

```jsx
const response = await axios.get("/users", {
  params: {
    page: 2,
    limit: 20,
    search: "react"
  }
});
```

Conceptually this becomes a URL such as:

```text
/users?page=2&limit=20&search=react
```

Let Axios handle URL encoding instead of manually concatenating user input.

### 3. Path Parameters vs Query Parameters

Path parameter:

```text
/users/42
```

```jsx
axios.get(`/users/${userId}`);
```

Query parameters:

```text
/users?role=admin&page=2
```

```jsx
axios.get("/users", {
  params: { role: "admin", page: 2 }
});
```

Rule of thumb:

- **Path** identifies a specific resource.
- **Query** modifies/searches/filters a collection or request.

The backend API contract is the final authority.

### 4. POST

```jsx
await axios.post("/users", {
  name: "Asha",
  email: "asha@example.com"
});
```

Axios serializes a normal JavaScript object to JSON for typical JSON APIs.

### 5. PUT vs PATCH

```jsx
await axios.put(`/users/${id}`, completeUser);
await axios.patch(`/users/${id}`, { name: "Asha" });
```

Semantics are defined by the API. Commonly, PUT represents replacement while PATCH represents partial modification, but always follow the server contract.

### 6. DELETE

```jsx
await axios.delete(`/users/${id}`);
```

Do not assume every DELETE response contains JSON. Check the API contract before reading `response.data`.

## Axios Configuration

### Create a reusable instance

```jsx
import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});
```

Benefits:

- one base URL
- consistent defaults
- easier testing
- centralized cross-cutting behavior
- less repeated configuration

### Environment variables

```text
VITE_API_URL=https://api.example.com
```

Frontend environment variables are **not secrets**. Never place private API keys, database passwords, or service credentials in client-side environment variables.

## API Service Layer

Avoid putting every HTTP detail directly inside components.

```jsx
// userService.js
import { apiClient } from "./apiClient";

export async function getUsers(params) {
  const response = await apiClient.get("/users", { params });
  return response.data;
}

export async function createUser(payload) {
  const response = await apiClient.post("/users", payload);
  return response.data;
}
```

Component:

```jsx
async function handleCreate() {
  try {
    await createUser(formData);
  } catch (error) {
    // display an appropriate UI message
  }
}
```

This keeps transport concerns reusable and makes components easier to test.

## Error Handling

Do not treat every Axios rejection as the same kind of failure.

```jsx
try {
  const response = await apiClient.get("/users");
  return response.data;
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.code === "ERR_CANCELED") {
      // request was intentionally cancelled
    } else if (error.response) {
      // server responded with an HTTP error status
      console.error(error.response.status);
    } else if (error.request) {
      // request was made but no response was received
    } else {
      // request configuration/setup error
    }
  }
}
```

Important categories:

```text
HTTP error
  server responded

Network/transport error
  no usable response

Cancellation
  request intentionally stopped

Application/data error
  response arrived but data is invalid/unexpected
```

Don't display raw server error objects to users. Map failures to safe, meaningful UI messages.

## Loading, Success, Empty, Error

A request-driven UI should explicitly model states:

```text
idle → loading → success
              ↘ empty
              ↘ error
              ↘ cancelled
```

Example:

```jsx
const [status, setStatus] = useState("idle");
const [users, setUsers] = useState([]);
const [errorMessage, setErrorMessage] = useState("");

async function loadUsers() {
  setStatus("loading");
  setErrorMessage("");

  try {
    const data = await getUsers({ page: 1 });
    setUsers(data);
    setStatus("success");
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === "ERR_CANCELED") {
      return;
    }

    setErrorMessage("Unable to load users. Please try again.");
    setStatus("error");
  }
}
```

`users.length === 0` is a **derived empty state**, not necessarily a separate stored state.

## Cancellation

Axios supports the standard `AbortController` signal:

```jsx
const controller = new AbortController();

apiClient.get("/users", {
  signal: controller.signal
});

controller.abort();
```

In an effect:

```jsx
useEffect(() => {
  const controller = new AbortController();

  async function load() {
    try {
      const response = await apiClient.get("/users", {
        signal: controller.signal
      });
      setUsers(response.data);
    } catch (error) {
      if (axios.isCancel(error)) return;
      // handle real errors
    }
  }

  load();

  return () => controller.abort();
}, []);
```

Cancellation is useful when the component no longer owns the request, such as when an effect is cleaned up.

### Cancellation is not the whole race-condition solution

Consider:

```text
Request A starts
Request B starts
B completes
A completes later
```

If both requests can remain active, an older response can overwrite newer UI state. Cancellation reduces unnecessary work, but application design should also ensure stale responses cannot incorrectly win when concurrent requests are possible.

For example, use a request identity/version guard when your UI can intentionally have overlapping requests.

## Interceptors

Interceptors are useful for truly cross-cutting behavior.

```jsx
apiClient.interceptors.request.use((config) => {
  // attach a token if appropriate
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
```

Good uses:

- correlation/request IDs
- common headers
- centralized response normalization
- authentication token attachment when appropriate
- logging/observability

Be careful with:

- hiding errors
- redirecting every 401 automatically
- infinite refresh-token loops
- registering the same interceptor repeatedly during render or component lifecycle

Interceptors should be registered in a stable application-level location, not repeatedly for every render.

## Axios and Server State

Axios performs HTTP transport. It does **not** automatically give you a full server-state cache.

A query library such as TanStack Query can provide:

- caching
- deduplication
- stale/fresh policies
- invalidation
- background refetching
- retries
- pagination/infinite queries

The separation is:

```text
Axios
  = How do I communicate with the server?

TanStack Query
  = How do I manage server data in the client?
```

You can use Axios without TanStack Query, and you can use a query library with `fetch` instead of Axios.

## Query Keys — Basics

When using a query library, a query key identifies a cached server-data request.

Conceptually:

```jsx
["users", { page: 2, search: "react" }]
```

The key should contain every variable that changes the requested result.

Bad concept:

```jsx
["users"]
```

if the same query function also depends on `page` and `search`.

Good concept:

```jsx
["users", page, search]
```

Stable, deterministic query keys prevent unrelated requests from sharing the same cache identity.

## End-to-End Practical

Build a **User Directory** with:

- search input
- page number
- loading state
- error state
- empty state
- retry button
- Axios service layer
- query parameters
- request cancellation

### Service

```jsx
export async function searchUsers({ search, page, signal }) {
  const response = await apiClient.get("/users", {
    params: { search, page, limit: 10 },
    signal
  });

  return response.data;
}
```

### Component skeleton

```jsx
function UserDirectory() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("idle");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function run() {
      setStatus("loading");
      setError("");

      try {
        const data = await searchUsers({
          search,
          page,
          signal: controller.signal
        });

        setUsers(data.items ?? []);
        setStatus("success");
      } catch (error) {
        if (axios.isCancel(error)) return;
        setError("Unable to load users.");
        setStatus("error");
      }
    }

    run();
    return () => controller.abort();
  }, [search, page]);

  return null; // Build the UI as an exercise.
}
```

### Acceptance Criteria

- [ ] Search and page are sent as query parameters.
- [ ] API logic is separated from the component.
- [ ] Loading, success, empty, and error states are visible.
- [ ] Previous effect requests are cancelled.
- [ ] Cancellation is not shown as a user-facing error.
- [ ] Retry can re-run the request.
- [ ] No secret is stored in frontend environment variables.
- [ ] Query-key design is documented if a query library is introduced.

## Common Mistakes

### 1. Manually concatenating query strings

Prefer Axios `params` for structured query parameters.

### 2. Treating HTTP 404/500 as a network failure

The server responded. Inspect `error.response`.

### 3. Assuming every Axios error is an API error

Cancellation, network failure, configuration errors, and server responses have different meanings.

### 4. Putting API URLs throughout components

Centralize base configuration and service operations.

### 5. Putting secrets in Vite environment variables

Anything shipped to the browser is potentially visible to users.

### 6. Registering interceptors repeatedly

Create stable Axios instances and register cross-cutting interceptors once.

### 7. Using Axios as a cache

Axios transports data; it is not a server-state cache.

### 8. Storing derived values unnecessarily

For example, `users.length === 0` can usually be calculated rather than synchronized with another state variable.

### 9. Ignoring stale responses

Cancellation helps, but overlapping requests may require request identity/version protection.

## Debugging Lab

### Scenario A

```jsx
axios.get(`/users?page=${page}&search=${search}`);
```

**Question:** What is the safer Axios API?

**Answer:**

```jsx
axios.get("/users", {
  params: { page, search }
});
```

### Scenario B

```jsx
try {
  await axios.get("/users");
} catch (error) {
  showNetworkError();
}
```

**Question:** Is every rejection a network error?

**Answer:** No. Inspect cancellation, `error.response`, `error.request`, and configuration errors.

### Scenario C

Two searches run:

```text
react → request A
angular → request B
B finishes first
A finishes later
```

**Question:** What can go wrong?

**Answer:** A stale response can overwrite the current Angular result. Cancellation/request ownership should be considered.

### Scenario D

An interceptor is added inside a component body.

**Question:** Why is this dangerous?

**Answer:** Each render can register another interceptor, causing duplicated behavior and memory leaks.

## Hands-on Exercises

### Level 1 — CRUD

Implement GET, POST, PATCH, and DELETE operations.

### Level 2 — Query Search

Build search + pagination using Axios `params`.

### Level 3 — Reusable API Client

Create an Axios instance with a configurable base URL and timeout.

### Level 4 — Cancellation

Cancel a request when a search effect is replaced or unmounted.

### Level 5 — Production Error Boundary

Map HTTP 401, 403, 404, 409, 422, 429, 500, network, and cancellation failures to appropriate UI messages.

For every exercise, students should document:

- request trigger
- request state
- cancellation behavior
- error behavior
- ownership of state

## Assessment

1. What problem does Axios solve?
2. When would you prefer Fetch?
3. What is the difference between path and query parameters?
4. Why use Axios `params`?
5. What is an Axios instance?
6. Why should frontend environment variables not contain secrets?
7. How does Axios expose response data?
8. How do you distinguish HTTP errors from network errors?
9. How do you detect cancellation?
10. Why are interceptors useful?
11. Why should interceptors not be registered every render?
12. Does Axios cache server state?
13. What does a query key represent?
14. Why should query keys contain variables used by the query?
15. Why is cancellation not always sufficient for race-condition correctness?

### Answers

1. It provides a convenient configurable HTTP client.
2. When the native browser API is sufficient and another dependency is unnecessary.
3. A path parameter usually identifies a resource; a query parameter modifies/filter/searches a request.
4. It handles parameter serialization/encoding more safely and cleanly.
5. A reusable configured Axios client with defaults and interceptors.
6. Browser-delivered values can be inspected; they are not secret storage.
7. Through `response.data` for normal parsed responses.
8. HTTP failures have a response; network failures commonly have no usable response.
9. Check the cancellation signal/error code or Axios cancellation helper.
10. They centralize cross-cutting request/response behavior.
11. It can register duplicate handlers on every render.
12. No. Axios is a transport client, not a complete server-state cache.
13. It identifies a query's cached server-data identity.
14. Otherwise different requests can incorrectly share cache identity.
15. Requests can overlap, and an older response may still resolve; UI ownership must be protected.

## Interview Questions

### Beginner

**Why use Axios instead of Fetch?**

Axios can reduce HTTP boilerplate and provides reusable instances/interceptors. Fetch remains an excellent built-in option.

**How do you send query parameters?**

```jsx
axios.get("/users", { params: { page: 2 } });
```

### Intermediate

**How would you structure API code in a React application?**

Use a configured Axios client, domain-specific service functions, and keep transport details outside presentation components.

**What is the difference between Axios and TanStack Query?**

Axios handles HTTP transport. TanStack Query manages server-state concerns such as caching, invalidation, and synchronization.

**How would you cancel an Axios request?**

Use `AbortController` and pass its `signal` to Axios.

### Advanced

**Why isn't `error.response` always available?**

A request can fail before a response exists, such as network failures or cancellation.

**How do you prevent stale search results?**

Cancel obsolete requests where possible and/or track request identity so only the current request can update the UI.

**What can go wrong with interceptors?**

Repeated registration, hidden errors, refresh loops, and unexpected global behavior.

**When should Axios be replaced by a different transport?**

When project constraints favor Fetch or another client; Axios is a tool, not an architectural requirement.

**Why should query keys contain every result-changing variable?**

Because the cache must distinguish requests that produce different server data.

## Verification Checklist

- [ ] Can install and import Axios.
- [ ] Can perform GET/POST/PUT/PATCH/DELETE.
- [ ] Can distinguish path and query parameters.
- [ ] Can use `params` correctly.
- [ ] Can create a reusable Axios instance.
- [ ] Understand frontend environment-variable security.
- [ ] Can build a service layer.
- [ ] Can model loading/success/empty/error/cancelled states.
- [ ] Can distinguish HTTP, network, configuration, and cancellation failures.
- [ ] Can cancel requests with `AbortController`.
- [ ] Understand stale-response/race-condition risks.
- [ ] Understand interceptor lifecycle.
- [ ] Understand Axios vs server-state libraries.
- [ ] Can design stable query keys.
- [ ] Can build a complete search/pagination example.
- [ ] Can explain the Axios architecture in an interview.

## Day 26 Outcome

You can now use Axios as a **clean HTTP transport layer** instead of scattering request details through React components. You understand query parameters, configuration, services, cancellation, errors, interceptors, and the boundary between HTTP transport and server-state management.

**Next:** Day 27 — loading, error, and empty-state UX patterns.