# Day 009 — Solution: Document Head and Validation

## Basic

**1–2. Head metadata and resources**

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Garden Workshop | Example Center</title>
  <meta name="description" content="Register for a practical community garden workshop.">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="stylesheet" href="/styles/site.css">
  <script src="/scripts/site.js" defer></script>
</head>
```

**3. `async` and `defer`:** `defer` runs after parsing and preserves order among deferred classic scripts. `async` runs as soon as it downloads; ordering is not guaranteed.

**4. Validation workflow:** Run an HTML conformance checker, then inspect the DOM in a browser because parsing can repair malformed source.

**5. Path check:** Resolve relative paths from the current document's URL, then verify requests in the browser Network panel.

## Concept Answers

**6. Head/body:** `head` contains document metadata and linked resources; `body` contains page content.

**7. Base:** It changes the base URL used to resolve relative URLs throughout the document.

**8. Refresh:** Automatic redirects can disorient users and interfere with assistive technology; use a link or server redirect instead.

**9. Browser recovery:** Browsers try to display malformed HTML, sometimes changing the parsed tree from the source.

## Challenge

Use the head above on each page, with a distinct title and accurate description. If a page at `/guides/index.html` refers to `images/map.png`, verify whether the intended path is `/guides/images/map.png` or `/images/map.png`, then update it. Manual checks can include keyboard navigation, whether alt text is useful, and whether each form error is understandable.