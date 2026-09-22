---
title: Garbage Collection Algorithms and Advanced JVM Command-Line Tuning
slug: day-087-garbage-collection-algorithms-and-advanced-jvm-command-line-tuning
dayLabel: Day 87
level: Advanced
estimatedMinutes: 60
order: 87
track: java
---
# Day 87 [Advanced]: Garbage Collection Algorithms and Advanced JVM Command-Line Tuning

## Goal

Understand JVM GC algorithms, tune GC behaviour with `-XX` flags, and use unified logging (`-Xlog`) for diagnostics — without relying on any GUI tool.

## Prerequisites

- Day 86 complete

## Explanation

Expert Java engineers can sit at a raw Linux terminal, launch a JVM with the right flags, and diagnose GC behaviour from log output alone. This day builds that skill.

## Topic by Topic

### Topic 1: GC fundamentals — heap regions

Theory:
Young gen (Eden + Survivors) for short-lived objects; Old gen for long-lived; Metaspace for class metadata.

Practical:
Draw the heap layout; trace minor GC → major GC → Full GC path.

### Topic 2: G1GC — region-based collector

Theory:
G1 divides heap into equal regions; mixes concurrent marking with evacuation; targets pause time goal.

Practical:
Configure G1 with `-XX:MaxGCPauseMillis=200`.

### Topic 3: ZGC and Shenandoah — ultra-low pause

Theory:
ZGC: sub-millisecond pauses, concurrent compaction, load barriers. Shenandoah: region-based, concurrent evacuation.

Practical:
Enable ZGC: `-XX:+UseZGC`; measure pause times vs G1 for same workload.

### Topic 4: Key `-XX` tuning flags

Theory:
`-Xms`, `-Xmx`, `-XX:NewRatio`, `-XX:MaxGCPauseMillis`, `-XX:+UnlockDiagnosticVMOptions`, `-XX:+PrintAssembly`.

Practical:
Set heap 2GB fixed: `-Xms2g -Xmx2g`; set 25% young gen: `-XX:NewRatio=3`.

### Topic 5: Unified JVM logging with `-Xlog`

Theory:
`-Xlog:gc*:file=gc.log:time,uptime,level,tags:filecount=5,filesize=20m` — full GC diagnostic log.

Practical:
Capture GC log; find longest pause; identify root cause (allocation rate vs old gen pressure).

## Key Concepts

- Young/Old/Metaspace layout
- G1GC pause target vs throughput
- ZGC concurrent compaction
- Critical `-XX` flags without GUI
- `-Xlog` for GC diagnostics

## Hands-on Coding

```bash
# G1 with pause target + GC logging
java \
  -Xms512m -Xmx512m \
  -XX:+UseG1GC \
  -XX:MaxGCPauseMillis=100 \
  -Xlog:gc*:file=gc.log:time,uptime,level,tags:filecount=3,filesize=10m \
  -jar app.jar

# ZGC
java \
  -XX:+UseZGC \
  -Xms1g -Xmx1g \
  -Xlog:gc:file=zgc.log:time \
  -jar app.jar

# Diagnostic — print JIT assembly for one method
java \
  -XX:+UnlockDiagnosticVMOptions \
  -XX:+PrintCompilation \
  -jar app.jar
```

```java
// GC pressure generator for testing
import java.util.*;
public class GCStress {
    public static void main(String[] args) throws InterruptedException {
        List<byte[]> store = new ArrayList<>();
        for (int i = 0; i < 10_000; i++) {
            store.add(new byte[10_240]);  // 10KB allocations
            if (store.size() > 500) store.subList(0, 100).clear();
            Thread.sleep(1);
        }
    }
}
```

## Mini Exercise

Run `GCStress` with G1 and ZGC; compare `gc.log` pause times.

## Assessment Quiz

1. What triggers a full GC?
2. What is the pause target for G1?
3. Flag to enable ZGC?

Answers:

1. Concurrent marking can't finish before old gen fills; explicit `System.gc()`.
2. `-XX:MaxGCPauseMillis` (default 200ms).
3. `-XX:+UseZGC`.

## Task

- Tune the Day 60 banking project heap and GC; capture GC log; ensure no pause > 200ms.

## Day 87 Outcome

You can tune JVM GC from the command line and diagnose GC behaviour from log output without GUI tools.
