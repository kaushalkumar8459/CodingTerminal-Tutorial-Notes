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

<!-- codingterminal-solution:start -->

# Day 119 — Solution: Mini Projects Pack

```js
// 1. Color generator
function randomColor() {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`;
}
document.querySelector("#color").addEventListener("click", () => {
  const color = randomColor();
  document.body.style.backgroundColor = color;
  document.querySelector("#code").textContent = color;
});

// 2. Clipboard
async function copyText() {
  await navigator.clipboard.writeText(
    document.querySelector("#copy-input").value,
  );
  document.querySelector("#copied").textContent = "Copied!";
}

// 3. Quiz and 4-5. Accordion/tabs
const answers = ["a", "c", "b", "a", "c"];
let score = 0;
document.querySelector("#quiz").addEventListener("change", (event) => {
  if (
    event.target.checked &&
    event.target.value === answers[event.target.dataset.question]
  )
    score++;
});
document
  .querySelectorAll(".accordion-header")
  .forEach((header) =>
    header.addEventListener(
      "click",
      () =>
        (header.nextElementSibling.hidden = !header.nextElementSibling.hidden),
    ),
  );
document.querySelectorAll("[data-tab]").forEach((tab) =>
  tab.addEventListener("click", () => {
    document
      .querySelectorAll("[data-panel]")
      .forEach(
        (panel) => (panel.hidden = panel.dataset.panel !== tab.dataset.tab),
      );
  }),
);

// 6. Modal, 7. slider, 9. persisted dark mode
const modal = document.querySelector("#modal");
document.querySelector("#open-modal").onclick = () => modal.showModal();
document.querySelector("#close-modal").onclick = () => modal.close();
const images = ["one.jpg", "two.jpg", "three.jpg"];
let imageIndex = 0;
const slider = document.querySelector("#slider");
document.querySelector("#next").onclick = () =>
  (slider.src = images[++imageIndex % images.length]);
document.querySelector("#previous").onclick = () =>
  (slider.src =
    images[--imageIndex < 0 ? (imageIndex = images.length - 1) : imageIndex]);
const dark = localStorage.getItem("dark") === "true";
document.body.classList.toggle("dark", dark);
document.querySelector("#dark-toggle").onclick = () => {
  const enabled = document.body.classList.toggle("dark");
  localStorage.setItem("dark", enabled);
};
```

**10–19.** Typing speed uses elapsed time and `words / minutes`; habit tracking stores checked dates as JSON; currency conversion uses a fixed rates object; Weather/GitHub/Movie search use `fetch`, `response.ok`, and `try/catch`; QR generation can call a QR API; Music Player uses `<audio>` events; bookmarks persist JSON; Kanban can move cards between column arrays.

## Interview-style questions

**20.** Weather, GitHub Finder, Movie Search, and QR/API features most directly reuse Fetch, async/await, and error handling.

**21.** Accordion, tabs, modal, dark mode, habit tracker, bookmarks, music player, and Kanban most directly reuse DOM events, manipulation, and Local Storage.

<!-- codingterminal-solution:end -->

