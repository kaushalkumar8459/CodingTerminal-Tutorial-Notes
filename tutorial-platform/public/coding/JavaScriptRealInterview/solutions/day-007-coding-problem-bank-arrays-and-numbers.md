# Day 007 — Arrays & Numbers — Detailed Solutions

> Original practice solutions for interview preparation. Company names in the filename identify the topic group; they do not mean every exercise below is a verified question from that company.

## Problems Covered

Kadane, move zeroes and merge intervals

## Executable JavaScript

```js
function maxSubarraySum(nums) {
  if (!nums.length) return 0;
  let current = nums[0], best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}

function moveZeroes(nums) {
  let write = 0;
  for (const value of nums) if (value !== 0) nums[write++] = value;
  while (write < nums.length) nums[write++] = 0;
  return nums;
}
// Kadane: O(n) time, O(1) space. Merge intervals: sort by start, then merge overlaps.
```

## How to Explain It

- Start with the requirement and assumptions.
- Explain the data structure or runtime behavior.
- State time and space complexity.
- Walk through one normal case and one edge case.
- Mention a production trade-off or failure mode.

## Edge Cases

- Empty input
- Single item
- Duplicate values
- Invalid input
- Large input
- Repeated calls or concurrent operations where applicable

## Follow-Up Questions

1. Can you improve the complexity?
2. What changes for very large input?
3. How would you test it?
4. How would you handle cancellation or failure?
5. What changes in a browser/UI implementation?
