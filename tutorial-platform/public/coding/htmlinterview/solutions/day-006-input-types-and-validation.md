# Day 006 — Solution: Input Types and Validation

## Basic

**1. Appropriate controls:** `email`, `tel`, `date`, `number`, and `range`, respectively.

**2–3. Numeric and text constraints**

```html
<label for="attendees">Attendees (1–8)</label>
<input id="attendees" name="attendees" type="number" min="1" max="8" step="1" required>

<label for="username">Username (3–24 characters)</label>
<input id="username" name="username" minlength="3" maxlength="24" required>
```

**4. File hint:** `<input id="resume" name="resume" type="file" accept=".pdf,application/pdf">`. A user or client can bypass the hint; the server must inspect uploads.

**5. Email field**

```html
<label for="email">Email</label>
<input id="email" name="email" type="email" autocomplete="email" required>
```

## Concept Answers

**6. Phone numbers:** They are identifiers and may contain `+`, spaces, or punctuation; they are not quantities for arithmetic.

**7. Local date/time:** `datetime-local` carries no time-zone offset.

**8. Read-only and disabled:** Read-only controls can receive focus and are submitted. Disabled controls cannot be interacted with and are omitted from form submission.

**9. Validation:** Users can modify client requests, so the server must validate every value and enforce authorization.

**10. Boolean attributes:** Presence enables a Boolean attribute. Its string value does not switch it off; omit it to make it false.

## Challenge

```html
<form action="/registrations" method="post" enctype="multipart/form-data">
  <label for="attendee-name">Name</label>
  <input id="attendee-name" name="name" autocomplete="name" required>

  <label for="attendee-email">Email</label>
  <input id="attendee-email" name="email" type="email" autocomplete="email" required>

  <label for="count">Attendee count</label>
  <input id="count" name="count" type="number" min="1" max="8" value="1" required>

  <label for="event-date">Event date</label>
  <input id="event-date" name="eventDate" type="date" required>

  <label for="resume">Resume (PDF, optional)</label>
  <input id="resume" name="resume" type="file" accept=".pdf,application/pdf">
  <button type="submit">Register</button>
</form>
```

The browser checks are usability aids. The server must validate values, file contents, permissions, and upload size.