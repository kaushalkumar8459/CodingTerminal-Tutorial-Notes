---
title: Mini Project — Student Management Console App
slug: day-030-mini-project-student-management-console-app
dayLabel: Day 30
level: Beginner
estimatedMinutes: 90
order: 30
track: java
---
# Day 30 [Beginner]: Mini Project — Student Management Console App

## Goal

Apply all beginner Java concepts in one complete console application that manages student records.

## Prerequisites

- Day 29 complete
- All Day 1–29 concepts understood

## Explanation

This project consolidates variables, OOP, arrays, strings, exceptions, enums, and basic I/O into a working application.

## Project Requirements

Build a console app that supports:

1. Add a new student (name, age, marks)
2. Display all students
3. Find student by name
4. Calculate class average
5. Exit

## Design

```text
Student (class)
  - name: String
  - age: int
  - marks: double
  - grade: enum Grade (A, B, C, F)

StudentService (class)
  - addStudent
  - findByName
  - displayAll
  - calculateAverage

Main (class)
  - Menu loop with Scanner
```

## Hands-on Coding

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

enum Grade { A, B, C, F }

class Student {
    String name;
    int age;
    double marks;

    Student(String name, int age, double marks) {
        this.name = name;
        this.age = age;
        this.marks = marks;
    }

    Grade getGrade() {
        if (marks >= 80) return Grade.A;
        if (marks >= 65) return Grade.B;
        if (marks >= 50) return Grade.C;
        return Grade.F;
    }

    @Override
    public String toString() {
        return String.format("%-15s Age:%-3d Marks:%-6.1f Grade:%s",
            name, age, marks, getGrade());
    }
}

class StudentService {
    private final List<Student> students = new ArrayList<>();

    void add(Student s) { students.add(s); }

    void displayAll() {
        if (students.isEmpty()) { System.out.println("No students."); return; }
        students.forEach(System.out::println);
    }

    Student findByName(String name) {
        return students.stream()
            .filter(s -> s.name.equalsIgnoreCase(name))
            .findFirst().orElse(null);
    }

    double average() {
        return students.stream().mapToDouble(s -> s.marks).average().orElse(0);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StudentService service = new StudentService();

        while (true) {
            System.out.println("\n1.Add  2.Display  3.Search  4.Average  5.Exit");
            int choice = sc.nextInt(); sc.nextLine();

            switch (choice) {
                case 1 -> {
                    System.out.print("Name: "); String n = sc.nextLine();
                    System.out.print("Age: "); int a = sc.nextInt();
                    System.out.print("Marks: "); double m = sc.nextDouble(); sc.nextLine();
                    service.add(new Student(n, a, m));
                    System.out.println("Added.");
                }
                case 2 -> service.displayAll();
                case 3 -> {
                    System.out.print("Name: "); String name = sc.nextLine();
                    Student found = service.findByName(name);
                    System.out.println(found != null ? found : "Not found.");
                }
                case 4 -> System.out.printf("Class average: %.2f%n", service.average());
                case 5 -> { sc.close(); return; }
                default -> System.out.println("Invalid choice.");
            }
        }
    }
}
```

## What to Practice

- Add input validation (marks 0–100, age > 0) with custom exceptions.
- Sort students by marks descending before display.
- Save/load students to a file.

## Assessment Quiz

1. What design pattern separates data from operations here?
2. Why use `List` instead of array here?
3. What would break first if marks could be negative?

Answers:

1. Separation of concerns; service layer holds logic.
2. Dynamic size; no fixed limit.
3. Grade calculation; add validation in setter or constructor.

## Day 30 Outcome

You have built a complete working Java console application combining all beginner concepts.
