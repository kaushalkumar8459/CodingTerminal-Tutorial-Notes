---
title: Semantic HTML and Accessibility
slug: day-007-semantic-html-and-accessibility
dayLabel: Day 7
level: Intermediate
estimatedMinutes: 50
order: 7
track: html
---

# Day 7 [Intermediate]: Semantic HTML and Accessibility

## Goal

Structure a complete page with semantic landmarks and make its information usable through different input and assistive technologies.

## Prerequisites

- Days 1 through 6 completed
- Familiarity with headings, links, and forms

## Explanation

Semantic HTML describes what content is for. A `nav` is navigation, a `main` is the page's primary content, and an `article` is a self-contained composition. These meanings help people navigate and help browsers provide useful behavior. Accessibility is not a separate layer added after markup; good native semantics are its foundation.

## Topic by Topic

### Topic 1: Page landmarks and sectioning

```html
<header>
  <a href="/">Trail Notes</a>
  <nav aria-label="Primary">
    <a href="/guides.html">Guides</a>
    <a href="/about.html">About</a>
  </nav>
</header>

<main>
  <article>
    <h1>Preparing for a day hike</h1>
    <p>Start with the route, weather, and your group's experience.</p>
    <section aria-labelledby="packing-heading">
      <h2 id="packing-heading">Packing checklist</h2>
      <ul><li>Water</li><li>Map</li></ul>
    </section>
  </article>
</main>

<footer><p>Updated <time datetime="2026-10-05">October 5, 2026</time></p></footer>
```

Use `header`, `nav`, `main`, and `footer` for page landmarks. A page should have one primary `main` region. Use `article` for content that can stand on its own, such as a post or news story. A `section` is a thematic grouping, usually with a heading. `aside` is related but secondary content. Do not choose an element only because its default styling seems convenient.

### Topic 2: Accessible names, language, and keyboard use

Set the document language on `html`; mark language changes on individual passages when needed. Keep heading levels logical, provide descriptive link text, and give controls persistent labels. Native buttons and links already support keyboard interaction; prefer them over clickable `div` elements that require custom behavior.

```html
<html lang="en">
  <body>
    <a href="#main-content">Skip to main content</a>
    <main id="main-content">
      <h1>Community events</h1>
      <p>Read the <a href="accessibility.html">event accessibility details</a>.</p>
    </main>
  </body>
</html>
```

Use `tabindex="0"` only when an otherwise non-focusable element must join the normal keyboard order. Avoid positive tabindex values, which create a separate and confusing focus order. Avoid adding ARIA roles that duplicate native HTML semantics. When native elements fit the task, they usually provide better keyboard and screen reader behavior with less code.

### Topic 3: Additional semantic elements

`time` can expose a machine-readable date using `datetime`. `address` describes contact information for the nearest article or page owner. `details` with `summary` creates a native disclosure widget. `figure` and `figcaption` associate a caption with self-contained media. Use these elements where their definitions match the content, not as generic wrappers.

## Recap

- Semantic landmarks make page regions discoverable.
- Keep heading order meaningful and ensure links, controls, and images have appropriate accessible names or alternatives.
- Native interactive elements are preferable to custom clickable containers.
- ARIA supplements HTML when needed; it does not fix incorrect structure automatically.

## Practice

Refactor an all-`div` page into semantic landmarks and sections. Navigate it using only the keyboard, check heading order with an accessibility inspector, and verify that the page language and link names make sense out of visual context.

## What's Next

Day 8 covers native audio and video, captions, responsive image sources, and safe embedded content.