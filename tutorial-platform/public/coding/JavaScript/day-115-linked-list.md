# Day 115 — Linked List Implementation

Bonus practice. Build a singly linked list from scratch — a fundamental data structure
that behaves very differently from arrays. No limit on how many variations you try.

## Basic

1. Implement a `Node` class with `value` and `next` (initially `null`).
2. Implement a `LinkedList` class with a `head` property, and an `append(value)`
   method that adds a new node to the end.
3. Implement `toArray()` on your `LinkedList`, walking from `head` to the end,
   collecting each value into a real array (useful for testing/printing).
4. Implement `prepend(value)` — adds a new node to the very front (becomes the new
   `head`).

## Concept

5. Implement `insertAt(index, value)` — inserts a new node at a specific position.
6. Implement `removeAt(index)` — removes the node at a specific position, correctly
   re-linking its neighbors.
7. Implement `find(value)` — returns the node containing a given value, or `null` if
   not found.
8. Implement `reverse()` — reverses the entire linked list IN PLACE (by relinking
   `next` pointers, not by copying into an array and back).

## Interview-style questions

9. What's the key difference between how an array stores its elements versus how a
   linked list stores them?
10. Why is inserting/removing at the FRONT of a linked list much faster than doing the
    same at the front of an array?
11. Why is accessing an element by INDEX slower in a linked list than in an array?

## Notes

- Linked lists are one of the most commonly asked "implement from scratch" interview
  data structures — `reverse()` in particular is a very frequently asked question.
- Draw the list out on paper (boxes and arrows) while implementing `insertAt`/`removeAt`
  — visualizing the pointer changes makes the logic much clearer than reasoning in code alone.

<!-- codingterminal-solution:start -->

# Day 115 — Solution: Linked List

```js
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
  }
  append(value) {
    const node = new Node(value);
    if (!this.head) this.head = node;
    else {
      let current = this.head;
      while (current.next) current = current.next;
      current.next = node;
    }
  }
  prepend(value) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
  }
  toArray() {
    const values = [];
    for (let current = this.head; current; current = current.next)
      values.push(current.value);
    return values;
  }
  insertAt(index, value) {
    if (index === 0) return this.prepend(value);
    let current = this.head;
    for (let i = 1; current && i < index; i++) current = current.next;
    if (!current) return false;
    const node = new Node(value);
    node.next = current.next;
    current.next = node;
    return true;
  }
  removeAt(index) {
    if (!this.head) return undefined;
    if (index === 0) {
      const value = this.head.value;
      this.head = this.head.next;
      return value;
    }
    let current = this.head;
    for (let i = 1; current.next && i < index; i++) current = current.next;
    if (!current.next) return undefined;
    const value = current.next.value;
    current.next = current.next.next;
    return value;
  }
  find(value) {
    for (let current = this.head; current; current = current.next)
      if (current.value === value) return current;
    return null;
  }
  reverse() {
    let previous = null,
      current = this.head;
    while (current) {
      const next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }
    this.head = previous;
  }
}
const list = new LinkedList();
list.append(2);
list.append(3);
list.prepend(1);
list.insertAt(2, 9);
list.removeAt(2);
list.reverse();
console.log(list.toArray());
```

Arrays store elements in indexed contiguous access; linked lists store nodes connected by pointers. Front insertion/removal is O(1) for a linked list, while array front operations shift elements. Indexed lookup is O(n) in a linked list versus O(1) in an array.

<!-- codingterminal-solution:end -->

