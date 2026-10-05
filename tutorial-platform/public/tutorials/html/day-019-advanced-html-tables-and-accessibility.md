---
title: Advanced HTML Tables and Accessibility
slug: day-019-advanced-html-tables-and-accessibility
dayLabel: Day 19
level: Advanced
estimatedMinutes: 55
order: 19
track: html
---

# Day 19 [Advanced]: Advanced HTML Tables and Accessibility

## Goal

Build and style data tables with clear row and column relationships, including grouped headers and cells that span multiple rows or columns.

## Prerequisites

- Day 4 completed
- Basic CSS knowledge

## Explanation

A data table is a two-dimensional relationship between headers and values. Good markup lets users understand that relationship without relying on position or color alone. CSS can change borders, spacing, and appearance, but it cannot repair an ambiguous data model.

## Topic by Topic

### Topic 1: Table sections, captions, and dimensions

Use `caption` to identify the table, `thead` for column headings, `tbody` for data rows, and `tfoot` for totals or summaries. A table row is `tr`; data cells are `td`; heading cells are `th`. Tables may contain multiple `tbody` groups when the data has meaningful sections.

```html
<table>
  <caption>Quarterly course registrations</caption>
  <thead>
    <tr>
      <th scope="col">Course</th>
      <th scope="col">Quarter</th>
      <th scope="col">Registrations</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">HTML Foundations</th>
      <td>Q1</td>
      <td>42</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row" colspan="2">Total</th>
      <td>42</td>
    </tr>
  </tfoot>
</table>
```

Use `scope="col"` and `scope="row"` for simple header relationships. Prefer responsive CSS over fixed widths and heights; fixed row heights can clip text when users zoom or enlarge text.

### Topic 2: `colspan`, `rowspan`, and complex headers

`colspan` makes one cell span columns, and `rowspan` makes it span rows. Keep spans modest: large irregular grids are difficult to understand, edit, and navigate.

For complex tables where a data cell has multiple applicable headers, use unique IDs on header cells and list their IDs in the data cell's `headers` attribute:

```html
<table>
  <caption>Registrations by course and quarter</caption>
  <thead>
    <tr>
      <th id="course" rowspan="2">Course</th>
      <th id="year" colspan="2">2026</th>
    </tr>
    <tr>
      <th id="q1">Q1</th>
      <th id="q2">Q2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="html-course" scope="row">HTML Foundations</th>
      <td headers="html-course year q1">42</td>
      <td headers="html-course year q2">51</td>
    </tr>
  </tbody>
</table>
```

Every ID must be unique. Use simple `scope` associations when they are enough; test complex relationships with a screen reader because support and announcements can vary.

### Topic 3: Column groups and CSS presentation

`colgroup` with `col` can identify table columns and apply a limited set of column-wide presentation rules. Place it after an optional `caption` and before row groups. A `span` attribute can cover adjacent columns.

```html
<table class="results">
  <caption>Assessment results</caption>
  <colgroup>
    <col class="student-column">
    <col span="2" class="score-columns">
  </colgroup>
  <!-- thead and tbody go here -->
</table>
```

Most table appearance should be styled through CSS selectors on `table`, `th`, `td`, and rows. Typical properties include `border`, `border-collapse`, `border-spacing`, `padding`, `text-align`, and `width`. Zebra stripes can improve row tracking, but retain clear headers, adequate contrast, and a non-color cue for selected or important rows. Hover highlighting must not be the only way to reveal information.

```css
.results {
  width: 100%;
  border-collapse: collapse;
}

.results th,
.results td {
  border-bottom: 1px solid #94a3b8;
  padding: 0.65rem;
  text-align: left;
}

.results tbody tr:nth-child(even) {
  background-color: #f1f5f9;
}
```

Use a horizontally scrollable wrapper for genuinely wide data on small screens, and provide a visible cue that more columns are available. Never convert a table into a page-layout grid; use CSS Grid or Flexbox for layout.

## Recap

- Captions and header cells explain what a table contains and how its values relate.
- Use `colspan` and `rowspan` only when the data relationships call for them.
- Associate complex headers with `id` and `headers`, then test with assistive technology.
- CSS styles tables; table elements should represent data, never visual page layout.

## Practice

Create a monthly report with grouped year/quarter headers, row headers, a total row, and at least one spanning cell. Add responsive overflow handling and CSS borders/spacing. Test the table without CSS, at narrow width, and with a screen reader or accessibility tree inspector.

## Further Reading

- [W3Schools HTML Tables](https://www.w3schools.com/html/html_tables.asp)
- [W3Schools HTML Table Headers](https://www.w3schools.com/html/html_table_headers.asp)
- [W3Schools HTML Table Colgroup](https://www.w3schools.com/html/html_table_colgroup.asp)

## What's Next

Use the HTML element and attribute references when you need details for a specific element, then continue into CSS layout and JavaScript behavior.