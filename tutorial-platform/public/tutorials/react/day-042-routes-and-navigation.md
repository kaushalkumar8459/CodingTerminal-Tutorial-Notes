---
title: Routes and Navigation
slug: day-042-routes-and-navigation
dayLabel: Day 42
level: Intermediate
estimatedMinutes: 150
order: 42
track: react
---
# Day 42 [Intermediate]: Routes and Navigation

## Goal

Build accessible, predictable navigation with React Router using `Link`, `NavLink`, `useNavigate`, navigation state, history navigation, relative routes, and route-aware UX patterns.

## Prerequisites

- Day 41: React Router setup
- `Routes`, `Route`, `BrowserRouter`
- Basic event handling and forms

## Learning Outcomes

By the end of this lesson, you can:

- choose `Link`/`NavLink` instead of unnecessary anchors
- use `useNavigate` for event-driven navigation
- pass and read transient navigation state
- distinguish URL state from navigation state
- use relative navigation safely
- understand browser history and `navigate(-1)` limitations
- preserve a post-login return location
- build accessible active navigation
- avoid navigation during render
- test navigation behavior
- distinguish navigation from authentication/authorization

## 1. Link vs Anchor

For internal application routes, use React Router's `Link`:

```jsx
import { Link } from "react-router-dom";

<Link to="/about">About</Link>
```

A normal anchor is still appropriate for external destinations or resources that should be handled by the browser:

```jsx
<a href="https://example.com">External site</a>
```

Avoid using `window.location` for ordinary internal navigation because it bypasses the normal SPA navigation model and can cause a full document navigation.

## 2. NavLink and Active State

`NavLink` is useful when the UI needs to indicate the current route:

```jsx
<NavLink
  to="/dashboard"
  className={({ isActive }) => (isActive ? "active" : undefined)}
>
  Dashboard
</NavLink>
```

It can also expose `isPending` in router configurations where pending navigation state is available:

```jsx
<NavLink
  to="/reports"
  className={({ isActive, isPending }) =>
    [isActive && "active", isPending && "pending"]
      .filter(Boolean)
      .join(" ")
  }
>
  Reports
</NavLink>
```

Do not rely on color alone for the active state. Provide a visible and/or semantic indicator suitable for keyboard and assistive-technology users.

## 3. Programmatic Navigation

Use `useNavigate` when navigation is a consequence of application logic, such as a successful form submission:

```jsx
import { useNavigate } from "react-router-dom";

function ContactForm() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    // After a real successful save/API response:
    navigate("/thank-you");
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Send</button>
    </form>
  );
}
```

Do not navigate before the operation that is supposed to justify the navigation has actually succeeded.

For ordinary clickable navigation, prefer `Link`/`NavLink` over a button that calls `navigate()`.

## 4. Navigation State

React Router can carry transient state with a navigation:

```jsx
navigate("/result", {
  state: { message: "Saved" },
});
```

A destination can read it with `useLocation`:

```jsx
import { useLocation } from "react-router-dom";

function ResultPage() {
  const location = useLocation();
  const message = location.state?.message;

  return <p>{message ?? "Result"}</p>;
}
```

Navigation state is useful for temporary UI context, but it should **not** be treated as durable application state or security-sensitive data.

For values that should survive refresh, deep links, bookmarks, and sharing, prefer representing the state in the URL when appropriate:

```text
/products?category=books
```

or as route parameters:

```text
/products/42
```

## 5. History Navigation

`navigate(-1)` moves backward one history entry:

```jsx
<button type="button" onClick={() => navigate(-1)}>
  Go Back
</button>
```

This does not mean "go to the application's previous page". It means "move one entry backward in the browser history".

Therefore, a reliable application may need an explicit fallback:

```jsx
function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) {
          navigate(-1);
        } else {
          navigate("/dashboard");
        }
      }}
    >
      Go Back
    </button>
  );
}
```

Choose the fallback according to the application's actual flow rather than assuming history always contains a useful internal page.

## 6. Relative Navigation

Nested routes often make relative navigation useful:

```jsx
navigate("settings");
```

Whether a path is resolved relative to the current route depends on the routing configuration and the navigation options being used. Prefer explicit route structure and test relative navigation in the actual nested route tree.

For a route-independent destination, an absolute path can be clearer:

```jsx
navigate("/settings");
```

## 7. Replace vs Push

Normal navigation adds a history entry:

```jsx
navigate("/success");
```

Sometimes an intermediate route should not remain in browser history:

```jsx
navigate("/dashboard", { replace: true });
```

A common example is replacing a temporary redirect page after a successful action. Use `replace` deliberately; overusing it can make expected browser Back behavior confusing.

## 8. Post-Login Return Location

A protected route may remember where the user intended to go:

```jsx
navigate("/login", {
  state: { from: location.pathname + location.search },
});
```

After successful authentication, the application can validate and navigate to an appropriate destination.

Do not blindly redirect to arbitrary external URLs supplied by user input. Validate return destinations against the application's allowed routes to avoid open-redirect vulnerabilities.

## 9. Accessibility and Navigation UX

Good navigation should provide:

- semantic links for navigation
- keyboard accessibility
- a clear active indicator
- descriptive link names
- visible focus styles
- a meaningful page heading
- appropriate focus management for significant route changes

Do not automatically steal focus on every minor UI transition. When implementing route-level focus management, move focus to an appropriate main heading or landmark after navigation and ensure the behavior is predictable for keyboard and assistive-technology users.

## 10. Authentication Is Not Navigation Security

This is an important production boundary.

A route redirect can improve UX:

```text
Private page → Login → intended page
```

But hiding a route or redirecting a user does **not** enforce authorization.

The backend must independently validate authentication and authorization for protected data and operations.

## 11. Complete Navigation Example

```jsx
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

export function Navigation() {
  return (
    <nav aria-label="Primary navigation">
      <Link to="/">Home</Link>
      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/reports"
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        Reports
      </NavLink>
    </nav>
  );
}

export function SaveForm() {
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    // const response = await saveData();
    // if (!response.ok) return;

    navigate("/result", {
      state: { message: "Saved successfully" },
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Save</button>
    </form>
  );
}

export function ResultPage() {
  const location = useLocation();

  return (
    <main>
      <h1>Result</h1>
      <p>{location.state?.message ?? "Completed"}</p>
    </main>
  );
}
```

## 12. Common Mistakes

### Using `<a>` for every internal route

This can cause unnecessary document navigation.

### Using `navigate()` for normal menu links

Use semantic links for navigation users initiate by clicking.

### Navigating before an API operation succeeds

Keep the success transition tied to the actual success result.

### Treating navigation state as persistent storage

Navigation state is not a substitute for URL state or application persistence.

### Putting secrets in navigation state

Never treat client-visible routing state as a secure storage mechanism.

### Assuming `navigate(-1)` always returns to your app

Browser history may contain an external page or may not contain a useful previous entry.

### Redirecting to arbitrary user-provided URLs

Validate allowed return paths to prevent open redirects.

### Calling navigation during render

Avoid patterns such as:

```jsx
// Bad
if (!user) {
  navigate("/login");
}
```

Use a route-guard pattern or declarative redirect appropriate to the router architecture instead of performing imperative navigation during render.

## 13. Hands-on Labs

### Lab 1 — Admin Navigation

Create:

```text
/dashboard
/reports
/settings
```

Requirements:

- `NavLink` for all sections
- active styling
- keyboard-accessible navigation
- clear navigation landmark

### Lab 2 — Form Success Flow

Build a form that:

1. validates input
2. performs a simulated async save
3. navigates only after success
4. passes a non-sensitive success message
5. displays the message on the result route

### Lab 3 — Return-to-Login Flow

Simulate a protected page redirecting to login with a return location. After successful login, navigate to a validated internal destination.

### Lab 4 — History and Replace

Demonstrate:

```jsx
navigate(-1);
navigate("/dashboard", { replace: true });
```

Explain the difference in browser history behavior.

### Lab 5 — URL vs Navigation State

Create one filter that is stored in the URL and one temporary success message stored in navigation state. Refresh the page and compare the behavior.

## 14. Debugging Scenarios

### Scenario A — Clicking a menu causes a full page reload

Check whether an internal destination is using `<a href>` instead of `Link`/`NavLink`.

### Scenario B — Active styling is wrong

Inspect the route path and whether nested-route matching is producing the intended `isActive` behavior.

### Scenario C — Success page shows no message after refresh

This is expected for transient navigation state. Move durable information into URL/application/server state when it needs to survive refresh.

### Scenario D — Back button goes somewhere unexpected

Remember that `navigate(-1)` follows browser history, not application semantics. Add an explicit fallback when necessary.

### Scenario E — Login redirect creates a security problem

Check whether a return URL is accepted blindly. Allow only validated internal destinations.

## 15. Testing Strategy

Test navigation as user-visible behavior rather than testing React Router internals.

Useful scenarios include:

- clicking a navigation link changes the visible page
- active navigation state is exposed correctly
- successful form submission navigates
- failed submission does not navigate
- navigation state is displayed when present
- invalid/missing navigation state has a safe fallback
- protected-route return destination is validated

Example with a router test environment:

```jsx
render(
  <MemoryRouter initialEntries={["/dashboard"]}>
    <Navigation />
  </MemoryRouter>
);
```

The exact router test utilities can vary with the React Router version and test setup; focus assertions on rendered behavior and URL/location outcomes.

## 16. Assessment

1. When should you use `Link` instead of an anchor?
2. What does `NavLink` add?
3. What is `useNavigate` intended for?
4. How is navigation state passed and read?
5. Why should sensitive information not be placed in navigation state?
6. What does `navigate(-1)` actually do?
7. What does `{ replace: true }` change?
8. Why might URL state be better than navigation state for filters?
9. What is an open redirect?
10. Does client-side navigation enforce authorization?

### Answers

1. For internal SPA navigation handled by the router.
2. Active/pending route awareness useful for navigation UI.
3. Programmatic navigation triggered by application logic.
4. Pass it with `navigate(..., { state })` and read it with `useLocation()`.
5. Client-side navigation state is not a secure secret store.
6. It moves one entry backward in browser history.
7. It replaces the current history entry instead of adding a new one.
8. URL state survives refresh and can be bookmarked/shared.
9. A redirect that sends a user to an attacker-controlled destination.
10. No. Authorization must be enforced by the backend.

## 17. Interview Questions

### Beginner

**What is the difference between `Link` and `<a>`?**

`Link` integrates with client-side routing for internal navigation; an anchor performs normal browser navigation.

**Why use `NavLink`?**

It provides route-aware active/pending state for navigation UI.

### Intermediate

**When should `useNavigate` be used?**

For navigation caused by application logic, such as a successful save, logout flow, or wizard transition.

**How do you pass temporary information during navigation?**

Use navigation state and read it with `useLocation()`.

**Why can `navigate(-1)` be unreliable as a business-level "back" action?**

Because it operates on browser history, which may contain entries outside the intended application flow.

### Advanced

**How would you implement a safe post-login redirect?**

Store the intended internal destination, validate it against allowed application routes, then navigate after successful authentication.

**When should filter state be stored in the URL instead of navigation state?**

When the state should survive refresh, be bookmarkable, shareable, or participate in deep linking.

**How do you improve navigation accessibility?**

Use semantic links, visible focus, meaningful names, active-state semantics, landmarks/headings, and carefully designed route-level focus management.

**Does a protected React route secure an API?**

No. The server must independently authenticate the request and authorize access to protected resources.

## 18. Production Checklist

- [ ] Internal navigation uses `Link`/`NavLink`.
- [ ] External navigation uses normal browser mechanisms where appropriate.
- [ ] `NavLink` active state is accessible and not color-only.
- [ ] Programmatic navigation happens in event/logic flows, not during render.
- [ ] Navigation occurs only after the operation that requires it succeeds.
- [ ] Transient navigation state is not treated as durable storage.
- [ ] Sensitive data is not placed in client navigation state.
- [ ] Durable/shareable filters and search state use URL state when appropriate.
- [ ] `replace` is used intentionally.
- [ ] Back navigation has sensible behavior for the application's flow.
- [ ] Return destinations are validated to prevent open redirects.
- [ ] Route transitions support keyboard and assistive-technology users.
- [ ] Backend authorization remains independent of client routing.
- [ ] Navigation behavior is covered by tests.

## Final Project

Build an admin portal navigation system:

```text
App
├── Sidebar
│   ├── Dashboard
│   ├── Reports
│   └── Settings
├── CreateReport
└── ReportSuccess
```

Requirements:

- `NavLink` sidebar with accessible active state
- create-report form
- navigate only after successful save
- success message passed as transient navigation state
- browser Back behavior
- `replace` demonstration
- one URL-based filter
- safe post-login return flow
- navigation tests

## Final Acceptance Criteria

- [ ] `Link` vs anchor choice is correct.
- [ ] `NavLink` active behavior is implemented.
- [ ] `useNavigate` is used for application-driven navigation.
- [ ] Navigation state is passed/read correctly.
- [ ] URL state vs navigation state is understood.
- [ ] History navigation behavior is understood.
- [ ] `replace` behavior is demonstrated.
- [ ] Accessibility considerations are implemented.
- [ ] Open-redirect risk is understood.
- [ ] Client routing is not treated as authorization.
- [ ] Navigation tests are included.
- [ ] Final project is completed.

## Self Check

- [ ] I know when to use `Link`.
- [ ] I know when to use `NavLink`.
- [ ] I can use `useNavigate` after successful application logic.
- [ ] I understand navigation state.
- [ ] I can explain URL state vs navigation state.
- [ ] I understand `navigate(-1)` and `replace`.
- [ ] I can design accessible navigation.
- [ ] I know how to avoid open redirects.
- [ ] I understand that routing does not provide backend authorization.

## Day 42 Outcome

You can now build accessible React Router navigation, use programmatic navigation appropriately, handle transient navigation state, reason about browser history, and design safer post-login and route-transition flows.

**Next:** Day 43 — Dynamic Routes and URL Parameters.
