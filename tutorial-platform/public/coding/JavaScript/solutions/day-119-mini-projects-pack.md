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
