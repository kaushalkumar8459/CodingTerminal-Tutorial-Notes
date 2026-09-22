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
