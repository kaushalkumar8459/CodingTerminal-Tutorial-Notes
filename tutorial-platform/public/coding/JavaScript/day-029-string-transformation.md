# Day 029 — String Transformation (replace, replaceAll, split, join, concat)

Matches Tutorial Day 29 (String Methods Part 1). No limit on how many you solve.

## Basic

1. Use `.replace()` to replace the first occurrence of a word in a string.
2. Use `.replaceAll()` to replace every occurrence of a word in a string.
3. Use `.split(" ")` to break a sentence into an array of words.
4. Use `.join("-")` to combine an array of words back into a single string.
5. Use `.concat()` to combine two strings together.

## Concept

6. Build a **slug generator**: convert `"Hello World Example"` into `"hello-world-example"`
   (lowercase, spaces replaced with dashes).
7. Build a **name formatter**: convert `"john   DOE"` into `"John Doe"` (trim extra
   spaces, fix casing).
8. Build a **sentence formatter**: ensure a sentence starts with a capital letter and
   ends with a period, fixing it if not.
9. Remove duplicate/extra spaces from a sentence (e.g. `"hello    world"` → `"hello world"`).
10. Split a comma-separated string of values into an array, trimming each value.
11. Replace all vowels in a string with `*`.
12. Given a full name string, split it into first and last name variables.
13. Reverse the order of words in a sentence using `.split()`, `.reverse()`, and `.join()`.
14. Build a function that converts `"snake_case_text"` into `"Title Case Text"`.
15. Replace every space in a string with an underscore, without using `.replaceAll(" ", "_")`
    directly (try `.split(" ").join("_")` instead, to compare approaches).

## Interview-style questions

16. What's the difference between `.replace()` and `.replaceAll()`?
17. How would you replace all occurrences of a substring in an environment that only had
    `.replace()` available (pre-`replaceAll`)? (Hint: think about `.split().join()`.)
18. Why does `.split()` followed by `.join()` work well together for many string
    transformation tasks?

## Notes

- The `.split(...).join(...)` combo is extremely versatile — many "find and transform"
  string problems can be solved by splitting into pieces, transforming each piece, and
  rejoining.
- Keep testing edge cases: empty strings, strings with only spaces, and strings with no
  matches for `.replace()`/`.replaceAll()`.

<!-- codingterminal-solution:start -->

# Day 029 — Solution: String Transformation

## Basic

```js
console.log("hello world".replace("world", "JavaScript"));
console.log("one one one".replaceAll("one", "1"));
console.log("learn JavaScript daily".split(" "));
console.log(["learn", "code", "daily"].join("-"));
console.log("Hello".concat(" ", "World"));
```

**6. Slug generator**

```js
function slug(text) {
  return text.trim().toLowerCase().split(/\s+/).join("-");
}
console.log(slug("Hello World Example")); // hello-world-example
```

**7. Name formatter**

```js
function formatName(name) {
  return name
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
console.log(formatName("john   DOE")); // John Doe
```

**8. Sentence formatter**

```js
function formatSentence(sentence) {
  let result = sentence.trim();
  if (result) result = result[0].toUpperCase() + result.slice(1);
  if (result && !result.endsWith(".")) result += ".";
  return result;
}
```

**9. Remove extra spaces**

```js
const normalizeSpaces = (text) => text.trim().split(/\s+/).join(" ");
```

**10. CSV values**

```js
const values = " apple, banana , cherry "
  .split(",")
  .map((value) => value.trim());
console.log(values); // ["apple", "banana", "cherry"]
```

**11. Replace vowels**

```js
const maskVowels = (text) => text.replaceAll(/[aeiou]/gi, "*");
```

**12. First and last name**

```js
const [firstName, lastName] = "Ada Lovelace".trim().split(/\s+/);
console.log(firstName, lastName);
```

**13. Reverse words**

```js
const reverseWords = (sentence) => sentence.split(" ").reverse().join(" ");
```

**14. Snake case to title case**

```js
function snakeToTitle(text) {
  return text
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
console.log(snakeToTitle("snake_case_text")); // Snake Case Text
```

**15. Spaces to underscores without `replaceAll`**

```js
const underscored = "hello world again".split(" ").join("_");
```

## Interview-style questions

**16.** `replace` changes the first match; `replaceAll` changes every match.

**17.** Use `text.split(target).join(replacement)`.

**18.** `split` turns text into transformable pieces, and `join` puts those pieces back together with a chosen separator.

<!-- codingterminal-solution:end -->

