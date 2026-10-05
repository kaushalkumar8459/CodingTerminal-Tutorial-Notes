---
title: Geolocation and Drag and Drop APIs
slug: day-017-geolocation-and-drag-and-drop-apis
dayLabel: Day 17
level: Advanced
estimatedMinutes: 50
order: 17
track: html
---

# Day 17 [Advanced]: Geolocation and Drag and Drop APIs

## Goal

Use geolocation and drag-and-drop only when they improve a task, with clear permission, keyboard, privacy, and error-handling strategies.

## Prerequisites

- Basic JavaScript and event listener knowledge
- Days 7 and 9 completed

## Explanation

These are browser APIs, not HTML elements. HTML provides content and interaction targets; JavaScript requests location or handles drag events. Browser permission prompts, secure contexts, user expectations, and alternative interaction methods are part of the design.

## Topic by Topic

### Topic 1: Geolocation with user consent

Geolocation is available through `navigator.geolocation` in secure contexts such as HTTPS. Ask only after explaining why location is needed, handle denial and failure without breaking the page, and request the least precision and duration needed. Do not request location automatically when a page loads.

```js
const status = document.querySelector("#location-status");

document.querySelector("#find-nearby").addEventListener("click", () => {
  if (!navigator.geolocation) {
    status.textContent = "Location is not available in this browser.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      status.textContent = `Location found with approximately ${Math.round(coords.accuracy)} m accuracy.`;
    },
    (error) => {
      status.textContent = error.code === error.PERMISSION_DENIED
        ? "Location permission was not granted."
        : "Location could not be determined. You can enter a place instead.";
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
  );
});
```

Do not display or transmit exact coordinates unless the user needs that result. If using `watchPosition`, provide a clear stop action and call `clearWatch` when tracking ends.

### Topic 2: Drag-and-drop

The HTML `draggable` attribute and the Drag and Drop API expose drag events and a `DataTransfer` object. This example moves one item before another and includes a button that performs the same move without dragging. The drop handler only accepts IDs for items already in the list; it never inserts dropped HTML.

```html
<ul id="reading-list" aria-label="Reading list">
  <li draggable="true" data-item-id="guide-1">Trail guide</li>
  <li draggable="true" data-item-id="map-1">Map</li>
</ul>
<button type="button" id="move-guide-to-top">Move Trail guide to top</button>
<p id="list-status" role="status" aria-live="polite"></p>
<script>
  const list = document.querySelector("#reading-list");
  const status = document.querySelector("#list-status");

  list.addEventListener("dragstart", (event) => {
    const item = event.target.closest("li[data-item-id]");
    if (!item) return;
    event.dataTransfer.setData("text/plain", item.dataset.itemId);
    event.dataTransfer.effectAllowed = "move";
  });

  list.addEventListener("dragover", (event) => event.preventDefault());
  list.addEventListener("drop", (event) => {
    event.preventDefault();
    const draggedId = event.dataTransfer.getData("text/plain");
    const draggedItem = [...list.querySelectorAll("li[data-item-id]")]
      .find((item) => item.dataset.itemId === draggedId);
    const targetItem = event.target.closest("li[data-item-id]");
    if (!draggedItem || !targetItem || draggedItem === targetItem) return;
    list.insertBefore(draggedItem, targetItem);
    status.textContent = `${draggedItem.textContent} moved.`;
  });

  document.querySelector("#move-guide-to-top").addEventListener("click", () => {
    const guide = list.querySelector('[data-item-id="guide-1"]');
    if (guide) list.prepend(guide);
    status.textContent = "Trail guide moved to the top.";
  });
</script>
```

Call `preventDefault()` during `dragover` to make the list a valid drop target. Use JavaScript event handlers to set and read only the data types the application expects. Treat dropped text and files as untrusted input. For file drops, verify type and size on the server when uploading; do not trust a filename or client-side MIME type. The button provides a keyboard alternative; touch interfaces should also offer explicit move controls because native dragging is not consistently available there.

### Topic 3: Test fallback paths

Permission denial, unsupported APIs, device limitations, and network failure are normal states. Keep status messages understandable and connected to the action. Test with keyboard-only operation and without location permission. A browser API should enhance a working core task, not be its sole path.

## Recap

- Geolocation needs HTTPS and explicit user permission; request it in response to a clear action.
- Handle denial and failure, minimize collection, and stop continuous watches when no longer needed.
- Drag-and-drop needs a keyboard/touch alternative and must treat transferred data as untrusted.
- These are JavaScript APIs associated with the wider W3Schools HTML syllabus, not HTML markup features.

## Practice

Add an optional “find nearby” control with a manual city fallback. Build a reorderable list with drag-and-drop plus move-up/move-down buttons. Test denied permission, keyboard-only use, and invalid dropped content.

## Further Reading

- [W3Schools Geolocation API](https://www.w3schools.com/html/html5_geolocation.asp)
- [W3Schools HTML Drag and Drop](https://www.w3schools.com/html/html5_draganddrop.asp)

## What's Next

Day 18 completes the browser API extension with local storage, Web Workers, and Server-Sent Events.