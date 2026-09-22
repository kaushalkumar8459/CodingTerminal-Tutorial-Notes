# Day 132 Solutions — Frontend Security

## 1. Unsafe HTML

Avoid:

```js
element.innerHTML = userInput;
```

Prefer text when HTML is not required:

```js
element.textContent = userInput;
```

If trusted HTML is genuinely required, use a well-maintained sanitizer and a carefully defined security policy.

## 2. XSS vs CSRF

**XSS:** attacker-controlled script executes in a victim's browser context.

**CSRF:** a victim's browser is tricked into sending an authenticated request to a site where the victim is already authenticated.

They are different attack classes and can require different defenses.

## 3. Prototype-pollution mindset

Validate input keys before merging untrusted objects and avoid unsafe recursive merge utilities.

## Interview Takeaway

Frontend security is not only about authentication. Treat API data, URL parameters, form values, DOM content, and third-party content as potentially untrusted.
