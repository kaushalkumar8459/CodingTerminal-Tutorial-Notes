---
title: Concurrency Deep Dive — Locks, Atomics, and Volatile
slug: day-078-concurrency-deep-dive-locks-atomics-and-volatile
dayLabel: Day 78
level: Advanced
estimatedMinutes: 60
order: 78
track: java
---
# Day 78 [Advanced]: Concurrency Deep Dive — Locks, Atomics, and Volatile

## Goal

Master the full suite of Java concurrency primitives, understand CPU-level memory visibility, and choose the right tool for each scenario.

## Prerequisites

- Day 77 complete
- Day 45 (synchronization basics) complete

## Explanation

This day goes deep: cache coherence, memory barriers, CAS, `StampedLock`, `LockSupport`, and when each primitive applies. This is the zone (Days 78–83) that separates intermediate from expert Java engineers.

## Topic by Topic

### Topic 1: CPU cache coherence and Java Memory Model

Theory:
L1/L2 caches per core; writes may not be visible to other cores without a memory barrier. `volatile` ensures barrier on write and read.

Practical:
Observe stale visibility bug: thread A writes field, thread B reads stale cached value without `volatile`.

### Topic 2: `volatile` — visibility not atomicity

Theory:
Guarantees all threads see latest write; does NOT prevent read-modify-write race.

Practical:
Demonstrate `volatile int count++` is still a race; fix with `AtomicInteger`.

### Topic 3: Atomic classes — lock-free CAS

Theory:
`AtomicInteger`, `AtomicReference`, `AtomicLongArray`; `compareAndSet(expected, update)` is atomic.

Practical:
Implement a lock-free stack using `AtomicReference` and CAS loop.

### Topic 4: `ReadWriteLock` and `StampedLock`

Theory:
`ReadWriteLock`: multiple readers or one writer. `StampedLock`: adds optimistic read (no locking on read).

Practical:
Benchmark `StampedLock` optimistic read vs `synchronized` for read-heavy cache.

### Topic 5: `LockSupport.park` / `unpark`

Theory:
Low-level thread suspension; basis of `AbstractQueuedSynchronizer` (all locks use AQS internally).

Practical:
Implement a simple binary semaphore using `park`/`unpark`.

## Key Concepts

- L1/L2 cache write buffering
- `volatile` as memory barrier
- CAS loop for lock-free structures
- `StampedLock` optimistic read path
- AQS as the backbone of Java locks

## Hands-on Coding

```java
import java.util.concurrent.atomic.*;
import java.util.concurrent.locks.*;

// Lock-free stack
public class LockFreeStack<T> {
    private final AtomicReference<Node<T>> top = new AtomicReference<>();

    record Node<T>(T val, Node<T> next) {}

    public void push(T val) {
        Node<T> newNode;
        do {
            Node<T> current = top.get();
            newNode = new Node<>(val, current);
        } while (!top.compareAndSet(newNode.next(), newNode));
    }

    public T pop() {
        Node<T> current;
        do {
            current = top.get();
            if (current == null) return null;
        } while (!top.compareAndSet(current, current.next()));
        return current.val();
    }
}

// StampedLock optimistic read
public class ReadHeavyCache {
    private final StampedLock lock = new StampedLock();
    private double value = 0;

    public double read() {
        long stamp = lock.tryOptimisticRead();
        double v = value;
        if (!lock.validate(stamp)) {          // check if write happened
            stamp = lock.readLock();
            try { v = value; }
            finally { lock.unlockRead(stamp); }
        }
        return v;
    }

    public void write(double newVal) {
        long stamp = lock.writeLock();
        try { value = newVal; }
        finally { lock.unlockWrite(stamp); }
    }
}
```

## Mini Exercise

Implement a `LockFreeCounter` using `AtomicLong` with increment, decrement, and reset operations.

## Assessment Quiz

1. Why is `count++` a race even with `volatile count`?
2. What makes `StampedLock` faster than `ReadWriteLock`?
3. What is AQS?

Answers:

1. `count++` is three operations: read, increment, write — not atomic.
2. Optimistic read requires no lock acquisition for common read path.
3. AbstractQueuedSynchronizer — the framework backing `ReentrantLock`, `Semaphore`, etc.

## Task

- Implement a thread-safe `BoundedBuffer<T>` using `ReentrantLock` with two `Condition`s (notFull, notEmpty).

## Day 78 Outcome

You understand concurrency at the CPU/JMM level and can implement lock-free and fine-grained locking structures.
