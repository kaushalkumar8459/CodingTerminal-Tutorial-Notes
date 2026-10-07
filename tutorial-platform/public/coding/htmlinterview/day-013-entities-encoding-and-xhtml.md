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

<!-- codingterminal-solution:start -->

# Day 013 — Solution: Entities, Encoding, URLs, and XHTML

## Basic

**1. Reserved characters:** `<p>Use &lt;, &gt;, and &amp; in this example.</p>`

**2. Copyright:** `&copy;` and `&#169;` both render ©.

**3. UTF-8**

```html
<head><meta charset="utf-8"></head>
<p>Welcome — مرحبا</p>
```

**4. URL query construction**

```js
const url = new URL("/search", window.location.origin);
url.searchParams.set("q", "HTML & accessibility");
console.log(url.href);
```

`URLSearchParams` encodes the query value while preserving the URL's structural separators.

**5. XHTML:** XHTML uses XML parsing rules and appropriate document/response configuration. A self-closing slash alone does not provide that configuration.

## Concept Answers

**6. Escaping vs URL encoding:** HTML escaping protects markup syntax. URL encoding represents data within a URL component.

**7. Non-breaking spaces:** They change line-breaking behavior and are not a reliable layout tool. Use CSS spacing.

**8. XHTML:** It requires well-formed XML syntax, correct nesting, quoted attributes, closed empty elements, and XML-compatible serving.

**9. Encoding:** UTF-8 is the recommended encoding for modern web documents.

## Challenge

```html
<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>Character Lab</title></head>
  <body>
    <h1>Character Lab</h1>
    <p>Markup signs: &lt; &gt; &amp;</p>
    <p>Price: €25</p>
    <p lang="ar" dir="rtl">مرحبا بالعالم</p>
    <label for="query">Search text</label>
    <input id="query" value="HTML & accessibility">
    <button type="button" id="make-url">Create URL</button>
    <output id="result"></output>
    <script>
      document.querySelector("#make-url").addEventListener("click", () => {
        const url = new URL("/search", window.location.origin);
        url.searchParams.set("q", document.querySelector("#query").value);
        document.querySelector("#result").textContent = url.href;
      });
    </script>
  </body>
</html>
```

<!-- codingterminal-solution:end -->

