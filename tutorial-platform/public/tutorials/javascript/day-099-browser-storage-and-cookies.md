---
title: Browser Storage and Cookies
slug: day-099-browser-storage-and-cookies
dayLabel: Day 99
level: Advanced
estimatedMinutes: 25
order: 99
track: javascript
---

# Day 99 [Advanced]: Browser Storage and Cookies

## Goal

Revisit Local/Session Storage (Day 14) alongside cookies, and understand the security considerations of each.

## Prerequisites

- Day 14 (Local/Session Storage)

## Explanation

**Cookies** are another form of browser storage, older than Local/Session Storage, with one key difference: cookies are automatically SENT to the server with every HTTP request to that domain — making them useful for server-side session tracking, but also meaning they add overhead to every request. Local/Session Storage (Day 14), by contrast, stay entirely client-side and are never automatically sent anywhere.

All forms of browser storage share a security consideration: anything stored here is readable via browser DevTools by the user themselves, and potentially by malicious scripts if your site has an XSS vulnerability (Day 93's `innerHTML` warning) — never store highly sensitive data (passwords, full card numbers) in ANY of these.

## Topic by Topic

### Topic 1: Cookies — creating and reading

Theory:
Cookies are small key-value pairs, set via `document.cookie`, with additional attributes like expiration dates.

Code Example:

```js
document.cookie = "username=Aarav; max-age=3600"; // expires in 1 hour (3600 seconds)
console.log(document.cookie); // "username=Aarav" (plus any other cookies present)
```

**Explanation:** `document.cookie` is a somewhat awkward API — setting it doesn't replace ALL cookies, it just adds/updates the one you specify; reading it gives back ALL cookies as one semicolon-separated string, requiring manual parsing for multiple cookies.

**Key Points:**

- Cookies are set via `document.cookie = "key=value; attributes"`.
- `max-age` (in seconds) or `expires` (a specific date) control how long a cookie persists.
- Reading `document.cookie` gives a single string of ALL cookies — parsing multiple cookies requires manual string splitting.

### Topic 2: Cookies vs Local/Session Storage

Theory:
Cookies are automatically sent to the server with every request; Local/Session Storage stay purely client-side, never automatically transmitted.

Code Example:

```js
// Cookies: automatically included in every request to this domain (server can read them)
document.cookie = "sessionToken=abc123";

// Local Storage: purely client-side, NEVER automatically sent anywhere
localStorage.setItem("theme", "dark");
```

**Explanation:** If a server needs to recognize a returning user automatically (like session-based login), cookies are the traditional tool, since the server receives them with every request; Local Storage is better for purely client-side preferences that the server never needs to see directly.

**Key Points:**

- Cookies: automatically sent with every request — useful for server-side session data.
- Local/Session Storage: purely client-side, better for larger amounts of data the server doesn't need automatically.
- Cookies also have a much smaller size limit (~4KB) compared to Local Storage (~5-10MB).

### Topic 3: Storage security considerations

Theory:
None of these storage mechanisms are fully secure against a determined attacker or a site with security vulnerabilities — sensitive data should never be stored client-side at all.

Code Example:

```js
// NEVER do this - readable by anyone with DevTools access, or any XSS vulnerability
localStorage.setItem("creditCardNumber", "4111111111111111"); // BAD

// Better: only store non-sensitive session identifiers, and let the server
// handle truly sensitive data and validation
localStorage.setItem("displayName", "Aarav"); // fine - not sensitive
```

**Explanation:** Anyone can open DevTools and read Local Storage, Session Storage, or cookies directly — and if your site has an XSS vulnerability (malicious script injection, related to Day 93's `innerHTML` warning), an attacker's script could read this data too.

**Key Points:**

- Never store passwords, full payment details, or other highly sensitive data in ANY client-side storage.
- All client-side storage is readable via DevTools by the user, and potentially by malicious injected scripts.
- Sensitive operations/data should be validated and stored server-side, not trusted to the client.

### Topic 4: `httpOnly` cookies (awareness, not hands-on)

Theory:
Servers can set special cookies marked `httpOnly`, which JavaScript CANNOT read at all — used specifically to protect sensitive session tokens from being stolen via XSS.

Practical:
You won't create `httpOnly` cookies from client-side JavaScript (they're set by the SERVER's response headers) — but it's valuable to know they exist as the standard, more secure way to store sensitive session identifiers, precisely because JavaScript can't access them even if your site has an XSS bug.

**Key Points:**

- `httpOnly` cookies are set server-side and are invisible to JavaScript entirely.
- This is a deliberate security measure — even a successful XSS attack can't steal an `httpOnly` cookie via JavaScript.
- Understanding this concept helps you reason about real-world authentication security, even without needing to implement it yourself in this course.

## Recap

- Cookies are automatically sent with every request; Local/Session Storage stay purely client-side.
- Never store highly sensitive data in ANY client-side storage — it's readable via DevTools and potential XSS.
- `httpOnly` cookies (set server-side) are invisible to JavaScript, protecting sensitive session tokens even from XSS attacks.

## What's Next

Practice for today: `public/coding/JavaScript/day-099-local-storage-todo-app.md`. Day 100 covers JSON in full depth.
