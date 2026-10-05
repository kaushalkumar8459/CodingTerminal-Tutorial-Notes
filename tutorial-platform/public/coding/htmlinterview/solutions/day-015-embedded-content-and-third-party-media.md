# Day 015 — Solution: Iframes, YouTube, and Embedded Content

## Basic

**1. Titled iframe**

```html
<iframe src="https://example.com/map" title="Map of the workshop venue" width="640" height="360"></iframe>
```

**2. Lazy map:** Add `loading="lazy"` when the frame is below the initial viewport.

**3. Named target**

```html
<iframe name="video-player" title="Selected workshop video" width="640" height="360"></iframe>
<a href="https://www.youtube-nocookie.com/embed/VIDEO_ID" target="video-player">Load the video</a>
```

**4. Fallback:** `<p><a href="https://example.com/video">Open the video directly</a></p>`

**5. Review:** Confirm the origin is trusted, and determine what data it collects, what permissions it needs, and what happens if it fails.

## Concept Answers

**6. Frame title:** “Embedded content” does not distinguish a map, video, or form. Name its purpose.

**7. Sandbox:** It limits capabilities of the embedded document. Add only tokens required for its intended function.

**8. Plug-ins:** Modern browsers no longer reliably support them; they create compatibility and security risks.

**9. Media rights:** No. An embed does not grant a license to download or republish the media.

## Challenge

```html
<section aria-labelledby="venue-heading">
  <h2 id="venue-heading">Venue</h2>
  <iframe
    src="https://example.com/maps/embed/venue"
    title="Map showing the workshop venue"
    width="640"
    height="400"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin">
  </iframe>
  <p><a href="https://example.com/maps/venue">Open venue map</a></p>
</section>

<section aria-labelledby="video-heading">
  <h2 id="video-heading">Workshop introduction</h2>
  <iframe
    src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
    title="Workshop introduction video"
    width="640"
    height="360"
    loading="lazy"
    allow="fullscreen; picture-in-picture"
    allowfullscreen>
  </iframe>
  <p><a href="https://example.com/transcripts/workshop.txt">Read the video transcript</a></p>
</section>
```

Replace example URLs with reviewed providers. Grant only necessary iframe capabilities and confirm the provider supplies captions.