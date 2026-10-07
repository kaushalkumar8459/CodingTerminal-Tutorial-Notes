# Day 011 — Classes, IDs, Styling, and Legacy Markup

Matches Tutorial Day 11 (HTML Styling Classes IDs and Comments).

## Basic

1. Connect a page to an external stylesheet.
2. Reuse one class across a heading and paragraph.
3. Add two classes to one element and target each class from CSS.
4. Add a unique ID and link to it from the top of the page.
5. Add a source comment and identify why it must not contain a secret.
6. Style a link's hover and keyboard-focus states without removing every visual cue.

## Concept Questions

7. When should you use a class versus an ID?
8. Is “ID always wins over class” a complete explanation of the CSS cascade?
9. Which old tags should replace `<marquee>`, `<center>`, and `<font>`?
10. How can moving content be made less harmful to people who prefer reduced motion?

## Challenge

11. Refactor a page that uses repeated inline styles into an external stylesheet, reusable classes, and semantic HTML. Keep one unique ID for a fragment link.

## Notes

- Preview HTML only renders its source. CSS inside `<style>` works; a separate CSS file must be available at its URL.
- Prefer CSS classes over inline styles for repeated presentation.

<!-- codingterminal-solution:start -->

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

<!-- codingterminal-solution:end -->

