---
title: Synchronization Locks and Thread Safety
slug: day-045-synchronization-locks-and-thread-safety
dayLabel: Day 45
level: Intermediate
estimatedMinutes: 55
order: 45
track: java
---
# Day 45 [Intermediate]: Synchronization Locks and Thread Safety

## Goal

Protect shared state using `synchronized`, `volatile`, and `ReentrantLock`.

## Prerequisites

- Day 44 complete

## Explanation

Without synchronization, concurrent threads can interleave reads and writes producing corrupted data — a race condition.

## Topic by Topic

### Topic 1: Race condition demonstrated

Theory:
Two threads incrementing shared counter without synchronization produce wrong result.

Practical:
Run 1000 increments on 2 threads; observe inconsistent total.

### Topic 2: `synchronized` method and block

Theory:
Only one thread holds the intrinsic lock at a time.

Practical:
Fix race condition with synchronized counter.

### Topic 3: `volatile` keyword

Theory:
Ensures visibility of variable changes across threads; not atomicity.

Practical:
Use `volatile boolean` stop flag for graceful thread shutdown.

### Topic 4: `ReentrantLock`

Theory:
Explicit lock with `lock()`/`unlock()`; supports tryLock, timed lock, fairness.

Practical:
Protect shared resource with `ReentrantLock` in try-finally.

### Topic 5: Deadlock

Theory:
Two threads each holding a lock the other needs — permanent block.

Practical:
Reproduce and fix by consistent lock ordering.

## Key Concepts

- Race condition cause and fix
- Intrinsic lock via `synchronized`
- Visibility via `volatile`
- Explicit `ReentrantLock`
- Deadlock detection and prevention

## Hands-on Coding

```java
import java.util.concurrent.locks.ReentrantLock;

class SafeCounter {
    private int count = 0;
    private final ReentrantLock lock = new ReentrantLock();

    void increment() {
        lock.lock();
        try { count++; }
        finally { lock.unlock(); }
    }

    int get() { return count; }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        SafeCounter counter = new SafeCounter();

        Runnable task = () -> {
            for (int i = 0; i < 1000; i++) counter.increment();
        };

        Thread t1 = new Thread(task);
        Thread t2 = new Thread(task);
        t1.start(); t2.start();
        t1.join(); t2.join();

        System.out.println("Total: " + counter.get()); // always 2000
    }
}
```

## Mini Exercise

Reproduce a race condition with `count++` without lock; fix it; verify result.

## Assessment Quiz

1. What is a race condition?
2. Does `volatile` guarantee atomicity?
3. How to prevent deadlock?

Answers:

1. Two threads read-modify-write shared state concurrently yielding corrupt result.
2. No; only visibility.
3. Always acquire locks in the same order across threads.

## Task

- Build a thread-safe `BankAccount` with deposit, withdraw, and balance.

## Day 45 Outcome

You can identify and fix thread-safety issues using the right synchronization primitive.
