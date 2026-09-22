---
title: Multithreading Basics Thread Runnable and Lifecycle
slug: day-044-multithreading-basics-thread-runnable-and-lifecycle
dayLabel: Day 44
level: Intermediate
estimatedMinutes: 50
order: 44
track: java
---
# Day 44 [Intermediate]: Multithreading Basics Thread Runnable and Lifecycle

## Goal

Create threads, understand the thread lifecycle, and choose between `Thread` and `Runnable`.

## Prerequisites

- Day 43 complete

## Explanation

Multithreading allows concurrent execution. Java models threads with the `Thread` class and schedules them via the JVM/OS.

## Topic by Topic

### Topic 1: Creating threads — two approaches

Theory:

1. Extend `Thread` and override `run()`
2. Implement `Runnable` and pass to `Thread` (preferred — decouples task from thread)

Practical:
Create same counter task both ways.

### Topic 2: Thread lifecycle

Theory:
NEW → RUNNABLE → RUNNING → BLOCKED/WAITING/TIMED_WAITING → TERMINATED

Practical:
Print thread state at each phase.

### Topic 3: `start()` vs `run()`

Theory:
`start()` creates new OS thread; `run()` runs on calling thread.

Practical:
Call both and observe which thread name is printed.

### Topic 4: `sleep`, `join`, `interrupt`

Theory:
`sleep` pauses current thread; `join` waits for another to finish; `interrupt` signals.

Practical:
Launch background task; join before printing result.

### Topic 5: Thread naming and daemon threads

Theory:
Name threads for debugging; daemon threads die when main exits.

Practical:
Set thread name; observe daemon thread stopping with main.

## Key Concepts

- Task vs thread separation
- Thread state machine
- `start()` not `run()`
- `join` for coordination
- Daemon vs user threads

## Hands-on Coding

```java
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Runnable counter = () -> {
            String name = Thread.currentThread().getName();
            for (int i = 1; i <= 3; i++) {
                System.out.println(name + " -> " + i);
                try { Thread.sleep(100); } catch (InterruptedException e) {
                    Thread.currentThread().interrupt(); return;
                }
            }
        };

        Thread t1 = new Thread(counter, "Worker-1");
        Thread t2 = new Thread(counter, "Worker-2");

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println("Both threads finished");
    }
}
```

## Mini Exercise

Create 3 threads each printing their name 5 times with 50ms sleep; join all before final message.

## Assessment Quiz

1. Why prefer `Runnable` over extending `Thread`?
2. What is a daemon thread?
3. What happens if you call `run()` instead of `start()`?

Answers:

1. Single inheritance limit; separates task logic from threading concern.
2. Background thread that terminates when all user threads end.
3. Runs synchronously on calling thread — no new thread created.

## Task

- Simulate file download with 3 concurrent threads each printing progress.

## Day 44 Outcome

You can create and coordinate threads correctly with proper lifecycle understanding.
