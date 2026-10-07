# Day 002 — DOM Deep Dive

## DOM Tree

1. Explain document, element, text, and comment nodes.
2. Traverse parents, children, and siblings.
3. Use `querySelector()` and `querySelectorAll()`.
4. Compare `children` with `childNodes`.
5. Explain live vs static collections.

## Creating and Updating DOM

6. Create elements with `createElement()`.
7. Set attributes and properties correctly.
8. Add and remove nodes.
9. Use `DocumentFragment` for batched insertion.
10. Use `textContent` safely.
11. Explain when `innerHTML` is appropriate and its security implications.

## DOM Measurements

12. Explain `getBoundingClientRect()`.
13. Understand client, offset, and scroll dimensions.
14. Explain why reading layout after writes can trigger layout work.

## Interview Questions

15. DOM node vs DOM element?
16. `querySelector` vs `getElementById`?
17. `children` vs `childNodes`?
18. What is a DocumentFragment?
19. What causes layout recalculation?

## Practice

Build a dynamic list using DOM APIs and update it without unnecessary repeated DOM work.

<!-- codingterminal-solution:start -->

# Day 002 Solutions — DOM Deep Dive

## Dynamic List

```js
const list = document.querySelector("#list");
const fragment = document.createDocumentFragment();

for (const name of ["Angular", "JavaScript", "TypeScript"]) {
  const item = document.createElement("li");
  item.textContent = name;
  fragment.append(item);
}

list.append(fragment);
```

A DocumentFragment lets multiple nodes be assembled before insertion.

## Safe Text

```js
item.textContent = userProvidedValue;
```

Use textContent when the input should be displayed as text. Treat innerHTML as an HTML parsing boundary and never inject untrusted HTML without appropriate sanitization.

## Interview Takeaway

The DOM is an object representation of the document. DOM operations can have rendering costs, so batch work where practical.

<!-- codingterminal-solution:end -->

