# Day 012 — Layout, Paths, and Code Elements

Matches Tutorial Day 12 (Layout Responsive Design and Code Elements).

## Basic

1. Outline a page using `header`, `nav`, `main`, `aside`, and `footer`.
2. Add a viewport declaration and explain what CSS is still needed for responsive layout.
3. Link a favicon and a stylesheet using correct paths.
4. Create a block code example with `pre` and `code`.
5. Mark a keyboard shortcut and terminal output with `kbd` and `samp`.

## Concept Questions

6. What is the difference between a document-relative and root-relative path?
7. Does `.htm` behave differently from `.html` in a browser?
8. Why should you avoid fixed row/column layout tables?
9. What happens to whitespace inside `pre`?

## Challenge

10. Create a documentation page with a semantic sidebar, main article, favicon link, a short code sample, and a keyboard shortcut. Verify its content order with CSS disabled.

## Notes

- The default server file (`index.html`, for example) is configured by the host.
- Use CSS Grid/Flexbox for page layout; HTML should retain a logical reading order.

<!-- codingterminal-solution:start -->

# Day 012 — Solution: Layout, Paths, and Code Elements

## Basic

**1. Semantic outline**

```html
<header><a href="/">Docs</a></header>
<nav aria-label="Documentation"><a href="guide.html">Guide</a></nav>
<main><article><h1>Guide</h1><p>Documentation content.</p></article><aside>Related links</aside></main>
<footer>Updated 2026</footer>
```

**2. Viewport:** `<meta name="viewport" content="width=device-width, initial-scale=1">`. It sets the layout viewport; flexible CSS is still needed to prevent overflow and adapt columns.

**3. Resources:** `<link rel="icon" href="/favicon.ico">` and `<link rel="stylesheet" href="styles/site.css">`. Resolve a relative path from the current document.

**4–5. Technical text**

```html
<pre><code>const total = 2 + 3;
console.log(total);</code></pre>
<p>Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save.</p>
<p>The terminal prints <samp>5</samp>.</p>
```

## Concept Answers

**6. Paths:** `images/map.png` is document-relative; `/images/map.png` is root-relative.

**7. Extensions:** Browsers treat `.htm` and `.html` as HTML when served with the correct content type; the extension does not change the language.

**8. Layout tables:** They incorrectly expose layout as data relationships and are fragile on small screens and assistive technology.

**9. Preformatted text:** Spaces and line breaks are preserved.

## Challenge

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Project Documentation</title>
    <link rel="icon" href="/favicon.ico">
  </head>
  <body>
    <header><a href="/">Project Docs</a></header>
    <nav aria-label="Documentation"><a href="#install">Installation</a></nav>
    <main>
      <article>
        <h1>Getting started</h1>
        <section id="install">
          <h2>Installation</h2>
          <p>Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save your file.</p>
          <pre><code>npm install
npm run dev</code></pre>
        </section>
      </article>
      <aside>Related guide: deployment.</aside>
    </main>
    <footer>Example documentation</footer>
  </body>
</html>
```

<!-- codingterminal-solution:end -->

