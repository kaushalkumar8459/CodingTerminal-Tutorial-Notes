# Day 001 — JavaScript Interview Problem Solving

This questions-only set focuses on reasoning about JavaScript behavior, functions, objects, closures, asynchronous code, and browser problems. Predict the result first, then explain why.

## Output and Language Reasoning

1. Explain the difference between an undeclared variable, an uninitialized variable, and a variable with value `undefined`.
2. Predict the output of `typeof null`, `typeof []`, `typeof NaN`, and `typeof typeof 1`.
3. Predict the output of `true + false`, `"2" + true`, and `-"34" + 10`.
4. Explain the difference between `==` and `===` using `false == "0"` and `false === "0"`.
5. Predict the output of `0.1 + 0.2 === 0.3` and explain how to compare floating-point values safely.
6. Explain automatic semicolon insertion using a function whose `return` and object literal are on separate lines.
7. Explain why `delete` removes an object property but does not remove a local variable.
8. Predict the result of deleting an array item and explain why the array length does not change.
9. Explain why object keys created from two different plain objects can overwrite each other.
10. Predict the result of `1 < 2 < 3` and `3 > 2 > 1`.
11. Explain how `||` and `&&` return operand values rather than always returning booleans.
12. Predict the result of assigning to a property through two object references.
13. Explain the difference between an array hole and an array element whose value is `undefined`.
14. Determine whether a value is an integer without relying on `Number.isInteger()`.
15. Explain how `instanceof` works and when it can produce an unexpected result.

## Scope, Functions, and Closures

16. Explain the difference between a function declaration and a function expression during hoisting.
17. Predict the output when a local `var` declaration shadows an outer variable before initialization.
18. Predict the output of a `var` loop containing `setTimeout()` callbacks.
19. Rewrite that loop using `let` and explain the difference.
20. Rewrite the same loop using a closure without changing `var` to `let`.
21. Create a closure-based counter with increment, decrement, and current-value operations.
22. Create a memoization wrapper for a function that accepts two arguments.
23. Implement a `once()` utility that allows a function to run only one time.
24. Implement a currying function that supports both `sum(2, 3)` and `sum(2)(3)`.
25. Implement currying for an unknown number of arguments and finish with an empty call.
26. Explain why a private method created inside a constructor is duplicated for every instance.
27. Implement private state for a bank account using a closure.
28. Implement a function composition utility and distinguish composition order from piping order.
29. Implement a recursive list processor without overflowing the call stack for a very large list.
30. Implement a recursive function that returns a nested property safely when an intermediate value is missing.

## `this`, Objects, and Prototypes

31. Predict the value of `this` inside an object method and inside an arrow function property.
32. Fix a detached object method so it keeps the original object as its `this` value.
33. Demonstrate the difference between `call`, `apply`, and `bind` with the same function.
34. Write a custom `bind()` implementation that supports preset and later arguments.
35. Explain why binding an already bound function does not replace its original context.
36. Create an object with a prototype and access an inherited method.
37. Explain the difference between an own property and an inherited property.
38. Implement a function that visits a DOM element and all descendants using depth-first traversal.
39. Implement breadth-first traversal for a tree represented by nested objects.
40. Deep-clone an object while preserving arrays and handling `null` values.
41. Explain shallow-copy behavior when an object contains a nested object.
42. Compare two objects recursively without relying on JSON string order.
43. Implement a safe object property lookup for a path such as `user.profile.name`.
44. Count the number of own properties in an object without using `Object.keys()`.
45. Build an object index from records and handle duplicate keys with a defined policy.

## Asynchronous and Browser Problem Solving

46. Predict the order of logs from synchronous code, Promise callbacks, and `setTimeout()`.
47. Build a small promise-based delay function and use it in an async workflow.
48. Implement a Promise utility that resolves when all inputs finish while preserving input order.
49. Implement a retrying fetch wrapper with a maximum attempt count and exponential delay.
50. Implement a debounced search callback and explain when it should be used instead of throttling.

## Practice Checklist

For every solution, write the expected output first. Test normal input, empty input, invalid input, and at least one boundary case. Record complexity and explain the JavaScript rule that controls the result.

Sources used for topic inspiration: Toptal JavaScript interview questions, the 123 Essential JavaScript Interview Questions collection, Codementor interview questions, Sudheer Jonna's JavaScript interview collection, and the interview links supplied in the study notes.
