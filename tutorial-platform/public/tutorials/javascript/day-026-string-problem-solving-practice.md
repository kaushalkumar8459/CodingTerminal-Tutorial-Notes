---
title: String Problem Solving Practice
slug: day-026-string-problem-solving-practice
dayLabel: Day 26
level: Beginner
estimatedMinutes: 25
order: 26
track: javascript
---

# Day 26 [Beginner]: String Problem Solving Practice

## Goal

Build strong string-handling skills through focused problem solving — reversing, checking palindromes, and counting characters — before moving into the Module 2 practical lab.

## Prerequisites

- Day 16–25 (loops, conditions, number problems)
- Basic string methods from earlier days (`length`, indexing)

## Explanation

Strings behave a lot like arrays of characters for looping purposes — you can access individual characters by index (`str[i]`), check their length (`str.length`), and loop through them with `for`, `while`, or `for...of`. Today's problems reinforce these fundamentals through classic string exercises that show up frequently in both practice problems and real applications (like search, validation, and text processing).

## Topic by Topic

### Topic 1: Reversing a string

Theory:
Reversing a string manually means building a new string by walking through the original from the last character to the first.

Code Example:

```js
function reverseString(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

console.log(reverseString("hello")); // "olleh"
```

**Explanation:** The loop starts at the last index (`str.length - 1`) and counts down to `0`, appending each character to `reversed` as it goes — building the string backwards.

**Key Points:**

- `str.length - 1` is the index of the last character (since indexing starts at 0).
- Building a new string character-by-character in reverse order is the manual approach — `.split("").reverse().join("")` is a shorter built-in alternative you'll use more once arrays are covered.
- Understanding the manual version helps you understand _why_ the shortcut works.

### Topic 2: Checking for palindromes

Theory:
A palindrome reads the same forwards and backwards. You can check this by comparing the string to its reversed version, or by comparing characters from both ends moving inward.

Code Example:

```js
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replaceAll(" ", "");
  const reversed = reverseString(cleaned); // reusing our function from Topic 1
  return cleaned === reversed;
}

console.log(isPalindrome("Was it a car or a cat")); // true (ignoring case/spaces)
```

**Explanation:** Cleaning the string first (lowercase, no spaces) means the comparison focuses only on the actual letters, matching how humans naturally judge palindromes.

**Key Points:**

- Always consider whether case and spaces should be ignored — this depends on the exact problem requirements.
- Reusing an existing function (`reverseString`) instead of rewriting logic is good practice.
- A more efficient version compares characters from both ends inward, without building a full reversed copy — worth trying as an extra challenge.

### Topic 3: Counting characters, vowels, and duplicates

Theory:
Looping through a string and tallying results in an object (or counters) is the standard pattern for any "count occurrences" problem.

Code Example:

```js
function countVowels(str) {
  let count = 0;
  const vowels = "aeiouAEIOU";
  for (const char of str) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
}

console.log(countVowels("Hello World")); // 3
```

**Explanation:** For each character in the string, we check whether it appears in a small string of vowels — if it does, we increment our counter.

**Key Points:**

- `.includes()` is a quick way to check membership in a small fixed set of characters.
- The same loop-and-count pattern works for consonants, specific letters, digits, or any other character category.
- This pattern generalizes directly to word-counting and duplicate-detection problems too.

### Topic 4: Finding duplicate characters

Theory:
To find duplicates, track which characters you've already seen as you loop, and flag any character that appears again.

Code Example:

```js
function findDuplicates(str) {
  const seen = {};
  const duplicates = [];

  for (const char of str) {
    seen[char] = (seen[char] || 0) + 1;
  }

  for (const char in seen) {
    if (seen[char] > 1) {
      duplicates.push(char);
    }
  }

  return duplicates;
}

console.log(findDuplicates("programming")); // ["r", "g", "m"]
```

**Explanation:** The first loop builds a tally of how many times each character appears (using `seen[char] || 0` to handle first-time characters safely); the second loop picks out only the characters that appeared more than once.

**Key Points:**

- Tracking counts in an object is the standard approach for "how many times does X appear" problems.
- `seen[char] || 0` safely handles the first occurrence of a character (falls back to `0` since `undefined` is falsy).
- This exact object-tallying pattern reappears constantly — in Module 3's array/object work and beyond.

## Recap

- String reversal and palindrome checks both rely on comparing/building from both ends.
- Counting vowels/characters uses a simple loop-and-tally pattern.
- Finding duplicates means tracking counts as you go, then filtering for counts greater than 1.

## What's Next

Practice for today: `public/coding/JavaScript/day-026-problem-solving-challenge.md` — 20 mixed problems, no hints. Day 27 wraps up Module 2 with the Student Result System project and a full assessment.
