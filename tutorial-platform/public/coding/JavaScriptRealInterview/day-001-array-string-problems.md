# Real Interview Set 1 — Arrays and Strings

These are practical questions commonly used in JavaScript screening rounds. Try each question before opening its solution.

## 1. Reverse words and characters

Given `"My Name is ABC"`, return:

- `"ABC is Name My"` by reversing word order.
- `"CBA si emaN yM"` by reversing every character.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">const text = "My Name is ABC";
const reverseWords = text.split(" ").reverse().join(" ");
const reverseCharacters = [...text].reverse().join("");

console.log(reverseWords);
console.log(reverseCharacters);</code></pre></details>

## 2. Remove duplicates and count values

For `[1, 2, 2, 3, 1, 2]`, return unique values and a frequency object.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">function summarize(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) || 0) + 1);
  return { unique: [...counts.keys()], counts: Object.fromEntries(counts) };
}

console.log(summarize([1, 2, 2, 3, 1, 2]));</code></pre></details>

## 3. Group objects by a property

Transform students into an object keyed by age.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">function groupByAge(students) {
  return students.reduce((groups, student) => {
    (groups[student.age] ||= []).push(student);
    return groups;
  }, {});
}

console.log(groupByAge([
{ name: "Asha", age: 20 },
{ name: "Ben", age: 20 },
{ name: "Maya", age: 24 }
]));</code></pre></details>

## 4. Find a pair with a target sum

Return the first pair of indexes whose values add to `target` in O(n) time.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">function twoSum(values, target) {
  const seen = new Map();
  for (let index = 0; index &lt; values.length; index++) {
    const needed = target - values[index];
    if (seen.has(needed)) return [seen.get(needed), index];
    seen.set(values[index], index);
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]</code></pre></details>

## 5. Largest sum of three consecutive values

Use a sliding window for `[1, 2, 3, -9, 21, 3, 9, 2]`.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">function largestWindow(values, size) {
  if (values.length &lt; size) return null;
  let sum = values.slice(0, size).reduce((total, value) => total + value, 0);
  let best = { sum, values: values.slice(0, size) };

for (let right = size; right &lt; values.length; right++) {
sum += values[right] - values[right - size];
if (sum &gt; best.sum) best = { sum, values: values.slice(right - size + 1, right + 1) };
}
return best;
}</code></pre></details>

## 6. Move zeroes to the end

Move all zeroes to the end while preserving the order of non-zero values.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">function moveZeroes(values) {
  const result = values.filter((value) => value !== 0);
  while (result.length &lt; values.length) result.push(0);
  return result;
}

console.log(moveZeroes([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]</code></pre></details>

## 7. Flatten a nested array without `.flat()`

Flatten `[1, [2, [3, 4]], 5]` to one array.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">function flatten(values) {
  return values.reduce((result, value) => result.concat(Array.isArray(value) ? flatten(value) : value), []);
}

console.log(flatten([1, [2, [3, 4]], 5]));</code></pre></details>

## 8. Compress consecutive characters

Convert `"aaaabbc"` to `"a4b2c1"` without sorting the string.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">function compress(text) {
  let result = "";
  let count = 0;
  for (let index = 0; index &lt; text.length; index++) {
    count++;
    if (text[index] !== text[index + 1]) {
      result += text[index] + count;
      count = 0;
    }
  }
  return result;
}

console.log(compress("aaaabbc"));</code></pre></details>
