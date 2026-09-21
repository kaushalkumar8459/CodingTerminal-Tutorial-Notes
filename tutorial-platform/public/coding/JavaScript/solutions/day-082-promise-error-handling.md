# Day 082 — Solution: Promise Error Handling

```js
Promise.reject(new Error("Custom failure")).catch((error) =>
  console.log(error.message),
);
Promise.resolve("first")
  .then(() => Promise.reject(new Error("second failed")))
  .then(() => console.log("third skipped"))
  .catch(console.error)
  .finally(() => console.log("Cleanup done"));

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
Promise.reject(new ValidationError("Invalid input")).catch((error) =>
  console.log(error instanceof ValidationError),
);
```

**5. Different error types**

```js
Promise.reject(new ValidationError("Bad age")).catch((error) => {
  if (error instanceof ValidationError)
    console.log("Validation:", error.message);
  else console.log("Unexpected:", error.message);
});
```

**6–7. Validation and saving**

```js
function validateAge(age) {
  return typeof age === "number" && age >= 0
    ? Promise.resolve(age)
    : Promise.reject(new ValidationError("Age must be non-negative"));
}
function saveUser(age) {
  return Promise.resolve({ saved: true, age });
}
validateAge(25).then(saveUser).then(console.log).catch(console.error);
```

**8. Retry up to three times**

```js
async function retry(operation, maxAttempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}
```

**9. Recover in the middle**

```js
Promise.reject(new Error("optional step failed"))
  .catch(() => "fallback value")
  .then((value) => console.log("continues with", value));
```

## Interview-style questions

**10.** A middle catch can recover and return a replacement value; an end catch handles failures that remain unhandled.

**11.** `finally()` receives no fulfillment value or rejection reason. It is for cleanup that must run either way.

**12.** Custom errors preserve meaningful categories so callers can handle validation, network, and other failures differently.
