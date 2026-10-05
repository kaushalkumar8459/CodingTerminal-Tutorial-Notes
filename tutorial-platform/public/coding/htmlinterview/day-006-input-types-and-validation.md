# Day 006 — Input Types and Validation

Matches Tutorial Day 6 (Input Types and Form Validation).

## Basic

1. Choose appropriate controls for email, phone number, date, quantity, and approximate volume.
2. Add `required`, `min`, `max`, and `step` to a numeric field.
3. Use `minlength` and `maxlength` for a username.
4. Add an `accept` hint to a file picker and explain why it is not a security check.
5. Create an email field with autocomplete and a persistent label.

## Concept Questions

6. Why is `tel` usually preferable to `number` for phone numbers?
7. What does `datetime-local` omit?
8. What is the difference between `readonly` and `disabled` at submission time?
9. Why is client-side validation not sufficient?
10. Why can `required="false"` still enable a Boolean attribute?

## Challenge

11. Build a workshop registration form with name, email, attendee count, event date, and optional resume upload. Use suitable types and constraints without making assumptions about a particular browser picker.

## Notes

- Avoid over-restrictive `pattern` rules for names and international phone numbers.
- Every control needs a label; placeholders are hints only.