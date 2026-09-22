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
