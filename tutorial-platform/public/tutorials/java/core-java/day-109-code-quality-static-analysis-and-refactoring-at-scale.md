---
title: Code Quality, Static Analysis, and Refactoring at Scale
slug: day-109-code-quality-static-analysis-and-refactoring-at-scale
dayLabel: Day 109
level: Expert
estimatedMinutes: 55
order: 109
track: java
---
# Day 109 [Expert]: Code Quality, Static Analysis, and Refactoring at Scale

## Goal

Set up a quality gate pipeline with static analysis tools and apply systematic refactoring techniques on large codebases.

## Prerequisites

- Day 108 complete

## Explanation

Code quality at scale is automated. Manual review catches logic bugs; automated tools catch style, security, and maintainability issues consistently across every commit.

## Topic by Topic

### Topic 1: Checkstyle for coding standards

Theory:
Enforces formatting, naming, import order. Configured via `checkstyle.xml`; runs in Maven/Gradle build.

Practical:
Configure Checkstyle to enforce: no wildcard imports, max 150 lines per class, Javadoc on public methods.

### Topic 2: SpotBugs for bug patterns

Theory:
Analyses bytecode for bug patterns: null dereference, thread safety violations, resource leaks, infinite loops.

Practical:
Run SpotBugs on Day 45 synchronization code; fix identified issues.

### Topic 3: SonarQube / SonarCloud for holistic quality

Theory:
Combines coverage, duplication, complexity, smells, and security hotspots into quality gate score.

Practical:
Integrate SonarCloud into GitHub Actions; fail PR when quality gate fails.

### Topic 4: Systematic refactoring techniques

Theory:

- Extract method
- Introduce parameter object
- Replace conditional with polymorphism
- Inline variable

Practical:
Refactor a 50-line method with nested conditionals using these patterns.

### Topic 5: Refactoring safely with tests

Theory:
Run tests after every micro-step. Commit after each passing step. Never refactor without a test safety net.

Practical:
Apply Extract Method 3 times on Day 30 mini project; keep tests green at each step.

## Key Concepts

- Checkstyle for style enforcement
- SpotBugs for bug pattern detection
- SonarQube quality gate
- Micro-step refactoring with test safety net
- Quality gate as CI gatekeeper

## Hands-on Coding

```xml
<!-- Checkstyle Maven plugin -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-checkstyle-plugin</artifactId>
    <version>3.3.1</version>
    <configuration>
        <configLocation>checkstyle.xml</configLocation>
        <failsOnError>true</failsOnError>
    </configuration>
    <executions>
        <execution>
            <phase>verify</phase>
            <goals><goal>check</goal></goals>
        </execution>
    </executions>
</plugin>
```

```xml
<!-- SpotBugs -->
<plugin>
    <groupId>com.github.spotbugs</groupId>
    <artifactId>spotbugs-maven-plugin</artifactId>
    <version>4.8.3.1</version>
    <configuration>
        <effort>Max</effort>
        <threshold>Medium</threshold>
        <failOnError>true</failOnError>
    </configuration>
</plugin>
```

```java
// Refactoring: Replace conditional with polymorphism
// Before:
double discount(String type, double price) {
    if ("PREMIUM".equals(type)) return price * 0.8;
    if ("STUDENT".equals(type)) return price * 0.9;
    return price;
}

// After:
interface DiscountPolicy { double apply(double price); }
enum Discount implements DiscountPolicy {
    PREMIUM(p -> p * 0.8),
    STUDENT(p -> p * 0.9),
    NONE(p -> p);

    private final DiscountPolicy fn;
    Discount(DiscountPolicy fn) { this.fn = fn; }
    public double apply(double p) { return fn.apply(p); }
}
```

## Mini Exercise

Run SpotBugs on Day 43 serialization code; fix all reported medium+ bugs.

## Assessment Quiz

1. What is a quality gate?
2. What does SpotBugs analyse — source or bytecode?
3. Why commit after every micro-refactoring step?

Answers:

1. A threshold of quality metrics (coverage, smells, bugs) that must pass before merging.
2. Bytecode — it analyses `.class` files.
3. Allows bisecting to find which step introduced a regression.

## Task

- Add Checkstyle + SpotBugs to Day 50 project; fix all warnings; set failOnError=true.

## Day 109 Outcome

You can set up automated quality gates and perform safe, systematic refactoring on production codebases.
