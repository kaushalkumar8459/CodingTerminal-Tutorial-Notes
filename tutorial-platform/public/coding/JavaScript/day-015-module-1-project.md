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
