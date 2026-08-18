---
title: Dynamic Components
slug: day-018-dynamic-components
dayLabel: Day 18
level: Intermediate
estimatedMinutes: 60
order: 18
track: react
---
# Day 18: Dynamic Components

## Goal

Learn how to choose which component to render at runtime using state, conditions, component maps, configuration, and safe fallback strategies. Understand when dynamic rendering is preferable to long conditional blocks and how it differs from routing and lazy loading.

## Prerequisites

- Days 1–17 completed
- Comfortable with props, state, lists, keys, and conditional rendering

## Why Dynamic Components Matter

Real applications often have one region of the screen whose content changes: dashboard widgets, settings panels, payment methods, profile sections, editors, or product views. The requirement is often “render the component represented by this current value.” React supports this naturally because components can be stored in JavaScript variables and selected at runtime.

## 1. Simple Conditional Rendering

For a small number of options, a conditional is clear:

```jsx
function Content({ mode }) {
  if (mode === "summary") return <Summary />;
  if (mode === "details") return <Details />;
  return <NotFound />;
}
```

Do not introduce a component registry just to avoid two simple conditions. Choose the simplest readable solution.

## 2. Component Variables

A component can be selected and then rendered:

```jsx
const components = {
  summary: Summary,
  details: Details,
};

function Screen({ mode }) {
  const Selected = components[mode] ?? NotFound;
  return <Selected />;
}
```

The uppercase variable is important because JSX treats lowercase names as intrinsic DOM tags.

## 3. Component Maps

Component maps are useful when the number of choices grows.

```jsx
const widgetMap = {
  sales: SalesWidget,
  users: UsersWidget,
  revenue: RevenueWidget,
};

function DashboardWidget({ type }) {
  const Widget = widgetMap[type] ?? UnsupportedWidget;
  return <Widget />;
}
```

Benefits:

- central mapping
- easy extension
- less branching
- straightforward testing

## 4. Dynamic Props

Different components may need different data. There are two important designs.

### Shared contract

```jsx
const Widget = widgetMap[type] ?? DefaultWidget;
return <Widget data={data} onAction={onAction} />;
```

Every widget agrees on a common API.

### Type-specific contract

If widgets genuinely need different data, forcing one giant prop object can make the API unclear. In that case, keep the selection logic explicit or create adapter components.

**Design rule:** dynamic rendering works best when the selected components have a deliberate contract.

## 5. Config-Driven UI

```jsx
const sections = [
  { id: "profile", type: "profile", title: "Profile" },
  { id: "activity", type: "activity", title: "Activity" },
];

const sectionMap = {
  profile: ProfileSection,
  activity: ActivitySection,
};

function Page() {
  return sections.map((section) => {
    const Section = sectionMap[section.type] ?? UnsupportedSection;
    return <Section key={section.id} title={section.title} />;
  });
}
```

This is useful for dashboards, CMS-like pages, admin systems, and configurable product layouts.

**Security rule:** do not treat arbitrary server-provided strings as JavaScript module paths or executable code. Map approved identifiers to known components.

## 6. Fallbacks

Always consider missing or unsupported configuration:

```jsx
const Widget = widgetMap[type];

if (!Widget) {
  return <p>Unsupported widget: {type}</p>;
}

return <Widget />;
```

A fallback is often better than silently rendering nothing.

## 7. Dynamic Components vs Routing

Dynamic rendering and routing are related but not interchangeable.

| Requirement | Good fit |
|---|---|
| Switch a panel inside one screen | Dynamic rendering |
| URL should represent a page | Router |
| Browser back/forward should work | Router |
| Dashboard widget type changes | Component map |
| Large component loaded only when needed | Lazy loading |

Do not use a router merely because the component changes.

## 8. Dynamic Rendering with Tabs

```jsx
import { useState } from "react";

const tabs = {
  overview: Overview,
  activity: Activity,
  settings: Settings,
};

export default function Account() {
  const [activeTab, setActiveTab] = useState("overview");
  const ActiveTab = tabs[activeTab] ?? Overview;

  return (
    <section>
      <nav aria-label="Account sections">
        {Object.keys(tabs).map((tab) => (
          <button
            key={tab}
            type="button"
            aria-pressed={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>
      <ActiveTab />
    </section>
  );
}
```

## 9. State and Component Identity

When switching component types, understand that local state belongs to component identity. If a tab deliberately uses different component types, switching between them can reset the previous component's local state.

If you need state to survive tab changes, consider whether the state belongs in the parent rather than inside each tab.

This is an important connection between Day 18 and Day 19: **dynamic rendering exposes state-ownership decisions.**

## 10. Lazy-Loaded Dynamic Components

For larger components, React can defer loading code:

```jsx
import { lazy, Suspense } from "react";

const Reports = lazy(() => import("./Reports.jsx"));

function App() {
  return (
    <Suspense fallback={<p>Loading reports...</p>}>
      <Reports />
    </Suspense>
  );
}
```

`React.lazy` and `Suspense` address code loading. They are not required simply because a component is dynamically selected.

## 11. Common Mistakes

### Mistake 1: Lowercase component variable

Avoid:

```jsx
const selected = Profile;
return <selected />;
```

Use:

```jsx
const Selected = Profile;
return <Selected />;
```

### Mistake 2: No fallback

Unknown configuration should not silently create a blank region.

### Mistake 3: Giant component contract

Do not pass dozens of unrelated props just because multiple components are dynamic. Design a focused API.

### Mistake 4: Using dynamic rendering for navigation

If the URL is part of the requirement, use routing.

### Mistake 5: Unsafe server configuration

Use an allowlisted map from known configuration values to known components.

## End-to-End Project: Configurable Dashboard

Build a dashboard containing:

- Sales
- Users
- Revenue
- Activity

Requirements:

1. Keep the active widget type in state.
2. Use a component map.
3. Pass a common `data` and `onAction` contract.
4. Add a fallback.
5. Add a loading state for an asynchronously loaded widget.
6. Add accessible tab/button semantics.

## Assessment

1. Why use a component map?
2. Why must a dynamic component variable normally start with uppercase?
3. When is a conditional clearer than a map?
4. Is dynamic rendering the same as routing?
5. Why is a fallback important?
6. How does dynamic rendering interact with component state?
7. What problem does `React.lazy` solve?

**Answers:**

1. It centralizes runtime selection and scales cleanly.
2. JSX treats lowercase names as intrinsic elements.
3. When there are only a few simple branches.
4. No; routing manages URL/navigation concerns.
5. It handles unsupported or missing configuration safely.
6. Switching identities can mount/unmount component instances and affect local state.
7. It allows component code to be loaded lazily.

## Interview Questions

**How do you render a component dynamically in React?**

Select a component reference in JavaScript and render the resulting capitalized variable.

**When would you use a component registry?**

When a screen supports multiple known component types and the mapping should be centralized and extensible.

**How would you make a dynamic dashboard safe when configuration comes from an API?**

Validate the configuration and map approved type identifiers to known components. Never execute arbitrary code or import arbitrary paths from untrusted input.

**How do you lazy-load a dynamic component?**

Use `lazy()` with a dynamic import and render it within an appropriate `Suspense` boundary.

## Self Check

You should now be able to:

- choose between conditions and a component map
- render a component selected at runtime
- design a shared dynamic-component contract
- provide safe fallbacks
- distinguish dynamic rendering from routing
- explain how component identity affects local state
- describe when lazy loading is useful

## Day 18 Outcome

You can build maintainable state-driven and configuration-driven component switching without confusing dynamic rendering with routing or code splitting. The next lesson uses these component relationships to decide where shared state should live.
