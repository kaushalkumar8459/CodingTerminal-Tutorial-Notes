---
title: Props Deep Dive
slug: day-006-props-deep-dive
dayLabel: Day 6
level: Beginner
estimatedMinutes: 30
order: 6
track: react
---
# Day 6 [Beginner to Intermediate]: Props Deep Dive

## Index

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Explanation](#explanation)
- [Topic by Topic](#topic-by-topic)
- [Key Concepts](#key-concepts)
- [Visual Concept Map](#visual-concept-map)
- [End-to-End Practical](#end-to-end-practical)
- [Hands-on Coding](#hands-on-coding)
- [Mini Exercise](#mini-exercise)
- [Assessment Quiz](#assessment-quiz)
- [Task](#task)
- [Self Check](#self-check)
- [Interview Questions and Answers](#interview-questions-and-answers)
- [Day 6 Outcome](#day-6-outcome)

## Goal

Master parent-to-child data flow using props and build dynamic UI from external inputs.

## Prerequisites

- Day 5 completed
- Reusable components created

## Explanation

Props are how components receive data in React. They support one-way data flow, which keeps apps predictable.

## Topic by Topic

### Topic 1: Props Fundamentals

Theory:
Props are read-only inputs passed to components.

Practical:
Pass text prop from App to child.

Code Example:

```jsx
function Welcome({ name }) {
  return <h2>Welcome {name}</h2>;
}
```

**Explanation:** Props are inputs that flow from parent to child (one-way). The child component can **read** props but cannot change them - they're read-only. Here `Welcome` displays whatever name is passed in.

**Key Points:**

- Props flow one-way: parent → child
- Props are read-only in the child
- Child receives but cannot modify props
- Parent owns and controls prop values

### Topic 2: Multiple Props

Theory:
Component can accept many props for richer UI.

Practical:
Pass title, price, description.

Code Example:

```jsx
// Usage: <ProductCard title="Keyboard" price={1200} description="Mechanical" />
// (Note: price is passed as a number, not a string)
```

**Explanation:** Components can accept multiple props. Props can be strings, numbers, booleans, objects, or even functions. When passing numbers, use curly braces `{1200}` instead of quotes. This makes the component flexible for different use cases.

**Key Points:**

- Components can accept many props together.
- Props can have different data types.
- Use curly braces for numbers and expressions.

### Topic 3: Destructuring Props

Theory:
Destructuring improves readability.

Practical:
Use function parameter destructuring.

Code Example:

```jsx
function ProductCard({ title, price }) {
  return (
    <p>
      {title} - ${price}
    </p>
  );
}
```

**Explanation:** **Destructuring** extracts props in the function signature. Instead of accessing `props.title`, we directly use `title`. This improves readability, especially with many props.

**Key Points:**

- Destructuring: extract props in function parameters
- Cleaner than accessing `props.title` repeatedly
- Makes component logic easier to read
- Can destructure any number of props

### Topic 4: Default Values

Theory:
Default values prevent empty UI when props are missing.

Practical:
Add default value for optional prop.

Code Example:

```jsx
function Tag({ label = "General" }) {
  return <span>{label}</span>;
}
```

**Explanation:** Default values protect against missing props. If a prop is optional and the parent doesn't provide it, the component uses the default instead of showing `undefined`. This makes components more resilient.

**Key Points:**

- Default values prevent undefined errors
- Use `prop = "default"` syntax in destructuring
- Protects against missing optional props
- Makes components work without all props

### Topic 5: One-way Data Flow

Theory:
Data travels from parent to child, improving debugging.

Practical:
Trace values from App into nested components.

Code Example:

```jsx
function App() {
  return <Profile name="Karan" role="Developer" />;
}
```

**Explanation:** **One-way data flow** means data travels from parent → child via props. This unidirectional flow makes apps predictable and easier to debug. If you need to change data in the child, you pass a callback function through props (Day 6-8).

**Key Points:**

- Data flows one-way: parent to child
- Child cannot change parent's data
- Predictable data flow = easier debugging
- Callbacks enable child → parent communication

### Topic 6: Props as Objects, Functions, and UI Composition

Theory:
Props are not limited to text and numbers. They can also carry objects, callback functions, and even UI fragments.

Practical:
Pass a product object and one callback prop to a child component.

Code Example:

```jsx
function ProductCard({ product, onSelect }) {
  return <button onClick={() => onSelect(product.id)}>{product.title}</button>;
}
```

**Explanation:** Props aren't limited to data. You can pass callback functions to let children notify parents about actions. Here `onSelect` is a function the parent provides, and the child calls it with data.

**Key Points:**

- Props can carry objects and functions, not just primitives
- Callback functions let children notify parents
- Parent controls the response to child actions
- Maintains unidirectional data flow

### Topic 7: props.children and layout composition

Theory:
Sometimes a component should wrap other UI instead of receiving every piece as a named prop. React provides `props.children` for this composition pattern.

Practical:
Create a wrapper card that can render any nested content inside it.

Code Example:

```jsx
function Card({ children }) {
  return <section className="card">{children}</section>;
}

function App() {
  return (
    <Card>
      <h3>Team Update</h3>
      <p>Quarterly goals are on track.</p>
    </Card>
  );
}
```

**Explanation:** `children` is a special prop that contains whatever is written between a component's opening and closing tags. This is a core React composition pattern for layouts, modals, wrappers, and reusable UI shells.

**Key Points:**

- `children` holds nested UI passed inside a component
- Useful for wrappers, cards, modals, and layouts
- Reduces the need for too many rigid named props

## Key Concepts

- One-way data flow
- Prop immutability
- Destructuring
- Optional/default props
- props.children composition
- Dynamic rendering
- Props can carry callbacks and objects
- Parent-controlled interaction flow

## Visual Concept Map

```mermaid
flowchart LR
    A[Parent Component] -->|props| B[Child Component]
    B --> C[Rendered UI]
```

## End-to-End Practical

1. Build ProductCard component.
2. Pass three props from parent.
3. Render three product cards.
4. Add one optional prop with default.

## Hands-on Coding

### Example 1: Case - Product Listing Card

Scenario:
An ecommerce page needs to show different product details in the same card component.

```jsx
function ProductCard({ title, price, description }) {
  return (
    <div
      style={{ border: "1px solid #ddd", padding: "12px", marginTop: "10px" }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <strong>${price}</strong>
    </div>
  );
}
```

### Example 2: Case - Status Badge With Default Label

Scenario:
A dashboard badge should show a default label when the parent does not send one.

```jsx
function StatusBadge({ text = "Active" }) {
  return <span>{text}</span>;
}
```

## Mini Exercise

Scenario:
You are building an employee directory page where every card receives external data.

Create EmployeeCard component with props: name, designation, department, and location (optional). Render at least 4 cards.

Expected output:

- Same EmployeeCard reused for all entries
- Different prop values shown per card
- Optional location handled gracefully when missing

## Assessment Quiz

### Quiz Questions

1. Can child component change received props?
2. Why is one-way data flow useful?
3. What is destructuring in props?
4. True or False: Props can be numbers, objects, and functions.
5. How do defaults help?
6. Why pass callback props from parent to child?

### Quiz Answers

1. No
2. It keeps data flow predictable
3. Extracting values from props object
4. True
5. Prevents undefined UI values
6. So children can notify the parent about user actions without owning the data flow.

## Task

- Build one prop-driven card component
- Pass at least 4 props
- Add one optional/default prop
- Complete mini exercise

## Self Check

- You can pass and use props confidently
- You understand one-way data flow
- You can answer at least 4 out of 5 quiz questions correctly

## Interview Questions and Answers

### Beginner

**Question:** What are props?

**Answer:** Inputs passed from parent to child components.

**Question:** Are props mutable?

**Answer:** No, props are read-only.

### Middle

**Question:** Why use props instead of hardcoding values?

**Answer:** Props make components reusable and dynamic.

**Question:** What is prop destructuring?

**Answer:** Extracting specific properties directly in function parameters.

### Advanced

**Question:** How do props and state differ conceptually?

**Answer:** Props are external read-only inputs, state is internal mutable component data.

**Question:** Why does one-way flow simplify large apps?

**Answer:** It reduces side effects and makes data origins explicit.

## Day 6 Outcome

- You can build dynamic, prop-driven UI components
- You can apply defaults and destructuring
- You are ready for the integrated mini project in Day 7
