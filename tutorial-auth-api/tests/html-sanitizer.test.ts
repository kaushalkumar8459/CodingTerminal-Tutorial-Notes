import assert from "node:assert/strict";
import test from "node:test";
import { sanitizeLessonHtml } from "../src/contentSanitizer.js";

test("keeps safe images and native disclosures", () => {
  const html = sanitizeLessonHtml('<figure><img src="/tutorials/example.png" alt="Example"><figcaption>Caption</figcaption></figure><details><summary>More</summary><p>Details</p></details>');
  assert.match(html, /<img[^>]+alt="Example"/);
  assert.match(html, /<details><summary>More<\/summary>/);
  assert.match(html, /<figcaption>Caption<\/figcaption>/);
});

test("escapes unsupported active markup instead of dropping it", () => {
  const html = sanitizeLessonHtml('<iframe src="https://example.com">Embedded text</iframe><script>alert(1)</script>');
  assert.match(html, /&lt;iframe/);
  assert.match(html, /Embedded text/);
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.doesNotMatch(html, /<iframe|<script/);
});
