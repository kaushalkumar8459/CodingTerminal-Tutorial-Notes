# Day 017 — while & do...while

Matches Tutorial Day 17 (The `switch` Statement) — practice covers `while`/`do...while`
here, ahead of Tutorial Day 20. No limit on how many you solve.

## Basic

1. Print numbers 1 to 10 using a `while` loop.
2. Print a countdown from 10 to 1 using a `while` loop.
3. Use a `do...while` loop to print a value at least once, even if the condition starts false.
4. Sum numbers from 1 to 50 using a `while` loop.
5. Count how many digits a number has using a `while` loop.

## Concept

6. Reverse a number using a `while` loop (e.g. 123 → 321).
7. Simulate a "password retry" system: keep asking (looping) until a hardcoded correct
   value is "entered" (simulate input with a fixed array of attempts), max 3 tries.
8. Simulate a simple "number guessing" loop: loop through a list of guesses and stop as
   soon as the correct number is found.
9. Use a `do...while` loop to guarantee a menu prints at least once before checking an exit condition.
10. Write a `while` loop that keeps doubling a number until it exceeds 1000, printing each step.

## Interview-style questions

11. What is the key difference between `while` and `do...while`?
12. Why must a `while` loop's condition eventually become false, and what happens if it doesn't?
13. Give a real example where `do...while` is genuinely more appropriate than `while`.

## Notes

- Always trace through your `while` loop's condition on paper (or in comments) before
  running it — infinite loops are the most common bug here.
- `do...while` is used far less often than `while`/`for`, but it's the right tool
  whenever you need the loop body to run at least once no matter what.

<!-- codingterminal-solution:start -->

# Day 017 — Solution: while & do...while

Reference solutions for `day-017-while-and-do-while.md`. Try the practice file
yourself first before checking these.

## Basic

**1. Print 1 to 10 with `while`**

```js
let i = 1;
while (i <= 10) {
  console.log(i);
  i++;
}
```

**2. Countdown from 10 to 1**

```js
let count = 10;
while (count >= 1) {
  console.log(count);
  count--;
}
```

**3. `do...while` runs at least once**

```js
let x = 100; // condition below is already false
do {
  console.log("This still runs once:", x);
} while (x < 10);
```

**4. Sum 1 to 50 with `while`**

```js
let sum = 0;
let n = 1;
while (n <= 50) {
  sum += n;
  n++;
}
console.log(sum); // 1275
```

**5. Count digits with `while`**

```js
function countDigits(n) {
  let count = 0;
  let num = Math.abs(n);
  if (num === 0) return 1;
  while (num > 0) {
    count++;
    num = Math.floor(num / 10);
  }
  return count;
}

console.log(countDigits(45678)); // 5
```

## Concept

**6. Reverse a number with `while`**

```js
function reverseNumber(n) {
  let reversed = 0;
  let num = n;
  while (num > 0) {
    reversed = reversed * 10 + (num % 10);
    num = Math.floor(num / 10);
  }
  return reversed;
}

console.log(reverseNumber(123)); // 321
```

**7. Password retry simulation**

```js
function simulateLogin(attempts, correctPassword) {
  let tries = 0;
  while (tries < attempts.length) {
    if (attempts[tries] === correctPassword) {
      return `Success on attempt ${tries + 1}`;
    }
    tries++;
    if (tries >= 3) break; // max 3 tries
  }
  return "Failed - too many attempts";
}

console.log(simulateLogin(["wrong1", "wrong2", "secret"], "secret"));
```

**8. Number guessing simulation**

```js
function simulateGuessing(guesses, target) {
  let i = 0;
  while (i < guesses.length) {
    if (guesses[i] === target) {
      return `Found ${target} on guess ${i + 1}`;
    }
    i++;
  }
  return "Not found";
}

console.log(simulateGuessing([3, 7, 12, 9], 12)); // "Found 12 on guess 3"
```

**9. `do...while` menu (runs at least once)**

```js
let shouldExit = false;
do {
  console.log("Menu: 1) Continue  2) Exit");
  shouldExit = true; // simulate the user choosing to exit
} while (!shouldExit);
```

**10. Doubling until it exceeds 1000**

```js
let value = 1;
while (value <= 1000) {
  console.log(value);
  value *= 2;
}
```

## Interview-style questions

**11. `while` vs `do...while`**

`while` checks its condition BEFORE running the body — if false immediately, the body
never runs. `do...while` runs the body FIRST, then checks the condition — guaranteeing
at least one execution no matter what.

**12. Why the condition must eventually become false**

If nothing inside the loop ever changes the value the condition depends on, the
condition stays true forever, and the loop runs forever — an infinite loop, freezing
the program.

**13. Real example where `do...while` is more appropriate**

Showing a menu and asking "do you want to continue?" — the menu must be shown at
least ONCE before you can even ask the question, which is exactly what `do...while`
guarantees.

<!-- codingterminal-solution:end -->

