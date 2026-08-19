---
title: GraalVM Native Images and Startup Time Optimization
slug: day-096_1-graalvm-native-images-and-startup-time-optimization
dayLabel: Day 96_1
level: Expert
estimatedMinutes: 60
order: 96
track: java
---
# Day 96 [Expert]: GraalVM Native Images and Startup Time Optimization

## Goal

Compile Java applications to native binaries using GraalVM AOT, dramatically reducing startup time and memory footprint for serverless and CLI tools.

## Prerequisites

- Day 95 complete

## Explanation

GraalVM Native Image performs ahead-of-time compilation — the JVM is not shipped; the application becomes a native executable that starts in milliseconds with a fraction of JVM memory.

## Topic by Topic

### Topic 1: GraalVM vs JVM tradeoffs

Theory:

- Native: instant startup (<50ms), low RSS; no JIT warm-up; AOT limits dynamic features
- JVM: slow startup (500ms+), higher baseline memory; reaches peak throughput via JIT

Practical:
Benchmark startup time and RSS for Day 30 student app: JVM vs native.

### Topic 2: Closed-world assumption

Theory:
All code reachable from entry point must be known at build time. Reflection, dynamic class loading, and proxies need metadata configuration.

Practical:
Build without config; observe `ClassNotFoundException` or missing method errors.

### Topic 3: Reflection and resource configuration

Theory:
`reflect-config.json`, `resource-config.json`, `proxy-config.json` tell native-image which dynamic features to include.

Practical:
Generate config with the tracing agent: `java -agentlib:native-image-agent=config-output-dir=config/ -jar app.jar`.

### Topic 4: Building and running native image

Theory:
`native-image --no-fallback -jar app.jar -o app-native`; result is a platform-specific binary.

Practical:
Build and run native binary; compare file size, startup time, and peak RSS to JVM.

### Topic 5: Limitations and workarounds

Theory:
Limitations: no runtime class generation, limited `Unsafe`, `SecurityManager` restrictions, serialization needs config.

Practical:
Identify one incompatible dependency in a real project; apply reachability metadata workaround.

## Key Concepts

- AOT compilation model
- Closed-world assumption
- Tracing agent for reflection config
- `native-image` build options
- Startup/memory tradeoff decision criteria

## Hands-on Coding

```bash
# Install GraalVM and native-image
sdk install java 21.0.3-graalce
gu install native-image

# Run with tracing agent to collect reflection config
java -agentlib:native-image-agent=config-output-dir=src/main/resources/META-INF/native-image/ \
     -jar target/myapp.jar
# Exercise all code paths during this run

# Build native image
native-image \
  --no-fallback \
  -cp target/myapp.jar \
  com.example.Main \
  -o target/myapp-native

# Compare
time java -jar target/myapp.jar         # JVM startup
time ./target/myapp-native              # native startup

/usr/bin/time -v ./target/myapp-native  # measure RSS
```

## Mini Exercise

Build Day 30 student management app as native image; measure startup time difference.

## Assessment Quiz

1. What is the closed-world assumption?
2. How to support reflection in native image?
3. When is native image the wrong choice?

Answers:

1. All reachable code must be known at build time — no dynamic class loading at runtime.
2. Provide `reflect-config.json` or use the tracing agent to generate it.
3. Long-running services where JIT peak throughput matters more than startup time.

## Task

- Build Day 74 HTTP client app as native image; test cold-start latency for AWS Lambda style invocation.

## Day 96 Outcome

You can compile Java applications to native binaries and make informed JVM-vs-AOT architectural decisions.
