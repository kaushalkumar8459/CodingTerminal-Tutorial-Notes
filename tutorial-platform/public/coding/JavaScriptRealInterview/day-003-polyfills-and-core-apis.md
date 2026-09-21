# Real Interview Set 3 — Polyfills and Core APIs

## 1. Write a `map` polyfill

Support value, index, and array callback arguments.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">Array.prototype.myMap = function (callback) {
  const result = [];
  for (let index = 0; index &lt; this.length; index++) {
    result.push(callback(this[index], index, this));
  }
  return result;
};</code></pre></details>

## 2. Write a correct `reduce` polyfill

Support an optional initial value and throw for an empty array without one.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">Array.prototype.myReduce = function (callback, initialValue) {
  let index = 0;
  let accumulator;
  if (arguments.length &gt; 1) accumulator = initialValue;
  else {
    if (this.length === 0) throw new TypeError("Reduce of empty array");
    accumulator = this[index++];
  }
  for (; index &lt; this.length; index++) accumulator = callback(accumulator, this[index], index, this);
  return accumulator;
};</code></pre></details>

## 3. Write a `bind` polyfill

Preserve the receiver and support preset arguments.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">Function.prototype.myBind = function (context, ...preset) {
  const original = this;
  return function (...later) {
    return original.apply(context, [...preset, ...later]);
  };
};</code></pre></details>

## 4. Group anagrams

For `["bag", "gab", "foo", "oof"]`, group words with the same letters.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">function groupAnagrams(words) {
  const groups = new Map();
  for (const word of words) {
    const key = [...word].sort().join("");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }
  return [...groups.values()];
}</code></pre></details>

## 5. Convert an array to an object by name

```js
[
  { name: "aaa", rollno: 1 },
  { name: "bbb", rollno: 2 },
];
```

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">const result = students.reduce((output, student) =&gt; {
  output[student.name] = student;
  return output;
}, {});</code></pre></details>

## 6. Implement `Promise.all` behavior

Preserve input order and reject as soon as one input rejects.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">function promiseAll(promises) {
  return new Promise((resolve, reject) =&gt; {
    const results = [];
    let completed = 0;
    if (promises.length === 0) return resolve([]);
    promises.forEach((promise, index) =&gt; {
      Promise.resolve(promise).then((value) =&gt; {
        results[index] = value;
        completed++;
        if (completed === promises.length) resolve(results);
      }, reject);
    });
  });
}</code></pre></details>

## 7. Curry a function

Make `sum(1)(2)(3)` return `6`.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">const sum = (a) =&gt; (b) =&gt; (c) =&gt; a + b + c;
console.log(sum(1)(2)(3));</code></pre></details>

## 8. Find first repeating value

Return the first value that appears twice.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">function firstDuplicate(values) {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) return value;
    seen.add(value);
  }
  return undefined;
}</code></pre></details>
