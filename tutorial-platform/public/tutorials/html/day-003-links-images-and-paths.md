---
title: Links Images and Paths
slug: day-003-links-images-and-paths
dayLabel: Day 3
level: Beginner
estimatedMinutes: 45
order: 3
track: html
---

# Day 3 [Beginner]: Links Images and Paths

## Goal

Connect pages with robust links and add images that remain understandable when they cannot be seen.

## Prerequisites

- Days 1 and 2 completed
- Basic familiarity with folders and files

## Explanation

Hyperlinks are what make documents hypertext. The `a` element creates a link when it has an `href`. Images use `img`, a void element, and need an `alt` decision based on the image's purpose. Both links and images rely on URLs or paths, so understanding where files live prevents broken references.

## Topic by Topic

### Topic 1: Link destinations

```html
<a href="about.html">About this project</a>
<a href="https://developer.mozilla.org/en-US/docs/Web/HTML">HTML reference</a>
<a href="mailto:hello@example.com">Email the team</a>
<a href="tel:+15551234567">Call the office</a>
```

Use link text that describes its destination. “Click here” repeated many times is not meaningful when links are read out of context. A URL can be absolute (a complete address) or relative to the current document. For a file at `pages/about.html`, a page one directory above might link with `../pages/about.html`. Paths are case-sensitive on many web servers, even if a local computer appears forgiving.

The `target` values `_self`, `_blank`, `_parent`, and `_top` select the current context, a new browsing context, the parent frame, or the top-level context. `_parent` and `_top` mainly matter inside frames. Prefer `_self` unless another context is genuinely useful. If using `_blank`, disclose that behavior and add `rel="noopener"` for clarity and compatibility.

Use an anchor for navigation, including navigation that looks like a button. Use a `button` for an action in the current page; scripting a button to imitate a link loses the browser's normal link behavior such as opening in a new tab or copying the destination.

Fragments navigate to an element with a matching `id`:

```html
<a href="#contact">Contact</a>
<h2 id="contact">Contact</h2>
```

IDs must be unique in a document. For a new tab, use `target="_blank"` only when that behavior is useful; include `rel="noopener"` for explicit protection from opener access, and tell users when a link opens a new context. Prefer ordinary same-tab navigation by default.

### Topic 2: Images and alternative text

```html
<img src="images/mountain-trail.jpg" alt="A narrow trail winding through a pine forest" width="1200" height="800">
```

`src` identifies the resource. `alt` is a text alternative, not a filename or image caption. Describe the information the image contributes in context. If an image is purely decorative and adds no information, use `alt=""` so assistive technology can skip it. If an image is the only content in a link, its alternative text should describe the link destination or action.

Providing intrinsic `width` and `height` lets the browser reserve space before the image loads, reducing layout movement. Use an appropriate image size and format rather than sending a huge source for a small display.

An image hosted on another site can disappear, change, or be served under a license that does not permit reuse. Prefer assets you own or are licensed to use, and keep important content images under your site's control where possible. Use CSS `float` only when text should wrap around an image; use modern layout systems for page columns. Decorative backgrounds belong in CSS, but informative images belong in `img` with an appropriate alternative.

### Topic 3: Captions and image groups

Use `figure` and `figcaption` when an image, diagram, or code sample has a caption that belongs with it:

```html
<figure>
  <img src="images/leaf-parts.png" alt="Diagram labeling the blade, veins, and petiole of a leaf" width="900" height="600">
  <figcaption>Three visible parts of a typical leaf.</figcaption>
</figure>
```

A caption does not replace useful `alt` text: the caption is visible to everyone, while alt text provides an equivalent when the image is unavailable or not seen. Avoid duplicating the same sentence in both unless that repetition is necessary to preserve meaning.

### Topic 4: Image maps

An image map uses `usemap` to associate an image with a `map`; each `area` describes a clickable shape and destination. Give each linked area useful alternative text and make sure the image itself has an appropriate alternative.

```html
<img src="campus-map.jpg" alt="Campus map with links to building details" usemap="#campus-map" width="800" height="500">
<map name="campus-map">
  <area shape="rect" coords="40,50,180,160" href="library.html" alt="Library">
  <area shape="circle" coords="320,220,55" href="cafeteria.html" alt="Cafeteria">
</map>
```

Image-map coordinates are tied to the source image dimensions. Scaling the image can make hotspots inaccurate, so test the rendered result at different widths. For responsive or complex graphics, an SVG with explicit links or a list of links beside the image is often easier to maintain and access.

## Recap

- Links need descriptive text and a working `href`; IDs used by fragments must be unique.
- Choose relative paths based on the location of the current document.
- Write image alt text according to the image's purpose, including empty alt text for decorative images.
- Image dimensions and appropriate assets improve loading stability and performance.

## Practice

Create `index.html`, `about.html`, and an `images` folder. Add navigation between the pages, an external reference, an in-page fragment link, and two images: one informative and one decorative. Test every destination and temporarily break an image path to verify its alternative text.

## Further Reading

- [W3Schools HTML Image Maps](https://www.w3schools.com/html/html_images_imagemap.asp)

## What's Next

Day 4 covers lists, data tables, block and inline flow, and grouping content cleanly.