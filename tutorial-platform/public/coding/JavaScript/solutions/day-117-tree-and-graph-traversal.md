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
