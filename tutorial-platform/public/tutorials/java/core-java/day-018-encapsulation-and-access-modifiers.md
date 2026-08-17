---
title: Encapsulation and Access Modifiers
slug: day-018-encapsulation-and-access-modifiers
dayLabel: Day 18
level: Beginner
estimatedMinutes: 45
order: 18
track: java
---
# Day 18 [Beginner]: Encapsulation and Access Modifiers

## Goal

Protect object state using encapsulation and control visibility using access modifiers.

## Prerequisites

- Day 17 complete

## Explanation

Encapsulation hides internal implementation and exposes safe public behavior.

## Topic by Topic

### Topic 1: Encapsulation principle

Theory:
Keep fields private, expose operations through methods.

Practical:
Convert public fields to private and add getters/setters.

### Topic 2: Access modifiers

Theory:
`private`, `default`, `protected`, `public`.

Practical:
Apply each in class members and observe access scope.

### Topic 3: Validation in setters

Theory:
Encapsulation allows validation before state changes.

Practical:
Reject negative age or salary values.

### Topic 4: Immutable-like object basics

Theory:
Read-only fields with constructor initialization increase safety.

Practical:
Make one class with no setter.

## Key Concepts

- Data hiding
- Controlled access
- Validation gates
- Safer object modeling

## Hands-on Coding

```java
class Account {
    private double balance;

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public double getBalance() {
        return balance;
    }
}

public class Main {
    public static void main(String[] args) {
        Account account = new Account();
        account.deposit(5000);
        System.out.println("Balance: " + account.getBalance());
    }
}
```

## Mini Exercise

Create `Student` class with private marks and setter validation (0 to 100).

## Assessment Quiz

1. Why keep fields private?
2. Where should validation logic live?
3. Difference between `protected` and `private`?

Answers:

1. Prevent unsafe direct modification.
2. In controlled methods like setters.
3. `protected` allows subclass/package access, `private` only class.

## Task

- Refactor one earlier class using encapsulation.

## Day 18 Outcome

You can design classes with safer state management and visibility control.
