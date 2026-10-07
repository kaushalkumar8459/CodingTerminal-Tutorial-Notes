# Day 017 — Geolocation and Drag-and-Drop APIs

Matches Tutorial Day 17 (Geolocation and Drag and Drop APIs). These activities use JavaScript because the APIs are not HTML elements.

## Practice

1. Check whether `navigator.geolocation` exists before using it.
2. Request the current position only after a user activates a clearly labeled button.
3. Display an understandable message for denied permission, timeout, and unavailable location.
4. Add a manual location entry as a fallback.
5. Make a list item draggable and use `DataTransfer` to identify it.
6. Provide a keyboard-accessible button that performs the same reorder operation.

## Concept Questions

7. Why does geolocation require a secure context and user permission?
8. Why should an app avoid showing exact coordinates by default?
9. Why is `preventDefault()` needed in a `dragover` handler?
10. Why must dropped text/files be treated as untrusted?

## Challenge

Build a page with a “Find nearby” control, manual city fallback, and a reading list that can be reordered with drag-and-drop or buttons. Announce status changes without moving focus unexpectedly.

## Notes

- Test denied permission and keyboard-only interaction.
- For uploads, validate files on the server; `accept` and browser MIME types are not security checks.

<!-- codingterminal-solution:start -->

# Day 017 — Solution: Geolocation and Drag-and-Drop APIs

## Practice Answers

**1. Check API availability**

```js
if (!navigator.geolocation) {
  status.textContent = "Location is unavailable. Enter a city instead.";
}
```

**2. Ask after a user action**

```js
document.querySelector("#find-nearby").addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
});
```

**3. Handle permission and availability errors**

```js
function onError(error) {
  status.textContent = error.code === error.PERMISSION_DENIED
    ? "Permission was not granted. Enter a city instead."
    : "Location could not be determined. Enter a city instead.";
}
```

**4. Offer a manual fallback**

```html
<label for="city">Or enter a city</label>
<input id="city" name="city">
```

**5. Identify dragged items with DataTransfer**

```js
list.addEventListener("dragstart", (event) => {
  const item = event.target.closest("li[data-id]");
  if (!item) return;
  event.dataTransfer.setData("text/plain", item.dataset.id);
});
```

**6. Provide an equivalent keyboard action**

```html
<button type="button" id="move-guide">Move Trail guide to top</button>
<p id="move-status" role="status" aria-live="polite"></p>
```

```js
document.querySelector("#move-guide").addEventListener("click", () => {
  const guide = list.querySelector('[data-id="guide"]');
  if (guide) list.prepend(guide);
  status.textContent = "Trail guide moved to the top.";
});
```

## Geolocation Pattern

```html
<button type="button" id="find-nearby">Find nearby workshops</button>
<label for="city">Or enter a city</label>
<input id="city" name="city">
<p id="location-status" role="status" aria-live="polite"></p>
<script>
  const status = document.querySelector("#location-status");
  document.querySelector("#find-nearby").addEventListener("click", () => {
    if (!navigator.geolocation) {
      status.textContent = "Location is unavailable. Enter a city instead.";
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        status.textContent = `Location found (accuracy about ${Math.round(coords.accuracy)} m).`;
      },
      (error) => {
        status.textContent = error.code === error.PERMISSION_DENIED
          ? "Permission was not granted. Enter a city instead."
          : "Location could not be determined. Enter a city instead.";
      },
      { timeout: 10000, maximumAge: 60000, enableHighAccuracy: false },
    );
  });
</script>
```

The success handler does not reveal or transmit exact coordinates. Ask only after explaining why location is useful.

## Drag-and-Drop Pattern

```html
<ul id="reading-list" aria-label="Reading list">
  <li draggable="true" data-id="guide">Trail guide</li>
  <li draggable="true" data-id="map">Map</li>
</ul>
<button type="button" id="move-guide">Move Trail guide to top</button>
<p id="move-status" role="status" aria-live="polite"></p>
<script>
  const list = document.querySelector("#reading-list");
  const status = document.querySelector("#move-status");

  list.addEventListener("dragstart", (event) => {
    const item = event.target.closest("li[data-id]");
    if (!item) return;
    event.dataTransfer.setData("text/plain", item.dataset.id);
    event.dataTransfer.effectAllowed = "move";
  });
  list.addEventListener("dragover", (event) => event.preventDefault());
  list.addEventListener("drop", (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain");
    const moving = [...list.querySelectorAll("li[data-id]")].find((item) => item.dataset.id === id);
    const target = event.target.closest("li[data-id]");
    if (!moving || !target || moving === target) return;
    list.insertBefore(moving, target);
    status.textContent = `${moving.textContent} moved.`;
  });
  document.querySelector("#move-guide").addEventListener("click", () => {
    const guide = list.querySelector('[data-id="guide"]');
    if (guide) list.prepend(guide);
    status.textContent = "Trail guide moved to the top.";
  });
</script>
```

## Answers

**7. Permission/security:** Location reveals sensitive personal information; secure contexts and a user grant prevent silent access from arbitrary origins.

**8. Minimize exposure:** Exact coordinates can identify a person's home or routine. Show only the precision needed for the task.

**9. Drop target:** Preventing the default `dragover` behavior allows the element to accept a drop.

**10. Untrusted data:** File names and content can be malicious or misleading; validate and sanitize data before processing or uploading.

<!-- codingterminal-solution:end -->

