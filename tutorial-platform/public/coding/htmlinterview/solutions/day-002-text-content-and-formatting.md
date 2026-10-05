# Day 002 — Solution: Text, Headings, and Meaning

## Basic

**1. Article outline**

```html
<article>
  <h1>Keeping a field journal</h1>
  <h2>What to record</h2>
  <p>Write down the date, location, and conditions.</p>
  <h2>Reviewing notes</h2>
  <p>Compare observations after several visits.</p>
</article>
```

**2. Importance and emphasis**

```html
<p><strong>Safety:</strong> Wear eye protection.</p>
<p>Read the <em>entire</em> label before use.</p>
```

**3. Subscript and superscript:** `<p>Water is H<sub>2</sub>O; 3<sup>2</sup> equals 9.</p>`

**4. Quotations**

```html
<p>The guide says, <q>Observe before you collect.</q></p>
<blockquote cite="https://example.org/field-guide">
  Record what you see before trying to identify it.
</blockquote>
```

**5. Technical text**

```html
<p>Run <code>npm test</code>, then press <kbd>Enter</kbd>.</p>
<p>The program prints <samp>All checks passed</samp>.</p>
```

## Concept Answers

**6. Heading levels:** They expose the outline to browsers and assistive technology; CSS should control visual size.

**7. `strong` vs `b`:** `strong` marks importance. `b` draws attention without adding importance.

**8. `br`:** Use it for a content-required line break, such as a postal address, not paragraph spacing.

**9. Abbreviations:** `abbr` marks an abbreviation and can provide its expansion in `title`. `acronym` is obsolete.

**10. Bidirectional text:** `bdi` isolates unknown-direction text. `dir="rtl"` declares the natural direction of a passage; `bdo` overrides direction deliberately.

## Challenge

```html
<article>
  <h1>Handling samples</h1>
  <p><abbr title="Personal Protective Equipment">PPE</abbr> is required.</p>
  <p><strong>Warning:</strong> Wear gloves when handling <em>all</em> samples.</p>
  <p>Water is H<sub>2</sub>O.</p>
  <blockquote cite="https://example.org/lab-guide">
    Label each sample before storage.
  </blockquote>
  <p>Record the result with <code>sample-log.csv</code>.</p>
</article>
```