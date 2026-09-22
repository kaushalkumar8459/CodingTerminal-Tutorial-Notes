# Day 006 — Sliding Window — Detailed Solution

## What to Build

Longest unique substring.

## Core Implementation / Algorithm

```js
function longestUnique(s){const m=new Map();let l=0,b=0;for(let r=0;r<s.length;r++){if(m.has(s[r]))l=Math.max(l,m.get(s[r])+1);m.set(s[r],r);b=Math.max(b,r-l+1);}return b;}
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
