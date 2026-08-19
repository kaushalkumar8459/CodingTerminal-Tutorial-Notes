---
title: DOM, Events and Async JavaScript
slug: day-005-dom-events-and-async-javascript
dayLabel: Day 5
level: Intermediate
estimatedMinutes: 45
order: 5
track: javascript
---

# Day 5 [Intermediate]: DOM, Events and Async JavaScript

## Goal

Handle browser interaction and asynchronous operations in JavaScript.

## Topic by Topic

### Topic 1: DOM Selection

```js
document.getElementById("btn");
document.querySelector(".box");
```

### Topic 2: Event Handling

```js
document.getElementById("btn").addEventListener("click", () => {
  console.log("Clicked");
});
```

### Topic 3: Promise and Async/Await

```js
const promise = new Promise((resolve) => {
  setTimeout(() => resolve("Done"), 1000);
});

promise.then((value) => console.log(value));
```

```js
async function fetchData() {
  const result = await promise;
  console.log(result);
}
```

### Topic 4: Event Loop Concept

**Explanation:** JavaScript executes code in a single thread, but asynchronous operations are handled in the callback queue and event loop.

## Coding Questions

#### Q1. Change the text of a button when clicked.
```js
const button = document.getElementById("btn");
button.addEventListener("click", () => {
  button.textContent = "Clicked";
});
```

#### Q2. Write a Promise that resolves after 2 seconds.
```js
const p = new Promise((resolve) => {
  setTimeout(() => resolve("Success"), 2000);
});
```

#### Q3. Write an async function to simulate API call.
```js
async function loadUser() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name: "Anu" }), 1000);
  });
}
```

#### Q4. What is callback hell?
**Answer:** Callback hell happens when nested callbacks become difficult to read and maintain. `Promise` and `async/await` help fix this.

## Interview Questions

### Q1. What is the event loop?
**Answer:** The event loop checks the call stack and task queue to run asynchronous tasks at the right time.

### Q2. What is the difference between `async/await` and `.then()`?
**Answer:** Both handle Promises, but `async/await` is easier to read and write.

### Q3. Why is JavaScript considered single-threaded?
**Answer:** It has one call stack, but asynchronous tasks are handled by browser or Node runtime APIs.

## Practice Task

- Add a click listener to a button.
- Use `setTimeout` to show a message after 2 seconds.
- Write a promise-based function and consume it with `await`.

## Day 5 Outcome

You should understand how DOM events work and how JavaScript handles asynchronous tasks in real-world applications.
