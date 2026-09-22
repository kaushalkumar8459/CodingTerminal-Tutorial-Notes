# Solution — Day 122: Error Handling & Custom Errors

## 1. Safe JSON parsing
```js
function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch (error) {
    return { error: error.message };
  }
}
```

## 2. Error categories
- Syntax error: invalid JavaScript syntax.
- Runtime error: failure while executing valid JavaScript.
- Logical error: code runs but produces the wrong result.

## 3. finally
```js
function runTask() {
  try {
    return "success";
  } catch (error) {
    return "failed";
  } finally {
    console.log("cleanup");
  }
}
```

## 4. Preserve the original error
```js
try {
  riskyOperation();
} catch (error) {
  console.error("Operation failed:", error);
  throw error;
}
```

## 5–6. Built-in error types
```js
function setAge(age) {
  if (typeof age !== "number") throw new TypeError("age must be a number");
  if (age < 0 || age > 150) throw new RangeError("age is out of range");
  return age;
}
```

## 7. Safe divide
```js
function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Both values must be numbers");
  }
  if (b === 0) throw new RangeError("Cannot divide by zero");
  return a / b;
}
```

## 8. Parse user
```js
function parseUser(json) {
  try {
    const user = JSON.parse(json);
    if (!user || typeof user !== "object") {
      throw new TypeError("User must be an object");
    }
    return user;
  } catch (error) {
    throw new Error("Invalid user data", { cause: error });
  }
}
```

## 9. ValidationError
```js
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}
```

## 10. ApiError
```js
class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
```

## 11. Retry selected errors
```js
async function retryNetwork(fn, attempts = 3) {
  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (!(error instanceof ApiError) || error.status < 500 || i === attempts) {
        throw error;
      }
    }
  }
}
```

## 12. Async loading state
```js
async function loadUsers() {
  setLoading(true);
  try {
    const response = await fetch("/users");
    if (!response.ok) throw new ApiError(response.status, "Request failed");
    return await response.json();
  } finally {
    setLoading(false);
  }
}
```

## 13. Preserve cause
```js
try {
  await loadUsers();
} catch (error) {
  throw new Error("Unable to load dashboard", { cause: error });
}
```

## 14. Distinguish error types
Handle known application errors explicitly and let unexpected errors reach a central error boundary/logging layer.

## Interview Answers

15. Empty catch blocks hide failures and make debugging difficult.
16. Handle an error locally when the current layer can recover or provide useful context; otherwise propagate it.
17. `return` represents normal function output; `throw` represents exceptional failure.
18. `finally` runs after success or failure and is useful for cleanup.
19. Extending `Error` preserves standard error behavior such as stack traces and `instanceof`.
20. `cause` keeps the underlying error available while adding higher-level context.
