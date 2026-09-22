# Day 247 — XSS, Sanitization and Security Contexts

## Goal

Understand XSS and Angular's sanitization model.

## Concept

Cross-site scripting occurs when attacker-controlled content is interpreted as executable content in the application's origin.

Angular treats values as untrusted by default and sanitizes or escapes values inserted through templates. Security depends on the context: HTML, Style, URL, and Resource URL have different risks. citeturn0search0turn0search4

## Example

A normal interpolation is safer than manually assigning attacker-controlled HTML:

~~~html
<p>{{ userComment }}</p>
~~~

Do not assume a string is safe merely because it came from your backend.

## Exercise

Create a safe JobHub comment preview and test HTML-like input. Observe what Angular renders and what it removes.

## Common Mistakes

- Using innerHTML for convenience.
- Assuming backend data is automatically trusted.
- Treating every URL as safe.
- Confusing HTML and Resource URL security contexts.

## Interview Questions

1. What is XSS?
2. How does Angular sanitize template values?
3. What are Angular security contexts?
4. Why is Resource URL different from a normal URL?

## Outcome

You can identify XSS risks at the DOM boundary.
