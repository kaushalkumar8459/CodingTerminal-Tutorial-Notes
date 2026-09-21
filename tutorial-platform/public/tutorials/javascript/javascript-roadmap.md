# JavaScript Roadmap — Tutorial Track + Coding Practice Track

This is the master plan for JavaScript. It splits the work into **two parallel tracks**
that run side by side, day by day. Keep them in separate folders so the tutorial site
and the coding drills never mix together.

```
JAVASCRIPT
   │
   ├── TRACK A: TUTORIAL (concepts, explained simply)
   │      Folder: tutorial-platform/public/tutorials/javascript/
   │      Shown on the website, one lesson per day
   │
   └── TRACK B: CODING PRACTICE (problems to solve)
          Folder: tutorial-platform/public/coding/JavaScript/
          Not shown on the website (yet) — just problem sets, no question-count limit
```

Both tracks follow the **same 7 modules and the same day numbers**, so "Day 12" always
means "Operators/Concepts Day 12" in the tutorial and "matching practice" in coding.
Section 4 below has the **full day-wise topic/subtopic breakdown** for every module —
that table is the permanent reference; `syllabus.md` is the original raw draft it was
built from.

## 1. Folder rules

| Track    | Folder                         | Purpose                                 | Shown on site?              |
| -------- | ------------------------------ | --------------------------------------- | --------------------------- |
| Tutorial | `public/tutorials/javascript/` | Concept explanations, one topic per day | Yes (auto-indexed)          |
| Coding   | `public/coding/JavaScript/`    | Practice problems, solutions, drills    | No — plain reference folder |

- Never put problem sets in the tutorial folder, and never put concept lessons in the
  coding folder. Keeping them separate is what makes it easy to revise theory and
  grind problems independently.
- The coding folder has **no cap on the number of questions per day** — some days may
  need 10 problems, others 40. Add as many as the topic needs.

## 2. File naming

**Tutorial track** (must follow this pattern to be picked up automatically by the site):

```
day-001-introduction-to-javascript.md
day-002-environment-setup-and-first-program.md
...
```

Rules:

- Prefix: `day-###-` (3 digits, zero-padded).
- Rest of the filename: short kebab-case title.
- One file = one day = one concept lesson.
- After adding/editing files, run `npm run content:generate` from `tutorial-platform/`
  so the lesson shows up in navigation and search.

**Coding track** (freeform, not auto-indexed, so structure it for your own clarity):

```
day-001-variables-and-output.md
day-002-data-types.md
...
```

Suggested structure inside each coding file:

```markdown
# Day 001 — Variables & Output

## Basic

1. ...
2. ...

## Concept

...

## Interview

...

## Challenge

...

## Mini Project (only on module-end days)

...
```

## 3. Current status

- All 7 modules are fully done on both tracks (Days 1–110): tutorial files in this
  folder, coding files in `public/coding/JavaScript/`. The full 110-day roadmap is complete.
- `syllabus.md` in this folder is the original raw draft this roadmap was distilled
  from — kept for history, not needed day-to-day anymore.
- The content pipeline (`scripts/content-pipeline.mjs`) has been updated to include
  `javascript` as a known track, so new day files here will be auto-discovered by
  `npm run content:generate`.

## 4. Full day-wise topic/subtopic reference (both tracks)

This is the permanent reference for every day of both tracks, grouped by module
section. Use it directly when writing each day's file — no need to reopen
`syllabus.md`.

### Module 1 — JavaScript Fundamentals (Days 1–15)

| Day | Tutorial topic — subtopics                                                                                                                                                    | Coding practice — focus / problems                                                                                                                                                                                                                       |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Introduction to JavaScript — what is JS, JS vs ECMAScript, history/evolution, where JS is used, browser vs Node.js, JS engines, dev tools overview                            | Variables & Output — `console.log`, `let`/`const`, assignment, basic calculations (print name, age, sum, rectangle/circle area, C to F, swap vars, total price, percentage, simple interest). Challenge: salary calculator                               |
| 2   | Environment Setup & First Program — VS Code setup, browser DevTools, console, `<script>` tag, inline/internal/external JS, first program, how JS code executes                | Data Types — String, Number, Boolean, null, undefined, BigInt, Symbol, `typeof` (identify type, check number/string, convert number to string, check undefined/null, detect NaN). Challenge: `getDataType(value)`                                        |
| 3   | JavaScript Syntax & Basic Concepts — statements, expressions, comments, semicolons, Automatic Semicolon Insertion, case sensitivity, naming conventions                       | Type Conversion — `Number()`, `String()`, `Boolean()`, `parseInt()`, `parseFloat()` (string to number, string to boolean, decimal string to integer, total from string values, invalid number, detect NaN). Challenge: calculator accepting string input |
| 4   | Variables — `var`, `let`, `const`, declaration, initialization, reassignment, redeclaration, `var` vs `let` vs `const`                                                        | Arithmetic Operators — `+ - * / % **` (even/odd, last digit, digit sum, square, cube, remainder calculator, area calculations, average). Challenge: marks percentage calculator                                                                          |
| 5   | JavaScript Data Types — primitive vs non-primitive, String, Number, Boolean, Undefined, Null, BigInt, Symbol, Object, `typeof`                                                | Comparison Operators — `> < >= <= == === != !==` (greater/smaller/equal numbers, age eligibility, password comparison, range validation). Interview: explain 10 `==` vs `===` examples                                                                   |
| 6   | Type Conversion & Coercion — implicit/explicit conversion, `String()`, `Number()`, `Boolean()`, `parseInt()`, `parseFloat()`, NaN, Infinity, truthy/falsy                     | Logical Operators — `&&                                                                                                                                                                                                                                  |                              | !`, short-circuit (login validation, age+country validation, multiple conditions, admin permission, product availability). Challenge: permission checker (admin/manager/user/guest) |
| 7   | Operators Part 1 — arithmetic, assignment, increment/decrement, unary operators, operator precedence                                                                          | Conditional Practice — `if/else/else if` (positive/negative, even/odd, largest of 2/3, grade calculator, age category, leap year, voting eligibility). Mini project: Student Grade Calculator                                                            |
| 8   | Operators Part 2 — comparison operators, `== === != !==`, logical operators `&&                                                                                               |                                                                                                                                                                                                                                                          | !`, short-circuit evaluation | Ternary & Switch — ternary, `switch` (login status, pass/fail, day of week, month, calculator via switch, traffic light, user role). Challenge: menu-driven calculator              |
| 9   | Modern Operators — ternary, nullish coalescing `??`, optional chaining `?.`, `typeof`, `instanceof`, practical examples                                                       | Functions — declaration, parameters, arguments, return (`add`, `subtract`, `multiply`, `divide`, `isEven`, `isPrime`, `findMax`, `calculatePercentage`). Challenge: utility file with 15 functions                                                       |
| 10  | Functions Introduction — what is a function, declaration, expression, calling functions, parameters, arguments, return values                                                 | Function Parameters — multiple/default parameters, return values (greeting function, calc tax/discount/salary/EMI, generate username)                                                                                                                    |
| 11  | Function Parameters — default parameters, multiple parameters, passing values, return vs console output, function scope, reusable functions                                   | Arrow Functions — arrow syntax, single/multiple parameters, implicit return (convert 20 regular functions to arrow). Challenge: arrow-function utility library                                                                                           |
| 12  | Arrow Functions — syntax, single/multiple parameters, implicit return, arrow vs regular functions, intro to lexical `this`                                                    | Truthy/Falsy — `false, 0, "", null, undefined, NaN` (validate username/email, default value, optional value, empty form validation)                                                                                                                      |
| 13  | JavaScript Events — what are events, event handlers (click/input/change/submit), event object, `addEventListener()`                                                           | Events (browser) — click, input, change, submit, `addEventListener`. Projects: counter, character counter, password visibility, button color changer, live input preview                                                                                 |
| 14  | Browser Storage — Local Storage, Session Storage, `setItem/getItem/removeItem/clear`, storage limitations, Local vs Session Storage                                           | Local Storage — `setItem/getItem/removeItem/clear`, JSON. Project: Persistent Notes App (add/delete/save note, data survives reload)                                                                                                                     |
| 15  | Module 1 Assignment & Revision — Project: Personal Expense Tracker (variables, functions, conditions, events, local storage, basic DOM), module revision, interview questions | Module 1 Project — Expense Tracker (add/delete expense, calculate total, categorize expense, save to Local Storage, load after refresh)                                                                                                                  |

### Module 2 — Control Flow & Problem Solving (Days 16–27)

| Day | Tutorial topic — subtopics                                                                                                                       | Coding practice — focus / problems                                                                                         |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| 16  | `if` Statement — `if`, `else`, `else if`, nested conditions, decision making                                                                     | Loop Basics — `for` (print 1-100, even numbers, odd numbers, sum 1-100, multiplication table)                              |
| 17  | `switch` Statement — `switch`, `case`, `break`, `default`, multiple cases, when to use switch                                                    | `while` & `do...while` (countdown, digit counting, reverse number, password retry, number guessing)                        |
| 18  | Ternary & Conditional Logic — ternary operator, nested ternary, conditional assignment, ternary vs if/else                                       | `break` & `continue` (skip multiples of 3, stop at target, find first matching number, prime search)                       |
| 19  | `for` Loop — loop fundamentals, initialization, condition, increment/decrement, nested loops                                                     | Nested Loops — number patterns, star patterns, multiplication tables. Challenge: 10 different patterns                     |
| 20  | `while` & `do...while` — `while`, `do...while`, infinite loops, practical problems                                                               | Number Problems — reverse number, palindrome, prime, Armstrong number, factorial, Fibonacci, perfect number, strong number |
| 21  | `break` & `continue` — breaking loops, skipping iterations, nested loop control                                                                  | More Number Problems — GCD, LCM, decimal/binary conversion, count/sum/product digits                                       |
| 22  | `for...of` — iterating arrays, strings, collections, `for...of` vs `for`                                                                         | `for...of` practice — strings, arrays, Sets, Maps (character counter, array sum, find maximum, duplicate detection)        |
| 23  | `for...in` — iterating objects, object properties, `for...in` vs `for...of`                                                                      | `for...in` practice — objects (print properties, count properties, find highest value, search property, object to array)   |
| 24  | Nested Loops & Patterns — number patterns, star patterns, nested loop problems, interview problems                                               | String Problems — reverse string, palindrome, count vowels/consonants/words, remove spaces, find duplicate characters      |
| 25  | Number Problem Solving — even/odd, prime, factorial, Fibonacci, reverse number, palindrome number, sum of digits                                 | Pattern Problems — pyramid, reverse pyramid, number pyramid, Floyd's triangle, diamond, hollow square                      |
| 26  | String Problem Solving — reverse string, palindrome string, character counting, vowels/consonants, duplicate characters                          | Problem-Solving Challenge — 20 mixed problems (conditions, loops, functions, numbers, strings), no solution hints          |
| 27  | Module 2 Practical Lab — Mini Project: Student Result System (conditions, switch, loops, functions, problem solving, revision, coding exercises) | Module 2 Assessment — coding test, 30 problems (10 beginner, 10 easy, 10 intermediate)                                     |

### Module 3 — Strings, Numbers, Arrays & Objects (Days 28–47)

| Day | Tutorial topic — subtopics                                                                                                           | Coding practice — focus / problems                                                                                                                                        |
| --- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 28  | Strings Fundamentals — creating strings, indexing, string length, template literals, escape characters                               | String Methods — `slice, substring, includes, startsWith, endsWith, trim` — 15 problems                                                                                   |
| 29  | String Methods Part 1 — `toUpperCase, toLowerCase, trim, charAt, includes, startsWith, endsWith`                                     | String Transformation — `replace, replaceAll, split, join, concat` (slug generator, name formatter, sentence formatter, remove duplicate spaces)                          |
| 30  | String Methods Part 2 — `slice, substring, replace, replaceAll, split, concat, repeat`                                               | String Interview Problems — first non-repeating character, character frequency, anagram, palindrome, longest word, most frequent character                                |
| 31  | Numbers & Math — `Math.round/floor/ceil/trunc/random/max/min/abs`                                                                    | Arrays Basics — create/read/update/delete (sum, average, maximum, minimum, reverse, copy)                                                                                 |
| 32  | Advanced Number Concepts — NaN, Infinity, `Number.isNaN/isFinite/isInteger`, BigInt, floating-point problems                         | Array Modification — `push, pop, shift, unshift, splice`. Challenge: implement your own `myPush/myPop/myShift/myUnshift`                                                  |
| 33  | Arrays Fundamentals — creating arrays, indexing, updating values, array length, nested arrays                                        | Array Search — `includes, indexOf, find, findIndex` (find user/product, find first even number, find employee by ID)                                                      |
| 34  | Array Modification — `push, pop, shift, unshift, splice`                                                                             | `forEach()` — print users, calculate total, modify objects, generate HTML, count values                                                                                   |
| 35  | Array Searching & Extraction — `slice, concat, includes, indexOf, lastIndexOf, find, findIndex`                                      | `map()` — double numbers, square numbers, extract names, add tax, format products, convert API data                                                                       |
| 36  | Array Iteration — `forEach()`, callback functions, iterating arrays, practical examples                                              | `filter()` — even numbers, adults, active users, expensive products, completed tasks                                                                                      |
| 37  | `map()` — transforming arrays, returning values, mapping objects, real-world examples                                                | `reduce()` — sum, product, average, maximum, count frequency, total cart price                                                                                            |
| 38  | `filter()` — filtering arrays, multiple conditions, filtering objects, practical examples                                            | Advanced Array Methods — `some, every, sort, reverse, flat, flatMap`. Challenge: 20 problems using these methods                                                          |
| 39  | `reduce()` — accumulator, sum, product, grouping, counting, real-world examples                                                      | Array of Objects — users/products/employees/students/orders datasets (search, filter, sort, map, reduce, group)                                                           |
| 40  | Advanced Array Methods — `some, every, sort, reverse, flat, flatMap`                                                                 | Object Basics — create object, add/remove/update property, count properties, search property                                                                              |
| 41  | Objects Fundamentals — creating objects, properties, methods, accessing/updating/deleting properties                                 | Object Methods — `Object.keys/values/entries`. Challenge: convert object to array, object to Map                                                                          |
| 42  | Advanced Objects — nested objects, dynamic properties, computed properties, property/method shorthand                                | Destructuring — array/object/nested destructuring, function parameter destructuring. Challenge: refactor 20 old problems using destructuring                              |
| 43  | Object Methods — `Object.keys(), Object.values(), Object.entries(), Object.assign(), Object.freeze(), Object.seal()`                 | Spread & Rest — merge arrays/objects, remove duplicates, clone object, function with unlimited parameters                                                                 |
| 44  | Destructuring — array destructuring, object destructuring, nested destructuring, default values, function parameters                 | Shallow vs Deep Copy — primitive copy, reference copy, `Object.assign`, spread, `structuredClone`. Challenge: examples showing exactly when each technique fails/succeeds |
| 45  | Array & Object Practical Patterns — arrays of objects, nested data, transforming API-style data, searching/filtering real-world data | Data Transformation — users/products/orders/employees datasets (grouping, filtering, sorting, mapping, aggregation)                                                       |
| 46  | Data Processing Practice — student/employee/product data, grouping, sorting, filtering, calculations                                 | Real-World Data Challenge — Project: E-Commerce Product Processor (search, filter, sort, category filter, price range, discount calculation, cart total)                  |
| 47  | Module 3 Assignment — Project: Employee/Product Management System                                                                    | Module 3 Assessment — 40 coding problems (strings, arrays, objects, array methods, destructuring, spread/rest, data transformation)                                       |

### Module 4 — Modern JavaScript & Functions (Days 48–63)

| Day | Tutorial topic — subtopics                                                                                              | Coding practice — focus / problems                                                                                                        |
| --- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| 48  | Scope — global scope, function scope, block scope, lexical scope                                                        | Scope Practice — problems demonstrating global/function/block/nested scope                                                                |
| 49  | Hoisting — variable hoisting, function hoisting, `var/let/const`, Temporal Dead Zone                                    | Hoisting Challenges — predict the output; 20 questions involving var/let/const/function declaration/expression                            |
| 50  | Primitive vs Reference — value types, reference types, copying values, comparing objects, common mistakes               | Reference vs Value — primitive copying, object copying, array copying, equality comparison                                                |
| 51  | Spread Operator — array spread, object spread, copying arrays/objects, merging data                                     | Higher-Order Functions — build `customMap(), customFilter(), customForEach(), customReduce()` (key interview practice)                    |
| 52  | Rest Operator — rest parameters, rest with arrays/objects, rest vs spread                                               | Callback Functions — build `processUser(), processOrder(), calculate(), validate()` using callbacks                                       |
| 53  | Default & Modern Syntax — default parameters, template literals, enhanced object literals, computed properties          | Closures — counter, private variable, login tracker, bank account, `once` function                                                        |
| 54  | Optional Chaining & Nullish Coalescing — optional chaining, nested properties, function calls, `??`, `                  |                                                                                                                                           | `vs`??` | Advanced Closure Problems — implement `once(), memoize(), createCounter(), createLogger(), createIdGenerator()` |
| 55  | Callback Functions — what is a callback, passing functions, callback examples, synchronous callbacks                    | `this` — predict output for 20 examples (global, object, function, arrow, nested function)                                                |
| 56  | Higher-Order Functions — functions as values, functions as arguments, functions returning functions, practical examples | `call()/apply()/bind()` — implement `borrowFunction(), bindFunction()`; practice function borrowing                                       |
| 57  | Closures — lexical environment, closure concept, closure examples, data privacy, real-world use cases                   | Constructor Functions — create `User, Product, Employee, BankAccount`                                                                     |
| 58  | `this` Keyword — global `this`, object method, regular function, arrow function, constructor context                    | Prototype — prototype properties/methods, prototype chain, `Object.create()`                                                              |
| 59  | `call(), apply(), bind()` — explicit `this`, function borrowing, passing arguments, practical examples                  | Prototype Inheritance — build `Animal -> Dog/Cat`, `Vehicle -> Car/Bike`                                                                  |
| 60  | Prototype Introduction — what is a prototype, prototype chain, `__proto__`, `Object.getPrototypeOf()`                   | Getters & Setters — `BankAccount, User, Employee, Product` with validation                                                                |
| 61  | Prototype Inheritance — constructor functions, prototype methods, inheritance, `Object.create()`                        | Advanced Object Challenge — implement `deepClone(), deepFreeze(), isEqual(), flattenObject()`                                             |
| 62  | Advanced Object Concepts — property descriptors, getters, setters, enumerable properties, writable/configurable         | Functional Programming Practice — `map/filter/reduce`, closures, higher-order functions, pure functions                                   |
| 63  | Module 4 Revision & Interview Lab — scope, hoisting, closure, `this`, prototype problems                                | Module 4 Interview Challenge — 25 advanced questions (scope, hoisting, closure, this, call/apply/bind, prototype, higher-order functions) |

### Module 5 — OOP & Advanced Objects (Days 64–76)

| Day | Tutorial topic — subtopics                                                                                             | Coding practice — focus / problems                                                                                    |
| --- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 64  | OOP Introduction — what is OOP, procedural vs OOP, objects, classes, real-world modeling                               | Classes — create `User, Product, Employee, Student`                                                                   |
| 65  | Constructor Functions — constructor functions, `new`, instance properties, prototype methods                           | Constructors & Methods — build a complete Bank Account System                                                         |
| 66  | JavaScript Classes — `class`, `constructor`, methods, creating instances                                               | Encapsulation — implement private fields `#balance, #password, #salary`                                               |
| 67  | Class Properties & Methods — instance properties, static properties, static methods, private fields                    | Getters & Setters — build an Employee Management System with validation                                               |
| 68  | Encapsulation — public properties, private fields, getters, setters, data protection                                   | Inheritance — build `Person -> Student`, `Person -> Teacher`                                                          |
| 69  | Inheritance — `extends`, `super`, parent/child classes, method inheritance                                             | Polymorphism — different implementations of `calculateSalary(), calculateArea(), calculatePayment()`                  |
| 70  | Polymorphism — method overriding, dynamic behavior, practical examples                                                 | Composition — build `User, Address, Order, Payment, Notification` without unnecessary inheritance                     |
| 71  | Abstraction — abstraction concept, hiding implementation, designing reusable classes                                   | Static Methods — `User.validate(), User.create(), Product.search(), Product.sort()`                                   |
| 72  | Composition — composition vs inheritance, reusable objects, practical architecture                                     | `Set` — remove duplicates, unique users/tags, set operations; implement `union(), intersection(), difference()`       |
| 73  | OOP Project — Bank Account / Shopping Cart System                                                                      | `Map` — build `frequencyCounter, cache, userLookup, productLookup`                                                    |
| 74  | Advanced Collections — `Set`, unique values, Set methods, practical examples                                           | `WeakMap`/`WeakSet` — private metadata, object tracking, cache scenarios                                              |
| 75  | Map & Weak Collections — `Map, WeakMap, WeakSet`, use cases                                                            | OOP Project — Shopping Cart System (`Product, Cart, Customer, Order, Payment`)                                        |
| 76  | Module 5 Revision — OOP interview questions, prototype vs class, inheritance vs composition, practical coding problems | Module 5 Assessment — mini Library Management System (classes, inheritance, encapsulation, Map, Set, getters/setters) |

### Module 6 — Asynchronous JavaScript (Days 77–91)

| Day | Tutorial topic — subtopics                                                                            | Coding practice — focus / problems                                                                                                       |
| --- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 77  | Synchronous vs Asynchronous JavaScript — synchronous/asynchronous execution, blocking vs non-blocking | Timers — `setTimeout/setInterval/clearTimeout/clearInterval`. Projects: countdown, stopwatch, digital clock                              |
| 78  | Execution Context — global/function execution context, creation phase, execution phase                | Callback Async — build `login(), getUser(), getOrders(), getProducts()` using callbacks                                                  |
| 79  | Call Stack — stack concept, function calls, stack overflow, execution flow                            | Callback Hell — convert nested callbacks into cleaner code                                                                               |
| 80  | JavaScript Runtime — JS engine, Web APIs, callback queue, event loop                                  | Promise Basics — create your own promises for login, payment, file processing, API simulation                                            |
| 81  | Event Loop — event loop, call stack, task queue, microtask queue, macrotask concept                   | Promise Chaining — build `login() -> getUser() -> getOrders() -> getPayment()`                                                           |
| 82  | Callback-Based Async — callbacks, async callbacks, callback hell, problems with callbacks             | Promise Error Handling — `catch`, `finally`, reject, custom errors                                                                       |
| 83  | Promises — promise concept, pending/fulfilled/rejected, creating promises                             | `Promise.all` — build `loadUsers(), loadProducts(), loadOrders()` together                                                               |
| 84  | Promise Methods — `.then(), .catch(), .finally()`, promise chaining                                   | Promise Combinators — `Promise.all/allSettled/race/any`                                                                                  |
| 85  | Promise Combinators — `Promise.all(), Promise.allSettled(), Promise.race(), Promise.any()`            | Async/Await — convert Promise-based solutions to async/await                                                                             |
| 86  | Async/Await — `async`, `await`, returning promises, error handling                                    | Sequential vs Parallel — solve the same problem both ways; compare execution behavior                                                    |
| 87  | Async/Await Advanced — sequential vs parallel execution, `Promise.all()`, common mistakes             | Event Loop Challenges — predict output (console.log, setTimeout, Promise.then, queueMicrotask, async/await); 30 output-based questions   |
| 88  | Fetch API — `fetch()`, GET, POST, headers, request/response                                           | Fetch API — GET/POST/PUT/DELETE against a public API or local mock JSON                                                                  |
| 89  | API Error Handling — HTTP status codes, network errors, API errors, try/catch, loading states         | API Data Processing — fetch users/products; implement search, filter, sort, pagination, error handling                                   |
| 90  | API Data Processing — JSON response, `response.json()`, transforming/displaying API data              | API Project — User Management Dashboard (fetch, search, filter, sort, details, delete, loading, error, retry)                            |
| 91  | Async JavaScript Project — Weather / Product / User API Dashboard                                     | Async Assessment — Advanced API Challenge combining fetch, promises, async/await, error handling, parallel requests, data transformation |

### Module 7 — DOM, Browser & Professional JavaScript (Days 92–110)

| Day | Tutorial topic — subtopics                                                                                                                                                                                                                                 | Coding practice — focus / problems                                                                                                                                                                       |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 92  | DOM Introduction — what is the DOM, DOM tree, selecting elements, `getElementById/querySelector/querySelectorAll`                                                                                                                                          | DOM Selection — build a Dynamic User List                                                                                                                                                                |
| 93  | DOM Manipulation — text content, HTML content, attributes, classes, styles                                                                                                                                                                                 | DOM Manipulation — `textContent, innerHTML, classList`, attributes, styles                                                                                                                               |
| 94  | Creating & Removing Elements — `createElement(), append(), prepend(), remove(), replaceWith()`                                                                                                                                                             | Create/Delete DOM — build a Dynamic Todo List                                                                                                                                                            |
| 95  | DOM Events — click, input, change, submit, keyboard events, mouse events                                                                                                                                                                                   | DOM Events — Projects: counter, calculator, character counter, password toggle, image preview                                                                                                            |
| 96  | Event Propagation — bubbling, capturing, `stopPropagation()`, `preventDefault()`                                                                                                                                                                           | Event Bubbling/Capturing — experiment demonstrating capture/target/bubble, stopPropagation, preventDefault                                                                                               |
| 97  | Event Delegation — event delegation, dynamic elements, practical use cases                                                                                                                                                                                 | Event Delegation — build a Dynamic Todo List using event delegation                                                                                                                                      |
| 98  | Forms & Validation — form handling, FormData, validation, error messages                                                                                                                                                                                   | Forms — build a Registration Form (name, email, phone, password, confirm password validation)                                                                                                            |
| 99  | Browser Storage & Cookies — Local Storage, Session Storage, cookies, storage security considerations                                                                                                                                                       | Local Storage Project — Todo Application (add/edit/delete/complete/filter/search, Local Storage)                                                                                                         |
| 100 | JSON — JSON syntax, `JSON.stringify(), JSON.parse()`, API data                                                                                                                                                                                             | JSON — build a JSON Data Viewer                                                                                                                                                                          |
| 101 | ES Modules — `export`, `import`, named exports, default exports, module scope                                                                                                                                                                              | ES Modules — build `math.js, user.js, product.js, utils.js, app.js` as a modular application                                                                                                             |
| 102 | Dynamic Modules — dynamic `import()`, lazy loading, module organization                                                                                                                                                                                    | Dynamic Import — build a lazy-loaded calculator/feature module                                                                                                                                           |
| 103 | Regular Expressions — regex basics, character classes, quantifiers, groups, validation, search & replace                                                                                                                                                   | Regex — email, phone, password, URL, username, postal code. Project: form validation engine                                                                                                              |
| 104 | Iterators — iterable, iterator, `next()`, custom iterators                                                                                                                                                                                                 | Iterators — build `range(), customIterator(), paginationIterator()`                                                                                                                                      |
| 105 | Generators — generator functions, `yield`, generator iteration, practical use cases                                                                                                                                                                        | Generators — build `idGenerator(), numberGenerator(), passwordGenerator()`                                                                                                                               |
| 106 | Memory Management — memory lifecycle, garbage collection, memory leaks, common causes                                                                                                                                                                      | Debounce — build a Search Box (type -> wait 500ms -> search executes)                                                                                                                                    |
| 107 | Debouncing & Throttling — debouncing, throttling, search box/scroll/resize examples                                                                                                                                                                        | Throttle — build scroll tracker, resize tracker, mouse movement tracker                                                                                                                                  |
| 108 | Internationalization — `Intl`, number formatting, currency, date formatting, locale                                                                                                                                                                        | Memory & Performance — identify memory leaks, event listener cleanup, large array optimization, avoid unnecessary DOM ops, caching                                                                       |
| 109 | Professional JavaScript Patterns — clean code, reusable functions, defensive programming, error handling, naming conventions, modular code                                                                                                                 | Professional JavaScript Challenge — build a utility library: `debounce, throttle, memoize, deepClone, deepEqual, groupBy, chunk, flatten, once, pipe`                                                    |
| 110 | Final JavaScript Project & Assessment — Capstone: Employee/E-Commerce Management Dashboard (DOM, events, forms, arrays, objects, classes, modules, Local Storage, fetch, promises, async/await, search/filter/sort/pagination, debouncing, error handling) | Final Coding Challenge — Capstone: E-Commerce Management Application (product list -> search -> filter -> sort -> details -> cart -> quantity -> remove -> total -> coupon -> checkout -> order history) |

## 5. Module -> Day quick map

| Module | Topic                                  | Days   |
| ------ | -------------------------------------- | ------ |
| 1      | JavaScript Fundamentals                | 1-15   |
| 2      | Control Flow & Problem Solving         | 16-27  |
| 3      | Strings, Numbers, Arrays & Objects     | 28-47  |
| 4      | Modern JavaScript & Functions          | 48-63  |
| 5      | OOP & Advanced Objects                 | 64-76  |
| 6      | Asynchronous JavaScript                | 77-91  |
| 7      | DOM, Browser & Professional JavaScript | 92-110 |

## 6. Suggested workflow per day

1. Pick the next day number (tutorial and coding stay in sync).
2. Write the tutorial lesson in `public/tutorials/javascript/day-0XX-*.md` — simple
   explanation first, then a short code example, then a quick recap.
3. Write the matching practice file in `public/coding/JavaScript/day-0XX-*.md` — as many
   problems as the topic needs, split into Basic / Concept / Interview / Challenge.
4. Run `npm run content:generate` (from `tutorial-platform/`) to refresh navigation and
   search for the tutorial track.
5. Check off the day in the progress tracker below.

## 7. Progress tracker

- [x] Module 1 — Fundamentals (Days 1–15)
- [x] Module 2 — Control Flow (Days 16–27)
- [x] Module 3 — Strings/Arrays/Objects (Days 28–47)
- [x] Module 4 — Scope/Closures/Prototype (Days 48–63)
- [x] Module 5 — OOP & Collections (Days 64–76)
- [x] Module 6 — Async JS (Days 77–91)
- [x] Module 7 — DOM & Professional JS (Days 92–110)

## 8. Bonus coding-only extension (Days 111–119)

The core 110-day roadmap is a matched tutorial+coding pair. These extra days are
**coding-only** (no tutorial counterpart) — added to cover DSA fundamentals and extra
mini-projects that the core roadmap didn't include. No cap on extending further.

| Day | Coding practice                                                                                                                                                                                                                                                           |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 111 | Sorting Algorithms I — bubble, selection, insertion sort                                                                                                                                                                                                                  |
| 112 | Sorting Algorithms II — merge sort, quick sort                                                                                                                                                                                                                            |
| 113 | Searching Algorithms — linear search, binary search                                                                                                                                                                                                                       |
| 114 | Stack & Queue — implement both from scratch                                                                                                                                                                                                                               |
| 115 | Linked List — implement from scratch, including reverse                                                                                                                                                                                                                   |
| 116 | Hash Table & LRU Cache                                                                                                                                                                                                                                                    |
| 117 | Tree & Graph Traversal — BFS, DFS                                                                                                                                                                                                                                         |
| 118 | Advanced Patterns — Event Emitter, Promise Simulator, Async Retry, Rate Limiter                                                                                                                                                                                           |
| 119 | Mini Projects Pack — Color Generator, Clipboard App, Quiz App, Accordion, Tabs, Modal, Slider, FAQ, Dark Mode, Typing Speed Test, Habit Tracker, Currency Converter, Weather App, GitHub Finder, QR Generator, Movie Search, Music Player, Bookmark Manager, Kanban Board |
