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

<!-- codingterminal-solution:start -->

# Day 093 — Solution: DOM Manipulation

```html
<button id="change">Change text</button>
<button id="theme">Theme</button>
<button id="like">Like <span id="likes">0</span></button>
<button id="more">Read more</button>
<p id="message" class="truncated">A longer paragraph that can be expanded.</p>
<input id="field" />
<form id="form"><button>Submit once</button></form>
<img id="image" src="first.png" alt="Preview" />
<script>
  const message = document.querySelector("#message");
  document.querySelector("#change").addEventListener("click", () => {
    message.textContent = "Updated safely";
    message.style.color = "tomato";
    message.classList.add("updated");
  });
  document
    .querySelector("#theme")
    .addEventListener("click", () =>
      document.body.classList.toggle("dark-mode"),
    );
  let likeCount = 0;
  document.querySelector("#like").addEventListener("click", (event) => {
    event.currentTarget.classList.toggle("liked");
    likeCount += event.currentTarget.classList.contains("liked") ? 1 : -1;
    document.querySelector("#likes").textContent = likeCount;
  });
  document
    .querySelector("#more")
    .addEventListener("click", () => message.classList.toggle("truncated"));
  const statusElement = document.querySelector("#field");
  statusElement.setAttribute("data-status", "ready");
  console.log(statusElement.getAttribute("data-status"));
  document.querySelector("#form").addEventListener("submit", (event) => {
    event.preventDefault();
    statusElement.disabled = true;
  });
  document.querySelector("#image").addEventListener("click", (event) => {
    event.currentTarget.src = "second.png";
  });
</script>
```

## Interview-style questions

**11.** `textContent` treats user text as text, while `innerHTML` parses markup and can create injection risks.

**12.** `toggle()` flips the class state in one operation and avoids duplicated presence checks.

**13.** Use attributes for custom metadata or when interacting with markup-level attributes; use direct properties for live DOM state such as `.value`, `.disabled`, or `.src`.

<!-- codingterminal-solution:end -->

