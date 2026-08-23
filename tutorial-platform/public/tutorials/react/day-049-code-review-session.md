---
title: Code Review Session
slug: day-049-code-review-session
dayLabel: Day 49
level: Advanced
estimatedMinutes: 180
order: 49
track: react
---
# Day 49 [Advanced]: Code Review Session — From Finding Issues to Production-Ready Fixes

## Goal

Perform a realistic, risk-first code review of the Day 48 Blog App and learn how experienced React engineers evaluate correctness, architecture, state flow, performance, accessibility, testing, security boundaries, and maintainability.

This is **not a theory-only review checklist**. You will inspect intentionally flawed code, identify issues, classify severity, propose fixes, validate the fixes, and produce a review summary suitable for a real pull request.

## Prerequisites

- Day 41–47: routing, protected routes, lazy loading, and code splitting
- Day 48: Mini Project — Production-Ready Blog App
- React hooks: `useState`, `useEffect`, `useMemo`, `useCallback`
- Basic testing knowledge
- Basic browser DevTools knowledge

## Learning Outcomes

By the end of this session, you can:

- review React code using a repeatable risk-first process
- distinguish blocking defects from non-blocking suggestions
- identify route, state, effect, and rendering bugs
- detect incorrect hook dependencies and stale closures
- review memoization without blindly adding `useMemo` or `useCallback`
- identify unnecessary state and duplicated derived state
- evaluate component boundaries and data ownership
- review loading, error, empty, forbidden, and not-found states
- inspect accessibility and keyboard behavior
- identify client-side security misconceptions
- evaluate lazy loading and bundle boundaries
- identify missing tests and weak test assertions
- write constructive, actionable review comments
- validate fixes instead of approving based only on code appearance
- produce a concise engineering-quality review report

---

# 1. Code Review Mindset

A strong review asks:

```text
Does it work?
    ↓
Is it correct for edge cases?
    ↓
Is the design understandable?
    ↓
Is the state/data flow sound?
    ↓
Is the performance justified?
    ↓
Is it accessible?
    ↓
Is it tested?
    ↓
Is it safe in production?
```

Do not start with formatting preferences. Start with **risk**.

### Recommended priority

| Priority | Review focus | Example |
|---|---|---|
| P0 | Security/data loss/outage risk | Client-only authorization for mutation |
| P1 | Functional defect | Invalid route crashes the page |
| P1 | Data/state correctness | Stale effect or incorrect dependency |
| P1 | Serious UX/accessibility failure | Keyboard user cannot submit form |
| P2 | Performance/maintainability | Unnecessary expensive work |
| P3 | Style/preference | Naming or formatting suggestion |

Severity labels are team-dependent. The important principle is to make **impact and urgency explicit**.

---

# 2. Review Workflow

Use the following workflow for every review:

```text
1. Understand requirement
        ↓
2. Read route/data architecture
        ↓
3. Trace user journey
        ↓
4. Find correctness issues
        ↓
5. Inspect state/effects
        ↓
6. Inspect performance
        ↓
7. Inspect accessibility/security
        ↓
8. Inspect tests
        ↓
9. Suggest maintainability improvements
        ↓
10. Validate fixes
        ↓
11. Approve / request changes
```

### Before commenting

Ask:

- What behavior is the feature supposed to provide?
- What changed?
- What assumptions does the code make?
- Which user journeys are affected?
- What happens with invalid, slow, empty, or failed data?

---

# 3. Review Comments: Good vs Weak

### Weak

> This is not clean. Please refactor.

The author does not know what is wrong or why it matters.

### Better

> This component performs the filtering during every render. When the post list grows, typing in the search box can cause unnecessary work. Could we either derive this value directly when inexpensive, or memoize it if profiling confirms the computation is expensive?

This comment explains:

```text
Problem → Impact → Suggested direction
```

### Avoid comments that are:

- personal
- vague
- unnecessarily absolute
- unrelated to the feature
- style-only when tooling can enforce the rule

---

# 4. Correctness Review

Correctness is the first technical gate.

## Example: Unsafe route parameter handling

Problematic code:

```jsx
function PostDetails({ posts, id }) {
  const post = posts.find((p) => p.id === Number(id));
  return <h3>{post.title}</h3>;
}
```

If `post` is missing, the render crashes.

Better:

```jsx
function PostDetails({ posts, id }) {
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return <p>Post not found.</p>;
  }

  return <h3>{post.title}</h3>;
}
```

If the application uses string IDs or slugs, do not convert them to numbers unnecessarily.

### Review questions

- What happens for an invalid ID?
- What happens if data is `null`?
- What happens if an API returns an unexpected shape?
- What happens when a user refreshes a nested route?
- What happens when a request fails halfway through navigation?

---

# 5. State Review

One of the most valuable review skills is identifying **state that should not be state**.

Problem:

```jsx
const [filteredPosts, setFilteredPosts] = useState([]);

useEffect(() => {
  setFilteredPosts(
    posts.filter((post) => post.title.includes(query))
  );
}, [posts, query]);
```

If `filteredPosts` can be calculated synchronously from `posts` and `query`, storing it separately creates another state transition.

Prefer:

```jsx
const filteredPosts = posts.filter((post) =>
  post.title.toLowerCase().includes(query.toLowerCase())
);
```

If the calculation is genuinely expensive, measure first and then consider:

```jsx
const filteredPosts = useMemo(() => {
  return expensiveFilter(posts, query);
}, [posts, query]);
```

### Review rule

> Do not use `useMemo` merely because a calculation exists. Use it when referential stability or measured expensive computation justifies it.

---

# 6. Effect and Dependency Review

Effects are a common source of subtle bugs.

Problem:

```jsx
useEffect(() => {
  fetchPosts(category);
}, []);
```

If `category` can change, the effect may continue using the initial value.

Better:

```jsx
useEffect(() => {
  fetchPosts(category);
}, [category]);
```

### Review questions

- Is the effect actually needed?
- Is it synchronizing with an external system?
- Are all reactive values represented in dependencies?
- Can the effect race with another request?
- Is cleanup required?
- Does the effect update state that could create a loop?

Do not suppress dependency warnings without understanding the underlying data flow.

---

# 7. Async Request Review

A reviewer should inspect more than the happy path.

```jsx
useEffect(() => {
  let cancelled = false;

  async function loadPost() {
    setLoading(true);
    setError(null);

    try {
      const result = await getPost(postId);

      if (!cancelled) {
        setPost(result);
      }
    } catch (error) {
      if (!cancelled) {
        setError(error);
      }
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  }

  loadPost();

  return () => {
    cancelled = true;
  };
}, [postId]);
```

For real fetch requests, `AbortController` can provide actual cancellation:

```jsx
const controller = new AbortController();

fetch(`/api/posts/${postId}`, {
  signal: controller.signal,
});

return () => controller.abort();
```

### Review

Check for:

- race conditions
- stale responses
- state updates after obsolete requests
- missing loading reset
- swallowed errors
- retry behavior
- cancellation where appropriate

---

# 8. Rendering and Component Boundary Review

Large components are not automatically bad. The question is whether the component has too many unrelated responsibilities.

A component such as:

```text
BlogPage
├── fetches data
├── manages authentication
├── manages filters
├── renders navigation
├── renders cards
├── renders editor
├── handles analytics
└── formats every data structure
```

may be difficult to reason about.

A better boundary could be:

```text
BlogPage
├── BlogFilters
├── PostList
│   └── PostCard
└── BlogStatus
```

### Review questions

- Does this component have one clear responsibility?
- Can a child component be tested independently?
- Is data ownership obvious?
- Are props becoming difficult to understand?
- Is a component being extracted only to make the file shorter?

Do not split components mechanically. Extract around **behavior, responsibility, reuse, or testability**.

---

# 9. Props and Data Flow Review

Watch for unnecessary prop drilling and unclear ownership.

Problem:

```text
App
 ↓
Blog
 ↓
Page
 ↓
List
 ↓
Card
 ↓
Button
```

If only the button needs an action, passing many unrelated values through every layer is a smell.

But do not introduce Context merely to avoid two levels of props.

Review whether the data is:

- local state
- shared state
- server state
- URL state
- derived data

Each category has different ownership implications.

---

# 10. Performance Review

Performance review should be evidence-driven.

Look for:

- unnecessary renders
- expensive work during render
- large lists without virtualization when needed
- unnecessarily large initial bundles
- duplicate network requests
- large images
- eager loading of rarely used features
- unstable props that defeat memoization

### Do not automatically approve this:

```jsx
const handleClick = useCallback(() => {
  savePost(post);
}, [post]);
```

`useCallback` is useful when its referential stability matters, such as passing a callback to a memoized child or satisfying another optimization boundary.

Otherwise it can add complexity without measurable benefit.

### Review performance using measurements

```text
Before
├── initial JS
├── request count
├── render duration
└── interaction latency

After
├── initial JS
├── request count
├── render duration
└── interaction latency
```

Use browser DevTools and production-oriented measurements rather than assumptions.

---

# 11. Code Splitting Review

Day 47 introduced code splitting. Day 49 reviews whether it was applied sensibly.

Good candidate:

```jsx
const AdminDashboard = lazy(() => import("./AdminDashboard"));
```

Potentially poor candidate:

```jsx
const TinyLabel = lazy(() => import("./TinyLabel"));
```

The goal is not maximum chunk count.

The goal is a useful balance between:

```text
initial payload
+
feature demand
+
network overhead
+
caching
```

### Review questions

- Is the feature rarely used?
- Is the chunk meaningfully large?
- Is there a stable loading boundary?
- Is the loading state acceptable?
- Is prefetching appropriate?
- Did the change actually improve measured performance?

---

# 12. Routing Review

For the Day 48 blog app, review:

```text
/blog
/blog/category/:slug
/blog/:postId
/blog/admin
/blog/admin/new
/blog/admin/edit/:postId
```

Check:

- route ordering
- dynamic parameter handling
- nested layouts
- relative links
- unknown routes
- resource-not-found handling
- protected boundaries
- lazy-loaded boundaries

A valid route pattern with a missing post is not the same as an unknown application URL.

---

# 13. Protected Route and Security Review

This is a critical distinction:

```text
React ProtectedRoute
        ↓
Controls UI/navigation
```

versus:

```text
Backend authorization
        ↓
Protects actual data/mutations
```

A reviewer should flag code such as:

```jsx
if (user.role === "admin") {
  await fetch("/api/posts", { method: "DELETE" });
}
```

if the backend assumes the client-side role check is sufficient.

The server must independently verify:

- identity
- session/token validity
- permission/role
- resource ownership where applicable

Never approve a security-sensitive mutation solely because the React route is protected.

---

# 14. Accessibility Review

Review accessibility as functionality, not decoration.

Check:

- semantic HTML
- keyboard navigation
- visible focus
- button/link semantics
- labels for form controls
- meaningful headings
- status announcements
- error announcements
- sufficient interaction targets
- no information conveyed only by color

Example:

```jsx
<p role="status">Loading posts...</p>
```

For errors:

```jsx
<p role="alert">Unable to load posts.</p>
```

Also check that keyboard users can reach and operate the same functionality as pointer users.

---

# 15. Error, Empty, Loading and Forbidden States

Review each async screen against this matrix:

| State | Expected behavior |
|---|---|
| Loading | Explain that content is being loaded |
| Success | Render expected data |
| Empty | Explain that there is no data |
| Not found | Explain that requested resource does not exist |
| Error | Explain failure and recovery option |
| Forbidden | Explain lack of permission |

A common review comment is:

> The API failure currently renders an empty list, which makes a network error look like “no posts.” Please preserve a distinct error state so users know the difference and can retry.

---

# 16. Forms and Validation Review

For create/edit forms, inspect:

- controlled vs uncontrolled strategy
- required fields
- client-side validation
- server-side validation handling
- disabled/submitting state
- duplicate submission prevention
- error placement
- keyboard submission
- unsaved changes behavior where applicable

Example:

```jsx
<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? "Saving..." : "Save post"}
</button>
```

Client-side validation improves UX; it does not replace server-side validation.

---

# 17. Testing Review

Do not measure test quality only by line coverage.

Review whether tests verify behavior.

### Important Day 48 journeys

```text
Blog home
   ↓
Open post
   ↓
Valid details

Blog home
   ↓
Invalid post
   ↓
Not found

Blog
   ↓
Admin
   ↓
Unauthenticated
   ↓
Login

Admin
   ↓
Lazy feature
   ↓
Loading
   ↓
Loaded
```

### Good test

```jsx
expect(screen.getByRole("heading", {
  name: /post not found/i,
})).toBeInTheDocument();
```

This tests user-visible behavior.

Avoid tests that only assert an implementation detail such as a private state variable.

---

# 18. Intentional Review Exercise — Flawed Blog Component

Review this code before reading the solution:

```jsx
function BlogPage({ posts, query, user }) {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFilteredPosts(
      posts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, []);

  const handleDelete = async (id) => {
    if (user?.role === "admin") {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {filteredPosts.map((post) => (
        <div onClick={() => window.location.href = `/blog/${post.id}`}>
          {post.title}
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}
```

### Review it first

Find at least **8 issues** before checking the solution.

---

# 19. Review Solution

### Issue 1 — Stale dependency list

```jsx
useEffect(..., []);
```

`posts` and `query` are used but not represented in the dependency list.

Also, the effect may be unnecessary because filtering is derived data.

### Issue 2 — Derived data stored as state

```jsx
const [filteredPosts, setFilteredPosts] = useState([]);
```

Prefer deriving it directly unless there is a demonstrated reason to store it.

### Issue 3 — Loading state is never managed

`setLoading` exists but is never used to represent actual asynchronous work.

Remove it or implement a real request lifecycle.

### Issue 4 — Client-only authorization

The role check controls the button behavior but does not secure the backend endpoint.

The API must authorize the delete operation.

### Issue 5 — Native navigation for internal route

```jsx
window.location.href = `/blog/${post.id}`;
```

Use React Router navigation for client-side routes.

### Issue 6 — Button click bubbles to the parent

Clicking Delete can also trigger the parent navigation.

This can produce a confusing user experience and possibly navigate away while deleting.

### Issue 7 — Missing semantic structure

A clickable `div` is being used as navigation.

Use a `Link` for route navigation.

### Issue 8 — Missing key

The mapped list should have a stable key:

```jsx
key={post.id}
```

### Issue 9 — Missing error handling

Delete failures are ignored.

The user needs a useful failure state.

### Issue 10 — Missing disabled/submitting behavior

Repeated delete clicks could trigger duplicate requests.

### Issue 11 — Accessibility concerns

A clickable `div` is not keyboard-equivalent to a link.

### Issue 12 — Review lacks tests

Important behaviors such as invalid routes, delete failure, and authorization need tests.

---

# 20. Improved Version

One possible refactor:

```jsx
import { Link } from "react-router-dom";

function BlogPage({ posts, query, onDelete }) {
  const normalizedQuery = query.trim().toLowerCase();

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(normalizedQuery)
  );

  return (
    <main>
      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {filteredPosts.map((post) => (
            <li key={post.id}>
              <Link to={`/blog/${post.id}`}>{post.title}</Link>
              <button
                type="button"
                onClick={() => onDelete(post.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
```

The example intentionally moves authorization and mutation behavior outside the presentation component. A real implementation should also model deletion loading/error states and rely on backend authorization.

---

# 21. Code Review Lab

## Lab 1 — Correctness

Find at least five correctness defects in a deliberately flawed blog page.

Deliver:

```text
Issue
Severity
Why it matters
Suggested fix
Test case
```

## Lab 2 — Hooks

Review a component containing:

- unnecessary effect
- missing dependency
- stale closure
- expensive calculation

For each issue, explain whether the fix should be:

- remove effect
- fix dependencies
- restructure state
- memoize after measurement

## Lab 3 — Routing

Review a route tree containing:

- incorrect nesting
- missing `Outlet`
- broken dynamic parameter
- unhandled route 404
- resource 404

Document each issue.

## Lab 4 — Security

Review a client-only admin implementation and explain why it is insufficient.

## Lab 5 — Performance

Use DevTools to identify:

- unnecessary network request
- expensive render
- oversized chunk
- unnecessary initial dependency

Record evidence before proposing optimization.

## Lab 6 — Accessibility

Keyboard-test the project:

- navigation
- category links
- post links
- forms
- buttons
- loading/error announcements

Record at least three findings.

---

# 22. Pull Request Review Template

Use this template for future reviews:

```text
## Summary
What does this PR change?

## Blocking Issues
- [P0/P1] Issue

## Functional Issues
- [P1] Issue

## Performance
- [P2] Issue / measurement

## Accessibility
- [P1/P2] Issue

## Testing
- Missing scenario

## Maintainability
- Improvement suggestion

## Positive Notes
- What is implemented well

## Validation
- Tests run
- Manual scenarios checked
- Performance evidence checked

## Decision
- Approve
- Request changes
- Comment only
```

---

# 23. Mini Exercise

Review the Day 48 Blog App and find **at least 10 issues** across these categories:

- correctness
- state/effects
- routing
- performance
- accessibility
- security
- testing
- maintainability

For every issue, provide:

```text
ID
Severity
Location
Problem
Impact
Recommended fix
Validation method
```

Then fix the top five issues and re-run the relevant tests.

---

# 24. Assessment Quiz

### Questions

1. What should normally be prioritized before style feedback?
2. Why can derived data be problematic when stored as state?
3. When should `useMemo` be introduced?
4. What is a stale closure?
5. Why does a client-side protected route not secure an API?
6. What is the difference between route 404 and resource 404?
7. Why should loading and error states remain distinct?
8. Why can excessive code splitting hurt performance?
9. What makes a review comment actionable?
10. Why is behavioral testing stronger than implementation-detail testing?
11. What should a reviewer inspect for async effects?
12. Why should accessibility be part of correctness?

### Answers

1. Functional correctness, security, data integrity, and serious user-impacting issues.
2. It creates extra synchronization and can become stale relative to the source values.
3. When referential stability or expensive computation is actually justified, preferably with measurement.
4. A function or effect uses a value captured from an older render instead of the current value.
5. The browser can be manipulated; only server-side authorization can enforce access to protected data and mutations.
6. Route 404 means the URL does not match an application route; resource 404 means a valid route points to a missing resource.
7. A failed request is different from a successful request that returned no data.
8. Too many small chunks can increase request and loading overhead and create unnecessary complexity.
9. It identifies the issue, explains impact, and gives a clear direction for improvement.
10. It verifies user-visible behavior and remains more resilient to implementation refactors.
11. Dependencies, cancellation/races, error handling, loading cleanup, and obsolete response handling.
12. If users cannot perceive or operate a feature, it is functionally incomplete for those users.

---

# 25. Interview Questions

## Beginner

**Why is code review important?**

It catches defects early, improves maintainability, shares engineering knowledge, and creates consistent quality standards.

**What should a useful review comment contain?**

A concrete problem, its impact, and a practical improvement direction.

## Intermediate

**How do you review a React component?**

Start with expected behavior, then inspect data flow, state, effects, rendering, edge cases, accessibility, performance, and tests.

**Why should derived data usually not be duplicated in state?**

Duplicated state introduces synchronization problems and additional updates.

**When is `useCallback` useful?**

When callback identity matters to an optimization or dependency boundary; it should not be added mechanically.

## Advanced

**How would you review a large React PR?**

Understand the requirement first, trace major user journeys, review high-risk behavior, inspect architecture and state flow, then evaluate performance, accessibility, security, tests, and maintainability. Finally validate fixes and summarize remaining risk.

**How would you identify a real performance problem rather than a theoretical one?**

Measure with profiling and browser/network performance data, reproduce the issue, apply the smallest justified optimization, and compare before/after results.

**How would you review a protected admin feature?**

Verify client-side navigation and UX protection, but also verify that the backend independently authenticates and authorizes every protected operation.

**What makes a code review mature?**

Risk-based prioritization, evidence-driven recommendations, constructive communication, automated checks where possible, and validation after fixes.

---

# 26. Production Review Checklist

### Correctness

- [ ] Main user journeys work
- [ ] Invalid input is handled
- [ ] Async failures are handled
- [ ] Race conditions are considered
- [ ] No obvious data-loss path exists

### React

- [ ] State has clear ownership
- [ ] Derived data is not unnecessarily duplicated
- [ ] Effects synchronize with external systems only when needed
- [ ] Dependencies are correct
- [ ] Keys are stable
- [ ] Component boundaries are understandable

### Routing

- [ ] Dynamic routes are safe
- [ ] Nested layouts render correctly
- [ ] Unknown routes are handled
- [ ] Missing resources are handled
- [ ] Protected routes have clear behavior

### Performance

- [ ] Expensive work is measured
- [ ] No unnecessary memoization
- [ ] Large features are split where justified
- [ ] Images/assets are considered
- [ ] Network behavior is understood

### Security

- [ ] Client guards are not treated as backend security
- [ ] Sensitive mutations are server-authorized
- [ ] User input is validated server-side

### Accessibility

- [ ] Keyboard navigation works
- [ ] Semantic elements are used
- [ ] Forms have labels
- [ ] Focus is visible
- [ ] Status/errors are announced appropriately

### Testing

- [ ] Critical journeys have tests
- [ ] Edge cases have tests
- [ ] Error states have tests
- [ ] Protected routes have tests
- [ ] Lazy-loading failure is considered where relevant

---

# 27. Final Project — Perform a Real Code Review

Use the **Day 48 Blog App** as the review target.

Create a review report containing:

```text
1. Architecture summary
2. Top 10 findings
3. Severity for each finding
4. Evidence / reproduction steps
5. Recommended fixes
6. Tests added or missing
7. Performance observations
8. Accessibility observations
9. Security observations
10. Final recommendation
```

### Required quality bar

Do not submit comments such as:

```text
"Improve this"
"Refactor"
"Not clean"
"Use best practice"
```

Instead write:

```text
Problem
→ Why it matters
→ Concrete recommendation
→ How to validate the fix
```

---

# 28. Day 49 Outcome

You can now perform a structured, production-oriented React code review instead of reviewing only formatting and syntax.

You can:

- identify high-impact correctness issues
- review state and effect behavior
- evaluate component boundaries
- detect unnecessary memoization
- review routing and protected areas
- distinguish client UX protection from backend security
- evaluate loading/error/empty/not-found states
- inspect accessibility
- identify testing gaps
- evaluate code splitting using evidence
- write actionable review comments
- validate fixes before approval

## Next

**Day 50 — Redux / Redux Toolkit Introduction and Global State Architecture**
