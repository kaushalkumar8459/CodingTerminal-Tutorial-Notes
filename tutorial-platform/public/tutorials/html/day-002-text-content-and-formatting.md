---
title: Text Content and Formatting
slug: day-002-text-content-and-formatting
dayLabel: Day 2
level: Beginner
estimatedMinutes: 40
order: 2
track: html
---

# Day 2 [Beginner]: Text Content and Formatting

## Goal

Use HTML text elements to communicate document structure and meaning, rather than choosing tags only for their default visual appearance.

## Prerequisites

- Day 1 completed
- A text editor and browser

## Explanation

Browsers provide default styles for headings, emphasis, and other elements, but HTML is not a collection of visual formatting commands. Pick an element because its meaning matches the content. CSS can change how meaningful content looks without changing its role.

## Topic by Topic

### Topic 1: Headings and paragraphs

Use headings to create a hierarchy. A page normally has one clear main heading, followed by sections with headings at the appropriate level. Do not jump to a heading level just to get smaller text; use CSS for visual sizing.

```html
<h1>Field Guide to Garden Birds</h1>
<p>Learn to identify common birds by their calls and markings.</p>

<h2>Getting started</h2>
<p>Observe from a quiet place and record what you notice.</p>

<h3>Choose a location</h3>
<p>A garden feeder or local park is a good first observation point.</p>
```

Paragraphs use `p`. HTML source whitespace is generally collapsed in normal text, so line breaks in the source do not necessarily create separate visible lines. Use a new paragraph for a new paragraph, not repeated spaces or `<br>` elements.

### Topic 2: Meaningful emphasis and special text

`strong` marks importance; `em` marks stress emphasis. `b` and `i` are appropriate when their non-semantic typographic roles are intended, but they are not substitutes for importance or emphasis. Other useful elements include `mark` for a relevant highlight, `small` for side comments, `del` and `ins` for document edits, `sub` and `sup` for subscript and superscript, and `code` for short code fragments.

```html
<p><strong>Warning:</strong> Disconnect power before opening the case.</p>
<p>Please read the <em>entire</em> instruction before continuing.</p>
<p>The formula is H<sub>2</sub>O, and 10<sup>2</sup> is 100.</p>
<p>Run <code>npm test</code> before opening a pull request.</p>
```

For a longer quotation, use `blockquote`; for a short quotation within a sentence, use `q`. Include a `cite` attribute only when it contains the URL of the source. The `cite` element itself represents the title of a cited work, not a generic citation label.

Other text-related elements express more specific meanings: `abbr` can identify an abbreviation (with an optional expansion in `title`), `dfn` marks the defining instance of a term, `address` provides contact information for the nearest article or page, and `bdo` overrides text direction only when necessary. `bdi` isolates a span whose writing direction is unknown, such as a user-provided name embedded in text with another direction.

Use `abbr` for both abbreviations and acronyms; the old `acronym` element is obsolete and should not be used in new pages.

```html
<p><abbr title="World Health Organization">WHO</abbr> publishes public-health guidance.</p>
<p><dfn>Semantic HTML</dfn> uses elements according to their meaning.</p>
<p>Arabic name: <bdi>ليلى</bdi></p>
<p lang="ar" dir="rtl">مرحبا بالعالم</p>
<p>Direction override example: <bdo dir="rtl">HTML 123</bdo></p>
<address>Contact the workshop team at <a href="mailto:learn@example.com">learn@example.com</a>.</address>
```

Set `lang` and `dir` on a passage when its language or natural direction differs from the surrounding page. Use `bdo` only to deliberately override the bidirectional algorithm; it does not translate text or reverse individual letter shapes. The `u` element indicates a non-textual annotation, such as a proper name in some contexts; use CSS borders when you only need decoration. Never add underline styling to non-links in a way that makes them look like links.

### Topic 3: Line breaks, rules, and character references

Use `br` only when a line break is part of the content, such as a postal address or a poem. Use `hr` for a thematic change between sections. Neither is a spacing tool.

Characters such as `<` and `&` have special meaning in markup. Write them as character references when they are intended as text:

```html
<p>Use &lt; for less than and &amp; for ampersand.</p>
<p>Copyright &copy; 2026 Example Studio.</p>
```

Modern HTML is Unicode-based. Save files as UTF-8, and use a character reference only when it improves clarity or is needed to represent a special character.

## Recap

- Headings express hierarchy; paragraphs express paragraph structure.
- Use `strong` and `em` for meaning, not merely bold or italic appearance.
- Reserve line breaks for meaningful line boundaries and use character references for markup-significant characters.

## Practice

Write a short article with one `h1`, at least two `h2` sections, a nested `h3`, meaningful emphasis, a quotation, and an inline code fragment. Inspect the heading outline and check that the headings make sense when read without their visual styles.

## What's Next

Day 3 covers links, URLs, local paths, images, alternative text, and figures.