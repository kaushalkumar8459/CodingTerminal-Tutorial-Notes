---
title: Forms and Controlled Components
slug: day-013-forms-and-controlled-components
dayLabel: Day 13
level: Beginner to Intermediate
estimatedMinutes: 90
order: 13
track: react
---
# Day 13 [Beginner → Intermediate]: Forms and Controlled Components

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
- [Day 13 Outcome](#day-13-outcome)

## Goal

Build production-style React forms using controlled inputs, reusable handlers, validation, touched/error state, reset behavior, accessible submit flow, and a clear state model. Understand when controlled and uncontrolled inputs are appropriate.

## Prerequisites

- Days 8–12: `useState`, object state, events, and immutable updates
- Basic HTML forms and JavaScript functions

## Explanation

Forms are where React state, events, validation, accessibility, and business rules meet. In a controlled component, React state is the source of truth for the current input value.

```text
User types
   ↓
onChange event
   ↓
React state update
   ↓
Render with new value
   ↓
Validation / derived UI
   ↓
Submit
   ↓
Validate → submit or show errors
```

## Topic by Topic

### 1. Controlled Input

```jsx
const [name, setName] = useState("");

<input
  value={name}
  onChange={(event) => setName(event.target.value)}
/>
```

The value comes from state and changes through the setter.

### 2. Multi-field Form State

Separate state is fine for a small form:

```jsx
const [name, setName] = useState("");
const [email, setEmail] = useState("");
```

A single object is useful when fields form one logical record:

```jsx
const initialForm = { name: "", email: "", phone: "" };
const [form, setForm] = useState(initialForm);
```

Choose the model for clarity, not merely to reduce the number of hooks.

### 3. Generic Change Handler

```jsx
function handleChange(event) {
  const { name, value } = event.target;
  setForm((current) => ({ ...current, [name]: value }));
}
```

The computed property name updates the correct field while spread preserves the others.

### 4. Input Types

Text, email, select and textarea generally use `value`. Checkboxes use `checked`:

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

Multiple select controls may use an array of selected values.

### 5. Form Submission

Use the form's `onSubmit` as the primary submission mechanism:

```jsx
function handleSubmit(event) {
  event.preventDefault();
  // validate and submit
}
```

This also supports keyboard submission naturally.

### 6. Validation

Keep validation logic explicit and reusable:

```jsx
function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "Enter a valid email";
  }
  return errors;
}
```

Client validation improves UX and data quality; it is **not a security boundary**. The server must validate again.

### 7. Touched, Dirty, and Error State

- **Touched:** user interacted with/left a field.
- **Dirty:** current value differs from the initial value.
- **Error:** a validation rule currently fails.

Keeping these concepts separate gives better control over when messages appear.

### 8. Reset

```jsx
function resetForm() {
  setForm(initialForm);
  setErrors({});
  setTouched({});
}
```

Keep initial values in one place so reset cannot drift from the form shape.

### 9. Controlled vs Uncontrolled

Controlled inputs are driven by React state. Uncontrolled inputs let the DOM own the current value and can be read through a ref:

```jsx
const noteRef = useRef(null);

function saveNote() {
  console.log(noteRef.current?.value);
}

return <input ref={noteRef} />;
```

Uncontrolled inputs can be appropriate for simple forms or integrations with non-React code. Neither model is universally better.

### 10. Avoid Controlled/Uncontrolled Warnings

Initialize values consistently:

```jsx
const [email, setEmail] = useState("");
```

Do not unexpectedly change an input from a defined `value` to `undefined`/`null`. Normalize optional data before rendering the input.

### 11. Accessibility

Production forms should provide:

- associated labels
- semantic submit buttons
- useful `name` attributes
- clear error text
- `aria-invalid` for invalid controls
- `aria-describedby` for associated help/error text

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

## Key Concepts

- Controlled inputs
- Form state object
- Generic handlers
- Computed property names
- Validation flow
- Touched/dirty/error state
- Controlled vs uncontrolled
- Immutable updates
- Reset semantics
- Accessibility
- Server-side validation

## Visual Concept Map

```text
Form Input
   ↓
onChange
   ↓
State
   ↓
Validation
   ↓
Touched / Errors
   ↓
onSubmit
   ↓
Success or Error
```

## End-to-End Practical

Build a **Student Registration / Job Registration Form**.

Requirements:

1. Create form object state.
2. Add a generic `handleChange`.
3. Support text, email, select and checkbox fields.
4. Validate required fields and email.
5. Show field errors.
6. Submit with `onSubmit` and `preventDefault()`.
7. Provide reset behavior.
8. Make labels and errors accessible.
9. Show a success state only after valid submission.

### Employee Feedback Form

The same controlled pattern works for a department select and textarea:

```jsx
const [form, setForm] = useState({ dept: "HR", feedback: "" });

const handleChange = (event) => {
  const { name, value } = event.target;
  setForm((current) => ({ ...current, [name]: value }));
};

return (
  <>
    <select name="dept" value={form.dept} onChange={handleChange}>
      <option>HR</option>
      <option>Engineering</option>
      <option>Sales</option>
    </select>
    <textarea
      name="feedback"
      value={form.feedback}
      onChange={handleChange}
      placeholder="Write feedback"
    />
  </>
);
```

### Uncontrolled Emergency Note

```jsx
const noteRef = useRef(null);

function saveNote() {
  alert(`Saved note: ${noteRef.current?.value ?? ""}`);
}

return (
  <>
    <input ref={noteRef} placeholder="Quick note" />
    <button type="button" onClick={saveNote}>Save Note</button>
  </>
);
```

## Hands-on Coding

### Example 1 — Student Registration

```jsx
const [form, setForm] = useState({ name: "", email: "", course: "" });
const [error, setError] = useState("");

function handleChange(event) {
  const { name, value } = event.target;
  setForm((current) => ({ ...current, [name]: value }));
}

function handleSubmit(event) {
  event.preventDefault();
  if (!form.name.trim() || !form.email.trim() || !form.course.trim()) {
    setError("All fields are required");
    return;
  }
  setError("");
}
```

### Example 2 — Registration Form

```jsx
const initialForm = {
  name: "",
  email: "",
  role: "developer",
  termsAccepted: false,
};

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

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "Enter a valid email";
  }
  if (!form.termsAccepted) errors.termsAccepted = "Accept the terms";
  return errors;
}

function handleSubmit(event) {
  event.preventDefault();
  const nextErrors = validate(form);
  setErrors(nextErrors);
  if (Object.keys(nextErrors).length === 0) setSubmitted(true);
}
```

## Mini Exercise

Build a job application form with controlled fields for:

- `fullName`
- `email`
- `role`
- `portfolioLink`

Validate required fields and email format and add Reset.

Expected behavior:

- Every input is controlled.
- Invalid submit shows clear errors.
- Reset restores initial values.
- Keyboard submission works.

## Common Mistakes

### Mistake 1 — Checkbox with `value`

Use `checked` for boolean checkbox state.

### Mistake 2 — Mutating form state

Avoid `form.email = value`; use an immutable state update.

### Mistake 3 — Submit through only `onClick`

Use `<form onSubmit={...}>` so keyboard submission works.

### Mistake 4 — Client validation as security

Client validation is UX; the server must validate and authorize independently.

### Mistake 5 — Showing every error immediately

Use touched/submit state to control when errors become visible.

### Mistake 6 — Switching controlled modes

Normalize missing data instead of passing `undefined` unexpectedly.

## Debugging Challenge

Why is this problematic?

```jsx
form.email = event.target.value;
setForm(form);
```

**Answer:** it mutates the existing state object. Use:

```jsx
setForm((current) => ({
  ...current,
  email: event.target.value,
}));
```

## Assessment Quiz

1. What makes an input controlled?
2. Why use `checked` for a checkbox?
3. Why is `onSubmit` preferable to only button `onClick`?
4. What is the difference between touched and dirty?
5. Can client validation replace server validation?
6. What causes controlled/uncontrolled warnings?
7. When is uncontrolled input useful?
8. Why update form state immutably?

### Answers

1. Its current value is driven by React state.
2. `checked` represents boolean checkbox state.
3. It provides semantic and keyboard-friendly form submission.
4. Touched describes interaction; dirty describes difference from initial value.
5. No. Server validation remains necessary.
6. A control changes between controlled and uncontrolled modes, often because its value becomes `undefined`.
7. Simple forms and integrations where DOM ownership is useful.
8. It creates a predictable new state value and avoids mutation.

## Task

Build a **Job Application Form** with at least six fields.

Requirements:

- controlled inputs
- generic change handler
- validation
- touched/error feedback
- accessible labels and errors
- reset
- submit success state
- checkbox handling
- keyboard-friendly submission

## Self Check

- [ ] I can explain controlled components.
- [ ] I can build a multi-field form.
- [ ] I can write a generic change handler.
- [ ] I know why checkboxes use `checked`.
- [ ] I can validate before submit.
- [ ] I understand touched vs dirty.
- [ ] I can reset values and interaction state.
- [ ] I can explain controlled vs uncontrolled inputs.
- [ ] I can prevent controlled/uncontrolled warnings.
- [ ] I can make a form keyboard and screen-reader friendly.

## Interview Questions and Answers

### Beginner

**Q: What makes an input controlled?**  
Its current value is driven by React state.

**Q: Why use `preventDefault()` on form submit?**  
To prevent the browser's default navigation/reload when React handles the submission.

### Intermediate

**Q: How do you update one field in an object form state?**  
Use a functional update with spread and a computed property: `{ ...current, [name]: value }`.

**Q: When would you choose uncontrolled inputs?**  
For simple cases, DOM-oriented integrations, or scenarios where keeping every keystroke in React state is unnecessary.

**Q: How do touched and dirty differ?**  
Touched describes interaction; dirty describes whether the current value differs from the initial value.

### Advanced

**Q: How do you scale validation for complex forms?**  
Separate validation from rendering, use structured errors, and consider a schema-validation library when complexity warrants it.

**Q: Why should client validation not be treated as security?**  
Users can bypass client code. The server must validate, authorize, and safely process submitted data.

**Q: Controlled vs uncontrolled: which is better?**  
Neither universally. Controlled inputs provide explicit React state control; uncontrolled inputs can be simpler for specific forms and integrations.

**Q: Why can validation become a state-management problem?**  
Complex forms may need values, touched state, dirty state, errors, submission state, server errors, and reset semantics. A deliberate model prevents these concerns from becoming tangled.

## Day 13 Outcome

You can now design, implement, validate, reset, and explain React forms. You understand controlled and uncontrolled inputs, reusable handlers, validation, interaction state, accessibility, and production-oriented submission flow. You are ready to integrate these patterns into the Notes App on Day 14.
