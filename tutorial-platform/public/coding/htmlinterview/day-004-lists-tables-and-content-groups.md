# Day 004 — Lists, Tables, and Flow Content

Matches Tutorial Day 4 (Lists Tables and Content Groups).

## Basic

1. Make an unordered list of three supplies.
2. Make an ordered list of three setup steps, then nest a list of two tools inside one step.
3. Create a description list with two HTML terms and definitions.
4. Build a schedule table with a caption and column headers using `scope`.
5. Add a row header to a table and group rows with `thead` and `tbody`.

## Concept Questions

6. When is `ol` more appropriate than `ul`?
7. Where must a nested list appear?
8. What is the difference between phrasing content and flow content?
9. Why is a table inappropriate for page layout?

## Challenge

10. Create a workshop agenda table and a numbered preparation checklist. The page must still make sense when CSS is disabled.

## Notes

- Save complex table styling for Day 19.
- `div` and `span` are generic containers, not semantic replacements for headings or sections.

<!-- codingterminal-solution:start -->

# Day 004 — Solution: Lists, Tables, and Flow Content

## Basic

**1. Supplies**

```html
<ul><li>Notebook</li><li>Pen</li><li>Water</li></ul>
```

**2. Ordered and nested list**

```html
<ol>
  <li>Open the project
    <ul><li>Editor</li><li>Browser</li></ul>
  </li>
  <li>Create the page</li>
  <li>Preview the result</li>
</ol>
```

**3. Description list**

```html
<dl>
  <dt>Element</dt><dd>A semantic unit of HTML content.</dd>
  <dt>Attribute</dt><dd>Additional information on an element.</dd>
</dl>
```

**4–5. Accessible schedule table**

```html
<table>
  <caption>Workshop agenda</caption>
  <thead><tr><th scope="col">Time</th><th scope="col">Topic</th></tr></thead>
  <tbody>
    <tr><th scope="row">09:00</th><td>HTML structure</td></tr>
    <tr><th scope="row">10:00</th><td>Links and images</td></tr>
  </tbody>
</table>
```

## Concept Answers

**6. Ordered list:** Use it when the sequence or ranking matters.

**7. Nesting:** Put the nested list inside the relevant `li` element.

**8. Content categories:** Flow content is allowed in the body; phrasing content is text-level content that can appear in paragraphs. These content models constrain valid nesting even when CSS changes display.

**9. Table layout:** Tables communicate row/column data relationships to assistive technology and are difficult to adapt as page layout.

## Challenge

```html
<h1>Workshop agenda</h1>
<table>
  <caption>Saturday schedule</caption>
  <thead><tr><th scope="col">Time</th><th scope="col">Session</th></tr></thead>
  <tbody>
    <tr><th scope="row">09:00</th><td>Document structure</td></tr>
    <tr><th scope="row">10:30</th><td>Forms and accessibility</td></tr>
  </tbody>
</table>
<h2>Prepare</h2>
<ol><li>Bring a laptop</li><li>Open the starter project</li><li>Test in a browser</li></ol>
```

<!-- codingterminal-solution:end -->

