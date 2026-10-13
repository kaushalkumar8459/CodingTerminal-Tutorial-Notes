// Standard lesson layout: every new lesson starts from these sections so all tracks read the same way.
export const LESSON_TEMPLATE_HTML = [
  "<p>One-sentence summary of what this lesson teaches.</p>",
  "<h2>What is ...?</h2>",
  "<ul><li><p>Key idea one</p></li><li><p>Key idea two</p></li></ul>",
  '<div class="lesson-callout lesson-callout-note"><p><strong>Note:</strong> Important background the learner should not miss.</p></div>',
  "<h2>Example</h2>",
  '<div class="lesson-example"><pre><code class="language-html">&lt;p&gt;Replace with a runnable example.&lt;/p&gt;</code></pre></div>',
  "<h2>Example Explained</h2>",
  "<ul><li><p>Explain the first part of the example</p></li><li><p>Explain the second part</p></li></ul>",
  '<div class="lesson-callout lesson-callout-tip"><p><strong>Tip:</strong> A practical habit or shortcut.</p></div>',
  "<h2>Reference</h2>",
  "<table><tbody><tr><th><p>Term</p></th><th><p>Description</p></th></tr><tr><td><p>Item</p></td><td><p>What it does</p></td></tr></tbody></table>",
  "<h2>Chapter Summary</h2>",
  "<ul><li><p>What the learner should remember</p></li></ul>",
  "<h2>Exercise</h2>",
  "<p>Describe a small task the learner can try on their own.</p>",
  '<div class="lesson-example"><pre><code class="language-html">&lt;p&gt;Starter code for the exercise.&lt;/p&gt;</code></pre></div>',
].join("");
