# Day 030 — Solution: String Interview Problems

**1. First non-repeating character**

```js
function firstUnique(text) {
  const counts = {};
  for (const character of text)
    counts[character] = (counts[character] || 0) + 1;
  for (const character of text) if (counts[character] === 1) return character;
  return null;
}
```

**2. Character frequency**

```js
function characterFrequency(text) {
  const counts = {};
  for (const character of text)
    counts[character] = (counts[character] || 0) + 1;
  return counts;
}
```

**3. Anagrams ignoring case and spaces**

```js
function anagrams(first, second) {
  const normalize = (text) =>
    text.toLowerCase().replaceAll(" ", "").split("").sort().join("");
  return normalize(first) === normalize(second);
}
```

**4. Palindrome ignoring punctuation**

```js
function cleanPalindrome(text) {
  const clean = text.toLowerCase().replace(/[^a-z0-9]/g, "");
  return clean === [...clean].reverse().join("");
}
```

**5. Longest word**

```js
function longestWord(sentence) {
  return (
    sentence
      .match(/[a-z0-9]+/gi)
      ?.reduce((a, b) => (b.length > a.length ? b : a), "") || ""
  );
}
```

**6. Most frequent character**

```js
function mostFrequentCharacter(text) {
  const counts = characterFrequency(text);
  return Object.keys(counts).reduce((best, character) =>
    counts[character] > counts[best] ? character : best,
  );
}
```

**7. Most frequent word**

```js
function mostFrequentWord(sentence) {
  const counts = {};
  for (const word of sentence.toLowerCase().match(/[a-z0-9]+/g) || [])
    counts[word] = (counts[word] || 0) + 1;
  return Object.keys(counts).reduce(
    (best, word) => (!best || counts[word] > counts[best] ? word : best),
    "",
  );
}
```

**8. Rotation**

```js
const isRotation = (first, second) =>
  first.length === second.length && (first + first).includes(second);
```

**9. Remove duplicate characters**

```js
function removeDuplicates(text) {
  const seen = new Set();
  let result = "";
  for (const character of text)
    if (!seen.has(character)) {
      seen.add(character);
      result += character;
    }
  return result;
}
```

**10. Distinct words**

```js
function distinctWordCount(sentence) {
  return new Set(sentence.toLowerCase().match(/[a-z0-9]+/g) || []).size;
}
```

**11. Uppercase vs lowercase**

```js
function letterCaseCounts(text) {
  let uppercase = 0,
    lowercase = 0;
  for (const character of text) {
    if (character >= "A" && character <= "Z") uppercase++;
    if (character >= "a" && character <= "z") lowercase++;
  }
  return { uppercase, lowercase };
}
```

**12. All unique**

```js
const allUnique = (text) => new Set(text).size === text.length;
```

**13. Replace long words**

```js
const shortenLongWords = (sentence) =>
  sentence
    .split(" ")
    .map((word) => (word.length > 5 ? "[long]" : word))
    .join(" ");
```

**14. Word wrap**

```js
function wordWrap(text, maxLength) {
  const lines = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    if (line && line.length + 1 + word.length > maxLength) {
      lines.push(line);
      line = word;
    } else line = line ? `${line} ${word}` : word;
  }
  if (line) lines.push(line);
  return lines;
}
```

**15. Balanced parentheses**

```js
function balancedParentheses(text) {
  let balance = 0;
  for (const character of text) {
    if (character === "(") balance++;
    else if (--balance < 0) return false;
  }
  return balance === 0;
}
```

## Interview-style questions

**16.** An object or `Map` is a good frequency table because each character or word maps directly to its count.

**17.** Normalize both strings, count each character in the first, decrement for the second, and confirm every final count is zero. This avoids sorting.

**18.** A rotation of `text` must appear inside `text + text`; checking `includes` captures every possible rotation in one operation.
