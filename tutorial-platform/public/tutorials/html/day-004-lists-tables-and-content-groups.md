---
title: Lists Tables and Content Groups
slug: day-004-lists-tables-and-content-groups
dayLabel: Day 4
level: Beginner
estimatedMinutes: 45
order: 4
track: html
---

# Day 4 [Beginner]: Lists Tables and Content Groups

## Goal

Represent ordered steps, collections, terms, and tabular data with the elements built for those relationships.

## Prerequisites

- Days 1 through 3 completed

## Explanation

Correct grouping makes content easier to scan and gives browsers and assistive technology information that plain visual formatting cannot provide. Choose a list for a collection, a table for data with row-and-column relationships, and a generic container only when no more meaningful element fits.

## Topic by Topic

### Topic 1: The three list patterns

Use `ul` when order does not matter and `ol` when sequence does matter. Each item belongs in an `li` element. Lists can be nested to show sub-items:

```html
<ol>
  <li>Prepare the workspace</li>
  <li>Install the tools
    <ul>
      <li>Text editor</li>
      <li>Modern browser</li>
    </ul>
  </li>
  <li>Build the first page</li>
</ol>
```

Use `dl` with `dt` and `dd` for terms and their descriptions, metadata pairs, or other name/value groups. Do not use list elements just to obtain bullets; CSS controls list appearance.

An ordered list can show numeric, alphabetic, or Roman-numeral markers with `type`, and can begin at another number with `start`. These affect the list's meaning and sequence, whereas `list-style-type` is CSS presentation. A nested list belongs inside the relevant `li`, not as a direct child of `ul` or `ol`.

```html
<ol type="A" start="3">
  <li>Draft the outline</li>
  <li>Review the structure</li>
</ol>
```

When a list is navigation, place it inside a `nav` region and use links for destinations. A list with CSS markers removed is still a list in the document structure.

### Topic 2: Tables for data, not layout

Tables are for genuinely tabular information. Use `caption` to name the table and `th` for header cells. `scope="col"` or `scope="row"` explicitly associates simple headers with their data.

```html
<table>
  <caption>Workshop schedule</caption>
  <thead>
    <tr>
      <th scope="col">Time</th>
      <th scope="col">Session</th>
      <th scope="col">Room</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">09:00</th>
      <td>HTML foundations</td>
      <td>Room A</td>
    </tr>
  </tbody>
</table>
```

`thead`, `tbody`, and `tfoot` group table rows. A browser may insert `tbody` in the parsed DOM even when it is omitted in source; write explicit sections when they improve clarity. For multi-level headers, irregular cells, column groups, and table styling, continue to Day 19. Do not use tables to position page sections; that confuses the data model and is difficult to adapt to narrow screens.

### Topic 3: Flow content, phrasing content, and generic containers

Many introductory guides call elements “block” or “inline” based on their default CSS display. This is a useful visual shorthand, not the full HTML content model. CSS can change display behavior, but it does not make invalid nesting valid: for example, a `p` cannot contain another `p`, and phrasing content cannot contain arbitrary sectioning content.

`div` is a generic flow container and `span` is a generic phrasing container. Use them when you need a hook for styling or scripting and no semantic element applies. Prefer specific elements such as `main`, `section`, or `article` when they accurately describe the content. CSS can make a `span` display as a block or a `div` display inline; choose the HTML element for meaning, then choose CSS for layout.

```html
<section>
  <h2>Schedule note</h2>
  <p>Doors open at <span class="time-emphasis">8:30 AM</span>.</p>
</section>
```

## Recap

- Use `ol`, `ul`, and `dl` for ordered, unordered, and term-description groups.
- Use tables only for tabular data and label headers clearly.
- Generic `div` and `span` elements are useful, but should not replace meaningful HTML elements.

## Practice

Build a weekly schedule as a table with a caption and scoped headers. Then represent a setup procedure as an ordered list with a nested unordered list. Verify that the information still makes sense when CSS is disabled.

## What's Next

Day 5 introduces form structure, labels, common controls, and how submitted values are named. Day 19 returns to advanced data tables.