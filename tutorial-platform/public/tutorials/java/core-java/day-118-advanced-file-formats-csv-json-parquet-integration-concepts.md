---
title: Advanced File Formats — CSV, JSON, Parquet Integration Concepts
slug: day-118-advanced-file-formats-csv-json-parquet-integration-concepts
dayLabel: Day 118
level: Expert
estimatedMinutes: 55
order: 118
track: java
---
# Day 118 [Expert]: Advanced File Formats — CSV, JSON, Parquet Integration Concepts

## Goal

Handle CSV, JSON, and Parquet file formats correctly in Java — including edge cases, large file streaming, and schema evolution.

## Prerequisites

- Day 117 complete

## Explanation

File format bugs are a major source of production data pipeline failures. Handling quotes in CSV, polymorphic JSON, Parquet schema evolution, and large file streaming all require deliberate technique.

## Topic by Topic

### Topic 1: CSV edge cases with OpenCSV / univocity

Theory:
RFC 4180 CSV has quoted fields, embedded commas, embedded newlines. `String.split(",")` is always wrong for real CSV.

Practical:
Parse a CSV with embedded commas and newlines; write rows safely.

### Topic 2: JSON with Jackson — advanced patterns

Theory:
`@JsonTypeInfo` for polymorphic types. `@JsonView` for projection. `ObjectReader`/`ObjectWriter` for thread-safe reuse. Streaming API for large files.

Practical:
Deserialize a polymorphic event JSON array; project different fields per API consumer.

### Topic 3: Jackson streaming for large JSON

Theory:
`JsonParser` reads token by token without loading the whole file into memory.

Practical:
Stream-parse a 500MB JSON array; count records without OOM.

### Topic 4: Parquet integration concepts

Theory:
Columnar binary format; excellent for analytics; schema evolution via `required`→`optional` fields. Apache Parquet Java library reads/writes.

Practical:
Write and read a Parquet file with a simple schema; add a new optional field.

### Topic 5: Schema validation

Theory:
Validate JSON against JSON Schema using `networknt/json-schema-validator`. Validate CSV headers against expected schema at file start.

Practical:
Reject JSON payloads that miss required fields or have wrong types before processing.

## Key Concepts

- RFC 4180 correct CSV parsing
- Jackson polymorphic JSON
- Streaming parser for large files
- Parquet columnar + schema evolution
- Schema validation at ingestion boundary

## Hands-on Coding

```java
// Jackson streaming for large JSON
import com.fasterxml.jackson.core.*;

long countRecords(Path file) throws Exception {
    long count = 0;
    try (JsonParser parser = new JsonFactory()
            .createParser(file.toFile())) {
        if (parser.nextToken() != JsonToken.START_ARRAY)
            throw new IllegalArgumentException("Expected JSON array");
        while (parser.nextToken() != JsonToken.END_ARRAY) {
            parser.skipChildren();  // skip each object
            count++;
        }
    }
    return count;
}

// Polymorphic JSON with @JsonTypeInfo
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes({
    @JsonSubTypes.Type(value = OrderPlaced.class, name = "ORDER_PLACED"),
    @JsonSubTypes.Type(value = PaymentReceived.class, name = "PAYMENT_RECEIVED")
})
sealed interface DomainEvent permits OrderPlaced, PaymentReceived {}

record OrderPlaced(String orderId, String customerId) implements DomainEvent {}
record PaymentReceived(String paymentId, double amount) implements DomainEvent {}
```

## Mini Exercise

Stream-parse a 100MB JSON array of order records; build in-memory summary (total count, total amount) without loading all records.

## Assessment Quiz

1. Why is `String.split(",")` wrong for CSV?
2. What is the advantage of columnar storage (Parquet)?
3. When use Jackson streaming vs tree model?

Answers:

1. It doesn't handle quoted fields containing commas or newlines.
2. Analytics queries that read only specific columns scan far less data.
3. Streaming for large files where full in-memory load would OOM; tree model for small, frequently accessed documents.

## Task

- Build a batch pipeline (Day 117 pattern) that ingests a JSON file, validates schema, transforms to CSV output.

## Day 118 Outcome

You can handle all major data file formats correctly at production scale including edge cases and schema evolution.
