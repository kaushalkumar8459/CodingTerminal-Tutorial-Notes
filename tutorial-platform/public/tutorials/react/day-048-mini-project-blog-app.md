---
title: Mini Project - Blog App
slug: day-048-mini-project-blog-app
dayLabel: Day 48
level: Advanced
estimatedMinutes: 180
order: 48
track: react
---
# Day 48 [Advanced]: Mini Project — Production-Ready Blog App

## Goal

Build a realistic React blog application that combines the routing and performance concepts from Days 41–47: nested routes, URL parameters, category filtering, protected author/admin areas, lazy-loaded features, loading/error/not-found states, and reusable data-driven UI.

This is a **project day**, not another isolated routing lesson. The objective is to integrate the previous concepts into one coherent application and make production-oriented design decisions.

## Prerequisites

- Day 41: React Router setup
- Day 42: Routes and navigation
- Day 43: Route parameters
- Day 44: Nested routes
- Day 45: Protected routes
- Day 46: Lazy-loading routes
- Day 47: Code splitting
- React state, effects, forms, and API basics

## Learning Outcomes

By the end of this project, you can:

- design a scalable blog route hierarchy
- use dynamic route parameters safely
- build URL-driven category filtering
- preserve navigation state with nested layouts
- distinguish `404`, empty, loading, error, and forbidden states
- lazy-load heavy blog/admin features
- protect author/admin routes without treating the client as a security boundary
- build reusable post cards and route-aware navigation
- model async post data cleanly
- handle invalid IDs and unknown categories
- test navigation and important user journeys
- organize a project for future API/CMS integration
- evaluate performance and accessibility before calling the project complete

## 1. Project Requirements

Build the following application:

```text
/blog
/blog/category/:slug
/blog/:postId
/blog/admin
/blog/admin/new
/blog/admin/edit/:postId
```

Public users can:

- browse posts
- filter by category
- open a post detail page
- navigate back to the list
- receive clear feedback for missing content

Authenticated authors/admins can additionally:

- open the admin dashboard
- create a post
- edit an existing post
- receive protected-route behavior when unauthorized

The project should use local mock data first, but the architecture should make replacing the data source with an API straightforward.

## 2. Recommended Route Architecture

Use a shared blog layout:

```jsx
<Routes>
  <Route path="/blog" element={<BlogLayout />}>
    <Route index element={<BlogHome />} />
    <Route path="category/:slug" element={<CategoryPage />} />
    <Route path=":postId" element={<PostDetails />} />

    <Route element={<ProtectedRoute />}>
      <Route path="admin" element={<BlogAdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="new" element={<CreatePost />} />
        <Route path="edit/:postId" element={<EditPost />} />
      </Route>
    </Route>
  </Route>
</Routes>
```

This structure demonstrates the progression:

```text
Day 44 → nested layout
Day 45 → protected route
Day 46 → lazy route
Day 47 → component/feature splitting
Day 48 → integrate everything into a real application
```

> Route protection shown here is a UI/navigation control. The backend must enforce authentication and authorization for real create/update operations.

## 3. Suggested Project Structure

```text
src/
├── app/
│   ├── App.jsx
│   └── routes.jsx
├── auth/
│   ├── AuthContext.jsx
│   └── ProtectedRoute.jsx
├── blog/
│   ├── components/
│   │   ├── PostCard.jsx
│   │   ├── CategoryNav.jsx
│   │   └── PostStatus.jsx
│   ├── layouts/
│   │   ├── BlogLayout.jsx
│   │   └── BlogAdminLayout.jsx
│   ├── pages/
│   │   ├── BlogHome.jsx
│   │   ├── CategoryPage.jsx
│   │   ├── PostDetails.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── CreatePost.jsx
│   │   └── EditPost.jsx
│   ├── data/
│   │   └── mockPosts.js
│   └── api/
│       └── postsApi.js
└── shared/
    ├── ErrorBoundary.jsx
    └── PageLoader.jsx
```

The exact structure is flexible. The important principle is separating route composition, reusable UI, data access, and feature pages.

## 4. Data Model

Start with predictable mock data:

```js
export const posts = [
  {
    id: "react-state",
    title: "Understanding React State",
    category: "react",
    author: "CodingTerminals",
    excerpt: "Learn how state drives UI updates.",
    content: "State lets a component remember information between renders.",
  },
  {
    id: "router-basics",
    title: "React Router Basics",
    category: "routing",
    author: "CodingTerminals",
    excerpt: "Build predictable client-side navigation.",
    content: "Routes map URLs to UI and can compose nested layouts.",
  },
];
```

Prefer string IDs in the project because real CMS systems commonly use slugs or UUID-like identifiers. If numeric IDs are used, normalize the route value before comparing it with stored data.

## 5. Blog Layout

The layout should keep shared navigation visible while child routes change:

```jsx
import { NavLink, Outlet } from "react-router-dom";

export default function BlogLayout() {
  return (
    <div>
      <header>
        <nav aria-label="Blog navigation">
          <NavLink to="/blog" end>
            All Posts
          </NavLink>
          <NavLink to="/blog/category/react">React</NavLink>
          <NavLink to="/blog/category/routing">Routing</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
```

The `Outlet` is the key to preserving the shell while child content changes.

## 6. Blog Home and Reusable Post Cards

```jsx
import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <article>
      <h2>
        <Link to={`/blog/${post.id}`}>{post.title}</Link>
      </h2>
      <p>{post.excerpt}</p>
      <Link to={`/blog/category/${post.category}`}>
        {post.category}
      </Link>
    </article>
  );
}
```

Keep cards focused on presentation. Avoid putting API calls or authorization decisions inside a reusable card component.

## 7. Category Filtering Through the URL

A URL such as:

```text
/blog/category/react
```

is preferable to keeping the selected category only in component state because it is:

- shareable
- bookmarkable
- refresh-safe
- directly navigable

```jsx
import { useParams } from "react-router-dom";

function CategoryPage({ posts }) {
  const { slug } = useParams();
  const category = slug?.toLowerCase();

  const filtered = posts.filter(
    (post) => post.category.toLowerCase() === category
  );

  if (filtered.length === 0) {
    return <p>No posts found in this category.</p>;
  }

  return filtered.map((post) => <PostCard key={post.id} post={post} />);
}
```

For a production API, the category should normally become a server-side query rather than downloading every post and filtering in the browser.

## 8. Post Details by Route Parameter

```jsx
import { Link, useParams } from "react-router-dom";

function PostDetails({ posts }) {
  const { postId } = useParams();
  const post = posts.find((item) => item.id === postId);

  if (!post) {
    return (
      <section>
        <h1>Post not found</h1>
        <p>The requested article does not exist or may have been removed.</p>
        <Link to="/blog">Back to all posts</Link>
      </section>
    );
  }

  return (
    <article>
      <p>{post.category}</p>
      <h1>{post.title}</h1>
      <p>{post.author}</p>
      <div>{post.content}</div>
    </article>
  );
}
```

An invalid route parameter should produce a controlled state rather than an exception or blank screen.

## 9. State Model: Loading, Error, Empty, Not Found

A production-oriented post page should distinguish these states:

```text
Loading
   ↓
Request succeeds ──→ data exists ──→ content
       │
       ├────────────→ no data ─────→ not found / empty
       │
       └────────────→ request fails → error
```

These are not interchangeable:

| State | Meaning | Example UI |
|---|---|---|
| Loading | Request is still running | Skeleton/spinner |
| Error | Request failed | Retry message |
| Empty | Collection has no items | No posts yet |
| Not found | Requested resource does not exist | Post not found |
| Forbidden | User is authenticated but lacks permission | Access denied |

This distinction becomes especially important when the mock data is replaced by an API.

## 10. API-Ready Data Layer

Do not make route components responsible for low-level HTTP details.

A simple API abstraction can look like:

```js
export async function getPost(postId) {
  const response = await fetch(`/api/posts/${encodeURIComponent(postId)}`);

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Failed to load post: ${response.status}`);
  }

  return response.json();
}
```

The component can then focus on state and presentation.

> `encodeURIComponent` is useful when a route value is inserted into a URL path. In a real application, also validate allowed ID/slug formats server-side.

## 11. Protected Author/Admin Routes

The project should include an author area:

```jsx
<Route element={<ProtectedRoute />}>
  <Route path="admin" element={<BlogAdminLayout />}>
    <Route index element={<AdminDashboard />} />
    <Route path="new" element={<CreatePost />} />
    <Route path="edit/:postId" element={<EditPost />} />
  </Route>
</Route>
```

A protected route should handle at least:

```text
checking session → loading
        ↓
not authenticated → login
        ↓
authenticated → child route
```

If role/permission checks are added:

```text
authenticated
    ↓
permission check
 ┌──┴──┐
allow deny
```

Do not rely on a client-side role flag to secure create/edit APIs. The backend must validate the session and permission for every mutation.

## 12. Lazy-Loading the Admin Area

The public blog home should stay lightweight while admin features can be deferred:

```jsx
import { lazy, Suspense } from "react";

const BlogAdminLayout = lazy(() => import("./blog/layouts/BlogAdminLayout"));
const AdminDashboard = lazy(() => import("./blog/pages/AdminDashboard"));
const CreatePost = lazy(() => import("./blog/pages/CreatePost"));
const EditPost = lazy(() => import("./blog/pages/EditPost"));
```

Use a local boundary around the admin feature:

```jsx
<Route
  path="admin/*"
  element={
    <ProtectedRoute>
      <Suspense fallback={<p role="status">Loading admin...</p>}>
        <BlogAdminLayout />
      </Suspense>
    </ProtectedRoute>
  }
/>
```

The exact route composition can vary, but keep the responsibilities separate:

```text
ProtectedRoute → authorization/navigation
Suspense       → code loading
ErrorBoundary  → loading failure/recovery
Page           → feature behavior
```

## 13. Lazy Loading Heavy Blog Features

Optional features are good candidates for component-level splitting:

```jsx
const MarkdownPreview = lazy(() => import("./MarkdownPreview"));
const RichTextEditor = lazy(() => import("./RichTextEditor"));
```

For example, the editor can load only when the author opens the create/edit screen.

This applies the Day 47 principle: split at a meaningful product boundary rather than splitting every small component.

## 14. Navigation and Relative Links

Inside nested routes, relative navigation keeps route structure easier to maintain:

```jsx
<Link to="../">Back</Link>
```

Or use an absolute path when the destination is intentionally global:

```jsx
<Link to="/blog">All posts</Link>
```

Choose deliberately rather than mixing styles randomly.

## 15. Not-Found Handling

There are two different not-found cases.

### Unknown application URL

```jsx
<Route path="*" element={<NotFoundPage />} />
```

### Known route but missing resource

```text
/blog/does-not-exist
       ↓
valid route pattern
       ↓
post lookup returns null
       ↓
Post not found UI
```

Do not confuse a route-level 404 with a missing resource inside a valid route.

## 16. Search and Filtering Extension

As an optional enhancement, support a query parameter:

```text
/blog?search=react
```

Use `useSearchParams`:

```jsx
import { useSearchParams } from "react-router-dom";

const [searchParams, setSearchParams] = useSearchParams();
const search = searchParams.get("search") ?? "";
```

This gives search the same shareable/refresh-safe properties as category URLs.

For larger applications, debounce user input before updating a server-backed query.

## 17. Pagination Extension

The project can also support:

```text
/blog?page=2
```

or cursor-based APIs for large datasets.

For a real CMS, cursor pagination is often preferable for continuously changing large collections because it avoids some of the consistency problems of offset pagination.

## 18. Accessibility Requirements

The project should not be considered complete without basic accessibility:

- use semantic `article`, `header`, `nav`, and `main` elements
- provide descriptive link text
- preserve visible focus indicators
- use `aria-current` through `NavLink` where appropriate
- announce important loading states with `role="status"`
- expose failures with `role="alert"`
- ensure keyboard users can navigate the blog and forms
- do not use color alone to communicate category/status

When a route changes, ensure the user can understand where they are. A production application may also manage focus intentionally after navigation.

## 19. Error Boundary for Lazy Features

A lazy-loaded editor or admin feature can fail because of network/deployment problems.

Use an Error Boundary around the feature and provide recovery UI:

```jsx
class FeatureErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <section role="alert">
          <h2>Feature could not be loaded</h2>
          <button onClick={() => window.location.reload()}>
            Reload
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}
```

Avoid infinite automatic retries. Production applications should also log the failure for diagnosis.

## 20. Testing Strategy

Test the user journeys rather than internal route implementation details.

### Public flows

- `/blog` renders posts
- clicking a post opens `/blog/:postId`
- category navigation opens the correct filtered view
- invalid post IDs show resource-not-found UI
- unknown application URLs show the route 404

### Protected flows

- unauthenticated users are redirected to login
- authenticated users can open admin
- unauthorized roles see forbidden UI
- create/edit pages are not exposed as secure APIs merely because the route is protected

### Lazy-loading flows

- admin code is loaded when needed
- loading UI appears when the feature is delayed
- failed lazy import shows recovery UI

Use `MemoryRouter` or a suitable test router for deterministic navigation tests.

## 21. Hands-on Tasks

### Task 1 — Build the Public Blog

Implement:

```text
/blog
/blog/category/:slug
/blog/:postId
```

Acceptance:

- reusable post cards
- category links
- detail links
- invalid post fallback

### Task 2 — Add Admin Routing

Implement:

```text
/blog/admin
/blog/admin/new
/blog/admin/edit/:postId
```

Acceptance:

- protected route
- nested admin layout
- unauthorized redirect
- forbidden state if role checks are included

### Task 3 — Add Lazy Loading

Lazy-load:

- admin area
- rich editor
- optional preview

Acceptance:

- meaningful Suspense boundaries
- no unnecessary initial download
- loading UI remains accessible

### Task 4 — Add API Simulation

Replace synchronous mock lookup with an async function that can produce:

```text
success
loading
empty
404
500/network error
```

### Task 5 — Add Search

Implement:

```text
/blog?search=react
```

Keep the query in the URL so the filtered page is shareable.

### Task 6 — Performance Review

Compare the application before and after lazy loading:

```text
Initial JS transfer
Admin chunk size
Editor chunk size
Navigation time
Number of requests
```

Document whether the optimization was worthwhile.

## 22. Assessment Quiz

1. Why should category selection be represented in the URL?
2. What is the difference between `/blog/*` not-found handling and a missing post?
3. Why should admin routes be protected?
4. Does a protected React route secure a backend mutation?
5. What should `Suspense` handle?
6. What should an Error Boundary handle for a lazy feature?
7. Why is the admin/editor a good lazy-loading candidate?
8. What is the difference between loading and empty state?
9. Why should API access be separated from route components?
10. How would you verify that lazy loading improved the project?

### Answers

1. URLs are shareable, bookmarkable, refresh-safe, and directly navigable.
2. One is an unknown application route; the other is a valid route whose requested resource does not exist.
3. To prevent unauthorized users from entering protected UI flows.
4. No. The backend must independently enforce authentication and authorization.
5. The temporary suspended/loading UI while lazy code becomes available.
6. Rendering/recovery behavior for failures such as rejected lazy imports.
7. They may be large and used by a smaller subset of users.
8. Loading means work is still in progress; empty means the operation succeeded but there is nothing to display.
9. It improves separation of concerns and makes API replacement/testing easier.
10. Compare production bundle output, transfer size, request timing, feature navigation latency, and user-facing performance.

## 23. Interview Questions

### Beginner

**How do you create a blog detail route?**

Use a dynamic route such as `/blog/:postId` and read the parameter with `useParams()`.

**Why use `Link` instead of a normal anchor for internal navigation?**

`Link` integrates with client-side routing and avoids unnecessary full-page document navigation.

### Intermediate

**Why is a category in the URL better than only component state?**

The view becomes shareable, bookmarkable, refresh-safe, and directly addressable.

**How would you handle a post that no longer exists?**

Treat it as a resource-not-found state and provide useful navigation back to the blog.

**Where should authentication logic live?**

A shared auth/session layer and route guard can control UI navigation, while the backend independently enforces permissions.

### Advanced

**How would you evolve this project into a CMS?**

Replace mock data with an API/repository layer, add server-side authorization, validation, persistence, pagination/search, media handling, draft/publish states, and observability without changing the core route contract unnecessarily.

**How would you optimize a blog with thousands of posts?**

Use server-side pagination/search/filtering, cache appropriate responses, lazy-load heavy features, optimize images, and measure real user performance.

**How would you handle stale lazy chunks after deployment?**

Use content-hashed assets and appropriate cache policies, monitor chunk failures, and provide controlled reload/recovery for stale clients.

**How would you separate authentication from authorization?**

Authentication establishes who the user is; authorization determines what that user is allowed to do. Both must be enforced server-side for protected operations.

## 24. Production Checklist

- [ ] Public blog routes are clearly separated from admin routes.
- [ ] Nested layouts use `Outlet` correctly.
- [ ] Dynamic parameters are validated/normalized.
- [ ] Category/search state is represented in URLs where appropriate.
- [ ] Loading, error, empty, not-found, and forbidden states are distinct.
- [ ] API/data access is separated from presentation where practical.
- [ ] Admin UI is protected by authentication/authorization checks.
- [ ] Backend APIs independently enforce permissions.
- [ ] Admin/editor features are lazy-loaded when justified.
- [ ] Suspense boundaries are local enough to preserve stable UI.
- [ ] Lazy chunk failures have recovery behavior.
- [ ] Accessibility basics are implemented.
- [ ] Navigation and critical user journeys are tested.
- [ ] Production bundle/performance measurements are recorded.
- [ ] Heavy images/content are optimized as part of the overall performance review.

## Final Project Extension — Editorial Platform

Turn the blog into a small editorial platform with:

```text
Public
├── Blog home
├── Category pages
├── Search
├── Post detail

Author
├── Dashboard
├── Create post
├── Edit post
├── Drafts

Admin
├── User management
├── Category management
└── Content moderation
```

Additional requirements:

- role-aware route boundaries
- lazy-loaded author/admin features
- API-backed data layer
- draft/published state
- pagination
- search query parameters
- optimistic UI only where rollback is well-defined
- error logging
- accessibility review
- production performance report

## Final Acceptance Criteria

- [ ] Blog route hierarchy is implemented cleanly.
- [ ] Dynamic post routes work with valid and invalid IDs.
- [ ] Category filtering is URL-driven.
- [ ] Nested blog/admin layouts work with `Outlet`.
- [ ] Protected routes handle unauthenticated users correctly.
- [ ] Authorization is not trusted solely on the client.
- [ ] Admin/editor features are lazy-loaded appropriately.
- [ ] Suspense and Error Boundary responsibilities are understood.
- [ ] Loading, error, empty, not-found, and forbidden states are distinct.
- [ ] API access can replace mock data without redesigning every page.
- [ ] Accessibility requirements are addressed.
- [ ] Core navigation journeys have tests.
- [ ] Performance has been measured rather than assumed.

## Self Check

- [ ] I can design the blog route hierarchy.
- [ ] I can build dynamic post details.
- [ ] I can create URL-driven category filtering.
- [ ] I can use nested layouts with `Outlet`.
- [ ] I can protect author/admin routes.
- [ ] I can lazy-load heavy features.
- [ ] I can distinguish loading/error/empty/not-found/forbidden states.
- [ ] I can separate UI routing from backend security.
- [ ] I can test the major blog user journeys.
- [ ] I can measure whether code splitting helped.

## Day 48 Outcome

You now have a complete project that integrates the routing and performance concepts from Days 41–47 into one production-oriented React application. You can move from mock data toward a real API/CMS while preserving the route architecture and user experience.

**Next:** Day 49 — Project Review, Refactoring, Testing and Production Hardening.
