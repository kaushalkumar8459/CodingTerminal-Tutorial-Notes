---
title: Capstone Review — Hardening, Documentation, and Production Checklist
slug: day-120-capstone-review-hardening-documentation-and-production-checklist
dayLabel: Day 120
level: Expert
estimatedMinutes: 120
order: 120
track: java
---
# Day 120 [Expert]: Capstone Review — Hardening, Documentation, and Production Checklist

## Goal

Review the Day 119 capstone project against a comprehensive production-readiness checklist and complete all outstanding hardening items.

## Prerequisites

- Day 119 capstone implementation complete

## Explanation

A project is not done when the happy path works. It is done when it fails gracefully, observes itself, handles edge cases, passes security review, and can be maintained by someone other than the original author.

## Production Readiness Review

### Section 1: Security

- [ ] No secrets in code or config files (Day 100)
- [ ] All SQL via `PreparedStatement` — no concatenation (Day 57)
- [ ] `ObjectInputFilter` on all `ObjectInputStream` usages (Day 77)
- [ ] OWASP dependency check: zero HIGH CVEs (Day 99)
- [ ] AES-GCM for any sensitive data at rest (Day 75)
- [ ] TLS configured for all network connections (Day 76)
- [ ] Access control check at every service method (Day 100)

### Section 2: Reliability

- [ ] Retry + circuit breaker on all external calls (Day 114)
- [ ] All transactions roll back on exception (Day 58)
- [ ] Graceful shutdown: in-flight requests complete (Day 89)
- [ ] Health probes: `/live` and `/ready` endpoints (Day 115)
- [ ] Error taxonomy applied — no raw `RuntimeException` thrown (Day 113)
- [ ] No silent exception swallowing (Day 113)

### Section 3: Observability

- [ ] Structured JSON logging with MDC correlation ID (Day 84)
- [ ] OTel traces on every use-case method (Day 115)
- [ ] Micrometer metrics: counters, timers, gauges (Day 115)
- [ ] JFR continuous recording configured (Day 94)
- [ ] GC log enabled: `-Xlog:gc*` (Day 87)

### Section 4: Performance

- [ ] HikariCP configured, not `DriverManager` (Day 59)
- [ ] No N+1 queries (Day 75 reference)
- [ ] No blocking I/O on main thread (Day 89)
- [ ] JMH benchmark for critical hot paths (Day 85)
- [ ] GC: `-XX:+UseZGC` for low pause (Day 87)
- [ ] Virtual thread executor for IO-bound tasks (Day 89)

### Section 5: Architecture

- [ ] ArchUnit tests passing: no layer violations (Day 108)
- [ ] Mutation score > 80% (Day 97)
- [ ] No wildcard imports; Checkstyle passing (Day 109)
- [ ] SpotBugs: zero HIGH findings (Day 109)
- [ ] All public API arguments validated at entry (Day 106)
- [ ] SemVer applied; no breaking changes without MAJOR bump (Day 107)

### Section 6: Documentation

- [ ] README: how to build, run, test, configure
- [ ] Architecture Decision Records (ADR) for key choices
- [ ] API documentation: every public method Javadoc
- [ ] Runbook: how to restart, diagnose common failures
- [ ] CHANGELOG maintained

### Section 7: Build and Deployment

- [ ] Reproducible build: same inputs → same JAR (Day 99)
- [ ] Dependency lock file committed (Day 99)
- [ ] Multi-module layout enforced (Day 108)
- [ ] Native image build succeeds with tracing agent config (Day 96)
- [ ] CI pipeline: compile → test → analyse → package (Day 98)

## Final Self-Assessment

```text
Score each section 0-5:
Security:       /5
Reliability:    /5
Observability:  /5
Performance:    /5
Architecture:   /5
Documentation:  /5
Build:          /5

Total: /35
Production-ready threshold: 28+
```

## Reflection Questions

1. Which day's topic had the most impact on your Day 119 project?
2. Which three areas of the checklist took the most effort?
3. What would you do differently if starting the project again?
4. What would be the first thing to break at 10x the current load?
5. How long would it take a new team member to understand and run the project?

## Day 120 Outcome

You have completed the full 120-day pure Java mastery curriculum. Your capstone project meets production-readiness standards across security, reliability, observability, performance, architecture, documentation, and build engineering.
