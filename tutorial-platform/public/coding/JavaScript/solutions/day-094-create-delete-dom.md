# Day 094 — Solution: Create/Delete DOM

```js
const list = document.querySelector("#todos");
const item = document.createElement("li");
item.textContent = "First task";
list.append(item);
for (let i = 1; i <= 5; i++) {
  const li = document.createElement("li");
  li.textContent = `Task ${i}`;
  list.append(li);
}
list.firstElementChild?.remove();
const top = document.createElement("li");
top.textContent = "Top task";
list.prepend(top);
const replacement = document.createElement("li");
replacement.textContent = "Replacement";
list.lastElementChild?.replaceWith(replacement);

const input = document.querySelector("#todo-input");
const addButton = document.querySelector("#add");
const clearButton = document.querySelector("#clear");
const counter = document.querySelector("#count");
function updateCount() {
  counter.textContent = `${list.children.length} todos`;
}
function addTodo() {
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement("li");
  li.append(text, " ");
  const button = document.createElement("button");
  button.textContent = "Delete";
  button.addEventListener("click", () => {
    li.remove();
    updateCount();
  });
  li.append(button);
  list.append(li);
  input.value = "";
  updateCount();
}
addButton.addEventListener("click", addTodo);
clearButton.addEventListener("click", () => {
  list.replaceChildren();
  updateCount();
});
```

## Interview-style questions

**11.** Creating an element only creates an in-memory node; appending it connects it to the document tree that the browser renders.

**12.** `remove()` deletes the node from the document. `display: none` leaves it in the DOM but hides it visually.

**13.** Each dynamically created item needs its own button and behavior, so the delete control is created with the item it removes.
