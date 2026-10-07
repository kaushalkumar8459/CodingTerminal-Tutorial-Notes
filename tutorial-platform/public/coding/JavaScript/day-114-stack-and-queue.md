# Day 114 — Stack & Queue Implementation

Bonus practice. Build these two fundamental data structures from scratch (don't just
use arrays with `.push()`/`.shift()` directly — wrap them in a proper class/interface).
No limit on how many variations you try.

## Basic — Stack (Last In, First Out)

1. Implement a `Stack` class with `push(value)`, `pop()`, `peek()`, `isEmpty()`, and
   `size()`.
2. Use your `Stack` to reverse a string (push each character, then pop them all off).
3. Use your `Stack` to check if a string of brackets/parentheses is balanced (revisit
   the Day 30 problem, but implemented with a real stack this time).

## Basic — Queue (First In, First Out)

4. Implement a `Queue` class with `enqueue(value)`, `dequeue()`, `peek()`, `isEmpty()`,
   and `size()`.
5. Use your `Queue` to simulate a simple ticket/line system: people enqueue, and are
   served (dequeued) in the order they arrived.
6. Compare your `Queue`'s `dequeue()` performance concern: why might using array
   `.shift()` directly (instead of a smarter internal implementation) be inefficient
   for large queues? (Research-level question — just reason about it.)

## Concept

7. Implement a `Stack`-based `undo` system: each action pushes a state onto the stack;
   "undo" pops the last state off and restores it.
8. Implement a simple browser-history-style navigation using a `Stack` (back button
   pops the current page).
9. Use a `Queue` to implement a basic task scheduler that processes tasks strictly in
   the order they were added.

## Interview-style questions

10. What's the core behavioral difference between a stack and a queue?
11. Give one real-world example each of where a stack and a queue would be the natural
    choice.
12. How does the JavaScript call stack (Day 79) relate to the general "stack" data
    structure concept you just built?

## Notes

- Stacks and queues are genuinely foundational — you'll recognize them underlying many
  other things you've already learned (the call stack, the event loop's task queue).
- Implementing these as proper classes (not just raw arrays) is good practice for
  building clean, reusable data structures.

<!-- codingterminal-solution:start -->

# Day 114 — Solution: Stack and Queue

```js
class Stack {
  #items = [];
  push(value) {
    this.#items.push(value);
  }
  pop() {
    return this.#items.pop();
  }
  peek() {
    return this.#items[this.#items.length - 1];
  }
  isEmpty() {
    return this.#items.length === 0;
  }
  size() {
    return this.#items.length;
  }
}
class Queue {
  #items = [];
  #head = 0;
  enqueue(value) {
    this.#items.push(value);
  }
  dequeue() {
    if (this.isEmpty()) return undefined;
    const value = this.#items[this.#head++];
    if (this.#head > 20 && this.#head * 2 > this.#items.length) {
      this.#items = this.#items.slice(this.#head);
      this.#head = 0;
    }
    return value;
  }
  peek() {
    return this.#items[this.#head];
  }
  isEmpty() {
    return this.#head >= this.#items.length;
  }
  size() {
    return this.#items.length - this.#head;
  }
}
function reverse(text) {
  const stack = new Stack();
  for (const character of text) stack.push(character);
  let result = "";
  while (!stack.isEmpty()) result += stack.pop();
  return result;
}
function balanced(text) {
  const stack = new Stack();
  for (const character of text)
    character === "("
      ? stack.push(character)
      : character === ")" &&
        stack.pop() === undefined &&
        (function () {
          throw new Error("unbalanced");
        })();
  return stack.isEmpty();
}
```

A stack is LIFO, useful for undo/history and the call stack. A queue is FIFO, useful for ticket lines and task scheduling. Repeated array `shift()` moves remaining elements and can be O(n); the queue uses a head index instead.

<!-- codingterminal-solution:end -->

