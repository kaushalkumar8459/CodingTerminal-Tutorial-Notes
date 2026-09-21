# Day 122 — Error Handling & Custom Errors

## Basic

1. Use `try...catch` to safely parse a JSON string.
2. Explain the difference between a syntax error, runtime error, and logical error.
3. Use `finally` to guarantee cleanup after an operation.
4. Handle an error from a function without hiding the original error message.
5. Throw a `TypeError` when a function receives an invalid argument type.
6. Throw a `RangeError` when a numeric argument is outside an allowed range.

## Practical Problems

7. Build `divide(a, b)` that throws when `b` is zero or either input is not a number.
8. Build `parseUser(json)` that parses JSON and returns a useful application-level error.
9. Create a `ValidationError` custom error class with a field name and message.
10. Create an `ApiError` custom error class containing status and message.
11. Write a function that retries an operation only for selected error types.
12. Wrap an async API call with `try...catch...finally` and manage loading state correctly.
13. Preserve the original error using the `cause` option when rethrowing a higher-level error.
14. Build a safe `getUser(id)` function that distinguishes validation, network, and unknown errors.

## Interview-style Questions

15. Why should you avoid empty `catch` blocks?
16. When should an error be handled locally and when should it be allowed to propagate?
17. What is the difference between `throw` and `return` for reporting failures?
18. Why is `finally` useful in resource cleanup?
19. Why should custom errors extend `Error`?
20. What is the purpose of `error.cause`?

## Practice Checklist

For every solution, test valid input, invalid input, thrown errors, async rejection, and error propagation. Record the expected error type and message.
