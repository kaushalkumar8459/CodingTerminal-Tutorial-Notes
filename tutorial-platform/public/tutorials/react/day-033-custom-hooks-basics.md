---
title: Custom Hooks Basics
slug: day-033-custom-hooks-basics
dayLabel: Day 33
level: Intermediate
estimatedMinutes: 60
order: 33
track: react
---
# Day 33 [Intermediate]: Custom Hooks Basics

## Goal

Learn how to extract **reusable stateful logic** into custom hooks while keeping UI rendering inside components. The goal is not to make everything a hook; it is to create a small, clear API around behavior that genuinely repeats.

## Prerequisites

- Days 22–32
- `useState`, `useEffect`, `useRef`
- hook rules
- controlled components
- async state basics

## 1. What Is a Custom Hook?

A custom hook is a JavaScript function whose name starts with `use` and that can call React hooks.

```jsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);

  const toggle = () => setValue((current) => !current);

  return { value, toggle };
}
```

A custom hook does **not** create shared state between every consumer. Each component calling the hook gets its own hook state.

```text
Component A → useToggle() → state A
Component B → useToggle() → state B
```

The reusable part is the logic, not the state instance.

## 2. Why Extract Logic?

Before:

```jsx
function PanelA() {
  const [open, setOpen] = useState(false);
  // repeated behavior
}

function PanelB() {
  const [open, setOpen] = useState(false);
  // same behavior again
}
```

After:

```jsx
const panelA = useToggle();
const panelB = useToggle();
```

The components remain responsible for rendering their own UI.

## 3. Custom Hooks Must Follow Hook Rules

Good:

```jsx
function useCounter() {
  const [count, setCount] = useState(0);
  return count;
}
```

Bad:

```jsx
function useCounter(enabled) {
  if (enabled) {
    const [count, setCount] = useState(0); // ❌ conditional hook
  }
}
```

Hooks must be called at the top level of components or other custom hooks, not inside conditions, loops, or nested callbacks.

## 4. Hook Naming Is More Than Style

The `use` prefix signals that the function participates in hook rules and allows lint tooling to identify invalid usage patterns.

Do not hide hooks inside ordinary helper functions:

```jsx
function createThing() {
  const [value] = useState(); // ❌
}
```

## 5. Designing the Hook API

For a simple pair, a tuple is concise:

```jsx
return [value, toggle];
```

For multiple actions, an object is often clearer:

```jsx
return {
  value,
  increment,
  decrement,
  reset,
};
```

Choose a consistent contract based on the consumer experience, not personal preference alone.

## 6. Parameterized Hooks

```jsx
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);

  const increment = () => setCount((current) => current + 1);
  const reset = () => setCount(initial);

  return { count, increment, reset };
}
```

Parameters make a hook reusable while keeping application-specific decisions outside the hook.

## 7. `useLocalStorage`: A Realistic Example

A robust version must handle malformed storage and browser access failures.

```jsx
function readStoredValue(key, initialValue) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? initialValue : JSON.parse(raw);
  } catch {
    return initialValue;
  }
}

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() =>
    readStoredValue(key, initialValue)
  );

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage may be unavailable or full.
    }
  }, [key, value]);

  return [value, setValue];
}
```

This is still a browser-oriented learning abstraction. It is not a replacement for server persistence.

## 8. Hooks Do Not Share State Automatically

This is a critical concept.

```jsx
function CounterA() {
  const { count } = useCounter();
}

function CounterB() {
  const { count } = useCounter();
}
```

These counters are independent. If multiple components need the **same source of truth**, use an appropriate state-sharing mechanism such as lifted state, Context, an external store, or a server-state library depending on the problem.

## 9. Hooks Should Not Render UI

A hook can return state, data, actions, refs, or status.

```jsx
function useToggle() {
  // logic
  return { value, toggle };
}
```

The component renders:

```jsx
const { value, toggle } = useToggle();
return <button onClick={toggle}>{value ? "Open" : "Closed"}</button>;
```

This separation keeps logic reusable across different UI designs.

## 10. Custom Hooks and Effects

A hook can encapsulate an effect when that effect belongs to the reusable behavior.

```jsx
function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
```

The component only expresses intent:

```jsx
useDocumentTitle(`${count} notifications`);
```

## 11. Avoid Over-Generalization

This can be a smell:

```jsx
useSomething({
  mode: "x",
  strategy: "y",
  feature: "z",
  transform: fn,
  customBehavior: fn2,
  ...
});
```

If a hook requires many flags to support unrelated use cases, split it into smaller hooks or keep some logic in the component.

## 12. Testing Custom Hooks

Test observable behavior, not implementation details.

For `useCounter`, test:

- initial value
- increment
- decrement
- reset

For an async hook, test:

- loading
- success
- error
- cancellation/unmount behavior

The exact testing library is less important than verifying the public hook contract.

## 13. Three Practical Hooks

### `useToggle`

```jsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue((current) => !current);
  const setOn = () => setValue(true);
  const setOff = () => setValue(false);

  return { value, toggle, setOn, setOff };
}
```

### `useCounter`

```jsx
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);

  return {
    count,
    increment: () => setCount((c) => c + 1),
    decrement: () => setCount((c) => c - 1),
    reset: () => setCount(initial),
  };
}
```

### `useSearch`

```jsx
function useSearch(initial = "") {
  const [query, setQuery] = useState(initial);
  const clear = () => setQuery("");

  return { query, setQuery, clear };
}
```

## 14. Complete Example

```jsx
function SearchPanel() {
  const { query, setQuery, clear } = useSearch();

  return (
    <section>
      <label htmlFor="search">Search</label>
      <input
        id="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="button" onClick={clear}>Clear</button>
      <p>Searching for: {query || "everything"}</p>
    </section>
  );
}
```

The hook knows nothing about HTML, CSS, or the visual design.

## 15. Common Mistakes

### Mistake 1: Thinking custom hooks share state

They reuse logic; each invocation normally has independent state.

### Mistake 2: Conditional hook calls

Never call hooks conditionally.

### Mistake 3: Putting JSX into hooks

Return behavior/data, not UI.

### Mistake 4: Hiding business decisions inside generic hooks

Keep domain-specific policy at the appropriate application layer.

### Mistake 5: Returning an unstable API without a reason

If consumers need stable actions for memoized children, consider `useCallback`; otherwise don't add it automatically.

## Hands-on Labs

### Lab 1 — Extract
Take duplicated toggle logic from two components and create `useToggle`.

### Lab 2 — Persistence
Create `useLocalStorage` with malformed JSON recovery.

### Lab 3 — Async Contract
Design a hook API for loading/error/data/refetch without implementing it first. Explain why each returned field exists.

### Lab 4 — State Sharing
Use the same custom hook in two components and demonstrate that their state is independent. Then redesign the example using lifted state when shared state is required.

## Assessment

1. What is a custom hook?
2. Does a custom hook share state automatically?
3. Why must custom hook names start with `use`?
4. Where can hooks be called?
5. When should you return an object instead of a tuple?
6. Should hooks render JSX?
7. When should logic remain in a component?
8. How would you test a hook?

## Interview Questions

**Q: What problem do custom hooks solve?**  
They extract reusable stateful behavior so multiple components can use the same logic without duplicating it.

**Q: Do custom hooks create global state?**  
No. Each call has its own state unless the hook connects to a shared state mechanism.

**Q: Can a custom hook call another custom hook?**  
Yes, provided normal hook rules are respected.

**Q: When would you not create a custom hook?**  
When the logic is simple, local, and unlikely to be reused. Abstraction has a maintenance cost.

**Q: How should a custom hook handle errors?**  
Expose a predictable error/status contract and let the consuming component decide how the UI should present it.

## Final Project

Build a **Reusable Dashboard Toolkit** containing:

- `useToggle`
- `useCounter`
- `useSearch`
- `useLocalStorage`
- one domain-specific hook of your own

Use each in at least two components where reuse is justified. Document the public API of every hook.

## Self Check

- [ ] I can explain logic reuse vs state sharing.
- [ ] I know hook rules.
- [ ] I can design a clean hook API.
- [ ] I can parameterize a hook.
- [ ] I know when not to abstract.
- [ ] I can test behavior through a public contract.

## Day 33 Outcome

You can now extract reusable stateful behavior without coupling it to a specific UI. Day 34 builds more advanced hooks around **async operations, debouncing, pagination, composition, and cancellation**.