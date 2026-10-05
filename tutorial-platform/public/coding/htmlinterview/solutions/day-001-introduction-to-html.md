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