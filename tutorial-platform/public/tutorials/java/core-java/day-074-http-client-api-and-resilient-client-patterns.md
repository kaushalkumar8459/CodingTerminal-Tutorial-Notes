---
title: HTTP Client API and Resilient Client Patterns
slug: day-074-http-client-api-and-resilient-client-patterns
dayLabel: Day 74
level: Advanced
estimatedMinutes: 55
order: 74
track: java
---
# Day 74 [Advanced]: HTTP Client API and Resilient Client Patterns

## Goal

Use Java 11+ `HttpClient` for modern HTTP calls and implement retry, timeout, and circuit-breaker patterns in plain Java.

## Prerequisites

- Day 73 complete

## Explanation

The `java.net.http.HttpClient` (Java 11+) is asynchronous, HTTP/2 capable, and replaces Apache HttpClient / `HttpURLConnection` for new code.

## Topic by Topic

### Topic 1: `HttpClient` setup

Theory:
Builder pattern; configure version, redirect policy, executor, cookie handler.

Practical:
Create shared `HttpClient` with HTTP/2 and 10-second connect timeout.

### Topic 2: Synchronous and async requests

Theory:
`send()` blocks; `sendAsync()` returns `CompletableFuture<HttpResponse<T>>`.

Practical:
Fetch JSON from public API synchronously; then async with callback.

### Topic 3: Request bodies and headers

Theory:
`BodyPublishers.ofString`, `ofFile`, `ofByteArray`; set `Content-Type`, `Authorization`.

Practical:
POST JSON to an endpoint; add Bearer token header.

### Topic 4: Retry pattern

Theory:
Retry on `IOException` or 5xx up to N times with exponential backoff.

Practical:
Wrap `HttpClient.send` in retry loop with `Thread.sleep` backoff.

### Topic 5: Timeout and circuit breaker basics

Theory:
Per-request timeout via `HttpRequest.timeout()`; circuit breaker tracks failure rate and opens after threshold.

Practical:
Implement simple `CircuitBreaker` state machine: CLOSED → OPEN → HALF_OPEN.

## Key Concepts

- `HttpClient` builder and shared instance
- `BodyHandlers` and `BodyPublishers`
- Async pipeline with `CompletableFuture`
- Exponential backoff retry
- Circuit breaker states

## Hands-on Coding

```java
import java.net.http.*;
import java.net.URI;
import java.time.Duration;

public class Main {
    static final HttpClient CLIENT = HttpClient.newBuilder()
        .version(HttpClient.Version.HTTP_2)
        .connectTimeout(Duration.ofSeconds(10))
        .build();

    static HttpResponse<String> getWithRetry(String url, int maxRetries)
            throws Exception {
        for (int attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                HttpRequest req = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .timeout(Duration.ofSeconds(5))
                    .GET()
                    .build();
                HttpResponse<String> resp =
                    CLIENT.send(req, HttpResponse.BodyHandlers.ofString());
                if (resp.statusCode() < 500) return resp;
                System.out.println("Attempt " + attempt + " failed: " + resp.statusCode());
            } catch (Exception e) {
                System.out.println("Attempt " + attempt + " error: " + e.getMessage());
            }
            Thread.sleep((long) Math.pow(2, attempt) * 200);
        }
        throw new RuntimeException("All retries exhausted");
    }

    public static void main(String[] args) throws Exception {
        HttpResponse<String> resp =
            getWithRetry("https://httpbin.org/get", 3);
        System.out.println("Status: " + resp.statusCode());
    }
}
```

## Mini Exercise

Add a `POST /echo` call sending `{"name":"Java"}` and print the response body.

## Assessment Quiz

1. What is the difference between `send` and `sendAsync`?
2. Which `BodyHandler` returns the response as `String`?
3. When does a circuit breaker open?

Answers:

1. `send` blocks; `sendAsync` returns `CompletableFuture`.
2. `HttpResponse.BodyHandlers.ofString()`.
3. When failure rate crosses a threshold within a time window.

## Task

- Build a `WeatherClient` with retry and per-request timeout that fetches from a public weather API.

## Day 74 Outcome

You can build resilient HTTP clients using the modern Java API with retry and timeout patterns.
