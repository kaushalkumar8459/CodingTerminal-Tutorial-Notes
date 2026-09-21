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
