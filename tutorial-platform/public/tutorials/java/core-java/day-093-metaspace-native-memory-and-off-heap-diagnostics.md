---
title: Metaspace, Native Memory, and Off-Heap Diagnostics
slug: day-093-metaspace-native-memory-and-off-heap-diagnostics
dayLabel: Day 93
level: Expert
estimatedMinutes: 55
order: 93
track: java
---
# Day 93 [Expert]: Metaspace, Native Memory, and Off-Heap Diagnostics

## Goal

Understand Metaspace growth, native memory usage, and diagnose off-heap memory issues that heap monitoring misses.

## Prerequisites

- Day 92 complete

## Explanation

A Java process uses far more memory than its heap. Metaspace, JIT code cache, thread stacks, NIO buffers, and Unsafe/Panama allocations all live outside the heap. Ignoring them causes mysterious OOM kills by the Linux OOM killer.

## Topic by Topic

### Topic 1: Metaspace overview

Theory:
Stores class metadata; grows until `-XX:MaxMetaspaceSize`; triggers GC when threshold reached; uncapped by default.

Practical:
Generate a classloading leak; observe Metaspace growth with `jcmd <pid> VM.native_memory`.

### Topic 2: Native Memory Tracking (NMT)

Theory:
`-XX:NativeMemoryTracking=summary` enables per-category native memory tracking via `jcmd`.

Practical:
Run `jcmd <pid> VM.native_memory summary`; identify top memory consumers.

### Topic 3: JIT code cache

Theory:
Compiled code lives in code cache (default 240MB); `-XX:ReservedCodeCacheSize`; full code cache degrades to interpreter.

Practical:
Monitor with `jstat -gcutil -compiler <pid>`; observe code cache occupancy.

### Topic 4: Direct buffers and off-heap

Theory:
`ByteBuffer.allocateDirect`, `MappedByteBuffer`, and Panama `MemorySegment` allocate outside heap. Tracked in NMT under "Internal".

Practical:
Allocate 500MB of direct buffers; observe NMT Internal increase; verify heap unchanged.

### Topic 5: Diagnosing OOM outside heap

Theory:
`-XX:+HeapDumpOnOutOfMemoryError` only captures heap OOM. Native OOM requires NMT + `/proc/<pid>/maps` on Linux.

Practical:
Reproduce a Metaspace OOM; read the JVM error log; identify leak source.

## Key Concepts

- Metaspace vs PermGen (removed in Java 8)
- NMT categories: Java heap, Metaspace, Code, Thread, Internal
- Code cache flush risk
- Direct buffer lifecycle
- Native OOM diagnosis workflow

## Hands-on Coding

```bash
# Enable NMT and inspect
java -XX:NativeMemoryTracking=summary \
     -XX:MaxMetaspaceSize=128m \
     -jar app.jar &

PID=$!
sleep 5
jcmd $PID VM.native_memory summary

# Baseline then diff
jcmd $PID VM.native_memory baseline
sleep 30
jcmd $PID VM.native_memory summary.diff
```

```java
// Direct buffer allocation (off-heap)
import java.nio.ByteBuffer;

public class DirectBufferDemo {
    public static void main(String[] args) throws InterruptedException {
        ByteBuffer buf = ByteBuffer.allocateDirect(100 * 1024 * 1024); // 100MB off-heap
        System.out.println("Allocated 100MB direct buffer");
        Thread.sleep(30_000);   // keep alive for NMT inspection
    }
}
```

## Mini Exercise

Attach `jcmd VM.native_memory` to a running process; identify which component uses the most native memory.

## Assessment Quiz

1. Is Metaspace on the heap?
2. What flag caps Metaspace size?
3. How to detect a classloading leak?

Answers:

1. No — it's native memory, outside the Java heap.
2. `-XX:MaxMetaspaceSize=<size>`.
3. Watch Metaspace growth via NMT or JFR; classes never unloaded if ClassLoader is still reachable.

## Task

- Profile Day 62 custom ClassLoader for Metaspace growth when loading the same class repeatedly.

## Day 93 Outcome

You can diagnose and fix memory issues that are completely invisible to heap monitoring alone.
