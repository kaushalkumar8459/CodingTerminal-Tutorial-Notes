---
title: Object State Handling
slug: day-010-object-state-handling
dayLabel: Day 10
level: Intermediate
estimatedMinutes: 60
order: 10
track: react
---
# Day 10: Object State Handling

## Goal

Learn when object state is useful and how to update objects immutably, including nested objects and generic form handlers.

## Prerequisites

Day 9 and `useState`, spread syntax, objects, and controlled inputs.

## 1. Object State

Related values can be represented as one state object.

```jsx
const [profile, setProfile] = useState({
  firstName: "",
  lastName: "",
  age: "",
});
```

Grouping is useful when fields belong to the same domain model or form. It is not mandatory for every group of values.

## 2. Immutable Updates

React state should be treated as read-only. Create a new object rather than mutating the existing object.

```jsx
setProfile((current) => ({
  ...current,
  firstName: "Karan",
}));
```

The spread copies existing properties and the later property replaces the selected field.

Avoid:

```jsx
profile.firstName = "Karan";
```

because it mutates the existing state object.

## 3. Generic Form Handler

```jsx
function handleChange(event) {
  const { name, value } = event.target;
  setProfile((current) => ({
    ...current,
    [name]: value,
  }));
}
```

The computed property `[name]` updates the property whose key matches the input's `name` attribute.

```jsx
<input name="firstName" value={profile.firstName} onChange={handleChange} />
```

## 4. Why the Spread Matters

State setters replace the state value; they do not automatically merge object fields for you.

```jsx
setProfile({ firstName: "Asha" });
```

This creates an object containing only `firstName`.

Use:

```jsx
setProfile((current) => ({ ...current, firstName: "Asha" }));
```

when you want to preserve the other fields.

## 5. Nested Object Updates

For nested data, preserve each level you modify.

```jsx
setProfile((current) => ({
  ...current,
  address: {
    ...current.address,
    city: "Pune",
  },
}));
```

Spreading only the outer object would still replace the entire `address` object if you supplied a new `address` value without preserving its siblings.

## 6. Objects Containing Arrays

The same immutability principle applies when an object contains an array.

```jsx
setProfile((current) => ({
  ...current,
  skills: [...current.skills, "React"],
}));
```

The outer object and inner array both receive new references.

## 7. Functional Updates

Prefer a functional setter when the new object depends on the previous object.

```jsx
setProfile((current) => ({
  ...current,
  age: Number(current.age) + 1,
}));
```

This makes the dependency on previous state explicit.

## 8. Resetting Object State

Keep an initial object that represents the desired reset state.

```jsx
const initialProfile = { firstName: "", lastName: "", age: "" };
const [profile, setProfile] = useState(initialProfile);

function reset() {
  setProfile(initialProfile);
}
```

For mutable nested defaults, create fresh objects when necessary rather than sharing mutable references.

## 9. When Object State Is Not Ideal

Do not group unrelated values merely because an object is convenient. Independent UI state such as `isMenuOpen` may be clearer as a separate state variable.

For very complex transitions with many related rules, `useReducer` can become a better fit; that topic appears later in the curriculum.

## Complete Example

```jsx
import { useState } from "react";

const initialProfile = {
  firstName: "",
  lastName: "",
  city: "",
  address: { country: "India", city: "" },
  skills: [],
};

export default function ProfileEditor() {
  const [profile, setProfile] = useState(initialProfile);

  function handleChange(event) {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  }

  function addSkill() {
    setProfile((current) => ({
      ...current,
      skills: [...current.skills, "React"],
    }));
  }

  function updateCity(city) {
    setProfile((current) => ({
      ...current,
      address: { ...current.address, city },
    }));
  }

  return (
    <section>
      <input name="firstName" value={profile.firstName} onChange={handleChange} />
      <input name="lastName" value={profile.lastName} onChange={handleChange} />
      <input name="city" value={profile.city} onChange={handleChange} />
      <button type="button" onClick={addSkill}>Add React</button>
      <button type="button" onClick={() => updateCity("Pune")}>Set Address City</button>
      <button type="button" onClick={() => setProfile(initialProfile)}>Reset</button>
    </section>
  );
}
```

## Common Mistakes

- Mutating `profile` directly.
- Replacing an object without preserving sibling fields.
- Updating a nested object without preserving its sibling properties.
- Treating object state as automatically merged by React.
- Using one giant object for unrelated UI state.
- Storing values that can be derived from the object.

## Hands-on Lab

Build an **Employee Profile Editor** with name, department, salary, location, nested address, and skills.

Requirements:

- Generic input handler.
- Immutable field updates.
- Nested address update.
- Add/remove a skill without mutation.
- Reset to initial data.
- Live preview.

## Debugging Challenge

Given:

```jsx
setProfile({ firstName: value });
```

Explain why `lastName`, `city`, and other fields disappear and rewrite the update safely.

**Expected fix:**

```jsx
setProfile((current) => ({ ...current, firstName: value }));
```

## Assessment

1. Does React merge object state automatically? **No.**
2. Why spread the previous object? **To preserve existing properties.**
3. What does `[name]: value` mean? **A computed property key.**
4. How do you update a nested object safely? **Preserve each updated level with spread.**
5. Why avoid direct mutation? **It violates the state update model and can produce stale/unpredictable UI.**

## Interview Questions

**How do you update one property of object state?** Use a functional setter and spread the previous object.

**Does `useState` shallow-merge objects?** No. The new state value replaces the previous value.

**How do you update nested state?** Create new objects for each level being changed.

**When might `useReducer` be preferable?** When state transitions become complex or many actions affect related state.

**Is object state always better than separate state?** No. Choose according to relationships and update patterns.

## Day 10 Outcome

You can model related state as objects, write immutable updates, build generic form handlers, update nested structures safely, and recognize when object state is becoming too complex.
