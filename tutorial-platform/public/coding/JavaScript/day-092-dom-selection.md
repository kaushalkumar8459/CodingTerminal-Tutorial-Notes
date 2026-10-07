# Day 092 — DOM Selection: Dynamic User List

Matches Tutorial Day 92 (DOM Introduction). Build these as real HTML+JS pages you
actually open in a browser. No limit on how far you extend them.

## Basic

1. Select an element by ID and log its `textContent`.
2. Select an element by class using `querySelector()`.
3. Select all elements of a given class using `querySelectorAll()`, and log how many
   were found.
4. Select an element using an attribute selector (e.g. `querySelector('[data-role="admin"]')`).
5. Try selecting an element that doesn't exist, and confirm the result is `null` /
   an empty `NodeList` (don't let this crash your script).

## Project: Dynamic User List

6. Given an array of user objects (`{name, email}`) defined in your JavaScript, write
   code that creates the necessary DOM elements and displays each user as a list item
   inside a `<ul>` already present in your HTML (you don't need `createElement()` skills
   yet if you'd rather build the HTML as a string and set it via `innerHTML` — that's
   fine for today, `createElement()` is covered fully tomorrow).
7. Add a search input above the list; as the user types, filter the DISPLAYED list to
   only show users whose name matches (reuse your Module 3 filter skills).
8. Add a count display showing "Showing X of Y users" that updates as the search
   filters the list.
9. Select the search input itself using `querySelector()`, and log its current value
   whenever it changes.

## Interview-style questions

10. What's the difference between `document.getElementById()` and
    `document.querySelector()` in terms of what selectors they accept?
11. Why does `querySelectorAll()` return a `NodeList` instead of a true array, and
    what's one practical consequence of that (hint: think about which array methods
    work directly on it)?

## Notes

- Actually open your HTML file in a real browser and interact with it — reading DOM
  code without seeing it run misses most of the learning value.
- Use the browser's DevTools Console (`F12`) throughout — `console.log()` your selected
  elements to confirm you're selecting exactly what you expect before moving on.

<!-- codingterminal-solution:start -->

# Day 092 — Solution: DOM Selection

```html
<input id="search" placeholder="Search users" />
<p id="count"></p>
<ul id="users"></ul>
<div class="status" data-role="admin">Admin</div>
<script>
  const users = [
    { name: "Asha", email: "asha@example.com" },
    { name: "Ben", email: "ben@example.com" },
  ];
  const list = document.getElementById("users");
  console.log(list.textContent);
  console.log(document.querySelector(".status"));
  console.log(document.querySelectorAll(".status").length);
  console.log(document.querySelector('[data-role="admin"]'));
  console.log(document.querySelector(".missing"));
  const search = document.querySelector("#search");
  const count = document.querySelector("#count");
  function render(term = "") {
    const matches = users.filter((user) =>
      user.name.toLowerCase().includes(term.toLowerCase()),
    );
    list.innerHTML = matches
      .map((user) => `<li>${user.name} - ${user.email}</li>`)
      .join("");
    count.textContent = `Showing ${matches.length} of ${users.length} users`;
  }
  search.addEventListener("input", (event) => {
    console.log(event.target.value);
    render(event.target.value);
  });
  render();
</script>
```

## Interview-style questions

**10.** `getElementById()` accepts only an ID string. `querySelector()` accepts any CSS selector.

**11.** `querySelectorAll()` returns a NodeList. It supports iteration and `forEach`, but it is not a full Array, so methods such as `map` require conversion with `[...nodeList]`.

<!-- codingterminal-solution:end -->

