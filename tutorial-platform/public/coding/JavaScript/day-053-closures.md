# Day 053 — Closures (Counter, Private Variable, Login Tracker, Bank Account, once)

Matches Tutorial Day 53 (Default Parameters and Modern Syntax) — practice moves into
closures here, ahead of Tutorial Day 57's deep dive. Take your time; this is one of the
most important JavaScript concepts. No limit on how many you build.

## What's a closure? (quick preview before Day 57)

A closure happens when an inner function "remembers" variables from the outer function
it was created in, even after the outer function has finished running. You'll build a
solid intuition for this through the projects below before the full explanation on Day 57.

## Build these

1. **Counter** — write a function `createCounter()` that returns a function which
   increases and returns a count each time it's called, starting from 0. Each separate
   call to `createCounter()` should produce its own independent counter.
2. **Private variable** — write a function `createSecretHolder(secret)` that returns an
   object with a `reveal()` method returning the secret, but with no direct way to
   access the secret variable itself from outside.
3. **Login tracker** — write a function `createLoginTracker(maxAttempts)` that returns a
   function that tracks failed login attempts and reports how many attempts remain each
   time it's called.
4. **Bank account** — write a function `createBankAccount(initialBalance)` that returns
   an object with `deposit(amount)`, `withdraw(amount)`, and `getBalance()` methods, where
   the actual balance variable can't be accessed directly from outside.
5. **`once()`** — write a function `once(fn)` that returns a new function which only
   ever calls `fn` on its FIRST invocation; every call after that does nothing (or
   returns the first result again).

## Concept

6. Create two separate counters using your `createCounter()` and confirm they don't
   interfere with each other's count.
7. Add a `reset()` method to your bank account object that resets the balance back to
   the initial value.
8. Modify your login tracker so it "locks" permanently after too many failed attempts,
   even if called again later.
9. Test `once()` by wrapping a function that has an obvious side effect (like
   `console.log`) and confirming it only actually runs the first time.

## Interview-style questions

10. Based on what you built today, what do you think a closure actually IS, in your own words?
11. Why does each call to `createCounter()` produce an independent counter, instead of
    all counters sharing the same count?
12. Why can't code outside `createBankAccount()` access the balance variable directly?

## Notes

- Don't worry if this feels a little "magical" right now — that's completely normal.
  Day 57's tutorial will explain precisely why this works, using what you already know
  about scope (Day 48) and lexical scope specifically.
- These five patterns (counter, private variable, tracker, bank account, once) are the
  classic closure exercises — you'll likely see very similar ones in real interviews.
