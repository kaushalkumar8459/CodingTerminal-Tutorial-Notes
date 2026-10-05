# Day 005 — Solution: Forms, Labels, and Controls

## Basic

**1–3. Labeled and named field**

```html
<form action="/subscribe" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email">
  <button type="submit">Subscribe</button>
</form>
```

**4. Radio group**

```html
<fieldset>
  <legend>Contact preference</legend>
  <label><input type="radio" name="contact" value="email"> Email</label>
  <label><input type="radio" name="contact" value="phone"> Phone</label>
</fieldset>
```

**5. Text area:** `<label for="message">Message</label><textarea id="message" name="message" rows="5"></textarea>`

## Concept Answers

**6. `id` vs `name`:** `id` connects labels and document references. `name` is the key included in submitted form data.

**7. Label:** It gives the control a programmatic accessible name and enlarges its clickable target when associated.

**8. Radio name:** Same-name radio buttons form a group where only one option can be selected.

**9. GET vs POST:** GET places values in the URL and suits bookmarkable retrieval. POST puts values in the request body. Neither encrypts data; use HTTPS and server-side validation.

## Challenge

```html
<form action="/contact" method="post">
  <label for="name">Name</label>
  <input id="name" name="name" autocomplete="name" required>

  <label for="email">Email</label>
  <input id="email" name="email" type="email" autocomplete="email" required>

  <fieldset>
    <legend>Preferred contact method</legend>
    <label><input type="radio" name="contact" value="email" checked> Email</label>
    <label><input type="radio" name="contact" value="phone"> Phone</label>
  </fieldset>

  <label for="message">Message</label>
  <textarea id="message" name="message" rows="5" required></textarea>
  <button type="submit">Send message</button>
</form>
```

The endpoint `/contact` is illustrative. A real server must receive, validate, and safely process the request.