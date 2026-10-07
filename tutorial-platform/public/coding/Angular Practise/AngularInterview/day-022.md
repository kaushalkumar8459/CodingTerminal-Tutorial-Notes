# Day 22 Interview Questions — Product Catalog UI

## Interview Goal
Explain **Product Catalog UI**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What should a product catalog exercise demonstrate?
**Expected Answer:** It should combine list rendering, conditional states, event handling, and data binding into one realistic UI.

### 2. How should products be rendered?
**Expected Answer:** Use @for with a stable track expression based on the product identity.

### 3. How should an empty catalog be shown?
**Expected Answer:** Use an explicit loaded-empty state and @empty for the collection fallback.

### 4. How would you display a selected product?
**Expected Answer:** Use event binding to update selected state and conditional rendering to show the selected details.

### 5. How should product availability affect the UI?
**Expected Answer:** Use typed availability state and render the appropriate status or action.

### 6. How would you avoid excessive logic in the product template?
**Expected Answer:** Prepare typed view data or computed state and keep the template focused on presentation.

### 7. What should happen when filtering returns no products?
**Expected Answer:** Show a clear empty-result message and allow the user to change or clear the filter.

### 8. How would you test the catalog?
**Expected Answer:** Test initial rendering, filtering, selection, empty results, and important user interactions.

### 9. JobHub scenario: convert the catalog into a job list. What changes?
**Expected Answer:** The UI pattern remains similar, but the domain model, actions, filters, and status presentation become job-specific.

## Interviewer Follow-Ups
- Why did you choose this approach?
- What alternative Angular approach could solve the same problem?
- What happens when the data changes or the URL changes?
- How would you test this behavior?
- What would you change for a large enterprise application?

## Common Interview Trap
Do not memorize syntax alone. Explain why the pattern fits the application problem and which layer owns the responsibility.

## Self-Assessment
- [ ] I can explain the concept without documentation.
- [ ] I can write a small example from memory.
- [ ] I can explain one trade-off.
- [ ] I can solve the JobHub scenario.
- [ ] I can answer follow-up questions.

## Interview Readiness
**Ready** when you can explain the topic in 60–90 seconds, implement a small example, and defend your design choice.

## Keywords
Product Catalog UI, Angular 21, standalone components, interview questions, JobHub
