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
