---
title: Serialization Risks and Safe Serialization Strategies
slug: day-077-serialization-risks-and-safe-serialization-strategies
dayLabel: Day 77
level: Advanced
estimatedMinutes: 50
order: 77
track: java
---
# Day 77 [Advanced]: Serialization Risks and Safe Serialization Strategies

## Goal

Understand the security and stability risks of Java serialization and apply safe alternatives.

## Prerequisites

- Day 76 complete
- Day 43 (serialization basics) complete

## Explanation

Java's built-in serialization is listed in the OWASP Top 10 as an insecure deserialization risk. Understanding the attack surface and replacement patterns is mandatory for production-grade Java.

## Topic by Topic

### Topic 1: Insecure deserialization attack surface

Theory:
`ObjectInputStream.readObject()` executes attacker-controlled byte stream; can trigger arbitrary code via gadget chains.

Practical:
Trace how `readObject` on a malicious stream can invoke methods on existing classes.

### Topic 2: Deserialization filters (Java 9+)

Theory:
`ObjectInputFilter` allows allowlist/denylist of classes. Configure globally or per-stream.

Practical:
Set a filter that allows only `java.util.ArrayList` and `com.example.*`.

### Topic 3: JSON serialization with Jackson

Theory:
Map Java objects to/from JSON safely. `ObjectMapper`; `@JsonProperty`, `@JsonIgnore`, `@JsonAlias`.

Practical:
Serialize and deserialize a complex object hierarchy.

### Topic 4: Preventing type confusion with Jackson

Theory:
Disable `enableDefaultTyping`; use `@JsonTypeInfo` carefully; never deserialize to `Object`.

Practical:
Show how `enableDefaultTyping` can be exploited; fix by removing it.

### Topic 5: Protocol Buffers as a safe alternative

Theory:
Binary, schema-first, no code execution on deserialization. Strong versioning support.

Practical:
Define a `.proto`; generate Java classes; serialize/deserialize.

## Key Concepts

- Gadget chain exploitation model
- `ObjectInputFilter` allowlist
- Jackson safe defaults
- `enableDefaultTyping` risk
- Protobuf for type-safe binary serialization

## Hands-on Coding

```java
import java.io.*;

// Deserialization filter — allowlist only known safe classes
public class SafeDeserializer {
    @SuppressWarnings("unchecked")
    public static <T> T deserialize(byte[] bytes, Class<T> expectedType)
            throws Exception {
        try (ObjectInputStream ois = new ObjectInputStream(
                new ByteArrayInputStream(bytes))) {
            ois.setObjectInputFilter(info -> {
                if (info.serialClass() == null) return ObjectInputFilter.Status.ALLOWED;
                String name = info.serialClass().getName();
                if (name.startsWith("com.example.") ||
                    name.startsWith("java.util.")) {
                    return ObjectInputFilter.Status.ALLOWED;
                }
                return ObjectInputFilter.Status.REJECTED;
            });
            return expectedType.cast(ois.readObject());
        }
    }
}
```

```java
// Jackson safe usage
import com.fasterxml.jackson.databind.*;

ObjectMapper mapper = new ObjectMapper();
// NEVER call: mapper.enableDefaultTyping(...)
mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

String json = mapper.writeValueAsString(myObject);
MyType obj = mapper.readValue(json, MyType.class);
```

## Mini Exercise

Replace one use of `ObjectOutputStream` in your codebase with Jackson JSON serialization.

## Assessment Quiz

1. Why is `readObject` dangerous with untrusted input?
2. What does `ObjectInputFilter.Status.REJECTED` do?
3. Why is `enableDefaultTyping` dangerous in Jackson?

Answers:

1. Deserializing can invoke arbitrary `readObject` / `readResolve` methods.
2. Immediately throws `InvalidClassException` for that class.
3. Allows attacker-controlled JSON to specify arbitrary class for deserialization.

## Task

- Add an `ObjectInputFilter` to every `ObjectInputStream` in your Day 43 code.

## Day 77 Outcome

You can identify serialization vulnerabilities and apply safe alternatives and filters.
