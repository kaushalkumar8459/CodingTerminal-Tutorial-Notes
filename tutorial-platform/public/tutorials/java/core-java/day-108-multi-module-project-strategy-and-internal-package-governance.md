---
title: Multi-Module Project Strategy and Internal Package Governance
slug: day-108-multi-module-project-strategy-and-internal-package-governance
dayLabel: Day 108
level: Expert
estimatedMinutes: 55
order: 108
track: java
---
# Day 108 [Expert]: Multi-Module Project Strategy and Internal Package Governance

## Goal

Design a multi-module project layout that enforces architectural boundaries at the build system level, not just by convention.

## Prerequisites

- Day 107 complete
- Day 98 (build engineering) complete

## Explanation

Naming something "internal" is not enough. This day uses JPMS module boundaries, ArchUnit tests, and Maven/Gradle module structure to make architectural violations a build failure.

## Topic by Topic

### Topic 1: Module boundary strategy

Theory:
Each bounded context or architectural layer becomes a Maven/Gradle module with explicit `compile` dependencies. Cross-layer dependency → build fails.

Practical:
Create modules: `domain`, `application`, `adapter-jdbc`, `adapter-rest`; `adapter` modules depend on `application`; `application` depends on `domain` only.

### Topic 2: JPMS for internal encapsulation

Theory:
`module-info.java` with `exports com.myapp.api` but no export of `com.myapp.internal`. Even in the same JAR, internal packages are inaccessible.

Practical:
Move domain model internals to unexported package; verify adapter cannot access them.

### Topic 3: ArchUnit for architecture tests

Theory:
ArchUnit runs architecture rules as JUnit tests — fails CI if dependencies violate rules.

Practical:
Write rule: "domain layer must not import from adapter layer".

### Topic 4: Package naming conventions

Theory:
`com.company.domain.model`, `com.company.application.port`, `com.company.adapter.persistence` — consistent depth prevents naming collisions.

Practical:
Rename all packages in Day 103 project to follow the convention.

### Topic 5: Internal API management

Theory:
`@Internal` annotation marks classes that are subject to change; tooling can enforce no consumer outside the module uses them.

Practical:
Create `@Internal` meta-annotation; add ArchUnit rule that blocks cross-module `@Internal` usage.

## Key Concepts

- Module per layer as build boundary
- JPMS unexported packages for true encapsulation
- ArchUnit as architecture test
- Consistent package naming depth
- `@Internal` annotation with enforcement

## Hands-on Coding

```java
// ArchUnit rules as JUnit tests
import com.tngtech.archunit.junit.ArchTest;
import com.tngtech.archunit.lang.ArchRule;
import static com.tngtech.archunit.library.Architectures.layeredArchitecture;

class ArchitectureTest {
    @ArchTest
    static final ArchRule layerRule = layeredArchitecture()
        .consideringAllDependencies()
        .layer("Domain")     .definedBy("com.example.domain..")
        .layer("Application").definedBy("com.example.application..")
        .layer("Adapter")    .definedBy("com.example.adapter..")
        .whereLayer("Domain")     .mayNotAccessAnyLayer()
        .whereLayer("Application").mayOnlyAccessLayers("Domain")
        .whereLayer("Adapter")    .mayOnlyAccessLayers("Application", "Domain");

    @ArchTest
    static final ArchRule noInternalCrossModule = noClasses()
        .that().areAnnotatedWith(Internal.class)
        .should().beAccessedByClassesThat()
                 .resideOutsideOfPackage("com.example.domain..");
}
```

```xml
<!-- Maven module dependency enforcement -->
<!-- adapter/pom.xml may depend on application -->
<dependencies>
    <dependency>
        <groupId>com.example</groupId>
        <artifactId>application</artifactId>
    </dependency>
</dependencies>
<!-- application/pom.xml must NOT depend on adapter -->
```

## Mini Exercise

Add an ArchUnit rule that prevents any class from `adapter` importing from `domain.internal` package.

## Assessment Quiz

1. How does a Maven module dependency enforce layer rules?
2. What does JPMS add beyond Maven modules?
3. Why use ArchUnit over code review?

Answers:

1. Only declared dependencies compile — undeclared imports cause build failure.
2. JPMS enforces encapsulation at runtime too — reflection blocked for unexported packages.
3. ArchUnit catches violations in CI automatically; code review is manual and inconsistent.

## Task

- Add ArchUnit to Day 103 project; write 3 layer rules; verify they pass.

## Day 108 Outcome

You can enforce architecture boundaries at build and test time, not just by naming convention.
