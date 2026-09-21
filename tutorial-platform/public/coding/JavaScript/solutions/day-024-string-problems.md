# Day 024 — Solution: String Problems

## Basic

**1. Reverse a string**

```js
const reverse = (text) => text.split("").reverse().join("");
console.log(reverse("hello")); // olleh
```

Manual approach:

```js
function reverseManual(text) {
  let result = "";
  for (let i = text.length - 1; i >= 0; i--) result += text[i];
  return result;
}
```

**2. Palindrome**

```js
function isPalindrome(text) {
  const clean = text.toLowerCase();
  return clean === clean.split("").reverse().join("");
}
console.log(isPalindrome("level")); // true
```

**3. Count vowels**

```js
function countVowels(text) {
  let count = 0;
  for (const character of text.toLowerCase())
    if ("aeiou".includes(character)) count++;
  return count;
}
console.log(countVowels("beautiful")); // 5
```

**4. Count consonants**

```js
function countConsonants(text) {
  let count = 0;
  for (const character of text.toLowerCase()) {
    if (character >= "a" && character <= "z" && !"aeiou".includes(character))
      count++;
  }
  return count;
}
console.log(countConsonants("Hello")); // 3
```

**5. Count words**

```js
function wordCount(sentence) {
  const words = sentence.trim().split(/\s+/);
  return sentence.trim() === "" ? 0 : words.length;
}
console.log(wordCount("one two three")); // 3
```

## Concept

**6. Remove spaces**

```js
const withoutSpaces = "a b  c".split(" ").join("");
console.log(withoutSpaces); // abc
```

**7. Duplicate characters**

```js
function duplicateCharacters(text) {
  const counts = {};
  const result = [];
  for (const character of text)
    counts[character] = (counts[character] || 0) + 1;
  for (const character in counts)
    if (counts[character] > 1) result.push(character);
  return result;
}
console.log(duplicateCharacters("programming")); // [r, g, m]
```

**8. Character counts**

```js
function characterCounts(text) {
  const counts = {};
  for (const character of text)
    counts[character] = (counts[character] || 0) + 1;
  return counts;
}
```

**9. Anagrams**

```js
function areAnagrams(first, second) {
  const clean = (text) => text.toLowerCase().split("").sort().join("");
  return clean(first) === clean(second);
}
console.log(areAnagrams("listen", "silent")); // true
```

**10. Capitalize every word**

```js
function titleCase(sentence) {
  return sentence
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
console.log(titleCase("hello WORLD")); // Hello World
```

**11. Longest word**

```js
function longestWord(sentence) {
  let longest = "";
  for (const word of sentence.split(/\s+/))
    if (word.length > longest.length) longest = word;
  return longest;
}
console.log(longestWord("JavaScript is powerful")); // JavaScript
```

**12. Reverse word order**

```js
const sentence = "learn code daily";
console.log(sentence.split(" ").reverse().join(" ")); // daily code learn
```

## Interview-style questions

**13.** Compare characters from the first and last positions moving inward; this avoids allocating a reversed copy.

**14.** An object or `Map` gives near-constant-time lookup while updating each character count.

**15.** Decide whether spaces, punctuation, and letter case should be ignored. Normalize those characters before comparing.
