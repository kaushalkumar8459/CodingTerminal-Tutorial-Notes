---
title: Test Design Patterns and Coverage Strategy
slug: day-055-test-design-patterns-and-coverage-strategy
dayLabel: Day 55
level: Intermediate
estimatedMinutes: 45
order: 55
track: java
---
# Day 55 [Intermediate]: Test Design Patterns and Coverage Strategy

## Goal

Write tests that are maintainable and meaningful using established patterns and a deliberate coverage strategy.

## Prerequisites

- Day 54 complete

## Explanation

Writing tests is easy; writing good tests is hard. This day focuses on design quality — not just making tests pass.

## Topic by Topic

### Topic 1: Arrange-Act-Assert (AAA)

Theory:
Every test has three clear sections: set up, invoke, verify.

Practical:
Refactor two poorly structured tests into strict AAA format.

### Topic 2: One assertion per test (guideline)

Theory:
Single responsibility for tests improves failure message clarity.

Practical:
Split one large test into focused smaller tests.

### Topic 3: Test naming conventions

Theory:
`methodName_scenario_expectedBehaviour` or BDD-style `should_doX_when_Y`.

Practical:
Rename 5 tests following the convention.

### Topic 4: Code coverage strategy

Theory:
Line coverage is not enough; target branch, path, and mutation coverage.
Aim for 80%+ on business logic; 0% is fine for data classes.

Practical:
Run JaCoCo; identify untested branches.

### Topic 5: Test smells to avoid

Theory:

- Testing implementation not behaviour
- Mocking everything including simple value objects
- Tests that never fail (vacuous tests)
- Slow tests in unit suite

Practical:
Identify one smell in existing test; refactor.

## Key Concepts

- AAA structure
- Behaviour-focused tests
- Meaningful coverage targets
- JaCoCo integration
- Common test smells

## Hands-on Coding

```java
// Bad test — multiple concerns, unclear name
@Test
void test1() {
    User u = new User("", "bad-email");
    assertFalse(validator.validate(u));
    assertEquals(2, validator.errors(u).size());
    assertNotNull(validator.errors(u));
}

// Good tests — focused, named
@Test
void validate_shouldFail_whenNameIsBlank() {
    User u = new User("", "valid@mail.com");
    assertFalse(validator.validate(u));
}

@Test
void validate_shouldFail_whenEmailHasNoAtSign() {
    User u = new User("Asha", "notanemail");
    assertFalse(validator.validate(u));
}
```

```xml
<!-- JaCoCo Maven plugin -->
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.11</version>
    <executions>
        <execution>
            <goals><goal>prepare-agent</goal></goals>
        </execution>
        <execution>
            <id>report</id>
            <phase>verify</phase>
            <goals><goal>report</goal></goals>
        </execution>
    </executions>
</plugin>
```

## Mini Exercise

Review your Day 53 tests — apply AAA, rename, split any multi-assertion tests.

## Assessment Quiz

1. Why does 100% line coverage not guarantee correctness?
2. What is a vacuous test?
3. Where should you NOT spend time achieving 100% coverage?

Answers:

1. Branches and edge-cases inside covered lines may still be untested.
2. A test that passes no matter what — usually missing assertions.
3. Simple getters/setters, data classes, generated code.

## Task

- Add JaCoCo to your Maven project; achieve 80%+ branch coverage on `StudentService`.

## Day 55 Outcome

You write tests that are clear, focused, and useful — not just ones that pass.
