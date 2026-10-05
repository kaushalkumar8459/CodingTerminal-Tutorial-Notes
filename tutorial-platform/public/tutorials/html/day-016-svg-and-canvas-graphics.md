---
title: SVG and Canvas Graphics
slug: day-016-svg-and-canvas-graphics
dayLabel: Day 16
level: Advanced
estimatedMinutes: 50
order: 16
track: html
---

# Day 16 [Advanced]: SVG and Canvas Graphics

## Goal

Choose SVG or Canvas for a graphics task, understand the role of HTML in each, and provide an equivalent for users who cannot perceive the visual output.

## Prerequisites

- Day 7 accessibility foundations
- Basic JavaScript knowledge for Canvas examples

## Explanation

SVG is a markup-based vector format. Its shapes remain individual document objects and scale cleanly. Canvas is a bitmap drawing surface; JavaScript draws pixels into it. Neither is a replacement for ordinary semantic HTML when the content is text, a control, or a simple image.

## Topic by Topic

### Topic 1: Inline SVG

An `svg` element can contain vector shapes such as `circle`, `rect`, `line`, `path`, and `text`. Use `viewBox` to define a scalable coordinate system. For a meaningful inline graphic, provide an accessible name and a description where needed; decorative SVGs should be hidden from assistive technology.

```html
<svg viewBox="0 0 120 80" role="img" aria-labelledby="chart-title">
  <title id="chart-title">Three workshop sessions</title>
  <rect x="10" y="20" width="25" height="50" fill="teal"></rect>
  <rect x="48" y="10" width="25" height="60" fill="teal"></rect>
  <rect x="86" y="30" width="25" height="40" fill="teal"></rect>
</svg>
```

If the graphic contains complex data, an accessible name is not enough. Provide the data in a nearby table or a clear text explanation. SVG can also be referenced as an external image; inline SVG exposes its markup to the page and is useful when individual shapes need styling or interaction.

### Topic 2: Canvas and JavaScript drawing

Canvas needs a JavaScript drawing context. Its `width` and `height` attributes establish the drawing buffer dimensions; CSS dimensions scale that buffer and can blur it if the device pixel ratio is ignored.

```html
<canvas id="badge" width="240" height="100">
  A blue badge labeled Workshop participant.
</canvas>
<p id="badge-description">Workshop participant badge, valid for November 14.</p>
<script>
  const canvas = document.getElementById("badge");
  const context = canvas.getContext("2d");
  context.fillStyle = "#075985";
  context.fillRect(0, 0, 240, 100);
  context.fillStyle = "white";
  context.font = "16px sans-serif";
  context.fillText("Workshop participant", 16, 54);
</script>
```

The fallback text inside canvas is useful when the element cannot be rendered, but complex or interactive canvas output needs a synchronized accessible representation as well. Do not put essential labels or controls only in the bitmap. Canvas is often suitable for frequently redrawn scenes; SVG is often better when individual shapes need crisp scaling, text selection, or independent interaction.

### Topic 3: Choosing and testing

Use a normal `img` for a static photograph. Use inline or external SVG for scalable diagrams and icons when its complexity is appropriate. Use Canvas for dynamic pixel-based drawing or large numbers of frequently updated objects. Compare performance with real data, test keyboard and assistive technology access, and avoid drawing text that could be ordinary HTML.

## Recap

- SVG is a scalable object-based graphic; Canvas is a pixel surface drawn by JavaScript.
- A canvas element does not draw graphics by itself.
- Provide a text equivalent for meaningful graphics and interactive output.
- Use the simplest format that meets the task and accessibility requirements.

## Practice

Create the same simple three-bar chart as an SVG and a Canvas. Add a text summary and a data table. Resize both versions and compare crispness, text selection, updating, and keyboard/screen reader usability.

## Further Reading

- [W3Schools HTML Canvas](https://www.w3schools.com/html/html5_canvas.asp)
- [W3Schools HTML SVG](https://www.w3schools.com/html/html5_svg.asp)

## What's Next

Day 17 introduces browser APIs commonly grouped with HTML tutorials: geolocation and drag-and-drop. Both require JavaScript, and geolocation requires user permission.