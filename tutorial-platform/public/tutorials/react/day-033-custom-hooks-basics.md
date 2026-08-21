---
title: Custom Hooks Basics
slug: day-033-custom-hooks-basics
dayLabel: Day 33
level: Intermediate
estimatedMinutes: 150
order: 33
track: react
---
# Day 33 [Intermediate]: Custom Hooks Basics

## Index

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Learning Outcomes](#learning-outcomes)
- [1. What Is a Custom Hook?](#1-what-is-a-custom-hook)
- [2. Why Extract Logic?](#2-why-extract-logic)
- [3. Logic Reuse vs State Sharing](#3-logic-reuse-vs-state-sharing)
- [4. Rules of Hooks](#4-rules-of-hooks)
- [5. Designing a Hook API](#5-designing-a-hook-api)
- [6. Parameterized Hooks](#6-parameterized-hooks)
- [7. Hook Dependencies and Closures](#7-hook-dependencies-and-closures)
- [8. Effects and Cleanup Inside Hooks](#8-effects-and-cleanup-inside-hooks)
- [9. `useLocalStorage` Safely](#9-uselocalstorage-safely)
- [10. Practical Hooks](#10-practical-hooks)
- [11. Composition](#11-composition)
- [12. Stable Actions and `useCallback`](#12-stable-actions-and-usecallback)
- [13. When Not to Create a Custom Hook](#13-when-not-to-create-a-custom-hook)
- [14. Testing Custom Hooks](#14-testing-custom-hooks)
- [15. Accessibility and Consumer Responsibility](#15-accessibility-and-consumer-responsibility)
- [16. Async Hooks and Cancellation](#16-async-hooks-and-cancellation)
- [17. Hook Contract and State-Machine Design](#17-hook-contract-and-state-machine-design)
- [Visual Concept Map](#visual-concept-map)
- [End-to-End Practical](#end-to-end-practical)
- [Hands-on Coding](#hands-on-coding)
- [Debugging Lab](#debugging-lab)
- [Mini Exercise](#mini-exercise)
- [Assessment Quiz](#assessment-quiz)
- [Interview Questions and Answers](#interview-questions-and-answers)
- [Production Checklist](#production-checklist)
- [Final Project](#final-project)
- [Self Check](#self-check)
- [Day 33 Outcome](#day-33-outcome)

## Goal

Learn how to extract **reusable stateful behavior** into custom hooks while keeping rendering and UI decisions inside components. The goal is not to turn every helper into a hook. The goal is a small, predictable API around behavior that genuinely benefits from reuse.

## Prerequisites

- Days 22–32
- `useState`, `useEffect`, `useRef`
- Rules of Hooks
- Controlled components
- Dependency arrays and stale-closure basics
- Basic async state concepts

## Learning Outcomes

By the end of this day you should be able to:

- Explain what a custom hook is and why it starts with `use`.
- Separate reusable behavior from UI rendering.
- Explain why two calls to the same hook normally have independent state.
- Design a small hook API with sensible inputs, outputs, and defaults.
- Compose hooks safely.
- Handle effect dependencies and cleanup inside reusable hooks.
- Identify SSR/browser-environment problems in browser-only hooks.
- Design explicit async/loading/error contracts.
- Protect async hooks from stale responses and unmounts.
- Decide when `useCallback` is useful inside a custom hook.
- Test a hook through its observable contract.
- Recognize when a custom hook is unnecessary abstraction.

## 1. What Is a Custom Hook?

A custom hook is a JavaScript function whose name starts with `use` and that may call React hooks.

```jsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);

  const toggle = () => setValue((current) => !current);

  return { value, toggle };
}
```

A custom hook does **not** automatically create shared/global state. Each invocation belongs to the component using it:

```text
Component A → useToggle() → state A
Component B → useToggle() → state B
```

The reusable asset is the behavior/logic; the state instance belongs to each consumer.

## 2. Why Extract Logic?

Without extraction, behavior can become duplicated:

```jsx
function PanelA() {
  const [open, setOpen] = useState(false);
  // toggle behavior duplicated
}

function PanelB() {
  const [open, setOpen] = useState(false);
  // same behavior duplicated
}
```

With extraction:

```jsx
function PanelA() {
  const panel = useToggle();
  return <button onClick={panel.toggle}>{panel.value ? 'Close' : 'Open'}</button>;
}
```

The hook owns behavior; the component owns markup, styling, accessibility, and presentation decisions.

## 3. Logic Reuse vs State Sharing

These are different problems.

### Reuse behavior

```jsx
const searchA = useSearch();
const searchB = useSearch();
```

Each has independent state.

### Share one source of truth

If two components must observe and update the same value, consider:

- lifting state to their common parent
- Context for suitable tree-scoped state
- an external client store
- a server-state library for remote/cache state

Do not expect calling the same custom hook twice to synchronize the consumers.

## 4. Rules of Hooks

Hooks must be called:

- at the top level of a React component, or
- at the top level of another custom hook.

Do not call them inside conditions, loops, nested callbacks, event handlers, or ordinary helper functions.

Bad:

```jsx
function useCounter(enabled) {
  if (enabled) {
    const [count, setCount] = useState(0); // ❌
  }
}
```

Good:

```jsx
function useCounter(enabled) {
  const [count, setCount] = useState(0);
  return enabled ? count : 0;
}
```

The `use` prefix is a convention with tooling significance: it helps React's lint rules recognize hook-like functions. It is not a magical runtime registration mechanism.

## 5. Designing a Hook API

A good hook API is small and expresses behavior rather than DOM structure.

Tuple:

```jsx
return [value, toggle];
```

Object:

```jsx
return {
  value,
  increment,
  decrement,
  reset,
};
```

Use an object when there are several named values/actions or when readability matters. Use a tuple when the relationship is obvious and stable.

### API design questions

Before creating a hook, ask:

1. What problem does it solve?
2. What inputs are required?
3. What state does it own?
4. What actions does it expose?
5. What errors/statuses can occur?
6. What cleanup does it guarantee?
7. What does it deliberately **not** control?
8. What are its environment assumptions?

### Avoid over-configured hooks

Prefer a focused API:

```jsx
useDebouncedValue(query, 300)
```

over an abstraction that exposes unrelated policy flags:

```jsx
useSearch({ query, debounce: true, cache: true, analytics: true, ... })
```

If the second API represents several independent concerns, compose smaller hooks instead.

## 6. Parameterized Hooks

```jsx
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);

  const increment = () => setCount((current) => current + 1);
  const decrement = () => setCount((current) => current - 1);
  const reset = () => setCount(initial);

  return { count, increment, decrement, reset };
}
```

Prefer parameters that represent real behavior. Avoid turning one hook into a configuration object with unrelated flags.

### Important subtlety: changing parameters

`initial` is used as the initial state value; changing it later does **not** automatically reset the state. If the desired contract is "reset whenever the input changes," that behavior should be explicit and carefully designed rather than assumed.

## 7. Hook Dependencies and Closures

Custom hooks inherit the same dependency rules as components.

Bad:

```jsx
function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, []); // ❌ stale title
}
```

Good:

```jsx
function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
```

If a hook accepts a function, object, or array, its identity may change between renders. Do not suppress dependency warnings blindly. First understand whether the dependency should be stable, derived inside the effect, or represented differently in the hook API.

### Dependency design rule

A custom hook should make its reactive inputs explicit. If an effect depends on `query`, `userId`, and `onSuccess`, the hook should not hide those relationships merely to produce a smaller dependency array.

## 8. Effects and Cleanup Inside Hooks

A hook can encapsulate an effect when the effect is part of the reusable behavior.

```jsx
function useWindowWidth() {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
}
```

The cleanup is part of the hook's contract. A reusable hook that subscribes to something must release that subscription.

### Strict Mode lesson

In development Strict Mode, React may perform an extra setup/cleanup cycle to expose missing cleanup. A correct hook should remain safe under setup → cleanup → setup.

## 9. `useLocalStorage` Safely

A browser-only abstraction needs to account for malformed data, unavailable storage, and server rendering.

```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        setValue(JSON.parse(raw));
      }
    } catch {
      // Keep the in-memory fallback.
    }
  }, [key]);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage may be blocked, unavailable, or full.
    }
  }, [key, value]);

  return [value, setValue];
}
```

This version deliberately defers browser access to an effect so the initial render does not require `window`/`localStorage`. In a production application, decide explicitly how hydration, cross-tab synchronization, serialization, and storage failures should work.

This hook is a client persistence convenience—not a secure database and not a replacement for server persistence.

## 10. Practical Hooks

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
function useSearch(initial = '') {
  const [query, setQuery] = useState(initial);
  const clear = () => setQuery('');

  return { query, setQuery, clear };
}
```

## 11. Composition

Custom hooks become more powerful when small hooks compose into a larger behavior.

```jsx
function useSearchController(initial = '') {
  const { query, setQuery, clear } = useSearch(initial);
  const { value: loading, setOn: start, setOff: stop } = useToggle(false);

  return { query, setQuery, clear, loading, start, stop };
}
```

Composition should remain understandable. If a composed hook hides too many unrelated policies, split it into focused hooks.

## 12. Stable Actions and `useCallback`

Do **not** add `useCallback` automatically to every function returned from a hook.

Use it when stable function identity has a meaningful consumer, such as a memoized child or an effect dependency:

```jsx
function useCounter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((current) => current + 1);
  }, []);

  return { count, increment };
}
```

This connects directly to Day 32: memoization should solve a demonstrated identity/performance problem, not become ceremony.

## 13. When Not to Create a Custom Hook

Keep logic in the component when it is:

- tiny and local
- unlikely to repeat
- easier to understand inline
- not actually stateful or effectful

A normal function is often better for pure transformations:

```jsx
function formatPrice(value) {
  return new Intl.NumberFormat('en-IN').format(value);
}
```

Do not create `useFormatPrice()` merely because the function is used inside a component. A hook should normally exist because it coordinates React state, effects, refs, context, or other hook-based behavior.

## 14. Testing Custom Hooks

Test the **public contract**, not internal implementation details.

For `useCounter`:

- initial value
- increment
- decrement
- reset

For an async hook:

- initial/loading status
- success data
- error state
- retry/refetch contract
- cancellation/unmount behavior
- stale-response protection

For an effect hook:

- setup occurs when expected
- cleanup occurs when dependencies change/unmount
- no duplicate subscription remains

Use a component-level integration test when that better represents real usage. The hook abstraction itself is not automatically a reason to create a specialized test harness.

## 15. Accessibility and Consumer Responsibility

A custom hook should generally expose behavior, not assume a particular visual UI.

For example, `useToggle()` can return `value` and `toggle`; the consuming component decides whether that behavior becomes:

- a button
- a disclosure
- a switch
- a menu state

The component remains responsible for correct semantics, labels, keyboard behavior, focus management, and ARIA attributes when needed.

## 16. Async Hooks and Cancellation

Async hooks need more than `loading` and `data`. They should define what happens when a request is superseded, cancelled, fails, or finishes after the consumer is no longer interested.

A robust conceptual state model is:

```text
idle → loading → success
             ↘ error

loading/success/error → loading (refetch)
```

Cancellation is not necessarily an application error. Keep cancellation semantics distinct from a real network/server failure when the consumer needs to know the difference.

Example:

```jsx
function useUser(userId) {
  const [state, setState] = useState({
    status: 'idle',
    data: null,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function load() {
      setState({ status: 'loading', data: null, error: null });

      try {
        const response = await fetch(`/api/users/${userId}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        if (active) {
          setState({ status: 'success', data, error: null });
        }
      } catch (error) {
        if (error?.name === 'AbortError') return;
        if (active) {
          setState({ status: 'error', data: null, error });
        }
      }
    }

    load();

    return () => {
      active = false;
      controller.abort();
    };
  }, [userId]);

  return state;
}
```

The `active` guard demonstrates the response-ownership idea; `AbortController` reduces unnecessary work. For more complex data fetching, prefer a dedicated server-state/data-fetching abstraction rather than rebuilding caching, retries, deduplication, and invalidation in every custom hook.

## 17. Hook Contract and State-Machine Design

Before implementing an async or effectful hook, document its observable contract.

| State/Action | Expected behavior |
|---|---|
| initial render | deterministic initial state |
| input changes | old work is cleaned/cancelled where appropriate |
| loading | consumer can show progress |
| success | data is available and error is cleared |
| error | error is exposed without hiding useful previous data unless contract says so |
| cancellation | no stale update is published |
| unmount | subscriptions/work are cleaned up |
| retry | new request has clear ownership |

This prevents a common mistake: implementing internal effects first and only later deciding what the hook's API should mean.

## Visual Concept Map

```text
                    Custom Hook
                         │
          ┌──────────────┼──────────────┐
          ↓              ↓              ↓
       State           Effects          Refs
          │              │              │
          └──────────────┼──────────────┘
                         ↓
                 Reusable Behavior
                         ↓
                Small Public API
                         ↓
              ┌──────────┴──────────┐
              ↓                     ↓
        Component A            Component B
        own state              own state
```

## End-to-End Practical

Build a reusable `useSearch` hook and two different consumers.

### Hook

```jsx
function useSearch(initial = '') {
  const [query, setQuery] = useState(initial);

  const clear = () => setQuery('');

  return { query, setQuery, clear };
}
```

### Consumer A — table filter

```jsx
function ProductFilter() {
  const { query, setQuery, clear } = useSearch();

  return (
    <section>
      <label htmlFor="product-filter">Filter products</label>
      <input
        id="product-filter"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="button" onClick={clear}>Clear</button>
    </section>
  );
}
```

### Consumer B — command search

```jsx
function CommandSearch() {
  const { query, setQuery, clear } = useSearch();

  return (
    <section>
      <label htmlFor="command-search">Search commands</label>
      <input
        id="command-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="button" onClick={clear}>Reset</button>
    </section>
  );
}
```

The hook is reused, but the two queries remain independent.

## Hands-on Coding

### Lab 1 — Extract

Take duplicated toggle logic from two components and create `useToggle`.

**Acceptance:** both components reuse the hook and retain independent state.

### Lab 2 — Persistence

Create `useLocalStorage` with malformed JSON recovery and browser-only access protection.

**Acceptance:** it does not crash when storage is unavailable and does not require `window` during server rendering.

### Lab 3 — Async Contract

Design a hook API for loading/error/data/refetch without implementing it first.

**Acceptance:** explain every returned field and its lifecycle.

### Lab 4 — State Sharing

Use the same custom hook in two components and demonstrate independent state. Then redesign the example using lifted state when shared state is required.

**Acceptance:** explain why the architecture changed.

### Lab 5 — Effect Cleanup

Build `useOnlineStatus` using a browser event subscription.

**Acceptance:** subscription is registered once per relevant lifecycle and removed during cleanup.

### Lab 6 — Cancellation

Build a search hook that cancels or supersedes an old request when the query changes rapidly.

**Acceptance:** an older response cannot overwrite a newer result, cancellation is not shown as a generic error, and cleanup occurs on unmount.

## Debugging Lab

### Bug 1 — Conditional Hook

```jsx
function useFeature(enabled) {
  if (enabled) {
    useEffect(() => {}, []); // ❌
  }
}
```

**Fix:** call the hook unconditionally and place the condition inside the effect or restructure the hook contract.

### Bug 2 — Stale Dependency

```jsx
function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, []); // ❌
}
```

**Fix:** include `[title]`.

### Bug 3 — Browser API During Render

```jsx
function useStorage(key) {
  const [value] = useState(window.localStorage.getItem(key)); // ❌ SSR risk
  return value;
}
```

**Fix:** use an environment-safe initialization strategy and defer browser-only access when appropriate.

### Bug 4 — Missing Cleanup

```jsx
function useOnlineStatus() {
  useEffect(() => {
    window.addEventListener('online', handleOnline);
  }, []); // ❌ no cleanup
}
```

**Fix:** return cleanup that removes the same listener reference.

### Bug 5 — Unnecessary Memoization

A hook returns a simple action and wraps every function in `useCallback` without any memoized consumer or dependency need.

**Fix:** remove unnecessary memoization unless stable identity provides a demonstrated benefit.

### Bug 6 — Stale Async Response

Two requests are started for different inputs. The older request resolves last and overwrites the newer result.

**Fix:** cancel/supersede old work and/or track request ownership so only the current request may publish its result.

### Bug 7 — Hook Used for Shared State

Two components call `useCart()` and expect changes in one instance to appear in the other.

**Fix:** move the source of truth to an appropriate shared-state mechanism. A custom hook alone does not create shared state.

## Mini Exercise

For each scenario, decide whether a custom hook is appropriate:

1. Formatting a currency value.
2. Reusing a window event subscription.
3. Sharing one counter between sibling components.
4. Reusing a toggle behavior in ten components.
5. Calling a pure sorting function.
6. Encapsulating an abortable request used by several screens.

**Expected:** 1 no, 2 yes, 3 not by itself (lift/share state), 4 yes, 5 no, 6 yes when the request behavior and contract are genuinely reusable.

## Assessment Quiz

1. What makes a function a custom hook?
2. Does calling the same hook in two components share state?
3. Why are hooks restricted to the top level?
4. Why is `use` important in a custom hook name?
5. When is an object return value preferable to a tuple?
6. Why should a hook generally not return JSX?
7. How should effect dependencies be handled inside a hook?
8. Why is cleanup part of a reusable effect hook's contract?
9. What SSR problem can `localStorage` introduce?
10. When is a normal function better than a custom hook?
11. How should an async hook handle an obsolete request?
12. Why should cancellation and application errors be distinguishable?
13. When should a custom hook use `useCallback`?
14. Why doesn't a custom hook automatically provide shared state?

### Answers

1. It is a hook-capable function, conventionally named with `use`, that composes React hooks to provide reusable behavior.
2. No. Each invocation normally owns its own state.
3. React relies on consistent hook call order across renders.
4. It enables hook lint/tooling conventions and communicates hook semantics to readers.
5. When several named values/actions make positional meaning unclear.
6. Rendering belongs to components; keeping hooks UI-agnostic improves reuse.
7. Treat them like component effects: declare every reactive dependency required by the effect and avoid suppressing warnings without understanding the closure.
8. Subscriptions/resources must be released to prevent leaks, duplicate listeners, and stale work.
9. Browser globals may not exist during server rendering; direct access during render can crash or create hydration problems.
10. When the logic is pure, local, and does not need React state/effects/refs/context.
11. Cancel it where possible and prevent its result from publishing if it no longer owns the current request.
12. A cancelled/superseded request is often expected control flow, while a network/server failure may require user-visible error handling.
13. Only when stable identity has a meaningful consumer or contract; it is not required for every returned action.
14. Each invocation has its own hook state; shared state requires a shared owner or state mechanism.

## Interview Questions and Answers

### Beginner

**Q: What problem do custom hooks solve?**  
They extract reusable stateful/effectful behavior so multiple components can use the same logic without duplicating it.

**Q: Do custom hooks create global state?**  
No. Each call normally has an independent state instance.

**Q: Can a custom hook call another custom hook?**  
Yes, while respecting the Rules of Hooks.

### Intermediate

**Q: How do you decide a hook's API?**  
Start from the consumer's required inputs, state, actions, status, errors, and cleanup. Keep the surface small and domain-appropriate.

**Q: Should every function returned by a hook use `useCallback`?**  
No. Stable identity should have a reason, such as a memoized consumer or dependency relationship.

**Q: How should a hook handle errors?**  
Expose a predictable error/status contract and let the component decide how the error is presented.

### Advanced

**Q: How do custom hooks interact with stale closures?**  
A custom hook creates closures just like a component. Effects and callbacks must use correct dependencies or functional updates so they observe the intended values.

**Q: How would you make a browser-only hook SSR-safe?**  
Avoid unguarded browser-global access during render, isolate browser work appropriately, and define a clear hydration/fallback contract.

**Q: When should reusable logic become a shared state mechanism instead of a custom hook?**  
When multiple consumers need one coordinated source of truth rather than independent instances. The correct mechanism depends on whether the state is local, tree-scoped, client-global, or server/cache state.

**Q: What makes a custom hook production-quality?**  
A clear contract, correct hook dependencies, cleanup, predictable error/status behavior, appropriate environment boundaries, testable behavior, and no unnecessary abstraction.

**Q: How would you design an async hook used by a search screen?**  
Define explicit idle/loading/success/error states, cancel or supersede obsolete requests, prevent stale results from publishing, expose retry/refetch behavior, and keep UI presentation outside the hook.

## Production Checklist

Before shipping a custom hook, verify:

- [ ] Its purpose can be explained in one sentence.
- [ ] It follows the Rules of Hooks.
- [ ] Inputs and outputs form a small, documented contract.
- [ ] It does not accidentally share state between consumers.
- [ ] Effects list correct reactive dependencies.
- [ ] External subscriptions/resources have cleanup.
- [ ] Async work cannot publish an obsolete result incorrectly.
- [ ] Cancellation is distinguished from genuine application/network errors where needed.
- [ ] Browser-only APIs are safe for the target rendering environment.
- [ ] Error and loading states are explicit when applicable.
- [ ] Accessibility decisions remain with the consuming UI where appropriate.
- [ ] Memoization is justified rather than automatic.
- [ ] Tests cover observable behavior.
- [ ] The abstraction reduces duplication rather than hiding complexity.
- [ ] Documentation explains important invariants and limitations.

## Final Project

Build a **Reusable Dashboard Toolkit** containing:

- `useToggle`
- `useCounter`
- `useSearch`
- `useLocalStorage`
- `useOnlineStatus`
- one domain-specific hook of your own

Use each where reuse is justified. For every hook document:

1. purpose
2. parameters
3. returned API
4. state ownership
5. effects/resources
6. cleanup behavior
7. error behavior
8. SSR/browser assumptions
9. testing strategy
10. async ownership/cancellation rules where applicable

### Final Acceptance Criteria

- [ ] No conditional/loop/nested hook calls.
- [ ] Each hook has a clear public contract.
- [ ] No accidental global/shared state.
- [ ] Effects have correct dependencies.
- [ ] Effects clean up subscriptions/resources.
- [ ] Browser APIs are handled safely.
- [ ] Async hooks cannot publish stale results.
- [ ] At least two consumers demonstrate legitimate reuse.
- [ ] Tests verify behavior through the public API.
- [ ] No unnecessary `useCallback`/`useMemo`.
- [ ] README explains why each hook exists.

## Self Check

- [ ] I can explain logic reuse vs state sharing.
- [ ] I know the Rules of Hooks.
- [ ] I can design a clean hook API.
- [ ] I can parameterize a hook.
- [ ] I understand dependency arrays inside hooks.
- [ ] I can implement cleanup correctly.
- [ ] I understand browser/SSR boundaries.
- [ ] I can design a clear async hook contract.
- [ ] I know how to protect against stale async responses.
- [ ] I know when not to abstract.
- [ ] I can test a hook through its public contract.

## Day 33 Outcome

You can now design custom hooks as focused, reusable behavior modules rather than as generic wrappers around arbitrary code. You understand state ownership, hook rules, effect dependencies, cleanup, browser boundaries, API design, async cancellation, testing, and appropriate abstraction.

**Next:** Day 34 — reusable logic patterns, where these fundamentals are applied to more advanced async, debouncing, pagination, composition, and cancellation patterns.
