# React Tutorial Quality Checklist (Day 1 to Day 50)

Use this checklist whenever you add, rewrite, or review a lesson.

## 1. Metadata and File Integrity

- [ ] Frontmatter exists exactly once at the top.
- [ ] `title`, `slug`, `dayLabel`, `level`, `estimatedMinutes`, `order`, `track` are present.
- [ ] `slug` matches file naming intent.
- [ ] Markdown code fences are valid and balanced.
- [ ] No placeholder text such as TODO/TBD/Coming soon.

## 2. Lesson Structure Consistency

- [ ] H1 uses day + level format (example: Day X [Level]: Topic).
- [ ] Index section is present and links to key headings.
- [ ] Goal section is concrete and outcome-focused.
- [ ] Prerequisites section matches the actual required knowledge.
- [ ] Day Outcome or equivalent closing section exists.

## 3. Content Richness

- [ ] Concepts include both theory and practical context.
- [ ] At least one realistic end-to-end example exists.
- [ ] Code samples are runnable or close to runnable.
- [ ] Tradeoffs are discussed, not only syntax.
- [ ] Common mistakes section includes real failure patterns.

## 4. Learning Experience

- [ ] Learning outcomes are measurable.
- [ ] Hands-on tasks or exercises are included.
- [ ] Assessment questions check conceptual understanding.
- [ ] Answers are included for self-verification.
- [ ] Self-check list helps learners reflect on readiness.

## 5. Engineering Quality

- [ ] Examples follow immutable update patterns where required.
- [ ] Terminology is consistent across the lesson.
- [ ] Action names, function names, and folder examples are meaningful.
- [ ] No contradictory guidance in different sections.
- [ ] Accessibility and production considerations are included when relevant.

## 6. Consistency Across Days

- [ ] Difficulty progression is reasonable from previous day.
- [ ] New terms are introduced before heavy usage.
- [ ] Repeated boilerplate text is minimized.
- [ ] Section naming stays aligned with neighboring lessons.
- [ ] Estimated minutes is realistic for the amount of material.

## 7. Review Scorecard (Quick Use)

Score each area from 1 to 5:

- Structure:
- Technical Accuracy:
- Practical Depth:
- Clarity:
- Consistency with track:

Interpretation:

- 23 to 25: publish-ready
- 19 to 22: minor improvements needed
- 15 to 18: moderate rewrite recommended
- Below 15: major rewrite required

## 8. Suggested Review Routine

1. Run a fast syntax/format check first.
2. Read linearly once as a learner.
3. Validate every code example for correctness.
4. Check alignment with previous and next day topics.
5. Fill the scorecard and list actionable fixes.

## 9. Optional Automation Hints

Use these ideas for script-based checks:

- detect duplicate frontmatter delimiters in first 30 lines
- detect malformed code fences and unbalanced triple backticks
- detect missing required heading sections
- detect placeholder phrases (TODO, TBD, Coming soon)
- detect extremely short lessons compared to neighboring days
