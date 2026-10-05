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