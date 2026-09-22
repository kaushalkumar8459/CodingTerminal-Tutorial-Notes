# Day 001 Solutions — Browser Fundamentals

## async vs defer

For classic external scripts:

- `async`: downloads in parallel and executes as soon as ready; execution can interrupt parsing.
- `defer`: downloads in parallel but executes after HTML parsing, before DOMContentLoaded.

Example:

```html
<script src="analytics.js" async></script>
<script src="app.js" defer></script>
```

## DOMContentLoaded vs load

`DOMContentLoaded` means the HTML document has been parsed and deferred scripts have completed. `load` waits for the page's dependent resources such as images and stylesheets.

## Practice

```js
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready");
});

window.addEventListener("load", () => {
  console.log("Page resources loaded");
});

console.log(location.href);
console.log(innerWidth, innerHeight);
```
