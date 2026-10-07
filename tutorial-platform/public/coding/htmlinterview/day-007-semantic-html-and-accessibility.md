# Day 007 — Semantic HTML and Accessibility

Matches Tutorial Day 7 (Semantic HTML and Accessibility).

## Basic

1. Replace generic wrappers with `header`, `nav`, `main`, `article`, and `footer` where their meanings fit.
2. Add a skip link that moves keyboard users to the main content.
3. Fix a heading outline that jumps from `h1` to `h4` only for font size.
4. Add a language declaration to a document and identify a passage in another language.
5. Create a native disclosure widget using `details` and `summary`.

## Concept Questions

6. How do `article` and `section` differ?
7. Why prefer a native `button` over a clickable `div`?
8. When should ARIA be used?
9. What is wrong with positive `tabindex` values?

## Challenge

10. Create an accessible event page with page landmarks, a skip link, useful heading levels, descriptive links, an FAQ disclosure, and a date represented with `time`.

## Notes

- A page should have one primary `main` region.
- Validate keyboard order and accessible names in addition to checking visual appearance.

<!-- codingterminal-solution:start -->

# Day 007 — Solution: Semantic HTML and Accessibility

## Basic

**1. Semantic structure**

```html
<header><a href="/">Community</a></header>
<nav aria-label="Primary"><a href="events.html">Events</a></nav>
<main><article><h1>Upcoming events</h1><p>...</p></article></main>
<footer><p>Contact the organizers.</p></footer>
```

**2. Skip link**

```html
<a href="#main-content">Skip to main content</a>
<main id="main-content"><h1>Events</h1></main>
```

**3. Heading outline:** Use `h1`, then `h2` for sections and `h3` for subsections. Use CSS to change size.

**4. Language:** Start with `<html lang="en">`; mark a translated phrase such as `<span lang="ar" dir="rtl">مرحبا</span>`.

**5. Disclosure:**

```html
<details><summary>What should I bring?</summary><p>Bring a notebook.</p></details>
```

## Concept Answers

**6. Article and section:** `article` is independently meaningful content. `section` groups a related theme, normally with a heading.

**7. Native button:** It already supports focus, keyboard activation, and button semantics.

**8. ARIA:** Add it only when native HTML does not express the needed accessible role, name, or state. It does not repair invalid structure.

**9. Positive tabindex:** It creates a custom tab order that can conflict with document order and make navigation confusing.

## Challenge

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Neighborhood Workshop</title>
  </head>
  <body>
    <a href="#main">Skip to main content</a>
    <header><a href="/">Neighborhood Center</a></header>
    <nav aria-label="Primary"><a href="#details">Details</a><a href="#faq">FAQ</a></nav>
    <main id="main">
      <article>
        <h1>Community Garden Workshop</h1>
        <p>Join us on <time datetime="2026-11-14">November 14</time>.</p>
        <section id="details"><h2>Workshop details</h2><p>Learn to prepare a garden bed.</p></section>
        <section id="faq"><h2>Questions</h2>
          <details><summary>Is the workshop free?</summary><p>Yes, registration is free.</p></details>
        </section>
      </article>
    </main>
    <footer><p><a href="mailto:events@example.com">Contact the organizers</a></p></footer>
  </body>
</html>
```

<!-- codingterminal-solution:end -->

