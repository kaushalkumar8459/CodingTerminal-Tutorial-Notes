---
title: Thread Dump Analysis and Deadlock Diagnostics
slug: day-083-thread-dump-analysis-and-deadlock-diagnostics
dayLabel: Day 83
level: Advanced
estimatedMinutes: 55
order: 83
track: java
---
# Day 83 [Advanced]: Thread Dump Analysis and Deadlock Diagnostics

## Goal

Generate and interpret thread dumps to diagnose deadlocks, livelocks, thread starvation, and excessive blocking.

## Prerequisites

- Day 82 complete

## Explanation

Thread dumps are the primary diagnostic tool for production threading issues. An expert Java engineer can read a thread dump and identify the root cause of a hung JVM in minutes.

## Topic by Topic

### Topic 1: Generating thread dumps

Theory:
`kill -3 <pid>` on Linux; `jstack <pid>`; `jcmd <pid> Thread.print`; programmatically via `ThreadMXBean`.

Practical:
Capture thread dump from running JVM in three ways.

### Topic 2: Thread dump anatomy

Theory:
Thread name, state, priority, daemon flag, stack trace, lock info (`locked`, `waiting to lock`).

Practical:
Annotate a sample thread dump — identify blocked, runnable, and waiting threads.

### Topic 3: Identifying deadlock

Theory:
Two threads each waiting for a lock held by the other. `jstack` reports "Found one Java-level deadlock".

Practical:
Create a deadlock; capture dump; read the deadlock report.

### Topic 4: Identifying thread starvation and contention

Theory:
Many threads in `BLOCKED` state on the same lock signal contention. `WAITING` on `park` may indicate starvation.

Practical:
Identify a hot-lock bottleneck from a sample dump.

### Topic 5: `ThreadMXBean` programmatic detection

Theory:
`findDeadlockedThreads()` returns thread IDs in deadlock; `getThreadInfo` gives full stack.

Practical:
Write a scheduled task that checks for deadlocks every 30 seconds.

## Key Concepts

- Thread state machine in dumps
- `jstack` / `jcmd` / `kill -3`
- Deadlock detection in dump
- Contention identification
- Programmatic deadlock monitor

## Hands-on Coding

```java
// Deliberate deadlock for analysis
public class DeadlockDemo {
    static final Object LOCK_A = new Object();
    static final Object LOCK_B = new Object();

    public static void main(String[] args) {
        Thread t1 = new Thread(() -> {
            synchronized (LOCK_A) {
                try { Thread.sleep(100); } catch (InterruptedException e) {}
                synchronized (LOCK_B) { System.out.println("T1 done"); }
            }
        }, "Thread-Alpha");

        Thread t2 = new Thread(() -> {
            synchronized (LOCK_B) {
                try { Thread.sleep(100); } catch (InterruptedException e) {}
                synchronized (LOCK_A) { System.out.println("T2 done"); }
            }
        }, "Thread-Beta");

        t1.start();
        t2.start();
    }
}
```

```java
// Programmatic deadlock checker
import java.lang.management.*;

public class DeadlockMonitor {
    static void check() {
        ThreadMXBean mx = ManagementFactory.getThreadMXBean();
        long[] ids = mx.findDeadlockedThreads();
        if (ids != null) {
            ThreadInfo[] info = mx.getThreadInfo(ids, true, true);
            for (ThreadInfo ti : info) {
                System.err.println("DEADLOCK: " + ti.getThreadName());
                for (StackTraceElement e : ti.getStackTrace()) {
                    System.err.println("  " + e);
                }
            }
        }
    }
}
```

## Mini Exercise

Create a 3-thread circular deadlock (A→B→C→A); capture dump; identify all three threads.

## Assessment Quiz

1. What thread state means "waiting for monitor"?
2. Command to take thread dump without killing the process?
3. What is livelock?

Answers:

1. `BLOCKED`.
2. `jstack <pid>` or `jcmd <pid> Thread.print`.
3. Threads keep changing state in response to each other but make no progress.

## Task

- Add `DeadlockMonitor` as a scheduled `ScheduledExecutorService` task in your Day 60 project.

## Day 83 Outcome

You can diagnose threading issues in production JVMs using thread dumps and programmatic detection.
