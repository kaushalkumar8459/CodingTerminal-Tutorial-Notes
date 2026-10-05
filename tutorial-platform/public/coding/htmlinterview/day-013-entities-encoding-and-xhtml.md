# Day 013 — Entities, Encoding, URLs, and XHTML

Matches Tutorial Day 13 (Entities Encoding and XHTML).

## Basic

1. Render literal `<`, `>`, and `&` in a paragraph.
2. Write a named and numeric reference for the copyright symbol.
3. Add UTF-8 metadata and type a Unicode character directly.
4. Build a query URL for search text containing spaces and an ampersand.
5. Explain why `/>` does not turn an HTML document into XHTML.

## Concept Questions

6. What is the difference between HTML escaping and URL encoding?
7. Why should `&nbsp;` not be used to create layout spacing?
8. What does XHTML require beyond ordinary HTML syntax?
9. What is the recommended character encoding for new pages?

## Challenge

10. Make a small “HTML character lab” page that displays markup characters, a currency symbol, and multilingual text. Use a JavaScript URL API to encode a search query without encoding URL delimiters.

## Notes

- Save the file as UTF-8 as well as declaring UTF-8 in markup.
- Prefer directly typed Unicode for ordinary symbols; use entities where they clarify markup.