---
title: React Router Setup
slug: day-041-react-router-setup
dayLabel: Day 41
level: Intermediate
estimatedMinutes: 150
order: 41
track: react
---
# Day 41 [Intermediate]: React Router Setup

## Goal

Build a production-minded client-side routing foundation with React Router: install and configure the router, define routes, create navigation, handle 404s, introduce layouts, understand nested routes, and prepare the application for scalable routing.

> This lesson uses React Router's declarative `<BrowserRouter>`, `<Routes>`, and `<Route>` APIs because they are a clear starting point for learning routing. React Router also provides data-router APIs; those are introduced later when loaders/actions and route-level data handling become the focus.

## Prerequisites

- Day 40 completed
- React components, props, state, and event handling
- Basic SPA concepts
- Familiarity with JSX and ES modules

## Learning Outcomes

By the end of this lesson, you can:

- explain client-side routing and browser history
- configure `BrowserRouter`
- define routes with `Routes` and `Route`
- navigate with `Link` and `NavLink`
- distinguish route elements from normal components
- create a wildcard 404 route
- create nested routes and shared layouts
- use an index route
- understand absolute vs relative route paths
- choose a sensible route ownership structure
- avoid common routing mistakes
- understand SPA deployment fallback requirements
- test routing behavior at the component level

## Index

- [1. What Client-Side Routing Solves](#1-what-client-side-routing-solves)
- [2. Install and Configure](#2-install-and-configure)
- [3. BrowserRouter](#3-browserrouter)
- [4. Routes and Route](#4-routes-and-route)
- [5. Navigation](#5-navigation)
- [6. Route Parameters Preview](#6-route-parameters-preview)
- [7. 404 and Fallback Routes](#7-404-and-fallback-routes)
- [8. Nested Routes and Layouts](#8-nested-routes-and-layouts)
- [9. Index Routes](#9-index-routes)
- [10. Route Organization](#10-route-organization)
- [11. SPA Deployment](#11-spa-deployment)
- [12. Accessibility and UX](#12-accessibility-and-ux)
- [13. Testing](#13-testing)
- [14. Common Mistakes](#14-common-mistakes)
- [15. Hands-on Labs](#15-hands-on-labs)
- [16. Debugging Scenarios](#16-debugging-scenarios)
- [17. Assessment](#17-assessment)
- [18. Interview Questions](#18-interview-questions)
- [19. Production Checklist](#19-production-checklist)
- [20. Final Project](#20-final-project)
- [Day 41 Outcome](#day-41-outcome)

## 1. What Client-Side Routing Solves

A traditional multi-page application requests a new HTML document for many navigations. A React SPA can keep the application shell loaded and let the router decide which UI should render for the current URL.

Conceptually:

```text
Browser URL
    ↓
React Router
    ↓
Match route
    ↓
Render route element
```

For example:

```text
/             → HomePage
/courses      → CoursesPage
/profile      → ProfilePage
/anythingelse → NotFoundPage
```

Client-side routing does **not** mean the server becomes irrelevant. The server still needs to serve the application entry point for direct navigation to a client-managed URL.

## 2. Install and Configure

For a browser-based React application, install the React Router package used by your project:

```bash
npm install react-router-dom
```

Keep the package version aligned with the React Router version selected by the project. Do not blindly copy a version number from an old tutorial.

A typical entry point is:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

### Why put the router near the root?

The router needs to provide routing context to components that use router APIs. Keeping one intentional browser router around the application avoids accidentally creating isolated routing contexts.

## 3. BrowserRouter

`BrowserRouter` connects React Router to the browser's History API and the current URL.

```jsx
import { BrowserRouter } from "react-router-dom";

<BrowserRouter>
  <App />
</BrowserRouter>;
```

### Important distinction

`BrowserRouter` does not define individual routes. It establishes the routing environment.

```text
BrowserRouter
     ↓
 routing context
     ↓
Routes / Route / Link / NavLink / hooks
```

### Common mistake

Do not wrap separate unrelated sections in multiple `BrowserRouter` instances just to make routing work. Usually there should be one intentional browser router for the application.

## 4. Routes and Route

`Routes` contains route definitions and selects the best matching route for the current location.

```jsx
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/courses" element={<CoursesPage />} />
    </Routes>
  );
}
```

A `Route` describes:

- the URL pattern
- the element to render when it matches
- optionally, nested child routes

### Route element vs component function

Prefer:

```jsx
<Route path="/about" element={<AboutPage />} />
```

Do not use a plain component name as the `element` value:

```jsx
// Wrong
<Route path="/about" element={AboutPage} />
```

The route expects a React element.

## 5. Navigation

Use router-aware links instead of ordinary anchors for internal SPA navigation.

```jsx
import { Link, NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav aria-label="Primary">
      <Link to="/">Home</Link>
      <Link to="/courses">Courses</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
}
```

`NavLink` is useful when the UI needs active-state styling:

```jsx
<NavLink
  to="/courses"
  className={({ isActive }) => (isActive ? "active" : undefined)}
>
  Courses
</NavLink>
```

### `Link` vs `<a>`

For an internal route:

```jsx
<Link to="/courses">Courses</Link>
```

For a real external URL:

```jsx
<a href="https://example.com">External site</a>
```

Do not turn every anchor into a router link. Choose based on whether navigation stays inside the application's routing boundary.

## 6. Route Parameters Preview

Dynamic paths can capture values from the URL:

```jsx
<Route path="/courses/:courseId" element={<CourseDetails />} />
```

A URL such as:

```text
/courses/react-101
```

can expose `react-101` as `courseId` to the route component using `useParams`:

```jsx
import { useParams } from "react-router-dom";

function CourseDetails() {
  const { courseId } = useParams();

  return <h1>Course: {courseId}</h1>;
}
```

Day 42 will go deeper into navigation, parameters, and route-driven UI.

## 7. 404 and Fallback Routes

Use a wildcard route for unmatched URLs:

```jsx
function NotFoundPage() {
  return (
    <main>
      <h1>404</h1>
      <p>We could not find that page.</p>
      <Link to="/">Return home</Link>
    </main>
  );
}

<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/courses" element={<CoursesPage />} />
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

The wildcard route should normally be the fallback rather than a broad route that unintentionally catches valid pages.

### 404 is not the same as a server 404

A client-side Not Found component handles an unmatched route **inside the SPA**. Your hosting/server configuration still needs to serve the SPA entry document for direct requests to known client routes.

## 8. Nested Routes and Layouts

Large applications often have shared UI around a group of pages.

```jsx
import { Outlet, Route, Routes } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}
```

`Outlet` marks where the matched child route renders.

Conceptually:

```text
AppLayout
├── Navigation
└── Outlet
     ├── HomePage
     ├── CoursesPage
     └── ProfilePage
```

### Why nested routes help

They let related routes share:

- navigation
- layout structure
- route-level UI boundaries
- feature ownership

They also reduce repeated layout markup.

## 9. Index Routes

An index route represents the default child content for its parent route.

```jsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="reports" element={<Reports />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

Then:

```text
/dashboard          → DashboardHome
/dashboard/reports  → Reports
/dashboard/settings → Settings
```

Inside child routes, relative paths are usually clearer:

```jsx
<Route path="reports" element={<Reports />} />
```

rather than repeating the parent prefix:

```jsx
<Route path="/dashboard/reports" element={<Reports />} />
```

## 10. Route Organization

For a small application, one route file can be perfectly reasonable:

```text
src/
├── App.jsx
├── routes.jsx
└── pages/
    ├── HomePage.jsx
    ├── CoursesPage.jsx
    └── ProfilePage.jsx
```

As the application grows, organize routes around features:

```text
src/
├── app/
│   └── router.jsx
├── features/
│   ├── courses/
│   │   ├── pages/
│   │   └── routes.jsx
│   └── profile/
│       ├── pages/
│       └── routes.jsx
└── layouts/
    └── AppLayout.jsx
```

There is no single mandatory folder structure. The goal is discoverability and clear route ownership.

### Route ownership principle

A feature should ideally own the routes that define its public UI surface.

Avoid a huge central file containing hundreds of unrelated route details if feature ownership would make the system easier to maintain.

## 11. SPA Deployment

A common production issue occurs when navigation works inside the application but refreshing a deep URL fails.

Example:

```text
https://app.example.com/courses/react
```

The browser sends a request to the server. If the server only knows about `/` and does not fall back to the SPA entry document, it may return a server-level 404 before React Router runs.

The deployment must therefore be configured so client-managed routes can resolve to the application's entry document.

The exact configuration depends on the hosting platform.

### Important distinction

```text
Client-side 404:
React Router matched no route.

Server-side 404:
The request never reached the React application.
```

Debug them separately.

## 12. Accessibility and UX

Routing is part of the user experience, not only URL matching.

### Navigation

Use semantic navigation:

```jsx
<nav aria-label="Primary">
  <NavLink to="/">Home</NavLink>
  <NavLink to="/courses">Courses</NavLink>
</nav>
```

### Active state

Do not rely only on color to communicate the active route. Use visible styling and an appropriate semantic indication.

### Page headings

Each page should have a useful primary heading:

```jsx
<main>
  <h1>Courses</h1>
</main>
```

### Navigation feedback

As routing becomes asynchronous or data-driven in later lessons, consider pending UI and focus management so keyboard and screen-reader users understand navigation changes.

## 13. Testing

Test routing as user-visible behavior rather than testing React Router internals.

A typical test can render the route tree with a memory-based router appropriate for the test environment:

```jsx
render(
  <MemoryRouter initialEntries={["/courses"]}>
    <AppRoutes />
  </MemoryRouter>
);

expect(screen.getByRole("heading", { name: /courses/i })).toBeInTheDocument();
```

For a link interaction:

```jsx
const user = userEvent.setup();

await user.click(screen.getByRole("link", { name: /courses/i }));

expect(screen.getByRole("heading", { name: /courses/i })).toBeInTheDocument();
```

The exact test-router utilities should follow the React Router and testing-library versions used by the project.

## 14. Common Mistakes

### Mistake 1 — Missing router context

Using `Link`, `Routes`, or routing hooks outside the appropriate router context causes runtime errors.

### Mistake 2 — Using `<a>` for every internal route

This can trigger full document navigation instead of SPA navigation.

### Mistake 3 — Forgetting the wildcard route

Unknown client URLs may produce an empty or confusing experience.

### Mistake 4 — Incorrect route element

```jsx
// Wrong
<Route path="/about" element={AboutPage} />
```

Use:

```jsx
<Route path="/about" element={<AboutPage />} />
```

### Mistake 5 — Duplicating layout markup

If multiple routes share the same shell, consider a layout route with `Outlet`.

### Mistake 6 — Over-centralizing routes

A giant route file becomes difficult to own and review as the application grows.

### Mistake 7 — Confusing client and server 404s

A hosting fallback problem cannot be fixed by adding another React Router wildcard route.

### Mistake 8 — Assuming routing provides authorization

A route existing in the browser does not grant permission to access protected data. Authorization must be enforced by the server/API as well.

## 15. Hands-on Labs

### Lab 1 — Company Website

Create:

```text
/
/about
/services
/contact
/*
```

Requirements:

- semantic navigation
- active navigation state
- dedicated page components
- accessible 404 page

### Lab 2 — Course Portal

Create:

```text
/dashboard
/dashboard/courses
/dashboard/profile
/dashboard/settings
```

Use a shared `DashboardLayout` and `Outlet`.

### Lab 3 — Course Details

Add:

```text
/courses/:courseId
```

Display the `courseId` with `useParams`.

### Lab 4 — Deployment Investigation

Build the SPA, open a deep route directly in the browser, and identify whether a failure is caused by React Router or hosting configuration.

### Lab 5 — Route Tests

Write tests for:

- home route
- courses route
- navigation click
- 404 route

## 16. Debugging Scenarios

### Scenario A — `Link` throws a router-context error

Check whether the component is rendered below `BrowserRouter` or another appropriate router provider.

### Scenario B — Clicking a navigation link reloads the page

Check whether an ordinary `<a href>` is being used for an internal route.

### Scenario C — `/courses` works, but refreshing `/courses/react` returns server 404

Check hosting fallback configuration. React Router cannot match a route if the browser never receives the SPA entry document.

### Scenario D — Child route replaces the whole layout

Check that the parent route renders `<Outlet />` and that the child route is nested under the intended parent.

### Scenario E — 404 catches a valid route

Inspect route paths, nesting, and the intended route hierarchy. Do not use overly broad paths to hide route-definition problems.

## 17. Assessment

1. What problem does client-side routing solve?
2. What is the role of `BrowserRouter`?
3. What do `Routes` and `Route` define?
4. Why is `Link` preferred for internal SPA navigation?
5. What does `path="*"` represent?
6. What is an index route?
7. What does `Outlet` do?
8. Why are nested routes useful?
9. Why can a direct deep-link refresh fail in production?
10. Why is a React Router route not an authorization boundary?
11. When should routes be split by feature?
12. What should routing tests verify?

### Answers

1. It maps browser locations to different UI without requiring a full document navigation for normal internal navigation.
2. It establishes browser/history-based routing context for the application.
3. They describe URL patterns and the elements that should render for matching locations.
4. It performs router-aware internal navigation without requiring a full document request.
5. A fallback route for locations that do not match the defined route tree.
6. The default child route rendered at its parent's URL.
7. It renders the currently matched child route inside a parent layout.
8. They provide shared layouts and clearer route hierarchy/ownership.
9. The server may not be configured to return the SPA entry document for the client-managed URL.
10. URL matching is a UI concern; the backend must enforce authentication and authorization for protected resources.
11. When route ownership and feature boundaries improve maintainability and discoverability.
12. User-visible route outcomes such as rendered pages, navigation, parameters, and fallback behavior.

## 18. Interview Questions

### Beginner

**What is React Router?**

A routing library for React applications that maps locations to UI and supports client-side navigation.

**What does `BrowserRouter` do?**

It provides browser-based routing context and integrates routing with the browser history/location APIs.

**What does a `Route` contain?**

A route pattern and the element/route configuration associated with a match.

### Intermediate

**Why use `Link` instead of an anchor for an internal route?**

`Link` performs router-aware client navigation, avoiding an unnecessary full document navigation.

**What is the purpose of a wildcard route?**

It provides a fallback for locations that do not match the application's route tree.

**What is a layout route?**

A parent route that renders shared UI and an `Outlet` where its matched child route appears.

### Advanced

**Why can a React Router SPA return a 404 after deployment even though the route is valid?**

The hosting server may reject the deep URL before the SPA loads. The server needs the appropriate fallback/rewrite configuration.

**How would you organize routes in a large application?**

Use meaningful route/layout boundaries and feature ownership rather than one enormous unrelated route file.

**Does a protected React route secure data?**

No. It can control UI access, but APIs and backend services must independently enforce authentication and authorization.

**When might you choose React Router data APIs instead of only declarative routes?**

When route-level loading, actions, pending states, errors, and data lifecycle are central to the application architecture. Those concepts will be covered in later lessons.

## 19. Production Checklist

- [ ] One intentional browser router is configured for the SPA.
- [ ] Routes have clear ownership and naming.
- [ ] Internal navigation uses router-aware links.
- [ ] Active navigation state is accessible.
- [ ] A useful 404 route exists.
- [ ] Shared layouts use nested routes and `Outlet` where appropriate.
- [ ] Index routes are used for default child content when appropriate.
- [ ] Dynamic route parameters are validated/handled by the page logic.
- [ ] Direct deep-link refreshes work in the deployment environment.
- [ ] Client-side 404 and server-side 404 are distinguished during debugging.
- [ ] Routing is not treated as an authorization/security boundary.
- [ ] Routing behavior is covered by user-visible tests.
- [ ] Route structure remains maintainable as features grow.

## 20. Final Project

Build a **Course Portal Router** with:

```text
/
├── dashboard
│   ├── index
│   ├── courses
│   ├── courses/:courseId
│   └── profile
├── about
└── *
```

Requirements:

- `BrowserRouter`
- `Routes` and `Route`
- `NavLink` navigation
- shared dashboard layout
- `Outlet`
- index route
- dynamic `courseId` route
- accessible 404 page
- route tests
- deployment deep-link verification
- clear explanation of why the client router is not a security boundary

### Acceptance Criteria

- [ ] All expected URLs render the correct page.
- [ ] Internal navigation does not require a full document reload.
- [ ] Dashboard routes share one layout.
- [ ] `/dashboard` renders its index page.
- [ ] `/dashboard/courses/:courseId` reads the route parameter.
- [ ] Unknown URLs render the 404 page.
- [ ] Navigation has an accessible active state.
- [ ] Deep-link refresh works in the chosen hosting environment.
- [ ] Tests verify user-visible routing behavior.

## Self Check

- [ ] I can explain SPA client-side routing.
- [ ] I can configure `BrowserRouter`.
- [ ] I can define routes with `Routes` and `Route`.
- [ ] I know when to use `Link` and `NavLink`.
- [ ] I can create a wildcard 404 route.
- [ ] I understand nested routes and `Outlet`.
- [ ] I understand index routes.
- [ ] I can read a dynamic route parameter.
- [ ] I can diagnose a deployment deep-link problem.
- [ ] I know that routing is not authorization.

## Day 41 Outcome

You can now build a clean React Router foundation, create navigable SPA routes, use shared layouts and nested routes, handle unknown URLs, test routing behavior, and distinguish client-side routing problems from deployment and security concerns.

**Next:** Day 42 — Navigation, `Link`, `NavLink`, route parameters, and programmatic navigation.
