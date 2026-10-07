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

<!-- codingterminal-solution:start -->

# Solutions — Day 001: JavaScript Interview Problem Solving

## 1–15. Output and language reasoning

1. An undeclared variable was never declared; reading it throws ReferenceError. A declared-but-not-yet-initialized let/const variable is in the temporal dead zone. A declared variable can explicitly contain undefined.
2. typeof null is "object", arrays are "object", NaN is "number", and typeof typeof 1 is "string".
3. true + false is 1; "2" + true is "2true"; -"34" + 10 is -24.
4. == performs coercion; === does not. Therefore false == "0" is true while false === "0" is false.
5. 0.1 + 0.2 === 0.3 is false because binary floating-point cannot represent many decimal fractions exactly. Compare with a suitable tolerance.
6. A line break after return can trigger automatic semicolon insertion, so return followed by a new line containing an object returns undefined.
7. delete obj.key removes a configurable property. A local variable binding cannot be removed with delete.
8. delete arr[1] creates a hole; array length remains unchanged.
9. Plain object keys are strings or symbols. Object keys such as two different plain objects can both become "[object Object]".
10. 1 < 2 < 3 is true because the first comparison becomes true, then true becomes 1. 3 > 2 > 1 is false because true becomes 1 and 1 > 1 is false.
11. || returns the first truthy operand; && returns the first falsy operand or the final operand.
12. Two variables referencing the same object see each other's mutations because both hold the same reference.
13. A hole has no element at that index; an explicit undefined does. This affects in, Object.keys, and some iteration behavior.
14. Without Number.isInteger, check typeof value === "number", Number.isFinite(value), and Math.floor(value) === value.
15. instanceof checks whether a constructor prototype occurs in the object's prototype chain. Symbol.hasInstance and prototype changes can affect it.

## 16–30. Scope, functions and closures

16. Function declarations are initialized during environment setup and can be called before their declaration. Function expressions follow their binding initialization rules.
17. A local var is hoisted and initialized to undefined, so reading it before assignment reads the local binding.
18. A var loop has one shared binding, so delayed callbacks commonly print the final value.
19. let creates a new binding per loop iteration, so callbacks retain their corresponding value.
20. With var, create a closure for each iteration by passing the current value into another function.
21. Keep a private variable in a closure and return increment, decrement, and value functions.
22. Memoize with a cache keyed by both arguments. Store the result on the first call and reuse it later.
23. once keeps a done flag and cached result; invoke the wrapped function only when done is false.
24. Support both sum(2,3) and sum(2)(3) by checking whether the second argument was supplied.
25. Accumulate arguments in a closure until an empty call, then reduce the collected values.
26. A method defined inside a constructor is created per instance. A prototype method is shared.
27. Keep bank balance private in a closure and expose deposit, withdraw, and getBalance methods.
28. Composition usually applies right-to-left; piping applies left-to-right.
29. For very large lists, prefer iteration or an explicit stack because recursion can exceed the call stack.
30. Split a property path by dots and recursively return undefined when the current value is nullish.

## 31–45. this, objects and prototypes

31. In a normal method call, this is the receiver. An arrow function captures lexical this.
32. Preserve context with bind or call the method through its original object.
33. call passes arguments individually, apply passes an array-like collection, and bind returns a new function.
34. A custom bind returns a function that calls the original with the stored context and preset arguments. Full constructor support needs extra handling.
35. A bound function's this cannot normally be replaced by another bind.
36. Create a child with Object.create(parent) and call an inherited method.
37. Own properties belong directly to the object; inherited properties come from its prototype chain.
38. DFS processes a node before recursively/iteratively visiting its children.
39. BFS uses a queue: remove the next node and enqueue its children.
40. Deep cloning plain objects and arrays requires recursively creating new containers and copying primitive values; handle null first.
41. A shallow copy creates a new outer object but retains references to nested objects.
42. Deep equality compares types, keys, lengths, and corresponding values recursively rather than depending on JSON order.
43. Split a path and reduce through the object using optional chaining or explicit null checks.
44. Object.getOwnPropertyNames(obj).length counts own string properties including non-enumerable ones.
45. Build a Map keyed by the selected property and define whether duplicates overwrite, collect, or reject.

## 46–50. Async and browser

46. Synchronous logs run first, Promise microtasks next, and timer tasks such as setTimeout after them.
47. A delay utility returns a Promise resolved by setTimeout; await it inside an async function.
48. A Promise-all style utility stores each result at its original index and resolves after every input fulfills; reject on the first rejection.
49. Retry with a loop, catch failures, stop at the maximum attempts, and wait with exponential backoff.
50. Debounce delays execution until calls stop; throttle limits execution frequency. Debounce is common for search input and throttle for scroll/resize.

For every solution, record time complexity, auxiliary space, mutation behavior, and boundary cases.

<!-- codingterminal-solution:end -->

