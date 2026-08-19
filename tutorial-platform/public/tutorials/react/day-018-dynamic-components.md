---
title: Dynamic Components
slug: day-018-dynamic-components
dayLabel: Day 18
level: Intermediate
estimatedMinutes: 90
order: 18
track: react
---
# Day 18 [Intermediate]: Dynamic Components

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
- [Day 18 Outcome](#day-18-outcome)

## Goal

Learn how to choose which React component to render at runtime using state, conditions, component maps, configuration, and safe fallbacks. Understand dynamic component identity, state preservation/reset, accessibility, routing boundaries, and lazy loading.

## Prerequisites

- Days 1–17 completed
- Components and props
- `useState`
- conditional rendering
- list rendering and keys
- component identity and reconciliation

## Explanation

A dynamic component is a component selected at runtime rather than hard-coded as one fixed JSX element.

```text
State / configuration
        ↓
Approved component selection
        ↓
Component reference
        ↓
<SelectedComponent />
        ↓
Current UI
```

React components are JavaScript values, so they can be stored in variables, objects, arrays, or maps. Dynamic rendering should be introduced when it makes the component-selection logic clearer—not merely to replace two simple `if` statements.

## Topic by Topic

### 1. Simple Conditional Rendering

For a small number of choices, a conditional is often the clearest design.

```jsx
function Content({ mode }) {
  if (mode === "summary") return <Summary />;
  if (mode === "details") return <Details />;
  return <NotFound />;
}
```

**Rule:** use the simplest representation that communicates the requirement.

### 2. Component Variables

Select a component reference and render it through an uppercase variable.

```jsx
function Screen({ mode }) {
  const Selected = mode === "summary" ? Summary : Details;
  return <Selected />;
}
```

Lowercase JSX names are interpreted as intrinsic DOM elements, so use a capitalized variable for a component reference.

### 3. Component Maps

A map scales better when there are several known component types.

```jsx
const componentMap = {
  summary: Summary,
  details: Details,
  activity: Activity,
};

function Screen({ mode }) {
  const Selected = componentMap[mode] ?? NotFound;
  return <Selected />;
}
```

Benefits:

- centralized selection
- easy extension
- fewer branching statements
- easy unit testing
- explicit allowlist of supported component types

### 4. Dynamic Props and Component Contracts

Dynamic components work best when the selected components share a deliberate contract.

```jsx
const widgetMap = {
  sales: SalesWidget,
  users: UsersWidget,
};

function DashboardWidget({ type, data, onAction }) {
  const Widget = widgetMap[type] ?? UnsupportedWidget;
  return <Widget data={data} onAction={onAction} />;
}
```

If every widget needs unrelated props, the abstraction may be too broad. Consider adapter components or explicit selection logic instead of creating a giant prop contract.

### 5. Config-Driven UI

Configuration can describe which approved component should appear.

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

This pattern is useful for dashboards, admin portals, CMS-like layouts, and configurable product screens.

**Security rule:** never treat arbitrary server strings as executable JavaScript, arbitrary module paths, or component imports. Validate identifiers and map them to known components.

### 6. Fallbacks

Always decide what happens when configuration is missing or unsupported.

```jsx
const Widget = widgetMap[type];

if (!Widget) {
  return <p role="alert">Unsupported widget: {type}</p>;
}

return <Widget />;
```

A deliberate fallback is easier to debug than a blank UI region.

### 7. Dynamic Components with Props

The selected component can receive normal props.

```jsx
const Panel = panelMap[activePanel] ?? MissingPanel;
return <Panel userId={userId} onClose={onClose} />;
```

Remember that `key` is special when rendering a list; it is not passed as an ordinary child prop.

### 8. Dynamic Tabs

```jsx
const tabs = {
  overview: Overview,
  activity: Activity,
  settings: Settings,
};

function Account() {
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

For real tab interfaces, also consider the accessibility requirements of the WAI-ARIA tab pattern; simple buttons are often preferable when full tab semantics are not needed.

### 9. Dynamic Rendering vs Routing

These solve different problems.

| Requirement | Good fit |
|---|---|
| Switch a panel inside one screen | Dynamic rendering |
| URL represents the current page | Router |
| Browser back/forward represents navigation | Router |
| Dashboard widget type changes | Component map |
| Component code should load only when needed | Lazy loading |

Do not use a router simply because the component changes.

### 10. Dynamic Rendering and Component Identity

Local state belongs to component identity. Switching between different component types can remove one component instance and create another.

```jsx
function Editor({ mode }) {
  if (mode === "text") return <TextEditor />;
  return <VisualEditor />;
}
```

If state must survive switching views, consider lifting that state to a common parent or another appropriate state owner.

### 11. Intentional Key-Based Reset

A key can intentionally define a fresh identity.

```jsx
<ProfileForm key={profileId} profileId={profileId} />
```

When the identity changes, the form can be recreated with fresh local state. This should be intentional and documented rather than used to hide an incorrect state model.

### 12. Lazy Loading

Dynamic selection and lazy loading are separate concepts.

```jsx
import { lazy, Suspense } from "react";

const Reports = lazy(() => import("./Reports.jsx"));

function App() {
  return (
    <Suspense fallback={<p>Loading reports…</p>}>
      <Reports />
    </Suspense>
  );
}
```

`lazy()` addresses code loading. A component does not need to be lazy merely because it is selected dynamically.

### 13. Accessibility

Dynamic content should not leave keyboard users guessing what changed.

Good practices include:

- use semantic buttons for actions
- provide visible active state
- use appropriate accessible names
- use `aria-live` for suitable status updates
- use `role="alert"` for urgent errors
- use full tab semantics only when the interaction is actually a tab interface

## Key Concepts

| Concept | Meaning |
|---|---|
| Dynamic component | Component selected at runtime |
| Component map | Allowlisted mapping from identifier to component |
| Component contract | Props/events shared by dynamic components |
| Fallback | UI for missing or unsupported selection |
| Component identity | Determines whether local state can be preserved |
| Routing | URL/navigation concern, not simply component selection |
| Lazy loading | Defers loading component code |
| Key reset | Intentional new identity that can reset local state |

## Visual Concept Map

```text
             Current mode / config
                      ↓
              Validate / allowlist
                      ↓
               Component map
                      ↓
             Selected component
                /           \
          same identity    new identity
              ↓                 ↓
        preserve state      new instance
              \                 /
               +---------------+
                       ↓
                      UI
```

## End-to-End Practical

### Configurable Dashboard

Build a dashboard containing:

- Sales
- Users
- Revenue
- Activity

Requirements:

1. Keep the active widget type in state.
2. Use an allowlisted component map.
3. Pass a documented common `data` and `onAction` contract.
4. Add a fallback for unsupported types.
5. Provide accessible controls.
6. Add a loading boundary for an asynchronously loaded widget.
7. Keep navigation concerns separate from component selection.

### Example

```jsx
import { useState } from "react";

const widgets = {
  sales: SalesWidget,
  users: UsersWidget,
  revenue: RevenueWidget,
};

function Dashboard({ data }) {
  const [type, setType] = useState("sales");
  const Widget = widgets[type] ?? UnsupportedWidget;

  return (
    <section>
      <div>
        {Object.keys(widgets).map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={type === name}
            onClick={() => setType(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <Widget data={data} />
    </section>
  );
}
```

## Hands-on Coding

### Challenge 1 — Component Registry

Create a settings screen with `profile`, `security`, `notifications`, and `billing` components. Select the active component from a map.

### Challenge 2 — Shared Contract

Make three widgets accept the same `data` and `onAction` props. Document the contract.

### Challenge 3 — Safe Configuration

Simulate API configuration containing a valid and invalid component type. Render a clear fallback for the invalid value.

### Challenge 4 — Identity Lab

Create two dynamic components with local state. Switch between them and explain which state survives and why.

### Challenge 5 — Lazy Boundary

Lazy-load one large panel and provide a `Suspense` fallback.

## Mini Exercise

Given:

```jsx
const screens = {
  home: Home,
  settings: Settings,
};
```

Complete this safely:

```jsx
function Screen({ name }) {
  // select and render the correct component
}
```

Then answer:

1. Why should the selected variable be capitalized?
2. What should happen for an unknown `name`?
3. When would a router be more appropriate?

## Common Mistakes

### Mistake 1 — Lowercase component variable

```jsx
const selected = Profile;
return <selected />;
```

Use:

```jsx
const Selected = Profile;
return <Selected />;
```

### Mistake 2 — No fallback

Unsupported configuration should have an intentional UI state.

### Mistake 3 — Giant prop contract

Do not force unrelated components to accept dozens of props merely because they share a registry.

### Mistake 4 — Confusing routing with dynamic rendering

Use routing when URL/navigation semantics matter.

### Mistake 5 — Unsafe server-driven component selection

Use an allowlist of known component identifiers. Never execute arbitrary code from configuration.

### Mistake 6 — Assuming dynamic means lazy

Runtime selection and code splitting are separate concerns.

### Mistake 7 — Accidentally losing local state

Changing component identity can remount a component. Decide where state should live before choosing the dynamic boundary.

## Assessment Quiz

1. What is a dynamic component?
2. Why does a selected component variable normally use an uppercase name?
3. When is a component map better than multiple `if` statements?
4. Why is a fallback important?
5. Are component maps equivalent to routing?
6. What is the security concern with arbitrary server-provided component names?
7. How can dynamic component switching affect local state?
8. What does `lazy()` solve?
9. Why might a shared prop contract be preferable?
10. When should state be lifted above a dynamic component boundary?

### Answers

1. A component selected at runtime from state or configuration.
2. JSX treats lowercase identifiers as intrinsic DOM elements.
3. When there are multiple known options and centralized selection improves readability and extensibility.
4. It handles missing or unsupported configuration explicitly.
5. No. Routing adds URL and navigation behavior.
6. Untrusted strings must not become arbitrary executable modules; use an allowlist.
7. A different component identity can cause the previous instance to be removed and a new one created, resetting local state.
8. It defers loading component code until it is needed.
9. It makes dynamic components interchangeable without a confusing set of unrelated props.
10. When the state must survive switching between component identities or is conceptually owned by the parent workflow.

## Task

Build the **Configurable Dashboard** and include at least four dynamic widget types.

### Acceptance Criteria

- [ ] Selection logic is centralized.
- [ ] Known component types are allowlisted.
- [ ] Unknown types render a fallback.
- [ ] Dynamic components use a documented prop contract.
- [ ] Controls are keyboard accessible.
- [ ] Active state is communicated accessibly.
- [ ] No arbitrary module import occurs from external configuration.
- [ ] Routing is not used for an in-screen component switch.
- [ ] Local-state behavior when switching components is explained.
- [ ] Lazy loading is used only where code-splitting provides value.

## Self Check

- [ ] I can explain what a dynamic component is.
- [ ] I can choose between conditions and a component map.
- [ ] I know why selected component variables are capitalized.
- [ ] I can create a safe component registry.
- [ ] I can design a shared component contract.
- [ ] I can provide a fallback.
- [ ] I can distinguish dynamic rendering from routing.
- [ ] I understand dynamic rendering vs lazy loading.
- [ ] I can predict when local state will reset.
- [ ] I can decide when to lift state.

## Interview Questions and Answers

### Beginner

**Q: How do you render a component dynamically in React?**  
Select a component reference in JavaScript and render it through a capitalized variable, such as `const Selected = map[type]; return <Selected />`.

**Q: Why is the variable capitalized?**  
JSX uses capitalization to distinguish user-defined components from intrinsic DOM elements.

### Intermediate

**Q: When would you use a component registry?**  
When several known component types need runtime selection and a centralized mapping makes the design easier to extend and test.

**Q: What should happen for an unsupported component type?**  
Render an explicit fallback, error, or empty state appropriate to the domain rather than silently failing.

**Q: How does dynamic rendering interact with local state?**  
Switching component identity can remove one instance and create another, so local state may reset. State that must survive the switch can be lifted to a stable owner.

### Advanced

**Q: How would you make server-driven dynamic UI safe?**  
Validate the configuration and map approved identifiers to known component references. Do not evaluate arbitrary code or import arbitrary paths based on untrusted strings.

**Q: What is the difference between dynamic rendering and lazy loading?**  
Dynamic rendering chooses which component to render. Lazy loading controls when the component's code is downloaded. They can be combined but solve different problems.

**Q: When is a component map worse than a conditional?**  
When there are only a couple of branches and the map adds indirection without improving clarity.

**Q: How can you preserve state across dynamic views?**  
Keep shared state in a stable parent or another state owner, or keep the relevant component instances mounted when that design is appropriate.

## Day 18 Outcome

You can build maintainable state-driven and configuration-driven component switching, design safe component registries, reason about identity and local state, and distinguish dynamic rendering from routing and code splitting.

**Next:** Day 19 builds on these relationships by deciding where shared state should live.
