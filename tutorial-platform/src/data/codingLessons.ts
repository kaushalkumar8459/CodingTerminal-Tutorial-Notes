// Coding lesson routes; lesson content is loaded from MongoDB.
import type { CodingTrackKey } from "./codingTracks";

export type CodingLessonMeta = {
  track: CodingTrackKey;
  slug: string;
  title: string;
  order: number;
};

export const codingLessons: CodingLessonMeta[] = [
  {
    "track": "htmlinterview",
    "slug": "day-001-introduction-to-html",
    "title": "HTML Document Foundations",
    "order": 1
  },
  {
    "track": "htmlinterview",
    "slug": "day-002-text-content-and-formatting",
    "title": "Text, Headings, and Meaning",
    "order": 2
  },
  {
    "track": "htmlinterview",
    "slug": "day-003-links-images-and-paths",
    "title": "Links, Images, and Paths",
    "order": 3
  },
  {
    "track": "htmlinterview",
    "slug": "day-004-lists-tables-and-content-groups",
    "title": "Lists, Tables, and Flow Content",
    "order": 4
  },
  {
    "track": "htmlinterview",
    "slug": "day-005-forms-structure-and-controls",
    "title": "Forms, Labels, and Controls",
    "order": 5
  },
  {
    "track": "htmlinterview",
    "slug": "day-006-input-types-and-validation",
    "title": "Input Types and Validation",
    "order": 6
  },
  {
    "track": "htmlinterview",
    "slug": "day-007-semantic-html-and-accessibility",
    "title": "Semantic HTML and Accessibility",
    "order": 7
  },
  {
    "track": "htmlinterview",
    "slug": "day-008-audio-video-and-embedded-content",
    "title": "Media, Responsive Images, and Frames",
    "order": 8
  },
  {
    "track": "htmlinterview",
    "slug": "day-009-document-head-metadata-and-quality",
    "title": "Document Head and Validation",
    "order": 9
  },
  {
    "track": "htmlinterview",
    "slug": "day-010-html-capstone-project-and-review",
    "title": "Core HTML Capstone",
    "order": 10
  },
  {
    "track": "htmlinterview",
    "slug": "day-011-html-styling-classes-ids-and-comments",
    "title": "Classes, IDs, Styling, and Legacy Markup",
    "order": 11
  },
  {
    "track": "htmlinterview",
    "slug": "day-012-layout-responsive-design-and-code-elements",
    "title": "Layout, Paths, and Code Elements",
    "order": 12
  },
  {
    "track": "htmlinterview",
    "slug": "day-013-entities-encoding-and-xhtml",
    "title": "Entities, Encoding, URLs, and XHTML",
    "order": 13
  },
  {
    "track": "htmlinterview",
    "slug": "day-014-advanced-form-elements-and-attributes",
    "title": "Advanced Form Elements and Attributes",
    "order": 14
  },
  {
    "track": "htmlinterview",
    "slug": "day-015-embedded-content-and-third-party-media",
    "title": "Iframes, YouTube, and Embedded Content",
    "order": 15
  },
  {
    "track": "htmlinterview",
    "slug": "day-016-svg-and-canvas-graphics",
    "title": "SVG and Canvas Practice",
    "order": 16
  },
  {
    "track": "htmlinterview",
    "slug": "day-017-geolocation-and-drag-and-drop-apis",
    "title": "Geolocation and Drag-and-Drop APIs",
    "order": 17
  },
  {
    "track": "htmlinterview",
    "slug": "day-018-web-storage-workers-and-server-sent-events",
    "title": "Storage, Workers, and Server-Sent Events",
    "order": 18
  },
  {
    "track": "htmlinterview",
    "slug": "day-019-advanced-html-tables-and-accessibility",
    "title": "Advanced Data Tables",
    "order": 19
  },
  {
    "track": "javascript",
    "slug": "day-001-variables-and-output",
    "title": "Variables & Output",
    "order": 1
  },
  {
    "track": "javascript",
    "slug": "day-002-data-types",
    "title": "Data Types",
    "order": 2
  },
  {
    "track": "javascript",
    "slug": "day-003-type-conversion",
    "title": "Type Conversion",
    "order": 3
  },
  {
    "track": "javascript",
    "slug": "day-004-arithmetic-operators",
    "title": "Arithmetic Operators",
    "order": 4
  },
  {
    "track": "javascript",
    "slug": "day-005-comparison-operators",
    "title": "Comparison Operators",
    "order": 5
  },
  {
    "track": "javascript",
    "slug": "day-006-logical-operators",
    "title": "Logical Operators",
    "order": 6
  },
  {
    "track": "javascript",
    "slug": "day-007-conditional-practice",
    "title": "Conditional Practice",
    "order": 7
  },
  {
    "track": "javascript",
    "slug": "day-008-ternary-and-switch",
    "title": "Ternary & Switch",
    "order": 8
  },
  {
    "track": "javascript",
    "slug": "day-009-functions",
    "title": "Functions",
    "order": 9
  },
  {
    "track": "javascript",
    "slug": "day-010-function-parameters",
    "title": "Function Parameters",
    "order": 10
  },
  {
    "track": "javascript",
    "slug": "day-011-arrow-functions",
    "title": "Arrow Functions",
    "order": 11
  },
  {
    "track": "javascript",
    "slug": "day-012-truthy-falsy",
    "title": "Truthy/Falsy",
    "order": 12
  },
  {
    "track": "javascript",
    "slug": "day-013-events",
    "title": "Events (Browser)",
    "order": 13
  },
  {
    "track": "javascript",
    "slug": "day-014-local-storage",
    "title": "Local Storage",
    "order": 14
  },
  {
    "track": "javascript",
    "slug": "day-015-module-1-project",
    "title": "Module 1 Project: Expense Tracker",
    "order": 15
  },
  {
    "track": "javascript",
    "slug": "day-016-loop-basics",
    "title": "Loop Basics",
    "order": 16
  },
  {
    "track": "javascript",
    "slug": "day-017-while-and-do-while",
    "title": "while & do...while",
    "order": 17
  },
  {
    "track": "javascript",
    "slug": "day-018-break-and-continue",
    "title": "break & continue",
    "order": 18
  },
  {
    "track": "javascript",
    "slug": "day-019-nested-loops",
    "title": "Nested Loops",
    "order": 19
  },
  {
    "track": "javascript",
    "slug": "day-020-number-problems",
    "title": "Number Problems",
    "order": 20
  },
  {
    "track": "javascript",
    "slug": "day-021-more-number-problems",
    "title": "More Number Problems",
    "order": 21
  },
  {
    "track": "javascript",
    "slug": "day-022-for-of-practice",
    "title": "for...of Practice",
    "order": 22
  },
  {
    "track": "javascript",
    "slug": "day-023-for-in-practice",
    "title": "for...in Practice",
    "order": 23
  },
  {
    "track": "javascript",
    "slug": "day-024-string-problems",
    "title": "String Problems",
    "order": 24
  },
  {
    "track": "javascript",
    "slug": "day-025-pattern-problems",
    "title": "Pattern Problems",
    "order": 25
  },
  {
    "track": "javascript",
    "slug": "day-026-problem-solving-challenge",
    "title": "Problem-Solving Challenge (Mixed, No Hints)",
    "order": 26
  },
  {
    "track": "javascript",
    "slug": "day-027-module-2-assessment",
    "title": "Module 2 Assessment (30 Problems)",
    "order": 27
  },
  {
    "track": "javascript",
    "slug": "day-028-string-methods",
    "title": "String Methods (slice, substring, includes, startsWith, endsWith, trim)",
    "order": 28
  },
  {
    "track": "javascript",
    "slug": "day-029-string-transformation",
    "title": "String Transformation (replace, replaceAll, split, join, concat)",
    "order": 29
  },
  {
    "track": "javascript",
    "slug": "day-030-string-interview-problems",
    "title": "String Interview Problems",
    "order": 30
  },
  {
    "track": "javascript",
    "slug": "day-031-arrays-basics",
    "title": "Arrays Basics",
    "order": 31
  },
  {
    "track": "javascript",
    "slug": "day-032-array-modification",
    "title": "Array Modification (push, pop, shift, unshift, splice)",
    "order": 32
  },
  {
    "track": "javascript",
    "slug": "day-033-array-search",
    "title": "Array Search (includes, indexOf, find, findIndex)",
    "order": 33
  },
  {
    "track": "javascript",
    "slug": "day-034-foreach",
    "title": "forEach()",
    "order": 34
  },
  {
    "track": "javascript",
    "slug": "day-035-map",
    "title": "map()",
    "order": 35
  },
  {
    "track": "javascript",
    "slug": "day-036-filter",
    "title": "filter()",
    "order": 36
  },
  {
    "track": "javascript",
    "slug": "day-037-reduce",
    "title": "reduce()",
    "order": 37
  },
  {
    "track": "javascript",
    "slug": "day-038-advanced-array-methods",
    "title": "Advanced Array Methods (some, every, sort, reverse, flat, flatMap)",
    "order": 38
  },
  {
    "track": "javascript",
    "slug": "day-039-array-of-objects",
    "title": "Array of Objects",
    "order": 39
  },
  {
    "track": "javascript",
    "slug": "day-040-object-basics",
    "title": "Object Basics",
    "order": 40
  },
  {
    "track": "javascript",
    "slug": "day-041-object-methods",
    "title": "Object Methods (keys, values, entries)",
    "order": 41
  },
  {
    "track": "javascript",
    "slug": "day-042-destructuring",
    "title": "Destructuring",
    "order": 42
  },
  {
    "track": "javascript",
    "slug": "day-043-spread-and-rest",
    "title": "Spread & Rest",
    "order": 43
  },
  {
    "track": "javascript",
    "slug": "day-044-shallow-vs-deep-copy",
    "title": "Shallow vs Deep Copy",
    "order": 44
  },
  {
    "track": "javascript",
    "slug": "day-045-data-transformation",
    "title": "Data Transformation",
    "order": 45
  },
  {
    "track": "javascript",
    "slug": "day-046-real-world-data-challenge",
    "title": "Real-World Data Challenge: E-Commerce Product Processor",
    "order": 46
  },
  {
    "track": "javascript",
    "slug": "day-047-module-3-assessment",
    "title": "Module 3 Assessment (40 Problems)",
    "order": 47
  },
  {
    "track": "javascript",
    "slug": "day-048-scope-practice",
    "title": "Scope Practice",
    "order": 48
  },
  {
    "track": "javascript",
    "slug": "day-049-hoisting-challenges",
    "title": "Hoisting Challenges (Predict the Output)",
    "order": 49
  },
  {
    "track": "javascript",
    "slug": "day-050-reference-vs-value",
    "title": "Reference vs Value",
    "order": 50
  },
  {
    "track": "javascript",
    "slug": "day-051-higher-order-functions",
    "title": "Higher-Order Functions (customMap, customFilter, customForEach, customReduce)",
    "order": 51
  },
  {
    "track": "javascript",
    "slug": "day-052-callback-functions",
    "title": "Callback Functions (processUser, processOrder, calculate, validate)",
    "order": 52
  },
  {
    "track": "javascript",
    "slug": "day-053-closures",
    "title": "Closures (Counter, Private Variable, Login Tracker, Bank Account, once)",
    "order": 53
  },
  {
    "track": "javascript",
    "slug": "day-054-advanced-closure-problems",
    "title": "Advanced Closure Problems (once, memoize, createCounter, createLogger, createIdGenerator)",
    "order": 54
  },
  {
    "track": "javascript",
    "slug": "day-055-this-keyword",
    "title": "this (Predict the Output, 20 Examples)",
    "order": 55
  },
  {
    "track": "javascript",
    "slug": "day-056-call-apply-bind",
    "title": "call/apply/bind (borrowFunction, bindFunction)",
    "order": 56
  },
  {
    "track": "javascript",
    "slug": "day-057-constructor-functions",
    "title": "Constructor Functions (User, Product, Employee, BankAccount)",
    "order": 57
  },
  {
    "track": "javascript",
    "slug": "day-058-prototype",
    "title": "Prototype (Properties, Methods, Chain, Object.create)",
    "order": 58
  },
  {
    "track": "javascript",
    "slug": "day-059-prototype-inheritance",
    "title": "Prototype Inheritance (Animal->Dog/Cat, Vehicle->Car/Bike)",
    "order": 59
  },
  {
    "track": "javascript",
    "slug": "day-060-getters-and-setters",
    "title": "Getters & Setters (BankAccount, User, Employee, Product)",
    "order": 60
  },
  {
    "track": "javascript",
    "slug": "day-061-advanced-object-challenge",
    "title": "Advanced Object Challenge (deepClone, deepFreeze, isEqual, flattenObject)",
    "order": 61
  },
  {
    "track": "javascript",
    "slug": "day-062-functional-programming-practice",
    "title": "Functional Programming Practice",
    "order": 62
  },
  {
    "track": "javascript",
    "slug": "day-063-module-4-interview-challenge",
    "title": "Module 4 Interview Challenge (25 Advanced Questions)",
    "order": 63
  },
  {
    "track": "javascript",
    "slug": "day-064-classes",
    "title": "Classes (User, Product, Employee, Student)",
    "order": 64
  },
  {
    "track": "javascript",
    "slug": "day-065-constructors-and-methods",
    "title": "Constructors & Methods: Bank Account System",
    "order": 65
  },
  {
    "track": "javascript",
    "slug": "day-066-encapsulation",
    "title": "Encapsulation (Private Fields #balance, #password, #salary)",
    "order": 66
  },
  {
    "track": "javascript",
    "slug": "day-067-getters-and-setters-employee-system",
    "title": "Getters & Setters: Employee Management System",
    "order": 67
  },
  {
    "track": "javascript",
    "slug": "day-068-inheritance",
    "title": "Inheritance (Person -> Student, Person -> Teacher)",
    "order": 68
  },
  {
    "track": "javascript",
    "slug": "day-069-polymorphism",
    "title": "Polymorphism (calculateSalary, calculateArea, calculatePayment)",
    "order": 69
  },
  {
    "track": "javascript",
    "slug": "day-070-composition",
    "title": "Composition (User, Address, Order, Payment, Notification)",
    "order": 70
  },
  {
    "track": "javascript",
    "slug": "day-071-static-methods",
    "title": "Static Methods (User.validate/create, Product.search/sort)",
    "order": 71
  },
  {
    "track": "javascript",
    "slug": "day-072-set",
    "title": "Set (union, intersection, difference)",
    "order": 72
  },
  {
    "track": "javascript",
    "slug": "day-073-map",
    "title": "Map (frequencyCounter, cache, userLookup, productLookup)",
    "order": 73
  },
  {
    "track": "javascript",
    "slug": "day-074-weakmap-weakset",
    "title": "WeakMap / WeakSet",
    "order": 74
  },
  {
    "track": "javascript",
    "slug": "day-075-oop-project-shopping-cart",
    "title": "OOP Project: Shopping Cart System",
    "order": 75
  },
  {
    "track": "javascript",
    "slug": "day-076-module-5-assessment",
    "title": "Module 5 Assessment: Mini Library Management System",
    "order": 76
  },
  {
    "track": "javascript",
    "slug": "day-077-timers",
    "title": "Timers (setTimeout, setInterval, clearTimeout, clearInterval)",
    "order": 77
  },
  {
    "track": "javascript",
    "slug": "day-078-callback-async",
    "title": "Callback Async (login, getUser, getOrders, getProducts)",
    "order": 78
  },
  {
    "track": "javascript",
    "slug": "day-079-callback-hell",
    "title": "Callback Hell",
    "order": 79
  },
  {
    "track": "javascript",
    "slug": "day-080-promise-basics",
    "title": "Promise Basics",
    "order": 80
  },
  {
    "track": "javascript",
    "slug": "day-081-promise-chaining",
    "title": "Promise Chaining",
    "order": 81
  },
  {
    "track": "javascript",
    "slug": "day-082-promise-error-handling",
    "title": "Promise Error Handling",
    "order": 82
  },
  {
    "track": "javascript",
    "slug": "day-083-promise-all",
    "title": "Promise.all (loadUsers, loadProducts, loadOrders)",
    "order": 83
  },
  {
    "track": "javascript",
    "slug": "day-084-promise-combinators",
    "title": "Promise Combinators (all, allSettled, race, any)",
    "order": 84
  },
  {
    "track": "javascript",
    "slug": "day-085-async-await",
    "title": "Async/Await (Convert Promise Solutions)",
    "order": 85
  },
  {
    "track": "javascript",
    "slug": "day-086-sequential-vs-parallel",
    "title": "Sequential vs Parallel",
    "order": 86
  },
  {
    "track": "javascript",
    "slug": "day-087-event-loop-challenges",
    "title": "Event Loop Challenges (30 Predict-the-Output Questions)",
    "order": 87
  },
  {
    "track": "javascript",
    "slug": "day-088-fetch-api",
    "title": "Fetch API (GET, POST, PUT, DELETE)",
    "order": 88
  },
  {
    "track": "javascript",
    "slug": "day-089-api-data-processing",
    "title": "API Data Processing",
    "order": 89
  },
  {
    "track": "javascript",
    "slug": "day-090-user-management-dashboard",
    "title": "API Project: User Management Dashboard",
    "order": 90
  },
  {
    "track": "javascript",
    "slug": "day-091-async-assessment",
    "title": "Async Assessment: Advanced API Challenge",
    "order": 91
  },
  {
    "track": "javascript",
    "slug": "day-092-dom-selection",
    "title": "DOM Selection: Dynamic User List",
    "order": 92
  },
  {
    "track": "javascript",
    "slug": "day-093-dom-manipulation",
    "title": "DOM Manipulation (textContent, innerHTML, classList, attributes, styles)",
    "order": 93
  },
  {
    "track": "javascript",
    "slug": "day-094-create-delete-dom",
    "title": "Create/Delete DOM: Dynamic Todo List",
    "order": 94
  },
  {
    "track": "javascript",
    "slug": "day-095-dom-events-projects",
    "title": "DOM Events Projects",
    "order": 95
  },
  {
    "track": "javascript",
    "slug": "day-096-event-bubbling-capturing",
    "title": "Event Bubbling/Capturing Experiment",
    "order": 96
  },
  {
    "track": "javascript",
    "slug": "day-097-event-delegation",
    "title": "Event Delegation: Dynamic Todo List",
    "order": 97
  },
  {
    "track": "javascript",
    "slug": "day-098-forms",
    "title": "Forms: Registration Form",
    "order": 98
  },
  {
    "track": "javascript",
    "slug": "day-099-local-storage-todo-app",
    "title": "Local Storage Project: Todo Application",
    "order": 99
  },
  {
    "track": "javascript",
    "slug": "day-100-json-data-viewer",
    "title": "JSON Data Viewer",
    "order": 100
  },
  {
    "track": "javascript",
    "slug": "day-101-es-modules",
    "title": "ES Modules: math.js, user.js, product.js, utils.js, app.js",
    "order": 101
  },
  {
    "track": "javascript",
    "slug": "day-102-dynamic-import",
    "title": "Dynamic Import: Lazy-Loaded Calculator",
    "order": 102
  },
  {
    "track": "javascript",
    "slug": "day-103-regex",
    "title": "Regex: Form Validation Engine",
    "order": 103
  },
  {
    "track": "javascript",
    "slug": "day-104-iterators",
    "title": "Iterators (range, customIterator, paginationIterator)",
    "order": 104
  },
  {
    "track": "javascript",
    "slug": "day-105-generators",
    "title": "Generators (idGenerator, numberGenerator, passwordGenerator)",
    "order": 105
  },
  {
    "track": "javascript",
    "slug": "day-106-debounce",
    "title": "Debounce: Search Box",
    "order": 106
  },
  {
    "track": "javascript",
    "slug": "day-107-throttle",
    "title": "Throttle: Scroll, Resize, Mouse Trackers",
    "order": 107
  },
  {
    "track": "javascript",
    "slug": "day-108-memory-and-performance",
    "title": "Memory & Performance",
    "order": 108
  },
  {
    "track": "javascript",
    "slug": "day-109-professional-javascript-challenge",
    "title": "Professional JavaScript Challenge: Personal Utility Library",
    "order": 109
  },
  {
    "track": "javascript",
    "slug": "day-110-final-coding-challenge",
    "title": "Final Coding Challenge: E-Commerce Management Application",
    "order": 110
  },
  {
    "track": "javascript",
    "slug": "day-111-sorting-algorithms-1",
    "title": "Sorting Algorithms I (Bubble, Selection, Insertion)",
    "order": 111
  },
  {
    "track": "javascript",
    "slug": "day-112-sorting-algorithms-2",
    "title": "Sorting Algorithms II (Merge Sort, Quick Sort)",
    "order": 112
  },
  {
    "track": "javascript",
    "slug": "day-113-searching-algorithms",
    "title": "Searching Algorithms (Linear Search, Binary Search)",
    "order": 113
  },
  {
    "track": "javascript",
    "slug": "day-114-stack-and-queue",
    "title": "Stack & Queue Implementation",
    "order": 114
  },
  {
    "track": "javascript",
    "slug": "day-115-linked-list",
    "title": "Linked List Implementation",
    "order": 115
  },
  {
    "track": "javascript",
    "slug": "day-116-hash-table-and-lru-cache",
    "title": "Hash Table & LRU Cache",
    "order": 116
  },
  {
    "track": "javascript",
    "slug": "day-117-tree-and-graph-traversal",
    "title": "Tree & Graph Traversal (BFS, DFS)",
    "order": 117
  },
  {
    "track": "javascript",
    "slug": "day-118-advanced-patterns",
    "title": "Advanced Patterns (Event Emitter, Promise Simulator, Async Retry, Rate Limiter)",
    "order": 118
  },
  {
    "track": "javascript",
    "slug": "day-119-mini-projects-pack",
    "title": "Mini Projects Pack (DOM + API)",
    "order": 119
  },
  {
    "track": "javascript",
    "slug": "day-120-coding-problem-bank-arrays-and-numbers",
    "title": "JavaScript Interview Coding: Arrays and Numbers",
    "order": 120
  },
  {
    "track": "javascript",
    "slug": "day-121-coding-problem-bank-strings-and-objects",
    "title": "JavaScript Interview Coding: Strings and Objects",
    "order": 121
  },
  {
    "track": "javascript",
    "slug": "day-122-error-handling-and-custom-errors",
    "title": "Error Handling & Custom Errors",
    "order": 122
  },
  {
    "track": "javascript",
    "slug": "day-123-date-and-time",
    "title": "Date & Time APIs",
    "order": 123
  },
  {
    "track": "javascript",
    "slug": "day-124-symbol-bigint-modern-operators",
    "title": "Symbol, BigInt & Modern JavaScript Operators",
    "order": 124
  },
  {
    "track": "javascript",
    "slug": "day-125-proxy-reflect-and-property-descriptors",
    "title": "Proxy, Reflect & Property Descriptors",
    "order": 125
  },
  {
    "track": "javascript",
    "slug": "day-126-event-loop-deep-dive",
    "title": "Event Loop Deep Dive",
    "order": 126
  },
  {
    "track": "javascript",
    "slug": "day-127-memory-management-and-garbage-collection",
    "title": "Memory Management & Garbage Collection",
    "order": 127
  },
  {
    "track": "javascript",
    "slug": "day-128-javascript-modules-deep-dive",
    "title": "JavaScript Modules Deep Dive",
    "order": 128
  },
  {
    "track": "javascript",
    "slug": "day-129-web-workers-and-background-processing",
    "title": "Web Workers & Background Processing",
    "order": 129
  },
  {
    "track": "javascript",
    "slug": "day-130-browser-web-apis",
    "title": "Browser Web APIs",
    "order": 130
  },
  {
    "track": "javascript",
    "slug": "day-131-web-storage-and-indexeddb",
    "title": "Web Storage, Cookies & IndexedDB",
    "order": 131
  },
  {
    "track": "javascript",
    "slug": "day-132-frontend-security",
    "title": "Frontend Security",
    "order": 132
  },
  {
    "track": "javascript",
    "slug": "day-133-javascript-performance-and-optimization",
    "title": "JavaScript Performance & Optimization",
    "order": 133
  },
  {
    "track": "javascript",
    "slug": "day-134-internationalization",
    "title": "JavaScript Internationalization",
    "order": 134
  },
  {
    "track": "javascriptbrowser",
    "slug": "day-001-browser-fundamentals",
    "title": "Browser Fundamentals",
    "order": 1
  },
  {
    "track": "javascriptbrowser",
    "slug": "day-002-dom-deep-dive",
    "title": "DOM Deep Dive",
    "order": 2
  },
  {
    "track": "javascriptbrowser",
    "slug": "day-003-events-and-event-delegation",
    "title": "Events & Event Delegation",
    "order": 3
  },
  {
    "track": "javascriptbrowser",
    "slug": "day-004-browser-rendering-pipeline",
    "title": "Browser Rendering Pipeline",
    "order": 4
  },
  {
    "track": "javascriptbrowser",
    "slug": "day-005-browser-storage-and-cookies",
    "title": "Browser Storage & Cookies",
    "order": 5
  },
  {
    "track": "javascriptbrowser",
    "slug": "day-006-network-http-cors-cache",
    "title": "HTTP, CORS & Browser Networking",
    "order": 6
  },
  {
    "track": "javascriptbrowser",
    "slug": "day-007-browser-performance-and-core-web-vitals",
    "title": "Browser Performance & Core Web Vitals",
    "order": 7
  },
  {
    "track": "javascriptbrowser",
    "slug": "day-008-workers-and-service-workers",
    "title": "Workers & Service Workers",
    "order": 8
  },
  {
    "track": "javascriptbrowser",
    "slug": "day-009-websockets-and-realtime-browser-apps",
    "title": "WebSockets & Real-Time Browser Apps",
    "order": 9
  },
  {
    "track": "javascriptbrowser",
    "slug": "day-010-browser-interview-question-bank",
    "title": "Browser JavaScript Interview Question Bank",
    "order": 10
  },
  {
    "track": "javascriptinterviewrevision",
    "slug": "day-001-javascript-core-revision",
    "title": "JavaScript Core — Variables, Types, Scope & Coercion",
    "order": 1
  },
  {
    "track": "javascriptinterviewrevision",
    "slug": "day-002-functions-closures-this",
    "title": "Functions, Closures & this",
    "order": 2
  },
  {
    "track": "javascriptinterviewrevision",
    "slug": "day-003-objects-prototypes-classes",
    "title": "Objects, Prototypes & Classes",
    "order": 3
  },
  {
    "track": "javascriptinterviewrevision",
    "slug": "day-004-arrays-strings-map-set",
    "title": "Arrays, Strings, Map & Set",
    "order": 4
  },
  {
    "track": "javascriptinterviewrevision",
    "slug": "day-005-async-promises-event-loop",
    "title": "Promises, Async/Await & Event Loop",
    "order": 5
  },
  {
    "track": "javascriptinterviewrevision",
    "slug": "day-006-browser-dom-events",
    "title": "Browser, DOM & Events",
    "order": 6
  },
  {
    "track": "javascriptinterviewrevision",
    "slug": "day-007-storage-network-security",
    "title": "Storage, HTTP, CORS & Frontend Security",
    "order": 7
  },
  {
    "track": "javascriptinterviewrevision",
    "slug": "day-008-performance-web-apis",
    "title": "Performance, Web APIs & Memory",
    "order": 8
  },
  {
    "track": "javascriptinterviewrevision",
    "slug": "day-009-typescript-revision",
    "title": "TypeScript Interview Revision",
    "order": 9
  },
  {
    "track": "javascriptinterviewrevision",
    "slug": "day-010-machine-coding-revision",
    "title": "Machine Coding Revision",
    "order": 10
  },
  {
    "track": "javascriptinterviewrevision",
    "slug": "day-011-problem-solving-patterns",
    "title": "Problem-Solving Patterns",
    "order": 11
  },
  {
    "track": "javascriptinterviewrevision",
    "slug": "day-012-frontend-debugging-scenarios",
    "title": "Debugging & Real-World Scenarios",
    "order": 12
  },
  {
    "track": "javascriptinterviewrevision",
    "slug": "day-013-senior-javascript-revision",
    "title": "Senior JavaScript & Frontend Scenarios",
    "order": 13
  },
  {
    "track": "javascriptinterviewrevision",
    "slug": "day-014-frontend-system-design",
    "title": "Frontend System Design Revision",
    "order": 14
  },
  {
    "track": "javascriptinterviewrevision",
    "slug": "day-015-final-interview-pack",
    "title": "Final 1-Day / 7-Day / 30-Day Interview Pack",
    "order": 15
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-001-machine-coding-fundamentals",
    "title": "Machine Coding Fundamentals",
    "order": 1
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-002-todo-app",
    "title": "Todo Application",
    "order": 2
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-003-counter-timer",
    "title": "Counter & Timer",
    "order": 3
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-004-search-autocomplete",
    "title": "Search & Autocomplete",
    "order": 4
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-005-pagination-data-table",
    "title": "Pagination & Data Table",
    "order": 5
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-006-tabs-accordion",
    "title": "Tabs & Accordion",
    "order": 6
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-007-modal-dialog",
    "title": "Modal & Dialog",
    "order": 7
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-008-dropdown-select",
    "title": "Dropdown & Select",
    "order": 8
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-009-form-builder",
    "title": "Dynamic Form Builder",
    "order": 9
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-010-file-upload",
    "title": "File Upload",
    "order": 10
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-011-infinite-scroll",
    "title": "Infinite Scroll",
    "order": 11
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-012-kanban-board",
    "title": "Kanban Board",
    "order": 12
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-013-nested-comments",
    "title": "Nested Comments",
    "order": 13
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-014-file-explorer",
    "title": "File Explorer",
    "order": 14
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-015-shopping-cart",
    "title": "Shopping Cart",
    "order": 15
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-016-chat-ui",
    "title": "Chat UI",
    "order": 16
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-017-notification-system",
    "title": "Notification System",
    "order": 17
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-018-image-gallery",
    "title": "Image Gallery",
    "order": 18
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-019-dashboard-widgets",
    "title": "Dashboard Widgets",
    "order": 19
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-020-undo-redo-editor",
    "title": "Undo/Redo Editor",
    "order": 20
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-021-autocomplete-command-palette",
    "title": "Command Palette",
    "order": 21
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-022-virtualized-list",
    "title": "Virtualized List",
    "order": 22
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-023-realtime-dashboard",
    "title": "Realtime Dashboard",
    "order": 23
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-024-senior-machine-coding",
    "title": "Senior Machine Coding Challenges",
    "order": 24
  },
  {
    "track": "javascriptmachinecoding",
    "slug": "day-025-final-machine-coding-pack",
    "title": "Final Machine Coding Interview Pack",
    "order": 25
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-001-javascript-interview-problem-solving",
    "title": "JavaScript Interview Problem Solving",
    "order": 1
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-002-beginner-problem-solving",
    "title": "Beginner Problem Solving",
    "order": 2
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-003-strings-patterns",
    "title": "Strings & Pattern Problems",
    "order": 3
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-004-arrays-hashing",
    "title": "Arrays, Hashing & Frequency Patterns",
    "order": 4
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-005-two-pointers",
    "title": "Two Pointers & Partitioning",
    "order": 5
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-006-sliding-window",
    "title": "Sliding Window & Range Techniques",
    "order": 6
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-007-recursion-backtracking",
    "title": "Recursion & Backtracking",
    "order": 7
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-008-stack-queue",
    "title": "Stacks, Queues & Monotonic Structures",
    "order": 8
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-009-linked-list",
    "title": "Linked Lists",
    "order": 9
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-010-binary-search",
    "title": "Binary Search & Search-on-Answer",
    "order": 10
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-011-sorting-searching",
    "title": "Sorting & Searching Algorithms",
    "order": 11
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-012-trees-bst",
    "title": "Trees & Binary Search Trees",
    "order": 12
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-013-heap-priority-queue",
    "title": "Heaps & Priority Queues",
    "order": 13
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-014-graphs",
    "title": "Graphs, BFS, DFS & Connectivity",
    "order": 14
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-015-greedy",
    "title": "Greedy Algorithms",
    "order": 15
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-016-dynamic-programming",
    "title": "Dynamic Programming",
    "order": 16
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-017-advanced-data-structures",
    "title": "Advanced Data Structures",
    "order": 17
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-018-advanced-javascript",
    "title": "Advanced JavaScript Problem Solving",
    "order": 18
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-019-async-browser",
    "title": "Async, Browser & DOM Challenges",
    "order": 19
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-020-real-world-frontend",
    "title": "Real-World Frontend Problems",
    "order": 20
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-021-senior-javascript",
    "title": "Senior-Level JavaScript Challenges",
    "order": 21
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-022-frontend-system-design",
    "title": "Frontend System-Design-Style Problems",
    "order": 22
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-023-performance-optimization",
    "title": "Performance, Memory & Optimization",
    "order": 23
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-024-senior-10-year",
    "title": "7–10 Year Experience Interview Challenges",
    "order": 24
  },
  {
    "track": "javascriptproblemsolving",
    "slug": "day-025-final-interview-pack",
    "title": "Final Interview Challenge Pack",
    "order": 25
  },
  {
    "track": "javascriptrealinterview",
    "slug": "day-001-array-string-problems",
    "title": "Array & String — Detailed Solutions",
    "order": 1
  },
  {
    "track": "javascriptrealinterview",
    "slug": "day-002-output-and-language-questions",
    "title": "Output & Language — Detailed Solutions",
    "order": 2
  },
  {
    "track": "javascriptrealinterview",
    "slug": "day-003-polyfills-and-core-apis",
    "title": "Polyfills & Core APIs — Detailed Solutions",
    "order": 3
  },
  {
    "track": "javascriptrealinterview",
    "slug": "day-004-practical-dom-async",
    "title": "DOM & Async — Detailed Solutions",
    "order": 4
  },
  {
    "track": "javascriptrealinterview",
    "slug": "day-005-company-style-challenges",
    "title": "Company-Style Challenges — Detailed Solutions",
    "order": 5
  },
  {
    "track": "javascriptrealinterview",
    "slug": "day-006-100-plus-question-bank",
    "title": "100+ Question Bank — Detailed Solutions",
    "order": 6
  },
  {
    "track": "javascriptrealinterview",
    "slug": "day-007-coding-problem-bank-arrays-and-numbers",
    "title": "JavaScript Interview Coding: Arrays and Numbers",
    "order": 7
  },
  {
    "track": "javascriptrealinterview",
    "slug": "day-008-coding-problem-bank-strings-and-objects",
    "title": "JavaScript Interview Coding: Strings and Objects",
    "order": 8
  },
  {
    "track": "javascriptrealinterview",
    "slug": "day-009-big-mnc-google-meta-amazon-microsoft",
    "title": "Big MNC Frontend Interview Questions: Google, Meta, Amazon & Microsoft",
    "order": 9
  },
  {
    "track": "javascriptrealinterview",
    "slug": "day-010-big-mnc-apple-netflix-uber-linkedin",
    "title": "Big MNC Frontend Interview Questions: Apple, Netflix, Uber & LinkedIn",
    "order": 10
  },
  {
    "track": "javascriptrealinterview",
    "slug": "day-011-big-mnc-adobe-atlassian-paypal-stripe",
    "title": "Big MNC Interview Patterns: Adobe, Atlassian, PayPal & Stripe",
    "order": 11
  },
  {
    "track": "javascriptrealinterview",
    "slug": "day-012-big-mnc-canva-airbnb-shopify-pinterest",
    "title": "Big MNC Interview Patterns: Canva, Airbnb, Shopify & Pinterest",
    "order": 12
  },
  {
    "track": "javascriptrealinterview",
    "slug": "day-013-big-mnc-discord-coinbase-figma-lyft",
    "title": "Big MNC Interview Patterns: Discord, Coinbase, Figma & Lyft",
    "order": 13
  },
  {
    "track": "javascriptrealinterview",
    "slug": "day-014-big-mnc-openai-microsoft-bloomberg-walmart",
    "title": "Big MNC Interview Patterns: OpenAI, Microsoft, Bloomberg & Walmart",
    "order": 14
  },
  {
    "track": "javascriptrealinterview",
    "slug": "day-015-big-mnc-snap-snowflake-databricks-robinhood",
    "title": "Big MNC Interview Patterns: Snap, Snowflake, Databricks & Robinhood",
    "order": 15
  },
  {
    "track": "javascriptrealinterview",
    "slug": "day-016-big-mnc-dropbox-roblox-palantir-rippling",
    "title": "Big MNC Interview Patterns: Dropbox, Roblox, Palantir & Rippling",
    "order": 16
  },
  {
    "track": "javascriptrealinterview",
    "slug": "day-017-big-mnc-ramp-anthropic",
    "title": "Big MNC / AI Company Patterns: Ramp & Anthropic",
    "order": 17
  },
  {
    "track": "javascriptrealinterview",
    "slug": "day-018-big-mnc-tiktok-bytedance",
    "title": "Big MNC Interview Patterns: TikTok & ByteDance",
    "order": 18
  },
  {
    "track": "javascriptrealinterview",
    "slug": "day-019-complete-company-interview-roadmap",
    "title": "Complete JavaScriptRealInterview Company Roadmap",
    "order": 19
  },
  {
    "track": "typescript",
    "slug": "day-001-typescript-fundamentals",
    "title": "TypeScript Fundamentals",
    "order": 1
  },
  {
    "track": "typescript",
    "slug": "day-002-types-and-type-system",
    "title": "Types & Type System",
    "order": 2
  },
  {
    "track": "typescript",
    "slug": "day-003-interfaces",
    "title": "Interfaces",
    "order": 3
  },
  {
    "track": "typescript",
    "slug": "day-004-functions",
    "title": "Functions in TypeScript",
    "order": 4
  },
  {
    "track": "typescript",
    "slug": "day-005-classes-and-oop",
    "title": "Classes & OOP",
    "order": 5
  },
  {
    "track": "typescript",
    "slug": "day-006-generics",
    "title": "Generics",
    "order": 6
  },
  {
    "track": "typescript",
    "slug": "day-007-utility-types",
    "title": "Utility Types",
    "order": 7
  },
  {
    "track": "typescript",
    "slug": "day-008-type-guards",
    "title": "Type Guards & Narrowing",
    "order": 8
  },
  {
    "track": "typescript",
    "slug": "day-009-keyof-and-indexed-access",
    "title": "keyof & Indexed Access Types",
    "order": 9
  },
  {
    "track": "typescript",
    "slug": "day-010-typeof-and-const-assertions",
    "title": "typeof, as const & satisfies",
    "order": 10
  },
  {
    "track": "typescript",
    "slug": "day-011-advanced-types",
    "title": "Advanced Type Composition",
    "order": 11
  },
  {
    "track": "typescript",
    "slug": "day-012-conditional-types",
    "title": "Conditional Types",
    "order": 12
  },
  {
    "track": "typescript",
    "slug": "day-013-mapped-types",
    "title": "Mapped Types",
    "order": 13
  },
  {
    "track": "typescript",
    "slug": "day-014-infer",
    "title": "infer & Type Extraction",
    "order": 14
  },
  {
    "track": "typescript",
    "slug": "day-015-template-literal-types",
    "title": "Template Literal Types",
    "order": 15
  },
  {
    "track": "typescript",
    "slug": "day-016-modules",
    "title": "TypeScript Modules",
    "order": 16
  },
  {
    "track": "typescript",
    "slug": "day-017-declaration-files",
    "title": "Declaration Files & Third-Party Types",
    "order": 17
  },
  {
    "track": "typescript",
    "slug": "day-018-decorators",
    "title": "Decorators",
    "order": 18
  },
  {
    "track": "typescript",
    "slug": "day-019-typescript-and-javascript",
    "title": "TypeScript + JavaScript Interop",
    "order": 19
  },
  {
    "track": "typescript",
    "slug": "day-020-tsconfig",
    "title": "TSConfig & Compiler",
    "order": 20
  },
  {
    "track": "typescript",
    "slug": "day-021-advanced-interview-problems",
    "title": "Advanced TypeScript Interview Problems",
    "order": 21
  },
  {
    "track": "typescript",
    "slug": "day-022-angular-typescript",
    "title": "TypeScript for Angular",
    "order": 22
  },
  {
    "track": "typescript",
    "slug": "day-023-typescript-api-design",
    "title": "Type-Safe API & State Design",
    "order": 23
  },
  {
    "track": "typescript",
    "slug": "day-024-typescript-performance-and-maintainability",
    "title": "TypeScript Performance & Maintainability",
    "order": 24
  },
  {
    "track": "typescript",
    "slug": "day-025-typescript-final-interview-pack",
    "title": "Final TypeScript Interview Pack",
    "order": 25
  }
];

export function getCodingLessonsByTrack(track: CodingTrackKey) {
  return codingLessons
    .filter((lesson) => lesson.track === track)
    .sort((a, b) => a.order - b.order);
}

export function getCodingLessonBySlug(track: CodingTrackKey, slug: string) {
  return codingLessons.find((lesson) => lesson.track === track && lesson.slug === slug);
}

export function getAvailableCodingTracks(): CodingTrackKey[] {
  return Array.from(new Set(codingLessons.map((lesson) => lesson.track)));
}
