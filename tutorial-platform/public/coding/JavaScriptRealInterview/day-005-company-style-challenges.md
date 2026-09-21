# Real Interview Set 5 — Company-Style Challenges

These combine multiple concepts and are closer to practical screening questions.

## 1. Longest substring with K unique characters

For `"2aabbacbaa"`, use the first character as K and return the longest substring containing exactly K unique characters.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">function longestSubstring(input) {
  const limit = Number(input[0]);
  const text = input.slice(1);
  let left = 0, best = "";
  const counts = new Map();
  for (let right = 0; right &lt; text.length; right++) {
    counts.set(text[right], (counts.get(text[right]) || 0) + 1);
    while (counts.size &gt; limit) {
      const value = text[left++];
      counts.set(value, counts.get(value) - 1);
      if (counts.get(value) === 0) counts.delete(value);
    }
    if (counts.size === limit && right - left + 1 &gt; best.length) best = text.slice(left, right + 1);
  }
  return best;
}</code></pre></details>

## 2. Spiral matrix traversal

Return matrix values in clockwise spiral order.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">function spiral(matrix) {
  const result = [];
  while (matrix.length) {
    result.push(...matrix.shift());
    for (const row of matrix) if (row.length) result.push(row.pop());
    if (matrix.length) result.push(...(matrix.pop() || []).reverse());
    for (let index = matrix.length - 1; index &gt;= 0; index--) if (matrix[index].length) result.push(matrix[index].shift());
  }
  return result;
}</code></pre></details>

## 3. Merge two sorted arrays

Merge without sorting the combined array.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">function mergeSorted(first, second) {
  const result = [];
  let left = 0, right = 0;
  while (left &lt; first.length &amp;&amp; right &lt; second.length) {
    if (first[left] &lt;= second[right]) result.push(first[left++]);
    else result.push(second[right++]);
  }
  return result.concat(first.slice(left), second.slice(right));
}</code></pre></details>

## 4. Find the largest contiguous subarray sum

Return the maximum sum and the selected range.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">function maxSubarray(values) {
  let best = values[0], current = values[0], start = 0, bestStart = 0, bestEnd = 0;
  for (let index = 1; index &lt; values.length; index++) {
    if (current + values[index] &lt; values[index]) { current = values[index]; start = index; }
    else current += values[index];
    if (current &gt; best) { best = current; bestStart = start; bestEnd = index; }
  }
  return { sum: best, values: values.slice(bestStart, bestEnd + 1) };
}</code></pre></details>

## 5. Detect a linked-list cycle

Use constant extra space.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">function hasCycle(head) {
  let slow = head, fast = head;
  while (fast &amp;&amp; fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}</code></pre></details>

## 6. Find the missing number

For an array containing distinct values from `0` through `n`, find the missing value.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">function missingNumber(values) {
  let result = values.length;
  for (let index = 0; index &lt; values.length; index++) result ^= index ^ values[index];
  return result;
}

console.log(missingNumber([3, 0, 1])); // 2</code></pre></details>

## 7. Group records by a computed key

Group transactions by customer and calculate each customer's total.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">function customerTotals(transactions) {
  return transactions.reduce((totals, transaction) =&gt; {
    totals[transaction.customer] = (totals[transaction.customer] || 0) + transaction.amount;
    return totals;
  }, {});
}</code></pre></details>

## 8. Design question: explain your solution

For any previous question, explain edge cases, complexity, mutation choices, and how you would test it.

<details><summary>Show solution</summary><pre><code class="language-solution-javascript">// A strong interview explanation includes:
// 1. Input assumptions and invalid-input behavior.
// 2. The invariant maintained by the loop or data structure.
// 3. Time and space complexity.
// 4. At least three edge cases.
// 5. Why this approach is preferable to a simpler but slower alternative.</code></pre></details>
