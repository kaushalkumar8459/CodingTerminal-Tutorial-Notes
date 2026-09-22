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
