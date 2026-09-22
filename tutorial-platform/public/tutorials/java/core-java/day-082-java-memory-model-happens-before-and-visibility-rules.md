---
title: Java Memory Model — Happens-Before and Visibility Rules
slug: day-082-java-memory-model-happens-before-and-visibility-rules
dayLabel: Day 82
level: Advanced
estimatedMinutes: 60
order: 82
track: java
---
# Day 82 [Advanced]: Java Memory Model — Happens-Before and Visibility Rules

## Goal

Understand the Java Memory Model formally enough to reason about visibility bugs and write provably correct concurrent code.

## Prerequisites

- Day 81 complete
- Day 78 (concurrency deep dive) complete

## Explanation

The JMM specifies when one thread's actions are guaranteed visible to another. Without a happens-before (HB) relationship, the JVM and CPU are free to reorder operations — causing subtle, platform-specific bugs.

## Topic by Topic

### Topic 1: Happens-before definition

Theory:
If action A happens-before B, all effects of A are visible to B. Key rules: monitor unlock HB next lock; volatile write HB subsequent read; thread start HB first action; `join()` HB actions after it.

Practical:
Draw HB graph for producer-consumer with `volatile` flag.

### Topic 2: Reordering by JVM and CPU

Theory:
JVM JIT and CPU reorder instructions for performance. Only HB edges prevent reordering.

Practical:
Reproduce a visibility bug on a multi-core machine (or reason through it).

### Topic 3: Safe publication patterns

Theory:
Object is safely published if all threads see the fully constructed state. Mechanisms: `final` fields, `volatile`, `synchronized`, `AtomicReference`, `static` initializer.

Practical:
Fix a broken double-checked locking implementation using `volatile`.

### Topic 4: Double-checked locking — correct form

Theory:
`volatile` on the field is required to prevent seeing partially constructed object.

Practical:
Implement correct thread-safe lazy singleton with `volatile`.

### Topic 5: `final` fields and safe construction

Theory:
`final` fields written in constructor are visible to all threads without synchronization after construction completes.

Practical:
Demonstrate immutable class safe publication without `synchronized`.

## Key Concepts

- HB relation formal rules
- CPU/JVM reordering freedom
- Safe publication guarantees
- `volatile` for double-checked locking
- `final` for immutable class safety

## Hands-on Coding

```java
// Correct double-checked locking
public class Singleton {
    private static volatile Singleton instance;  // volatile required

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();  // volatile write happens-before next read
                }
            }
        }
        return instance;
    }
}

// Safe immutable publication via final fields
public final class ImmutablePoint {
    final int x;
    final int y;

    ImmutablePoint(int x, int y) { this.x = x; this.y = y; }
    // No synchronization needed for sharing — final guarantees visibility
}
```

## Mini Exercise

Identify the HB chain that guarantees a `CompletableFuture.get()` caller sees all changes made by the `supplyAsync` computation.

## Assessment Quiz

1. What is the happens-before rule for `volatile`?
2. Why is DCL broken without `volatile`?
3. Do `final` fields need `synchronized` to publish safely?

Answers:

1. A volatile write to field X happens-before any subsequent volatile read of X.
2. Without `volatile`, partially constructed object may be observed by another thread.
3. No — JMM guarantees `final` fields written in constructor are visible after construction.

## Task

- Review your Day 45 `SafeCounter` — draw its happens-before graph and verify correctness.

## Day 82 Outcome

You can reason about visibility and ordering in concurrent Java code using the JMM happens-before rules.
