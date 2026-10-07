# Day 001 — HTML Document Foundations

Matches Tutorial Day 1 (Introduction to HTML). These exercises practice document structure and the browser feedback loop. Write each answer in the HTML editor and use Preview to inspect the rendered page.

## Basic

1. Create a complete HTML document with a doctype, `html lang="en"`, `head`, UTF-8 charset, viewport, title, and body.
2. Add one page heading and two paragraphs about a subject you enjoy.
3. Add a comment above the main content. Confirm the comment is not visible in the preview but is present in the source.
4. Add a `strong` element inside a paragraph and nest it correctly.
5. Change the page title and observe where it appears in the browser.

## Concept Questions

6. What does HTML describe, and what do CSS and JavaScript add?
7. What is the difference between a tag and an element?
8. Name three void elements and explain why they do not have closing tags.
9. What does the browser create when it parses HTML?

## Challenge

10. Build a one-page profile with a unique title, language declaration, one `h1`, an `h2`, two paragraphs, and a nested emphasis element. The page must remain understandable with no CSS.

## Notes

- Keep a complete document shell for every exercise.
- HTML files can be opened directly in a browser; the editor preview refreshes when you click Preview.
- Do not use a heading only to make text look large.

<!-- codingterminal-solution:start -->

# Day 001 — Solution: HTML Document Foundations

Try the practice tasks before comparing. Many page designs are valid; these are reference answers, not the only possible markup.

## Basic

**1. Complete document**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My HTML Practice</title>
  </head>
  <body>
    <h1>My first page</h1>
  </body>
</html>
```

**2. Heading and paragraphs**

```html
<h1>Why I enjoy gardening</h1>
<p>Growing plants gives me a reason to spend time outdoors.</p>
<p>I like learning what each plant needs through the seasons.</p>
```

**3. Source comment**

```html
<!-- Main article content begins here. -->
<main>
  <p>This comment is source-only; this paragraph is visible.</p>
</main>
```

**4. Correct nesting**

```html
<p>Keep the <strong>closing tags</strong> in reverse opening order.</p>
```

**5. Page title**

Change the text inside `<title>...</title>`. It appears in the browser tab, not as the page's visible heading.

## Concept Answers

**6. HTML, CSS, and JavaScript:** HTML gives content structure and meaning. CSS controls presentation. JavaScript adds behavior.

**7. Tag and element:** A tag is markup such as `<p>`; an element includes the opening tag, its content, and its closing tag.

**8. Void elements:** `img`, `meta`, and `br` cannot contain child content, so HTML defines them without end tags.

**9. Browser parsing:** The browser builds a Document Object Model (DOM) tree from the HTML source.

## Challenge

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Profile: Sam Rivera</title>
  </head>
  <body>
    <main>
      <h1>Sam Rivera</h1>
      <h2>About</h2>
      <p>I enjoy learning how the web works.</p>
      <p>My current focus is <strong>semantic HTML</strong>.</p>
    </main>
  </body>
</html>
```

<!-- codingterminal-solution:end -->

