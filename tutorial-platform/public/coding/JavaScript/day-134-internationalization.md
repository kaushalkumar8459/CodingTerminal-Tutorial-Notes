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
