---
title: Forms Structure and Controls
slug: day-005-forms-structure-and-controls
dayLabel: Day 5
level: Beginner
estimatedMinutes: 50
order: 5
track: html
---

# Day 5 [Beginner]: Forms Structure and Controls

## Goal

Build a form whose controls are labeled, grouped, keyboard-operable, and able to submit meaningful name/value data.

## Prerequisites

- Days 1 through 4 completed
- Understanding of links, attributes, and document structure

## Explanation

An HTML form gathers user input and submits it to a destination. HTML defines controls and basic browser behavior; a server or JavaScript application must still process the submitted data. A form that looks correct but has missing labels, names, or an appropriate submit button is not a complete form.

## Topic by Topic

### Topic 1: Form, label, and input

The `form` element groups controls. A `label` gives a control an accessible name. The `for` value must exactly match the control's `id`. The `name` is the key used when the control's value is submitted; `id` connects document references such as labels and fragments.

```html
<form action="/subscribe" method="post">
  <label for="email">Email address</label>
  <input id="email" name="email" type="email" autocomplete="email" required>
  <button type="submit">Subscribe</button>
</form>
```

An input without a `name` is generally omitted from submitted form data. A label can also wrap its control, but explicit `for` and `id` associations are easy to audit and maintain.

### Topic 2: Choosing controls

Use `textarea` for multi-line text, `select` and `option` for a fixed choice list, and `button` for actions. Radio inputs with the same `name` form one choice group. Checkboxes allow independent selections.

```html
<fieldset>
  <legend>Preferred contact method</legend>
  <label><input type="radio" name="contact" value="email" checked> Email</label>
  <label><input type="radio" name="contact" value="phone"> Phone</label>
</fieldset>

<label for="message">Message</label>
<textarea id="message" name="message" rows="5"></textarea>
```

Use `fieldset` and `legend` when a set of controls needs a shared label or context, especially radio groups. Do not use placeholder text as the only label: it disappears during entry and is not a reliable accessible name.

### Topic 3: Submission concepts

`action` names the submission destination and `method` selects the request method. A `get` form places values in the URL and is appropriate for non-sensitive searches or filters that users may bookmark. A `post` form sends data in the request body and is commonly used to create or change data. Neither method replaces HTTPS or server-side security.

Only successful controls are submitted: controls normally need a `name`, and disabled controls are not submitted. Submit a form using a submit button, and set `type="button"` for buttons that should not submit. A reset button can erase user work and is rarely necessary.

## Recap

- Labels need a programmatic connection to their control.
- `id` is for document identity; `name` is the submitted data key.
- Group related choices with `fieldset` and `legend`.
- Pick GET or POST based on the operation and data sensitivity, and never rely on the browser alone for security.

## Practice

Build a contact form with name, email, a preferred contact radio group, a subject select, a message area, and a submit button. Use browser developer tools to inspect the submitted form data. Check that every control works using only the keyboard.

## What's Next

Day 6 expands form controls with input types, native constraints, validation states, and reliable error handling.