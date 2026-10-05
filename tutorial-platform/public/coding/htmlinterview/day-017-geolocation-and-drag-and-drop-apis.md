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