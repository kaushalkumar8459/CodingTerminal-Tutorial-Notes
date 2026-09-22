---
title: Serialization and Deserialization
slug: day-043-serialization-and-deserialization
dayLabel: Day 43
level: Intermediate
estimatedMinutes: 45
order: 43
track: java
---
# Day 43 [Intermediate]: Serialization and Deserialization

## Goal

Persist and restore Java objects using built-in serialization and understand its risks and alternatives.

## Prerequisites

- Day 42 complete

## Explanation

Serialization converts an object to a byte stream. Deserialization reverses it. Java's built-in mechanism is simple but has security and versioning risks.

## Topic by Topic

### Topic 1: `Serializable` marker interface

Theory:
Tag interface; enables default serialization via `ObjectOutputStream`.

Practical:
Serialize and deserialize a `User` object.

### Topic 2: `serialVersionUID`

Theory:
Unique class version identifier; prevents deserialization of incompatible versions.

Practical:
Observe `InvalidClassException` without matching UID.

### Topic 3: `transient` keyword

Theory:
Excludes field from serialization (passwords, computed values).

Practical:
Mark password field `transient` and verify it is null after deserialization.

### Topic 4: Custom serialization

Theory:
Override `writeObject` / `readObject` for control.

Practical:
Encrypt sensitive field during serialization.

### Topic 5: Risks and alternatives

Theory:
Default Java serialization is a known attack vector; prefer JSON (Jackson/Gson) or Protobuf.

Practical:
Serialize same object to JSON string manually for comparison.

## Key Concepts

- `Serializable` contract
- `serialVersionUID` discipline
- `transient` exclusion
- Custom serialization hooks
- Security awareness

## Hands-on Coding

```java
import java.io.*;

class User implements Serializable {
    private static final long serialVersionUID = 1L;

    String name;
    transient String password;  // excluded from serialization

    User(String name, String password) {
        this.name = name;
        this.password = password;
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        User user = new User("Asha", "secret123");

        // serialize
        try (ObjectOutputStream oos =
                new ObjectOutputStream(new FileOutputStream("user.ser"))) {
            oos.writeObject(user);
        }

        // deserialize
        try (ObjectInputStream ois =
                new ObjectInputStream(new FileInputStream("user.ser"))) {
            User loaded = (User) ois.readObject();
            System.out.println("Name: " + loaded.name);
            System.out.println("Password: " + loaded.password); // null
        }

        new File("user.ser").delete();
    }
}
```

## Mini Exercise

Serialize a list of `Product` objects to file and read them back.

## Assessment Quiz

1. What happens if `serialVersionUID` doesn't match?
2. Is a `transient` field null after deserialization?
3. Why avoid default Java serialization in new code?

Answers:

1. `InvalidClassException` at deserialization.
2. Yes (or primitive default).
3. Security vulnerabilities; brittle versioning.

## Task

- Serialize and deserialize a `Cart` object with a list of items.

## Day 43 Outcome

You understand serialization mechanics, risks, and when to choose safer alternatives.
