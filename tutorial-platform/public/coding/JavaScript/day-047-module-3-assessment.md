# Day 047 — Module 3 Assessment (40 Problems)

Matches Tutorial Day 47 (Module 3 Assignment). Covers strings, arrays, objects, array
methods, destructuring, spread/rest, and data transformation. No limit on revisiting or
extending further.

## Strings (5)

1. Reverse a string without using `.reverse()` directly on an array conversion (try a
   manual loop version).
2. Check if a string is a palindrome, ignoring case and spaces.
3. Count vowels and consonants in a string separately.
4. Convert a sentence into "Title Case" (first letter of every word capitalized).
5. Find the first non-repeating character in a string.

## Arrays (10)

6. Find the second largest number in an array without sorting.
7. Remove duplicate values from an array.
8. Flatten a nested array (2+ levels deep).
9. Rotate an array to the left by `k` positions.
10. Find the intersection of two arrays (values present in both).
11. Find the difference between two arrays (values in the first but not the second).
12. Chunk an array into smaller arrays of a given size (e.g. size 3).
13. Find all pairs in an array that sum to a target value.
14. Sort an array of objects by two properties (primary + secondary sort key).
15. Merge two sorted arrays into one sorted array.

## Objects (10)

16. Merge two objects, with the second overriding the first on conflicting keys.
17. Deep clone an object using `structuredClone()`.
18. Count how many properties in an object have a numeric value.
19. Convert an object into an array of formatted `"key: value"` strings.
20. Given an array of objects, convert it into a single object keyed by `id`.
21. Given an object, invert its keys and values (values become keys, and vice versa).
22. Freeze an object and confirm attempted changes are blocked.
23. Given a nested object, safely access a deeply nested property using optional chaining.
24. Given two objects, write a function that checks if they have identical keys (not values).
25. Build a function that removes a specific property from an object without mutating
    the original (return a new object).

## Array Methods, Destructuring, Spread/Rest (10)

26. Use `.map()` + `.filter()` chained together to solve a two-step transformation problem.
27. Use `.reduce()` to build a grouped object from an array of objects.
28. Use `.some()`/`.every()` together to validate a form-like object with multiple fields.
29. Destructure a function's parameters directly, including a default value.
30. Destructure a nested array (an array containing another array) directly.
31. Use rest parameters to build a function accepting any number of arguments.
32. Use spread to combine 3+ arrays into one.
33. Use spread to shallow-copy an object, then explain (in a comment) why a nested
    property inside it would still be shared with the original.
34. Use `Object.entries()` combined with `.filter()` to keep only object properties
    with truthy values.
35. Use `.flatMap()` to solve a problem that needs both transforming and flattening.

## Data Transformation (5)

36. Given an array of orders (with nested items), calculate total revenue.
37. Group an array of employees by department and count each group's size.
38. Given a dataset of products, find the top 3 most expensive in-stock items.
39. Given a dataset of students, calculate each student's average and add a `passed`
    boolean field (average >= 40).
40. Build a full summary report (count, total, average, min, max) from any array of
    numeric records, as a single reusable function.

## Notes

- This is the biggest assessment so far — treat it as a genuine checkpoint. If certain
  sections feel much harder than others, that's useful signal for where to review before
  Module 4.
- No limit on revisiting: come back to any of these later (especially the Data
  Transformation section) once you've learned closures and `this` in Module 4 — you may
  find cleaner ways to solve them.

<!-- codingterminal-solution:start -->

# Day 047 — Solution: Module 3 Assessment

## Strings

```js
function reverse(text) {
  let result = "";
  for (let i = text.length - 1; i >= 0; i--) result += text[i];
  return result;
}
const palindrome = (text) => {
  const clean = text.toLowerCase().replaceAll(" ", "");
  return clean === reverse(clean);
};
function letterCounts(text) {
  return [...text.toLowerCase()].reduce(
    (result, c) => {
      if (/[a-z]/.test(c))
        result["aeiou".includes(c) ? "vowels" : "consonants"]++;
      return result;
    },
    { vowels: 0, consonants: 0 },
  );
}
const titleCase = (text) =>
  text
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
function firstUnique(text) {
  const counts = [...text].reduce((r, c) => {
    r[c] = (r[c] || 0) + 1;
    return r;
  }, {});
  return [...text].find((c) => counts[c] === 1);
}
```

## Arrays

```js
function secondLargest(values) {
  let first = -Infinity,
    second = -Infinity;
  for (const value of values) {
    if (value > first) [second, first] = [first, value];
    else if (value > second && value < first) second = value;
  }
  return second;
}
const unique = (values) => [...new Set(values)];
const flatten = (values) =>
  values.reduce(
    (result, value) =>
      result.concat(Array.isArray(value) ? flatten(value) : value),
    [],
  );
const rotateLeft = (values, k) => {
  const shift = k % values.length;
  return values.slice(shift).concat(values.slice(0, shift));
};
const intersection = (a, b) =>
  [...new Set(a)].filter((value) => b.includes(value));
const difference = (a, b) => a.filter((value) => !b.includes(value));
function chunk(values, size) {
  const result = [];
  for (let i = 0; i < values.length; i += size)
    result.push(values.slice(i, i + size));
  return result;
}
function pairs(values, target) {
  const result = [];
  for (let i = 0; i < values.length; i++)
    for (let j = i + 1; j < values.length; j++)
      if (values[i] + values[j] === target) result.push([values[i], values[j]]);
  return result;
}
const mergeSorted = (a, b) => [...a, ...b].sort((x, y) => x - y);
```

## Objects and modern syntax

```js
const merge = (a, b) => ({ ...a, ...b });
const clone = (object) => structuredClone(object);
const numericCount = (object) =>
  Object.values(object).filter((value) => typeof value === "number").length;
const formatted = (object) =>
  Object.entries(object).map(([key, value]) => `${key}: ${value}`);
const keyed = (items) =>
  Object.fromEntries(items.map((item) => [item.id, item]));
const invert = (object) =>
  Object.fromEntries(
    Object.entries(object).map(([key, value]) => [value, key]),
  );
const nestedCity = (user) => user.address?.city;
const sameKeys = (a, b) => {
  const first = Object.keys(a).sort();
  const second = Object.keys(b).sort();
  return JSON.stringify(first) === JSON.stringify(second);
};
const without = (object, property) => {
  const { [property]: removed, ...rest } = object;
  return rest;
};
const valid = (form) =>
  Object.values(form).every(Boolean) && Object.values(form).some(Boolean);
function sumAll(...numbers) {
  return numbers.reduce((sum, number) => sum + number, 0);
}
const all = [...[1], ...[2, 3], ...[4, 5]];
const truthy = (object) =>
  Object.fromEntries(
    Object.entries(object).filter(([, value]) => Boolean(value)),
  );
const flattenedTags = [{ tags: ["js"] }, { tags: ["web", "dom"] }].flatMap(
  (post) => post.tags,
);
```

## Data transformation

```js
const revenue = (orders) =>
  orders.reduce(
    (total, order) =>
      total +
      order.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    0,
  );
const departmentSizes = (employees) =>
  employees.reduce((groups, employee) => {
    groups[employee.department] = (groups[employee.department] || 0) + 1;
    return groups;
  }, {});
const topThree = (products) =>
  products
    .filter((product) => product.inStock)
    .sort((a, b) => b.price - a.price)
    .slice(0, 3);
const graded = (students) =>
  students.map((student) => {
    const average =
      Object.values(student.marks).reduce((a, b) => a + b, 0) /
      Object.keys(student.marks).length;
    return { ...student, average, passed: average >= 40 };
  });
function summary(numbers) {
  const result = numbers.reduce(
    (r, n) => ({
      count: r.count + 1,
      total: r.total + n,
      min: Math.min(r.min, n),
      max: Math.max(r.max, n),
    }),
    { count: 0, total: 0, min: Infinity, max: -Infinity },
  );
  return { ...result, average: result.count ? result.total / result.count : 0 };
}
```

**33.** `{ ...object }` copies only the outer object; a nested property still points to the same nested reference.

<!-- codingterminal-solution:end -->

