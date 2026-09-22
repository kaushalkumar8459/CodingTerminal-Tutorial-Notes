# Day 046 — Real-World Data Challenge: E-Commerce Product Processor

Matches Tutorial Day 46 (Data Processing Practice). No limit on how far you extend this
project beyond the required features.

## Project: E-Commerce Product Processor

Given an array of product objects (define your own dataset of at least 15-20 products
with fields like `name, price, category, rating, inStock, discountPercent`), build a
set of functions covering:

1. **Search** — find products whose name includes a given search term (case-insensitive).
2. **Filter** — filter products by category, by price range, and by `inStock` status
   (support combining these filters together).
3. **Sort** — sort products by price (asc/desc) and by rating (asc/desc).
4. **Category filter** — return all unique categories present in the dataset (hint:
   `.map()` + `Set`).
5. **Price range** — return products within a given min/max price range.
6. **Discount calculation** — given a product and its `discountPercent`, calculate its
   final discounted price.
7. **Cart total** — given a "cart" (array of `{productId, quantity}`), calculate the
   total price (using discounted prices where applicable).

## Suggested build order

1. Define your product dataset first (15-20 realistic products).
2. Build `searchProducts(products, term)`.
3. Build `filterProducts(products, { category, minPrice, maxPrice, inStockOnly })`.
4. Build `sortProducts(products, sortBy, direction)`.
5. Build `getDiscountedPrice(product)`.
6. Build `calculateCartTotal(cart, products)`.
7. Combine search + filter + sort into one `queryProducts(products, options)` function.

## Stretch goals (optional, no limit)

- Add pagination: return only a specific "page" of results (e.g. 10 products at a time).
- Add a "recommended products" feature (e.g. same category, similar price range).
- Track "recently viewed" products in a separate array.
- Add a basic rating-based sort with a tiebreaker on price.

## Interview-style questions

- Why is it useful to build `searchProducts`, `filterProducts`, and `sortProducts` as
  separate, focused functions rather than one giant function?
- How would you combine search + filter + sort efficiently, without looping through the
  full dataset multiple times unnecessarily?

## Notes

- This project intentionally mirrors real e-commerce features — the same patterns
  (search, filter, sort, cart total) reappear in the Day 90 API Project and the Day 110
  capstone, so building strong intuition here pays off repeatedly later.
- Keep each function pure (no side effects, just takes input and returns output) —
  this makes testing and reusing them much easier.
