---
title: Advanced Testing — Property-Based, Mutation, and Contract Tests
slug: day-097-advanced-testing-property-based-mutation-and-contract-tests
dayLabel: Day 97
level: Expert
estimatedMinutes: 55
order: 97
track: java
---
# Day 97 [Expert]: Advanced Testing — Property-Based, Mutation, and Contract Tests

## Goal

Apply advanced testing strategies that catch bugs unit tests miss: property-based testing, mutation testing, and contract testing.

## Prerequisites

- Day 96 complete
- Days 53–55 (testing fundamentals) complete

## Explanation

Conventional unit tests verify examples. Advanced testing verifies invariants (property-based), forces faults (mutation), and validates API compatibility across service versions (contract).

## Topic by Topic

### Topic 1: Property-based testing with jqwik

Theory:
Instead of fixed examples, generate hundreds of random inputs; verify invariants hold for all.

Practical:
Verify `reverse(reverse(list)) == list` for all list sizes and types.

### Topic 2: Shrinking in property testing

Theory:
When a failing case is found, the framework shrinks to the minimal counterexample.

Practical:
Find the smallest failing input for a broken string reversal.

### Topic 3: Mutation testing with PIT

Theory:
PIT injects faults (mutations) into code; surviving mutations = test gaps.

Practical:
Run `mvn test-compile org.pitest:pitest-maven:mutationCoverage`; identify top surviving mutants.

### Topic 4: Fixing mutation test gaps

Theory:
Surviving mutants reveal missing assertions; add tests that kill them.

Practical:
Kill 5 surviving mutants from the Day 30 `StudentService` test suite.

### Topic 5: Contract testing basics

Theory:
Consumer records expected API interactions; provider verifies it can satisfy them. Prevents breaking API changes.

Practical:
Write a Pact consumer test for a REST endpoint; verify provider side.

## Key Concepts

- Invariant-based vs example-based testing
- Shrinking to minimal counterexample
- Mutation score as coverage quality signal
- Contract as versioned agreement
- Testing pyramid: unit → property → mutation → contract → integration

## Hands-on Coding

```java
// jqwik property test
import net.jqwik.api.*;
import java.util.*;

class ReversalProperties {
    @Property
    boolean reverseIsInvolutory(@ForAll List<@From("ints") Integer> list) {
        List<Integer> copy = new ArrayList<>(list);
        Collections.reverse(copy);
        Collections.reverse(copy);
        return copy.equals(list);
    }

    @Property
    boolean sortedListIsOrdered(@ForAll @Size(max=100) List<Integer> list) {
        List<Integer> sorted = new ArrayList<>(list);
        Collections.sort(sorted);
        for (int i = 0; i < sorted.size() - 1; i++) {
            if (sorted.get(i) > sorted.get(i + 1)) return false;
        }
        return true;
    }
}
```

```xml
<!-- PIT Maven plugin -->
<plugin>
    <groupId>org.pitest</groupId>
    <artifactId>pitest-maven</artifactId>
    <version>1.15.2</version>
    <dependencies>
        <dependency>
            <groupId>org.pitest</groupId>
            <artifactId>pitest-junit5-plugin</artifactId>
            <version>1.2.1</version>
        </dependency>
    </dependencies>
    <configuration>
        <targetClasses>com.example.*</targetClasses>
        <mutators>DEFAULTS</mutators>
    </configuration>
</plugin>
```

## Mini Exercise

Write property tests for `Collections.sort`: verify idempotency, order, and size preservation.

## Assessment Quiz

1. What does mutation testing measure that line coverage cannot?
2. What is shrinking in property testing?
3. What is the contract in consumer-driven contract testing?

Answers:

1. Whether tests actually verify behaviour — not just execute lines.
2. Automatic minimisation of failing input to simplest counterexample.
3. A formal record of how the consumer uses the provider's API.

## Task

- Achieve mutation score > 85% on Day 31 `Stack<T>` class; add property tests for it.

## Day 97 Outcome

You can apply advanced testing techniques that find bugs conventional tests cannot detect.
