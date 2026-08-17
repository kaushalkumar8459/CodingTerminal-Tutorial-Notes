---
title: Escape Analysis, Inlining, JIT Optimization Signals, and Vector API (SIMD Basics)
slug: day-088-escape-analysis-inlining-jit-optimization-signals-and-vector-api-simd-basics
dayLabel: Day 88
level: Advanced
estimatedMinutes: 60
order: 88
track: java
---
# Day 88 [Advanced]: Escape Analysis, Inlining, JIT Optimization Signals, and Vector API (SIMD Basics)

## Goal

Understand how JIT optimises your code, how to write JIT-friendly Java, and how the Vector API expresses SIMD computations for high-performance number crunching.

## Prerequisites

- Day 87 complete

## Explanation

The JIT compiler is one of Java's biggest strengths — but only if you write code it can optimise. Escape analysis, inlining, and stack allocation are all JIT decisions that affect allocation rate and throughput. The Vector API lets you go further by explicitly targeting SIMD hardware.

## Topic by Topic

### Topic 1: Escape analysis and stack allocation

Theory:
If an object does not escape the method, JIT can allocate it on the stack (or eliminate it) instead of heap — zero GC pressure.

Practical:
Write a hot method that creates a helper object; verify via JFR allocation profiler that it produces zero allocations at steady state.

### Topic 2: Method inlining

Theory:
JIT inlines small methods at call sites — eliminates call overhead. Threshold: ~35 bytecode bytes. `@ForceInline` is a hint.

Practical:
Use `-XX:+PrintInlining` to see which methods JIT inlines.

### Topic 3: Devirtualisation

Theory:
JIT speculatively devirtualises virtual calls when only one implementation is loaded.

Practical:
Observe megamorphic call site (many impl classes) preventing devirtualisation.

### Topic 4: Writing JIT-friendly Java

Theory:

- Keep hot methods small
- Avoid excessive object churn in hot path
- Prefer final classes for devirtualisation
- Avoid synchronized in hot path

Practical:
Refactor one hot-path method from Day 85 to improve JIT score.

### Topic 5: Vector API for SIMD (Java 21 incubating)

Theory:
`FloatVector`, `VectorSpecies` express operations that compile to SIMD instructions (`VADDPS`, `VMULPS`). Single instruction processes N floats simultaneously.

Practical:
Add two float arrays element-wise; compare scalar loop vs Vector API throughput via JMH.

## Key Concepts

- Escape analysis → stack allocation / scalar replacement
- Inlining size budget
- Devirtualisation preconditions
- JIT-friendly code patterns
- Vector API: species, operations, SIMD mapping

## Hands-on Coding

```java
import jdk.incubator.vector.*;

public class VectorAdd {
    static final VectorSpecies<Float> SPECIES = FloatVector.SPECIES_256;

    static float[] addScalar(float[] a, float[] b) {
        float[] result = new float[a.length];
        for (int i = 0; i < a.length; i++) result[i] = a[i] + b[i];
        return result;
    }

    static float[] addVector(float[] a, float[] b) {
        float[] result = new float[a.length];
        int i = 0;
        int upperBound = SPECIES.loopBound(a.length);
        for (; i < upperBound; i += SPECIES.length()) {
            FloatVector va = FloatVector.fromArray(SPECIES, a, i);
            FloatVector vb = FloatVector.fromArray(SPECIES, b, i);
            va.add(vb).intoArray(result, i);
        }
        for (; i < a.length; i++) result[i] = a[i] + b[i]; // tail
        return result;
    }
}
```

## Mini Exercise

Implement element-wise multiply using Vector API; benchmark vs scalar with JMH.

## Assessment Quiz

1. What is stack allocation via escape analysis?
2. Why is a megamorphic call site slow?
3. What does `FloatVector.SPECIES_256` represent?

Answers:

1. Object allocated on stack frame — freed on return, not GC'd.
2. JIT cannot devirtualise; must use vtable dispatch every time.
3. A 256-bit SIMD lane holding 8 floats simultaneously.

## Task

- Identify one hotspot in Day 85 benchmark; apply inlining and SIMD hints; measure improvement.

## Day 88 Outcome

You understand JIT internals well enough to write JIT-friendly code and use SIMD via the Vector API.
