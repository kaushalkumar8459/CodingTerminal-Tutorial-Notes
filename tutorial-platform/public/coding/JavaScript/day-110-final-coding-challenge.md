# Day 110 — Final Coding Challenge: E-Commerce Management Application

Matches Tutorial Day 110 (Final JavaScript Project and Assessment). This is the capstone
project for the entire 110-day roadmap. No limit on how far you extend it beyond the
required features — this is a genuine portfolio piece.

## Required flow

```
Product List
    -> Search
    -> Filter
    -> Sort
    -> Product Details
    -> Add to Cart
    -> Update Quantity
    -> Remove Product
    -> Calculate Total
    -> Apply Coupon
    -> Checkout
    -> Order History
```

## Technical requirements checklist

Build this using PURE JavaScript (no framework), and make sure your final project
genuinely uses:

- [ ] Variables, functions, conditions, loops (Modules 1-2)
- [ ] Arrays, objects, destructuring, spread/rest, array methods (Module 3)
- [ ] Higher-order functions, closures, `this` handled correctly (Module 4)
- [ ] Classes, inheritance, encapsulation — at least a `Product` and `Cart` class (Module 5)
- [ ] Map and/or Set used somewhere meaningfully (e.g. cart keyed by product ID)
- [ ] Promises, async/await, fetch (or a simulated async data load) (Module 6)
- [ ] JSON (for Local Storage persistence)
- [ ] DOM manipulation and events, including event delegation (Module 7)
- [ ] Forms with validation (checkout form)
- [ ] Local Storage (order history persistence)
- [ ] ES Modules (organize your code across multiple files)
- [ ] Regex (at least one validation, e.g. email or coupon code format)
- [ ] Debounce (on the search input)
- [ ] Error handling throughout (try/catch, sensible fallbacks)

## Suggested milestones (check off as you complete each)

1. [ ] Product data + rendered product list
2. [ ] Search (debounced) + filter + sort working together
3. [ ] Product details view
4. [ ] `Cart` class with add/remove/update-quantity/get-total
5. [ ] Cart UI wired up with event delegation
6. [ ] Coupon code system
7. [ ] Checkout form with validation
8. [ ] Order saved to Local Storage on successful checkout
9. [ ] Order History view
10. [ ] Final polish: loading states, error handling, modular file organization

## Stretch goals (optional, no limit)

- Add product images and a simple image gallery per product.
- Add a wishlist feature (separate from the cart), persisted to Local Storage.
- Add pagination to the product list for larger catalogs.
- Add a simple admin view to add/edit/remove products (in-memory or Local Storage-backed).
- Add basic accessibility improvements (keyboard navigation, ARIA labels).

## Final reflection

- Review the full `javascript-roadmap.md` module map and rate your confidence (1-5)
  in each of the 7 modules honestly.
- Identify your weakest 2-3 areas and write down a plan for revisiting them.
- Congratulations on completing the full 110-day JavaScript roadmap — both tracks,
  tutorial and coding, are now complete end to end.
