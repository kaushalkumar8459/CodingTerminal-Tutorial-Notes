---
title: JVM Internals — Runtime Data Areas and Execution Engine
slug: day-091-jvm-internals-runtime-data-areas-and-execution-engine
dayLabel: Day 91
level: Expert
estimatedMinutes: 60
order: 91
track: java
---
# Day 91 [Expert]: JVM Internals — Runtime Data Areas and Execution Engine

## Goal

Understand the internal structure of the JVM: runtime data areas, execution engine, and how bytecode becomes native execution.

## Prerequisites

- Day 90 complete
- Day 63 (bytecode basics) complete

## Explanation

Every JVM optimisation decision — from GC tuning to JIT flags — makes more sense when you understand what the JVM is managing internally. This is the foundation of expert-level JVM reasoning.

## Topic by Topic

### Topic 1: Runtime data areas

Theory:

- **Method Area** (Metaspace in HotSpot): class metadata, static fields, constant pool
- **Heap**: objects and arrays — GC's domain
- **JVM Stacks**: per-thread; holds frames
- **Frame**: local variable array, operand stack, frame data
- **PC Register**: per-thread; tracks current instruction
- **Native Method Stack**: for JNI calls

Practical:
Map each data area to a concrete runtime element in a sample program.

### Topic 2: Class loading pipeline

Theory:
Loading → Linking (Verify + Prepare + Resolve) → Initialisation.

Practical:
Observe `static` initializer timing with `Class.forName` vs first field access.

### Topic 3: Interpreter, C1 and C2 compilers

Theory:
Execution path: interpret → profile → C1 (client compiler, fast compile) → C2 (server compiler, aggressive optimisation). Tiered compilation uses all three.

Practical:
Use `-XX:+PrintCompilation` to see methods moving through tiers.

### Topic 4: Safepoints

Theory:
JVM can only stop threads for GC / deoptimisation at safepoint locations (loop back edges, method returns). Thread-local safepoint flag.

Practical:
Explain why a tight loop with no safepoints can delay GC pauses.

### Topic 5: Deoptimisation

Theory:
When speculative optimisation assumption breaks (e.g., new class loaded), JIT deoptimises — falls back to interpreter.

Practical:
Add a second implementor class; observe deoptimisation of previous devirtualised call.

## Key Concepts

- Method area / heap / stack per-thread separation
- Frame structure: operand stack + local vars
- Tiered compilation path
- Safepoints and their timing
- Deoptimisation triggers

## Hands-on Coding

```java
// Observer of class loading and initialization
public class LoadingDemo {
    static class Lazy {
        static {
            System.out.println("Lazy initialized at: " + System.nanoTime());
        }
        static final int VALUE = 42;
    }

    public static void main(String[] args) throws Exception {
        System.out.println("Before access");
        int v = Lazy.VALUE;    // triggers initialization
        System.out.println("After access: " + v);
    }
}
```

```bash
# Watch JIT compilation tiers
java -XX:+PrintCompilation -XX:+UnlockDiagnosticVMOptions \
     -XX:+PrintInlining Main 2>&1 | head -50
```

## Mini Exercise

Draw the complete JVM data area diagram showing which areas are per-JVM vs per-thread.

## Assessment Quiz

1. Which data area is GC'd?
2. What triggers deoptimisation?
3. What is a safepoint?

Answers:

1. Heap (and Metaspace for class unloading).
2. Speculative assumption violated — new class loaded; type changed.
3. A point in execution where JVM threads can be suspended safely.

## Task

- Enable `-XX:+PrintCompilation` on Day 85 benchmark; identify which methods reach C2.

## Day 91 Outcome

You understand JVM execution mechanics deeply enough to reason about any JVM-level behaviour.
