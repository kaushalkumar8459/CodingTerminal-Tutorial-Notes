# Day 125 — Proxy, Reflect & Property Descriptors

## Property Descriptors

1. Inspect a property's descriptor with `Object.getOwnPropertyDescriptor()`.
2. Create a non-writable property with `Object.defineProperty()`.
3. Create a non-enumerable property and observe its effect on object iteration.
4. Create a getter/setter property using a descriptor.
5. Explain `writable`, `enumerable`, and `configurable`.

## Reflect

6. Use `Reflect.get()` and `Reflect.set()` for object access.
7. Use `Reflect.has()` instead of the `in` operator for a practical example.
8. Use `Reflect.ownKeys()` to inspect string and symbol keys.
9. Compare a failed `Reflect.set()` result with normal assignment behavior.

## Proxy

10. Build a Proxy that logs property reads.
11. Build a Proxy that validates assignments.
12. Build a Proxy that prevents deletion of protected properties.
13. Build a Proxy that supplies a default value for missing properties.
14. Build a Proxy that tracks how many times a property is accessed.
15. Build a reactive-style object that notifies a callback when selected properties change.
16. Use `Reflect` inside Proxy traps to preserve normal object behavior.

## Interview-style Questions

17. What problem does Proxy solve?
18. Why is Reflect commonly used inside Proxy traps?
19. What is a property descriptor?
20. What is the difference between a Proxy and a wrapper function?
21. What are common risks of overusing Proxy?
22. Can a Proxy intercept every operation performed on an object?

## Practice Checklist

Test reads, writes, deletes, missing properties, symbol keys, non-writable properties, and invalid assignments. Document which Proxy trap is triggered for each operation.
