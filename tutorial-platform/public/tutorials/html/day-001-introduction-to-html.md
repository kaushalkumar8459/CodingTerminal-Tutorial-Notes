---
title: Introduction to HTML
slug: day-001-introduction-to-html
dayLabel: Day 1
level: Beginner
estimatedMinutes: 30
order: 1
track: html
---

# Day 1 [Beginner]: Introduction to HTML

## Goal

Understand what HTML does, how a browser turns an HTML document into a page, and how to create a valid first document.

## Prerequisites

- A computer and a modern web browser
- A text editor such as VS Code
- No programming experience required

## Explanation

HTML means **HyperText Markup Language**. It describes the structure and meaning of web content: which text is a heading, where a navigation region begins, which content is a link, and which image needs an alternative description. HTML is a markup language, not a programming language; by itself it does not calculate values or make decisions.

A browser reads HTML source, parses it into a document tree called the **Document Object Model (DOM)**, and uses that tree to display the page. CSS controls presentation, while JavaScript can add behavior. A strong page starts with meaningful HTML because styles, scripts, assistive technology, search engines, and browsers all depend on that structure.

## Topic by Topic

### Topic 1: Elements, tags, and attributes

An HTML element is usually made of an opening tag, content, and a closing tag. Tags are the markup written inside angle brackets. Attributes provide additional information on an element.

```html
<p class="intro">HTML gives this sentence paragraph meaning.</p>
```

Here, `p` is the element name, `class` is an attribute, and the sentence is the content. Attribute values should be quoted. Some elements are **void elements** and do not wrap content, such as `img`, `meta`, and `br`.

Elements can be nested. Close elements in the reverse order in which they were opened:

```html
<p>Read the <strong>important</strong> note.</p>
```
HTML tag and attribute names are case-insensitive in HTML documents, but use lowercase consistently. Quoted attribute values make markup easier to read and avoid parsing mistakes. The simple phrase “opening tag + content + closing tag” describes many elements, but void elements such as `img`, `meta`, `link`, `input`, `br`, and `hr` have no end tag and cannot contain children.

### Topic 2: The minimum document

Create a file named `index.html`, then use a complete document structure:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My First Page</title>
  </head>
  <body>
    <h1>Welcome</h1>
    <p>This is my first web page.</p>
  </body>
</html>
```

`<!doctype html>` selects modern HTML parsing. The `html` element is the document root; `lang` identifies the language. The `head` contains document information, and the `body` contains visible page content. `meta charset` declares text encoding, while the viewport declaration helps the page use the device width on mobile. The `title` appears in the browser tab and is important when the page is bookmarked or listed in search.

The short `<!doctype html>` declaration is the modern HTML doctype. Older HTML and XHTML versions used longer doctypes; use them only when maintaining a historical document, not for a new page. HTML continues as a living standard, so prefer current browser and standards references over memorizing outdated version tables.

### Topic 3: Your first browser feedback loop

Save the file and open it in a browser. Change the heading, save, and refresh. Use the browser's **Inspect** command to view the DOM and the Console to notice parsing or resource errors. The browser may repair invalid markup while parsing, so a page that appears to work is not automatically valid.

## Recap

- HTML defines content structure and meaning; CSS handles appearance and JavaScript adds behavior.
- Elements, tags, and attributes are related but distinct parts of markup.
- Begin documents with a doctype and include language, character encoding, viewport, title, head, and body.
- The DOM is the browser's parsed representation of the HTML document.

## Practice

Create a one-page introduction about yourself with one `h1`, two paragraphs, and a useful page title. Save it as `index.html`, open it in two browsers if available, and inspect the DOM.

## What's Next

Day 2 covers text structure, headings, paragraphs, emphasis, quotations, and character references.