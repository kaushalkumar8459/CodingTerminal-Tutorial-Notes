# Day 008 — Solution: Media, Responsive Images, and Frames

## Basic

**1–3. Video with controls and captions**

```html
<video controls width="800" height="450" preload="metadata" poster="media/preview.jpg">
  <source src="media/talk.webm" type="video/webm">
  <source src="media/talk.mp4" type="video/mp4">
  <track src="captions/talk-en.vtt" kind="captions" srclang="en" label="English" default>
  <p>Video unavailable. <a href="media/talk.mp4">Download the MP4</a>.</p>
</video>
```

**4. Responsive image**

```html
<picture>
  <source srcset="images/garden-wide.webp" media="(min-width: 700px)" type="image/webp">
  <img src="images/garden.jpg" alt="Volunteers planting seedlings in a garden" width="800" height="600">
</picture>
```

**5. Iframe**

```html
<iframe src="https://example.com/map" title="Map showing the workshop location" loading="lazy"></iframe>
```

## Concept Answers

**6. Metadata preload:** It asks the browser to fetch media metadata, not necessarily the complete media file.

**7. Captions and transcript:** Captions synchronize speech and relevant sounds with video. A transcript is a text version of the complete audio/video content.

**8. Autoplay:** It can surprise users, consume bandwidth, and interfere with assistive technology or user preferences.

**9. Iframe permissions:** Verify the origin and grant only capabilities required by the embedded content; provide a fallback.

## Challenge

```html
<section aria-labelledby="gallery-heading">
  <h2 id="gallery-heading">Workshop media</h2>
  <video controls width="800" height="450" preload="metadata">
    <source src="media/workshop.mp4" type="video/mp4">
    <track src="captions/workshop-en.vtt" kind="captions" srclang="en" label="English">
    <p><a href="media/workshop.mp4">Download the workshop video</a></p>
  </video>
  <audio controls preload="metadata">
    <source src="media/interview.mp3" type="audio/mpeg">
    <a href="media/interview.mp3">Download the interview audio</a>
  </audio>
  <picture>
    <source srcset="images/garden-wide.webp" media="(min-width: 700px)">
    <img src="images/garden.jpg" alt="A volunteer preparing a raised garden bed" width="800" height="600">
  </picture>
  <iframe src="https://example.com/map" title="Map of the garden venue" loading="lazy"></iframe>
  <p><a href="https://example.com/map">Open the venue map separately</a></p>
</section>
```

## Media Checks

- Confirm the referenced files exist and play in target browsers.
- Provide captions or a transcript for meaningful audio.
- Confirm the iframe origin and required permissions before publishing.