---
title: Layout Responsive Design and Code Elements
slug: day-012-layout-responsive-design-and-code-elements
dayLabel: Day 12
level: Intermediate
estimatedMinutes: 45
order: 12
track: html
---

# Day 12 [Intermediate]: Layout Responsive Design and Code Elements

## Goal

Plan page layout with semantic regions, understand the HTML requirements for responsive pages, and mark up code and technical text appropriately.

## Prerequisites

- Days 1 through 11 completed
- Basic CSS knowledge is helpful

## Explanation

HTML supplies the content regions and relationships; CSS creates columns, spacing, and responsive layouts. A responsive page adapts to the available screen rather than requiring a particular device width. The HTML viewport declaration is essential, but it does not make a page responsive by itself.

## Topic by Topic

### Topic 1: Layout structure and responsive foundations

Use landmarks such as `header`, `nav`, `main`, `aside`, and `footer` to describe the page. Use CSS Grid or Flexbox for visual layout rather than tables or long chains of generic containers. Keep all essential content available when a layout changes at a breakpoint.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<header>...</header>
<nav aria-label="Primary">...</nav>
<main>
  <article>...</article>
  <aside aria-label="Related resources">...</aside>
</main>
<footer>...</footer>
```

Responsive images were introduced in Day 8. Revisit `picture`, `srcset`, and `sizes` when an image needs a different crop or resolution. For layout, check reflow at narrow widths, zoom, text enlargement, and long localized content. Avoid fixed-width assumptions and never disable browser zoom.

### Topic 2: Favicons and resource paths

A favicon identifies a site in browser tabs and bookmarks. Declare an icon in the document head and make sure its path is correct:

```html
<link rel="icon" href="/favicon.ico" sizes="any">
```

Root-relative paths begin at the site root; document-relative paths begin from the current file. A nested page and the home page may need different relative paths to reach the same resource. Test links on a case-sensitive host and check the browser Network panel for failed requests.

Use consistent lowercase filenames and extensions to avoid path failures on case-sensitive servers. `.html` and `.htm` are both recognized extensions; neither changes the document language. Many hosts serve `index.html` for a directory URL, but the default filename is server configuration, not an HTML rule.

### Topic 3: Marking up technical examples

Use `code` for a short code fragment, `pre` to preserve whitespace in a block, `kbd` for user input, `samp` for program output, and `var` for a variable name. These elements identify content; CSS controls how they appear.

```html
<p>Run <code>npm run build</code> in a terminal.</p>
<p>Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save.</p>
<pre><code>const answer = 42;
console.log(answer);</code></pre>
<p>The program prints <samp>42</samp>.</p>
```

Indentation and newlines inside `pre` are preserved. Keep code examples readable and make sure copied whitespace does not introduce confusing leading spaces.

## Recap

- Semantic HTML describes regions; CSS controls their visual layout.
- Responsive behavior also needs flexible content and testing across widths and zoom levels.
- Favicons and linked resources depend on correct paths.
- Use `pre`, `code`, `kbd`, `samp`, and `var` for the role each technical text plays.

## Practice

Create a three-region page with header/navigation, main article, and related aside. Add a favicon and a code example. Test on a narrow viewport, at 200% zoom, and with CSS disabled; content must remain available and in a sensible reading order.

## Further Reading

- [W3Schools HTML Layout](https://www.w3schools.com/html/html_layout.asp)
- [W3Schools HTML Responsive](https://www.w3schools.com/html/html_responsive.asp)
- [W3Schools HTML Favicon](https://www.w3schools.com/html/html_favicon.asp)
- [W3Schools HTML Computer Code](https://www.w3schools.com/html/html_computercode_elements.asp)

## What's Next

Day 13 covers character entities, symbols, emoji, URL encoding, UTF-8, and XHTML syntax.