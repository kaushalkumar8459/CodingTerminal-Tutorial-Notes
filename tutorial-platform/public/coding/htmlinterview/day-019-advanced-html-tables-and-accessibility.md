# Day 019 — Advanced Data Tables

Matches Tutorial Day 19 (Advanced HTML Tables and Accessibility).

## Basic

1. Add a `caption`, `thead`, `tbody`, and `tfoot` to a data table.
2. Mark column headers with `scope="col"` and row headers with `scope="row"`.
3. Make one header span two columns with `colspan`.
4. Make a category label span two rows with `rowspan`.
5. Add a `colgroup` with two `col` elements.
6. Style borders, cell padding, and alternating row backgrounds with CSS.

## Concept Questions

7. When should you use `scope`, and when might `headers` be needed?
8. Why should complex header grids be kept as simple as possible?
9. What is the purpose of `colgroup` and `col`?
10. How can a wide table remain usable on a narrow screen?

## Challenge

11. Build a quarterly report with grouped year/quarter headers, row headers, a total row, and responsive overflow. Keep the data understandable without color or CSS.

## Notes

- Tables express relationships in data; use Grid or Flexbox for page layout.
- Test complex header associations with an accessibility tree or screen reader.

<!-- codingterminal-solution:start -->

# Day 019 — Solution: Advanced Data Tables

## Basic

**1–5. Grouped quarterly table**

```html
<table>
  <caption>Course registrations by quarter</caption>
  <colgroup>
    <col>
    <col span="2">
  </colgroup>
  <thead>
    <tr>
      <th scope="col" rowspan="2">Course</th>
      <th scope="colgroup" colspan="2">2026</th>
    </tr>
    <tr><th scope="col">Q1</th><th scope="col">Q2</th></tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">HTML</th>
      <td>42</td>
      <td>51</td>
    </tr>
    <tr>
      <th scope="row">CSS</th>
      <td>35</td>
      <td>47</td>
    </tr>
  </tbody>
  <tfoot>
    <tr><th scope="row">Total</th><td>77</td><td>98</td></tr>
  </tfoot>
</table>
```

**6. CSS presentation**

```css
table { width: 100%; border-collapse: collapse; }
th, td { border-bottom: 1px solid #64748b; padding: 0.6rem; text-align: left; }
tbody tr:nth-child(even) { background: #f1f5f9; }
```

## Concept Answers

**7. Header association:** `scope` is suitable for regular row/column relationships. Use unique header IDs and `headers` on data cells for complex associations.

**8. Simplicity:** Irregular spans increase navigation and maintenance difficulty. Prefer splitting unrelated data into separate tables.

**9. Column groups:** `colgroup` and `col` identify columns and allow limited column-wide presentation rules.

**10. Narrow screens:** Put a genuinely wide table in a labeled horizontal scroll region; preserve semantic table markup and provide a cue that more columns are available.

## Challenge

```html
<div role="region" aria-label="Quarterly registration report" tabindex="0" style="overflow-x:auto">
  <table>
    <caption>Registrations by course and quarter</caption>
    <thead>
      <tr><th id="course" rowspan="2">Course</th><th id="year" colspan="2">2026</th></tr>
      <tr><th id="q1">Q1</th><th id="q2">Q2</th></tr>
    </thead>
    <tbody>
      <tr><th id="html" scope="row">HTML</th><td headers="html year q1">42</td><td headers="html year q2">51</td></tr>
      <tr><th id="css" scope="row">CSS</th><td headers="css year q1">35</td><td headers="css year q2">47</td></tr>
    </tbody>
    <tfoot><tr><th scope="row">Total</th><td>77</td><td>98</td></tr></tfoot>
  </table>
</div>
```

The `headers` associations explicitly identify the applicable course, year, and quarter. Keep the caption and text values; the colors are optional presentation.

<!-- codingterminal-solution:end -->

