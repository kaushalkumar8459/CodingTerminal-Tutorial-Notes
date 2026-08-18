---
title: React Props Deep Dive
slug: day-006-props-deep-dive
dayLabel: Day 6
level: Beginner to Advanced
estimatedMinutes: 120
order: 6
track: react
---
# Day 6: Props Deep Dive — Basic to Advanced

## Goal
Master React props deeply enough to design reusable components, pass every common data type, communicate from child to parent with callbacks, compose UI with `children`, use spread/rest correctly, pass components as props, and recognize prop-design problems.

## Prerequisites
- Day 4 Components
- Day 5 Reusable Components
- JavaScript objects, arrays, functions, destructuring, rest/spread

## 1. What Are Props?
Props are inputs supplied to a component by its parent. Treat received props as read-only.

```jsx
function User({ name }) {
  return <h2>Hello {name}</h2>;
}

function App() {
  return <User name="Asha" />;
}
```

Mental model:

```text
Parent state/data
      ↓ props
Child render
```

Props are not a second state mechanism. They describe what the parent wants the child to render or how the child should behave.

## 2. Passing Different Data Types
### String
```jsx
<User name="Asha" />
```
### Number
```jsx
<User age={25} />
```
### Boolean
```jsx
<User active={true} />
<User active />
```
### Array
```jsx
<User skills={["React", "Angular"]} />
```
### Object
```jsx
<User profile={{ name: "Asha", role: "Developer" }} />
```
### Function
```jsx
<User onSelect={handleSelect} />
```
Curly braces mean “evaluate this JavaScript expression”; they are not specifically a number syntax.

## 3. Destructuring Props
Both forms are valid:

```jsx
function User(props) {
  return <h2>{props.name}</h2>;
}
```

```jsx
function User({ name }) {
  return <h2>{name}</h2>;
}
```

Destructuring is a readability choice. It is not a special React feature.

## 4. Default Prop Values
Use JavaScript destructuring defaults:

```jsx
function Badge({ label = "General" }) {
  return <span>{label}</span>;
}
```

The default applies when `label` is `undefined`.

For required props, the best “documentation” is often the component's type/interface contract in TypeScript and clear component documentation.

## 5. Nested Objects and Arrays

```jsx
function EmployeeCard({ employee }) {
  return (
    <article>
      <h3>{employee.name}</h3>
      <p>{employee.job.title}</p>
      <ul>
        {employee.skills.map((skill) => <li key={skill}>{skill}</li>)}
      </ul>
    </article>
  );
}
```

Prefer a stable, understandable data contract. Do not make every component depend on a huge domain object if it only needs two fields.

You can pass the whole object:

```jsx
<EmployeeCard employee={employee} />
```

or pass only what the component needs:

```jsx
<EmployeeCard name={employee.name} role={employee.job.title} />
```

Choose based on coupling and reuse.

## 6. Callback Props: Child to Parent Communication
React's data flow remains downward even when a child triggers a parent update.

```jsx
function Child({ onSelect }) {
  return (
    <button onClick={() => onSelect("React")}>
      Select React
    </button>
  );
}

function Parent() {
  function handleSelect(value) {
    console.log("Selected:", value);
  }

  return <Child onSelect={handleSelect} />;
}
```

The child does **not** directly change parent state. It invokes a function supplied by the parent.

## 7. Callback With Parameters

```jsx
function ProductCard({ product, onAddToCart }) {
  return (
    <button onClick={() => onAddToCart(product.id)}>
      Add {product.name}
    </button>
  );
}
```

The parent decides what `onAddToCart` does. The child only reports the event and relevant data.

## 8. `children`
`children` contains the nested React content supplied between opening and closing component tags.

```jsx
function Card({ children }) {
  return <section className="card">{children}</section>;
}

<Card>
  <h2>Profile</h2>
  <p>React Developer</p>
</Card>
```

`children` can contain text, elements, arrays of elements, or other renderable React content. It can also be empty. Treat it as a composition mechanism, not simply “a string inside a component.”

## 9. Passing Components as Props
A component itself can be passed as a prop.

```jsx
function Header() {
  return <header>Dashboard</header>;
}

function Page({ HeaderComponent }) {
  return (
    <>
      <HeaderComponent />
      <main>Content</main>
    </>
  );
}

function App() {
  return <Page HeaderComponent={Header} />;
}
```

This is useful for layouts, dashboards, dynamic shells, and pluggable UI. Be precise about the contract: `HeaderComponent` is a component value that React will render.

You can also pass an already-created element:

```jsx
function Page({ header }) {
  return <main>{header}</main>;
}

<Page header={<Header />} />
```

These are related but not identical: one receives a component type/value, the other receives an element.

## 10. Spread Props
Spread can forward a group of properties:

```jsx
const user = { name: "John", age: 20 };

<User {...user} />
```

Equivalent conceptually to:

```jsx
<User name={user.name} age={user.age} />
```

Spread is useful when forwarding a known set of compatible props, but blindly spreading large objects can make a component API unclear.

## 11. Rest Props
Rest syntax collects remaining properties during destructuring:

```jsx
function User({ name, ...rest }) {
  console.log(rest);
  return <p>{name}</p>;
}
```

For:

```jsx
<User name="John" age={20} city="Delhi" />
```

`rest` contains:

```js
{ age: 20, city: "Delhi" }
```

Rest is especially useful for wrapper components and controlled forwarding, but forwarding arbitrary props to DOM elements can accidentally pass invalid or unintended attributes.

## 12. Prop Forwarding
A common wrapper pattern:

```jsx
function TextInput({ label, ...inputProps }) {
  return (
    <label>
      {label}
      <input {...inputProps} />
    </label>
  );
}
```

Usage:

```jsx
<TextInput
  label="Email"
  type="email"
  placeholder="you@example.com"
  name="email"
/>
```

This creates a useful API while forwarding standard input attributes.

## 13. Props Are Read-Only
Do not mutate received props:

```jsx
function User(props) {
  // props.name = "Changed"; // Do not do this
  return <p>{props.name}</p>;
}
```

If data needs to change, the owner of that data should update it and pass the new value down, or the child should invoke an appropriate callback.

## 14. Props vs State

| Props | State |
|---|---|
| Input from outside component | Data managed by component/state owner |
| Read-only from receiver's perspective | Updated through state API |
| Controlled by parent/owner | Owned by state holder |
| Used to configure a component | Used for changing UI data |

A component can receive props and also own state. They are complementary concepts.

## 15. Avoiding Prop Drilling
Prop drilling means passing data through intermediate components that do not themselves need it:

```text
App → Layout → Sidebar → UserMenu
```

If only `UserMenu` needs `user`, repeatedly forwarding `user` may become noisy. Solutions depend on the application: composition, context, state-management libraries, or restructuring the component tree. Do not introduce Context merely because two components need a value.

## 16. Props and Immutability
Props can contain objects/arrays. The child should not mutate them:

```jsx
function User({ user }) {
  // user.name = "Changed"; // avoid
  return <p>{user.name}</p>;
}
```

If a child needs an updated object, it should request the change through a callback and let the owner create the new value.

## 17. Real-World API Design
### Bad
```jsx
<ProductCard
  showImage
  showPrice
  showRating
  showDescription
  showButton
  showWishlist
  compact={false}
  bordered
  rounded
  large
/>
```

### Better
```jsx
<ProductCard
  product={product}
  actions={<ProductActions productId={product.id} />}
/>
```

The better design can use composition when the consumer needs meaningful control over a section.

## 18. Type-Safe Props with TypeScript
In TypeScript projects:

```tsx
type UserCardProps = {
  name: string;
  role: string;
  active?: boolean;
};

function UserCard({ name, role, active = true }: UserCardProps) {
  return <article>{name} — {role} — {active ? "Active" : "Inactive"}</article>;
}
```

TypeScript helps document required/optional inputs and catches many incorrect usages before runtime.

## 19. End-to-End Props Lab
Build a dashboard with:

```text
App
├── Dashboard
│   ├── HeaderComponent (component prop)
│   ├── UserCard (object props)
│   ├── ActionButton (callback prop)
│   └── Panel (children)
└── Footer
```

Acceptance criteria:
- [ ] At least four prop types are demonstrated.
- [ ] Object prop is treated immutably.
- [ ] Child invokes a callback.
- [ ] `children` is used for composition.
- [ ] A component is passed as a prop.
- [ ] Spread/rest is used intentionally.
- [ ] TypeScript prop types are defined if using `.tsx`.

## Hands-on Challenges
### Challenge 1 — Product Card
`product`, `onAddToCart`, optional `discount`.

### Challenge 2 — Search Input Wrapper
Use rest props to forward native input attributes while keeping `label` separate.

### Challenge 3 — Dynamic Layout
Pass `HeaderComponent` and `FooterComponent` into a `PageLayout`.

### Challenge 4 — Composition
Build `Modal` using `children`, then place different forms inside it.

### Challenge 5 — Refactor Prop Drilling
Given `App → Layout → Sidebar → UserMenu`, identify where composition or Context would reduce unnecessary forwarding.

## Common Mistakes
- Passing numbers as quoted strings when a number is required.
- Mutating props.
- Passing a callback incorrectly: `onClick={handleClick()}` when you intend to pass the function.
- Confusing a component prop with a rendered element prop.
- Blindly spreading large objects into DOM elements.
- Adding props for every possible layout instead of using composition.
- Using Context as the first solution to every prop-drilling problem.

## Assessment Quiz
1. What are props?
2. Are props read-only?
3. How do you pass an object?
4. What is destructuring?
5. What is a callback prop?
6. What is `children`?
7. Difference between `<Page header={<Header />} />` and `<Page HeaderComponent={Header} />`?
8. What does spread do?
9. What does rest do?
10. Why can excessive prop drilling be a design problem?
11. Why should a child not mutate an object received through props?
12. When is composition better than adding another prop?

## Interview Questions and Answers
**1. Props vs state?** Props are external read-only inputs; state is data managed by a state owner and updated through its state API.

**2. Can props be objects?** Yes. Objects, arrays, functions, elements, and component values can all be passed as props.

**3. How does child-to-parent communication work?** The parent passes a callback; the child invokes it with the event/value it wants to report.

**4. What is `children`?** The special prop containing nested content supplied between a component's opening and closing tags.

**5. Spread vs rest?** Spread expands values into a new context; rest collects remaining values during destructuring.

**6. Component vs element prop?** A component prop receives a component value/type that can be rendered; an element prop receives an already-created React element.

**7. What is prop drilling?** Passing data through intermediate components solely so a deeper component can receive it.

**8. How do you reduce prop drilling?** Consider composition, Context, restructuring, or an appropriate state-management solution based on actual application needs.

**9. Why avoid prop mutation?** It breaks the ownership model and can create unpredictable state/data flow.

**10. How do you design good props?** Start from real use cases, keep the API small and semantic, use composition for flexible nested UI, type the contract, and avoid speculative options.

## Final Practical Project
Build a **Product Management Dashboard** with:
- `ProductCard` receiving an object prop
- `ProductCard` callback for Add to Cart
- `SearchInput` forwarding native props with rest
- `Modal` using `children`
- `PageLayout` accepting header/footer components
- TypeScript prop definitions
- At least one optional/default prop

## Day 6 Outcome
You can now design and consume React component APIs from basic primitives through advanced composition. This is the required depth for Props in the course. Day 7 applies these patterns in an integrated product project.