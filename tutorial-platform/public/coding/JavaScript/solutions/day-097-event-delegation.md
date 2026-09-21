# Day 097 — Solution: Event Delegation

```js
const list = document.querySelector("#todos");
function addTodo(id, text) {
  const item = document.createElement("li");
  item.dataset.id = id;
  item.innerHTML = `<span class="todo-text">${text}</span> <button class="delete">Delete</button>`;
  list.append(item);
}
list.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".delete");
  const item = event.target.closest("li");
  if (!item) return;
  if (deleteButton) {
    item.remove();
    return;
  }
  if (event.target.closest(".todo-text")) item.classList.toggle("completed");
});
addTodo(1, "Learn delegation");
addTodo(2, "Add another item");
addTodo(3, "This item works without a new listener");
```

**5–7.** The same parent listener can highlight delegated table rows. Use `row.dataset.id` to identify the record. A delegated list with 50 items has one listener; the per-item version has 50 delete listeners.

## Interview-style questions

**8.** Events bubble from dynamically added children to the already-listening parent.

**9.** `closest()` finds the nearest matching ancestor, so a click on a button's nested icon still locates the intended button and list item.

**10.** Delegation is unnecessary overhead for one static button that never changes; attach a direct listener instead.
