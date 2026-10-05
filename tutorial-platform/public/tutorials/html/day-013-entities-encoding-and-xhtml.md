---
title: Entities Encoding and XHTML
slug: day-013-entities-encoding-and-xhtml
dayLabel: Day 13
level: Intermediate
estimatedMinutes: 45
order: 13
track: html
---

# Day 13 [Intermediate]: Entities Encoding and XHTML

## Goal

Represent special characters correctly, distinguish HTML escaping from URL encoding, and recognize the stricter syntax rules used by XHTML.

## Prerequisites

- Days 1 through 12 completed
- Familiarity with attributes and URLs

## Explanation

Browsers interpret some characters as markup, so text and attribute values sometimes need escaping. Character encoding determines how text bytes map to characters. XHTML applies XML rules to HTML-like markup; ordinary modern HTML does not require XHTML syntax.

## Topic by Topic

### Topic 1: Character references, symbols, and emoji

Character references begin with `&` and end with `;`. Use named references for markup-sensitive characters:

```html
<p>Use &lt; for “less than” and &amp; for an ampersand.</p>
<p>Copyright &copy; 2026 Example Learning.</p>
```

Numeric references use a decimal or hexadecimal code point. Names are case-sensitive. Use UTF-8 and type ordinary Unicode text directly for most characters; references are useful for reserved characters or when they make a source example clearer. Emoji are Unicode characters, not special HTML elements. Their appearance varies by operating system and font, so do not use emoji as the only label for an important action.

Avoid using repeated `&nbsp;` characters to force visual spacing. Use CSS for layout and normal spaces for text. A non-breaking space or hyphen is appropriate only when keeping a specific phrase together is part of its meaning.

### Topic 2: Character sets and URL encoding

Declare UTF-8 early in the head:

```html
<meta charset="utf-8">
```

Save the file as UTF-8 too; a declaration cannot repair bytes saved in a different encoding. HTML escaping and URL percent-encoding solve different problems. Escape reserved characters for HTML syntax when placing data into markup, and percent-encode URL components when constructing a URL. Do not percent-encode an entire URL indiscriminately, because that can encode separators such as `/`, `?`, and `&` that define its structure.

In JavaScript, use `encodeURIComponent` for a dynamic query parameter value, then let a URL API assemble the full address. Never concatenate untrusted data into HTML markup; use safe DOM APIs and context-appropriate escaping.

For example, `URLSearchParams` safely encodes a query value without encoding the URL's structural separators:

```js
const searchUrl = new URL("/search", window.location.origin);
searchUrl.searchParams.set("q", "HTML & accessibility");
console.log(searchUrl.href);
```

The ampersand inside the search text is encoded as part of the parameter value, while the query string's own separators remain meaningful.

### Topic 3: XHTML and XML-style syntax

XHTML is HTML expressed under XML rules. XML requires well-formed, correctly nested elements, lowercase names, quoted attribute values, and explicit closure of empty elements. A strict XHTML document also uses an appropriate XML content type and document declaration. Merely adding `/>` to HTML void elements does not make a page XHTML.

Modern HTML is parsed using HTML rules and is generally more forgiving. Follow consistent lowercase, quoted attributes, and correct nesting for quality, but do not claim the document is XHTML unless the project actually uses XML parsing and the correct serving configuration.

## Recap

- Character references represent special characters; UTF-8 handles ordinary multilingual text.
- URL encoding is not HTML escaping, and URL components should be encoded in context.
- Emoji are Unicode characters and should not replace accessible labels.
- XHTML follows XML well-formedness and serving requirements; it is not activated by a self-closing slash alone.

## Practice

Write a page containing `<`, `&`, a currency symbol, and an emoji. Verify it is saved and served as UTF-8. Then construct a URL with a query value containing spaces and `&`; ensure the value is encoded as one parameter without encoding the URL delimiters.

## Further Reading

- [W3Schools HTML Entities](https://www.w3schools.com/html/html_entities.asp)
- [W3Schools HTML Symbols](https://www.w3schools.com/html/html_symbols.asp)
- [W3Schools HTML Emojis](https://www.w3schools.com/html/html_emojis.asp)
- [W3Schools HTML Character Sets](https://www.w3schools.com/html/html_charset.asp)
- [W3Schools HTML URL Encode](https://www.w3schools.com/html/html_urlencode.asp)
- [W3Schools HTML XHTML](https://www.w3schools.com/html/html_xhtml.asp)

## What's Next

Day 14 covers advanced form elements and the form and input attributes that control submission behavior.