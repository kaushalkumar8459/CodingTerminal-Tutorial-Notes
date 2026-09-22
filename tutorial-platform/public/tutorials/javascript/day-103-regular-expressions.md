---
title: Regular Expressions
slug: day-103-regular-expressions
dayLabel: Day 103
level: Advanced
estimatedMinutes: 30
order: 103
track: javascript
---

# Day 103 [Advanced]: Regular Expressions

## Goal

Learn regular expressions (regex) fundamentals — patterns, character classes, quantifiers, and groups — for real validation and search/replace tasks.

## Prerequisites

- Day 29–30 (string methods, replace/replaceAll)

## Explanation

A **regular expression** (regex) is a pattern used to match, search, or replace text based on RULES, rather than an exact string. Instead of checking `email.includes("@")` (a very loose check from Day 3), regex lets you precisely describe "what a valid email should look like" as a pattern. Regex is written between forward slashes (`/pattern/flags`) and used with string methods like `.test()`, `.match()`, `.replace()`.

## Topic by Topic

### Topic 1: Basic regex syntax and character classes

Theory:
A regex pattern matches specific characters directly, or uses **character classes** (like `\d` for any digit, `\w` for any word character, `.` for any character) to match categories of characters.

Code Example:

```js
const hasDigit = /\d/; // matches ANY single digit
console.log(hasDigit.test("abc123")); // true - contains at least one digit
console.log(hasDigit.test("abcdef")); // false - no digits at all

const pattern = /cat/;
console.log(pattern.test("I have a cat")); // true - literal match
```

**Explanation:** `\d` is a character class matching any digit (0-9); `.test(string)` returns `true`/`false` for whether the pattern is found ANYWHERE in the string.

**Key Points:**

- `\d` = any digit, `\w` = any word character (letters/digits/underscore), `\s` = any whitespace, `.` = any character.
- `.test(string)` checks if a pattern matches anywhere in a string, returning a boolean.
- Regex is case-sensitive by default (fix with the `i` flag, covered shortly).

### Topic 2: Quantifiers — how many times

Theory:
Quantifiers control how many times a character/group should repeat: `*` (0 or more), `+` (1 or more), `?` (0 or 1), `{n}` (exactly n), `{n,m}` (between n and m).

Code Example:

```js
const phonePattern = /^\d{10}$/; // exactly 10 digits, nothing else
console.log(phonePattern.test("9876543210")); // true
console.log(phonePattern.test("98765")); // false - too short

const optionalS = /colou?r/; // "u" is optional - matches "color" OR "colour"
console.log(optionalS.test("color")); // true
console.log(optionalS.test("colour")); // true
```

**Explanation:** `\d{10}` means "exactly 10 digits"; `^` and `$` anchor the match to the very START and END of the string, ensuring NOTHING else surrounds those 10 digits.

**Key Points:**

- `*` = 0+, `+` = 1+, `?` = 0 or 1, `{n}` = exactly n, `{n,m}` = between n and m.
- `^` anchors to the start of the string; `$` anchors to the end.
- Without `^`/`$`, a pattern can match anywhere WITHIN a larger string, not just the whole thing.

### Topic 3: Groups and alternation

Theory:
Parentheses `( )` create a **group**, useful for applying quantifiers to multiple characters together, or capturing part of a match. The pipe `|` means "or" (alternation).

Code Example:

```js
const repeatedPattern = /(ab)+/; // "ab" repeated one or more times
console.log(repeatedPattern.test("ababab")); // true

const colorPattern = /red|green|blue/; // matches ANY of these three words
console.log(colorPattern.test("my favorite color is blue")); // true
```

**Explanation:** `(ab)+` groups "ab" together so the `+` quantifier applies to the WHOLE group, not just the last character; `red|green|blue` matches if ANY of the three alternatives appears.

**Key Points:**

- `( )` groups characters together, so quantifiers can apply to the whole group.
- `|` means "or" — matches if any one of the alternatives is found.
- Groups can also "capture" matched text for later use with `.match()` (explored more in coding practice).

### Topic 4: Common regex flags and practical validation

Theory:
Flags after the closing `/` modify how a regex behaves: `i` (case-insensitive), `g` (global — find ALL matches, not just the first).

Code Example:

```js
const emailPattern = /^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$/;
console.log(emailPattern.test("user@example.com")); // true
console.log(emailPattern.test("not-an-email")); // false

const caseInsensitive = /hello/i;
console.log(caseInsensitive.test("HELLO WORLD")); // true - "i" flag ignores case
```

**Explanation:** This email pattern combines character classes, quantifiers, and anchors to describe a reasonable (though simplified) valid email shape; the `i` flag makes the "hello" pattern match regardless of capitalization.

**Key Points:**

- `i` flag = case-insensitive matching.
- `g` flag = find ALL matches in a string, not just stop at the first.
- Real validation patterns (like email) combine multiple regex concepts together — building them up piece by piece is easier than writing the whole thing at once.

## Recap

- Regex patterns use character classes (`\d`, `\w`, `\s`, `.`) to match categories of characters.
- Quantifiers (`* + ? {n} {n,m}`) control repetition; `^`/`$` anchor to string start/end.
- Groups `( )` combine characters for quantifiers/alternation (`|`); flags (`i`, `g`) modify matching behavior.

## What's Next

Practice for today: `public/coding/JavaScript/day-103-regex.md` — build a form validation engine. Day 104 covers iterators and the iterable protocol.
