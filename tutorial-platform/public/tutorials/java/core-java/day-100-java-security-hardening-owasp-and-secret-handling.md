---
title: Java Security Hardening — OWASP and Secret Handling
slug: day-100-java-security-hardening-owasp-and-secret-handling
dayLabel: Day 100
level: Expert
estimatedMinutes: 60
order: 100
track: java
---
# Day 100 [Expert]: Java Security Hardening — OWASP and Secret Handling

## Goal

Apply OWASP security principles to a Java application and implement production-grade secret management.

## Prerequisites

- Day 99 complete
- Day 75–76 (crypto, TLS) complete

## Explanation

Security is not a feature you add at the end. This day applies the OWASP Top 10 to Java applications and establishes production secret handling patterns.

## Topic by Topic

### Topic 1: Injection defences in Java

Theory:
SQL injection → `PreparedStatement` (Day 57). LDAP injection → parameter escaping. Command injection → avoid `Runtime.exec` with user input.

Practical:
Audit Day 57 CRUD; confirm all inputs are parameterised; find and fix one injection risk.

### Topic 2: Insecure deserialization (OWASP A08)

Theory:
Already covered in Day 77. Key: never deserialize untrusted data without `ObjectInputFilter` allowlist.

Practical:
Add `ObjectInputFilter` to all `ObjectInputStream` usages in the codebase.

### Topic 3: Broken access control (OWASP A01)

Theory:
Validate authorization at every layer — not just the controller. Direct object reference attacks.

Practical:
Add owner-check to every data access method: `if (!obj.ownerId().equals(currentUser)) throw new AccessDeniedException`.

### Topic 4: Cryptographic failures (OWASP A02)

Theory:
HTTPS everywhere; no weak algorithms (MD5, SHA-1, DES, ECB); PBKDF2/bcrypt for passwords.

Practical:
Audit Day 75 `VaultService`; confirm no weak algorithms; add algorithm name constants.

### Topic 5: Secret management in Java

Theory:
Never put secrets in code or config files. Use: environment variables, external vault (HashiCorp Vault), Kubernetes secrets, or cloud secret manager.

Practical:
Replace hardcoded DB password with `System.getenv("DB_PASSWORD")`; validate presence at startup; char[] instead of String for sensitive values.

## Key Concepts

- OWASP Top 10 mapped to Java patterns
- `PreparedStatement` as injection defence
- Owner-based access control checks
- Algorithm deprecation list
- Secrets via environment / vault, not code

## Hands-on Coding

```java
// Secrets from environment — char[] avoids String pool retention
public class DbConfig {
    private final String url;
    private final char[] password;

    public DbConfig() {
        this.url = requireEnv("DB_URL");
        String pass = requireEnv("DB_PASSWORD");
        this.password = pass.toCharArray();
        // Null out String reference asap — JVM may still retain in pool
    }

    private static String requireEnv(String name) {
        String val = System.getenv(name);
        if (val == null || val.isBlank()) {
            throw new IllegalStateException("Required env var missing: " + name);
        }
        return val;
    }

    // Call after use to overwrite sensitive data in memory
    public void clearPassword() { java.util.Arrays.fill(password, '\0'); }
}
```

```java
// Access control check at service layer
public Order getOrder(String orderId, String currentUserId) {
    Order order = repo.findById(orderId)
        .orElseThrow(() -> new NotFoundException(orderId));

    if (!order.ownerId().equals(currentUserId)) {
        throw new AccessDeniedException("Not your order: " + orderId);
    }
    return order;
}
```

## Mini Exercise

Run `mvn dependency-check:check` (from Day 99) + audit Day 60 banking project for all 5 OWASP categories above.

## Assessment Quiz

1. Why use `char[]` for passwords instead of `String`?
2. What is OWASP A01?
3. Correct way to load a DB password in production Java?

Answers:

1. `char[]` can be explicitly zeroed; `String` is immutable and stays in pool until GC.
2. Broken Access Control — most critical OWASP risk.
3. Read from environment variable or secret manager — never hardcoded or in config files.

## Task

- Security audit the Day 60 banking project against all 5 topics; document findings and fixes.

## Day 100 Outcome

You can systematically harden a Java application against the OWASP Top 10 and implement production-grade secret handling.
