---
title: Map Implementations HashMap LinkedHashMap TreeMap
slug: day-034-map-implementations-hashmap-linkedhashmap-treemap
dayLabel: Day 34
level: Intermediate
estimatedMinutes: 50
order: 34
track: java
---
# Day 34 [Intermediate]: Map Implementations HashMap LinkedHashMap TreeMap

## Goal

Use Map implementations correctly and understand key-based storage, ordering, and lookup behavior.

## Prerequisites

- Day 33 complete

## Explanation

Maps store key-value pairs with unique keys. Choice of implementation affects ordering and performance.

## Topic by Topic

### Topic 1: HashMap

Theory:
Hash-based; no guaranteed order; `O(1)` average get/put; allows one `null` key.

Practical:
Build word frequency counter.

### Topic 2: LinkedHashMap

Theory:
Preserves insertion order; small overhead over `HashMap`.

Practical:
Build LRU-style access using `removeEldestEntry`.

### Topic 3: TreeMap

Theory:
Keys sorted by natural order or `Comparator`; `O(log n)` ops.

Practical:
Store student records sorted by name.

### Topic 4: Common operations

Theory:
`getOrDefault`, `putIfAbsent`, `computeIfAbsent`, `merge`, `forEach`.

Practical:
Use `merge` for frequency counting.

### Topic 5: Iterating a Map

Theory:
`entrySet()`, `keySet()`, `values()`.

Practical:
Print sorted map entries.

## Key Concepts

- HashMap hashing and buckets
- LinkedHashMap ordering
- TreeMap sorted keys
- Modern Map API methods

## Hands-on Coding

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        String[] words = {"java", "is", "fast", "java", "is", "great"};

        Map<String, Integer> freq = new HashMap<>();
        for (String w : words) {
            freq.merge(w, 1, Integer::sum);
        }
        System.out.println("Frequencies: " + freq);

        // TreeMap for sorted output
        new TreeMap<>(freq).forEach((k, v) ->
            System.out.println(k + " -> " + v));
    }
}
```

## Mini Exercise

Store 5 country-capital pairs in `TreeMap` and print in reverse alphabetical order.

## Assessment Quiz

1. Does `HashMap` allow `null` values?
2. Difference between `putIfAbsent` and `put`?
3. When use `TreeMap` over `HashMap`?

Answers:

1. Yes, multiple null values; one null key.
2. `putIfAbsent` skips if key already exists.
3. When sorted key traversal is needed.

## Task

- Build a phone book using `TreeMap` with search and list-all features.

## Day 34 Outcome

You can choose and use Map implementations correctly for real data storage needs.
