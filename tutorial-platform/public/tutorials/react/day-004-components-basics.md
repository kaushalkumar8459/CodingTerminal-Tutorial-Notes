---
title: React Components Basics
slug: day-004-components-basics
dayLabel: Day 4
level: Beginner
estimatedMinutes: 60
order: 4
track: react
---
# Day 4: React Components Basics

## Goal
Build, name, compose, reuse, and organize React function components correctly. By the end, you should understand component boundaries, component instances, props at a high level, and why composition is the foundation of React UI architecture.

## Prerequisites
- Day 1–3 completed
- JavaScript functions and modules
- JSX fundamentals

## 1. What Is a Component?
A component is a reusable unit of UI represented in modern React by a function that returns a React element tree.

```jsx
function Header() {
  return <header><h1>My App</h1></header>;
}
```

A component is not merely an HTML wrapper. It can contain markup, calculations, event handlers, and later state/effects. Keep responsibilities focused, but do not interpret “one responsibility” as “one HTML tag.”

## 2. Function Components
Function components are the standard approach for new React code.

```jsx
function Welcome() {
  return <h2>Welcome to React</h2>;
}

export default Welcome;
```

A component is used with JSX syntax:

```jsx
function App() {
  return <Welcome />;
}
```

`<Welcome />` creates a React element describing an instance of `Welcome`; it does not mean you manually call `Welcome()` in your JSX.

## 3. Class Components: Read, Don't Start With Them
Older React applications may contain class components:

```jsx
import { Component } from "react";

class Welcome extends Component {
  render() {
    return <h2>Welcome</h2>;
  }
}
```

Function components are preferred for new code. Understanding classes remains useful when maintaining legacy applications, error boundaries, or older interview code.

## 4. Naming Rules
Custom component names conventionally begin with an uppercase letter:

```jsx
function ProfileCard() {
  return <p>Profile</p>;
}
```

```jsx
<ProfileCard />
```

Lowercase JSX names are interpreted as intrinsic DOM elements such as `div`, `button`, and `section`. This is why `<profileCard />` is not equivalent to `<ProfileCard />`.

## 5. Reusing a Component
One component can have many instances:

```jsx
function Card() {
  return <article>Reusable card</article>;
}

function App() {
  return (
    <main>
      <Card />
      <Card />
      <Card />
    </main>
  );
}
```

Each `<Card />` is a separate usage. If the component later receives state, each instance can maintain its own state.

## 6. Composition
Composition means assembling a screen from smaller components.

```jsx
function Header() { return <header>Header</header>; }
function Sidebar() { return <aside>Sidebar</aside>; }
function Content() { return <section>Content</section>; }
function Footer() { return <footer>Footer</footer>; }

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <Content />
      <Footer />
    </>
  );
}
```

This creates a component hierarchy:

```text
App
├── Header
├── Sidebar
├── Content
└── Footer
```

Composition is more important than creating one giant `App` component.

## 7. Component Responsibility and Boundaries
A useful component boundary usually has one or more of these characteristics:

- a meaningful UI section
- reusable behavior or presentation
- a clear data contract
- independent testing value
- a reason to change separately

Do not split every `<div>` into a component. Excessive fragmentation can make code harder to follow.

## 8. Props at a High Level
Components become reusable when values are supplied by the parent.

```jsx
function UserCard({ name, role }) {
  return <article><h3>{name}</h3><p>{role}</p></article>;
}

function App() {
  return <UserCard name="Asha" role="Developer" />;
}
```

Day 6 will cover props deeply: objects, arrays, callbacks, children, spread/rest, component props, defaults, and design patterns.

## 9. Imports and Exports
A component can live in its own file:

```jsx
// Header.jsx
export default function Header() {
  return <header>Header</header>;
}
```

```jsx
// App.jsx
import Header from "./Header";

function App() {
  return <Header />;
}

export default App;
```

Named exports are another option:

```jsx
export function Header() { return <header>Header</header>; }
```

```jsx
import { Header } from "./Header";
```

## 10. Component Tree vs DOM Tree
The React component tree represents your application structure; the browser DOM is the host UI produced after React renders and commits updates.

```text
Component tree
App → Header → Navigation
          └→ Logo

Rendered host tree
main → header → nav → ...
```

A component does not have to map one-to-one to a DOM element.

## End-to-End Practical: Dashboard Shell
Create:

```text
src/
├── App.jsx
└── components/
    ├── Header.jsx
    ├── Sidebar.jsx
    ├── DashboardContent.jsx
    └── Footer.jsx
```

`Header.jsx`:

```jsx
export default function Header() {
  return <header><h1>Learning Dashboard</h1></header>;
}
```

`Sidebar.jsx`:

```jsx
export default function Sidebar() {
  return <aside><nav><a href="#courses">Courses</a></nav></aside>;
}
```

`DashboardContent.jsx`:

```jsx
export default function DashboardContent() {
  return <main><h2>My Courses</h2><p>Continue learning.</p></main>;
}
```

`Footer.jsx`:

```jsx
export default function Footer() {
  return <footer>© 2026 CodingTerminals</footer>;
}
```

`App.jsx`:

```jsx
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DashboardContent from "./components/DashboardContent";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <DashboardContent />
      <Footer />
    </>
  );
}
```

## Hands-on Challenges
1. Build a `ProfilePage` from `ProfileHeader`, `ProfileDetails`, and `ProfileActions`.
2. Extract a repeated `FeatureCard` and render it three times.
3. Convert hardcoded user text into props.
4. Move each major component into its own file.
5. Explain why you chose each component boundary.

## Common Mistakes

### Mistake: lowercase component
```jsx
function card() { return <div>Card</div>; }
```
Use `Card` instead.

### Mistake: manually calling components
Avoid:
```jsx
{Card()}
```
Prefer:
```jsx
<Card />
```

### Mistake: over-fragmenting
A component for every tiny `<span>` is usually unnecessary. Extract when the unit has a meaningful responsibility or reuse value.

### Mistake: confusing re-render with DOM replacement
A component may render again without every DOM node being recreated.

## Assessment
1. What is a React component?
2. Why does a custom component start with uppercase?
3. What is composition?
4. Why are function components preferred for new React code?
5. Can one component have multiple instances?
6. Does one component always equal one DOM element?
7. When should you split a component?
8. Why are imports/exports important?

## Interview Questions
**Beginner:** What is a function component? — A JavaScript function that returns React UI.

**Beginner:** Why uppercase? — JSX uses casing to distinguish user-defined components from intrinsic DOM elements.

**Intermediate:** What is composition? — Building larger UI by combining smaller components.

**Intermediate:** Why avoid a giant component? — Large components become harder to understand, test, reuse, and change safely.

**Advanced:** How do you choose component boundaries? — Based on cohesive responsibility, reuse, data/behavior ownership, independent change, and maintainability—not arbitrary size.

**Advanced:** Component vs element? — A component is a reusable definition; a React element is a lightweight description of what React should render.

## Self Check
You are ready for Day 5 if you can create components from scratch, compose a page, explain component boundaries, split components across files, and distinguish components, elements, and DOM nodes.

## Day 4 Outcome
You can confidently build and compose React components and are ready to design reusable component APIs in Day 5.