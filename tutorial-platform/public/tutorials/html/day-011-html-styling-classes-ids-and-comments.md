---
title: HTML Styling Classes IDs and Comments
slug: day-011-html-styling-classes-ids-and-comments
dayLabel: Day 11
level: Intermediate
estimatedMinutes: 45
order: 11
track: html
---

# Day 11 [Intermediate]: HTML Styling Classes IDs and Comments

## Goal

Connect semantic HTML to CSS and scripts with appropriate attributes, understand the role of HTML colors and comments, and avoid mixing content meaning with visual presentation.

## Prerequisites

- Days 1 through 10 completed
- Basic HTML and familiarity with CSS selectors

## Explanation

HTML answers “what is this content?” CSS answers “how should it look?” JavaScript answers “what should happen?” The browser allows presentation and behavior to be attached in several ways, but separating them usually keeps larger pages easier to maintain. This lesson covers the HTML side of that boundary.

## Topic by Topic

### Topic 1: Inline, internal, and external CSS

The `style` attribute applies CSS to one element. A `style` element can contain page-level CSS, while a `link` element can connect a reusable stylesheet. Prefer external stylesheets for site-wide rules; use inline styles only when there is a specific reason.

```html
<head>
  <link rel="stylesheet" href="/styles/site.css">
</head>
<body>
  <p class="notice">Bring your registration confirmation.</p>
</body>
```

An internal `style` element contains CSS for one document; an inline `style` attribute applies CSS to one element. All three approaches use CSS syntax, but a linked stylesheet usually makes shared rules easier to cache, test, and maintain.

Inline CSS is useful for an isolated demonstration, not as a default for a growing site. An internal stylesheet belongs in `head`; a reusable external stylesheet is connected with `link`. Common CSS properties shown in beginner HTML examples include `color`, `background-color`, `font-family`, `font-size`, `text-align`, `border`, `padding`, and `margin`. These are CSS properties regardless of where the CSS is written.

Background images, repetition, and sizing are also CSS, not HTML attributes. Use a background for decoration; use `img` when the image carries information. `background-size: cover` fills a container while preserving the image's proportions, but may crop it. Avoid relying on fixed background attachment for essential content because mobile behavior differs.

```css
.hero {
  background-image: url("/images/workshop-room.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid #64748b;
  margin: 1rem;
  padding: 1.5rem;
}
```

### Topic 2: Color values belong to CSS

The HTML colors chapter demonstrates values such as named colors, hexadecimal, RGB, and HSL. These are CSS color values, not a separate HTML color system:

```css
.notice {
  color: rgb(15 23 42);
  background-color: #e0f2fe;
  border-color: hsl(199 89% 48%);
}
```

Alpha variants such as `rgba()` and `hsla()` add transparency. Check text/background contrast, do not communicate meaning through color alone, and avoid the deprecated `font` element.

### Topic 3: Classes, IDs, and other attributes

Use `class` to label one or more elements with a reusable category. Use `id` for a unique identifier in the document, such as a fragment destination or a label association. A page may have multiple classes on one element, separated by spaces; an ID must be unique. CSS selectors and JavaScript can use these hooks, but choose semantic HTML first.

`title` may provide advisory information, but it is not a dependable way to expose required instructions. `data-*` stores application-specific data for scripts; it does not create user-facing meaning. Attribute names should be lowercase and values quoted consistently.

The same class can be reused by different elements, and one element can have multiple space-separated classes. IDs should be unique and are useful for fragment links, labels, and one-off script hooks. CSS uses `.class-name` and `#unique-id` selectors; JavaScript should use stable IDs or `classList`/`querySelector` rather than changing an element's inline styles as its only state.

Treat class and ID names as case-sensitive and keep their spelling consistent across HTML, CSS, and JavaScript. An ID value cannot contain ASCII whitespace; HTML permits values that begin with a digit, but choosing a letter-led name avoids extra escaping in CSS selectors.

```html
<h2 id="registration-heading">Register for a workshop</h2>
<p class="notice important">Registration closes Friday.</p>
<div class="notice compact">Bring a photo ID.</div>
```

Both notices share the `notice` class; the first also has the `important` class. The heading's ID is a unique document target, not a reusable category.

Do not teach CSS priority as the absolute rule “ID always beats class, class always beats tag.” The cascade first considers factors such as origin, importance, and cascade layers; specificity and source order resolve later ties. Prefer reusable classes and low-specificity selectors so components remain easy to override.

### Topic 4: Comments, buttons, and authoring conventions

HTML comments begin with `<!--` and end with `-->`. They can help explain non-obvious structure, but anyone who can view the page source can read them. Never place secrets or private notes in comments. Comments are not a replacement for clear code organization.

Use the native `button` element for actions. Inside a form, a button defaults to submit behavior, so specify its type when the intent is different:

```html
<button type="button">Open preferences</button>
<button type="submit">Save changes</button>
```

Keep markup consistently indented, nest elements correctly, use meaningful names, and avoid obsolete presentational tags. A style guide is a team agreement that improves consistency; it does not change HTML semantics.

The old `<marquee>` element is non-standard and obsolete, and `<center>` and `<font>` are obsolete presentational elements. Do not use them in new pages. If content must move, use CSS animation with a pause control and a `prefers-reduced-motion` alternative; essential information must never depend on animation.

The old `<big>` and `<acronym>` elements are also obsolete; use CSS for sizing and `abbr` for abbreviations. Link pseudo-classes such as `:link`, `:visited`, `:hover`, and `:active` let CSS style link states. Keep links distinguishable without color alone, retain a visible keyboard focus style, and avoid removing underlines unless another persistent cue remains.

```css
a:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 3px;
}
```

## Recap

- Use HTML for structure, CSS for presentation, and JavaScript for behavior.
- Use classes for reusable hooks and unique IDs for document identity.
- Comments are visible in source and must not contain secrets.
- Choose semantic native elements such as `button`, and quote attributes consistently.

## Practice

Take a page with inline `style` attributes and presentational tags. Move repeated visual rules to an external stylesheet, replace visual hacks with meaningful elements, and verify that each ID is unique.

## Further Reading

- [W3Schools HTML Styles](https://www.w3schools.com/html/html_styles.asp)
- [W3Schools HTML CSS](https://www.w3schools.com/html/html_css.asp)
- [W3Schools HTML Colors](https://www.w3schools.com/html/html_colors.asp)
- [W3Schools HTML Classes](https://www.w3schools.com/html/html_classes.asp)
- [W3Schools HTML IDs](https://www.w3schools.com/html/html_id.asp)
- [W3Schools HTML Comments](https://www.w3schools.com/html/html_comments.asp)

## What's Next

Day 12 covers page layout, responsive behavior, favicons, and HTML code elements.