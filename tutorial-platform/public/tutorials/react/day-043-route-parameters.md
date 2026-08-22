---
title: Route Parameters
slug: day-043-route-parameters
dayLabel: Day 43
level: Intermediate
estimatedMinutes: 150
order: 43
track: react
---
# Day 43 [Intermediate]: Route Parameters

## Goal

Build dynamic, URL-driven detail pages with React Router. Learn how path parameters are matched and consumed, how to validate and normalize user-controlled URL input, how params interact with query strings and API requests, and how to handle parameter changes safely.

## Prerequisites

- Day 41: React Router setup
- Day 42: Routes and navigation
- `useEffect`, `useState`, and basic API calls
- JavaScript arrays and objects

## Learning Outcomes

By the end of this lesson, you can:

- define dynamic route segments such as `/products/:id`
- read params with `useParams`
- understand that route params are strings
- distinguish path params from query/search params
- generate links safely with dynamic IDs
- validate and normalize route input
- handle missing/invalid resources
- fetch data when a parameter changes
- avoid stale async responses when params change quickly
- choose appropriate loading/error/not-found states
- explain route params as untrusted client input
- test parameter-driven routes

## 1. Dynamic Route Syntax

A parameterized route uses `:` followed by a parameter name:

```jsx
<Route path="/products/:id" element={<ProductDetails />} />
```

The route matches URLs such as:

```text
/products/1
/products/42
/products/abc
```

The router matches the URL shape; it does not decide whether `42` or `abc` is a valid product ID in your application.

### Multiple parameters

A route can contain more than one parameter:

```jsx
<Route
  path="/users/:userId/orders/:orderId"
  element={<OrderDetails />}
/>
```

For `/users/10/orders/500`, the params are conceptually:

```js
{
  userId: "10",
  orderId: "500",
}
```

## 2. Reading Params with `useParams`

```jsx
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  return <h1>Product ID: {id}</h1>;
}
```

Important: route parameters are strings.

```js
const { id } = useParams();
console.log(typeof id); // "string"
```

If your local data uses numeric IDs, normalize the value before comparison:

```jsx
const productId = Number(id);
const product = products.find((item) => item.id === productId);
```

Do not assume that `Number(id)` always produces a valid ID. Validation is still required.

## 3. Validate and Normalize Params

A URL is user-controlled input. For a numeric ID:

```jsx
const rawId = id ?? "";
const productId = Number(rawId);
const isValidId = Number.isInteger(productId) && productId > 0;
```

Then handle invalid input explicitly:

```jsx
if (!isValidId) {
  return <p>Invalid product ID.</p>;
}
```

For string identifiers such as slugs, validate according to the application's allowed format rather than blindly accepting arbitrary strings.

Validation on the client improves UX; it does **not** replace server-side validation or authorization.

## 4. Finding Data from a Param

For local data:

```jsx
const products = [
  { id: 1, name: "Phone", price: 500 },
  { id: 2, name: "Laptop", price: 1200 },
];

const product = products.find((item) => item.id === productId);
```

A valid parameter does not guarantee that a resource exists.

These are different cases:

```text
/products/abc  → invalid format
/products/999  → valid format, resource not found
/products/1    → valid resource
```

Your UI should distinguish these cases when that distinction is useful.

## 5. Invalid and Missing Resource States

A detail page commonly has at least these states:

```text
Loading
   ↓
Success → Details
   ↓
Not Found
   ↓
Error
```

For local data:

```jsx
if (!product) {
  return <p>Product not found.</p>;
}
```

For API-backed pages, distinguish:

- invalid parameter
- loading
- successful response
- HTTP 404/not found
- other request failure

Do not turn every API error into "not found".

## 6. Dynamic Links

A list can link to the corresponding detail route:

```jsx
import { Link } from "react-router-dom";

function ProductList({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link to={`/products/${product.id}`}>
            {product.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

Use stable application identifiers when constructing detail URLs. Do not use an array index as the resource identity merely because it is convenient.

For nested routes, relative links can make the relationship clearer when the route structure supports it:

```jsx
<Link to="details">Details</Link>
```

Choose relative or absolute paths based on the route structure and test the resulting URLs.

## 7. Route Params vs Query Parameters

These represent different kinds of URL state.

### Path parameter

Identifies the resource:

```text
/products/42
```

### Query/search parameter

Controls the view or query:

```text
/products/42?tab=reviews&sort=recent
```

React Router provides `useSearchParams` for search parameters:

```jsx
import { useSearchParams } from "react-router-dom";

function ProductDetails() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") ?? "overview";

  return <p>Current tab: {tab}</p>;
}
```

A useful rule is:

```text
Path parameter → Which resource?
Query parameter → How should I view/filter it?
```

This is a design convention rather than a universal law, so choose URL semantics that are clear and consistent for the application.

## 8. Param-Driven API Requests

When the route identifies a remote resource, the parameter can drive the request:

```jsx
useEffect(() => {
  fetch(`/api/products/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load product");
      }
      return response.json();
    })
    .then(setProduct)
    .catch(setError);
}, [id]);
```

The dependency is important. If the user navigates from `/products/1` to `/products/2` while the same component remains mounted, the effect must react to the new `id`.

## 9. Avoiding Stale API Responses

A parameter can change before an earlier request completes. Without cancellation or stale-result protection, an older response can overwrite newer data.

A simple `AbortController` pattern is:

```jsx
useEffect(() => {
  const controller = new AbortController();

  async function loadProduct() {
    try {
      setStatus("loading");
      setError(null);

      const response = await fetch(`/api/products/${id}`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();
      setProduct(data);
      setStatus("success");
    } catch (error) {
      if (error.name === "AbortError") return;
      setError(error);
      setStatus("error");
    }
  }

  loadProduct();

  return () => controller.abort();
}, [id]);
```

This is particularly important when users can move rapidly between detail routes.

## 10. Complete Local-Data Example

```jsx
import { Link, Route, Routes, useParams } from "react-router-dom";

const products = [
  { id: 1, name: "Phone", price: 500 },
  { id: 2, name: "Laptop", price: 1200 },
];

function ProductList() {
  return (
    <main>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

function ProductDetails() {
  const { id } = useParams();
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    return <p>Invalid product ID.</p>;
  }

  const product = products.find((item) => item.id === productId);

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <main>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <Link to="/products">Back to products</Link>
    </main>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetails />} />
    </Routes>
  );
}
```

## 11. Slugs Instead of Numeric IDs

Route parameters do not have to be numbers.

A content application may use:

```text
/articles/react-route-parameters
```

with:

```jsx
<Route path="/articles/:slug" element={<ArticleDetails />} />
```

Then:

```jsx
const { slug } = useParams();
```

Slug validation and normalization should match the application's URL contract.

## 12. Optional and Splat Parameters

React Router supports more advanced route patterns. A splat/catch-all parameter can capture the remainder of a URL:

```jsx
<Route path="/files/*" element={<FileBrowser />} />
```

Inside the component, the captured remainder can be accessed through the router's params.

Use advanced patterns only when the URL model actually requires them. Avoid making a route pattern more complex than the domain demands.

## 13. Common Mistakes

### Treating params as numbers

They arrive as strings.

### Assuming a valid URL means valid data

Routing and resource validation are separate concerns.

### Missing `id` in an effect dependency

The component may display stale data when the route changes.

### Ignoring stale requests

Rapid navigation can allow an older request to overwrite newer state.

### Treating every failure as 404

Network/server failures and missing resources are different states.

### Using array indexes as resource IDs

An index is not a stable identity for a domain resource.

### Trusting route params for authorization

A user can manually type any URL. Server-side authorization must protect protected resources.

### Putting durable state only in navigation state

Use URL search parameters or another persistence mechanism when state must survive refresh/share/deep linking.

## 14. Hands-on Labs

### Lab 1 — Product Details

Build:

```text
/products
/products/:id
```

Requirements:

- dynamic links
- `useParams`
- numeric validation
- not-found state
- accessible navigation back to the list

### Lab 2 — Employee Profile

Build:

```text
/employees/:employeeId
```

Use a local employee collection and handle invalid/nonexistent IDs.

### Lab 3 — API Detail Page

Build a post detail page where `:id` drives an API request.

Requirements:

- loading state
- success state
- 404 state
- generic error state
- request cancellation

### Lab 4 — Product Tabs

Build:

```text
/products/:id?tab=reviews
```

Use `useParams` for product identity and `useSearchParams` for the selected tab.

### Lab 5 — Rapid Navigation

Simulate slow API responses and navigate quickly between two IDs. Verify that an old response cannot overwrite the current product.

## 15. Debugging Scenarios

### Scenario A — `/products/10` shows no product

Check:

1. Is `id` a string?
2. Does the data use numeric IDs?
3. Did you normalize the value?
4. Does product 10 actually exist?

### Scenario B — Product 1 appears after navigating to Product 2

Check the effect dependency and whether an earlier request can update state after the parameter changes.

### Scenario C — Refresh loses a selected tab

If the tab exists only in navigation state or local state, move it to URL search parameters when it should be shareable/deep-linkable.

### Scenario D — Invalid IDs reach the API

Validate/normalize client input for UX, but keep server-side validation authoritative.

### Scenario E — User can open another user's resource URL

Do not rely on the route component to enforce access. The backend must authorize the requested resource.

## 16. Testing Strategy

Use a router test environment with explicit initial entries:

```jsx
render(
  <MemoryRouter initialEntries={["/products/2"]}>
    <AppRoutes />
  </MemoryRouter>
);
```

Test behavior such as:

- the correct resource renders for `/products/2`
- invalid IDs render validation UI
- valid-but-missing IDs render not-found UI
- changing the route causes the correct resource request
- failed requests render error UI
- rapid route changes do not display stale data

For API-backed tests, mock the network boundary rather than depending on a real production API.

## 17. Assessment

1. How do you declare a route parameter?
2. Which Hook reads route parameters?
3. What type are route parameters?
4. Why should route input be validated?
5. What is the difference between an invalid ID and a missing resource?
6. Why should `id` usually be in the dependency array of a param-driven effect?
7. How can an older request overwrite newer state?
8. How can you reduce that race condition?
9. What is the difference between a path parameter and a query parameter?
10. Does validating a parameter on the client provide authorization?

### Answers

1. Use `:parameterName` in the route path.
2. `useParams`.
3. Strings.
4. URLs are user-controlled input and may contain malformed or unexpected values.
5. Invalid means the input fails the expected format; missing means the format is valid but no resource exists.
6. So the effect reruns when the route changes.
7. A slower previous request can resolve after a newer request and overwrite state.
8. Cancel obsolete requests or otherwise guard against stale responses.
9. Path params generally identify the resource; query params commonly represent filtering/view state.
10. No. Authorization must be enforced by the server.

## 18. Interview Questions

### Beginner

**What is a route parameter?**

A dynamic URL segment used by the route to identify or locate a resource.

**Which Hook reads route parameters?**

`useParams`.

### Intermediate

**Why are route params strings?**

URLs are textual representations, so applications must explicitly parse values when their domain model expects numbers or other types.

**How do you handle `/products/999` when product 999 does not exist?**

Render an appropriate not-found state or route-level 404 behavior rather than assuming the resource exists.

**Why include a param in an effect dependency array?**

Because the request depends on that value and must rerun when the route changes.

### Advanced

**How do you prevent stale detail data during rapid navigation?**

Cancel obsolete requests with `AbortController` or use a data-fetching abstraction that manages request identity/cancellation.

**How would you design `/users/:userId/orders/:orderId` securely?**

Validate both identifiers, fetch the requested resource, and enforce server-side authorization to ensure the order belongs to or is accessible by the authenticated user.

**When should a detail identifier be a slug instead of a numeric ID?**

When human-readable, stable, SEO/share-friendly URLs are part of the application's URL contract. The choice should match backend/resource identity requirements.

**Should route params be stored in global state?**

Usually not. The URL is already the source of truth for route identity; duplicate storage can become stale.

## 19. Production Checklist

- [ ] Dynamic routes have clear parameter names.
- [ ] Params are treated as strings until explicitly normalized.
- [ ] Numeric/string/slugs are validated according to the URL contract.
- [ ] Invalid input and missing resources are distinguishable where useful.
- [ ] API effects depend on the relevant params.
- [ ] Obsolete requests are cancelled or stale results are guarded.
- [ ] Loading/error/not-found states are intentional.
- [ ] Dynamic links use stable resource identifiers.
- [ ] Search/query state is represented in the URL when appropriate.
- [ ] Route params are never treated as trusted authorization data.
- [ ] Server-side validation and authorization remain authoritative.
- [ ] Parameter-driven behavior is tested.
- [ ] Deep links and refreshes work in the deployment environment.

## Final Project — Product Catalog

Build a production-style product catalog:

```text
/products
/products/:id
/products/:id?tab=reviews
```

Requirements:

- product list with dynamic links
- validated numeric ID
- detail page
- loading state
- not-found state
- generic API error state
- request cancellation
- URL-driven tab selection
- accessible back/list navigation
- tests for valid, invalid, missing and rapidly changing IDs
- explanation of why route params do not provide authorization

## Final Acceptance Criteria

- [ ] Dynamic route syntax is correct.
- [ ] `useParams` is used correctly.
- [ ] Param type/normalization is understood.
- [ ] Invalid input is handled.
- [ ] Missing resources are handled.
- [ ] Dynamic links use stable identifiers.
- [ ] Param-driven API fetching is correct.
- [ ] Stale-request handling is implemented.
- [ ] Path params and query params are distinguished.
- [ ] Testing strategy is implemented.
- [ ] Security boundary is clear.
- [ ] Final project is completed.

## Self Check

- [ ] I can define a dynamic route.
- [ ] I can read params with `useParams`.
- [ ] I know params are strings.
- [ ] I can validate numeric and string parameters.
- [ ] I can distinguish invalid input from not-found data.
- [ ] I can fetch data based on a parameter.
- [ ] I understand why the parameter belongs in the effect dependency array.
- [ ] I can prevent stale API responses.
- [ ] I can combine path and query parameters.
- [ ] I understand that route params are not authorization.

## Day 43 Outcome

You can now build robust parameter-driven routes, validate URL input, connect route identity to local or remote data, handle loading/error/not-found states, prevent stale request updates, and design secure URL-driven detail pages.

**Next:** Day 44 — Nested Routes and Layout Routes.
