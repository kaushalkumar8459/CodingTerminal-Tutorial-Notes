# Real Interview Set 4 — Practical DOM and Async Coding

## 1. Build a delegated counter list

Any button with `data-counter` should increment only its own value, including buttons added later.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">document.addEventListener("click", (event) =&gt; {
  const button = event.target.closest("[data-counter]");
  if (!button) return;
  button.value = Number(button.value) + 1;
});</code></pre></details>

## 2. Implement a debounce search handler

Show a loading indicator immediately and call the search only after 400 ms of quiet time.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">function debounce(callback, delay) {
  let timer;
  return (...args) =&gt; {
    clearTimeout(timer);
    timer = setTimeout(() =&gt; callback(...args), delay);
  };
}
const search = debounce((term) =&gt; console.log("Search", term), 400);
input.addEventListener("input", (event) =&gt; search(event.target.value));</code></pre></details>

## 3. Fetch with retry and timeout

Build a reusable function for unreliable APIs.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">async function fetchWithRetry(url, attempts = 3, timeoutMs = 3000) {
  let lastError;
  for (let attempt = 0; attempt &lt; attempts; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() =&gt; controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      lastError = error;
    } finally {
      clearTimeout(timeout);
    }
  }
  throw lastError;
}</code></pre></details>

## 4. Validate a registration form

Validate email, ten-digit phone, password length, and matching confirmation. Show all errors.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Name is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Invalid email";
  if (!/^\d{10}$/.test(values.phone)) errors.phone = "Phone must have 10 digits";
  if (values.password.length &lt; 8) errors.password = "Password is too short";
  if (values.password !== values.confirmPassword) errors.confirmPassword = "Passwords differ";
  return errors;
}</code></pre></details>

## 5. Build a small event emitter

Support subscribing, unsubscribing, and emitting arguments.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">class EventEmitter {
  constructor() { this.events = new Map(); }
  on(name, callback) { if (!this.events.has(name)) this.events.set(name, new Set()); this.events.get(name).add(callback); }
  off(name, callback) { this.events.get(name)?.delete(callback); }
  emit(name, ...args) { for (const callback of this.events.get(name) || []) callback(...args); }
}</code></pre></details>

## 6. Implement a task queue

Run async tasks in the order added, one at a time.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">class TaskQueue {
  queue = [];
  running = false;
  add(task) { this.queue.push(task); void this.run(); }
  async run() {
    if (this.running) return;
    this.running = true;
    while (this.queue.length) await this.queue.shift()();
    this.running = false;
  }
}</code></pre></details>

## 7. Explain bubbling and stopping propagation

Create a clickable card with a delete button that must not also open the card.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">card.addEventListener("click", openCard);
deleteButton.addEventListener("click", (event) =&gt; {
  event.stopPropagation();
  deleteItem();
});</code></pre></details>

## 8. Persist and restore JSON safely

Save a todo array to Local Storage and handle corrupt stored data.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">function loadTodos() {
  try {
    const value = JSON.parse(localStorage.getItem("todos") || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}
function saveTodos(todos) { localStorage.setItem("todos", JSON.stringify(todos)); }</code></pre></details>

<!-- codingterminal-solution:start -->

# Day 004 — DOM & Async — Detailed Solutions

> Original practice solutions for interview preparation. Company names in the filename identify the topic group; they do not mean every exercise below is a verified question from that company.

## Problems Covered

event delegation, debounce, abortable fetch

## Executable JavaScript

```js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

list.addEventListener("click", event => {
  const button = event.target.closest("[data-id]");
  if (button && list.contains(button)) console.log(button.dataset.id);
});

async function loadUser(id, signal) {
  const response = await fetch("/api/users/" + id, { signal });
  if (!response.ok) throw new Error("HTTP " + response.status);
  return response.json();
}
```

## How to Explain It

- Start with the requirement and assumptions.
- Explain the data structure or runtime behavior.
- State time and space complexity.
- Walk through one normal case and one edge case.
- Mention a production trade-off or failure mode.

## Edge Cases

- Empty input
- Single item
- Duplicate values
- Invalid input
- Large input
- Repeated calls or concurrent operations where applicable

## Follow-Up Questions

1. Can you improve the complexity?
2. What changes for very large input?
3. How would you test it?
4. How would you handle cancellation or failure?
5. What changes in a browser/UI implementation?

<!-- codingterminal-solution:end -->

