# Day 009 — Document Head and Validation

Matches Tutorial Day 9 (Document Head Metadata and HTML Quality).

## Basic

1. Add charset, viewport, a unique title, description, and favicon to the document head.
2. Link an external stylesheet and a deferred external script.
3. Explain how `async` differs from `defer` for classic scripts.
4. Use the HTML validator and inspect the browser's parsed DOM.
5. Test every local image, stylesheet, and link path.

## Concept Questions

6. What belongs in `head` and what belongs in `body`?
7. What does a `base` element change?
8. Why should `meta refresh` not be used for normal navigation?
9. Why is a page that renders not necessarily valid HTML?

## Challenge

10. Audit a two-page site: correct document metadata, fix one intentionally broken relative path, validate markup, and list three manual checks an automated validator cannot complete.

## Notes

- Keep script execution order in mind before selecting `async` or `defer`.
- Search snippets may use a meta description; it does not guarantee a search ranking.