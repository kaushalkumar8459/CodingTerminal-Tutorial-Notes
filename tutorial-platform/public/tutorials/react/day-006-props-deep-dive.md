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
Master React props deeply enough to design reusable component APIs, pass common data types, communicate from child to parent with callbacks, compose UI with `children`, use spread/rest correctly, pass components as props, and recognize prop-design problems.

## Prerequisites
- Day 4 Components
- Day 5 Reusable Components
- JavaScript objects, arrays, functions, destructuring, rest/spread

## 1. What Are Props?

Props are inputs supplied to a component by its parent. A component should treat received props as read-only and should not mutate them.

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

The important ownership rule is:

```text
Owner of data → passes value → child receives value
Child needs a change → calls callback → owner updates value
```

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

### React element

```jsx
<User avatar={<Avatar />} />
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

Destructuring is a JavaScript readability feature. It is not a special React feature.

## 4. Default Prop Values

Use JavaScript destructuring defaults:

```jsx
function Badge({ label = "General" }) {
  return <span>{label}</span>;
}
```

The default applies when `label` is `undefined`. It does not replace an explicitly supplied `null` value.

For required props, the best documentation is the component's clear API contract. In TypeScript projects, a type/interface can make required and optional inputs explicit and catch many incorrect usages before runtime.

## 5. Nested Objects and Arrays

```jsx
function EmployeeCard({ employee }) {
  return (
    <article>
      <h3>{employee.name}</h3>
      <p>{employee.job.title}</p>
      <ul>
        {employee.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
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

Choose based on coupling, reuse, and how likely the component's data contract is to change.

For list rendering, choose a `key` that is stable and unique among the sibling items. Do not use a value such as `skill` as a key if duplicates are possible; a real stable identifier is preferable.

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

When the callback is used as an event handler and needs no custom argument, pass the function directly:

```jsx
<button onClick={handleSelect}>Select</button>
```

When the child needs to provide its own argument, wrap the call:

```jsx
<button onClick={() => onSelect("React")}>Select React</button>
```

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

Avoid calling the callback while rendering:

```jsx
// Incorrect for an event callback:
<ProductCard onAddToCart={handleAddToCart(product.id)} />
```

The expression above invokes the function during render instead of passing a function for a later event. Use an event wrapper when an argument is required.

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

Composition often gives a component a clearer API than adding many boolean or content-specific props.

## 9. Passing Components as Props

A component value can be passed as a prop.

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

These are related but not identical: one receives a component value/type that can be rendered by the receiving component, while the other receives an already-created React element.

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

When combining explicit props with spread, remember that later values win:

```jsx
<User {...user} name="Override" />
```

Here the explicit `name` value is `"Override"`.

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

Keep wrapper-specific props separate from DOM props. Do not blindly forward application-only props such as `variant`, `isLoading`, or `layoutMode` to a native element unless they are intentionally supported.

## 13. Props Are Read-Only

Do not mutate received props:

```jsx
function User(props) {
  // props.name = "Changed"; // Do not do this
  return <p>{props.name}</p>;
}
```

If data needs to change, the owner of that data should update it and pass the new value down, or the child should invoke an appropriate callback.

For object and array props, “read-only” also means the child should not mutate nested values:

```jsx
function User({ user }) {
  // user.name = "Changed"; // Do not mutate the received object
  return <p>{user.name}</p>;
}
```

A prop being an object does not make that object automatically immutable; immutability is a programming discipline the application must maintain.

## 14. Props vs State

| Props | State |
|---|---|
| Input from outside component | Data managed by component/state owner |
| Read-only from receiver's perspective | Updated through state API |
| Controlled by parent/owner | Owned by state holder |
| Used to configure a component | Used for changing UI data |

A component can receive props and also own state. They are complementary concepts.

A useful rule is: **props describe inputs; state represents changing data owned by a state holder.**

## 15. Avoiding Prop Drilling

Prop drilling means passing data through intermediate components that do not themselves need it:

```text
App → Layout → Sidebar → UserMenu
```

If only `UserMenu` needs `user`, repeatedly forwarding `user` may become noisy. Solutions depend on the application: composition, context, state-management libraries, or restructuring the component tree. Do not introduce Context merely because two components need a value.

First ask whether the component hierarchy can be redesigned so the data is passed only where it is actually needed.

## 16. Props and Immutability

Props can contain objects/arrays. The child should not mutate them:

```jsx
function User({ user }) {
  // user.name = "Changed"; // avoid
  return <p>{user.name}</p>;
}
```

If a child needs an updated object, it should request the change through a callback and let the owner create the new value.

For example:

```jsx
function UserEditor({ user, onChange }) {
  return (
    <button onClick={() => onChange({ ...user, name: "Asha" })}>
      Rename
    </button>
  );
}
```

The child creates a new object instead of mutating the object it received.

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

The better design can use composition when the consumer needs meaningful control over a section. Do not treat composition as automatically better; choose the smallest clear API that fits the real use case.

## 18. Type-Safe Props with TypeScript

In TypeScript projects:

```tsx
type UserCardProps = {
  name: string;
  role: string;
  active?: boolean;
};

function UserCard({ name, role, active = true }: UserCardProps) {
  return (
    <article>
      {name} — {role} — {active ? "Active" : "Inactive"}
    </article>
  );
}
```

TypeScript helps document required/optional inputs and catches many incorrect usages before runtime. It does not replace runtime validation when values can come from untrusted external sources such as an API.

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
- [ ] Native DOM props are not polluted with application-only props.

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

### Challenge 6 — Prop Contract Review

Take a component with more than eight configuration props. Identify which props represent real behavior, which can be replaced by composition, and which are unnecessary API surface.

## Common Mistakes

- Passing numbers as quoted strings when a number is required.
- Mutating props or nested objects/arrays received through props.
- Passing a callback incorrectly: `onClick={handleClick()}` when you intend to pass the function.
- Confusing a component prop with a rendered element prop.
- Blindly spreading large objects into DOM elements.
- Forgetting that later spread/explicit attributes can override earlier values.
- Adding props for every possible layout instead of using composition where appropriate.
- Using Context as the first solution to every prop-drilling problem.
- Designing a component around a huge domain object when it only needs a small stable contract.
- Assuming TypeScript prevents invalid runtime data from APIs or other external sources.

## Assessment Quiz

1. What are props?
2. Are props read-only?
3. How do you pass an object?
4. What is destructuring?
5. What is a callback prop?
6. What is `children`?
7. What is the difference between `<Page header={<Header />} />` and `<Page HeaderComponent={Header} />`?
8. What does spread do?
9. What does rest do?
10. Why can excessive prop drilling be a design problem?
11. Why should a child not mutate an object received through props?
12. When is composition better than adding another prop?
13. If `<User {...user} name="Asha" />` is rendered and `user.name` is `"John"`, which name reaches `User`?
14. Why should wrapper components filter application-specific props before forwarding to native DOM elements?

### Answers

1. Props are read-only inputs supplied to a component by its parent/owner.
2. Yes, the receiving component should not mutate its props.
3. Use an expression containing an object, for example `<User profile={profile} />`.
4. Destructuring is a JavaScript syntax feature for extracting values from objects/arrays.
5. A callback prop is a function supplied by a parent that a child can invoke to report an event or request an action.
6. `children` is the prop containing nested content supplied between component tags.
7. The first passes an already-created React element; the second passes a component value/type that the receiving component can render.
8. Spread expands properties/elements into another syntactic context, such as passing object properties as JSX props.
9. Rest collects remaining properties during destructuring.
10. It can make intermediate components carry data they do not need and make APIs harder to maintain.
11. Mutation violates the ownership/data-flow contract and can produce unpredictable behavior.
12. When consumers need flexible nested UI or a slot-like API rather than a growing list of specialized configuration props.
13. `"Asha"`, because the later explicit prop overrides the value from the spread.
14. To avoid passing unintended application-only props to DOM elements and to keep the wrapper's public API separate from the native element API.

## Interview Questions and Answers

**1. Props vs state?** Props are external read-only inputs; state is data managed by a state owner and updated through its state API.

**2. Can props be objects?** Yes. Objects, arrays, functions, elements, and component values can all be passed as props.

**3. How does child-to-parent communication work?** The parent passes a callback; the child invokes it with the event/value it wants to report.

**4. What is `children`?** The special prop containing nested content supplied between a component's opening and closing tags.

**5. Spread vs rest?** Spread expands values into a new syntactic context; rest collects remaining values during destructuring.

**6. Component vs element prop?** A component prop receives a component value/type that can be rendered; an element prop receives an already-created React element.

**7. What is prop drilling?** Passing data through intermediate components solely so a deeper component can receive it.

**8. How do you reduce prop drilling?** Consider composition, Context, restructuring, or an appropriate state-management solution based on actual application needs.

**9. Why avoid prop mutation?** It breaks the ownership model and can create unpredictable state/data flow.

**10. How do you design good props?** Start from real use cases, keep the API small and semantic, use composition for flexible nested UI, type the contract, and avoid speculative options.

**11. What happens when the same prop is provided by spread and explicitly?** The later value wins. For example, `<User {...user} name="Asha" />` gives the component `name="Asha"`.

**12. Why can blindly forwarding rest props be dangerous?** It can expose internal application props to native DOM elements, create warnings/invalid markup, or make the wrapper's behavior difficult to understand.

## Final Practical Project

Build a **Product Management Dashboard** with:
- `ProductCard` receiving an object prop
- `ProductCard` callback for Add to Cart
- `SearchInput` forwarding native props with rest
- `Modal` using `children`
- `PageLayout` accepting header/footer components
- TypeScript prop definitions
- At least one optional/default prop
- A clear separation between feature-specific props and native DOM props

## Day 6 Outcome

You can now design and consume React component APIs from basic primitives through advanced composition. You understand:

- Primitive and reference values as props
- Destructuring and default values
- Callback props and event arguments
- `children` and composition
- Component props vs element props
- Spread and rest
- Controlled prop forwarding
- Read-only props and immutable data handling
- Props vs state
- Prop drilling and possible alternatives
- Type-safe prop contracts
- Practical component API design

This is the required depth for Props in the course. Day 7 applies these patterns in an integrated product project.
