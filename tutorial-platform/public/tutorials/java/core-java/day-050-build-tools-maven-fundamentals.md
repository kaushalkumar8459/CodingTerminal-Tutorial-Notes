---
title: Build Tools Maven Fundamentals
slug: day-050-build-tools-maven-fundamentals
dayLabel: Day 50
level: Intermediate
estimatedMinutes: 50
order: 50
track: java
---
# Day 50 [Intermediate]: Build Tools Maven Fundamentals

## Goal

Set up and manage a Java project with Maven, understand the build lifecycle, and add dependencies.

## Prerequisites

- Day 49 complete

## Explanation

Maven automates compilation, testing, packaging, and dependency management through convention over configuration.

## Topic by Topic

### Topic 1: Project structure convention

Theory:
`src/main/java`, `src/main/resources`, `src/test/java` — standard layout.

Practical:
Create Maven project with `mvn archetype:generate`.

### Topic 2: `pom.xml` anatomy

Theory:
`groupId`, `artifactId`, `version`, `dependencies`, `plugins`, `properties`.

Practical:
Add `Jackson` dependency and verify download.

### Topic 3: Build lifecycle phases

Theory:
`validate` → `compile` → `test` → `package` → `verify` → `install` → `deploy`.

Practical:
Run `mvn compile`, `mvn test`, `mvn package` and inspect `target/`.

### Topic 4: Dependency scope

Theory:
`compile`, `test`, `provided`, `runtime` — controls classpath inclusion.

Practical:
Add JUnit 5 with `test` scope.

### Topic 5: Useful plugins

Theory:
`maven-compiler-plugin` (Java version), `maven-surefire-plugin` (tests), `maven-jar-plugin` (fat jar).

Practical:
Set Java 21 source/target in compiler plugin.

## Key Concepts

- Convention over configuration
- Lifecycle phases
- Dependency coordinate system
- Scope control
- Plugin configuration

## Hands-on Coding

```xml
<!-- pom.xml skeleton -->
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>java-practice</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>21</maven.compiler.source>
        <maven.compiler.target>21</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>5.10.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

```bash
mvn compile
mvn test
mvn package
java -jar target/java-practice-1.0-SNAPSHOT.jar
```

## Mini Exercise

Add `Gson` dependency, parse a JSON string to a `Map`, and print keys.

## Assessment Quiz

1. What does `mvn package` produce?
2. Difference between `compile` and `provided` scope?
3. Where does Maven store downloaded dependencies?

Answers:

1. A JAR in `target/`.
2. `compile` is included in final artifact; `provided` is available at compile but not bundled.
3. Local repository `~/.m2/repository`.

## Task

- Convert your Day 30 project to a Maven project with JUnit 5 test scope.

## Day 50 Outcome

You can create, build, and manage Java projects using Maven with proper dependency control.
