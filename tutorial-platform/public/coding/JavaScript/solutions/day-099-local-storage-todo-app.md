# Day 099 — Solution: Local Storage Todo App

```js
const KEY = "todos";
let todos = JSON.parse(localStorage.getItem(KEY) || "[]");
const list = document.querySelector("#todos");
const saveTodos = () => localStorage.setItem(KEY, JSON.stringify(todos));
function render(filter = "all", search = "") {
  const visible = todos.filter(
    (todo) =>
      (filter === "all" ||
        filter === (todo.completed ? "completed" : "active")) &&
      todo.text.toLowerCase().includes(search.toLowerCase()),
  );
  list.innerHTML = visible
    .map(
      (todo) =>
        `<li data-id="${todo.id}" class="${todo.completed ? "completed" : ""}"><input type="checkbox" ${todo.completed ? "checked" : ""}><span class="text">${todo.text}</span><button class="delete">Delete</button></li>`,
    )
    .join("");
}
document.querySelector("#add-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.currentTarget.elements.text;
  if (!input.value.trim()) return;
  todos.push({
    id: crypto.randomUUID(),
    text: input.value.trim(),
    completed: false,
    category: event.currentTarget.elements.category.value,
  });
  input.value = "";
  saveTodos();
  render();
});
list.addEventListener("click", (event) => {
  const item = event.target.closest("li");
  if (!item) return;
  const todo = todos.find((entry) => entry.id === item.dataset.id);
  if (event.target.closest(".delete"))
    todos = todos.filter((entry) => entry.id !== todo.id);
  else if (event.target.matches("input")) todo.completed = event.target.checked;
  else if (event.target.closest(".text")) {
    const next = prompt("Edit todo", todo.text);
    if (next?.trim()) todo.text = next.trim();
  }
  saveTodos();
  render();
});
document
  .querySelector("#search")
  .addEventListener("input", (event) => render("all", event.target.value));
render();
```

Keep the in-memory array as the source of truth and re-render after every mutation. Save after every add, edit, delete, and completion change so a crash or refresh does not discard the latest state.
