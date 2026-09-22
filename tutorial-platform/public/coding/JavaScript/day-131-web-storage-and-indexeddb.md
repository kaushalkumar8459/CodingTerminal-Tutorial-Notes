# Day 131 — Web Storage, Cookies & IndexedDB

## localStorage

1. Store and retrieve strings with localStorage.
2. Serialize structured data with JSON.
3. Handle missing and invalid stored data.
4. Explain persistence and origin scoping.

## sessionStorage

5. Explain how sessionStorage differs from localStorage.
6. Build a temporary form-draft store.
7. Handle storage quota and serialization failures.

## Cookies

8. Explain cookie name/value, expiry, path, domain, Secure, and SameSite at a practical level.
9. Explain the difference between HttpOnly and JavaScript-readable cookies.
10. Understand why sensitive session cookies commonly use HttpOnly and Secure.
11. Explain SameSite behavior at a high level.

## IndexedDB

12. Explain when IndexedDB is preferable to localStorage.
13. Create an object store.
14. Add, read, update, and delete records.
15. Use indexes for lookup.
16. Handle database version upgrades.
17. Design a small offline-first cache.

## Interview Questions

18. localStorage vs sessionStorage?
19. Cookies vs localStorage?
20. Why can HttpOnly cookies not be read by JavaScript?
21. When would you choose IndexedDB?
22. What happens when browser storage quota is exceeded?
23. What should not be stored in browser storage?

## Practice Checklist

Build a small offline cache with IndexedDB and a fallback strategy for unavailable or invalid cached data.
