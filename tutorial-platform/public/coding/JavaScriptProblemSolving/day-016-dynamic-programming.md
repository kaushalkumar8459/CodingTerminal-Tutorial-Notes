# Day 016 — Dynamic Programming

Level: Advanced. Solve first, then optimize. For every problem record approach, invariant, edge cases, time complexity, space complexity, and mutation behavior.

1. Climbing stairs.
2. Min cost stairs.
3. House robber.
4. Circular robber.
5. Coin change minimum.
6. Coin change ways.
7. 0/1 knapsack.
8. Unbounded knapsack.
9. Subset sum.
10. Equal partition.
11. Target sum.
12. LIS.
13. LCS.
14. Longest common substring.
15. Edit distance.
16. Longest palindromic subsequence.
17. Word break.
18. Decode ways.
19. Unique paths.
20. Stock trading DP.

<!-- codingterminal-solution:start -->

# Day 016 — Dynamic Programming — Detailed Solution

## What to Build

House robber with O(1) space.

## Core Implementation / Algorithm

```js
function rob(nums){let prev2=0,prev1=0;for(const n of nums){const cur=Math.max(prev1,prev2+n);prev2=prev1;prev1=cur;}return prev1;}
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

