---
title: Dependency Arrays, Closures & Effect Correctness
slug: day-023-dependency-array
dayLabel: Day 23
level: Intermediate
estimatedMinutes: 150
order: 23
track: react
---
# Day 23 [Intermediate]: Dependency Arrays, Closures & Effect Correctness

## Index

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Core Mental Model](#core-mental-model)
- [Visual Concept Map](#visual-concept-map)
- [Topic by Topic](#topic-by-topic)
- [Dependency Decision Framework](#dependency-decision-framework)
- [End-to-End Practical](#end-to-end-practical)
- [Hands-on Labs](#hands-on-labs)
- [Common Mistakes](#common-mistakes)
- [Debugging Exercises](#debugging-exercises)
- [Dependency Debugging Checklist](#dependency-debugging-checklist)
- [Assessment](#assessment)
- [Assessment Answers](#assessment-answers)
- [Interview Questions and Answers](#interview-questions-and-answers)
- [Final Verification Checklist](#final-verification-checklist)
- [Day 23 Outcome](#day-23-outcome)

## Goal

Understand exactly how `useEffect` dependencies control synchronization, why stale closures happen, why object/function dependencies matter, and how to fix dependency problems without hiding them.

By the end of this lesson, you should be able to answer a more useful question than “How do I use a dependency array?”:

> **What reactive values does this synchronization read, and what should cause that synchronization to be repeated?**

## Prerequisites

- Day 22 — `useEffect` basics
- JavaScript closures
- State and props
- Functional state updates
- Basic object/reference identity

## Core Mental Model

A dependency array is **not a performance hint that you can freely edit**. It describes the reactive values used by an effect so React can determine when the synchronization needs to be repeated.

Conceptually:

```text
Render N
   ↓
Effect callback captures values from render N
   ↓
React commits
   ↓
Compare dependency values with previous committed render
   ↓
Changed? ── No ──> keep existing synchronization
   │
  Yes
   ↓
Previous cleanup
   ↓
New setup
```

React compares dependency values using `Object.is` semantics. Objects, arrays, and functions therefore depend on reference identity rather than deep equality.

### The Three Questions

Whenever you see an effect, ask:

1. **What external system am I synchronizing with?**
2. **Which reactive values does the synchronization read?**
3. **What should happen when those values change?**

If there is no external system, first ask whether the logic belongs in render or an event handler instead.

## Visual Concept Map

```text
                 useEffect
                     │
          ┌──────────┴──────────┐
          ↓                     ↓
   External system         No external system
          │                     │
          ↓                     ↓
   Identify reactive      Prefer render or
      dependencies         event handler
          │
          ↓
     Dependency array
          │
    ┌─────┴─────┐
    ↓           ↓
 changed      unchanged
    ↓           ↓
 cleanup      no new setup
    ↓
 new setup
```

## Topic by Topic

### 1. No Dependency Array

```jsx
useEffect(() => {
  console.log("After every committed render");
});
```

Valid, but broad. Use it only when synchronization after every committed render is actually intended.

### 2. Empty Dependency Array

```jsx
useEffect(() => {
  connectToAnalytics();
}, []);
```

This effect does not re-run because of later reactive changes. However, values captured by the callback still come from the render that created it.

Do **not** use `[]` merely to silence dependency concerns.

Development Strict Mode can perform an extra setup → cleanup → setup cycle, so setup must be reversible.

### 3. Specific Dependencies

```jsx
useEffect(() => {
  document.title = `Search: ${query}`;
}, [query]);
```

When `query` changes according to dependency comparison, React re-synchronizes the effect.

### 4. Dependency Comparison Uses `Object.is`

```jsx
Object.is(1, 1); // true
Object.is("a", "a"); // true
Object.is({}, {}); // false
Object.is([], []); // false
```

Therefore:

```jsx
const options = { roomId };

useEffect(() => {
  connect(options);
}, [options]);
```

`options` has a new reference on every render, so the effect can reconnect on every render.

### 5. Better Object Dependency Design

Sometimes the simplest fix is to construct the object inside the effect:

```jsx
useEffect(() => {
  const options = { roomId };

  connect(options);

  return () => disconnect(options);
}, [roomId]);
```

Now the dependency is the primitive reactive value that actually determines the synchronization.

`useMemo` can stabilize an object identity when that identity itself matters, but it should not be used as a bandage for a poorly designed effect.

### 6. Functions as Dependencies

Functions declared during render normally receive a new identity on each render:

```jsx
const createOptions = () => ({ roomId });
```

If an effect depends on `createOptions`, the effect can re-run whenever the function identity changes.

Before adding `useCallback`, ask:

- Can the function move inside the effect?
- Can the effect depend on its primitive inputs instead?
- Can the effect be removed entirely?

Use memoization when it solves a real identity or performance requirement.

### 7. Stale Closures

```jsx
useEffect(() => {
  console.log(query);
}, []);
```

The callback captures `query` from the render that created it. If `query` changes later, this effect does not re-synchronize because `query` is absent from the dependency list.

Prefer:

```jsx
useEffect(() => {
  console.log(query);
}, [query]);
```

A stale closure is ordinary JavaScript closure behavior combined with a synchronization boundary that did not re-run.

### 8. Functional Updates Can Remove a Dependency

```jsx
useEffect(() => {
  const id = setInterval(() => {
    setCount((current) => current + 1);
  }, 1000);

  return () => clearInterval(id);
}, []);
```

The callback does not read `count`; React supplies the latest value to the updater. Therefore `count` does not need to be a dependency of this effect.

This is a legitimate dependency reduction because the code no longer reads that reactive value.

### 9. Infinite Effect Loops

```jsx
useEffect(() => {
  setCount(count + 1);
}, [count]);
```

Sequence:

```text
count changes
→ effect runs
→ setCount changes count
→ render
→ dependency changed
→ effect runs again
→ ...
```

Do not “fix” this by blindly removing `count`. First decide whether the effect should exist at all.

### 10. Props as Dependencies

```jsx
function User({ userId }) {
  useEffect(() => {
    loadUser(userId);
  }, [userId]);

  return <p>User: {userId}</p>;
}
```

If synchronization reads a reactive prop, that prop is part of the effect's reactive input.

### 11. Multiple Dependencies

```jsx
useEffect(() => {
  loadProducts({ category, sort });
}, [category, sort]);
```

The effect can re-synchronize when either `category` or `sort` changes.

### 12. Dependency Array Is Not an Event Filter

Avoid thinking:

> `[query]` means “run when query changes.”

A more precise model is:

> The effect synchronizes after a committed render when the dependency values differ from the previous committed dependency values.

This matters for initial setup, cleanup, Strict Mode, and modern React rendering behavior.

### 13. Exhaustive-Deps Linting

The Hooks lint rule helps identify reactive values read by an effect that are not represented in the dependency list.

When a warning appears:

1. Read it.
2. Identify the captured value.
3. Decide whether the value is genuinely reactive.
4. Restructure the effect if appropriate.
5. Include the dependency when the effect reads it.

Do not disable the rule mechanically.

### 14. Dependency Completeness vs Dependency Optimization

These are different goals.

**Completeness:** the effect accurately declares values it reads and depends on.

**Optimization:** the effect avoids unnecessary re-synchronization.

Solve correctness first. Then reduce unnecessary dependencies by restructuring code—not by lying in the dependency array.

## Dependency Decision Framework

When an effect has too many dependencies, use this sequence:

```text
Too many dependencies?
        ↓
Does an external system exist?
   ┌────┴────┐
  No        Yes
  ↓           ↓
Remove     What values are read?
 effect         ↓
             Can logic move
             inside effect?
                 ↓
             Can derived data
             stay in render?
                 ↓
             Can functional update
             avoid reading state?
                 ↓
             Are object/function
             identities intentional?
```

### Questions to ask

1. Is the effect doing more than one job?
2. Can some logic move into an event handler?
3. Is some value merely derived data?
4. Can an object/function be created inside the effect?
5. Would a functional state update avoid reading state?
6. Is an external system actually being synchronized?
7. Do I truly need this effect?

## End-to-End Practical

### Search Synchronization

```jsx
function Search({ query, category }) {
  useEffect(() => {
    const params = new URLSearchParams({ query, category });
    document.title = `Search: ${query || "All"}`;

    return () => {
      console.log("cleanup", params.toString());
    };
  }, [query, category]);

  return <p>Searching...</p>;
}
```

This example intentionally has two reactive inputs. When either changes, the previous synchronization is cleaned up and the new synchronization is established.

> In a real data-fetching implementation, cleanup should cancel or invalidate the request rather than merely log a message. API cancellation is covered later in the series.

### Acceptance Criteria

- [ ] The learner can identify the external system.
- [ ] Both reactive inputs are declared.
- [ ] Cleanup corresponds to setup.
- [ ] No derived state is introduced.
- [ ] The learner can explain why each dependency exists.

## Hands-on Labs

### Lab 1 — Stale Search Logger

Start with:

```jsx
useEffect(() => {
  const id = setTimeout(() => {
    console.log(query);
  }, 500);

  return () => clearTimeout(id);
}, []);
```

Answer:

- What value does the timeout capture?
- Why does typing not create a new timer?
- What dependency is missing?

Correct version:

```jsx
useEffect(() => {
  const id = setTimeout(() => {
    console.log(query);
  }, 500);

  return () => clearTimeout(id);
}, [query]);
```

### Lab 2 — Interval Without Stale State

Build a timer that increments once per second using a functional updater.

Acceptance:

- [ ] `setInterval` is created in setup.
- [ ] `clearInterval` is returned from cleanup.
- [ ] Functional update is used.
- [ ] `count` is not unnecessarily captured by the interval.

### Lab 3 — Object Dependency Bug

Given:

```jsx
function Room({ roomId }) {
  const options = { roomId };

  useEffect(() => {
    connect(options);
    return () => disconnect(options);
  }, [options]);
}
```

Refactor it so the dependency represents the actual reactive input.

Expected direction:

```jsx
useEffect(() => {
  const options = { roomId };
  connect(options);
  return () => disconnect(options);
}, [roomId]);
```

### Lab 4 — Function Dependency

Create an example where a render-created helper causes unnecessary effect execution. Refactor it by moving the helper into the effect or by removing the effect if no external system is involved.

### Lab 5 — Derived State Smell

Given:

```jsx
const [total, setTotal] = useState(0);

useEffect(() => {
  setTotal(items.reduce((sum, item) => sum + item.price, 0));
}, [items]);
```

Refactor to render-time derivation:

```jsx
const total = items.reduce((sum, item) => sum + item.price, 0);
```

Explain why the effect was unnecessary.

## Common Mistakes

### 1. Empty array everywhere

Often creates stale closures.

### 2. Removing dependencies to stop a loop

This can hide the real design problem.

### 3. Treating dependencies as arbitrary event filters

They describe synchronization inputs.

### 4. Deep-comparing everything manually

Rethink the effect and its inputs before introducing deep comparison.

### 5. Memoizing everything

`useMemo` and `useCallback` have costs and should solve a real identity/performance problem.

### 6. Ignoring object/function identity

Fresh references can cause legitimate dependency changes.

### 7. Ignoring cleanup

A new setup without proper cleanup can accumulate subscriptions, timers, or connections.

### 8. Suppressing dependency warnings

A missing dependency can create stale values and incorrect synchronization.

## Debugging Exercises

### Exercise A — Stale Prop

```jsx
useEffect(() => {
  console.log(user.name);
}, []);
```

**Question:** What happens if `user` changes?

**Answer:** The effect does not re-run because `user` is not represented in its dependencies. The callback can keep the value captured from its original render.

### Exercise B — Object Identity

```jsx
const options = { roomId };

useEffect(() => {
  connect(options);
}, [options]);
```

**Question:** Why can this reconnect on every render?

**Answer:** A new object reference is created on every render, so `Object.is(previousOptions, options)` is false.

### Exercise C — Derived State

```jsx
useEffect(() => {
  setTotal(items.length);
}, [items]);
```

**Question:** Is `total` external synchronization?

**Answer:** No. It is derived data and should normally be calculated during render.

### Exercise D — Event Boundary

```jsx
useEffect(() => {
  if (submitted) saveForm();
}, [submitted]);
```

**Question:** What should you consider first?

**Answer:** If `saveForm` exists only because of a submit action, put it directly in the submit event handler rather than creating an intermediate `submitted` state solely to trigger an effect.

## Dependency Debugging Checklist

When an effect is running too often, not running when expected, or producing stale values:

1. Write down the external system being synchronized.
2. List every prop/state/context value read by the effect and its helpers.
3. Check whether each dependency is primitive or reference-based.
4. Log dependency identities when debugging object/function changes.
5. Check whether a helper can move inside the effect.
6. Check whether an event handler should own the work instead.
7. Check whether the effect can be removed because the value is derived.
8. Verify setup and cleanup are symmetrical.
9. Only after correctness is established, consider memoization or other performance optimizations.

A useful debugging pattern is to compare references explicitly:

```jsx
const previousOptions = useRef(options);

useEffect(() => {
  console.log("options changed", previousOptions.current !== options);
  previousOptions.current = options;
}, [options]);
```

This is a debugging technique, not a reason to suppress the dependency or add `useRef` everywhere.

## Assessment

1. What comparison does React use for dependency values?
2. Why do object dependencies behave differently from primitive dependencies?
3. What is a stale closure?
4. Why can a function dependency cause repeated effects?
5. How can a functional state update remove a dependency?
6. Why is removing a dependency not a universal loop fix?
7. What does Strict Mode reveal about effect setup/cleanup?
8. When should you move logic into the effect itself?
9. When should you remove an effect entirely?
10. What role does exhaustive-deps linting play?
11. What is the difference between dependency correctness and optimization?
12. Why can an object created during render cause an effect to re-run?
13. Why should an effect that handles a button click usually live in the event handler instead?
14. What should you inspect before adding `useMemo` or `useCallback` to an effect dependency problem?

## Assessment Answers

1. React compares each dependency using `Object.is` semantics.
2. Primitive values are compared by value semantics; objects, arrays, and functions are compared by reference identity.
3. A closure uses values captured from a particular render, and the effect does not re-run when those values change because the synchronization dependencies are incomplete.
4. A render-created function normally has a new identity on each render, so a dependency on it can change repeatedly.
5. A functional updater receives the latest state, so the effect need not read that state value from its closure.
6. Removing a dependency can hide a stale-value bug or produce incorrect synchronization.
7. It can perform setup → cleanup → setup in development to expose missing or unsafe cleanup assumptions.
8. When the helper is only needed for that synchronization and moving it inside the effect reduces unnecessary reactive dependencies.
9. When there is no external system and the work is actually derived data or event-driven logic.
10. It helps detect reactive values read by an effect that are not represented in the dependency list.
11. Correctness means declaring the real reactive inputs; optimization means reducing unnecessary re-synchronization after correctness is established.
12. Each render creates a new reference, and dependency comparison sees the reference as changed.
13. User actions are event-driven rather than synchronization with an external system; an effect can add an unnecessary render-to-effect chain.
14. First verify the effect is necessary and inspect whether the object/function can be moved inside the effect or replaced with primitive dependencies.

## Interview Questions and Answers

### Beginner

**What is a dependency array?**  
It tells React which reactive values the effect depends on so React can determine when to re-synchronize it.

**What does `[]` mean?**  
The effect declares no later reactive dependencies. Development Strict Mode can still perform an extra setup/cleanup cycle.

### Intermediate

**Why can `[{}]` cause repeated execution?**  
The object literal creates a new reference each render, so dependency comparison sees a change.

**What is a stale closure?**  
An effect callback captures values from a particular render and continues using those captured values because the effect did not re-run when the relevant values changed.

**Should `useCallback` fix every function dependency?**  
No. First ask whether the function can move inside the effect or whether the effect is unnecessary.

### Advanced

**Why is the dependency array not a performance hint?**  
Changing it changes the synchronization contract. Omitting a required dependency can make the effect incorrect, not merely slower.

**How would you diagnose an effect that runs too often?**  
Identify the external system, inspect every dependency, check object/function identity, determine whether the effect has multiple responsibilities, and consider whether the effect can be removed or restructured.

**How would you fix an effect with too many dependencies?**  
Do not delete dependencies blindly. Move helpers inside the effect, derive pure values during render, move event-specific work into event handlers, use functional updates where appropriate, and split unrelated synchronization processes.

**Why does functional state update legitimately reduce dependencies?**  
Because the updater receives the current state value, so the effect no longer reads that state from its closure.

**How do modern rendering behavior and Strict Mode affect reasoning?**  
Effects should be treated as reversible synchronization work. Setup must not depend on an assumption that it can only happen once in development.

## Final Verification Checklist

### Structure

- [ ] Index is complete.
- [ ] Goal is explicit.
- [ ] Prerequisites are stated.
- [ ] Outcome connects to Day 24.

### Conceptual depth

- [ ] No-array behavior explained.
- [ ] Empty-array behavior explained.
- [ ] Specific dependencies explained.
- [ ] `Object.is` comparison explained.
- [ ] Reference identity explained.
- [ ] Stale closures explained.
- [ ] Functional updater dependency reduction explained.
- [ ] Infinite-loop reasoning explained.
- [ ] Exhaustive-deps reasoning explained.
- [ ] Correctness vs optimization distinguished.

### Practical depth

- [ ] Object dependency lab.
- [ ] Function dependency lab.
- [ ] Stale closure lab.
- [ ] Timer lab.
- [ ] Derived-state refactoring lab.
- [ ] Dependency debugging checklist.
- [ ] Debugging exercises.
- [ ] Acceptance criteria.

### Interview readiness

- [ ] Beginner questions.
- [ ] Intermediate questions.
- [ ] Advanced questions.
- [ ] Scenario-based reasoning.

## Day 23 Outcome

You can now reason about dependency arrays instead of memorizing patterns. You understand stale closures, reference identity, functional updates, dependency completeness, effect loops, and the difference between fixing correctness and optimizing execution.

**Next:** Day 24 — cleanup functions, cancellation, subscriptions, timers, and effect lifecycle in practical scenarios.
