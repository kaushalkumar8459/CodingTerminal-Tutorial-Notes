# Day 099 — Local Storage Project: Todo Application

Matches Tutorial Day 99 (Browser Storage and Cookies). No limit on how far you extend this.

## Project: Full Todo Application

Combine Days 94/97 (create/delete DOM, event delegation) with Day 14/99 (Local
Storage) to build a complete, persistent todo app:

1. **Add** — a form to add a new todo (text + optional category), created dynamically
   and appended to the list.
2. **Edit** — click a todo's text to make it editable inline, saving the change on
   blur or Enter.
3. **Delete** — a delete button per todo, using event delegation (Day 97).
4. **Complete** — clicking a checkbox (or the todo itself) toggles a `completed` class
   and visual style.
5. **Filter** — buttons/tabs for "All", "Active", "Completed" that show/hide todos
   accordingly.
6. **Search** — a search input that filters the DISPLAYED todos by text match.
7. **Local Storage** — save the FULL todo list (as JSON) to Local Storage after every
   change (add/edit/delete/complete), and load it back when the page opens.

## Suggested build order

1. Build the static UI first (form, empty list, filter buttons).
2. Implement add/delete with event delegation, keeping todos in an in-memory array.
3. Implement complete-toggle and inline edit.
4. Implement filter and search (working on the in-memory array, then re-rendering).
5. Add Local Storage save/load last, wrapping your existing add/edit/delete/complete
   logic with a `saveTodos()` call, and `loadTodos()` on page start.

## Interview-style questions

- Why is it usually easier to keep one "source of truth" array in memory, and always
  RE-RENDER the whole list from it, rather than trying to keep the DOM and your data
  perfectly in sync through many small individual DOM edits?
- Why should `saveTodos()` be called after EVERY change, rather than only when the
  page is about to close?

## Notes

- This project combines nearly everything from Days 92-99 — treat it as a genuine
  checkpoint before moving into JSON (Day 100) and beyond.
- "Re-render the whole list from the data array" (rather than manually patching
  individual DOM elements) is a pattern worth getting comfortable with — it's exactly
  the mental model modern frameworks are built around.

<!-- codingterminal-solution:start -->

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

<!-- codingterminal-solution:end -->

