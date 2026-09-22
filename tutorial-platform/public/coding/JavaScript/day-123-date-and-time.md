# Day 123 — Date & Time APIs

## Basic

1. Create a `Date` from the current time and print its timestamp.
2. Create a date from a known ISO string.
3. Extract year, month, date, day, hour, minute, and second.
4. Compare two dates.
5. Calculate the difference between two dates in days.
6. Add a requested number of days to a date without mutating the original date.
7. Find the first and last day of a given month.
8. Determine whether a year is a leap year.
9. Format a date as `YYYY-MM-DD` without a date library.
10. Convert an ISO timestamp into a readable local date/time.

## Practical Problems

11. Build `isValidDateParts(year, month, day)` and reject invalid calendar dates.
12. Build a countdown that calculates remaining days, hours, minutes, and seconds.
13. Find a person's age from a birth date.
14. Calculate the number of business days between two dates.
15. Sort an array of objects by date without mutating the original array.
16. Group records by calendar date.
17. Find overlapping date ranges.
18. Check whether a date falls between two inclusive dates.
19. Build a simple meeting scheduler that rejects overlapping meetings.
20. Convert dates safely between ISO strings and timestamps.

## Interview-style Questions

21. Why is JavaScript's month index zero-based?
22. What is the difference between a timestamp and a formatted date string?
23. Why should ISO date strings be preferred for data interchange?
24. What problems can arise from local time zones and daylight-saving changes?
25. Why should date formatting be separated from date calculation?
26. When is `Intl.DateTimeFormat` preferable to manual formatting?

## Practice Checklist

Test leap years, month boundaries, daylight-saving transitions where applicable, invalid dates, UTC timestamps, and local-time display.
