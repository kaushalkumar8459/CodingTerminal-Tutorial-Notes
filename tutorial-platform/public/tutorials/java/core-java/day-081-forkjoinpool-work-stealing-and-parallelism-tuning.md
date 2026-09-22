---
title: ForkJoinPool, Work Stealing, and Parallelism Tuning
slug: day-081-forkjoinpool-work-stealing-and-parallelism-tuning
dayLabel: Day 81
level: Advanced
estimatedMinutes: 55
order: 81
track: java
---
# Day 81 [Advanced]: ForkJoinPool, Work Stealing, and Parallelism Tuning

## Goal

Understand the `ForkJoinPool` work-stealing model, implement recursive task decomposition, and tune parallelism for workloads.

## Prerequisites

- Day 80 complete

## Explanation

`ForkJoinPool` powers parallel streams and `CompletableFuture`. It uses work-stealing where idle threads steal tasks from busy threads' queues — maximizing CPU utilisation for divide-and-conquer workloads.

## Topic by Topic

### Topic 1: Work-stealing architecture

Theory:
Each thread has its own deque; it pushes/pops from its own tail; idle threads steal from others' heads — reduces contention.

Practical:
Explain why work-stealing is better than a shared queue for recursive tasks.

### Topic 2: `RecursiveTask<V>` and `RecursiveAction`

Theory:
`RecursiveTask` returns a result; `RecursiveAction` does not. Both split work via `fork()`/`join()`.

Practical:
Implement parallel merge sort using `RecursiveAction`.

### Topic 3: `fork()` and `join()` disciplines

Theory:
Fork right subtask; compute left directly; then join right — avoids creating extra threads for one half.

Practical:
Fix incorrect double-fork pattern and measure throughput difference.

### Topic 4: Parallelism level tuning

Theory:
Default = CPU cores - 1; override with `-Djava.util.concurrent.ForkJoinPool.common.parallelism=N` or custom pool.

Practical:
Create custom `ForkJoinPool(2)` to limit parallelism for background work.

### Topic 5: When not to use ForkJoinPool

Theory:
Bad fit: IO-bound tasks, tasks holding locks, very short tasks (overhead > benefit).

Practical:
Benchmark: ForkJoinPool vs FixedThreadPool for an IO-bound task.

## Key Concepts

- Deque-per-thread work-stealing
- `RecursiveTask` divide-and-conquer
- `fork()` right, compute left, `join()` right
- Custom pool for isolated workloads
- Fit criteria for FJP

## Hands-on Coding

```java
import java.util.concurrent.*;

// Parallel sum of array using RecursiveTask
class SumTask extends RecursiveTask<Long> {
    private static final int THRESHOLD = 1000;
    private final long[] arr;
    private final int lo, hi;

    SumTask(long[] arr, int lo, int hi) {
        this.arr = arr; this.lo = lo; this.hi = hi;
    }

    @Override
    protected Long compute() {
        if (hi - lo <= THRESHOLD) {
            long sum = 0;
            for (int i = lo; i < hi; i++) sum += arr[i];
            return sum;
        }
        int mid = (lo + hi) >>> 1;
        SumTask right = new SumTask(arr, mid, hi);
        right.fork();                      // schedule right subtask
        long leftResult = new SumTask(arr, lo, mid).compute(); // compute left directly
        return leftResult + right.join();  // join right
    }
}

public class Main {
    public static void main(String[] args) {
        long[] data = new long[1_000_000];
        for (int i = 0; i < data.length; i++) data[i] = i + 1;

        ForkJoinPool pool = new ForkJoinPool(4);
        long sum = pool.invoke(new SumTask(data, 0, data.length));
        System.out.println("Sum: " + sum);
        pool.shutdown();
    }
}
```

## Mini Exercise

Implement parallel array max-finder using `RecursiveTask<Long>`.

## Assessment Quiz

1. What is work stealing?
2. Why compute left directly instead of forking both halves?
3. Default parallelism level for `commonPool`?

Answers:

1. Idle thread takes tasks from other threads' deques.
2. Avoids creating extra thread for one half; uses current thread efficiently.
3. `Runtime.getRuntime().availableProcessors() - 1`.

## Task

- Implement parallel matrix multiplication using `RecursiveAction` with a configurable threshold.

## Day 81 Outcome

You can implement and tune divide-and-conquer parallel algorithms using `ForkJoinPool`.
