# Day 008 — Solution: Ternary & Switch

Reference solutions for `day-008-ternary-and-switch.md`. Try the practice file
yourself first before checking these.

## Basic

**1. Even or odd with a ternary**

```js
const n = 7;
console.log(n % 2 === 0 ? "even" : "odd"); // "odd"
```

**2. Adult or Minor**

```js
const age = 16;
console.log(age >= 18 ? "Adult" : "Minor"); // "Minor"
```

**3. Larger of two numbers**

```js
function larger(a, b) {
  return a > b ? a : b;
}

console.log(larger(4, 9)); // 9
```

**4. Rewrite an `if/else` as a ternary**

```js
// if/else version (from Day 7):
// function describeNumber(n) { if (n > 0) return "positive"; return "not positive"; }

// ternary version:
function describeNumber(n) {
  return n > 0 ? "positive" : "not positive";
}

console.log(describeNumber(-2)); // "not positive"
```

**5. Day name from number using `switch`**

```js
function getDayName(dayNumber) {
  switch (dayNumber) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 7:
      return "Sunday";
    default:
      return "Invalid day";
  }
}

console.log(getDayName(3)); // "Wednesday"
```

**6. Month name from number**

```js
function getMonthName(monthNumber) {
  switch (monthNumber) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
    default:
      return "Invalid month";
  }
}

console.log(getMonthName(9)); // "September"
```

**7. `switch` with a `default` case**

```js
console.log(getDayName(99)); // "Invalid day" — handled by default
```

**8. Login status with `switch`**

```js
function describeLoginStatus(status) {
  switch (status) {
    case "active":
      return "Account is active";
    case "banned":
      return "Account is banned";
    case "pending":
      return "Account is pending approval";
    default:
      return "Unknown status";
  }
}

console.log(describeLoginStatus("banned")); // "Account is banned"
```

**9. Pass/Fail with a ternary**

```js
const marks = 55;
console.log(marks >= 40 ? "Pass" : "Fail"); // "Pass"
```

**10. Traffic light with `switch`**

```js
function describeLight(color) {
  switch (color) {
    case "red":
      return "Stop";
    case "yellow":
      return "Slow down";
    case "green":
      return "Go";
    default:
      return "Unknown signal";
  }
}

console.log(describeLight("green")); // "Go"
```

## Concept

**11. Nested ternary for negative/zero/positive**

```js
function categorize(n) {
  return n < 0 ? "negative" : n === 0 ? "zero" : "positive";
}

console.log(categorize(-4)); // "negative"
console.log(categorize(0)); // "zero"
```

**12. `switch` with fall-through for weekend days**

```js
function getDayType(dayNumber) {
  switch (dayNumber) {
    case 6:
    case 7:
      return "Weekend";
    default:
      return "Weekday";
  }
}

console.log(getDayType(6)); // "Weekend"
console.log(getDayType(2)); // "Weekday"
```

**13. Calculator with `switch`**

```js
function calculate(a, b, operator) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? "Cannot divide by zero" : a / b;
    default:
      return "Unknown operator";
  }
}

console.log(calculate(10, 5, "*")); // 50
```

**14. `if/else if` vs `switch` — comparison**

Both work for the day-name/month-name examples above. `switch` tends to read more
cleanly when checking ONE variable against many EXACT values (like day numbers).
`if/else if` reads more naturally for range checks (`>= 90`, `>= 75`) or when
combining multiple different variables — `switch` can't express ranges directly.

**15. Ternary inside a template literal**

```js
const stock = 0;
console.log(`Status: ${stock > 0 ? "In Stock" : "Out of Stock"}`);
// "Status: Out of Stock"
```

**16. Role to permission level with `switch`**

```js
function getPermissionLevel(role) {
  switch (role) {
    case "admin":
      return "full";
    case "manager":
      return "limited";
    case "user":
      return "read-only";
    default:
      return "none";
  }
}

console.log(getPermissionLevel("manager")); // "limited"
```

**17. Ternary + logical operators together**

```js
const isMember = true;
const hasCoupon = false;
console.log(isMember && hasCoupon ? "Discount applied" : "No discount");
// "No discount"
```

**18. Season with `switch`**

```js
function getSeason(month) {
  switch (month) {
    case 12:
    case 1:
    case 2:
      return "Winter";
    case 3:
    case 4:
    case 5:
      return "Spring";
    case 6:
    case 7:
    case 8:
      return "Summer";
    default:
      return "Autumn";
  }
}

console.log(getSeason(1)); // "Winter"
```

**19. Why forgetting `break` causes fall-through bugs**

```js
// Without break, execution "falls through" into the NEXT case's code too,
// even if that next case's value doesn't actually match — this silently runs
// unintended code, one of the most common switch-statement bugs.
```

**20. Traffic light rebuilt with `switch` (same as #10)**

```js
console.log(describeLight("red")); // "Stop"
```

## Interview-style questions

**21. When to prefer `switch` over `if/else if`**

Prefer `switch` when checking ONE variable against many specific, exact values (like
a status string or a day number) — it reads cleanly and groups related cases (like
weekend days) naturally with fall-through.

**22. Forgetting `break`**

Execution continues ("falls through") into the next `case`'s code, running it too,
regardless of whether that next case's value actually matches — usually an
unintentional bug.

**23. Can ternary fully replace `if/else`?**

Only for simple cases that produce ONE value. It starts hurting readability once you
nest more than one ternary, or when each branch needs to run multiple statements
instead of just producing a value — at that point, `if/else` is clearer.

## Challenge

**24. Menu-driven calculator**

```js
function menuCalculator(operatorSymbol, a, b) {
  switch (operatorSymbol) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? "Error: division by zero" : a / b;
    default:
      return "Error: unknown operator";
  }
}

console.log(menuCalculator("+", 10, 5)); // 15
console.log(menuCalculator("/", 10, 0)); // "Error: division by zero"
console.log(menuCalculator("%", 10, 5)); // "Error: unknown operator"
```
