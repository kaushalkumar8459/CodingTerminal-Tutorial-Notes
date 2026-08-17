---
title: Packages Imports and Code Organization
slug: day-024-packages-imports-and-code-organization
dayLabel: Day 24
level: Beginner
estimatedMinutes: 40
order: 24
track: java
---
# Day 24 [Beginner]: Packages Imports and Code Organization

## Goal

Organize Java code using packages and understand how the import system works.

## Prerequisites

- Day 23 complete

## Explanation

Packages prevent naming conflicts and provide logical grouping for related classes.

## Topic by Topic

### Topic 1: Package declaration

Theory:
`package` statement must be first line; maps to folder structure.

Practical:
Create `com.myapp.models` package.

### Topic 2: import statement

Theory:
Brings external class into scope; wildcard import possible but not recommended.

Practical:
Import `java.util.ArrayList` vs `java.util.*`.

### Topic 3: Access across packages

Theory:
`public` classes/members are visible cross-package; `default` is not.

Practical:
Test visibility with two package demo.

### Topic 4: Naming conventions

Theory:
Lowercase, reverse domain: `com.company.feature`.

Practical:
Restructure a flat project into packages.

### Topic 5: Common JDK packages

Theory:
`java.lang` (auto-imported), `java.util`, `java.io`, `java.nio`.

Practical:
Identify which classes come from which package.

## Key Concepts

- Package as namespace
- Import resolution
- Cross-package access rules
- Industry naming conventions

## Hands-on Coding

```
src/
  com/myapp/
    models/
      Student.java
    utils/
      Validator.java
    Main.java
```

```java
package com.myapp.models;

public class Student {
    public String name;
    public Student(String name) { this.name = name; }
}
```

```java
package com.myapp;

import com.myapp.models.Student;

public class Main {
    public static void main(String[] args) {
        Student s = new Student("Karan");
        System.out.println(s.name);
    }
}
```

## Mini Exercise

Create a two-package project: `models` (Product) and `services` (ProductService).

## Assessment Quiz

1. What happens without a `package` declaration?
2. Is `java.lang` auto-imported?
3. Why avoid wildcard imports?

Answers:

1. Class goes to default (unnamed) package.
2. Yes.
3. Reduces clarity; can cause name clashes.

## Task

- Restructure one earlier project into at least two packages.

## Day 24 Outcome

You can structure Java projects cleanly using packages and control visibility correctly.
