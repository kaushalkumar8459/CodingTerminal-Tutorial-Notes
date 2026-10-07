# Day 007 — Recursion & Backtracking

Progression level: Beginner

Solve each problem first without looking at a solution. For every problem record: approach, edge cases, time complexity, space complexity, mutation behavior, and at least two tests.

1. Recursive countdown.
2. Recursive sum from 1 to N.
3. Recursive factorial.
4. Recursive Fibonacci.
5. Recursive power.
6. Recursive GCD.
7. Recursive array sum.
8. Recursive string reverse.
9. Recursive palindrome check.
10. Recursive binary search.
11. Flatten a nested array recursively.
12. Generate all subsets.
13. Generate all permutations.
14. Generate unique permutations.
15. Generate combinations of K values.
16. Generate combinations summing to target.
17. Generate valid parentheses.
18. Solve a maze.
19. N-Queens.
20. Sudoku solver.
21. Word search in a grid.
22. Phone keypad letter combinations.
23. Restore valid IP addresses.
24. Partition a string into palindromes.
25. Generate all binary strings without consecutive ones.
26. Generate all balanced bracket sequences.
27. Find paths through a matrix.
28. Subset sum using backtracking.
29. Combination sum with reusable values.
30. Combination sum without duplicate results.

## Interview expectation

Explain the brute-force approach first, then improve it when a better complexity is possible. Prefer clear JavaScript and justify every data structure.

<!-- codingterminal-solution:start -->

# Day 007 — Recursion & Backtracking — Detailed Solution

## What to Build

Generate subsets.

## Core Implementation / Algorithm

```js
function subsets(nums){const out=[];function dfs(i,path){if(i===nums.length){out.push([...path]);return;}dfs(i+1,path);path.push(nums[i]);dfs(i+1,path);path.pop();}dfs(0,[]);return out;}
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

