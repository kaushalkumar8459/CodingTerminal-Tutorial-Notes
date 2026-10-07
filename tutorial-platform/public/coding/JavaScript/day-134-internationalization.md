# Day 134 — JavaScript Internationalization

## Intl.NumberFormat

1. Format currency for different locales.
2. Format percentages.
3. Format compact numbers such as thousands and millions.
4. Control minimum and maximum fraction digits.

## Intl.DateTimeFormat

5. Format dates according to locale.
6. Format date and time separately.
7. Handle time-zone-aware display.
8. Avoid assuming that one date format works globally.

## Intl.Collator

9. Compare strings according to locale.
10. Sort localized text correctly.
11. Compare case and accent sensitivity options.

## Intl.RelativeTimeFormat

12. Display values such as yesterday, today, tomorrow, and relative time units.
13. Choose numeric vs natural relative wording.

## Practical Design

14. Avoid hard-coded currency symbols.
15. Keep locale and time-zone configuration explicit.
16. Separate storage format from display format.
17. Test formatting for multiple locales.

## Interview Questions

18. Why use Intl APIs instead of manual formatting?
19. NumberFormat vs DateTimeFormat?
20. Why should date display consider time zones?
21. What problem does Collator solve?
22. How would you design locale-aware formatting in a frontend application?

## Practice Checklist

Build a small locale-aware dashboard showing currency, dates, percentages, sorted names, and relative timestamps for at least two locales.

<!-- codingterminal-solution:start -->

# Day 134 Solutions — JavaScript Internationalization

## 1. Currency

```js
const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR"
});

console.log(formatter.format(150000));
```

## 2. Date and time

```js
const formatter = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata"
});

console.log(formatter.format(new Date()));
```

## 3. Locale-aware sorting

```js
const names = ["Émile", "Alice", "Álvaro"];

names.sort(new Intl.Collator("en").compare);
```

## 4. Relative time

```js
const relative = new Intl.RelativeTimeFormat("en", {
  numeric: "auto"
});

console.log(relative.format(-1, "day"));
```

## Interview Takeaway

Store canonical values such as timestamps and numeric amounts; format them only at the presentation boundary using the user's locale and required time zone.

<!-- codingterminal-solution:end -->

