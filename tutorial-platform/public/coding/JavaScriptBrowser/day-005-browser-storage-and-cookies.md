# Day 005 — Browser Storage & Cookies

## localStorage

1. Store and retrieve strings.
2. Serialize JSON data.
3. Handle malformed stored data.
4. Understand origin-based storage.

## sessionStorage

5. Explain sessionStorage lifetime and scope.
6. Build a temporary form-draft feature.

## Cookies

7. Understand cookie name/value, expiry, path, domain, Secure, and SameSite.
8. Explain HttpOnly cookies.
9. Compare browser-readable cookies with server-managed cookies.
10. Explain why cookie authentication can be paired with CSRF protections.

## Storage Design

11. Choose between cookies, localStorage, sessionStorage, and IndexedDB.
12. Explain why browser storage is not a generic secret vault.
13. Handle storage quota and unavailable storage.

## Interview Questions

14. Cookie vs localStorage?
15. localStorage vs sessionStorage?
16. What does HttpOnly do?
17. What does SameSite do?
18. When would IndexedDB be preferred?

## Practice

Design storage for login session state, UI preferences, and an offline question cache, explaining the choice for each.

<!-- codingterminal-solution:start -->

# Day 005 Solutions — Browser Storage & Cookies

## Storage Selection

A practical example:

```text
Authentication session → HttpOnly Secure cookie
UI theme preference   → localStorage
Temporary draft       → sessionStorage
Offline question data → IndexedDB
```

The correct choice depends on threat model, lifetime, size, and access requirements.

## Cookie Flags

A server-managed session cookie commonly uses:

```text
Secure
HttpOnly
SameSite=Lax/Strict (when compatible with the application)
```

The exact SameSite policy depends on the application's cross-site requirements.

## Interview Takeaway

Never treat localStorage or sessionStorage as a secure secret vault. Any JavaScript running in the origin can generally access them.

<!-- codingterminal-solution:end -->

