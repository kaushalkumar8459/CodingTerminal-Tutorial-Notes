---
title: Dependency Array
slug: day-023-dependency-array
dayLabel: Day 23
level: Beginner
estimatedMinutes: 35
order: 23
track: react
---
# Day 23 [Beginner to Intermediate]: Dependency Array

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
- [Day 23 Outcome](#day-23-outcome)

## Goal

Master dependency array behavior to avoid unnecessary effects and bugs.

## Prerequisites

- Day 22 completed
- Basic `useEffect` understanding

## Explanation

The dependency array tells React when to run an effect again. Correct dependencies make effects reliable. Wrong dependencies can cause stale values, too many runs, or infinite loops.

## Topic by Topic

### Topic 1: No Dependency Array

Theory:
Effect runs after every render.

Code Example:

```jsx
useEffect(() => {
  console.log("Runs after every render");
});
```

**Explanation:** This is useful for rare cases, but often causes extra work if the component renders often.

**Key Points:**

- Runs after every render cycle.
- Can become expensive in large components.
- Use only when that behavior is intentional.

### Topic 2: Empty Dependency Array

Theory:
Effect runs once on mount.

Code Example:

```jsx
useEffect(() => {
  console.log("Runs once");
}, []);
```

**Explanation:** Use this for one-time setup like initial fetch, startup logs, or reading local storage.

**Key Points:**

- Runs once after first mount.
- Similar to componentDidMount behavior.
- Keep it short and focused.

### Topic 3: Specific Dependencies

Theory:
Effect runs when listed values change.

Code Example:

```jsx
useEffect(() => {
  console.log("Runs when query changes");
}, [query]);
```

**Explanation:** This prevents unnecessary runs and ties effect execution to meaningful state changes.

**Key Points:**

- Re-runs only on listed value changes.
- Most common and safest effect style.
- Improves correctness and performance.

### Topic 4: Missing Dependencies Risk

Theory:
If you use a value inside effect but do not list it, effect may use stale data.

Practical:
Include all outside variables used by effect callback.

**Explanation:** Missing dependency can make your effect read old values (stale closure), creating confusing bugs.

**Key Points:**

- Include every external value used inside effect.
- Trust hook lint suggestions in most cases.
- Missing deps can break business logic silently.

### Topic 5: Infinite Loop Example

Theory:
If effect sets state that is always in its dependencies, it can loop.

Code Example:

```jsx
useEffect(() => {
  setCount((c) => c + 1);
}, [count]);
```

**Explanation:** This re-runs forever because `count` changes every time.

**Key Points:**

- Avoid direct loop patterns in effects.
- Use conditions before state updates when needed.
- Think through state change impact before adding dependencies.

## Key Concepts

- Effect run timing depends on dependencies
- Include all values read inside effect
- Avoid loop-causing state updates
- Prefer predictable and focused effects

## Visual Concept Map

```mermaid
flowchart LR
		A[useEffect] --> B[No Array -> Every Render]
		A --> C[[] -> Mount Only]
		A --> D[[x, y] -> On x or y Change]
		D --> E[Correct Re-run]
```

## End-to-End Practical

1. Create search input state.
2. Add effect that logs query.
3. Add query to dependency array.
4. Observe effect run only when query changes.

## Hands-on Coding

### Example 1: Search Tracking

```jsx
import { useEffect, useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query.trim()) return;
    console.log("Search for:", query);
  }, [query]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Type search text"
    />
  );
}
```

### Example 2: Multiple Dependencies

```jsx
useEffect(() => {
  console.log("Filters changed");
}, [category, sort]);
```

## Mini Exercise

Scenario:
Create a filter panel with two states: category and sort order. Log message whenever either changes.

Expected output:

- Effect runs when category changes
- Effect runs when sort changes
- No run from unrelated state updates

## Assessment Quiz

### Quiz Questions

1. What does `[]` mean in `useEffect`?
2. What if dependency array is missing?
3. Why include all external variables used in effect?
4. How can infinite loops happen in effects?
5. Can dependency array have multiple values?

### Quiz Answers

1. Run once after mount
2. Effect runs after every render
3. To prevent stale values and bugs
4. Effect repeatedly updates dependency-linked state
5. Yes

## Task

- Create one effect with one dependency
- Create second effect with multiple dependencies
- Explain why each dependency is included

## Self Check

- You can choose right dependency pattern
- You can detect loop risks
- You can avoid stale effect values

## Interview Questions and Answers

### Beginner

**Question:** What is dependency array in React?

**Answer:** It controls when an effect re-runs.

**Question:** Does empty array run on every render?

**Answer:** No, only once after mount.

### Middle

**Question:** Why should we include function dependencies sometimes?

**Answer:** Because closures can capture old values; dependencies keep effect aligned.

**Question:** How do you prevent extra re-renders from effects?

**Answer:** Use correct dependencies and avoid unnecessary state updates.

### Advanced

**Question:** What is stale closure in effects?

**Answer:** Effect callback using old variable values because dependencies were incomplete.

**Question:** Why is lint rule for hooks useful?

**Answer:** It catches missing dependencies and common hook mistakes early.

## Day 23 Outcome

- You can reason about effect re-run behavior
- You can write safer dependency arrays
- You are ready to handle cleanup logic
