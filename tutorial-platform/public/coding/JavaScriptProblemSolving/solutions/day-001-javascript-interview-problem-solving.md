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
