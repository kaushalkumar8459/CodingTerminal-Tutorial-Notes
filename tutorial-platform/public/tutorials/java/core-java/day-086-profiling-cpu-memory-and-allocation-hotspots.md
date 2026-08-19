---
title: Profiling CPU, Memory, and Allocation Hotspots
slug: day-086-profiling-cpu-memory-and-allocation-hotspots
dayLabel: Day 86
level: Advanced
estimatedMinutes: 55
order: 86
track: java
---
# Day 86 [Advanced]: Profiling CPU, Memory, and Allocation Hotspots

## Goal

Use Java Flight Recorder, async-profiler, and heap analysis to identify and fix CPU and memory hotspots in production-like applications.

## Prerequisites

- Day 85 complete

## Explanation

Profiling finds the real bottleneck — not the one you guessed. An expert avoids optimising without data. This day teaches the workflow: record → analyse → change → verify.

## Topic by Topic

### Topic 1: Java Flight Recorder (JFR)

Theory:
Built-in low-overhead profiler (< 1% overhead in production). Records CPU, allocations, GC, locks, I/O.

Practical:
Start JFR with `jcmd <pid> JFR.start`; dump with `JFR.dump`; open in JDK Mission Control.

### Topic 2: CPU profiling — flame graphs

Theory:
Flame graph shows cumulative time by call stack. Wide bars = hot methods.

Practical:
Run async-profiler on a CPU-intensive task; find the hot method.

### Topic 3: Allocation profiling

Theory:
TLAB-sampled allocation profiling shows which call sites create most garbage.

Practical:
Find the top 3 allocation sites in your stream pipeline via JFR.

### Topic 4: Heap analysis with heap dumps

Theory:
`jmap -dump:live,format=b,file=heap.hprof <pid>`; open in VisualVM or Eclipse MAT; find dominant retained objects.

Practical:
Create a memory leak demo; capture heap; identify leaking collection.

### Topic 5: Performance optimisation workflow

Theory:
Measure baseline → profile → find hotspot → change one thing → measure again → verify improvement.

Practical:
Apply one change from profiling; re-benchmark with JMH to confirm gain.

## Key Concepts

- JFR as production-safe profiler
- Flame graph interpretation
- Allocation vs CPU hotspot distinction
- Heap dump and retained heap
- Hypothesis-driven optimisation loop

## Hands-on Coding

```bash
# JFR via jcmd
jcmd <pid> JFR.start name=profile duration=60s filename=recording.jfr settings=profile
jcmd <pid> JFR.dump name=profile filename=recording.jfr

# async-profiler CPU flame graph
./profiler.sh -d 30 -f flamegraph.html <pid>

# Heap dump
jmap -dump:live,format=b,file=heap.hprof <pid>

# Programmatic JFR recording
import jdk.jfr.*;

var config = Configuration.getConfiguration("profile");
try (var recording = new Recording(config)) {
    recording.start();
    Thread.sleep(10_000);
    recording.dump(Path.of("recording.jfr"));
}
```

## Mini Exercise

Add a string concatenation loop that creates 1M objects; profile allocation; fix with `StringBuilder`.

## Assessment Quiz

1. JFR overhead in production?
2. What does a wide bar in a flame graph mean?
3. Difference between heap size and retained heap?

Answers:

1. Typically < 1%.
2. That method (and its callees) takes a large share of CPU time.
3. Heap size: object's own bytes; retained heap: bytes freed if object is GC'd including all exclusively referenced objects.

## Task

- Profile your Day 30 mini project; find the top CPU method and top allocation site.

## Day 86 Outcome

You can systematically profile JVM applications and drive optimisations with data.
