---
title: Java Modules JPMS and Modular Design
slug: day-061-java-modules-jpms-and-modular-design
dayLabel: Day 61
level: Advanced
estimatedMinutes: 55
order: 61
track: java
---
# Day 61 [Advanced]: Java Modules JPMS and Modular Design

## Goal

Structure applications using the Java Platform Module System (JPMS) for strong encapsulation and explicit dependencies.

## Prerequisites

- Day 60 complete
- Comfortable with packages and access modifiers

## Explanation

JPMS (Project Jigsaw, Java 9+) adds a module layer above packages. Modules declare what they export and what they require, preventing accidental internal API usage.

## Topic by Topic

### Topic 1: Module descriptor `module-info.java`

Theory:
Placed in module root; declares `module`, `requires`, `exports`, `opens`, `uses`, `provides`.

Practical:
Create `module com.myapp.core` that exports one package.

### Topic 2: `requires` and `exports`

Theory:
`requires` declares compile+runtime dependency; `exports` makes package visible to other modules.

Practical:
Split one app into two modules; wire them together.

### Topic 3: `opens` for reflection

Theory:
`exports` controls compile-time; `opens` allows runtime reflective access (needed for frameworks).

Practical:
Open package to Jackson for serialization.

### Topic 4: Named vs unnamed module

Theory:
Classpath code runs in unnamed module with access to all; modular code obeys descriptor.

Practical:
Observe `InaccessibleObjectException` when reflection hits closed module.

### Topic 5: `jlink` and minimal runtime image

Theory:
`jlink` assembles only the needed modules into a custom JRE — drastically reduces deployment size.

Practical:
Create `jlink` image containing only `java.base` and your module.

## Key Concepts

- `module-info.java` as strong encapsulation boundary
- `requires` / `exports` / `opens` directives
- Reflection access via `opens`
- `jlink` for minimal runtimes
- Classpath vs module path

## Hands-on Coding

```java
// src/com.myapp.core/module-info.java
module com.myapp.core {
    exports com.myapp.core.model;
    exports com.myapp.core.service;
    // opens for reflection-based frameworks
    opens com.myapp.core.model to com.fasterxml.jackson.databind;
}
```

```java
// src/com.myapp.app/module-info.java
module com.myapp.app {
    requires com.myapp.core;
    requires java.logging;
}
```

```bash
# compile modular project
javac --module-source-path src -d out $(find src -name "*.java")
java --module-path out -m com.myapp.app/com.myapp.app.Main
```

## Mini Exercise

Add a third `com.myapp.utils` module; have `core` require it; verify encapsulation blocks direct use from `app`.

## Assessment Quiz

1. Difference between `exports` and `opens`?
2. What is the unnamed module?
3. How does `jlink` reduce deployment size?

Answers:

1. `exports` compile-time API access; `opens` runtime reflective access.
2. All classpath code — no encapsulation, full access.
3. Includes only the module closure needed, not the full JDK.

## Task

- Convert your Day 50 Maven project to a modular project with two modules.

## Day 61 Outcome

You can design module boundaries, control visibility, and build modular JVM applications.
