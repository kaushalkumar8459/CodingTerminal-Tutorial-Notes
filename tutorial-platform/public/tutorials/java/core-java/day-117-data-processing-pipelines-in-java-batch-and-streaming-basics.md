---
title: Data Processing Pipelines in Java — Batch and Streaming Basics
slug: day-117-data-processing-pipelines-in-java-batch-and-streaming-basics
dayLabel: Day 117
level: Expert
estimatedMinutes: 55
order: 117
track: java
---
# Day 117 [Expert]: Data Processing Pipelines in Java — Batch and Streaming Basics

## Goal

Design and implement in-process batch and streaming data pipelines in plain Java without framework dependencies.

## Prerequisites

- Day 116 complete
- Day 40 (Streams API) complete

## Explanation

Not every pipeline needs Kafka Streams or Spark. Many production data processing needs are well served by clean, testable Java pipelines that run in-process, compose well, and handle backpressure.

## Topic by Topic

### Topic 1: Pipeline abstraction

Theory:
`Source<T>` → `Transformer<T, R>` → `Sink<R>`. Each is a functional interface. Compose with `andThen`.

Practical:
Build type-safe pipeline builder that chains sources, transformers, and sinks.

### Topic 2: Batch processing patterns

Theory:
Read in chunks; process; write; commit; repeat. Idempotent writes for restartability.

Practical:
Process a 1M-row CSV in 1000-row batches using `Files.lines` + `Collectors.toList` sliding window.

### Topic 3: Backpressure in pull pipelines

Theory:
Consumer pulls at its own rate; source produces on demand. No unbounded queue growth.

Practical:
Implement a `PullSource<T>` backed by a `Spliterator`.

### Topic 4: Error handling in pipelines

Theory:
Collect errors with records rather than stopping the pipeline. `Either<Error, T>` through the chain.

Practical:
Wrap transformer in a try-catch that produces `Either.failure` for bad rows, continuing to next.

### Topic 5: Parallel batch processing

Theory:
Split batch into N partitions; process each on virtual thread; merge results.

Practical:
Parallel-process 5 data files with a virtual thread per file; merge sorted results.

## Key Concepts

- `Source`/`Transformer`/`Sink` pipeline contract
- Chunked batch processing
- Pull-based backpressure
- Error collection without pipeline stop
- Parallel partitioned processing

## Hands-on Coding

```java
// Pipeline building blocks
@FunctionalInterface interface Source<T>            { Stream<T> open(); }
@FunctionalInterface interface Transformer<T, R>    { Stream<R> apply(Stream<T> in); }
@FunctionalInterface interface Sink<T>              { void drain(Stream<T> in); }

class Pipeline<T, R> {
    private final Source<T> source;
    private final Transformer<T, R> transformer;
    private final Sink<R> sink;

    Pipeline(Source<T> source, Transformer<T, R> transformer, Sink<R> sink) {
        this.source = source; this.transformer = transformer; this.sink = sink;
    }

    void run() { sink.drain(transformer.apply(source.open())); }
}

// Batch CSV processor
void processCsv(Path path, int batchSize) throws Exception {
    try (Stream<String> lines = Files.lines(path)) {
        List<String> batch = new ArrayList<>(batchSize);
        lines.forEach(line -> {
            batch.add(line);
            if (batch.size() >= batchSize) {
                processBatch(List.copyOf(batch));
                batch.clear();
            }
        });
        if (!batch.isEmpty()) processBatch(batch);  // final partial batch
    }
}

// Error-collecting transformer
record Row(String data) {}
record ProcessingResult(Row row, String result, Exception error) {
    boolean isSuccess() { return error == null; }
}

List<ProcessingResult> safeProcess(List<Row> rows) {
    return rows.stream().map(row -> {
        try { return new ProcessingResult(row, transform(row), null); }
        catch (Exception e) { return new ProcessingResult(row, null, e); }
    }).toList();
}
```

## Mini Exercise

Build a pipeline that reads integers from a file, filters primes, squares them, and writes to an output file.

## Assessment Quiz

1. What is backpressure?
2. Why process in batches instead of row by row?
3. What does idempotent write mean for restartability?

Answers:

1. Mechanism for consumer to signal to producer that it is overwhelmed.
2. Reduces per-item overhead; enables batch DB inserts; more efficient I/O.
3. Processing the same batch twice produces the same result — safe to restart after failure.

## Task

- Build a batch invoice processor: read CSV, validate, compute totals, write summary report.

## Day 117 Outcome

You can design and implement clean, testable data processing pipelines in pure Java.
