---
title: Module 2 Practical Lab - Student Result System
slug: day-027-module-2-practical-lab
dayLabel: Day 27
level: Beginner
estimatedMinutes: 40
order: 27
track: javascript
---

# Day 27 [Beginner]: Module 2 Practical Lab — Student Result System

## Goal

Apply everything from Module 2 — conditions, `switch`, all loop types, `break`/`continue`, `for...of`/`for...in` — in one combined project, then revise before moving to Module 3.

## Prerequisites

- Day 16–26 (all of Module 2)

## Explanation

Module 2 covered decision-making (`if`, `switch`, ternary) and repetition (`for`, `while`, `do...while`, `break`/`continue`, `for...of`, `for...in`) in depth, alongside a lot of number/string/pattern problem solving. Today's mini project — a **Student Result System** — pulls all of it together into one realistic program.

The system takes marks for several subjects, calculates totals and averages (loops), determines pass/fail per subject and overall grade (conditions), and prints a clean, readable summary (string building).

## Topic by Topic

### Topic 1: Project overview — Student Result System

Theory:
Given a student's name and their marks in multiple subjects, calculate the total, average, per-subject pass/fail status, and an overall grade.

Code Example:

```js
const student = {
  name: "Kavya",
  marks: { math: 88, science: 76, english: 65, history: 54, computer: 92 },
};
```

**Explanation:** This is the starting data structure — an object holding the student's name and a nested object of subject-to-marks pairs, perfect for practicing `for...in`.

**Key Points:**

- Start by defining a clear, simple data structure before writing any logic.
- Plan the required outputs first: total, average, pass/fail per subject, final grade.
- Build the program in small, testable steps, just like the Day 15 project.

### Topic 2: Calculating totals, averages, and pass/fail

Theory:
Loop through each subject's marks using `for...in`, accumulating a total, and checking each subject against a passing threshold (e.g. 40) using `if`.

Code Example:

```js
function calculateResult(student) {
  let total = 0;
  let subjectCount = 0;
  const failedSubjects = [];

  for (const subject in student.marks) {
    const mark = student.marks[subject];
    total += mark;
    subjectCount++;

    if (mark < 40) {
      failedSubjects.push(subject);
    }
  }

  const average = total / subjectCount;
  return { total, average, failedSubjects };
}
```

**Explanation:** `for...in` walks through every subject, adding to `total` and checking the passing threshold; `failedSubjects` collects any subject below the cutoff for later reporting.

**Key Points:**

- `for...in` is the natural fit here since we're iterating over an object's properties.
- Accumulating (`total += mark`) is the same pattern used throughout Module 2's number problems.
- Collecting failures in an array lets you report all of them at once, not just the first.

### Topic 3: Determining the overall grade with `switch` or `if/else if`

Theory:
Once you have the average, map it to a grade using either a `switch` (on a grade-range helper) or an `if/else if` chain — a direct application of Day 16–18's decision-making.

Code Example:

```js
function getGrade(average) {
  if (average >= 90) return "A";
  else if (average >= 75) return "B";
  else if (average >= 60) return "C";
  else if (average >= 40) return "D";
  else return "F";
}
```

**Explanation:** This reuses the exact range-based `if/else if` pattern from Day 16 — grade calculation is a textbook example of when `if/else if` beats `switch` (since we're checking ranges, not exact values).

**Key Points:**

- Range-based grading fits `if/else if`, not `switch` (a good real-world reminder of Day 17's lesson).
- A student can only have one grade, so once a condition matches, we return immediately.
- Consider: should a student with any failed subjects automatically get an "F" overall, regardless of average? Decide and implement your own rule.

### Topic 4: Printing a clean summary report

Theory:
Bringing everything together into one readable printed report ties in string building and template literals from earlier practice.

Code Example:

```js
function printReport(student) {
  const { total, average, failedSubjects } = calculateResult(student);
  const grade = getGrade(average);

  console.log(`Result for ${student.name}`);
  console.log(`Total Marks: ${total}`);
  console.log(`Average: ${average.toFixed(2)}`);
  console.log(`Grade: ${grade}`);
  console.log(
    failedSubjects.length > 0
      ? `Failed Subjects: ${failedSubjects.join(", ")}`
      : "No failed subjects - great job!",
  );
}
```

**Explanation:** This function combines everything: it calls our two helper functions, then prints a clean, human-readable report using template literals and a ternary for the failed-subjects line.

**Key Points:**

- Breaking work into small functions (`calculateResult`, `getGrade`, `printReport`) keeps each piece focused and testable.
- `.toFixed(2)` formats a decimal average to 2 places for cleaner output.
- Combining a ternary with `.join(", ")` produces a nicely formatted final message.

## Recap

- The Student Result System combines `for...in`, accumulator patterns, range-based conditions, and string building.
- Breaking a project into small, focused functions makes it easier to build and debug.
- This project is a strong checkpoint for confirming Module 2's core skills are solid.

## What's Next

Practice for today: `public/coding/JavaScript/day-027-module-2-assessment.md` — a 30-problem coding test covering all of Module 2. Day 28 begins Module 3 with strings in depth.
