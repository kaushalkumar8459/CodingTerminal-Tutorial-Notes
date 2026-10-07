# Day 012 — Trees & Binary Search Trees

Progression level: Intermediate

Solve each problem first without looking at a solution. For every problem record: approach, edge cases, time complexity, space complexity, mutation behavior, and at least two tests.

1. Create a binary tree node.
2. Preorder traversal recursively.
3. Inorder traversal recursively.
4. Postorder traversal recursively.
5. Preorder traversal iteratively.
6. Inorder traversal iteratively.
7. Postorder traversal iteratively.
8. Level-order traversal.
9. Maximum tree depth.
10. Minimum tree depth.
11. Count tree nodes.
12. Count leaf nodes.
13. Sum tree values.
14. Check tree equality.
15. Invert a binary tree.
16. Check tree symmetry.
17. Validate a BST.
18. Search a BST.
19. Insert into a BST.
20. Delete from a BST.
21. Find minimum and maximum in BST.
22. Find kth smallest in BST.
23. Find lowest common ancestor in BST.
24. Find lowest common ancestor in binary tree.
25. Build tree from preorder and inorder.
26. Serialize and deserialize a tree.
27. Tree diameter.
28. Maximum path sum.
29. Check balanced tree.
30. Boundary traversal.

## Interview expectation

Explain the brute-force approach first, then improve it when a better complexity is possible. Prefer clear JavaScript and justify every data structure.

<!-- codingterminal-solution:start -->

# Day 012 — Trees & BST — Detailed Solution

## What to Build

Maximum depth.

## Core Implementation / Algorithm

```js
function maxDepth(root){if(!root)return 0;return 1+Math.max(maxDepth(root.left),maxDepth(root.right));}
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

