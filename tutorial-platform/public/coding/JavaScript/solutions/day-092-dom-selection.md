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
