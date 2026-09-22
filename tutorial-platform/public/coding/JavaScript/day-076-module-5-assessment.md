# Day 076 — Module 5 Assessment: Mini Library Management System

Matches Tutorial Day 76 (Module 5 Revision). Combines classes, inheritance,
encapsulation, Map, Set, and getters/setters. No limit on how far you extend this.

## Project: Library Management System

Build a complete system with:

1. `class Book` — `title`, `author`, `isbn`; a private `#isCheckedOut` flag with a
   `get isAvailable()` getter.
2. `class Member` — `name`, `memberId`; a `Set` of currently borrowed book ISBNs.
3. `class Library` — a `Map` of all books keyed by ISBN, and a `Map` of all members
   keyed by member ID.
4. `Library.prototype.checkOutBook(isbn, memberId)` — marks the book unavailable, adds
   the ISBN to the member's borrowed set (validate: book must exist and be available;
   member must exist).
5. `Library.prototype.returnBook(isbn, memberId)` — marks the book available again,
   removes it from the member's borrowed set.
6. `Library.prototype.searchByTitle(term)` — searches all books by partial title match.
7. `Library.prototype.getBooksByAuthor(author)` — returns all books by a given author.

## Concept — inheritance

8. Create `class EBook extends Book` with an additional `fileSizeMB` property, and
   override any relevant method(s) if needed (e.g. checkout rules might differ for
   e-books that never actually run out of "copies").
9. Create `class ReferenceBook extends Book` that can never be checked out at all
   (override `checkOut`-related behavior to always refuse).

## Assessment checklist

10. Add at least 10 books (mixing `Book`, `EBook`, `ReferenceBook`) and 5 members to
    your library.
11. Perform several checkouts and returns, confirming availability updates correctly
    each time.
12. Confirm a `ReferenceBook` can never be checked out, no matter what.
13. Search your library by title and by author, confirming correct results.
14. Print a full report: total books, how many are currently checked out, and a list
    of members with at least one borrowed book.

## Interview-style questions

15. Why use a `Map` (keyed by ISBN/member ID) instead of a plain array for the
    library's books/members?
16. Why use a `Set` for a member's borrowed books instead of a plain array?
17. How does polymorphism apply to `Book`, `EBook`, and `ReferenceBook` sharing (and
    sometimes overriding) checkout-related behavior?

## Notes

- This is the Module 5 capstone — treat it as a genuine checkpoint before moving into
  Module 6's asynchronous JavaScript, which builds on everything from Modules 4-5
  without re-explaining the fundamentals.
- No limit on extending this further: consider adding due dates, late fees, or a
  reservation queue if you want extra practice.
