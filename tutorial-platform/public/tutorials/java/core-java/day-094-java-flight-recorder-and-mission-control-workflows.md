---
title: Java Flight Recorder and Mission Control Workflows
slug: day-094-java-flight-recorder-and-mission-control-workflows
dayLabel: Day 94
level: Expert
estimatedMinutes: 60
order: 94
track: java
---
# Day 94 [Expert]: Java Flight Recorder and Mission Control Workflows

## Goal

Use JFR as an always-on production profiler and JDK Mission Control (JMC) to analyse recordings with expert-level proficiency.

## Prerequisites

- Day 93 complete
- Day 86 (profiling basics) complete

## Explanation

JFR is the most powerful profiling tool built into the JVM. It captures CPU, allocations, locks, I/O, GC, exceptions, and thread activity with < 1% overhead — making it safe for continuous production use.

## Topic by Topic

### Topic 1: JFR recording modes

Theory:

- **Continuous**: always-on, circular buffer, dump on demand/OOM/exception
- **Fixed duration**: record N seconds, write to file

Practical:
Start a 60-second fixed recording; a continuous recording; trigger dump on `OutOfMemoryError`.

### Topic 2: Key JFR event categories

Theory:
`jdk.CPUSample`, `jdk.ObjectAllocationInNewTLAB`, `jdk.GarbageCollection`, `jdk.MonitorEnter`, `jdk.SocketRead`, `jdk.ExceptionThrown`.

Practical:
Filter a recording to only `jdk.ExceptionThrown`; find top exception classes.

### Topic 3: Custom JFR events

Theory:
Extend `jdk.jfr.Event`; annotate with `@Name`, `@Label`, `@Description`, `@Threshold`.

Practical:
Create `OrderProcessedEvent` with fields `orderId`, `latencyMs`, `status`.

### Topic 4: JMC analysis workflow

Theory:
Open `.jfr` in JMC; Automated Analysis report; drill into flame graph, allocation profiling, lock profiling, and GC view.

Practical:
Load a recording; find the hottest method, the top allocation site, and the longest lock contention period.

### Topic 5: Production continuous recording setup

Theory:
`-XX:StartFlightRecording=name=continuous,maxsize=250m,maxage=1h,dumponexit=true,filename=recording.jfr` — safe for 24/7 production.

Practical:
Configure production-ready continuous JFR; set up dump-on-OOM trigger.

## Key Concepts

- JFR < 1% overhead model
- Circular buffer for continuous recording
- Custom events for domain observability
- JMC automated analysis
- Production startup flags

## Hands-on Coding

```java
// Custom JFR event
import jdk.jfr.*;

@Name("com.example.OrderProcessed")
@Label("Order Processed")
@Description("Emitted after each order is processed")
@Category("Business")
@StackTrace(false)
public class OrderProcessedEvent extends Event {
    @Label("Order ID")
    public String orderId;

    @Label("Latency (ms)")
    public long latencyMs;

    @Label("Status")
    public String status;
}

// Emit in production code
OrderProcessedEvent event = new OrderProcessedEvent();
event.begin();
// ... process order ...
event.orderId = orderId;
event.status = "SUCCESS";
event.commit();    // only written if event duration >= threshold
```

```bash
# Production-safe continuous recording
java \
  -XX:StartFlightRecording=name=prod,\
maxsize=250m,maxage=1h,\
dumponexit=true,filename=prod.jfr,\
settings=profile \
  -XX:FlightRecorderOptions=stackdepth=128 \
  -jar app.jar

# Dump on demand
jcmd <pid> JFR.dump name=prod filename=snapshot.jfr
```

## Mini Exercise

Add `OrderProcessedEvent` to Day 90 engine; verify events appear in a 30-second recording.

## Assessment Quiz

1. Typical JFR overhead for production recording?
2. What is a circular buffer in continuous mode?
3. What does `event.commit()` do when threshold is set?

Answers:

1. Less than 1%.
2. Old events are overwritten when buffer fills — keeps most recent window.
3. Event is written only if its duration exceeded the configured threshold.

## Task

- Add continuous JFR recording to Day 60 banking project; analyse for lock contention hotspots.

## Day 94 Outcome

You can instrument any Java application for continuous production profiling and extract actionable insights from JFR recordings.
