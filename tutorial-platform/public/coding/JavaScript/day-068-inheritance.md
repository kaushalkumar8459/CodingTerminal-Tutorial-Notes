# Day 068 — Inheritance (Person -> Student, Person -> Teacher)

Matches Tutorial Day 68 (Encapsulation) — practice previews class inheritance here,
ahead of Tutorial Day 69's full explanation. No limit on how many you build.

## Basic

1. Create a base `class Person { constructor(name, age) { ... } }` with a method
   `introduce()`.
2. Create `class Student extends Person` that adds a `grade` property and a method
   `study()`.
3. Create `class Teacher extends Person` that adds a `subject` property and a method
   `teach()`.
4. In both `Student` and `Teacher`'s constructors, use `super(name, age)` to reuse
   `Person`'s constructor logic.
5. Create instances of both `Student` and `Teacher`, and call both their own methods
   AND the inherited `introduce()` method.

## Concept

6. Override `introduce()` in `Student` to add grade information, while still using
   `super.introduce()` internally to reuse the base message.
7. Confirm a `Student` instance is `instanceof Student` AND `instanceof Person`.
8. Add a private field to `Person` (e.g. `#id`), and confirm `Student`/`Teacher` can
   still use methods that rely on it (since they inherit `Person`'s methods), even
   though they can't access `#id` directly themselves.
9. Create an array containing a mix of `Student` and `Teacher` instances, and use
   `.forEach()` to call `introduce()` on each — notice each uses its OWN version if
   overridden.

## Interview-style questions

10. What does `extends` actually do — how does it relate to what you learned about the
    prototype chain in Module 4?
11. Why is `super(...)` necessary in a child class's constructor, and what happens if
    you forget it (try it and observe the actual error)?
12. Why can `Student` inherit and use `Person`'s regular methods, but not directly
    access `Person`'s private (`#`) fields?

## Notes

- `extends`/`super` are class syntax's way of expressing exactly the prototype-linking
  pattern you built manually back on Day 59/61 — recognizing that connection will make
  today's practice click faster.
- Private fields are NOT inherited in the sense of being directly accessible — but
  inherited PUBLIC methods that use those private fields internally still work fine.

<!-- codingterminal-solution:start -->

# Day 068 — Solution: Inheritance

```js
class Person {
  #id;
  constructor(name, age, id) {
    this.name = name;
    this.age = age;
    this.#id = id;
  }
  introduce() {
    return `I am ${this.name}, age ${this.age}`;
  }
  getId() {
    return this.#id;
  }
}

class Student extends Person {
  constructor(name, age, id, grade) {
    super(name, age, id);
    this.grade = grade;
  }
  study() {
    return `${this.name} is studying`;
  }
  introduce() {
    return `${super.introduce()}, grade ${this.grade}`;
  }
}

class Teacher extends Person {
  constructor(name, age, id, subject) {
    super(name, age, id);
    this.subject = subject;
  }
  teach() {
    return `${this.name} teaches ${this.subject}`;
  }
}

const student = new Student("Asha", 20, "S1", "A");
const teacher = new Teacher("Mr. Lee", 40, "T1", "JavaScript");
console.log(student.introduce(), student.study(), student.getId());
console.log(teacher.introduce(), teacher.teach(), teacher.getId());
console.log(student instanceof Student, student instanceof Person); // true true

[student, teacher].forEach((person) => console.log(person.introduce()));
```

## Interview-style questions

**10.** `extends` links the child prototype to the parent prototype, creating the same kind of lookup chain built manually with `Object.create()`.

**11.** `super()` initializes the parent portion before the child uses `this`; omitting it causes an error in a derived constructor.

**12.** Private fields belong only to the declaring class. Child code cannot name them directly, but inherited public methods can use them internally.

<!-- codingterminal-solution:end -->

