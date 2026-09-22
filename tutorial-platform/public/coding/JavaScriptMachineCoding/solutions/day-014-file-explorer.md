# Day 014 — File Explorer — Detailed Solution

## What to Build

Tree construction and expand/collapse.

## Core Implementation / Algorithm

```js
function buildTree(nodes){const m=new Map(nodes.map(n=>[n.id,{...n,children:[]}]));const root=[];for(const n of nodes){const x=m.get(n.id);n.parentId==null?root.push(x):m.get(n.parentId)?.children.push(x);}return root;}
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
