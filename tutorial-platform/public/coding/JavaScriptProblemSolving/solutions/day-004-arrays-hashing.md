# Day 004 — Arrays & Hashing — Detailed Solution

## What to Build

Two Sum and duplicate detection.

## Core Implementation / Algorithm

```js
function twoSum(nums, target) { const m=new Map(); for(let i=0;i<nums.length;i++){const n=target-nums[i]; if(m.has(n)) return [m.get(n),i]; m.set(nums[i],i);} return []; }
```

## Complexity

State the time and space complexity of the chosen implementation. For UI tasks, also discuss render cost, network cost, and memory growth.

## Edge Cases

- Empty or missing input
- Duplicate data
- Rapid repeated interaction
- Slow/failing async work
- Cleanup/lifecycle
- Keyboard and accessibility behavior
- Large datasets

## Interview Explanation

1. Clarify requirements and constraints.
2. Identify source vs derived state.
3. Implement the simplest correct path.
4. Explain complexity and trade-offs.
5. Test boundary and failure cases.
6. Explain how the design changes at production scale.

## Extension

Add one requirement without rewriting the entire feature. Explain what changed and why.

> This is original interview practice material. Company names elsewhere in the curriculum should not be interpreted as claims that this exact exercise was asked by that company.
