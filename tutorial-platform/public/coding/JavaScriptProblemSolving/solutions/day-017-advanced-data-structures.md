# Day 017 — Advanced Data Structures — Detailed Solution

## What to Build

Union-Find with path compression.

## Core Implementation / Algorithm

```js
class DSU{constructor(n){this.p=Array.from({length:n},(_,i)=>i);this.rank=Array(n).fill(0);}find(x){if(this.p[x]!==x)this.p[x]=this.find(this.p[x]);return this.p[x];}union(a,b){a=this.find(a);b=this.find(b);if(a===b)return false;if(this.rank[a]<this.rank[b])[a,b]=[b,a];this.p[b]=a;if(this.rank[a]===this.rank[b])this.rank[a]++;return true;}}
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
