---
title: throw throws and Custom Exceptions
slug: day-026-throw-throws-and-custom-exceptions
dayLabel: Day 26
level: Beginner
estimatedMinutes: 45
order: 26
track: java
---
# Day 26 [Beginner]: throw throws and Custom Exceptions

## Goal

Throw exceptions explicitly, declare them in method signatures, and create domain-specific custom exceptions.

## Prerequisites

- Day 25 complete

## Explanation

`throw` raises an exception manually. `throws` declares that a method may propagate a checked exception. Custom exceptions carry domain-specific error context.

## Topic by Topic

### Topic 1: `throw` keyword

Theory:
Explicitly throw any `Throwable` inside method body.

Practical:
Throw `IllegalArgumentException` for negative age.

### Topic 2: `throws` declaration

Theory:
Declares checked exceptions a method may propagate to caller.

Practical:
Add `throws IOException` to file reading method.

### Topic 3: Custom checked exception

Theory:
Extend `Exception` for recoverable domain errors.

Practical:
Create `InsufficientFundsException`.

### Topic 4: Custom unchecked exception

Theory:
Extend `RuntimeException` for programming errors.

Practical:
Create `InvalidAccountException`.

### Topic 5: Exception message and context

Theory:
Pass informative message and cause for better diagnostics.

Practical:
Include field value in exception message.

## Key Concepts

- throw vs throws
- Checked vs unchecked custom exceptions
- Domain error modeling
- Informative exception messages

## Hands-on Coding

```java
class InsufficientFundsException extends Exception {
    private double amount;

    InsufficientFundsException(double amount) {
        super("Insufficient funds. Needed: " + amount);
        this.amount = amount;
    }

    double getAmount() { return amount; }
}

class Account {
    private double balance;

    Account(double balance) { this.balance = balance; }

    void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException(amount - balance);
        }
        balance -= amount;
    }
}

public class Main {
    public static void main(String[] args) {
        Account acc = new Account(500);
        try {
            acc.withdraw(800);
        } catch (InsufficientFundsException e) {
            System.out.println(e.getMessage());
        }
    }
}
```

## Mini Exercise

Create `AgeValidationException` and throw it when age is below 18 or above 120.

## Assessment Quiz

1. Difference between `throw` and `throws`?
2. When extend `Exception` vs `RuntimeException`?
3. What makes exception message useful?

Answers:

1. `throw` raises it; `throws` declares it in signature.
2. `Exception` for recoverable; `RuntimeException` for programming bugs.
3. Includes context about what value caused the problem.

## Task

- Create one domain exception hierarchy with base + two specific exceptions.

## Day 26 Outcome

You can design and propagate exceptions that carry meaningful error context.
