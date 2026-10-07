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

<!-- codingterminal-solution:start -->

# Solution — Day 123: Date & Time APIs

## 1–3. Date basics
```js
const now = new Date();

console.log(now.getTime());
console.log(now.getFullYear());
console.log(now.getMonth());
console.log(now.getDate());
console.log(now.getDay());
console.log(now.getHours());
console.log(now.getMinutes());
console.log(now.getSeconds());
```

Remember: `getMonth()` is zero-based.

## 4. Compare dates
```js
const a = new Date("2026-01-01");
const b = new Date("2026-02-01");

console.log(a < b);
```

## 5. Difference in days
```js
function differenceInDays(a, b) {
  return Math.floor(Math.abs(new Date(b) - new Date(a)) / 86_400_000);
}
```

## 6. Add days without mutation
```js
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
```

## 7. First and last day of month
```js
function monthBounds(year, month) {
  return {
    first: new Date(year, month, 1),
    last: new Date(year, month + 1, 0)
  };
}
```

## 8. Leap year
```js
function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
```

## 9. YYYY-MM-DD
```js
function formatDate(date) {
  const d = new Date(date);
  const pad = value => String(value).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
```

## 10. Local formatting
```js
const formatted = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short"
}).format(new Date());
```

## 11. Validate date parts
```js
function isValidDateParts(year, month, day) {
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;
}
```

## 12. Countdown
Calculate the difference between the target timestamp and `Date.now()`, then derive days, hours, minutes, and seconds using division and modulo.

## 13. Age
Compare the current month/day with the birth month/day and subtract one year when the birthday has not occurred yet.

## 14. Business days
Iterate from the start date to the end date and count days whose `getDay()` is neither 0 nor 6.

## 15. Sort objects by date without mutating
```js
const sorted = [...records].sort(
  (a, b) => new Date(a.date) - new Date(b.date)
);
```

## 16. Group by calendar date
Normalize each timestamp to a date key such as `YYYY-MM-DD`, then group records by that key.

## 17–18. Ranges
Two ranges overlap when:
```
startA <= endB && startB <= endA
```

A date is inside an inclusive range when:
```
date >= start && date <= end
```

## 19. Meeting scheduler
Store existing ranges and reject a new meeting when it overlaps any existing range.

## 20. Interchange
Use ISO strings such as `2026-09-21T12:30:00.000Z` for transport and timestamps for numeric comparison.

## Interview Answers

21. Months are zero-based for historical API compatibility.
22. A timestamp is a numeric point in time; a formatted string is a human-readable representation.
23. ISO 8601 provides a consistent machine-readable representation.
24. Local offsets and daylight-saving transitions can change the displayed clock time.
25. Keeping calculation separate from formatting reduces timezone and presentation bugs.
26. `Intl.DateTimeFormat` handles locale-aware formatting without manually maintaining locale rules.

<!-- codingterminal-solution:end -->

