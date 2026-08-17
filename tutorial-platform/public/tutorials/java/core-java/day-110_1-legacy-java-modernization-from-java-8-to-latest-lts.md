---
title: Legacy Java Modernization — From Java 8 to Latest LTS
slug: day-110_1-legacy-java-modernization-from-java-8-to-latest-lts
dayLabel: Day 110_1
level: Expert
estimatedMinutes: 60
order: 110
track: java
---
# Day 110 [Expert]: Legacy Java Modernization — From Java 8 to Latest LTS

## Goal

Upgrade a Java 8 codebase to Java 21 LTS systematically, adopting modern language features without breaking behaviour.

## Prerequisites

- Day 109 complete

## Explanation

Most production Java is still on Java 8 or 11. Modernisation is not just a compiler version bump — it involves adopting records, text blocks, pattern matching, sealed classes, virtual threads, and removing old patterns.

## Topic by Topic

### Topic 1: Version migration path

Theory:
8 → 11 → 17 → 21. Each LTS is a stable upgrade target. Jumping from 8 to 21 directly is possible but riskier.

Practical:
List the 5 most impactful breaking/removed features between Java 8 and 21.

### Topic 2: Replacing Java 8 idioms

Theory:
`new ArrayList<>()` → `List.of()`. `new HashMap<>()` → `Map.of()`. Anonymous class → lambda. `Optional.get()` → `orElseThrow()`.

Practical:
Apply IntelliJ's "Modernise" inspections to Day 30 project; accept 10 suggested changes.

### Topic 3: Records replacing POJOs and DTOs

Theory:
Data-only classes with getters/setters/equals → records.

Practical:
Convert 3 DTOs to records; verify serialization still works.

### Topic 4: Text blocks for multiline strings

Theory:
`"""..."""` replaces `+ "\n" +` chains; preserves indentation with `stripIndent`.

Practical:
Convert SQL strings and JSON test fixtures to text blocks.

### Topic 5: Migration tooling

Theory:
`jdeprscan` lists deprecated API usage. `jdeps` finds internal JDK API usage. OpenRewrite recipes automate code transformations.

Practical:
Run `jdeprscan --release 21 myapp.jar`; fix found usages.

## Key Concepts

- LTS upgrade path
- Java 8 → 21 idiom modernisation
- Records replacing POJOs
- Text blocks for readability
- OpenRewrite for automated transforms
- `jdeps` for forbidden API detection

## Hands-on Coding

```java
// Java 8 style
public class UserDto {
    private final String name;
    private final String email;

    public UserDto(String name, String email) {
        this.name = name;
        this.email = email;
    }
    public String getName() { return name; }
    public String getEmail() { return email; }
    // + equals, hashCode, toString boilerplate
}

// Java 16+ record
record UserDto(String name, String email) {}

// Text block for SQL
String sql = """
    SELECT u.name, u.email
    FROM users u
    WHERE u.active = true
      AND u.created_at > :since
    ORDER BY u.name
    """;

// OpenRewrite migration recipe (Maven)
// <recipe>org.openrewrite.java.migrate.UpgradeToJava21</recipe>
```

```bash
# Scan for deprecated API usage
jdeprscan --release 21 --class-path target/myapp.jar .

# Find internal JDK API usage
jdeps --jdk-internals --multi-release 21 target/myapp.jar
```

## Mini Exercise

Convert all POJOs in Day 30 student management project to records; run all tests to verify zero breakage.

## Assessment Quiz

1. Why migrate through LTS versions rather than jumping directly?
2. Can records replace every POJO?
3. What is `jdeprscan` for?

Answers:

1. Intermediate LTS versions have stable APIs and more compatible libraries.
2. No — mutable state, inheritance, JPA entities, and serialisation edge cases require classes.
3. Finds uses of deprecated JDK APIs that will be removed in the target version.

## Task

- Modernise Day 60 banking project to Java 21: records, text blocks, virtual threads in thread pool.

## Day 110 Outcome

You can systematically modernise a Java 8 codebase to Java 21 without breaking behaviour.
