---
title: Forms and Controlled Components
slug: day-013-forms-and-controlled-components
dayLabel: Day 13
level: Beginner to Intermediate
estimatedMinutes: 75
order: 13
track: react
---
# Day 13 [Beginner → Intermediate]: Forms and Controlled Components

## Goal

Build production-style React forms using controlled inputs, reusable handlers, validation, touched/error state, reset behavior, and accessible submit flow. By the end, you should understand **why** controlled components work, when uncontrolled inputs are useful, and how form state should be designed.

## Prerequisites

- Days 8–12: `useState`, object state, events, and immutable updates
- Basic HTML forms and JavaScript functions

## Why Forms Matter

Forms are one of the most common places where React state, events, validation, accessibility, and business rules meet. A good form is not simply a collection of inputs. It has a state model, validation rules, interaction states, submission behavior, error handling, and reset behavior.

## Mental Model

```text
User types
   ↓
onChange event
   ↓
React state update
   ↓
Component renders with new value
   ↓
Validation / derived UI
   ↓
User submits
   ↓
Validate → submit or show errors
```

## Topic by Topic

### 1. Controlled Inputs

A controlled input gets its current value from React state and reports changes through an event handler.

```jsx
import { useState } from "react";

function NameField() {
  const [name, setName] = useState("");

  return (
    <label>
      Name
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
    </label>
  );
}
```

The state is the source of truth for the input's value. This makes validation, conditional UI, reset, formatting, and submission predictable.

### 2. Form State: Separate Values or One Object?

Both approaches are valid.

Separate state is convenient for a small form:

```jsx
const [name, setName] = useState("");
const [email, setEmail] = useState("");
```

A single object is useful when fields form one logical record:

```jsx
const initialForm = { name: "", email: "", role: "developer" };
const [form, setForm] = useState(initialForm);
```

Do not choose an object merely to reduce the number of hooks. Choose the model that makes updates and validation clear.

### 3. Generic Change Handler

Give each field a `name` that matches its state key:

```jsx
function handleChange(event) {
  const { name, value } = event.target;
  setForm((current) => ({
    ...current,
    [name]: value,
  }));
}
```

This uses a computed property name. The spread preserves unrelated fields.

### 4. Different Input Types

Controlled patterns differ slightly by input type.

**Text, email, select, textarea:** usually use `value`.

**Checkbox:** use `checked`.

```jsx
<input
  type="checkbox"
  name="termsAccepted"
  checked={form.termsAccepted}
  onChange={(event) =>
    setForm((current) => ({
      ...current,
      termsAccepted: event.target.checked,
    }))
  }
/>
```

**Multiple select:** may use an array of selected values.

The important rule is: use the DOM property that represents the control's value (`value` or `checked`) rather than treating every input identically.

### 5. Form Submission

Use the form's `onSubmit`, not a button click, as the primary submission mechanism.

```jsx
function handleSubmit(event) {
  event.preventDefault();
  // validate and submit
}
```

Using `onSubmit` also supports keyboard submission naturally. Use `type="submit"` for the submit button.

### 6. Validation

Validation should be explicit and reusable rather than scattered across JSX.

```jsx
function validate(form) {
  const errors = {};

  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "Enter a valid email";
  }

  return errors;
}
```

Validation is a UX and data-quality concern, **not a security boundary**. The server must validate data again before accepting it.

### 7. Touched, Dirty, and Error State

These concepts are different:

- **Touched:** the user has interacted with or left a field.
- **Dirty:** the current value differs from its initial value.
- **Error:** a validation rule currently fails.

A common pattern is to avoid showing an error before the user has interacted with the field.

```jsx
const [touched, setTouched] = useState({});
const [errors, setErrors] = useState({});
```

### 8. Resetting Forms

Reset both the values and interaction state.

```jsx
function resetForm() {
  setForm(initialForm);
  setErrors({});
  setTouched({});
}
```

Keep the initial state in one place so reset behavior cannot drift from the initial form shape.

### 9. Controlled vs Uncontrolled

**Controlled:** React state owns the current value.

**Uncontrolled:** the DOM owns the current value; React reads it through a ref when needed.

```jsx
import { useRef } from "react";

function QuickNote() {
  const inputRef = useRef(null);

  function save() {
    console.log(inputRef.current?.value);
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={save}>Save</button>
    </>
  );
}
```

Uncontrolled inputs are useful for simple forms, integrating with non-React code, and some specialized scenarios. Do not claim that controlled inputs are always faster or always better.

### 10. Avoiding Controlled/Uncontrolled Warnings

A field should not unexpectedly switch between controlled and uncontrolled modes.

Prefer a stable initial value:

```jsx
const [email, setEmail] = useState("");
```

If data can be missing, normalize it before passing it to the input rather than accidentally changing `value` from a string to `undefined`.

### 11. Accessibility

A production form should include:

- `<label>` associated with each input
- semantic `<button type="submit">`
- useful `name` attributes
- clear error text
- appropriate `aria-invalid` when validation fails
- `aria-describedby` when an input is described by an error/help element

Example:

```jsx
<label htmlFor="email">Email</label>
<input
  id="email"
  name="email"
  value={form.email}
  onChange={handleChange}
  aria-invalid={Boolean(errors.email)}
  aria-describedby={errors.email ? "email-error" : undefined}
/>
{errors.email && <p id="email-error">{errors.email}</p>}
```

## Complete Practical: Registration Form

```jsx
import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  role: "developer",
  termsAccepted: false,
};

function validate(form) {
  const errors = {};

  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "Enter a valid email";
  }
  if (!form.termsAccepted) errors.termsAccepted = "Accept the terms to continue";

  return errors;
}

export default function RegistrationForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setSubmitted(true);
  }

  function handleReset() {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={form.name} onChange={handleChange} />
        {errors.name && <p>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="role">Role</label>
        <select id="role" name="role" value={form.role} onChange={handleChange}>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="tester">Tester</option>
        </select>
      </div>

      <label>
        <input
          type="checkbox"
          name="termsAccepted"
          checked={form.termsAccepted}
          onChange={handleChange}
        />
        I accept the terms
      </label>
      {errors.termsAccepted && <p>{errors.termsAccepted}</p>}

      <button type="submit">Register</button>
      <button type="button" onClick={handleReset}>Reset</button>

      {submitted && <p role="status">Registration is valid.</p>}
    </form>
  );
}
```

## Common Mistakes

### Mistake 1: Using `value` for a checkbox

Use `checked={...}` for a checkbox.

### Mistake 2: Mutating a form object

Avoid `form.email = value`. Use a state setter and create a new object.

### Mistake 3: Submitting through only `onClick`

Use `<form onSubmit={...}>` so keyboard submission works too.

### Mistake 4: Treating client validation as security

Client validation improves UX. Server-side validation and authorization remain mandatory.

### Mistake 5: Showing every error immediately

Use touched/submit state to choose when an error becomes visible.

### Mistake 6: Switching control mode accidentally

Initialize text inputs with `""`, arrays with `[]`, booleans with `false`, and otherwise normalize incoming data.

## Hands-on Challenges

### Challenge 1 — Job Application Form

Create fields for name, email, role, portfolio URL, experience, and agreement checkbox.

Requirements:

- Controlled inputs
- Generic handler
- Required validation
- Email validation
- Reset
- Accessible labels

### Challenge 2 — Field-Level Validation

Add touched state so an email error appears after blur or after submit, whichever happens first.

### Challenge 3 — Edit Existing Data

Start with an existing profile object and allow the user to edit it. Add **Save** and **Cancel**. Cancel should restore the last saved values without reloading the page.

## Assessment Quiz

1. What makes an input controlled?
2. Why should checkbox state use `checked` rather than `value`?
3. Why is `onSubmit` preferable to only a button `onClick` for form submission?
4. What is the difference between touched and dirty?
5. Can client-side validation replace server-side validation?
6. What causes a controlled/uncontrolled warning?
7. When can an uncontrolled input be appropriate?
8. Why should form state be updated immutably?

**Answers:**

1. Its current value is driven by React state.
2. `checked` represents the checkbox's boolean state.
3. It supports semantic form submission and keyboard submission.
4. Touched describes interaction; dirty describes whether the value differs from its initial value.
5. No. Server validation is still required.
6. A value changes between controlled and uncontrolled, often because it becomes `undefined`/`null` unexpectedly.
7. Simple forms, DOM-oriented integrations, or specialized cases where state binding is unnecessary.
8. Immutable updates give React a new state value and make changes predictable.

## Interview Questions

### Beginner

**What is a controlled component?**  
A form control whose current value is driven by React state.

**Why call `preventDefault()`?**  
To prevent the browser's default form navigation/reload when handling submission in React.

### Intermediate

**How do you update one field in an object form state?**  
Use the previous state and a computed property name: `{ ...current, [name]: value }`.

**How do you validate a large form?**  
Separate validation rules from rendering, maintain structured errors, and introduce a schema library when complexity justifies it.

### Advanced

**Controlled vs uncontrolled: which is better?**  
Neither universally. Controlled inputs provide explicit React state control; uncontrolled inputs can be simpler for certain forms and integrations.

**Why can validation become a state-management problem?**  
A form may need values, touched state, dirty state, field errors, submission state, server errors, and reset semantics. A deliberate state model prevents these concerns from becoming tangled.

## Final Task

Build a **Job Application Form** with at least six fields. It must support validation, accessible error messages, reset, submit success state, and field-level interaction feedback.

### Acceptance Criteria

- [ ] All editable fields are controlled unless intentionally justified.
- [ ] `onSubmit` handles submission.
- [ ] Checkbox uses `checked`.
- [ ] State updates are immutable.
- [ ] Validation is separated from JSX.
- [ ] Errors are clear and associated with fields.
- [ ] Reset restores initial state.
- [ ] Client validation is not described as security.
- [ ] Form is keyboard usable.

## Day 13 Outcome

You can now design, implement, validate, reset, and explain React forms rather than simply wiring individual inputs. You are ready to combine these patterns into the Notes App on Day 14.