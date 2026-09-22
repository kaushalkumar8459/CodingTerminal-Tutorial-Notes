---
title: File Handling with java.io and java.nio
slug: day-042-file-handling-with-java-io-and-java-nio
dayLabel: Day 42
level: Intermediate
estimatedMinutes: 50
order: 42
track: java
---
# Day 42 [Intermediate]: File Handling with java.io and java.nio

## Goal

Read, write, and manipulate files using both the classic `java.io` API and the modern `java.nio.file` API.

## Prerequisites

- Day 41 complete

## Explanation

`java.io` is stream-based and widely used. `java.nio.file` (Java 7+) provides `Path`, `Files`, and `FileSystem` for a cleaner, more powerful API.

## Topic by Topic

### Topic 1: Reading files with `BufferedReader`

Theory:
Wrap `FileReader` in `BufferedReader` for efficient line-by-line reading.

Practical:
Read and print each line of a text file.

### Topic 2: Writing files with `BufferedWriter`

Theory:
Wrap `FileWriter` in `BufferedWriter`; use `newLine()` for portability.

Practical:
Write 10 lines to a new file.

### Topic 3: `java.nio.file.Files` shortcuts

Theory:
`Files.readAllLines`, `Files.writeString`, `Files.copy`, `Files.move`, `Files.delete`.

Practical:
Copy a file and append content.

### Topic 4: `Path` and `Paths`

Theory:
`Path` is the modern replacement for `File`; compose with `Paths.get` or `Path.of`.

Practical:
Navigate parent, resolve sibling, check existence.

### Topic 5: Walking directory tree

Theory:
`Files.walk` returns a stream of paths.

Practical:
List all `.java` files in a directory.

## Key Concepts

- Buffered I/O for performance
- try-with-resources for streams
- `Files` utility class
- `Path` composition
- Directory walking

## Hands-on Coding

```java
import java.io.*;
import java.nio.file.*;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        Path file = Path.of("sample.txt");

        // write
        Files.writeString(file, "Line 1\nLine 2\nLine 3\n");

        // read all lines
        List<String> lines = Files.readAllLines(file);
        lines.forEach(System.out::println);

        // append
        Files.writeString(file, "Line 4\n",
            StandardOpenOption.APPEND);

        // walk and list txt files
        Files.walk(Path.of("."))
            .filter(p -> p.toString().endsWith(".txt"))
            .forEach(System.out::println);

        Files.delete(file);
    }
}
```

## Mini Exercise

Write a program that reads a CSV file and prints each row's fields separated by `|`.

## Assessment Quiz

1. Why use `BufferedReader` over `FileReader` alone?
2. How to append instead of overwrite with `Files.writeString`?
3. Difference between `Files.copy` and `Files.move`?

Answers:

1. Buffering reduces system calls for large files.
2. Pass `StandardOpenOption.APPEND`.
3. `copy` keeps source; `move` removes source.

## Task

- Build a simple log writer that appends timestamped entries to a log file.

## Day 42 Outcome

You can handle file I/O cleanly using both legacy and modern Java APIs.
