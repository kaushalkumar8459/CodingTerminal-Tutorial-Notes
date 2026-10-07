# Day 117 — Tree & Graph Traversal (BFS, DFS)

Bonus practice. No limit on how many variations you try.

## Basic — Tree Traversal

1. Build a simple binary tree using nodes with `value`, `left`, and `right`.
2. Implement `inOrderTraversal(node)` (left, self, right) collecting values into an
   array.
3. Implement `preOrderTraversal(node)` (self, left, right).
4. Implement `postOrderTraversal(node)` (left, right, self).
5. Implement `breadthFirstTraversal(root)` — visit the tree level by level, using a
   Queue (Day 114) internally.

## Concept — Graph Traversal

6. Represent a graph using an adjacency list (a plain object where each key maps to an
   array of connected nodes).
7. Implement `bfs(graph, startNode)` — visit nodes level by level using a Queue,
   tracking visited nodes to avoid revisiting/infinite loops.
8. Implement `dfs(graph, startNode)` — visit as deep as possible before backtracking,
   using either recursion or a Stack (Day 114).
9. Test both `bfs` and `dfs` on the SAME small graph and compare the order nodes are
   visited in.

## Challenge

10. Use `bfs` to find the SHORTEST path (fewest connections) between two nodes in an
    unweighted graph.
11. Use `dfs` to detect whether a graph contains a cycle.

## Interview-style questions

12. What's the key difference in traversal order between BFS and DFS?
13. Why is BFS the right choice for finding the shortest path in an unweighted graph,
    while DFS is not guaranteed to find it?
14. Why is tracking "visited" nodes essential for both BFS and DFS on a graph
    (unlike a tree, which has no cycles)?

## Notes

- BFS/DFS are core computer science fundamentals that show up constantly in technical
  interviews, well beyond just trees/graphs (e.g. web crawlers, social network "degrees
  of separation," maze-solving).
- Building both on the SAME graph representation (adjacency list) makes the
  BFS-vs-DFS comparison much clearer.

<!-- codingterminal-solution:start -->

# Day 117 — Solution: Tree and Graph Traversal

```js
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
function inOrderTraversal(node, result = []) {
  if (node) {
    inOrderTraversal(node.left, result);
    result.push(node.value);
    inOrderTraversal(node.right, result);
  }
  return result;
}
function preOrderTraversal(node, result = []) {
  if (node) {
    result.push(node.value);
    preOrderTraversal(node.left, result);
    preOrderTraversal(node.right, result);
  }
  return result;
}
function postOrderTraversal(node, result = []) {
  if (node) {
    postOrderTraversal(node.left, result);
    postOrderTraversal(node.right, result);
    result.push(node.value);
  }
  return result;
}
function breadthFirstTraversal(root) {
  const result = [],
    queue = root ? [root] : [];
  for (let i = 0; i < queue.length; i++) {
    const node = queue[i];
    result.push(node.value);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
}
const root = new TreeNode(2);
root.left = new TreeNode(1);
root.right = new TreeNode(3);
```

**Graph BFS, DFS, shortest path, cycle check**

```js
const graph = { A: ["B", "C"], B: ["A", "D"], C: ["A", "D"], D: ["B", "C"] };
function bfs(graph, start) {
  const visited = new Set([start]),
    result = [],
    queue = [start];
  for (let i = 0; i < queue.length; i++) {
    const node = queue[i];
    result.push(node);
    for (const next of graph[node] || [])
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
  }
  return result;
}
function dfs(graph, start, visited = new Set(), result = []) {
  visited.add(start);
  result.push(start);
  for (const next of graph[start] || [])
    if (!visited.has(next)) dfs(graph, next, visited, result);
  return result;
}
function shortestPath(graph, start, target) {
  const queue = [[start, [start]]],
    visited = new Set([start]);
  for (const [node, path] of queue) {
    if (node === target) return path;
    for (const next of graph[node] || [])
      if (!visited.has(next)) {
        visited.add(next);
        queue.push([next, [...path, next]]);
      }
  }
  return null;
}
console.log(bfs(graph, "A"), dfs(graph, "A"), shortestPath(graph, "A", "D"));
```

BFS explores by level and guarantees the fewest edges in an unweighted graph; DFS follows a branch deeply first. Visited tracking prevents cycles from causing infinite traversal.

<!-- codingterminal-solution:end -->

