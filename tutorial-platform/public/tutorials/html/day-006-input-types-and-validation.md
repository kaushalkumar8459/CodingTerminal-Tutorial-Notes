---
title: Input Types and Form Validation
slug: day-006-input-types-and-validation
dayLabel: Day 6
level: Intermediate
estimatedMinutes: 50
order: 6
track: html
---

# Day 6 [Intermediate]: Input Types and Form Validation

## Goal

Select input types that fit the data, add useful browser-side constraints, and understand the limits of client-side validation.

## Prerequisites

- Day 5 completed
- Familiarity with labels, names, and form submission

## Explanation

Input types communicate the expected kind of value and can provide a suitable mobile keyboard or browser interface. Constraints can prevent common mistakes before submission. They improve usability, but users can bypass browser checks, so the server must validate all untrusted input again.

## Topic by Topic

### Topic 1: Use the most specific appropriate type

The input types fall into a few useful groups:

| Use | Types |
| --- | --- |
| Text and identifiers | `text`, `search`, `email`, `password`, `tel`, `url` |
| Numeric and date/time values | `number`, `range`, `date`, `time`, `datetime-local`, `month`, `week` |
| Choices | `checkbox`, `radio`, `color` |
| Files and actions | `file`, `button`, `submit`, `reset`, `image`, `hidden` |

Not every type is suitable everywhere: phone numbers are identifiers, not quantities, so `tel` is generally more appropriate than `number`. `datetime-local` has no time-zone information; the old `datetime` input type is not a current usable input type. `image` is a graphical submit control and needs meaningful alternative text; `button` does not submit by itself, `submit` submits the form, and `reset` restores initial values. Reset controls can erase user work, so include them only when users genuinely need them. A hidden input is invisible but remains editable through developer tools.

```html
<label for="photo-submit">Send registration</label>
<input id="photo-submit" type="image" src="images/send.png" alt="Send registration" width="96" height="40">
```

The image input submits the form like a submit control and may include the click coordinates in the submitted data. For most forms, a text `button type="submit"` is clearer, easier to style, and more robust.

```html
<label for="age">Age</label>
<input id="age" name="age" type="number" min="13" max="120" step="1" required>

<label for="website">Portfolio URL</label>
<input id="website" name="website" type="url" autocomplete="url">

<label for="start-date">Start date</label>
<input id="start-date" name="startDate" type="date" required>
```

`color` provides a browser color picker, `file` opens a file chooser, `range` is for approximate values, and `number` is for quantities where arithmetic makes sense. `month` and `week` collect calendar periods. Browser controls differ by platform, so labels and instructions must not depend on a particular picker design.

Use `autocomplete` tokens such as `name`, `email`, `current-password`, and `postal-code` when they match the field. This can help browsers and password managers fill forms accurately. `placeholder` can show an example, but should supplement a persistent label rather than replace it.

### Topic 2: Native constraints

`required` marks a mandatory control. `minlength` and `maxlength` constrain text length; `min`, `max`, and `step` constrain numeric or date-like values. `pattern` accepts a regular expression for some textual input types. `type="email"` checks basic email syntax, not whether an address exists.

```html
<label for="username">Username (3 to 20 characters)</label>
<input id="username" name="username" type="text" minlength="3" maxlength="20" required>

<label for="quantity">Tickets (1 to 6)</label>
<input id="quantity" name="quantity" type="number" min="1" max="6" value="1" required>
```

Avoid overly restrictive patterns that reject valid names, addresses, or international phone numbers. `readonly` values can be submitted but cannot be edited; `disabled` controls are unavailable and are not submitted. Do not use either state as an authorization control.

Other frequently used attributes include `value` for an initial value, `checked` for an initially selected checkbox or radio option, `multiple` for file or email inputs that accept more than one value, `size` for a legacy character-width hint, `accept` to guide file selection, and `autofocus` to request initial focus. Use autofocus sparingly because it can move focus unexpectedly. `placeholder` is only a hint, not a label. Boolean attributes such as `required`, `disabled`, and `multiple` are enabled by their presence; writing `required="false"` still enables the attribute.

### Topic 3: Accessible validation and sensitive data

Native validation can identify missing or malformed values. If custom validation is added, explain the problem in text, associate the message with the field (for example with `aria-describedby`), and do not rely on color alone. Preserve valid entries when returning errors. Ensure error messages are announced when they appear and that focus can move to the first invalid field.

For file inputs, `accept` can guide the file picker but is not a security check. Validate file type, size, and contents on the server. Hidden inputs are also user-controlled and must never be trusted for prices, roles, or permissions.

## Recap

- Choose input types for the data and task, not merely for appearance.
- Native constraints improve user feedback but do not establish that data is safe.
- Make custom errors understandable and available to assistive technology.
- Server-side validation remains mandatory for submitted data.

## Practice

Extend yesterday's contact form with appropriate types, `autocomplete`, `required`, a message length limit, and a reasonable date or quantity constraint. Test empty and malformed values, then turn off JavaScript to confirm native HTML checks still work.

## What's Next

Day 7 moves from individual controls to page-wide semantics, landmarks, and accessible navigation.