# Day 003 — Solution: Links, Images, and Paths

## Basic

**1. Local page link:** `<a href="about.html">Read about the project</a>`

**2. External and email links**

```html
<a href="https://developer.mozilla.org/en-US/docs/Web/HTML">HTML reference</a>
<a href="mailto:team@example.com">Email the team</a>
```

**3. Fragment link**

```html
<a href="#contact">Go to contact details</a>
<h2 id="contact">Contact</h2>
```

**4–5. Informative and decorative images**

```html
<img src="images/route-map.png" alt="Map showing the trail from the visitor center to the lake" width="800" height="500">
<img src="images/leaf-decoration.svg" alt="" width="24" height="24">
```

**6. Figure**

```html
<figure>
  <img src="images/leaf.png" alt="Diagram labeling the leaf blade and stem" width="600" height="400">
  <figcaption>Parts of a broadleaf plant.</figcaption>
</figure>
```

## Concept Answers

**7. URL paths:** Absolute URLs include the scheme and host. Relative paths resolve from the current document or site root.

**8. Alt text:** It should convey the image's purpose in context. Decorative images use empty alt; informative images need a useful equivalent.

**9. New tab:** `_blank` opens a new browsing context. Tell users when this happens and use `rel="noopener"`.

**10. Image-map coordinates:** Hotspot coordinates refer to points in the source image; scaling can change where those points appear.

## Challenge

```html
<nav aria-label="Campus guide">
  <ul>
    <li><a href="library.html">Library details</a></li>
    <li><a href="cafe.html">Cafe details</a></li>
  </ul>
</nav>

<a href="#buildings">Skip to building links</a>
<h1>Campus map</h1>
<img src="images/campus.png" alt="Campus map with library and cafe locations" usemap="#campus" width="800" height="500">
<map name="campus">
  <area shape="rect" coords="40,40,180,160" href="library.html" alt="Library">
  <area shape="circle" coords="330,230,45" href="cafe.html" alt="Cafe">
</map>
<h2 id="buildings">Building links</h2>
<p><a href="library.html">Library</a> | <a href="cafe.html">Cafe</a></p>
```

The list remains usable if a visitor cannot interpret the image map or if the image scales unexpectedly.