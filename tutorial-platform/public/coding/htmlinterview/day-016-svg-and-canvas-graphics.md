# Day 016 — SVG and Canvas Practice

Matches Tutorial Day 16 (SVG and Canvas Graphics).

## Basic

1. Draw a circle and a rectangle in inline SVG.
2. Use `viewBox` so the SVG scales with its container.
3. Give a meaningful SVG an accessible title.
4. Create a canvas with explicit width and height and draw a line using JavaScript.
5. Add nearby text that describes the information in the graphic.

## Concept Questions

6. What is the main difference between SVG and Canvas rendering models?
7. Does a `<canvas>` element draw anything without JavaScript?
8. Why is fallback text alone insufficient for a complex interactive canvas?
9. When is a normal `<img>` a better choice?

## Challenge

10. Create a three-bar chart once as SVG and once as Canvas. Add a text summary and a data table so the underlying values do not exist only in graphics.

## Notes

- Canvas is JavaScript-driven; SVG is markup-based vector graphics.
- Avoid drawing text that can be represented as ordinary HTML.

<!-- codingterminal-solution:start -->

# Day 016 — Solution: SVG and Canvas Practice

## Basic

**1–3. Scalable SVG**

```html
<svg viewBox="0 0 120 80" role="img" aria-labelledby="shape-title">
  <title id="shape-title">A blue circle beside a green rectangle</title>
  <circle cx="25" cy="40" r="18" fill="blue"></circle>
  <rect x="60" y="20" width="45" height="40" fill="green"></rect>
</svg>
```

**4. Canvas line**

```html
<canvas id="line" width="200" height="100">A line rises from the lower left to the upper right.</canvas>
<script>
  const canvas = document.querySelector("#line");
  const context = canvas.getContext("2d");
  context.beginPath();
  context.moveTo(10, 90);
  context.lineTo(190, 10);
  context.stroke();
</script>
```

**5. Text equivalent:** Add a nearby sentence or data table that communicates the information represented visually.

## Concept Answers

**6. SVG and Canvas:** SVG retains individual vector objects in the document; Canvas draws pixels into a bitmap.

**7. Canvas:** No. JavaScript must obtain a drawing context and issue drawing commands.

**8. Complex canvas:** Fallback content may not describe updates or expose interactive regions, so provide a synchronized accessible equivalent.

**9. Image:** Use `img` for a static photograph or existing raster artwork.

## Challenge

```html
<h2>Registrations</h2>
<p>Q1: 42; Q2: 51; Q3: 38.</p>
<table>
  <caption>Registrations by quarter</caption>
  <thead><tr><th scope="col">Quarter</th><th scope="col">Count</th></tr></thead>
  <tbody>
    <tr><th scope="row">Q1</th><td>42</td></tr>
    <tr><th scope="row">Q2</th><td>51</td></tr>
    <tr><th scope="row">Q3</th><td>38</td></tr>
  </tbody>
</table>

<svg viewBox="0 0 180 100" role="img" aria-labelledby="chart-title">
  <title id="chart-title">Registrations: Q1 42, Q2 51, Q3 38</title>
  <rect x="15" y="45" width="35" height="45" fill="#0e7490"></rect>
  <rect x="70" y="35" width="35" height="55" fill="#0e7490"></rect>
  <rect x="125" y="50" width="35" height="40" fill="#0e7490"></rect>
</svg>

<canvas id="chart" width="180" height="100">Bar chart: Q1 42, Q2 51, Q3 38.</canvas>
<script>
  const context = document.querySelector("#chart").getContext("2d");
  const values = [42, 51, 38];
  values.forEach((value, index) => {
    context.fillStyle = "#0e7490";
    context.fillRect(15 + index * 55, 90 - value, 35, value);
  });
</script>
```

<!-- codingterminal-solution:end -->

