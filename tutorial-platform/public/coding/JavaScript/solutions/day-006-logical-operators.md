# Day 006 — Solution: Logical Operators

Reference solutions for `day-006-logical-operators.md`. Try the practice file
yourself first before checking these.

## Basic

**1. `&&` for a range check**

```js
const n = 42;
console.log(n > 0 && n < 100); // true
```

**2. `||` to check for one of two values**

```js
function isAdminOrOwner(role) {
  return role === "admin" || role === "owner";
}

console.log(isAdminOrOwner("owner")); // true
console.log(isAdminOrOwner("guest")); // false
```

**3. Flip a boolean with `!`**

```js
const isActive = true;
console.log(!isActive); // false
```

**4. Combine `&&` and `||`**

```js
const age = 20;
const hasPermission = true;
console.log((age >= 18 && hasPermission) || age >= 65); // true
```

**5. Username validation**

```js
function isValidUsername(username) {
  return username.length > 0 && username.length >= 3;
}

console.log(isValidUsername("ab")); // false
console.log(isValidUsername("abc")); // true
```

**6. Logged in OR guest**

```js
function canBrowse(isLoggedIn, isGuest) {
  return isLoggedIn || isGuest;
}

console.log(canBrowse(false, true)); // true
```

**7. `||` for a default value**

```js
function getCartTotal(total) {
  return total || "No total set";
}

console.log(getCartTotal(0)); // "No total set" — note: 0 is falsy here, worth knowing!
console.log(getCartTotal(150)); // 150
```

**8. `&&` to conditionally run code**

```js
function logIfPositive(value) {
  value > 0 && console.log("Value is positive:", value);
}

logIfPositive(5); // logs
logIfPositive(-5); // does nothing
```

**9. Exactly one of two booleans is true (XOR-style)**

```js
function exactlyOneTrue(a, b) {
  return (a || b) && !(a && b);
}

console.log(exactlyOneTrue(true, false)); // true
console.log(exactlyOneTrue(true, true)); // false
```

**10. `&&`, `||`, `!` results**

```js
console.log(true && false); // false
console.log(true || false); // true
console.log(!true); // false
```

## Concept

**11. Login validator**

```js
function isValidLogin(username, password) {
  return Boolean(username) && Boolean(password);
}

console.log(isValidLogin("asha", "secret")); // true
console.log(isValidLogin("", "secret")); // false
```

**12. Age AND country eligibility**

```js
function isEligible(age, country) {
  return age >= 18 && country === "India";
}

console.log(isEligible(20, "India")); // true
console.log(isEligible(20, "USA")); // false
```

**13. Three-condition eligibility**

```js
function isFullyEligible(age, country, isVerified) {
  return age >= 18 && country === "India" && isVerified;
}

console.log(isFullyEligible(20, "India", true)); // true
```

**14. Admin permission checker**

```js
function hasAdminAccess(role, isActive) {
  return role === "admin" && isActive;
}

console.log(hasAdminAccess("admin", true)); // true
console.log(hasAdminAccess("admin", false)); // false
```

**15. Product availability**

```js
function isAvailable(quantity, isDiscontinued) {
  return quantity > 0 && !isDiscontinued;
}

console.log(isAvailable(5, false)); // true
console.log(isAvailable(5, true)); // false
```

**16. Default cart total with `||`**

```js
function displayTotal(total) {
  return total || 0;
}

console.log(displayTotal(undefined)); // 0
console.log(displayTotal(250)); // 250
```

**17. `canVote(age, isCitizen)`**

```js
function canVote(age, isCitizen) {
  return age >= 18 && isCitizen;
}

console.log(canVote(20, true)); // true
console.log(canVote(20, false)); // false
```

**18. `hasDiscount(isMember, cartTotal)`**

```js
function hasDiscount(isMember, cartTotal) {
  return isMember || cartTotal > 1000;
}

console.log(hasDiscount(false, 1200)); // true
console.log(hasDiscount(false, 500)); // false
```

**19. Why `a && b` returns `b`**

```js
console.log("Ravi" && "logged in"); // "logged in" — "Ravi" is truthy, so && evaluates
// and returns the SECOND operand, not just true/false.
console.log("" && "logged in"); // "" — the first operand is falsy, so && short-circuits
// and returns it immediately without even looking at the second.
```

**20. Why `a || b` returns `a` when truthy**

```js
console.log("Ravi" || "Guest"); // "Ravi" — the first operand is already truthy, so
// || returns it immediately without evaluating the second at all.
console.log("" || "Guest"); // "Guest" — the first operand is falsy, so || falls through
// to the second operand.
```

## Interview-style questions

**21. Short-circuit evaluation**

Short-circuiting means JavaScript stops evaluating a logical expression as soon as the
final result is already certain. `&&` stops at the first falsy value; `||` stops at
the first truthy value. It's useful for providing defaults (`value || fallback`) and
for conditionally running code without a full `if` statement (`condition && doWork()`).

**22. What `&&` returns**

If the first operand is falsy, `&&` returns that first operand immediately (never
checks the second). If the first operand is truthy, `&&` evaluates and returns the
SECOND operand.

**23. What `||` returns**

If the first operand is truthy, `||` returns that first operand immediately. If it's
falsy, `||` evaluates and returns the second operand.

## Challenge

**24. Permission checker**

```js
function getAccessLevel(role) {
  switch (role) {
    case "admin":
      return "full access";
    case "manager":
      return "limited access";
    case "user":
      return "read only";
    default:
      return "no access";
  }
}

console.log(getAccessLevel("admin")); // "full access"
console.log(getAccessLevel("manager")); // "limited access"
console.log(getAccessLevel("user")); // "read only"
console.log(getAccessLevel("guest")); // "no access"
```
