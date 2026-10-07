# Day 021 — Senior-Level JavaScript Challenges

Level: Senior / Staff-oriented problem solving. Treat each item as an interview exercise: clarify constraints, propose a baseline, optimize, and explain production trade-offs.

1. Reusable cache.
2. Concurrency limiter.
3. Priority task scheduler.
4. Retry policy.
5. Circuit breaker.
6. Bulkhead.
7. Request deduplication.
8. SWR cache.
9. Namespaced event bus.
10. Plugin system.
11. Middleware pipeline.
12. Command pattern with undo.
13. State machine.
14. Workflow executor.
15. Dependency resolver.
16. DAG task executor.
17. Reactive signal primitive.
18. Computed cache.
19. Batched update scheduler.
20. Resilient API client.

## Required answer format

1. Clarify assumptions.
2. Explain brute force or baseline.
3. Explain optimized design.
4. State time and space complexity.
5. Discuss failure modes and testing.

<!-- codingterminal-solution:start -->

# Day 021 — Senior JavaScript — Detailed Solution

## What to Build

Concurrency limiter.

## Core Implementation / Algorithm

```js
async function mapLimit(items,limit,worker){const out=new Array(items.length);let next=0;async function run(){while(true){const i=next++;if(i>=items.length)return;out[i]=await worker(items[i],i);}}await Promise.all(Array.from({length:Math.min(limit,items.length)},run));return out;}
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

