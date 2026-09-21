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
