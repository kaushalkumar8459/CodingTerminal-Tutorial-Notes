---
title: Audio Video and Embedded Content
slug: day-008-audio-video-and-embedded-content
dayLabel: Day 8
level: Intermediate
estimatedMinutes: 45
order: 8
track: html
---

# Day 8 [Intermediate]: Audio Video and Embedded Content

## Goal

Embed media with fallbacks and accessibility support, and understand the performance and security implications of third-party frames.

## Prerequisites

- Days 1 through 7 completed
- Familiarity with paths, images, and semantic page structure

## Explanation

HTML can play media directly without a third-party plugin. Media still needs usable controls, text alternatives, and attention to bandwidth. Embedded third-party documents run in a separate browsing context, so they need clear titles and appropriate restrictions.

## Topic by Topic

### Topic 1: Audio and video

```html
<video controls width="960" height="540" preload="metadata" poster="images/demo-poster.jpg">
  <source src="media/demo.webm" type="video/webm">
  <source src="media/demo.mp4" type="video/mp4">
  <track src="captions/demo-en.vtt" kind="captions" srclang="en" label="English" default>
  <p>Your browser cannot play this video. <a href="media/demo.mp4">Download the video</a>.</p>
</video>
```

Audio uses the same source-and-fallback pattern without a visual poster:

```html
<audio controls preload="metadata">
  <source src="media/interview.mp3" type="audio/mpeg">
  <source src="media/interview.ogg" type="audio/ogg">
  <a href="media/interview.mp3">Download the interview audio</a>
</audio>
```

`audio` and `video` can offer multiple `source` formats. `controls` gives users native playback controls. Avoid autoplay, especially with sound; it can surprise users, consume data, and interfere with assistive technology. `preload="metadata"` requests limited information rather than downloading the full media before the user chooses to play it. `poster` provides a still preview for video.

For commonly supported web media, MP4 video is served as `video/mp4`, WebM as `video/webm`, MP3 audio as `audio/mpeg`, Ogg audio as `audio/ogg`, and WAV as `audio/wav`. Actual playback also depends on the codecs inside a file and browser/platform support. Offer an appropriate alternative and test in target browsers rather than relying on old fixed support tables. `loop` repeats media, `muted` starts it without sound, and `autoplay` requests automatic playback; autoplay policies vary and it should not be the default.

Formats such as Flash video (`.flv`), Windows Media (`.wmv`), and legacy RealMedia are not dependable native web formats. Flash and browser plug-ins are obsolete; use current browser-supported media and a fallback link instead of asking visitors to install a plug-in.

Provide captions for prerecorded video containing meaningful speech or sound. A WebVTT caption file uses the `.vtt` format and is connected with `track`. Captions are not the same as subtitles: captions include relevant non-speech audio and identify speakers when needed. A transcript is also valuable, particularly for audio-only content. Do not assume a video is accessible just because its player has controls.

### Topic 2: Responsive image sources

Use `picture` when the browser should choose among different image sources, for example a crop suited to a narrow layout or a modern format with a fallback:

```html
<picture>
  <source srcset="images/coast-wide.avif" type="image/avif" media="(min-width: 700px)">
  <source srcset="images/coast-small.webp" type="image/webp">
  <img src="images/coast-small.jpg" alt="Rocky coastline beside a calm sea" width="800" height="600">
</picture>
```

The `img` remains the fallback and carries the `alt` text. For resolution choices of the same image, `srcset` and `sizes` can let the browser select a suitable asset. Do not use `picture` merely to make an image scale; CSS sizing is normally enough for that.

### Topic 3: Embedded documents and frames

```html
<iframe
  src="https://example.com/map"
  title="Map showing the workshop location"
  loading="lazy"
  referrerpolicy="strict-origin-when-cross-origin">
</iframe>
```

Every `iframe` needs a concise title describing its content. Use `loading="lazy"` for off-screen frames when appropriate. Embedded content can affect performance, privacy, and security. Only embed trusted sources, use the most restrictive `sandbox` settings compatible with the feature, and grant permissions with `allow` only when required. A sandbox is not a substitute for reviewing the embedded service. Provide a direct link or equivalent content when the frame is unavailable.

## Recap

- Native media elements support multiple sources, controls, and fallback content.
- Add captions or transcripts when media contains information users would otherwise miss.
- Use responsive sources deliberately and keep `img` as the image fallback.
- Frames have privacy, performance, and security implications; provide a title and restrict capabilities.

## Practice

Add a short video with controls, a poster, two formats, captions, and a fallback download link. Then create a responsive picture with an informative alt description. Audit any iframe for title, lazy loading, source trust, and minimum required permissions.

## What's Next

Day 9 explores the document head, metadata, validation, browser parsing, and production-quality HTML habits.