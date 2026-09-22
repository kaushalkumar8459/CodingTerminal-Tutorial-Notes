---
title: Benchmarking with JMH and Performance Methodology
slug: day-085-benchmarking-with-jmh-and-performance-methodology
dayLabel: Day 85
level: Advanced
estimatedMinutes: 60
order: 85
track: java
---
# Day 85 [Advanced]: Benchmarking with JMH and Performance Methodology

## Goal

Write reliable microbenchmarks using JMH, avoid classic JIT pitfalls, and interpret results with statistical rigour.

## Prerequisites

- Day 84 complete

## Explanation

Naive microbenchmarks in Java are almost always wrong. JIT warm-up, dead code elimination, and constant folding all invalidate simple timing loops. JMH (Java Microbenchmark Harness) is the authoritative tool — used by JDK engineers themselves.

## Topic by Topic

### Topic 1: Why naive benchmarks lie

Theory:
JIT warms up over iterations; dead code is eliminated if result is unused; branch prediction skews small loops.

Practical:
Write a naive `System.nanoTime` benchmark and compare to JMH for the same task.

### Topic 2: JMH setup

Theory:
Maven/Gradle plugin; `@Benchmark` annotation; run as uber-JAR for reproducibility.

Practical:
Add JMH dependency and generate benchmark project skeleton.

### Topic 3: Core JMH annotations

Theory:
`@Benchmark`, `@BenchmarkMode`, `@OutputTimeUnit`, `@Warmup`, `@Measurement`, `@Fork`, `@State`.

Practical:
Write a benchmark comparing `HashMap.get` vs `TreeMap.get`.

### Topic 4: `Blackhole` for dead code prevention

Theory:
`Blackhole.consume(result)` tells JIT the value is used; prevents dead-code elimination.

Practical:
Benchmark a computation; observe score collapse without `Blackhole`; fix it.

### Topic 5: Interpreting results

Theory:
Ops/s vs ns/op; error bars; coefficient of variation; warming iterations must be sufficient.

Practical:
Compare `ArrayList` vs `LinkedList` iteration — read results table and draw conclusions.

## Key Concepts

- JIT warm-up and steady state
- Dead code elimination prevention with `Blackhole`
- `@Fork` for JVM isolation
- Statistical result interpretation
- Benchmark pitfalls checklist

## Hands-on Coding

```java
import org.openjdk.jmh.annotations.*;
import org.openjdk.jmh.infra.Blackhole;
import java.util.concurrent.TimeUnit;
import java.util.*;

@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@Warmup(iterations = 5, time = 1)
@Measurement(iterations = 10, time = 1)
@Fork(2)
@State(Scope.Benchmark)
public class CollectionBenchmark {
    List<Integer> arrayList;
    List<Integer> linkedList;

    @Setup
    public void setup() {
        arrayList  = new ArrayList<>();
        linkedList = new LinkedList<>();
        for (int i = 0; i < 10_000; i++) {
            arrayList.add(i);
            linkedList.add(i);
        }
    }

    @Benchmark
    public void iterateArrayList(Blackhole bh) {
        for (int v : arrayList) bh.consume(v);
    }

    @Benchmark
    public void iterateLinkedList(Blackhole bh) {
        for (int v : linkedList) bh.consume(v);
    }
}
```

```bash
mvn clean package
java -jar target/benchmarks.jar -f 1
```

## Mini Exercise

Benchmark `String +` concatenation vs `StringBuilder` in a 100-iteration loop.

## Assessment Quiz

1. What is JIT warm-up?
2. Why use `@Fork(2)`?
3. What does `Blackhole.consume` prevent?

Answers:

1. Period during which JIT compiles and optimises hot methods — results before warm-up are unreliable.
2. Two independent JVM forks isolate JIT state — reduces measurement noise.
3. Dead code elimination of computed values JIT deems unused.

## Task

- Benchmark your Day 39 stream pipeline vs equivalent for-loop; interpret the result.

## Day 85 Outcome

You can write reliable microbenchmarks using JMH and draw statistically sound performance conclusions.
