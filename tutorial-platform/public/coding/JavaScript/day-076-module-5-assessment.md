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

<!-- codingterminal-solution:start -->

# Day 076 — Solution: Mini Library Management System

```js
class Book {
  #isCheckedOut = false;
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
  get isAvailable() {
    return !this.#isCheckedOut;
  }
  checkOut() {
    if (!this.isAvailable) return false;
    this.#isCheckedOut = true;
    return true;
  }
  returnBook() {
    this.#isCheckedOut = false;
  }
}
class EBook extends Book {
  constructor(title, author, isbn, fileSizeMB) {
    super(title, author, isbn);
    this.fileSizeMB = fileSizeMB;
  }
}
class ReferenceBook extends Book {
  checkOut() {
    return false;
  }
}
class Member {
  constructor(name, memberId) {
    this.name = name;
    this.memberId = memberId;
    this.borrowed = new Set();
  }
}
class Library {
  constructor() {
    this.books = new Map();
    this.members = new Map();
  }
  addBook(book) {
    this.books.set(book.isbn, book);
  }
  addMember(member) {
    this.members.set(member.memberId, member);
  }
  checkOutBook(isbn, memberId) {
    const book = this.books.get(isbn),
      member = this.members.get(memberId);
    if (!book || !member || !book.checkOut()) return false;
    member.borrowed.add(isbn);
    return true;
  }
  returnBook(isbn, memberId) {
    const book = this.books.get(isbn),
      member = this.members.get(memberId);
    if (!book || !member || !member.borrowed.has(isbn)) return false;
    book.returnBook();
    member.borrowed.delete(isbn);
    return true;
  }
  searchByTitle(term) {
    return [...this.books.values()].filter((book) =>
      book.title.toLowerCase().includes(term.toLowerCase()),
    );
  }
  getBooksByAuthor(author) {
    return [...this.books.values()].filter((book) => book.author === author);
  }
  report() {
    return {
      totalBooks: this.books.size,
      checkedOut: [...this.books.values()].filter((book) => !book.isAvailable)
        .length,
      borrowers: [...this.members.values()].filter(
        (member) => member.borrowed.size > 0,
      ),
    };
  }
}

const library = new Library();
for (let i = 1; i <= 8; i++)
  library.addBook(new Book(`Book ${i}`, "Author A", `B${i}`));
library.addBook(new EBook("JavaScript Guide", "Author B", "E1", 5));
library.addBook(new ReferenceBook("Dictionary", "Author C", "R1"));
for (let i = 1; i <= 5; i++)
  library.addMember(new Member(`Member ${i}`, `M${i}`));
library.checkOutBook("B1", "M1");
library.checkOutBook("E1", "M2");
console.log(library.checkOutBook("R1", "M3")); // false
library.returnBook("B1", "M1");
console.log(
  library.searchByTitle("guide"),
  library.getBooksByAuthor("Author A"),
  library.report(),
);
```

## Interview-style questions

**15.** Map gives direct ISBN/member-ID lookup and clear key semantics. **16.** Set prevents duplicate borrowed ISBNs automatically. **17.** Each subclass shares the checkout contract but can override behavior, such as ReferenceBook refusing every checkout.

<!-- codingterminal-solution:end -->

