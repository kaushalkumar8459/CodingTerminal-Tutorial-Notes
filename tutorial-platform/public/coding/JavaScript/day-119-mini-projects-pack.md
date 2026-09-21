# Day 119 — Mini Projects Pack (DOM + API)

Bonus practice. Additional real, standalone mini-projects not already covered in the
core 110-day roadmap. No limit on how many you build, or how far you extend each one.

## Projects

1. **Color Generator** — a button that displays a new random hex color (and its code)
   each time it's clicked, updating the page background.
2. **Clipboard App** — a text input/area with a "Copy" button that copies its content
   to the clipboard (`navigator.clipboard.writeText()`) and shows a brief "Copied!"
   confirmation.
3. **Quiz App** — a multiple-choice quiz (5+ questions) that tracks score and shows a
   final result screen.
4. **Accordion** — a list of collapsible sections where clicking a header expands/
   collapses its content (only one open at a time, or multiple — your choice).
5. **Tabs Component** — a tabbed interface where clicking a tab shows its
   corresponding content and hides the others.
6. **Modal Popup** — a button that opens a modal dialog, with a close button and
   click-outside-to-close behavior.
7. **Image Slider** — a basic carousel with next/previous buttons cycling through a
   set of images.
8. **FAQ Section** — similar to an accordion, but styled specifically as a
   frequently-asked-questions list.
9. **Dark Mode Toggle** — a button that toggles a dark theme across the whole page,
   persisted to Local Storage (Day 14/99) so it survives a refresh.
10. **Typing Speed Test** — shows a sample sentence; measures how long the user takes
    to type it and calculates words-per-minute.
11. **Habit Tracker** — a small app tracking daily habits with a checkbox per day,
    persisted to Local Storage.
12. **Currency Converter** — convert between currencies using a fixed exchange-rate
    object (or a real API if you want to extend it with Fetch, Day 88).
13. **Weather App** — fetch and display weather for a city using a public weather API
    (reuse the fetch + error handling patterns from Days 88-90).
14. **GitHub Finder** — search GitHub usernames using the public GitHub API and
    display their profile info.
15. **QR Code Generator** — generate a QR code for user-entered text (research a
    simple public API or library for the actual QR rendering; focus on the
    fetch/DOM-wiring practice).
16. **Movie Search** — search a public movie API (e.g. OMDb) and display results with
    posters and details.
17. **Music Player** — a basic audio player UI with play/pause, next/previous, and a
    progress bar, using the HTML `<audio>` element.
18. **Bookmark Manager** — add/remove/search bookmarked links, persisted to Local
    Storage.
19. **Kanban Board** — a simple drag-and-drop (or click-to-move) board with columns
    like "To Do / In Progress / Done".

## Interview-style questions

20. Which of these projects most directly reuses skills from Module 6 (Fetch API,
    async/await, error handling)?
21. Which of these projects most directly reuses skills from Module 7 (DOM
    manipulation, events, Local Storage)?

## Notes

- These are genuinely good portfolio pieces — pick a handful that interest you most
  and polish them with real CSS styling, not just functional JavaScript.
- Several of these (Weather App, GitHub Finder, Movie Search) require a public API —
  reuse the fetch + `response.ok` + error handling pattern from Days 88-90 for all of them.
