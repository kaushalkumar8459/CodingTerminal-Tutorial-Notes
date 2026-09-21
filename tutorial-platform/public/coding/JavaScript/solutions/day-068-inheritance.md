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
