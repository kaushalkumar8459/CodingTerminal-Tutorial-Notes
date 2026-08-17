---
title: Java Networking Sockets UDP TCP and Protocol Basics
slug: day-073-java-networking-sockets-udp-tcp-and-protocol-basics
dayLabel: Day 73
level: Advanced
estimatedMinutes: 55
order: 73
track: java
---
# Day 73 [Advanced]: Java Networking Sockets UDP TCP and Protocol Basics

## Goal

Build TCP and UDP socket applications and understand Java's networking model.

## Prerequisites

- Day 72 complete

## Explanation

Java's `java.net` provides TCP (`Socket`/`ServerSocket`) and UDP (`DatagramSocket`) abstractions. Understanding sockets is foundational for any network-facing system, even if you use HTTP libraries on top.

## Topic by Topic

### Topic 1: TCP basics — client/server

Theory:
TCP is connection-oriented, reliable, ordered. `ServerSocket` accepts connections; `Socket` reads/writes streams.

Practical:
Build echo server and client in two threads.

### Topic 2: Multi-client TCP server

Theory:
Accept loop spawns thread per client; use thread pool for production.

Practical:
Handle 3 simultaneous clients using `ExecutorService`.

### Topic 3: UDP basics

Theory:
UDP is connectionless, unreliable, low-latency. `DatagramSocket` sends/receives `DatagramPacket`.

Practical:
Send a time-stamped message from client to server via UDP.

### Topic 4: Socket options

Theory:
`SO_TIMEOUT`, `SO_REUSEADDR`, `TCP_NODELAY`, `SO_RCVBUF` — tune for latency or throughput.

Practical:
Set `setSoTimeout(3000)` and handle `SocketTimeoutException`.

### Topic 5: `InetAddress` and DNS

Theory:
`InetAddress.getByName` resolves hostname; `getAllByName` for all addresses.

Practical:
Look up all IPs for a hostname; print canonical name.

## Key Concepts

- TCP connection lifecycle
- Accept-loop pattern
- UDP packet semantics
- Socket timeouts and options
- DNS resolution via `InetAddress`

## Hands-on Coding

```java
import java.net.*;
import java.io.*;
import java.util.concurrent.*;

// TCP Echo Server
public class EchoServer {
    public static void main(String[] args) throws Exception {
        ExecutorService pool = Executors.newFixedThreadPool(4);
        try (ServerSocket server = new ServerSocket(9000)) {
            System.out.println("Listening on 9000");
            while (true) {
                Socket client = server.accept();
                pool.submit(() -> {
                    try (client;
                         BufferedReader in = new BufferedReader(
                             new InputStreamReader(client.getInputStream()));
                         PrintWriter out = new PrintWriter(
                             client.getOutputStream(), true)) {
                        String line;
                        while ((line = in.readLine()) != null) {
                            out.println("ECHO: " + line);
                        }
                    } catch (IOException e) {
                        System.err.println("Client error: " + e.getMessage());
                    }
                });
            }
        }
    }
}
```

## Mini Exercise

Add a protocol: client sends `HELLO <name>` and server responds `WELCOME <name>`.

## Assessment Quiz

1. Difference between TCP and UDP?
2. What does `SO_TIMEOUT` do?
3. What exception signals a connection refused?

Answers:

1. TCP: reliable, ordered, connection; UDP: unreliable, fast, no connection.
2. `read()` blocks at most that many ms then throws `SocketTimeoutException`.
3. `ConnectException`.

## Task

- Build a chat server where multiple clients receive each other's messages.

## Day 73 Outcome

You can build TCP and UDP socket applications and configure them for real-world use cases.
