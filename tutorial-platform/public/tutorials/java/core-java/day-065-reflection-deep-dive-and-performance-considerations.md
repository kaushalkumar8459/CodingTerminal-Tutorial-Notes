---
title: Reflection Deep Dive and Performance Considerations
slug: day-065-reflection-deep-dive-and-performance-considerations
dayLabel: Day 65
level: Advanced
estimatedMinutes: 55
order: 65
track: java
---
# Day 65 [Advanced]: Reflection Deep Dive and Performance Considerations

## Goal

Use advanced Reflection capabilities and understand when to cache, avoid, or replace reflection with alternatives.

## Prerequisites

- Day 64 complete
- Day 49 (reflection basics) complete

## Explanation

Reflection is powerful but expensive. Advanced usage — dynamic proxies, generic type resolution — appears in every major Java framework. Knowing the performance cost guides architectural decisions.

## Topic by Topic

### Topic 1: Generic type resolution at runtime

Theory:
Type erasure removes `<T>` at runtime, but `ParameterizedType` preserves it in field/method signatures.

Practical:
Read `List<String>` actual type argument from a field via reflection.

### Topic 2: Dynamic proxies

Theory:
`Proxy.newProxyInstance` creates a runtime implementation of interfaces; used by Spring AOP, JDK proxies.

Practical:
Wrap `UserService` with a logging proxy without changing the class.

### Topic 3: `MethodHandles` — reflection replacement

Theory:
`java.lang.invoke.MethodHandle` is faster than reflective `Method.invoke` and JIT-friendly.

Practical:
Invoke a private method via `MethodHandles.privateLookupIn`.

### Topic 4: Performance benchmarking

Theory:
Direct call → MethodHandle → cached `Method` → uncached `Method.invoke` in descending performance.

Practical:
Use JMH (preview) to measure overhead of each approach for 1M invocations.

### Topic 5: When to avoid reflection

Theory:
Prefer code generation (APT), `MethodHandle`, or records/sealed classes over heavy runtime reflection in hot paths.

Practical:
Replace a reflective field setter loop with generated code.

## Key Concepts

- `ParameterizedType` for generic introspection
- Dynamic proxy pattern
- `MethodHandle` vs `Method.invoke`
- Reflection caching strategy
- Performance-aware decision making

## Hands-on Coding

```java
import java.lang.reflect.*;
import java.lang.invoke.*;

interface Greeter { String greet(String name); }

public class Main {
    // Dynamic proxy — logging wrapper
    static Greeter loggingProxy(Greeter real) {
        return (Greeter) Proxy.newProxyInstance(
            real.getClass().getClassLoader(),
            new Class[]{Greeter.class},
            (proxy, method, args) -> {
                System.out.println("Calling: " + method.getName());
                Object result = method.invoke(real, args);
                System.out.println("Returned: " + result);
                return result;
            });
    }

    // MethodHandle — faster than Method.invoke
    static void methodHandleDemo() throws Throwable {
        MethodHandles.Lookup lookup = MethodHandles.lookup();
        MethodHandle mh = lookup.findVirtual(String.class, "toUpperCase",
            MethodType.methodType(String.class));
        System.out.println((String) mh.invokeExact("hello"));
    }

    public static void main(String[] args) throws Throwable {
        Greeter proxy = loggingProxy(name -> "Hello " + name);
        proxy.greet("Asha");
        methodHandleDemo();
    }
}
```

## Mini Exercise

Build a generic `DeepCopier<T>` using reflection that copies all fields to a new instance.

## Assessment Quiz

1. Why does type erasure happen?
2. What makes `MethodHandle` faster than `Method.invoke`?
3. When is a dynamic proxy useful?

Answers:

1. Backward compatibility with pre-generics JVM bytecode.
2. JIT can inline MethodHandle call sites; `Method.invoke` boxes args and goes through security checks.
3. Cross-cutting concerns (logging, tracing, security) on interface-based components.

## Task

- Write a JSON-serializer using reflection that handles nested objects.

## Day 65 Outcome

You can apply advanced reflection techniques and choose the right tool based on performance requirements.
