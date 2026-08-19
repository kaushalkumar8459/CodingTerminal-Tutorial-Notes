---
title: Garbage Collector Deep Dive — G1, ZGC, Shenandoah Tradeoffs
slug: day-092-garbage-collector-deep-dive-g1-zgc-shenandoah-tradeoffs
dayLabel: Day 92
level: Expert
estimatedMinutes: 60
order: 92
track: java
---
# Day 92 [Expert]: Garbage Collector Deep Dive — G1, ZGC, Shenandoah Tradeoffs

## Goal

Understand each major GC algorithm in depth, read GC logs at expert level, and make informed production GC selection decisions.

## Prerequisites

- Day 91 complete
- Day 87 (GC tuning basics) complete

## Explanation

Choosing the wrong GC or misconfiguring it is one of the most common sources of production latency spikes. This day goes beyond the flags into the internal algorithms.

## Topic by Topic

### Topic 1: G1GC deep dive

Theory:
Region-based heap (1–32MB regions); remembered sets track cross-region references; mixed collections include old regions; humongous objects go directly to old.

Practical:
Read G1 GC log; identify Eden evacuation, mixed collection, and humongous allocation entries.

### Topic 2: G1 tuning knobs

Theory:
`-XX:G1HeapRegionSize`, `-XX:G1NewSizePercent`, `-XX:G1MixedGCLiveThresholdPercent`, `-XX:G1ReservePercent`.

Practical:
Tune for a scenario: 4GB heap, latency-sensitive, mostly young gen traffic.

### Topic 3: ZGC internals

Theory:
Load barriers on every pointer read; concurrent relocation; colored pointers encode GC state. Sub-ms pauses even for TB heaps.

Practical:
Run workload under ZGC; compare p99 pause time to G1 from the GC log.

### Topic 4: Shenandoah internals

Theory:
Brooks indirection pointers; concurrent evacuation without load barriers on reads; region-based like G1.

Practical:
Enable Shenandoah with `-XX:+UseShenandoahGC`; measure throughput vs ZGC.

### Topic 5: Production GC selection framework

Theory:

- Latency-critical (trading, gaming): ZGC or Shenandoah
- Balanced (web services): G1 with tuned pause target
- Throughput-first (batch jobs): Parallel GC
- Large heaps (> 32GB): ZGC

Practical:
Choose and justify GC for three different production scenarios.

## Key Concepts

- G1 region structure and remembered sets
- Concurrent marking phases
- ZGC load barriers and colored pointers
- Shenandoah Brooks pointer
- Latency vs throughput vs memory overhead tradeoffs

## Hands-on Coding

```bash
# G1 with detailed logging
java -XX:+UseG1GC \
     -Xms1g -Xmx1g \
     -XX:MaxGCPauseMillis=50 \
     -XX:G1HeapRegionSize=4m \
     -Xlog:gc+phases=debug:file=g1.log:time,uptime \
     -jar app.jar

# ZGC with pause stats
java -XX:+UseZGC \
     -Xms1g -Xmx1g \
     -Xlog:gc*:file=zgc.log:time,uptime \
     -jar app.jar

# Compare p99 pause
grep "GC pause" g1.log | awk '{print $NF}' | sort -n | tail -5
grep "Pause" zgc.log | awk '{print $NF}' | sort -n | tail -5
```

## Mini Exercise

Produce a GC log with G1 that contains at least one humongous allocation warning; explain why it occurred.

## Assessment Quiz

1. What are humongous objects in G1?
2. How does ZGC achieve sub-millisecond pauses?
3. When is Parallel GC the right choice?

Answers:

1. Objects ≥ 50% of a region — go directly to old gen, bypassing young.
2. Concurrent relocation: objects moved while application runs via load barriers.
3. Batch processing where throughput matters and pauses are acceptable.

## Task

- Run Day 87 GCStress under G1, ZGC, and Parallel; compare p50/p99 pause times from logs.

## Day 92 Outcome

You can select, configure, and read GC logs for all major JVM collectors with expert precision.
