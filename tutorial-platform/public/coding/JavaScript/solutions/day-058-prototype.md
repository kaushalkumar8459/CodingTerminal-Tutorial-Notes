# Day 058 — Solution: Prototype

## Basic

```js
function Animal(name) { this.name = name; }
Animal.prototype.speak = function () { console.log(`${this.name} makes a sound`); };
const first = new Animal("Leo");
const second = new Animal("Milo");
first.speak();
second.speak();
console.log(Object.getPrototypeOf(first) === Animal.prototype); // true

Animal.prototype.describe = function () { return `Animal: ${this.name}`; };
console.log(first.describe()); // existing instances see new prototype methods
console.log(first.__proto__ === Animal.prototype); // true
```

**6. Object.create**

```js
const proto = { greet() { return "hello"; } };
const directObject = Object.create(proto);
console.log(directObject.greet());
```

**7. Manual chain**

```js
const baseObject = { greet() { return `Hello, ${this.name}`; } };
const childObject = Object.create(baseObject);
childObject.name = "Asha";
console.log(childObject.greet());
```

**8. Shadowing**

```js
first.speak = () => console.log("instance sound");
first.speak(); // own property wins over the prototype method
```

**9.** A prototype holds one shared method function for many instances. Assigning `this.speak = function(){}` creates a separate function object inside every instance, using more memory.

## Interview-style questions

**10.** The prototype chain is the sequence JavaScript searches when a property is not found directly on an object.

**11.** `this.property` creates an own property per instance; `Constructor.prototype.method` creates one shared property found through the chain.

**12.** `Object.create(proto)` creates a new object whose internal prototype link points to `proto`, without calling a constructor.
