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
