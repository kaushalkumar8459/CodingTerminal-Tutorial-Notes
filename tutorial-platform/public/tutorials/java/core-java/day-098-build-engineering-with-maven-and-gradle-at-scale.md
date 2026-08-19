---
title: Build Engineering with Maven and Gradle at Scale
slug: day-098-build-engineering-with-maven-and-gradle-at-scale
dayLabel: Day 98
level: Expert
estimatedMinutes: 55
order: 98
track: java
---
# Day 98 [Expert]: Build Engineering with Maven and Gradle at Scale

## Goal

Design scalable, reproducible build systems for multi-module Java projects using Maven and Gradle best practices.

## Prerequisites

- Day 97 complete
- Days 50–51 (Maven and Gradle basics) complete

## Explanation

At scale, a build system is infrastructure. Build instability, slow feedback, and dependency conflicts cost as much as application bugs. This day covers the engineering practices that make builds reliable and fast.

## Topic by Topic

### Topic 1: Multi-module Maven project structure

Theory:
Parent POM with `<modules>`; common properties and plugin versions in parent; child modules inherit.

Practical:
Create 3-module project: `domain`, `service`, `app`; enforce version consistency from parent.

### Topic 2: Maven lifecycle binding and custom plugins

Theory:
Bind custom goals to lifecycle phases; write a simple Mojo to validate naming conventions.

Practical:
Bind a code-quality check to `validate` phase.

### Topic 3: Gradle multi-project builds

Theory:
`settings.gradle.kts` includes subprojects; `build.gradle.kts` at root for shared config via `subprojects { }`.

Practical:
Extract shared dependency versions to a version catalog (`libs.versions.toml`).

### Topic 4: Build caching and incremental builds

Theory:
Gradle build cache reuses outputs across machines; Maven Daemon + `mvnd` speeds local builds.

Practical:
Enable Gradle remote build cache; measure build time reduction on second run.

### Topic 5: Reproducible builds

Theory:
Builds should produce identical output regardless of timestamp or environment. `-Dproject.build.outputTimestamp` for Maven; `tasks.withType<AbstractArchiveTask>` for Gradle.

Practical:
Verify two builds of the same JAR are byte-for-byte identical.

## Key Concepts

- Parent POM inheritance
- Plugin version locking
- Gradle version catalog
- Build cache hit rate
- Reproducible artifact byte equality

## Hands-on Coding

```kotlin
// settings.gradle.kts — multi-project
rootProject.name = "myapp"
include("domain", "service", "app")
```

```kotlin
// libs.versions.toml — version catalog
[versions]
junit = "5.10.2"
jackson = "2.17.0"
slf4j = "2.0.12"

[libraries]
junit-jupiter = { module = "org.junit.jupiter:junit-jupiter", version.ref = "junit" }
jackson-core  = { module = "com.fasterxml.jackson.core:jackson-databind", version.ref = "jackson" }
```

```kotlin
// root build.gradle.kts — applied to all subprojects
subprojects {
    apply(plugin = "java")
    java.sourceCompatibility = JavaVersion.VERSION_21

    tasks.test { useJUnitPlatform() }

    repositories { mavenCentral() }
}
```

```xml
<!-- Maven parent POM version locking -->
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>5.10.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

## Mini Exercise

Add a Gradle task that fails the build if any module's test coverage drops below 70%.

## Assessment Quiz

1. What does `<dependencyManagement>` do in Maven?
2. What is a Gradle version catalog?
3. Why is build reproducibility important?

Answers:

1. Centralises version declarations; children inherit without specifying version.
2. A `toml` file centralising all library and plugin versions for consistent use across modules.
3. Enables verified builds, auditable artifacts, and reproducible security fixes.

## Task

- Convert your Day 50 Maven project to a 3-module layout with parent POM.

## Day 98 Outcome

You can design and maintain multi-module build systems that are fast, reproducible, and team-friendly.
