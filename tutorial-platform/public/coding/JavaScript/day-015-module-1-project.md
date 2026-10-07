# Day 015 — Module 1 Project: Expense Tracker

Matches Tutorial Day 15 (Module 1 Assignment & Revision) — this is the Module 1 capstone
project. No limit on how far you extend it beyond the required features.

## Project: Personal Expense Tracker

Build a small web app (HTML + JS, one page) with these required features:

1. **Add an expense** — description, amount, and category (e.g. Food/Travel/Other),
   via a form with an "Add" button.
2. **Delete an expense** — each expense in the list has its own delete button.
3. **Calculate total** — show a running total of all expenses, updated live.
4. **Categorize expenses** — show a simple breakdown (e.g. total per category), even
   if it's just a plain list like `Food: 450, Travel: 200`.
5. **Save to Local Storage** — every add/delete updates Local Storage.
6. **Load after refresh** — reopening the page shows previously saved expenses, not an
   empty list.

## Suggested build order (don't try to do it all at once)

1. Static HTML form + empty list on the page.
2. Add expense → push to an in-memory array → render the list (no storage yet).
3. Add delete button per item → remove from array → re-render.
4. Add total calculation, updated after every add/delete.
5. Add category breakdown.
6. Add Local Storage save (after every change) and load (on page load).
7. Add input validation (empty description, non-positive amount) using what you learned
   on Day 7 (conditions) and Day 12 (truthy/falsy).

## Stretch goals (optional, no limit)

- Add an "Edit" option for an existing expense.
- Add a date to each expense and sort the list by date.
- Add a simple filter: show only expenses from one category.
- Add a "Clear All" button (with a confirmation before wiping everything).
- Show the total formatted as currency (e.g. `₹1,250.00`).

## Revision checklist (do this before moving to Day 16)

- [ ] I can explain the difference between `let`, `const`, and `var` without looking it up.
- [ ] I understand why `typeof null === "object"`.
- [ ] I know the difference between `==` and `===`, and default to `===`.
- [ ] I can list all 6 falsy values from memory.
- [ ] I understand the difference between a function's parameters and arguments.
- [ ] I know when to use `return` vs `console.log()`.
- [ ] I understand Local Storage vs Session Storage, and why JSON conversion is needed.
- [ ] I built the Expense Tracker without copying code directly from earlier day files.

## Notes

- This project is intentionally open-ended — the "no limit on questions" rule applies to
  stretch goals here too. Add as many extra features as you want once the required six
  are solid.
- If any revision checklist item feels shaky, go back to that specific tutorial day before
  starting Module 2.

<!-- codingterminal-solution:start -->

# Day 015 — Solution: Module 1 Project (Expense Tracker)

A reference implementation for `day-015-module-1-project.md`. This is a complete,
working starting point — extend it further with the stretch goals in the practice
file.

```html
<input id="description" placeholder="Description" />
<input id="amount" type="number" placeholder="Amount" />
<select id="category">
  <option>Food</option>
  <option>Travel</option>
  <option>Other</option>
</select>
<button id="addExpense">Add Expense</button>

<ul id="expenseList"></ul>
<p>Total: <span id="total">0</span></p>
<div id="categoryBreakdown"></div>

<script>
  const STORAGE_KEY = "expenses";
  let expenses = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const listEl = document.getElementById("expenseList");
  const totalEl = document.getElementById("total");
  const breakdownEl = document.getElementById("categoryBreakdown");

  function saveExpenses() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }

  function renderExpenses() {
    listEl.innerHTML = "";

    expenses.forEach((expense, index) => {
      const li = document.createElement("li");
      li.textContent = `${expense.description} - ${expense.amount} (${expense.category}) `;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        expenses.splice(index, 1);
        saveExpenses();
        renderExpenses();
      });

      li.append(deleteBtn);
      listEl.append(li);
    });

    renderTotal();
    renderBreakdown();
  }

  function renderTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalEl.textContent = total;
  }

  function renderBreakdown() {
    const byCategory = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    breakdownEl.innerHTML = Object.entries(byCategory)
      .map(([category, total]) => `<p>${category}: ${total}</p>`)
      .join("");
  }

  document.getElementById("addExpense").addEventListener("click", () => {
    const description = document.getElementById("description").value.trim();
    const amount = Number(document.getElementById("amount").value);
    const category = document.getElementById("category").value;

    // Validation (Day 7 conditions + Day 12 truthy/falsy)
    if (!description || amount <= 0 || Number.isNaN(amount)) {
      alert("Please enter a valid description and a positive amount.");
      return;
    }

    expenses.push({ description, amount, category });
    saveExpenses();
    renderExpenses();

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
  });

  renderExpenses(); // load and display any previously saved expenses on page start
</script>
```

## Key implementation notes

- **One source of truth**: the `expenses` array in memory is the only thing directly
  read/written — the DOM is always re-rendered FROM it, never edited by hand
  separately. This avoids the array and the page ever getting out of sync.
- **`saveExpenses()` is called after every change** (add or delete), so a refresh
  never loses data — this directly satisfies the "load after refresh" requirement.
- **Validation happens before adding**, not after — invalid expenses never make it
  into the array at all.
- **Category breakdown** is recalculated fresh every render using `.reduce()` to
  group and sum by category — the same pattern used throughout Module 3.

<!-- codingterminal-solution:end -->

