# Day 014 — Graphs — Detailed Solution

## What to Build

BFS traversal.

## Core Implementation / Algorithm

```js
function bfs(graph,start){const q=[start],seen=new Set([start]),out=[];for(let i=0;i<q.length;i++){const v=q[i];out.push(v);for(const n of graph[v]??[]){if(!seen.has(n)){seen.add(n);q.push(n);}}}return out;}
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
