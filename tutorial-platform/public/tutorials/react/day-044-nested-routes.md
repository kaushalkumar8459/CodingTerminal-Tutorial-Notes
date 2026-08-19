---
title: Nested Routes
slug: day-044-nested-routes
dayLabel: Day 44
level: Beginner
estimatedMinutes: 30
order: 44
track: react
---
---
title: Nested Routes
slug: day-044-nested-routes
dayLabel: Day 44
level: Beginner
estimatedMinutes: 30
order: 44
track: react
---
# Day 44 [Intermediate to Advanced]: Nested Routes

## Index

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Explanation](#explanation)
- [Topic by Topic](#topic-by-topic)
- [Key Concepts](#key-concepts)
- [Visual Concept Map](#visual-concept-map)
- [End-to-End Practical](#end-to-end-practical)
- [Hands-on Coding](#hands-on-coding)
- [Mini Exercise](#mini-exercise)
- [Assessment Quiz](#assessment-quiz)
- [Task](#task)
- [Self Check](#self-check)
- [Interview Questions and Answers](#interview-questions-and-answers)
- [Day 44 Outcome](#day-44-outcome)

## Goal

Use nested routes to build shared layouts with child pages and reduce duplicate UI wrappers.

## Prerequisites

- Day 43 completed
- Basic route parameter and navigation knowledge

## Explanation

Nested routes are useful when multiple pages share a parent layout such as dashboard shell, sidebar, and header.

## Topic by Topic

### Topic 1: Parent Route with Children

Theory:
Define child routes inside parent route element.

Practical:
Create `/dashboard` with nested pages.

Code Example:

```jsx
<Route path="dashboard" element={<DashboardLayout />}>
  ...
</Route>
```

**Explanation:** This topic explains Parent Route with Children in a practical way so you can apply it confidently in real React projects.

**Key Points:**

- Understand the core idea of Parent Route with Children.
- Apply the pattern using clean, readable code.
- Avoid common mistakes through predictable React flow.

### Topic 2: Outlet Usage

Theory:
`Outlet` marks where child content renders.

Practical:
Place outlet under shared header.

Code Example:

```jsx
<Outlet />
```

**Explanation:** This topic explains Outlet Usage in a practical way so you can apply it confidently in real React projects.

**Key Points:**

- Understand the core idea of Outlet Usage.
- Apply the pattern using clean, readable code.
- Avoid common mistakes through predictable React flow.

### Topic 3: Index Route

Theory:
Index route renders default child when parent path matches exactly.

Practical:
Show overview as default dashboard page.

Code Example:

```jsx
<Route index element={<Overview />} />
```

**Explanation:** This topic explains Index Route in a practical way so you can apply it confidently in real React projects.

**Key Points:**

- Understand the core idea of Index Route.
- Apply the pattern using clean, readable code.
- Avoid common mistakes through predictable React flow.

### Topic 4: Relative Nested Links

Theory:
Child navigation can use relative paths.

Practical:
Link to `reports` and `settings` from dashboard menu.

Code Example:

```jsx
<NavLink to="reports">Reports</NavLink>
```

**Explanation:** This topic explains Relative Nested Links in a practical way so you can apply it confidently in real React projects.

**Key Points:**

- Understand the core idea of Relative Nested Links.
- Apply the pattern using clean, readable code.
- Avoid common mistakes through predictable React flow.

### Topic 5: Deeply Nested Patterns

Theory:
Nested structure can grow by domain modules.

Practical:
Add `reports/:id` under dashboard routes.

Code Example:

```jsx
<Route path="reports/:id" element={<ReportDetails />} />
```

**Explanation:** This topic explains Deeply Nested Patterns in a practical way so you can apply it confidently in real React projects.

**Key Points:**

- Understand the core idea of Deeply Nested Patterns.
- Apply the pattern using clean, readable code.
- Avoid common mistakes through predictable React flow.

### Topic 6: Error and Empty Handling Inside Layouts

Theory:
Nested modules should define local fallback UI for missing data so one child issue does not break the whole parent layout.

Practical:
Show module-level empty/not-found views inside `Outlet` content area.

Code Example:

```jsx
// Keep shared layout visible while child route shows local fallback.
```

**Explanation:** This topic explains Error and Empty Handling Inside Layouts in a practical way so you can apply it confidently in real React projects.

**Key Points:**

- Understand the core idea of Error and Empty Handling Inside Layouts.
- Apply the pattern using clean, readable code.
- Avoid common mistakes through predictable React flow.

## Key Concepts

- Parent-child route hierarchy
- Shared layout with Outlet
- Default index child
- Relative nested navigation
- Modular route organization
- Child-level fallback patterns

## Visual Concept Map

```mermaid
flowchart TD
		A[/dashboard] --> B[DashboardLayout]
		B --> C[Outlet]
		C --> D[Overview]
		C --> E[Reports]
		C --> F[Settings]
```

## End-to-End Practical

1. Create dashboard layout component.
2. Add Outlet inside layout.
3. Define nested child routes.
4. Add index child route.
5. Add nested links and verify switching.

## Hands-on Coding

### Example 1: Case - Dashboard Shared Shell

Scenario:
An internal analytics dashboard needs one shared sidebar and top bar for multiple pages.

```jsx
import { NavLink, Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <NavLink to="">Overview</NavLink>
        <NavLink to="reports">Reports</NavLink>
        <NavLink to="settings">Settings</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
```

### Example 2: Case - Nested Route Config

Scenario:
A product admin app groups related pages under `/admin` layout route.

```jsx
<Route path="admin" element={<AdminLayout />}>
  <Route index element={<AdminHome />} />
  <Route path="users" element={<UsersPage />} />
  <Route path="roles" element={<RolesPage />} />
</Route>
```

### Example 3: Case - Nested Param Page

Scenario:
A reports module should open individual report detail inside dashboard layout.

```jsx
<Route path="dashboard" element={<DashboardLayout />}>
  <Route path="reports" element={<ReportsList />} />
  <Route path="reports/:id" element={<ReportDetails />} />
</Route>
```

## Mini Exercise

Scenario:
You are building a learning management dashboard.

Create parent route `/panel` with nested children: index overview, students, instructors, settings.

Expected output:

- Shared layout remains stable while child views switch
- Default child appears on `/panel`
- Child links navigate with relative paths

## Assessment Quiz

### Quiz Questions

1. What does Outlet do?
2. Why use nested routes for dashboards?
3. True or False: index route needs a path value.
4. What is benefit of relative child links?
5. Where should shared sidebar/header be placed?

### Quiz Answers

1. Renders matched child route element
2. Reduces layout duplication and improves structure
3. False
4. Cleaner and less fragile route declarations
5. In parent layout component

## Task

- Build one parent layout route with 3+ children
- Add index child and relative nav links
- Complete mini exercise

## Self Check

- You can design nested route hierarchies confidently
- You can build shared layouts with Outlet
- You can answer at least 4 out of 5 quiz questions correctly

## Interview Questions and Answers

### Beginner

**Question:** What is nested routing?

**Answer:** Parent route containing child routes rendered inside its layout.

**Question:** Which component is required to render child route UI?

**Answer:** Outlet.

### Middle

**Question:** What is index route used for?

**Answer:** Default child content when parent path is matched exactly.

**Question:** Why are nested routes helpful for modular apps?

**Answer:** They group related pages under shared structure.

### Advanced

**Question:** How can nested routing improve code splitting strategy?

**Answer:** Lazy-load route groups by layout/domain modules.

**Question:** What risk appears with deeply nested route trees?

**Answer:** Complexity and harder mental mapping if not organized well.

## Day 44 Outcome

- You can build maintainable shared-layout route structures
- You can configure default and nested child routes
- You are ready to secure routes with guards on Day 45

