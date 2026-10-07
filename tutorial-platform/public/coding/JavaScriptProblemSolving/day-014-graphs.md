# Day 014 — Graphs, BFS, DFS & Connectivity

Level: Advanced. Solve first, then optimize. For every problem record approach, invariant, edge cases, time complexity, space complexity, and mutation behavior.

1. Adjacency list.
2. Adjacency matrix.
3. DFS.
4. BFS.
5. Connected components.
6. Undirected cycle detection.
7. Directed cycle detection.
8. Topological sort DFS.
9. Topological sort indegree.
10. Course schedule.
11. Course ordering.
12. Unweighted shortest path.
13. Grid shortest path.
14. Number of islands.
15. Flood fill.
16. Rotten oranges.
17. Clone graph.
18. Bipartite graph.
19. Dijkstra.
20. Minimum spanning tree.

<!-- codingterminal-solution:start -->

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

<!-- codingterminal-solution:end -->

