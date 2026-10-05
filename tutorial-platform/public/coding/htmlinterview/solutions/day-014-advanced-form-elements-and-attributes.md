# Day 014 — Solution: Advanced Form Elements and Attributes

## Basic

**1. Select and optgroup**

```html
<label for="session">Session</label>
<select id="session" name="session" required>
  <option value="">Choose a session</option>
  <optgroup label="Morning"><option value="html">HTML foundations</option></optgroup>
</select>
```

**2. Datalist:** `<input id="city" name="city" list="cities"><datalist id="cities"><option value="Boston"></option><option value="Seattle"></option></datalist>`

**3. Output:** `<output name="total" for="quantity price">Total is calculated by the form's script.</output>`

**4. Progress:** `<label for="upload-progress">Upload</label><progress id="upload-progress" value="3" max="5">3 of 5</progress>`

**5. Upload form:**

```html
<form action="/upload" method="post" enctype="multipart/form-data">
  <label for="file">Choose a PDF</label>
  <input id="file" name="file" type="file" accept=".pdf,application/pdf">
  <button type="submit">Upload</button>
</form>
```

**6. Submitter override:** A submitter's `formaction` or `formmethod` overrides the form default for that submit operation.

## Concept Answers

**7. Datalist/select:** `select` restricts the choice to listed options; `datalist` suggests values while allowing typed alternatives.

**8. Meter/progress:** `meter` measures a known scalar range; `progress` shows task completion.

**9. Novalidate:** It disables native checks; use only if an equally clear alternative validation flow exists.

**10. Form association:** `form="id"` associates a control with a form elsewhere in the document.

## Challenge

```html
<form id="registration" action="/registrations" method="post" enctype="multipart/form-data">
  <label for="session">Session</label>
  <select id="session" name="session" required>
    <option value="">Choose</option>
    <optgroup label="Morning"><option value="html">HTML</option></optgroup>
  </select>

  <label for="city">City</label>
  <input id="city" name="city" list="cities">
  <datalist id="cities"><option value="Boston"></option><option value="Seattle"></option></datalist>

  <label for="resume">Resume</label>
  <input id="resume" name="resume" type="file" accept="application/pdf">
  <button type="submit">Save registration</button>
  <button type="submit" formaction="/registrations/preview" formmethod="get">Preview</button>
</form>
```

`/registrations` and `/registrations/preview` are illustrative endpoints, not services implemented by this static preview.