---
title: Strings Fundamentals
slug: day-028-strings-fundamentals
dayLabel: Day 28
level: Beginner
estimatedMinutes: 25
order: 28
track: javascript
---

# Day 28 [Beginner]: Strings Fundamentals

## Goal

Understand how strings are created and stored, how to access individual characters, and how template literals make building dynamic text easier.

## Prerequisites

- Module 1–2 (variables, basic operators, loops)

## Explanation

A string is simply text — letters, numbers, symbols — wrapped in quotes (`'single'`, `"double"`, or `` `backtick` ``). Each character in a string has a position, called an **index**, starting at `0` for the first character. `string.length` tells you how many characters a string has.

**Template literals** (backtick strings) let you embed variables and expressions directly inside a string using `${...}`, without messy `+` concatenation. They also support multi-line text naturally. **Escape characters** (like `\n` for a new line, or `\"` for a literal quote) let you include special characters that would otherwise conflict with the string's own quotes.

## Topic by Topic

### Topic 1: Creating strings and indexing

Theory:
Strings can use single quotes, double quotes, or backticks — functionally similar, though backticks additionally support template literals.

Code Example:

```js
const greeting = "Hello, World!";
console.log(greeting[0]); // "H"
console.log(greeting[7]); // "W"
console.log(greeting.length); // 13
```

**Explanation:** `greeting[0]` accesses the first character (index 0); `.length` reports the total character count, including spaces and punctuation.

**Key Points:**

- Indexing starts at 0, not 1.
- `string.length` gives the total character count.
- Strings are immutable — you can't change a character in place (`greeting[0] = "J"` silently does nothing).

### Topic 2: Template literals

Theory:
Template literals use backticks and `${expression}` to embed values directly inside a string.

Code Example:

```js
const name = "Riya";
const age = 25;

const message = `My name is ${name} and I am ${age} years old.`;
console.log(message);
```

**Explanation:** Each `${...}` is evaluated and inserted directly into the string — much cleaner than `"My name is " + name + " and I am " + age + " years old."`.

**Key Points:**

- Template literals use backticks, not regular quotes.
- `${expression}` can hold any valid JavaScript expression, not just variables.
- Template literals also support real multi-line strings without extra syntax.

### Topic 3: Escape characters

Theory:
Escape characters use a backslash (`\`) to represent special characters inside a string — like a newline, tab, or a literal quote mark.

Code Example:

```js
console.log("Line one\nLine two"); // \n = new line
console.log('She said "Hello"'); // \" = literal double quote
console.log("Tab\tSeparated"); // \t = tab
```

**Explanation:** Without the backslash, `\"` inside a double-quoted string would end the string early — the escape tells JavaScript to treat it as a literal character instead.

**Key Points:**

- `\n` = new line, `\t` = tab, `\"`/`\'` = literal quote characters.
- Escape characters are needed when a string needs to contain its own quote type.
- Template literals reduce (but don't eliminate) the need for escaping quotes.

### Topic 4: String length and immutability in practice

Theory:
Since strings can't be changed in place, any "modification" actually creates and returns a brand new string.

Code Example:

```js
let word = "cat";
let upperWord = word.toUpperCase(); // creates a NEW string

console.log(word); // "cat" - unchanged
console.log(upperWord); // "CAT" - the new string
```

**Explanation:** `.toUpperCase()` doesn't change `word` — it returns a new string entirely, which we stored separately in `upperWord`.

**Key Points:**

- String methods never mutate the original string — they always return a new one.
- Always capture the result of a string method in a variable if you need to keep it.
- This immutability is an important mental model for tomorrow's string methods.

## Recap

- Strings are indexed starting at 0; `.length` gives the character count.
- Template literals (`` `${}` ``) embed values cleanly and support multi-line text.
- Escape characters (`\n`, `\"`, `\t`) represent special characters within a string.
- Strings are immutable — every "change" actually returns a new string.

## What's Next

Practice for today: `public/coding/JavaScript/day-028-string-methods.md`. Day 29 covers the first set of built-in string methods.
