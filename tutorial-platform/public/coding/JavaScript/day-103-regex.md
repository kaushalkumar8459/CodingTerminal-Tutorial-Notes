# Day 103 — Regex: Form Validation Engine

Matches Tutorial Day 103 (Regular Expressions). No limit on how many patterns you build.

## Basic patterns

1. Write a regex that matches a valid email address (reasonable approximation is fine).
2. Write a regex that matches a 10-digit phone number.
3. Write a regex that validates a "strong" password: at least 8 characters, at least
   one uppercase letter, one lowercase letter, one digit, and one special character.
4. Write a regex that matches a basic URL (starting with `http://` or `https://`).
5. Write a regex that matches a valid username: 3-16 characters, letters/digits/underscores only.
6. Write a regex that matches a postal code (pick a format, e.g. 6 digits for India,
   or 5 digits for US).

## Concept

7. Use `.test()` to check each pattern against several valid AND invalid example
   strings — confirm your patterns correctly accept good input and reject bad input.
8. Use `.match()` to EXTRACT all numbers from a string (e.g. `"Order #123 has 4 items
at $56"` → extract `["123", "4", "56"]`).
9. Use `.replace()` with a regex to redact all digits in a string with `*` (e.g. a
   phone number becomes `**********`).
10. Use the `g` flag to find ALL email addresses within a longer block of text.

## Project: Form Validation Engine

11. Build a reusable `validators` object with one regex-based validator function per
    field type (email, phone, password, username, postal code).
12. Build a generic `validateField(value, validatorName)` function that looks up and
    runs the correct validator, returning `true`/`false`.
13. Wire this into a real HTML form (reuse/extend your Day 98 Registration Form),
    replacing the earlier manual checks with proper regex validation.

## Interview-style questions

14. Why is `^` and `$` important when validating that an ENTIRE string matches a
    pattern, rather than just part of it?
15. What's the difference between `.test()` (returns boolean) and `.match()` (returns
    matched text/details)?
16. Why might writing a "perfect" email-validating regex be considered nearly
    impossible in practice (a fun, well-known fact worth knowing)?

## Notes

- Build your regex patterns INCREMENTALLY — start simple, test against real examples,
  then add complexity piece by piece rather than trying to write the whole pattern at once.
- Keep a personal "regex cheat sheet" file of the patterns you build today — you'll
  reuse these exact patterns constantly in future projects.
