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
