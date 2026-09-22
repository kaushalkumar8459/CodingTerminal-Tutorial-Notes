---
title: NIO Channels Buffers and Selectors
slug: day-071-nio-channels-buffers-and-selectors
dayLabel: Day 71
level: Advanced
estimatedMinutes: 55
order: 71
track: java
---
# Day 71 [Advanced]: NIO Channels Buffers and Selectors

## Goal

Use Java NIO for non-blocking, buffer-based I/O and multiplexed I/O with Selectors.

## Prerequisites

- Day 70 complete
- Day 42 (file handling) complete

## Explanation

`java.nio` replaces stream-based I/O with channel-buffer model and adds non-blocking sockets. `Selector` multiplexes many connections on a single thread — the foundation of frameworks like Netty.

## Topic by Topic

### Topic 1: Channels and Buffers

Theory:
Data moves in `ByteBuffer` chunks through `Channel`s. Buffer has position, limit, capacity, and two modes: write mode and read mode (flip to switch).

Practical:
Read a file with `FileChannel` and `ByteBuffer`.

### Topic 2: Buffer flip, compact, clear

Theory:
`flip()` switches from write to read mode; `compact()` moves unread bytes to start; `clear()` resets fully.

Practical:
Write data, flip, read partial, compact, write more.

### Topic 3: Scatter/Gather I/O

Theory:
Read into multiple buffers at once (scatter); write from multiple buffers at once (gather).

Practical:
Read a file header and body into separate buffers.

### Topic 4: Non-blocking `SocketChannel`

Theory:
`channel.configureBlocking(false)` enables non-blocking mode; operations return immediately.

Practical:
Open a non-blocking client socket and check if connection is ready.

### Topic 5: `Selector` for multiplexing

Theory:
Register multiple channels with one `Selector`; `select()` blocks until at least one is ready; iterate `selectedKeys`.

Practical:
Simple single-threaded echo server handling multiple clients via Selector.

## Key Concepts

- Buffer state machine (position/limit/capacity)
- `flip()` for mode switch
- Channel vs Stream
- Non-blocking I/O
- Selector event loop pattern

## Hands-on Coding

```java
import java.nio.*;
import java.nio.channels.*;
import java.nio.file.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // File channel read
        Path path = Path.of("sample.txt");
        Files.writeString(path, "Hello NIO World");

        try (FileChannel fc = FileChannel.open(path)) {
            ByteBuffer buf = ByteBuffer.allocate(64);
            fc.read(buf);
            buf.flip();                          // switch to read mode
            byte[] bytes = new byte[buf.limit()];
            buf.get(bytes);
            System.out.println(new String(bytes));
        }

        Files.delete(path);
    }
}
```

## Mini Exercise

Use `FileChannel.transferTo` to copy one file to another without reading into JVM heap.

## Assessment Quiz

1. What does `buf.flip()` do?
2. Difference between blocking and non-blocking channel?
3. How many threads does a Selector-based server use for N clients?

Answers:

1. Sets limit = position, position = 0 — prepares buffer for reading.
2. Blocking waits for operation to complete; non-blocking returns immediately.
3. One — Selector multiplexes all channels.

## Task

- Build a non-blocking echo server using `ServerSocketChannel` and `Selector`.

## Day 71 Outcome

You understand the NIO buffer-channel model and can build non-blocking I/O applications.
