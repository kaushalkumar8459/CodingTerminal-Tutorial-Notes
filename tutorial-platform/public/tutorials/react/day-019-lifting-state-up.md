---
title: Lifting State Up
slug: day-019-lifting-state-up
dayLabel: Day 19
level: Intermediate
estimatedMinutes: 90
order: 19
track: react
---
# Day 19 [Intermediate]: Lifting State Up

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
- [Common Mistakes](#common-mistakes)
- [Debugging Challenge](#debugging-challenge)
- [Assessment Quiz](#assessment-quiz)
- [Task](#task)
- [Self Check](#self-check)
- [Interview Questions and Answers](#interview-questions-and-answers)
- [Day 19 Outcome](#day-19-outcome)

## Goal

Learn where shared state should live, how to establish a single source of truth, how sibling components coordinate through their nearest common owner, how controlled components work, and when Context or another state solution is justified.

## Prerequisites

- Days 1–18
- Components and props
- `useState`
- Events and forms
- List rendering
- Conditional rendering
- Callback props

## Explanation

Lifting state up means moving shared state to the nearest common ancestor that needs to coordinate that value.

```text
             Common Parent
          owns shared state
             /          \
            ↓            ↓
        Child A       Child B
        reads/acts    reads data
            │
            └── callback → Parent
```

The rule is **not** “put all state in the top-level component.” Keep state as close as possible to where it is used, and lift only what is genuinely shared.

## Topic by Topic

### 1. Identify the Shared State

Two components should not maintain separate copies of the same logical value when one authoritative value can coordinate them.

```jsx
function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <>
      <SearchBox query={query} onQueryChange={setQuery} />
      <Results query={query} />
    </>
  );
}
```

### 2. Find the Nearest Common Owner

```text
App
└── ProfileFeature
    ├── Editor
    └── Preview
```

`ProfileFeature` is preferable to `App` when only this feature needs the shared state.

### 3. Single Source of Truth

```jsx
function ProfileFeature() {
  const [name, setName] = useState("");
  return (
    <>
      <Editor name={name} onNameChange={setName} />
      <Preview name={name} />
    </>
  );
}
```

Single source of truth applies to a particular logical value, not the whole application.

### 4. Data Down, Actions Up

```text
Parent state
    ↓ props
Child
    ↓ callback / intent
Parent updates state
```

Prefer semantic callbacks when useful:

```jsx
<ProductEditor product={product} onPriceChange={handlePriceChange} />
```

Semantic callbacks describe what the child wants to happen without exposing unnecessary parent implementation details. Passing a setter directly is sometimes fine, but it should be a deliberate component contract rather than a default rule.

### 5. Controlled Components

```jsx
function SearchBox({ value, onChange }) {
  return (
    <label>
      Search
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
```

The parent owns the important value; the child reports changes. Controlled inputs should also have an intentional initial value so they do not unexpectedly switch between uncontrolled and controlled modes.

### 6. Derived State

Avoid duplicate state for values that can be calculated:

```jsx
const [items, setItems] = useState([]);
const count = items.length;
const visibleItems = items.filter((item) => item.active);
```

Keeping derived values derived prevents synchronization bugs. If a calculation is expensive, consider memoization after measuring rather than storing the result as a second source of truth.

### 7. Lift Only What Is Shared

```jsx
const [query, setQuery] = useState("");
const [isFocused, setIsFocused] = useState(false);
```

If only the search component needs `isFocused`, keep it local. Ask: “Does another component need this exact state to render or coordinate an action?”

### 8. State Shape Matters

Location and shape are separate decisions.

```jsx
const [profile, setProfile] = useState({
  name: "",
  role: "",
  city: "",
});

setProfile((current) => ({
  ...current,
  role: "Frontend Developer",
}));
```

Use separate state variables when independent updates make the design clearer.

### 9. Sibling Synchronization

```jsx
function ProfileFeature() {
  const [profile, setProfile] = useState({ name: "", role: "" });
  return (
    <>
      <ProfileEditor profile={profile} onChange={setProfile} />
      <ProfilePreview profile={profile} />
    </>
  );
}
```

The siblings coordinate through their common owner instead of directly communicating.

### 10. Two Views, One State

A temperature converter demonstrates one edited value with the other view derived from it.

```jsx
function Calculator() {
  const [scale, setScale] = useState("c");
  const [temperature, setTemperature] = useState("");

  const celsius = scale === "c"
    ? temperature
    : temperature === "" ? "" : (Number(temperature) - 32) * 5 / 9;

  const fahrenheit = scale === "f"
    ? temperature
    : temperature === "" ? "" : Number(temperature) * 9 / 5 + 32;

  // render two controlled TemperatureInput components
}
```

Keep the empty-input case explicit. Also avoid using truthiness for numeric input because `0` is a valid temperature.

### 11. Shared Search + Derived Results

```jsx
function SearchPage({ items }) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const filtered = items.filter((item) =>
    item.toLowerCase().includes(normalized),
  );

  return (
    <>
      <SearchBox value={query} onChange={setQuery} />
      <Results items={filtered} />
    </>
  );
}
```

`filtered` is derived, not state.

### 12. Prop Drilling

Prop drilling means passing data through components that do not use it. It is not automatically bad. A few explicit prop layers can be clearer than global state.

When it becomes genuinely noisy, consider composition, moving consumers closer to the owner, Context, or a dedicated state solution.

### 13. Composition

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

Composition can reduce unnecessary state/configuration plumbing.

### 14. Lifting vs Context vs External State

| Scope/problem | Starting point |
|---|---|
| One component | Local state |
| Sibling components | Lift to nearest common owner |
| Broad subtree | Context may fit |
| Complex cross-cutting client state | Dedicated state solution may fit |
| Server/cache data | Data-fetching/cache solution |

Do not introduce Context merely because two components share one value.

### 15. Performance

Lifting state can cause the owner's relevant subtree to render when shared state changes. That is not inherently bad. Make ownership correct first, then profile before optimizing.

Possible techniques include state locality, component boundaries, reducing unnecessary work, and targeted memoization when measurement justifies it. Memoization should not be used as a substitute for a correct state ownership model.

## Key Concepts

| Concept | Meaning |
|---|---|
| Lifting state | Moving shared state to a common owner |
| Single source of truth | One authoritative logical value |
| Controlled component | Important value driven by props |
| Derived value | Calculated from existing state/props |
| Prop drilling | Passing data through uninterested layers |
| Composition | Supplying UI through children/props |
| Context | Sharing a value/dependency through a subtree |

## Visual Concept Map

```text
Shared requirement
       ↓
Find common ancestor
       ↓
Lift state
   ↙       ↘
values    callbacks
   ↓          ↓
children → parent update
```

## End-to-End Practical

### Profile Editor + Live Preview

Build:

```text
ProfileFeature
├── ProfileEditor
│   ├── Name
│   ├── Role
│   └── City
└── ProfilePreview
    ├── Name
    ├── Role
    └── City
```

```jsx
function ProfileFeature() {
  const [profile, setProfile] = useState({
    name: "",
    role: "",
    city: "",
  });

  const updateField = (field, value) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const resetProfile = () => {
    setProfile({ name: "", role: "", city: "" });
  };

  return (
    <main>
      <ProfileEditor profile={profile} onFieldChange={updateField} />
      <ProfilePreview profile={profile} />
      <button type="button" onClick={resetProfile}>Reset</button>
    </main>
  );
}

function ProfileEditor({ profile, onFieldChange }) {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      {["name", "role", "city"].map((field) => (
        <label key={field}>
          {field}
          <input
            name={field}
            value={profile[field]}
            onChange={(event) => onFieldChange(field, event.target.value)}
          />
        </label>
      ))}
    </form>
  );
}

function ProfilePreview({ profile }) {
  return (
    <article aria-live="polite">
      <h2>{profile.name || "Your name"}</h2>
      <p>{profile.role || "Your role"}</p>
      <p>{profile.city || "Your city"}</p>
    </article>
  );
}
```

### Acceptance Criteria

- [ ] One source of truth for profile.
- [ ] Editor is controlled.
- [ ] Preview updates immediately.
- [ ] Updates are immutable.
- [ ] No duplicated profile state in children.
- [ ] Local-only UI state remains local.
- [ ] Reset is owned by the same state owner.
- [ ] Form controls have labels and stable initial values.

## Hands-on Coding

1. **Search + Results:** lift `query` and derive filtered results.
2. **Temperature Converter:** synchronize Celsius/Fahrenheit with one canonical model and preserve valid zero values.
3. **Cart Summary:** derive total/count rather than storing duplicate totals.
4. **Prop Drilling Refactor:** compare explicit props, composition, and Context and justify the choice.
5. **Shared Form Reset:** add a reset action at the common owner without duplicating form state in children.

## Mini Exercise

Two siblings need the same selected product ID. Where should it live?

**Answer:** In their nearest common owner, unless another deliberate state architecture owns that shared value.

Then classify:

- input focus state → usually local
- selected product ID shared by siblings → lift
- product count derived from a list → calculate
- form reset action for shared form data → common owner

## Common Mistakes

- Duplicating shared state.
- Lifting everything to `App`.
- Storing simple derived values separately.
- Passing raw setters through many layers without a clear contract.
- Introducing Context too early.
- Using child-to-child communication hacks.
- Treating server/cache data exactly like local UI state.
- Optimizing before measuring.
- Using truthiness checks for valid numeric values such as `0`.
- Accidentally changing a controlled input into an uncontrolled input by allowing its value to become `undefined`.

## Debugging Challenge

This design creates two sources of truth:

```jsx
function ProfileFeature({ initialProfile }) {
  const [profile, setProfile] = useState(initialProfile);

  return (
    <>
      <Editor initialProfile={profile} />
      <Preview profile={profile} />
    </>
  );
}

function Editor({ initialProfile }) {
  const [profile, setProfile] = useState(initialProfile);
  // local copy can diverge from the parent's profile
}
```

### What is wrong?

The parent owns `profile`, but the editor creates another independent copy. Updates can become unsynchronized.

### Fix

Make the editor controlled:

```jsx
function Editor({ profile, onChange }) {
  return (
    <input
      value={profile.name}
      onChange={(event) =>
        onChange({ ...profile, name: event.target.value })
      }
    />
  );
}
```

The parent remains the source of truth.

## Assessment Quiz

1. What does lifting state up mean?
2. Where should shared state normally live?
3. What is a single source of truth?
4. What is a controlled component?
5. Why should derived values usually not be state?
6. Is prop drilling always bad?
7. When might Context be appropriate?
8. Why can lifting state affect rendering?
9. How is server/cache data different from UI state?
10. Why are semantic callbacks useful?
11. Why should valid numeric values such as `0` not be handled through truthiness checks?
12. What is the danger of copying props into local state without a synchronization plan?

### Answers

1. Moving shared state to a common ancestor that coordinates its consumers.
2. The nearest common owner that needs to coordinate it.
3. One authoritative value for a logical piece of shared data.
4. A component whose important value is driven by props and whose changes are reported upward.
5. Duplicate derived state can become stale or inconsistent.
6. No; a small amount can be explicit and maintainable.
7. When many descendants need the same dependency/value and prop plumbing creates a real maintenance problem.
8. Updating the owner can cause its relevant subtree to render again.
9. Server data is remote and often needs fetching, caching, synchronization, and invalidation; UI state is usually local interaction state.
10. They express intent and component boundaries instead of exposing parent implementation details.
11. `0` is a valid value but is falsy, so truthiness can incorrectly treat it as missing.
12. The local copy can diverge from the source of truth and create synchronization bugs.

## Task

Build a **Shared Profile Workspace** with editor, live preview, reset, and validation.

### Acceptance Criteria

- [ ] Appropriate common parent owns shared profile state.
- [ ] Form fields are controlled.
- [ ] Preview stays synchronized.
- [ ] Validation summary is derived where practical.
- [ ] Reset works.
- [ ] At least one local-only UI state remains local.
- [ ] No duplicated source of truth.
- [ ] Numeric values are handled without truthiness bugs.
- [ ] Form controls remain consistently controlled.

## Self Check

- [ ] I can identify shared vs local state.
- [ ] I can find the nearest common owner.
- [ ] I understand single source of truth.
- [ ] I can build a controlled component.
- [ ] I avoid storing simple derived values as state.
- [ ] I can explain prop drilling without calling it automatically bad.
- [ ] I know when Context may be justified.
- [ ] I can distinguish server data from local UI state.
- [ ] I understand rendering implications of lifting state.
- [ ] I can identify accidental duplicated state.
- [ ] I can handle valid falsy values deliberately.

## Interview Questions and Answers

### Beginner

**What is lifting state up?**  
Moving shared state to a common ancestor so multiple components can coordinate around one source of truth.

**Why use a common owner?**  
It provides one authoritative value and predictable data flow.

### Intermediate

**How do siblings communicate in React?**  
Usually through their common parent: it owns shared state, passes data down, and passes callbacks down for actions.

**What is a controlled component?**  
A component whose important value is controlled by its parent through props.

**Should every state variable be lifted?**  
No. Lift only what must be shared and keep local interaction state local.

### Advanced

**When would you choose Context instead of lifting state?**  
When a value/dependency is needed broadly through a subtree and repeated prop passing creates a real maintenance problem.

**Why can duplicated state be dangerous?**  
Two copies can diverge, creating synchronization bugs and unclear ownership.

**How should you optimize after lifting state?**  
Profile first, then consider state locality, component boundaries, reducing unnecessary work, and targeted memoization when evidence supports it.

**How is server state different from UI state?**  
Server state is remote and subject to fetching, caching, synchronization, and invalidation; UI state is usually local interaction state.

**Why can copying props into local state be problematic?**  
The local copy does not automatically stay synchronized with the prop. If a component truly needs a local draft, it should have an explicit synchronization or reset model; otherwise, prefer controlled state owned by the appropriate parent.

**How do you decide whether to lift state or use Context?**  
Start with the nearest common owner. Use Context when the shared dependency crosses many layers or is broadly consumed and explicit props become a real maintenance burden.

## Day 19 Outcome

You can now decide where shared state belongs, synchronize siblings through a common owner, build controlled components, derive values safely, avoid duplicated state, handle controlled-input edge cases, and evaluate Context or external state solutions based on actual scope and complexity.

**Next:** Day 20 applies these principles in a larger mini-project.
