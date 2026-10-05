# Day 015 — Iframes, YouTube, and Embedded Content

Matches Tutorial Day 15 (Embedded Content and Third-Party Media).

## Basic

1. Create an iframe with a specific title and dimensions.
2. Add `loading="lazy"` to an off-screen map embed.
3. Make an anchor target a named iframe.
4. Add a direct fallback link next to a third-party player.
5. Identify two privacy or security questions to ask before adding an embed.

## Concept Questions

6. Why is a generic iframe title not helpful?
7. What does `sandbox` do, and why should permissions be minimal?
8. Why should plug-in technologies such as Flash not be required?
9. Does embedding a video give permission to reuse its media file?

## Challenge

10. Add an embedded video and map to an event page. Use titles, lazy loading where suitable, restrictive permissions, stable sizing, captions/transcript links, and direct alternatives.

## Notes

- A `title` helps identify the frame but does not make its inner content accessible.
- Review third-party network requests and privacy implications before shipping.