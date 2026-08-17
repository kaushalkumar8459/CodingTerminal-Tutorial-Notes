---
title: Logging with SLF4J and Logback
slug: day-052-logging-with-slf4j-and-logback
dayLabel: Day 52
level: Intermediate
estimatedMinutes: 45
order: 52
track: java
---
# Day 52 [Intermediate]: Logging with SLF4J and Logback

## Goal

Replace `System.out.println` with structured, configurable logging using SLF4J and Logback.

## Prerequisites

- Day 51 complete

## Explanation

Logging frameworks give you level control, structured output, file rotation, and runtime reconfiguration — essential for production Java applications.

## Topic by Topic

### Topic 1: Why not `System.out`

Theory:
No level filtering, no file output, no structured format, performance penalty in production.

Practical:
Identify three problems with `System.out` in a production service.

### Topic 2: SLF4J as facade

Theory:
SLF4J is an API; Logback, Log4j2, or JUL can be the implementation.

Practical:
Add `slf4j-api` + `logback-classic` dependencies.

### Topic 3: Log levels

Theory:
TRACE < DEBUG < INFO < WARN < ERROR — configure minimum threshold per package.

Practical:
Log same event at each level; set threshold to INFO and observe.

### Topic 4: `logback.xml` configuration

Theory:
Appenders (console, file), encoders (pattern), loggers with levels.

Practical:
Configure rolling file appender with 7-day retention.

### Topic 5: Structured logging best practices

Theory:
Log messages with context (IDs, request details); avoid logging secrets.

Practical:
Add user-id and operation to every log line using MDC.

## Key Concepts

- Facade vs implementation
- Level hierarchy
- Appender and encoder
- MDC for contextual logging
- No sensitive data in logs

## Hands-on Coding

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;

public class OrderService {
    private static final Logger log = LoggerFactory.getLogger(OrderService.class);

    public void processOrder(String orderId) {
        MDC.put("orderId", orderId);
        try {
            log.info("Processing order");
            log.debug("Order details loaded");
            log.warn("Inventory low for order");
        } finally {
            MDC.clear();
        }
    }

    public static void main(String[] args) {
        new OrderService().processOrder("ORD-001");
    }
}
```

```xml
<!-- logback.xml -->
<configuration>
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss} [%X{orderId}] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    <root level="INFO">
        <appender-ref ref="CONSOLE"/>
    </root>
</configuration>
```

## Mini Exercise

Add file appender that writes WARN+ logs to `app-errors.log`.

## Assessment Quiz

1. What is MDC?
2. Why use SLF4J instead of Logback directly?
3. Which log level is correct for a successful payment?

Answers:

1. Mapped Diagnostic Context — thread-local key-value pairs included in log output.
2. Allows swapping the implementation without changing application code.
3. INFO.

## Task

- Add SLF4J/Logback to your Maven project; replace all `System.out` calls.

## Day 52 Outcome

You can set up structured logging with proper levels, configuration, and contextual MDC fields.
