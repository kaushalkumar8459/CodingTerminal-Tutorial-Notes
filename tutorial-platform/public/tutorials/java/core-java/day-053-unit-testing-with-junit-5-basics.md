---
title: Unit Testing with JUnit 5 Basics
slug: day-053-unit-testing-with-junit-5-basics
dayLabel: Day 53
level: Intermediate
estimatedMinutes: 50
order: 53
track: java
---
# Day 53 [Intermediate]: Unit Testing with JUnit 5 Basics

## Goal

Write reliable unit tests using JUnit 5 annotations, assertions, and lifecycle methods.

## Prerequisites

- Day 52 complete

## Explanation

Unit tests verify individual units of code in isolation. JUnit 5 (Jupiter) is the standard Java testing platform with a clean annotation-driven API.

## Topic by Topic

### Topic 1: JUnit 5 architecture

Theory:
Three modules: JUnit Platform (launcher), Jupiter (API), Vintage (JUnit 4 compat).

Practical:
Add `junit-jupiter` dependency and configure Surefire/Gradle to use it.

### Topic 2: Core annotations

Theory:
`@Test`, `@BeforeEach`, `@AfterEach`, `@BeforeAll`, `@AfterAll`, `@Disabled`.

Practical:
Write lifecycle-annotated test class for `Calculator`.

### Topic 3: Assertions

Theory:
`assertEquals`, `assertNotNull`, `assertTrue`, `assertThrows`, `assertAll`.

Practical:
Assert correct result and verify exception message.

### Topic 4: Parameterized tests

Theory:
`@ParameterizedTest` + `@ValueSource`, `@CsvSource`, `@MethodSource`.

Practical:
Test `isPrime` with 8 inputs in one test method.

### Topic 5: Test naming and display

Theory:
`@DisplayName` for readable test reports; nested `@Nested` classes for grouping.

Practical:
Group happy-path and edge-case tests in nested classes.

## Key Concepts

- Test isolation via lifecycle methods
- Assertion expressiveness
- Parameterized tests for data variety
- Readable test names

## Hands-on Coding

```java
import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import static org.junit.jupiter.api.Assertions.*;

class Calculator {
    int add(int a, int b) { return a + b; }
    int divide(int a, int b) {
        if (b == 0) throw new ArithmeticException("Division by zero");
        return a / b;
    }
}

@DisplayName("Calculator Tests")
class CalculatorTest {
    Calculator calc;

    @BeforeEach
    void setUp() { calc = new Calculator(); }

    @Test
    @DisplayName("add two positives")
    void addPositives() {
        assertEquals(5, calc.add(2, 3));
    }

    @Test
    void divideByZeroThrows() {
        assertThrows(ArithmeticException.class, () -> calc.divide(10, 0));
    }

    @ParameterizedTest(name = "{0} + {1} = {2}")
    @CsvSource({"1,2,3", "10,20,30", "-1,1,0"})
    void addParameterized(int a, int b, int expected) {
        assertEquals(expected, calc.add(a, b));
    }
}
```

## Mini Exercise

Test `StringUtils.reverse` with 5 parameterized inputs including empty string and palindrome.

## Assessment Quiz

1. Difference between `@BeforeAll` and `@BeforeEach`?
2. What does `assertThrows` return?
3. Why use `@DisplayName`?

Answers:

1. `@BeforeAll` runs once (must be static); `@BeforeEach` runs before every test.
2. The thrown exception — allowing further assertions on it.
3. Human-readable test names in reports without renaming methods.

## Task

- Write full test suite for your Day 30 `StudentService` class.

## Day 53 Outcome

You can write comprehensive, readable unit tests with parameterized cases and proper lifecycle setup.
