---
title: Robust Error Taxonomy and Failure Modeling in Java Systems
slug: day-113-robust-error-taxonomy-and-failure-modeling-in-java-systems
dayLabel: Day 113
level: Expert
estimatedMinutes: 55
order: 113
track: java
---
# Day 113 [Expert]: Robust Error Taxonomy and Failure Modeling in Java Systems

## Goal

Design a consistent, predictable error hierarchy that makes failures self-documenting and easy to handle across all layers.

## Prerequisites

- Day 112 complete
- Day 26 (custom exceptions) complete

## Explanation

Ad-hoc exception throwing produces unpredictable systems where error handling is scattered and contradictory. A deliberate error taxonomy makes failure paths as clear as happy paths.

## Topic by Topic

### Topic 1: Error taxonomy design

Theory:
Categorise by layer and recoverability:

- `DomainException`: business rule violation (recoverable, user-facing)
- `ApplicationException`: use-case failure (system can respond)
- `InfrastructureException`: DB/network/IO (may retry)
- `SystemError`: JVM/OOM (non-recoverable)

Practical:
Map Day 60 banking errors to this taxonomy.

### Topic 2: Error codes and machine-readable errors

Theory:
Pair each exception with a stable `ErrorCode` enum. Consumers map codes to actions without parsing messages.

Practical:
Create `ErrorCode { ACCOUNT_NOT_FOUND, INSUFFICIENT_FUNDS, TRANSFER_LIMIT_EXCEEDED }`.

### Topic 3: Result type pattern

Theory:
`Result<T, E>` wraps success or failure — avoids checked exception propagation noise.

Practical:
Implement `Result<T>` with `success(T)`, `failure(String)`, `isSuccess()`, `map`, `flatMap`.

### Topic 4: Failure models at API boundaries

Theory:
HTTP boundary: translate domain exceptions to RFC 7807 problem details (`application/problem+json`).

Practical:
Write `ProblemDetail.from(DomainException)` converter.

### Topic 5: Logging strategy for errors

Theory:
Log at the system boundary, not at every re-throw. Include error code, correlation ID, and cause chain. Never log and re-throw.

Practical:
Audit Day 52 logging: find log-and-re-throw patterns; fix to log-once-at-boundary.

## Key Concepts

- Layer-aware exception hierarchy
- Stable error codes for machine consumers
- `Result<T>` for non-exceptional failure paths
- RFC 7807 problem detail at API boundary
- Log once at system boundary

## Hands-on Coding

```java
// Error taxonomy base classes
public abstract class DomainException extends RuntimeException {
    private final ErrorCode code;
    protected DomainException(ErrorCode code, String message) {
        super(message); this.code = code;
    }
    public ErrorCode code() { return code; }
}

public class InsufficientFundsException extends DomainException {
    InsufficientFundsException(Money requested, Money available) {
        super(ErrorCode.INSUFFICIENT_FUNDS,
              "Requested %s but only %s available".formatted(requested, available));
    }
}

// Result type
public sealed interface Result<T> permits Result.Success, Result.Failure {
    record Success<T>(T value)   implements Result<T> {}
    record Failure<T>(String msg, ErrorCode code) implements Result<T> {}

    static <T> Result<T> success(T v) { return new Success<>(v); }
    static <T> Result<T> failure(String m, ErrorCode c) { return new Failure<>(m, c); }

    default <U> Result<U> map(java.util.function.Function<T, U> fn) {
        return switch (this) {
            case Success<T> s -> success(fn.apply(s.value()));
            case Failure<T> f -> failure(f.msg(), f.code());
        };
    }
}
```

## Mini Exercise

Convert `TransferMoneyUseCase` to return `Result<TransferReceipt>` instead of throwing.

## Assessment Quiz

1. Why use error codes alongside exception messages?
2. When prefer `Result<T>` over checked exceptions?
3. What is RFC 7807?

Answers:

1. Messages change; codes are stable contracts for automated error handling.
2. When failure is a normal expected outcome — not an exceptional situation.
3. Standard format for HTTP API error responses (`type`, `title`, `status`, `detail`).

## Task

- Design the complete error taxonomy for Day 103 banking project; implement `Result<T>` for all use-case return types.

## Day 113 Outcome

You can model failures as first-class citizens with consistent taxonomy, error codes, and clean propagation.
