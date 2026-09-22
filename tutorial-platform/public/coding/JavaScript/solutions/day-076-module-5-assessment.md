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
