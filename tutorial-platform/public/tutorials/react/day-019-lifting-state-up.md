---
title: Lifting State Up
slug: day-019-lifting-state-up
dayLabel: Day 19
level: Intermediate
estimatedMinutes: 60
order: 19
track: react
---

# Day 19: Lifting State Up

## Goal

Learn how to decide **where state should live** when multiple components need the same information. You will learn the nearest common owner pattern, single source of truth, controlled components, derived state, sibling synchronization, minimal lifting, state-shape design, prop drilling, composition, and when Context or another state solution may be justified.

## Prerequisites

- Days 1–18 completed
- Comfortable with components, props, `useState`, events, lists, and conditional rendering
- Comfortable passing callback props

## Core Mental Model

When two components need to coordinate around the same changing data, do not make them maintain independent copies of that data.

```text
                Common Parent
                     │
              owns shared state
                 /       \
                /         \
          Child A         Child B
          reads/updates   reads data
                │
                └── callback ──► Parent
```

The usual strategy is:

1. Identify the state that must be shared.
2. Find the nearest common ancestor of the components that need it.
3. Move that state to the common owner.
4. Pass the current value down through props.
5. Pass narrowly defined callbacks down for actions.
6. Keep state that is truly local in the component that owns it.

> **Lifting state up is a state-placement technique, not a rule that all state belongs at the top of the application.**

## 1. What Problem Does Lifting State Up Solve?

Suppose a search input and a result list each maintain their own copy of `query`:

```jsx
function SearchBox() {
  const [query, setQuery] = useState("");
  // ...
}

function Results() {
  const [query, setQuery] = useState("");
  // ...
}
```

These values can drift apart. The input might display `react`, while the result list still filters using `rea`.

Instead, the common parent owns the query:

```jsx
function App() {
  const [query, setQuery] = useState("");

  return (
    <>
      <SearchBox query={query} onQueryChange={setQuery} />
      <Results query={query} />
    </>
  );
}
```

Now there is one authoritative value.

### Key points

- Lift state when multiple components need the same changing value.
- Avoid duplicate sources of truth for the same concept.
- The common owner coordinates the shared state.

## 2. Find the Nearest Common Owner

Consider:

```text
App
├── Header
├── Editor
└── Preview
```

If `Editor` and `Preview` need the same `profile`, `App` is the nearest common owner.

Do **not** automatically move the state to the application root if a lower component can own it.

```text
Too high:
App owns every piece of state

Better:
FeaturePanel owns feature state
├── Editor
└── Preview
```

Keeping state close to where it is used reduces unnecessary prop plumbing and makes component responsibilities easier to understand.

## 3. Single Source of Truth

If two components need the same logical value, store that value once whenever practical.

```jsx
function EditorPreview() {
  const [name, setName] = useState("");

  return (
    <section>
      <ProfileEditor name={name} onNameChange={setName} />
      <ProfilePreview name={name} />
    </section>
  );
}
```

Both children use the same `name`.

### Important distinction

A **single source of truth** applies to a particular piece of shared information. It does not mean your entire application must have one giant state object.

## 4. Data Down, Actions Up

The common React communication pattern is:

```text
Parent state
    ↓ props/value
Child
    ↓ callback/intent
Parent state update
```

Example:

```jsx
function Parent() {
  const [value, setValue] = useState("");

  return (
    <Child
      value={value}
      onChange={setValue}
    />
  );
}

function Child({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
```

The child does not reach into the parent's state. It communicates an event/action through the callback contract.

For larger APIs, prefer semantic names:

```jsx
<ProductEditor
  product={product}
  onPriceChange={handlePriceChange}
/>
```

rather than exposing implementation details such as:

```jsx
<ProductEditor setProduct={setProduct} />
```

Both can work, but semantic callbacks can make ownership and allowed actions clearer.

## 5. Controlled Components

A component is commonly called **controlled** when its important value is driven by props from its parent.

```jsx
function SearchBox({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
```

The parent owns the state:

```jsx
function SearchPage() {
  const [query, setQuery] = useState("");

  return <SearchBox value={query} onChange={setQuery} />;
}
```

This makes synchronization easy because there is one current value.

## 6. Derived State Should Usually Stay Derived

Do not create another state variable for a value that can be calculated from existing state.

Avoid:

```jsx
const [items, setItems] = useState([]);
const [itemCount, setItemCount] = useState(0);
```

when `itemCount` is always `items.length`.

Prefer:

```jsx
const [items, setItems] = useState([]);
const itemCount = items.length;
```

For filtering:

```jsx
const visibleItems = items.filter((item) =>
  item.name.toLowerCase().includes(query.toLowerCase()),
);
```

This reduces synchronization bugs.

> A value being displayed in multiple places does not automatically mean it needs separate state.

## 7. Lift Only What Is Actually Shared

Not every state variable should be lifted.

```jsx
function SearchPanel() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // query may be shared with Results
  // focus state may only matter inside SearchPanel
}
```

If `isFocused` is only used by `SearchPanel`, keep it local.

### Decision rule

Ask:

> “Does another component need this exact state to render correctly or coordinate an action?”

- **Yes:** consider lifting it.
- **No:** keep it local.

## 8. State Shape Before Lifting

The location of state and its shape are separate design decisions.

Related values can be grouped:

```jsx
const [profile, setProfile] = useState({
  name: "",
  role: "",
  city: "",
});
```

Update immutably:

```jsx
setProfile((current) => ({
  ...current,
  role: "Frontend Developer",
}));
```

Independent values can also be separate:

```jsx
const [name, setName] = useState("");
const [role, setRole] = useState("");
```

Choose the shape based on how the data changes and how the components consume it. Do not combine everything into one object merely because the state is lifted.

## 9. Sibling Synchronization

A common example is an editor and preview:

```jsx
function ProfileFeature() {
  const [profile, setProfile] = useState({
    name: "",
    role: "",
  });

  return (
    <>
      <ProfileEditor profile={profile} onProfileChange={setProfile} />
      <ProfilePreview profile={profile} />
    </>
  );
}
```

The flow is:

```text
Editor input
   ↓
onProfileChange
   ↓
Parent updates profile
   ↓
Parent renders
   ↓
Preview receives latest profile
```

There is no need for the editor and preview to know how to find each other.

## 10. Temperature Converter: Two Views, One State

A classic example is Celsius/Fahrenheit conversion.

The parent owns the source value and remembers which scale was edited:

```jsx
import { useState } from "react";

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return celsius * 9 / 5 + 32;
}

function TemperatureInput({ scale, value, onChange }) {
  return (
    <label>
      {scale === "c" ? "Celsius" : "Fahrenheit"}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export default function Calculator() {
  const [scale, setScale] = useState("c");
  const [temperature, setTemperature] = useState("");

  const celsius = scale === "c"
    ? temperature
    : temperature === ""
      ? ""
      : toCelsius(Number(temperature));

  const fahrenheit = scale === "f"
    ? temperature
    : temperature === ""
      ? ""
      : toFahrenheit(Number(temperature));

  return (
    <div>
      <TemperatureInput
        scale="c"
        value={celsius}
        onChange={(value) => {
          setScale("c");
          setTemperature(value);
        }}
      />

      <TemperatureInput
        scale="f"
        value={fahrenheit}
        onChange={(value) => {
          setScale("f");
          setTemperature(value);
        }}
      />
    </div>
  );
}
```

The important lesson is not the temperature formula. It is that **the parent owns the state required to keep two views synchronized**.

## 11. Shared Search and Derived Results

```jsx
function SearchBox({ query, onQueryChange }) {
  return (
    <input
      value={query}
      onChange={(event) => onQueryChange(event.target.value)}
      placeholder="Search technologies"
    />
  );
}

function Results({ items, query }) {
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(normalizedQuery),
  );

  if (filtered.length === 0) {
    return <p>No matching technologies.</p>;
  }

  return (
    <ul>
      {filtered.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const items = ["React", "Angular", "Vue", "Svelte"];

  return (
    <>
      <SearchBox query={query} onQueryChange={setQuery} />
      <Results items={items} query={query} />
    </>
  );
}
```

Notice that `filtered` is **derived**. It does not need its own state.

## 12. Prop Drilling: When Is It Actually a Problem?

Prop drilling means passing data through components that do not themselves need that data.

```text
App
 ↓
Layout
 ↓
Panel
 ↓
Section
 ↓
Button
```

If every intermediate component only forwards `user`, the API can become noisy.

However, prop drilling is not automatically bad. A few explicit prop layers can be clearer than introducing global state.

Consider alternatives only when there is a real problem:

- Move the consumer closer to the state owner.
- Use composition.
- Use Context for broadly shared values.
- Use a state-management solution for genuinely cross-cutting application state.

## 13. Composition Can Be Better Than More Lifting

Suppose a layout needs to render arbitrary content. Instead of lifting every detail into the layout:

```jsx
function Panel({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
```

Composition can reduce the amount of state and configuration that must travel through intermediate components.

## 14. Lifting State vs Context vs External State

Use the simplest solution that matches the scope.

| Situation | Good starting point |
|---|---|
| Used by one component | Local state |
| Shared by siblings | Lift to common parent |
| Needed by a subtree | Consider Context |
| Cross-cutting application state | Context or a dedicated state solution, depending on complexity |
| Server/cache data | A data-fetching/cache solution may be more appropriate than UI state |

Do not introduce Context merely because two components share a value.

## 15. Performance Considerations

Lifting state can increase the number of components that re-render when the owner updates. That does **not** mean lifting state is bad.

First make ownership correct and the data flow understandable. Then measure performance if there is an actual problem.

Possible optimizations include:

- Keeping unrelated local state local.
- Splitting large components.
- Avoiding unnecessary derived work.
- Memoizing only when measurement and component behavior justify it.
- Structuring state so unrelated updates do not unnecessarily involve large subtrees.

Avoid optimizing based only on assumptions.

## 16. Common Mistakes

### Mistake 1: Duplicating shared state

Two siblings independently store the same logical value.

**Fix:** identify the common owner and keep one source of truth.

### Mistake 2: Lifting everything to `App`

**Fix:** lift only to the nearest common owner.

### Mistake 3: Storing derived values separately

**Fix:** calculate them from existing state when practical.

### Mistake 4: Passing raw setters through many layers

**Fix:** use semantic callbacks where they make the component contract clearer.

### Mistake 5: Introducing Context too early

**Fix:** start with local state and props; use Context when the sharing problem actually warrants it.

### Mistake 6: Using child-to-child communication hacks

**Fix:** coordinate siblings through their common owner or another appropriate shared-state mechanism.

### Mistake 7: Confusing server data with UI state

Fetched/cached server data often has different requirements from local UI state such as `isOpen` or `selectedTab`.

## End-to-End Practical: Profile Editor + Live Preview

### Requirements

Build a feature with this structure:

```text
ProfileFeature
├── ProfileEditor
│   ├── Name input
│   ├── Role input
│   └── City input
└── ProfilePreview
    ├── Name
    ├── Role
    └── City
```

### Parent

```jsx
import { useState } from "react";

function ProfileFeature() {
  const [profile, setProfile] = useState({
    name: "",
    role: "",
    city: "",
  });

  const updateField = (field, value) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <main>
      <ProfileEditor profile={profile} onFieldChange={updateField} />
      <ProfilePreview profile={profile} />
    </main>
  );
}
```

### Editor

```jsx
function ProfileEditor({ profile, onFieldChange }) {
  return (
    <form>
      <input
        value={profile.name}
        onChange={(event) => onFieldChange("name", event.target.value)}
        placeholder="Name"
      />
      <input
        value={profile.role}
        onChange={(event) => onFieldChange("role", event.target.value)}
        placeholder="Role"
      />
      <input
        value={profile.city}
        onChange={(event) => onFieldChange("city", event.target.value)}
        placeholder="City"
      />
    </form>
  );
}
```

### Preview

```jsx
function ProfilePreview({ profile }) {
  return (
    <article>
      <h2>{profile.name || "Your name"}</h2>
      <p>{profile.role || "Your role"}</p>
      <p>{profile.city || "Your city"}</p>
    </article>
  );
}
```

### Acceptance criteria

- [ ] Parent owns the shared profile state.
- [ ] Editor receives values through props.
- [ ] Editor communicates changes through a callback.
- [ ] Preview receives the same authoritative profile.
- [ ] No duplicate profile state exists in the children.
- [ ] Object updates are immutable.
- [ ] No derived preview state is stored unnecessarily.

## Hands-on Challenges

### Challenge 1: Temperature Converter

Implement Celsius and Fahrenheit inputs that stay synchronized through a common parent.

### Challenge 2: Search + Results

Build a search box and result list. Keep only `query` in state; derive filtered results.

### Challenge 3: Shopping Cart

Create:

```text
CartPage
├── ProductList
└── CartSummary
```

The parent owns cart items. Product rows request additions and quantity changes through callbacks. `CartSummary` derives subtotal from the cart.

### Challenge 4: Profile Editor

Implement the full profile editor above and add a Reset button.

### Challenge 5: State Placement Review

For each value below, decide whether it should be local, lifted, provided through Context, or derived:

- Modal open state used by one component
- Search query shared by search input and results
- Filtered result list
- Authenticated user needed across many pages
- Shopping-cart items used by header and checkout

Explain your decision before coding.

## Debugging Exercise

This implementation contains duplicated state:

```jsx
function SearchBox() {
  const [query, setQuery] = useState("");
  // ...
}

function Results() {
  const [query, setQuery] = useState("");
  // ...
}
```

### Your task

1. Identify why synchronization can fail.
2. Move `query` to their nearest common owner.
3. Pass `query` to both components.
4. Pass an `onQueryChange` callback to `SearchBox`.
5. Keep filtered results derived rather than stored.

## Assessment Quiz

### Q1. What does lifting state up mean?

A. Moving all state into a global store
B. Moving shared state to the nearest common ancestor
C. Moving state into every child
D. Removing state

**Answer:** B

### Q2. Why avoid duplicate shared state?

A. It always makes the application slower
B. It can create multiple sources of truth that become inconsistent
C. React does not allow two states
D. Props stop working

**Answer:** B

### Q3. Should every state variable be lifted to `App`?

A. Yes
B. No

**Answer:** B

### Q4. What is derived state?

A. Data calculated from existing state/props
B. State that must always be global
C. State stored in the DOM
D. State that cannot change

**Answer:** A

### Q5. When can Context be useful?

A. Whenever one component has state
B. When values need to be consumed broadly within a subtree and prop passing becomes cumbersome
C. Only for forms
D. Only for API calls

**Answer:** B

## Self Check

Before moving to Day 20, you should be able to:

- Explain the nearest common owner pattern.
- Identify duplicated state that should be shared.
- Decide which state should remain local.
- Distinguish source state from derived values.
- Build a controlled child component.
- Synchronize sibling components through their parent.
- Explain when prop drilling is actually a concern.
- Explain why Context is not automatically the answer.
- Explain how lifting state can affect rendering scope.

## Interview Questions and Answers

### 1. What is lifting state up?

Lifting state up means moving state from child components to their nearest common ancestor so multiple components can share one authoritative value.

### 2. Why is a single source of truth important?

It prevents different components from maintaining conflicting copies of the same logical data and makes updates easier to reason about.

### 3. How do siblings communicate in React?

Usually, shared state is placed in their common parent. The parent passes values down and callbacks down so a sibling can request changes indirectly through the parent.

### 4. Should all state live in a common parent?

No. Only state that needs to be shared should be lifted. Local interaction state should remain close to the component that owns it.

### 5. What is the difference between state and derived data?

State is stored information that changes over time. Derived data is calculated from existing state or props. Storing both can create synchronization problems when the derived value can be calculated reliably.

### 6. What is a controlled component?

A controlled component receives its important value from its parent and reports changes through a callback. The parent owns the authoritative value.

### 7. When does prop drilling become a problem?

When data has to pass through many intermediate components that do not use it, making component APIs noisy and difficult to maintain. A few levels of explicit props are often perfectly reasonable.

### 8. Is Context always better than lifting state?

No. Context solves a different sharing problem. For closely related siblings, lifting state to their common parent is often simpler and more explicit.

### 9. Can lifting state hurt performance?

It can increase the rendering scope of updates because the state owner updates and its descendants may render again. Correct state ownership should come first; optimize only when measurement shows a real problem.

### 10. Why should derived values usually not be stored as state?

Because maintaining both the source and derived value creates two values that must remain synchronized. Calculating the derived value from the source avoids that duplication.

## Design Exercise: Choose the State Owner

For each scenario, identify the best owner:

### Scenario A
A tooltip's open/closed state is used by one button component.

**Suggested answer:** Keep it local.

### Scenario B
A search box and result list need the same query.

**Suggested answer:** Lift `query` to their nearest common owner.

### Scenario C
A filtered result array can be calculated from `items` and `query`.

**Suggested answer:** Derive it instead of storing a second state variable.

### Scenario D
Many unrelated components across a large subtree need the current theme.

**Suggested answer:** Context is a reasonable candidate.

### Scenario E
The application needs cached server data with loading, error, refetch, and cache behavior.

**Suggested answer:** Consider a dedicated data-fetching/cache approach rather than treating it as ordinary local UI state.

## Day 19 Outcome

You can now reason about **state ownership**, not just write `useState`.

You should understand this hierarchy:

```text
Local state
    ↓
Lift to common parent when shared
    ↓
Use composition to simplify APIs when appropriate
    ↓
Use Context for appropriate subtree-wide values
    ↓
Use dedicated state/data solutions when application complexity requires them
```

The key principle is:

> **Keep state as close as possible to where it is used, but no closer than necessary for the components that must coordinate around it.**

Day 20 builds directly on this model with deeper parent-child communication and component API design.
