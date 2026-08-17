---
title: Annotation Processing and Compile Time Code Generation
slug: day-064-annotation-processing-and-compile-time-code-generation
dayLabel: Day 64
level: Advanced
estimatedMinutes: 55
order: 64
track: java
---
# Day 64 [Advanced]: Annotation Processing and Compile Time Code Generation

## Goal

Write a Java annotation processor that generates source code at compile time.

## Prerequisites

- Day 63 complete
- Day 49 (annotations at runtime) complete

## Explanation

Annotation processors (APT) run during `javac` compilation, inspect annotated elements, and generate new `.java` source files. Lombok, MapStruct, Dagger, and AutoValue all use this mechanism.

## Topic by Topic

### Topic 1: Annotation processor lifecycle

Theory:
Javac discovers processors via `ServiceLoader`; calls `process()` in rounds until no new sources are generated.

Practical:
Trace the round model with a print-only processor.

### Topic 2: `AbstractProcessor` structure

Theory:
Override `process()`; use `ProcessingEnvironment` for utilities; `Filer` to write files.

Practical:
Create processor that prints annotated class names to compiler output.

### Topic 3: Reading annotation values

Theory:
`element.getAnnotation(MyAnnotation.class)` or via `AnnotationMirror` for dynamic access.

Practical:
Read `value()` attribute from custom `@Table` annotation.

### Topic 4: Generating source files

Theory:
`filer.createSourceFile(name)` returns `JavaFileObject`; write with `PrintWriter`.

Practical:
Generate a `*Builder` class for every `@Buildable` annotated class.

### Topic 5: Registering the processor

Theory:
Create `META-INF/services/javax.annotation.processing.Processor` file listing the processor class.

Practical:
Package processor into separate JAR; use in another project.

## Key Concepts

- APT round model
- `AbstractProcessor` + `SupportedAnnotationTypes`
- `Filer` for source generation
- ServiceLoader registration
- Separation: processor JAR vs consumer JAR

## Hands-on Coding

```java
@SupportedAnnotationTypes("com.example.Buildable")
@SupportedSourceVersion(SourceVersion.RELEASE_21)
public class BuilderProcessor extends AbstractProcessor {

    @Override
    public boolean process(Set<? extends TypeElement> annotations,
                           RoundEnvironment roundEnv) {
        for (Element el : roundEnv.getElementsAnnotatedWith(Buildable.class)) {
            String className = el.getSimpleName() + "Builder";
            try {
                JavaFileObject file = processingEnv.getFiler()
                    .createSourceFile("com.example." + className);
                try (PrintWriter w = new PrintWriter(file.openWriter())) {
                    w.println("package com.example;");
                    w.println("public class " + className + " {");
                    w.println("    // generated builder");
                    w.println("}");
                }
            } catch (IOException e) {
                processingEnv.getMessager().printMessage(
                    Diagnostic.Kind.ERROR, e.getMessage());
            }
        }
        return true;
    }
}
```

## Mini Exercise

Create `@ToString` processor that generates a `toString()` method listing all fields.

## Assessment Quiz

1. When does annotation processing run?
2. Why use APT instead of runtime reflection for code generation?
3. What is a processing round?

Answers:

1. During `javac` compilation — before `.class` files are produced.
2. Zero runtime overhead; errors caught at compile time.
3. One pass over source elements; repeats if new sources were generated.

## Task

- Write a processor that generates a `*Validator` class for every `@Validate` annotated POJO.

## Day 64 Outcome

You can write annotation processors that generate Java source code at compile time.
