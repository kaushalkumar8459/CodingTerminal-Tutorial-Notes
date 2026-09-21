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
