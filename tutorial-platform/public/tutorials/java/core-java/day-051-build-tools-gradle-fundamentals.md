---
title: Build Tools Gradle Fundamentals
slug: day-051-build-tools-gradle-fundamentals
dayLabel: Day 51
level: Intermediate
estimatedMinutes: 50
order: 51
track: java
---
# Day 51 [Intermediate]: Build Tools Gradle Fundamentals

## Goal

Build and manage Java projects with Gradle using Kotlin DSL and understand how Gradle differs from Maven.

## Prerequisites

- Day 50 complete

## Explanation

Gradle is a flexible build tool that uses a Groovy or Kotlin DSL instead of XML. It is incrementally faster than Maven for large projects.

## Topic by Topic

### Topic 1: Gradle project structure

Theory:
`build.gradle.kts`, `settings.gradle.kts`, `gradlew` wrapper. Same `src/main/java` convention.

Practical:
Create project with `gradle init --type java-application`.

### Topic 2: `build.gradle.kts` anatomy

Theory:
`plugins`, `repositories`, `dependencies`, `tasks` blocks.

Practical:
Add `com.google.code.gson:gson` dependency.

### Topic 3: Common tasks

Theory:
`./gradlew build`, `./gradlew test`, `./gradlew run`, `./gradlew clean`.

Practical:
Run all and inspect `build/` output.

### Topic 4: Dependency configurations

Theory:
`implementation`, `testImplementation`, `compileOnly`, `runtimeOnly`.

Practical:
Add JUnit 5 with `testImplementation`.

### Topic 5: Gradle vs Maven

Theory:
Gradle: faster incremental build, flexible DSL, steeper learning curve.
Maven: stable convention, XML verbose, simpler for standard projects.

Practical:
List one reason to choose each for a new project.

## Key Concepts

- Kotlin DSL build file
- Task graph vs lifecycle phases
- Dependency configurations
- Wrapper for reproducible builds

## Hands-on Coding

```kotlin
// build.gradle.kts
plugins {
    application
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("com.google.code.gson:gson:2.10.1")
    testImplementation("org.junit.jupiter:junit-jupiter:5.10.2")
}

application {
    mainClass.set("com.example.Main")
}

tasks.test {
    useJUnitPlatform()
}
```

```bash
./gradlew build
./gradlew run
./gradlew test
```

## Mini Exercise

Add a custom Gradle task `hello` that prints "Hello from Gradle".

## Assessment Quiz

1. What is the Gradle wrapper?
2. Difference between `implementation` and `api` scope?
3. How does Gradle avoid rerunning unchanged tasks?

Answers:

1. Script that downloads and uses a fixed Gradle version — ensures reproducibility.
2. `implementation` hides dependency from consumers; `api` exposes it.
3. Incremental build cache — checks inputs/outputs haven't changed.

## Task

- Migrate your Day 30 project to Gradle with JUnit 5 tests.

## Day 51 Outcome

You can create and manage Gradle-based Java projects and understand build configuration.
