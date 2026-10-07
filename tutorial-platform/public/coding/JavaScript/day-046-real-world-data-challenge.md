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

<!-- codingterminal-solution:start -->

# Day 046 — Solution: E-Commerce Product Processor

```js
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 1000,
    category: "tech",
    rating: 4.8,
    inStock: true,
    discountPercent: 10,
  },
  {
    id: 2,
    name: "Mouse",
    price: 40,
    category: "tech",
    rating: 4.2,
    inStock: true,
    discountPercent: 5,
  },
  {
    id: 3,
    name: "Desk",
    price: 300,
    category: "office",
    rating: 4.5,
    inStock: false,
    discountPercent: 15,
  },
  {
    id: 4,
    name: "Book",
    price: 25,
    category: "study",
    rating: 4.7,
    inStock: true,
    discountPercent: 0,
  },
];

function searchProducts(list, term) {
  const query = term.toLowerCase();
  return list.filter((product) => product.name.toLowerCase().includes(query));
}

function filterProducts(
  list,
  { category, minPrice = 0, maxPrice = Infinity, inStockOnly = false } = {},
) {
  return list.filter(
    (product) =>
      (!category || product.category === category) &&
      product.price >= minPrice &&
      product.price <= maxPrice &&
      (!inStockOnly || product.inStock),
  );
}

function sortProducts(list, sortBy, direction = "asc") {
  const sign = direction === "desc" ? -1 : 1;
  return [...list].sort((a, b) => (a[sortBy] - b[sortBy]) * sign);
}

const categories = [...new Set(products.map((product) => product.category))];
const inRange = products.filter(
  (product) => product.price >= 20 && product.price <= 500,
);
function getDiscountedPrice(product) {
  return product.price * (1 - product.discountPercent / 100);
}

function calculateCartTotal(cart, list) {
  return cart.reduce((total, item) => {
    const product = list.find((candidate) => candidate.id === item.productId);
    return total + (product ? getDiscountedPrice(product) * item.quantity : 0);
  }, 0);
}

function queryProducts(list, options) {
  const searched = options.term ? searchProducts(list, options.term) : list;
  return sortProducts(
    filterProducts(searched, options),
    options.sortBy || "price",
    options.direction || "asc",
  );
}

const cartTotal = calculateCartTotal([{ productId: 1, quantity: 2 }], products);
```

**Stretch: pagination and recommendations**

```js
function paginate(list, page, pageSize) {
  return list.slice((page - 1) * pageSize, page * pageSize);
}
function recommendations(product, list) {
  return list.filter(
    (item) => item.category === product.category && item.id !== product.id,
  );
}
```

## Interview-style questions

Focused functions are easier to test, reuse, and change than one giant function with unrelated responsibilities. A pipeline can search, filter, and sort in clear stages; for very large data, a single pass can combine compatible filters before sorting.

<!-- codingterminal-solution:end -->

