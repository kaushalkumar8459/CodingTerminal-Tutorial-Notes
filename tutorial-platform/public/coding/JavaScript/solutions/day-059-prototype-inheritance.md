# Day 059 — Solution: Prototype Inheritance

```js
function Animal(name) { this.name = name; }
Animal.prototype.speak = function () { console.log(`${this.name} makes a sound`); };

function Dog(name, breed) { Animal.call(this, name); this.breed = breed; }
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.speak = function () { console.log(`${this.name} barks`); };

function Cat(name) { Animal.call(this, name); }
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;
Cat.prototype.speak = function () { console.log(`${this.name} meows`); };

const dog = new Dog("Rex", "Beagle");
const cat = new Cat("Luna");
dog.speak();
cat.speak();
console.log(dog instanceof Dog, dog instanceof Animal); // true true
```

**6–7. Vehicle inheritance**

```js
function Vehicle(brand) { this.brand = brand; }
Vehicle.prototype.start = function () { return `${this.brand} starts`; };
function Car(brand, doors) { Vehicle.call(this, brand); this.doors = doors; }
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;
function Bike(brand, hasCarrier) { Vehicle.call(this, brand); this.hasCarrier = hasCarrier; }
Bike.prototype = Object.create(Vehicle.prototype);
Bike.prototype.constructor = Bike;
```

**8.** `dog` is an instance of both because its prototype is linked to `Animal.prototype` through `Dog.prototype`.

**9.** A Dog cannot use a Cat-only method; its chain goes through Dog, Animal, and Object, not Cat.

## Interview-style questions

**10.** `Animal.call(this, name)` initializes the inherited `name` property on the new Dog instance.

**11.** `Object.create` gives Dog a separate prototype object linked to Animal. Assigning `Dog.prototype = Animal.prototype` would make changes intended for Dog affect Animal too.

**12.** Property lookup finds Dog's own `speak` first, so it shadows the same-named method farther up the chain.
