---
title: Class Loaders Delegation Model and Custom Loaders
slug: day-062-class-loaders-delegation-model-and-custom-loaders
dayLabel: Day 62
level: Advanced
estimatedMinutes: 55
order: 62
track: java
---
# Day 62 [Advanced]: Class Loaders Delegation Model and Custom Loaders

## Goal

Understand how JVM loads classes, trace the delegation chain, and write a custom ClassLoader.

## Prerequisites

- Day 61 complete

## Explanation

ClassLoaders find and load `.class` bytecode into the JVM. The delegation model prevents duplicate or conflicting class definitions. Custom loaders enable hot-reload, sandboxing, and plugin systems.

## Topic by Topic

### Topic 1: ClassLoader hierarchy

Theory:
Bootstrap CL → Platform CL → Application CL. Each delegates to parent before loading itself.

Practical:
Print `getClass().getClassLoader()` chain for `String`, `ArrayList`, and your own class.

### Topic 2: Delegation model

Theory:
Parent-first delegation: if parent can load, child never tries.

Practical:
Explain why you cannot replace `java.lang.String` with your own version.

### Topic 3: `Class.forName` vs `ClassLoader.loadClass`

Theory:
`forName` initializes (runs static blocks); `loadClass` optionally does not.

Practical:
Observe when static initializer runs with each call.

### Topic 4: Writing a custom ClassLoader

Theory:
Extend `ClassLoader`; override `findClass`; read bytes; call `defineClass`.

Practical:
Load a class from a non-standard directory at runtime.

### Topic 5: Use cases

Theory:
Hot-reload (frameworks like Spring DevTools), plugin isolation, bytecode transformation.

Practical:
Simulate plugin loading: dynamically load class from a path at runtime without classpath entry.

## Key Concepts

- Parent-first delegation
- Bootstrap/Platform/App loader chain
- `defineClass` from raw bytes
- Isolation via separate loaders
- Framework relevance (Tomcat, OSGi, Spring)

## Hands-on Coding

```java
import java.io.*;
import java.nio.file.*;

public class FileClassLoader extends ClassLoader {
    private final Path dir;

    FileClassLoader(Path dir) { this.dir = dir; }

    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        Path file = dir.resolve(name.replace('.', '/') + ".class");
        try {
            byte[] bytes = Files.readAllBytes(file);
            return defineClass(name, bytes, 0, bytes.length);
        } catch (IOException e) {
            throw new ClassNotFoundException(name, e);
        }
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        ClassLoader cl = new FileClassLoader(Path.of("/tmp/plugins"));
        Class<?> clazz = cl.loadClass("com.plugin.Greeter");
        Object obj = clazz.getDeclaredConstructor().newInstance();
        clazz.getMethod("greet").invoke(obj);
    }
}
```

## Mini Exercise

Print the full ClassLoader chain for three different classes from different JARs.

## Assessment Quiz

1. Why parent-first delegation is important for security?
2. What does `defineClass` do?
3. Can two ClassLoaders load the same class name as different types?

Answers:

1. Prevents malicious code from replacing trusted `java.*` classes.
2. Creates a `Class<?>` object from raw bytecode bytes.
3. Yes — separate loaders produce incompatible types even with same name.

## Task

- Write a `HotReloadClassLoader` that reloads a class file if its timestamp changes.

## Day 62 Outcome

You understand JVM class loading deeply enough to build plugin systems and debug ClassLoader issues.
