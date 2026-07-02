# Lecture 30 - How to Use Context API and Redux in Next.js?

## 📖 Introduction

Before learning Context API in Next.js, we must first understand:

```text
How Context API Works In React
```

because Next.js uses the same React Context API.

The only difference is:

```text
React

↓

Everything Is Client Side

-----------------------

Next.js

↓

Server Components + Client Components
```

This creates some additional rules.

---

# Why Do We Need Context API?

Imagine:

```text
App

├── Header
├── Main
├── Footer
```

Suppose:

```text
Theme

↓

Dark / Light
```

needs to be accessed by:

```text
Header

Main

Footer
```

Without Context API:

```text
App

↓

Header

↓

Pass Props

↓

Child

↓

Pass Props

↓

GrandChild
```

This is called:

```text
Prop Drilling
```

---

# Problem with Prop Drilling

```text
App

↓

Header

↓

Sidebar

↓

Button

↓

Theme Value
```

Many components don't need the data but must pass it.

Messy.

---

# Solution

```text
Context API

↓

Global Shared State
```

Any component can access it.

---

# Understanding Your Example

---

## Step 1 - Create Context

```jsx
import { createContext } from "react";

export const ThemeContext = createContext();
```

---

# What Happens Here?

React creates:

```text
ThemeContext
```

which acts like a:

```text
Global Storage Box
```

Think:

```text
ThemeContext

↓

Can Store

isDark

toggleTheme
```

---

# Step 2 - Create Provider

```jsx
export default function ThemeProvider({
  children,
}) {
```

---

Provider's job:

```text
Store Data

↓

Provide Data

↓

All Descendants
```

---

# Step 3 - Create State

```jsx
const [isDark, setIsDark] = useState(localStorage.getItem("isDark") === "true");
```

---

Purpose:

```text
Dark Mode State
```

Example:

```text
true

↓

Dark Theme
```

---

```text
false

↓

Light Theme
```

---

# Step 4 - Toggle Function

```jsx
function toggleTheme() {
  setIsDark((prev) => !prev);
}
```

---

Execution

Current:

```text
false
```

Click:

```text
toggleTheme()
```

Result:

```text
true
```

---

Click Again:

```text
false
```

---

# Step 5 - useEffect

```jsx
useEffect(() => {
  localStorage.setItem("isDark", isDark);

  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [isDark]);
```

---

Purpose:

## Save Theme

```text
Dark

↓

Refresh

↓

Still Dark
```

because:

```text
localStorage
```

remembers value.

---

## Apply CSS Class

Dark:

```html
<html class="dark"></html>
```

---

Light:

```html
<html></html>
```

---

# Step 6 - Provide Data

```jsx
<ThemeContext.Provider
  value={{
    isDark,
    toggleTheme,
  }}
>
  {children}
</ThemeContext.Provider>
```

---

Meaning:

```text
All Child Components

↓

Can Access

isDark

toggleTheme
```

---

# React Flow

```text
ThemeProvider

↓

Context Provider

↓

App

↓

Header

↓

useContext()

↓

Get Data
```

---

# Understanding main.jsx

```jsx
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
```

---

Visualization

```text
ThemeProvider

↓

App

├── Header
├── Home
└── Footer
```

All components inside:

```text
ThemeProvider
```

can use:

```text
ThemeContext
```

---

# How Header Gets Data

```jsx
const { isDark, toggleTheme } = useContext(ThemeContext);
```

---

Execution:

```text
Header

↓

Ask Context

↓

Give Me Theme Data

↓

Receive

isDark

toggleTheme
```

---

# Header Flow

Current:

```text
isDark = false
```

UI:

```text
🌙 Moon Icon
```

---

Click:

```text
toggleTheme()
```

---

State Changes:

```text
false

↓

true
```

---

Provider Re-renders

↓

Header Re-renders

↓

Now:

```text
☀️ Sun Icon
```

---

# Complete React Flow

```text
ThemeProvider

↓

Store State

↓

Provide Context

↓

Header

↓

useContext()

↓

Read State

↓

Button Click

↓

toggleTheme()

↓

State Updated

↓

Provider Re-renders

↓

Consumers Re-render
```

---

# Why This Works in React Easily?

Because React SPA:

```text
Everything

↓

Runs In Browser
```

---

So:

```text
localStorage

document

window
```

are always available.

---

# Problem in Next.js

Suppose:

```jsx
export default function ThemeProvider() {
```

without:

```jsx
"use client";
```

---

Immediately Error.

Why?

Because:

```text
useState

useEffect

localStorage

document
```

are:

```text
Client Features
```

---

Server Components cannot use them.

---

# Next.js Rule

Context Providers must be:

```jsx
"use client";
```

---

Example:

```jsx
"use client";

import { createContext, useEffect, useState } from "react";
```

---

Without this:

```text
Build Error
```

---

# How Context API Works In Next.js

Structure:

```text
Root Layout

↓

ThemeProvider

↓

Page

↓

Header
```

---

Example:

```jsx
// app/layout.js

import ThemeProvider from "./ThemeProvider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

---

# Execution Flow

Request:

```text
Server

↓

Render Layout

↓

ThemeProvider Placeholder

↓

Send HTML
```

---

Browser:

```text
Hydration

↓

ThemeProvider Runs

↓

Context Available

↓

Children Can Access Context
```

---

# Why Context API Usually Lives Near Root Layout?

Because:

```text
Header

Footer

Sidebar

Pages
```

all need access.

---

Visualization

```text
ThemeProvider

├── Header
├── Sidebar
├── Main
└── Footer
```

Everything gets theme access.

---

# Important Interview Question

Can Server Components Consume Context?

Example:

```jsx
const value = useContext(ThemeContext);
```

inside:

```jsx
Server Component
```

---

Answer:

```text
No
```

---

Why?

Because Context API is a React Client Feature.

---

Server Components can render:

```jsx
<ThemeProvider>
```

but cannot:

```jsx
useContext();
```

from client contexts.

---

# Redux in Next.js

Redux follows almost the same rule.

---

Store:

```text
Client Side State
```

---

Therefore:

```jsx
"use client";
```

is required.

---

Typical Structure

```text
app/

providers/

redux/

components/
```

---

Example

```jsx
"use client";

import { Provider } from "react-redux";

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
```

---

Used in:

```jsx
layout.js;
```

similar to ThemeProvider.

---

# Context API vs Redux

| Context API         | Redux                       |
| ------------------- | --------------------------- |
| Built Into React    | External Library            |
| Small Apps          | Large Apps                  |
| Simple State        | Complex State               |
| Easy Setup          | More Setup                  |
| Good For Theme/Auth | Good For Large Global State |

---

# When To Use Context API?

Good For:

```text
Theme

Authentication

Language

User Preferences
```

---

# When To Use Redux?

Good For:

```text
Shopping Cart

Dashboard

Large Enterprise Apps

Complex State Logic
```

---

# Best Practices in Next.js

✅ Keep Providers as Client Components.

✅ Place Providers close to root layout.

✅ Use Context for small global state.

✅ Use Redux when state becomes large and complex.

✅ Avoid wrapping the entire app in unnecessary providers.

---

# Common Mistakes

### Mistake 1

Using Context in Server Components.

```text
Not Allowed
```

---

### Mistake 2

Forgetting:

```jsx
"use client";
```

inside Provider.

---

### Mistake 3

Reading localStorage during server rendering.

```text
localStorage

↓

Not Available On Server
```

---

# Key Takeaways

- Context API prevents prop drilling.
- Context consists of Context + Provider + Consumer.
- Providers store and share state.
- `useContext()` reads shared state.
- In React, Context works entirely in the browser.
- In Next.js, Providers must be Client Components.
- Server Components cannot consume Client Context directly.
- Redux follows the same Client Component rules.

---

# Quick Revision

### Why use Context API?

To avoid prop drilling.

---

### Which component provides data?

```jsx
Context.Provider;
```

---

### Which hook consumes data?

```jsx
useContext();
```

---

### Must ThemeProvider be a Client Component?

✅ Yes

---

### Can Server Components use useContext?

❌ No

---

### Where should providers usually be placed?

```text
Root Layout
```

---

# Interview Questions

### Q1. Why is Context API needed?

It allows components to share data without passing props through every level.

---

### Q2. Why must Context Providers be Client Components in Next.js?

Because they use React hooks and browser-specific features such as state management and effects.

---

### Q3. Can Server Components consume React Context?

No. Server Components cannot use React Client hooks such as `useContext()`.

---

### Q4. Where is the best place to put a ThemeProvider?

Near the root layout so all pages and components can access the context.

---

### Q5. When should Redux be preferred over Context API?

When the application has large, complex, or frequently updated global state.

---

# Summary

In this lecture, we learned how Context API works in React and Next.js. We saw how a Provider stores state, shares it through a Context, and allows child components to consume it using `useContext()`. We also learned that while Context API works naturally in React because everything runs in the browser, Next.js requires Providers to be Client Components because they use hooks and browser APIs. Finally, we discussed how Redux follows the same client-side rules and when to choose Context API versus Redux in real-world applications.
