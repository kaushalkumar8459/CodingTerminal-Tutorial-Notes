---
title: Internationalization with Intl
slug: day-108-internationalization
dayLabel: Day 108
level: Advanced
estimatedMinutes: 25
order: 108
track: javascript
---

# Day 108 [Advanced]: Internationalization with `Intl`

## Goal

Learn the built-in `Intl` object for formatting numbers, currency, and dates according to different locales — essential for building applications used by people in different regions.

## Prerequisites

- Day 31 (numbers/Math), Day 90 (working with real API data)

## Explanation

**Internationalization** (often abbreviated "i18n") means designing your application to work correctly for users from different regions, languages, and cultural conventions — including how numbers, currency, and dates are formatted. JavaScript's built-in `Intl` object provides reliable, locale-aware formatting for exactly these cases, without needing manual string manipulation or external libraries for basic needs.

## Topic by Topic

### Topic 1: Number formatting with `Intl.NumberFormat`

Theory:
`new Intl.NumberFormat(locale, options).format(number)` formats a number according to the conventions of a specific locale (like thousand separators, decimal points).

Code Example:

```js
const number = 1234567.891;

console.log(new Intl.NumberFormat("en-US").format(number)); // "1,234,567.891"
console.log(new Intl.NumberFormat("de-DE").format(number)); // "1.234.567,891" (different separators!)
console.log(new Intl.NumberFormat("en-IN").format(number)); // "12,34,567.891" (Indian numbering system)
```

**Explanation:** The SAME number formats completely differently depending on locale — US uses commas for thousands and a period for decimals, German locale swaps them, and Indian locale groups digits differently entirely.

**Key Points:**

- `Intl.NumberFormat` handles locale-specific number formatting automatically, correctly.
- Manually trying to replicate this with string manipulation is genuinely difficult and error-prone.
- Always pass an appropriate locale string (like `"en-US"`, `"en-IN"`, `"de-DE"`) matching your target audience.

### Topic 2: Currency formatting

Theory:
`Intl.NumberFormat` also handles currency formatting directly, given a `style: "currency"` option and a currency code.

Code Example:

```js
const price = 2500;

console.log(
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    price,
  ),
); // "$2,500.00"

console.log(
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    price,
  ),
); // "₹2,500.00"
```

**Explanation:** Specifying `style: "currency"` plus a `currency` code (like `"USD"`, `"INR"`, `"EUR"`) automatically formats the number with the correct currency symbol, placement, and separator conventions for that locale.

**Key Points:**

- `{ style: "currency", currency: "CODE" }` handles currency symbol AND formatting together.
- This is far more reliable than manually prepending a `$` or `₹` symbol yourself.
- Currency codes follow the standard ISO 4217 format (`USD`, `INR`, `EUR`, `GBP`, etc.).

### Topic 3: Date formatting with `Intl.DateTimeFormat`

Theory:
`Intl.DateTimeFormat(locale, options)` formats `Date` objects according to locale-specific date/time conventions.

Code Example:

```js
const date = new Date(2026, 0, 15); // January 15, 2026

console.log(new Intl.DateTimeFormat("en-US").format(date)); // "1/15/2026"
console.log(new Intl.DateTimeFormat("en-GB").format(date)); // "15/01/2026" (day/month swapped!)

console.log(
  new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(date),
); // "Thursday, January 15, 2026"
```

**Explanation:** US and British English format the SAME date differently (month/day order swapped) — `Intl.DateTimeFormat` handles this correctly automatically, and `dateStyle`/`timeStyle` options let you control the level of detail shown.

**Key Points:**

- Date formatting conventions (especially month/day order) vary significantly even between similar locales.
- `dateStyle`/`timeStyle` options (`"full"`, `"long"`, `"medium"`, `"short"`) control output detail.
- Never manually build date strings with string concatenation — always prefer `Intl.DateTimeFormat` for correctness.

### Topic 4: Why `Intl` matters for real applications

Theory:
Any application with users from multiple regions benefits from `Intl` — showing dates/currency in a format users don't recognize creates confusion and a poor experience.

Practical:
When building a real dashboard or e-commerce feature (like the Day 90 dashboard or Day 110 capstone), use `Intl.NumberFormat`/`Intl.DateTimeFormat` for ANY displayed price or date, rather than manual formatting — it's more correct, more maintainable, and handles locale differences you might not even think to consider.

**Key Points:**

- `Intl` handles genuine regional formatting differences correctly, which manual code often gets wrong.
- This is a built-in, no-dependency solution — no external library needed for these common needs.
- Apply this directly to your remaining course projects wherever prices or dates are displayed.

## Recap

- `Intl.NumberFormat` handles locale-aware number and currency formatting correctly.
- `Intl.DateTimeFormat` handles locale-aware date/time formatting, including differing conventions like month/day order.
- Using `Intl` for any displayed price/date is more correct and maintainable than manual string formatting.

## What's Next

Practice for today: `public/coding/JavaScript/day-108-memory-and-performance.md`. Day 109 covers professional JavaScript patterns and clean code practices.
