# Day 096 — Solution: Event Bubbling and Capturing

```html
<div id="outer">
  <div id="middle"><div id="inner">Click inner</div></div>
</div>
<script>
  for (const id of ["outer", "middle", "inner"])
    document
      .querySelector(`#${id}`)
      .addEventListener("click", () => console.log(id));
  // Default click order is inner, middle, outer because the event bubbles upward.
  document.querySelector("#middle").addEventListener("click", (event) => {
    event.stopPropagation();
    console.log("middle stopped");
  });
  for (const id of ["outer", "middle", "inner"])
    document
      .querySelector(`#${id}`)
      .addEventListener("click", () => console.log(`capture ${id}`), {
        capture: true,
      });

  const card = document.querySelector("#card");
  card.addEventListener("click", () => console.log("card opened"));
  card.querySelector("button").addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();
    console.log("delete only");
  });
</script>
```

`stopPropagation()` prevents the event from continuing through ancestors. `preventDefault()` cancels the browser's default action, such as link navigation or form submission; it does not control propagation.

## Interview-style questions

**8.** Without special options, the target handler runs first, then ancestors during bubbling: inner, middle, outer.

**9.** Stop a nested delete or action button from also activating its clickable parent card.

**10.** Default actions and propagation are separate browser behaviors, so preventing navigation does not stop ancestor listeners.
