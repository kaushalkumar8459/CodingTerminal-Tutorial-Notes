# Day 011 — Solution: Classes, IDs, Styling, and Legacy Markup

## Basic

**1. External stylesheet:** `<link rel="stylesheet" href="styles.css">` belongs in `head`.

**2–3. Shared and multiple classes**

```html
<h1 class="page-title">Garden workshop</h1>
<p class="notice important">Registration closes Friday.</p>
<p class="notice">Bring a notebook.</p>
```

```css
.notice { padding: 0.75rem; }
.important { border-inline-start: 4px solid #b91c1c; }
```

**4. Unique ID and fragment:** `<a href="#schedule">Jump to schedule</a>` followed by `<h2 id="schedule">Schedule</h2>`.

**5. Comment:** `<!-- Schedule data last checked on Monday. -->`. Comments are present in source and must not contain credentials or other secrets.

**6. Link states:** Keep underline or another non-color cue and provide visible focus.

```css
a:hover { text-decoration-thickness: 0.15em; }
a:focus-visible { outline: 3px solid currentColor; outline-offset: 3px; }
```

## Concept Answers

**7. Class and ID:** A class labels reusable groups. An ID uniquely identifies one element for references such as a label or fragment link.

**8. Cascade:** No. Origin, importance, cascade layers, specificity, and source order all participate.

**9. Legacy tags:** Use CSS for presentation, semantic structure for meaning, and a controlled animation only when movement is necessary. `<marquee>`, `<center>`, and `<font>` are obsolete/non-standard.

**10. Motion:** Respect `prefers-reduced-motion`, avoid essential information that only moves, and provide a way to pause ongoing animation.

## Challenge

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Garden workshop</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <a href="#schedule">Skip to schedule</a>
    <main>
      <h1 class="page-title">Garden workshop</h1>
      <p class="notice important">Registration closes Friday.</p>
      <h2 id="schedule">Schedule</h2>
      <p class="notice">Doors open at 9:00 AM.</p>
    </main>
  </body>
</html>
```

```css
.page-title { color: #075985; }
.notice { padding: 0.75rem; }
.important { border-inline-start: 4px solid #b91c1c; }
```