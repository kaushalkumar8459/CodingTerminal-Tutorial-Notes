---
title: Reflection API and Annotations Basics
slug: day-049-reflection-api-and-annotations-basics
dayLabel: Day 49
level: Intermediate
estimatedMinutes: 50
order: 49
track: java
---
# Day 49 [Intermediate]: Reflection API and Annotations Basics

## Goal

Inspect and manipulate classes at runtime using Reflection and create custom annotations.

## Prerequisites

- Day 48 complete

## Explanation

Reflection lets code examine its own structure at runtime. Annotations attach metadata to code elements for frameworks and tools.

## Topic by Topic

### Topic 1: `Class<?>` object

Theory:
Every loaded class has one `Class<?>` instance; obtained via `.class`, `getClass()`, or `Class.forName()`.

Practical:
Print class name, superclass, and interfaces of `ArrayList`.

### Topic 2: Inspecting fields and methods

Theory:
`getDeclaredFields()`, `getDeclaredMethods()` — includes private; `getFields()` — public only.

Practical:
Print all fields and their types for a `User` class.

### Topic 3: Invoking methods reflectively

Theory:
`method.setAccessible(true)` bypasses access control; `method.invoke(instance, args)`.

Practical:
Call private `validate()` method from outside the class.

### Topic 4: Creating custom annotations

Theory:
`@interface` declaration; `@Retention` and `@Target` meta-annotations.

Practical:
Create `@NotNull` and `@MaxLength` annotations.

### Topic 5: Processing annotations at runtime

Theory:
`field.isAnnotationPresent(MyAnnotation.class)` + `field.getAnnotation(...)`.

Practical:
Build simple validator that checks `@NotNull` fields via reflection.

## Key Concepts

- `Class<?>` as runtime type info
- Access override via `setAccessible`
- Annotation declaration and retention
- Runtime annotation processing

## Hands-on Coding

```java
import java.lang.annotation.*;
import java.lang.reflect.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@interface NotBlank {}

class UserForm {
    @NotBlank String name;
    String email;  // not annotated

    UserForm(String name, String email) {
        this.name = name; this.email = email;
    }
}

public class Main {
    static void validate(Object obj) throws IllegalAccessException {
        for (Field f : obj.getClass().getDeclaredFields()) {
            f.setAccessible(true);
            if (f.isAnnotationPresent(NotBlank.class)) {
                String val = (String) f.get(obj);
                if (val == null || val.isBlank()) {
                    System.out.println("INVALID: " + f.getName() + " is blank");
                } else {
                    System.out.println("OK: " + f.getName() + " = " + val);
                }
            }
        }
    }

    public static void main(String[] args) throws Exception {
        validate(new UserForm("Asha", "asha@mail.com"));
        validate(new UserForm("", ""));
    }
}
```

## Mini Exercise

Add `@MaxLength(50)` annotation and extend validator to enforce it.

## Assessment Quiz

1. Difference between `getFields()` and `getDeclaredFields()`?
2. Why is `@Retention(RUNTIME)` needed for custom validators?
3. Performance concern with reflection?

Answers:

1. `getFields()` returns public inherited; `getDeclaredFields()` returns all declared (including private).
2. Without it annotation info is stripped at compile time.
3. Reflection bypasses JIT optimizations and is slower than direct calls.

## Task

- Build a `BeanValidator` that checks all `@NotBlank` and `@NotNull` fields via reflection.

## Day 49 Outcome

You can inspect Java types at runtime and build annotation-driven behavior.
