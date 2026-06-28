# Lecture 21 - Client Components vs Server Components in Next.js

## 📖 Introduction

One of the biggest changes introduced by the Next.js App Router is:

```text
Server Components
```

and

```text
Client Components
```

Understanding these two concepts is extremely important because they directly affect:

- Performance
- JavaScript Bundle Size
- SEO
- User Interactivity
- Browser APIs Access

Many beginners think:

```text
Server Component = Runs on Server

Client Component = Runs on Client
```

This is only partially true.

The actual behavior is more interesting.

---

# Server Components

By default, every component inside App Router is:

```text
Server Component
```

Example:

```jsx
export default function Home() {
  return <h1>Home Page</h1>;
}
```

No special syntax required.

---

## Where Does It Execute?

```text
Server Only
```

Execution:

```text
Request

↓

Next.js Server

↓

Execute Component

↓

Generate HTML

↓

Send HTML To Browser
```

---

## Important Property

The JavaScript code of a Server Component is NOT sent to the browser.

Browser receives:

```text
HTML

+

Minimal React Data
```

but not the actual component implementation as client-side JavaScript.

---

# Why is This Powerful?

Imagine:

```jsx
export default function Home() {
  return <h1>Home Page</h1>;
}
```

If browser already receives:

```html
<h1>Home Page</h1>
```

then why send:

```jsx
function Home() {
  return <h1>Home Page</h1>;
}
```

again?

No reason.

So Next.js saves bandwidth by keeping the component on the server.

---

# Benefits of Server Components

✅ Smaller JavaScript Bundle

✅ Faster Page Load

✅ Better Performance

✅ Better SEO

✅ Less Browser Work

---

# Client Components

A Client Component is a component that can run in the browser.

To create one:

```jsx
"use client";
```

Example:

```jsx
"use client";

export default function Likes() {
  return <h1>Likes</h1>;
}
```

---

# What Happens Now?

Many people think:

```text
Client Component

↓

Runs Only In Browser
```

Wrong.

Actual behavior:

```text
Server

↓

Browser
```

Both.

---

# Execution Flow of Client Components

Request:

```text
Browser

↓

Next.js Server

↓

Execute Component

↓

Generate Initial HTML

↓

Send HTML

↓

Send JavaScript

↓

Browser Executes Component Again

↓

Hydration
```

---

# Server Component vs Client Component

| Feature               | Server Component | Client Component |
| --------------------- | ---------------- | ---------------- |
| Runs On Server        | ✅               | ✅               |
| Runs In Browser       | ❌               | ✅               |
| Sent As JS To Browser | ❌               | ✅               |
| Supports Hooks        | ❌               | ✅               |
| Supports Events       | ❌               | ✅               |
| Supports Browser APIs | ❌               | ✅               |

---

# Why Do We Need Client Components?

Because browsers provide APIs like:

```text
window

localStorage

sessionStorage

navigator

document
```

These APIs don't exist on the server.

---

# Example Problem

```jsx
console.log(localStorage);
```

Server:

```text
ReferenceError

localStorage is not defined
```

because:

```text
localStorage

↓

Browser API
```

not a Node.js API.

---

# Safe Way to Use Browser APIs

## Checking localStorage

```jsx
if (typeof localStorage !== "undefined") {
  console.log(localStorage);
}
```

---

# Why Does This Work?

Browser:

```text
typeof localStorage

↓

"object"
```

---

Server:

```text
typeof localStorage

↓

"undefined"
```

No error occurs.

---

# Checking Window Object

```jsx
if (typeof window !== "undefined") {
  console.log(window);
}
```

---

Server:

```text
typeof window

↓

"undefined"
```

---

Browser:

```text
typeof window

↓

"object"
```

---

# Why Use `typeof`?

Normally:

```jsx
console.log(window);
```

Server:

```text
ReferenceError
```

---

But:

```jsx
typeof window;
```

is special JavaScript syntax.

It safely returns:

```text
"undefined"
```

instead of throwing an error.

---

# Event Handlers in Client Components

Example:

```jsx
"use client";

export default function Likes() {
  return (
    <div
      onClick={() => {
        console.log("Liked Button Clicked");
      }}
    >
      Like Button
    </div>
  );
}
```

---

# Important Question

If Client Components execute on the server first,

why doesn't:

```jsx
onClick;
```

throw an error?

---

# Answer

Because:

```jsx
onClick={() => ...}
```

is NOT executed during server rendering.

React only creates a description of the UI.

Example:

```jsx
<div onClick={handler}>
```

becomes something like:

```text
Element

↓

Has Event Handler

↓

Remember It
```

---

Server generates:

```html
<div>Like Button</div>
```

No click happens yet.

---

During Hydration:

```text
Browser

↓

Loads JS

↓

Connects Event Handlers

↓

onClick Starts Working
```

This is why no error occurs.

---

# Proving Client Components Run On Server

Example:

```jsx
"use client";

export default function Likes() {
  console.log("Running On Server");

  return <div>Like Button</div>;
}
```

Open page:

```text
Terminal

↓

Running On Server
```

appears.

This proves:

```text
Client Components

↓

Still Render On Server
```

initially.

---

# Understanding This Example

```jsx
<div>
  Like Button
  {String(console.log("running on server"))}
</div>
```

---

# Execution

Step 1

```jsx
console.log("running on server");
```

runs.

Output:

```text
running on server
```

---

Step 2

Question:

What does:

```jsx
console.log(...)
```

return?

Answer:

```text
undefined
```

---

Step 3

```jsx
String(undefined);
```

becomes:

```text
"undefined"
```

---

Final UI:

```text
Like Button undefined
```

---

# Why Does console.log Return Undefined?

Example:

```jsx
const value = console.log("Hello");
```

Output:

```text
Hello
```

but:

```jsx
console.log(value);
```

prints:

```text
undefined
```

because:

```text
console.log()

↓

Returns Nothing

↓

undefined
```

---

# React Hooks in Client Components

Server Components cannot use:

```jsx
useState;

useEffect;

useReducer;

useRef;
```

---

Client Components can.

Example:

```jsx
"use client";

import { useState } from "react";

export default function Likes() {
  const [likes, setLikes] = useState(0);

  return <div onClick={() => setLikes(likes + 1)}>Likes {likes}</div>;
}
```

---

# Execution Flow

Server:

```text
Generate Initial HTML
```

---

Browser:

```text
Hydration

↓

useState Activated

↓

Click Works

↓

UI Updates
```

---

# Why Does useState Work?

Because Client Components are sent to the browser as JavaScript.

Browser receives:

```text
Likes Component JS

↓

React Runtime

↓

State Management
```

which Server Components never receive.

---

# useEffect in Client Components

Example:

```jsx
"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    console.log("Mounted");
  }, []);

  return <h1>Hello</h1>;
}
```

---

Why does it work?

Because:

```text
useEffect

↓

Browser Lifecycle Hook
```

and Client Components execute in browser after hydration.

---

# Parent Client Component → Child Components

Very Important Interview Question.

Suppose:

```jsx
"use client";

export default function Parent() {
  return <Child />;
}
```

Child:

```jsx
export default function Child() {
  return <h1>Child</h1>;
}
```

---

Question:

Is Child a Server Component?

Answer:

❌ No

Because:

```text
Parent

↓

Client Component

↓

Entire Import Tree

↓

Client Side
```

---

# Visualization

```text
Parent (Client)

├── Child A
├── Child B
└── Child C
```

Result:

```text
All Become Client Components
```

---

# Why?

Browser cannot execute:

```text
Parent JS
```

without:

```text
Child JS
```

because Parent imports Child.

Therefore Next.js includes the whole tree in the client bundle.

---

# Real Example

```jsx
"use client";

import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
}
```

Result:

```text
Header

↓

Client Component

----------------

Footer

↓

Client Component
```

even if they don't contain:

```jsx
"use client";
```

themselves.

---

# Optimization Strategy

Bad:

```jsx
"use client";

Entire Page
```

Now:

```text
Whole Page

↓

Client Bundle
```

Large JavaScript.

---

Good:

```jsx
Page (Server)

↓

LikeButton (Client)
```

Only interactive part becomes client-side.

---

Example:

```jsx
export default function Page() {
  return (
    <>
      <Article />
      <LikeButton />
    </>
  );
}
```

LikeButton:

```jsx
"use client";
```

Result:

```text
Article

↓

Server Component

----------------

LikeButton

↓

Client Component
```

Smaller bundle.

Better performance.

---

# What Happens Under The Hood?

Server Component:

```text
Execute On Server

↓

Generate HTML

↓

Send HTML
```

No JavaScript bundle required.

---

Client Component:

```text
Execute On Server

↓

Generate HTML

↓

Send HTML

↓

Send Component JS

↓

Browser Executes JS

↓

Hydration

↓

Interactivity Enabled
```

---

# Why Not Make Everything Client Components?

Because:

```text
More JS

↓

Larger Bundle

↓

Slower Downloads

↓

Slower Hydration

↓

Poor Performance
```

This is exactly what Next.js tries to avoid.

---

# Best Practices

✅ Keep pages and layouts as Server Components by default.

✅ Use Client Components only for interactive UI.

✅ Isolate buttons, forms, modals, and stateful UI into separate Client Components.

✅ Avoid placing `"use client"` high in the component tree.

---

# Key Takeaways

- Components are Server Components by default.
- `"use client"` creates a Client Component.
- Client Components run on the server and browser.
- Server Components run only on the server.
- Client Components support hooks, events, and browser APIs.
- Parent Client Components make all imported children part of the client bundle.
- Keep Client Components as small as possible for better performance.

---

# Quick Revision

### Default component type?

```text
Server Component
```

---

### How to create a Client Component?

```jsx
"use client";
```

---

### Can Server Components use useState?

❌ No

---

### Can Client Components use useState?

✅ Yes

---

### Can Server Components access localStorage?

❌ No

---

### Why?

Because localStorage exists only in browsers.

---

### What happens if a parent is a Client Component?

All imported children become part of the client bundle.

---

# Interview Questions

### Q1. What is the difference between Server Components and Client Components?

Server Components run only on the server and are not sent as JavaScript to the browser, while Client Components are sent to the browser and support interactivity.

---

### Q2. Why does Next.js default to Server Components?

To reduce JavaScript bundle size and improve performance.

---

### Q3. Why can Client Components use hooks?

Because their JavaScript is sent to the browser where React manages state and lifecycle.

---

### Q4. Why doesn't `onClick` throw an error during server rendering?

Because React only records the event handler during rendering. The actual click handling is attached later during hydration.

---

### Q5. Why should we avoid putting `"use client"` high in the component tree?

Because it increases the amount of JavaScript sent to the browser and can hurt performance.

---

# Summary

In this lecture, we learned the difference between Server Components and Client Components in Next.js. We saw that Server Components run only on the server and help reduce JavaScript bundle size, while Client Components support interactivity through hooks, event handlers, and browser APIs. We also learned how hydration works, why `onClick` and hooks don't cause server errors, how parent Client Components affect child components, and why isolating interactive UI into small Client Components is a key optimization strategy in modern Next.js applications.
