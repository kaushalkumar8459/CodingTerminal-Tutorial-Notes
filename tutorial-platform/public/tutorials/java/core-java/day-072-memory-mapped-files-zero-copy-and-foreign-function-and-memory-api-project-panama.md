---
title: Memory Mapped Files, Zero-Copy, and Foreign Function and Memory API (Project Panama)
slug: day-072-memory-mapped-files-zero-copy-and-foreign-function-and-memory-api-project-panama
dayLabel: Day 72
level: Advanced
estimatedMinutes: 60
order: 72
track: java
---
# Day 72 [Advanced]: Memory Mapped Files, Zero-Copy, and Foreign Function and Memory API (Project Panama)

## Goal

Use memory-mapped files for high-throughput file I/O, understand zero-copy transfer, and learn Project Panama's FFM API as the modern replacement for JNI.

## Prerequisites

- Day 71 complete

## Explanation

Memory-mapped files map file contents directly into process address space — the OS handles paging without explicit read/write calls. Project Panama (Java 21+ stable) replaces JNI for calling native C/C++ libraries safely.

## Topic by Topic

### Topic 1: Memory-mapped files with `MappedByteBuffer`

Theory:
`FileChannel.map(MapMode, position, size)` returns a `MappedByteBuffer` backed by OS virtual memory.

Practical:
Map a 1GB file and read specific offsets without loading the whole file.

### Topic 2: Zero-copy with `FileChannel.transferTo`

Theory:
OS-level `sendfile` bypasses JVM heap — kernel copies directly from file to socket buffer.

Practical:
Compare time to serve a 100MB file with read-write loop vs `transferTo`.

### Topic 3: Why JNI was painful

Theory:
JNI requires C header generation, is brittle, not type-safe, crashes JVM on error.

Practical:
Show a minimal JNI call sequence to understand the friction.

### Topic 4: Project Panama — Foreign Memory API

Theory:
`Arena`, `MemorySegment` — allocate and access off-heap memory safely with lifecycle control.

Practical:
Allocate off-heap segment, write longs, read them back.

### Topic 5: Foreign Function API — calling C from Java

Theory:
`Linker.nativeLinker()`, `SymbolLookup`, `FunctionDescriptor`, `MethodHandle` from native function.

Practical:
Call C `strlen` from Java using Panama FFM.

## Key Concepts

- OS virtual memory mapping
- Zero-copy kernel path
- JNI drawbacks
- `MemorySegment` lifecycle via `Arena`
- Native function descriptor and linker

## Hands-on Coding

```java
import java.nio.*;
import java.nio.channels.*;
import java.nio.file.*;

// Memory-mapped file read
public class MappedFileDemo {
    public static void main(String[] args) throws Exception {
        Path path = Path.of("large.dat");
        Files.write(path, new byte[4096]);  // 4KB test file

        try (FileChannel fc = FileChannel.open(path, StandardOpenOption.READ)) {
            MappedByteBuffer buf = fc.map(FileChannel.MapMode.READ_ONLY, 0, fc.size());
            System.out.println("First byte: " + buf.get(0));
            System.out.println("Mapped size: " + buf.capacity());
        }

        Files.delete(path);
    }
}
```

```java
// Project Panama FFM — off-heap allocation (Java 22+)
import java.lang.foreign.*;

public class PanamaDemo {
    public static void main(String[] args) throws Throwable {
        try (Arena arena = Arena.ofConfined()) {
            MemorySegment segment = arena.allocate(8 * 4);  // 4 longs
            for (int i = 0; i < 4; i++) {
                segment.setAtIndex(ValueLayout.JAVA_LONG, i, i * 100L);
            }
            for (int i = 0; i < 4; i++) {
                System.out.println(segment.getAtIndex(ValueLayout.JAVA_LONG, i));
            }
        }
    }
}
```

## Mini Exercise

Map a binary file of 1000 integers, compute their sum using `MappedByteBuffer` without loading into array.

## Assessment Quiz

1. Why is `MappedByteBuffer` faster than `BufferedReader` for large files?
2. What is zero-copy?
3. What replaced JNI in modern Java?

Answers:

1. OS handles paging on demand; no JVM-level read loop.
2. Kernel transfers data without copying through JVM heap.
3. Project Panama — Foreign Function and Memory API.

## Task

- Use `FileChannel.transferTo` to implement an HTTP file-serving simulation.

## Day 72 Outcome

You can use memory-mapped I/O for high-throughput access and understand Panama FFM as the modern native interop path.
