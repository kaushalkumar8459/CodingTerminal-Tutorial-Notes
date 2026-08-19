---
title: CLI Tooling in Java — picocli and Distribution Patterns
slug: day-116-cli-tooling-in-java-picocli-and-distribution-patterns
dayLabel: Day 116
level: Expert
estimatedMinutes: 50
order: 116
track: java
---
# Day 116 [Expert]: CLI Tooling in Java — picocli and Distribution Patterns

## Goal

Build production-quality CLI tools in Java using picocli and package them for distribution as native executables.

## Prerequisites

- Day 115 complete
- Day 95 (jlink/jpackage) complete

## Explanation

Java CLI tools have historically suffered from slow startup. GraalVM native image (Day 96) and virtual threads (Day 89) now make Java a competitive choice for high-quality, cross-platform CLI tools.

## Topic by Topic

### Topic 1: picocli basics

Theory:
Annotation-driven CLI framework. `@Command`, `@Option`, `@Parameters`. Auto-generates usage help and completion scripts.

Practical:
Build `db-migrate --url jdbc:... --version 3` command.

### Topic 2: Subcommands

Theory:
`@Command(subcommands = {...})` hierarchy. Each subcommand is its own annotated class.

Practical:
Create `app import`, `app export`, `app status` subcommands.

### Topic 3: Input validation and error handling

Theory:
`@Option(required=true)`, custom `ITypeConverter`, exit codes.

Practical:
Validate that `--output` path is a writable directory; exit with code 2 on invalid input.

### Topic 4: Testing CLI commands

Theory:
`CommandLine.execute(args)` is testable in unit tests; capture `System.out` with `PrintStream` mock.

Practical:
Write JUnit 5 test for `import` command with mock data source.

### Topic 5: Distribution

Theory:

- Fat JAR + JRE bundle: easy, large
- `jlink` + native launcher: medium
- GraalVM native binary: instant startup, OS-specific

Practical:
Package same CLI app all three ways; compare startup time and file size.

## Key Concepts

- picocli annotation model
- Subcommand hierarchy
- Type converters and validators
- Exit code conventions (0=ok, 1=error, 2=usage)
- Distribution format tradeoffs

## Hands-on Coding

```java
import picocli.CommandLine.*;
import picocli.CommandLine;

@Command(name = "datatool",
         description = "Data management CLI",
         subcommands = { ImportCommand.class, ExportCommand.class },
         mixinStandardHelpOptions = true,
         version = "1.0")
public class DataTool implements Runnable {
    public void run() { CommandLine.usage(this, System.out); }

    public static void main(String[] args) {
        System.exit(new CommandLine(new DataTool()).execute(args));
    }
}

@Command(name = "import", description = "Import records from CSV")
class ImportCommand implements Runnable {
    @Option(names = {"-f", "--file"}, required = true,
            description = "Input CSV file")
    java.io.File file;

    @Option(names = {"-n", "--dry-run"},
            description = "Validate without writing")
    boolean dryRun;

    @Override
    public void run() {
        System.out.printf("Importing %s (dryRun=%b)%n", file, dryRun);
    }
}

@Command(name = "export", description = "Export records to CSV")
class ExportCommand implements Runnable {
    @Option(names = {"-o", "--output"}, required = true)
    java.io.File output;

    @Override
    public void run() {
        System.out.println("Exporting to " + output);
    }
}
```

## Mini Exercise

Add a `--format json|csv|table` option to export command with a custom type converter.

## Assessment Quiz

1. What exit code should a CLI return on invalid arguments?
2. How does picocli generate shell completion?
3. Which distribution approach gives instant startup?

Answers:

1. 2 (usage error convention).
2. `generate-completion` subcommand or `AutoComplete.generate()` generates bash/zsh scripts.
3. GraalVM native image.

## Task

- Build a `dbmigrate` CLI with `up`, `down`, `status` subcommands backed by Day 58 JDBC transactions.

## Day 116 Outcome

You can build, test, and distribute production-quality Java CLI tools.
