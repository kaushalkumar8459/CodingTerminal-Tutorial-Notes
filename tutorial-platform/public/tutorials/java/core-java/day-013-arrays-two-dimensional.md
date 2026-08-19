---
title: Arrays Two Dimensional
slug: day-013-arrays-two-dimensional
dayLabel: Day 13
level: Beginner
estimatedMinutes: 40
order: 13
track: java
---
# Day 13 [Beginner]: Arrays Two Dimensional

## Goal

Use two-dimensional arrays to represent grid/table-like data.

## Prerequisites

- Day 12 complete

## Explanation

2D arrays are arrays of arrays, useful for matrices and tabular structures.

## Topic by Topic

### Topic 1: Declaration and initialization

Theory:
`int[][] matrix = new int[rows][cols];`

Practical:
Initialize a 3x3 matrix.

### Topic 2: Traversal with nested loops

Theory:
Outer loop for rows, inner loop for columns.

Practical:
Print matrix in grid format.

### Topic 3: Row and column operations

Theory:
Compute row sums and column sums.

Practical:
Find row with maximum sum.

### Topic 4: Jagged arrays

Theory:
Rows can have different lengths.

Practical:
Create jagged array and traverse safely.

## Key Concepts

- Matrix representation
- Nested iteration
- Row/column processing
- Jagged arrays

## Hands-on Coding

```java
public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
    }
}
```

## Mini Exercise

Find diagonal sum of a square matrix.

## Assessment Quiz

1. Why nested loops are needed in 2D arrays?
2. What is jagged array?
3. How to get column count of a row?

Answers:

1. One loop per dimension.
2. Rows with varying lengths.
3. `matrix[row].length`

## Task

- Build matrix input and display program.
- Add row-wise sum output.

## Day 13 Outcome

You can work with matrix-like data and nested loops confidently.
