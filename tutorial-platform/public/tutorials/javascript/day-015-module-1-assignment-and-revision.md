---
title: Module 1 Assignment and Revision
slug: day-015-module-1-assignment-and-revision
dayLabel: Day 15
level: Beginner
estimatedMinutes: 40
order: 15
track: javascript
---

# Day 15 [Beginner]: Module 1 Assignment and Revision

## Goal

Bring together everything from Days 1–14 into one real project, then revise the core concepts of Module 1 before moving on to control flow.

## Prerequisites

- Day 1–14 (all of Module 1: syntax, variables, types, operators, functions, events, storage)

## Explanation

Module 1 covered a lot of ground: what JavaScript is and how it runs, variables (`var`/`let`/`const`), data types and conversion, all the operator families, functions (declarations, expressions, arrow functions), browser events, and Local/Session Storage. Today is about proving to yourself that these pieces work _together_, not just in isolation.

The project for today — a **Personal Expense Tracker** — deliberately touches every major Module 1 topic: variables to hold state, functions to organize logic, conditions to validate input, events to react to user actions, and Local Storage to make the data persist across page reloads.

## Topic by Topic

### Topic 1: Project overview — Personal Expense Tracker

Theory:
The app lets a user add an expense (description + amount + category), see a running total, and have everything survive a page refresh.

Practical:
Build this incrementally — get adding expenses working first, then the total, then categories, then storage. Don't try to build everything at once.

Code Example:

```html
<input id="desc" placeholder="Description" />
<input id="amount" type="number" placeholder="Amount" />
<select id="category">
  <option>Food</option>
  <option>Travel</option>
  <option>Other</option>
</select>
<button id="addExpense">Add Expense</button>
<ul id="expenseList"></ul>
<p>Total: <span id="total">0</span></p>
```

**Explanation:** This is the minimal HTML skeleton — the JavaScript you write today will read from these inputs, update the list, and persist everything.

**Key Points:**

- Start with the simplest working version, then add features one at a time.
- Keep your JavaScript organized into small functions (`addExpense()`, `renderList()`, `calculateTotal()`, `saveToStorage()`).
- Test after every small addition rather than writing everything before testing once.

### Topic 2: Wiring up the required features

Theory:
Every feature maps directly to a Module 1 topic: events for the "Add" button, functions for calculations, conditions for validating input, and storage for persistence.

Practical:

- **Events**: `addEventListener("click", ...)` on the Add button.
- **Functions**: separate, focused functions for adding, rendering, calculating, deleting.
- **Conditions**: don't add an expense if the description is empty or the amount isn't a valid positive number.
- **Local Storage**: save the expense list as JSON after every change, and load it back on page load.

Code Example:

```js
function addExpense(description, amount, category) {
  if (!description || amount <= 0 || Number.isNaN(amount)) {
    console.log("Invalid expense - not adding");
    return;
  }
  expenses.push({ description, amount, category });
  saveExpenses();
  renderExpenses();
}
```

**Explanation:** This single function shows validation (conditions), state update (array), and calls out to two other focused functions (storage + rendering) — a clean, modular structure.

**Key Points:**

- Validate input before accepting it — this reuses your truthy/falsy and `NaN` knowledge from earlier days.
- Keep each function doing one clear job.
- Persist to storage right after every change, so a refresh never loses data.

### Topic 3: Interview-style revision questions

Theory:
Quickly testing your recall of Module 1's core ideas helps solidify them before building on top in Module 2.

Practical:
Try answering these from memory first, then check back against earlier lessons if unsure:

1. What's the difference between `let`, `const`, and `var`?
2. Why does `typeof null` return `"object"`?
3. What's the difference between `==` and `===`?
4. What are the 6 falsy values?
5. What's the difference between a function's parameters and arguments?
6. What does `return` do that `console.log()` doesn't?
7. What's the difference between Local Storage and Session Storage?
8. Why must objects be `JSON.stringify()`'d before saving to storage?

**Key Points:**

- If any answer feels shaky, that's a signal to revisit that specific day, not the whole module.
- Understanding _why_ something works matters more than memorizing syntax.

### Topic 4: What "done" looks like for Module 1

Theory:
By the end of today, you should be able to write small JavaScript programs confidently without needing to look up basic syntax constantly.

Practical:
A good self-check: can you build a small feature (like a counter or a validated form) from scratch, without copying from an earlier day's file? If yes, Module 1 fundamentals have solidified.

**Key Points:**

- Confidence with variables, functions, conditions, and events is the real goal of Module 1.
- Module 2 (starting Day 16) builds heavily on `if`/`switch`/loops — make sure conditions feel comfortable before moving on.
- It's completely fine to revisit specific days again later — this roadmap isn't a one-way street.

## Recap

- The Expense Tracker project ties together variables, functions, conditions, events, and Local Storage.
- Build incrementally, test constantly, and keep functions small and focused.
- Use the revision questions to confirm Module 1 concepts are solid before Module 2.

## What's Next

Practice for today: `public/coding/JavaScript/day-015-module-1-project.md` — the full Expense Tracker project brief. Day 16 begins Module 2 with the `if` statement in depth.
