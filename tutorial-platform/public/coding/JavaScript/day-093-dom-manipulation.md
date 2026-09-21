# Day 093 — DOM Manipulation (textContent, innerHTML, classList, attributes, styles)

Matches Tutorial Day 93 (DOM Manipulation). No limit on how far you extend these.

## Basic

1. Change an element's `textContent` in response to a button click.
2. Change an element's inline style (color, font-size) in response to a button click.
3. Add and remove a CSS class using `classList.add()`/`classList.remove()`.
4. Use `classList.toggle()` to build a simple show/hide button for a hidden `<div>`.
5. Change an image's `src` attribute to swap between two different images on click.

## Concept

6. Build a "theme switcher": a button that toggles a `dark-mode` class on the
   `<body>` element.
7. Build a simple "like button": clicking toggles both a CSS class (filled/unfilled
   heart icon via CSS) AND the displayed like count text.
8. Use `getAttribute()`/`setAttribute()` to read and update a custom `data-*`
   attribute on an element (e.g. `data-status`).
9. Build a form field that becomes `disabled` after being submitted once (toggle the
   `.disabled` property directly).
10. Build a "read more" toggle: a paragraph is truncated with CSS by default, and a
    button expands it by toggling a class.

## Interview-style questions

11. Why is `textContent` generally considered safer than `innerHTML` when displaying
    user-provided content?
12. What's the advantage of `classList.toggle()` over manually checking and
    adding/removing a class yourself?
13. When would you use `setAttribute()` instead of a direct property (like `.value`
    or `.src`)?

## Notes

- Build and test these in an actual browser — DOM manipulation only really makes sense
  when you can see the visual result of your code changing the page.
- Get comfortable reaching for `classList` methods FIRST for any visual state change
  (show/hide, active/inactive, highlighted/not) — it keeps your CSS and JS cleanly
  separated.
