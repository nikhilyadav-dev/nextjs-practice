# Lecture 35 - Global Error Handling in Next.js

## 📖 Introduction

In previous lectures, we learned:

- `error.js`
- Nested Route Error Handling
- Layout Errors
- Client Component Errors
- Server Component Errors

We learned that:

```text
error.js

↓

Handles Route-Level Errors
```

But now an important question arises:

> What happens if the Root Layout itself crashes?

Example:

```text
app/
├── layout.js
├── page.js
└── error.js
```

Suppose:

```jsx
// app/layout.js

export default function RootLayout({ children }) {
  throw new Error("Root Layout Failed");

  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

Question:

Can:

```text
app/error.js
```

handle this error?

The answer is:

```text
No
```

And this is exactly why:

```text
global-error.js
```

exists.

---

# Why Was global-error.js Introduced?

Remember:

```text
error.js

↓

Acts As Error Boundary
```

---

But an Error Boundary must be:

```text
Mounted First
```

before it can catch errors.

---

Problem:

```text
Root Layout

↓

Fails

↓

Application Never Mounts Properly
```

---

Therefore:

```text
app/error.js

↓

Cannot Catch Root Layout Errors
```

because:

```text
Root Layout Failed

↓

Before Error Boundary Became Active
```

---

# Understanding the Problem

Structure:

```text
app/
├── layout.js
├── page.js
└── error.js
```

---

Hierarchy:

```text
Root Layout

↓

Root Error Boundary

↓

Page
```

---

Suppose:

```jsx
layout.js;
```

throws:

```jsx
throw new Error("Layout Failed");
```

---

Execution:

```text
Root Layout

↓

Crash

↓

Root Error Boundary

Never Mounted

↓

Application Fails
```

---

# Solution

Next.js provides:

```text
global-error.js
```

---

Structure:

```text
app/
├── layout.js
├── page.js
├── error.js
└── global-error.js
```

---

# Purpose of global-error.js

Think:

```text
error.js

↓

Handles Route Errors

--------------------

global-error.js

↓

Handles Application Errors
```

---

More specifically:

```text
Root Layout Errors
```

---

# How To Create global-error.js

Example:

```jsx
"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h1>Something Went Wrong</h1>

        <p>Global Application Error</p>

        <button onClick={() => reset()}>Retry</button>
      </body>
    </html>
  );
}
```

---

# Important

Unlike:

```text
error.js
```

---

`global-error.js` must return:

```jsx
<html>
  <body>
```

tags.

---

Why?

Because:

```text
Root Layout Failed
```

---

Normally Root Layout provides:

```html
<html>
  <body></body>
</html>
```

for the application.

---

But if Root Layout crashes:

```text
No HTML Structure Exists
```

---

Therefore:

```text
global-error.js

↓

Must Create Entire Document
```

---

# Important Rule

## global-error.js Must Be Client Component

Always:

```jsx
"use client";
```

---

Reason:

```text
React Error Boundaries

↓

Client Side Feature
```

---

Exactly like:

```text
error.js
```

---

# Component Hierarchy

Normal Application:

```text
Root Layout

↓

Root Error Boundary

↓

Page
```

---

With Global Error Boundary:

```text
Global Error Boundary

↓

Root Layout

↓

Root Error Boundary

↓

Page
```

---

Visualization:

```text
global-error.js

↓

layout.js

↓

error.js

↓

page.js
```

---

# Error Search Flow

Suppose:

```text
Page Error
```

---

Execution:

```text
page.js

↓

error.js

↓

Handled
```

---

No need for:

```text
global-error.js
```

---

# Another Example

Suppose:

```text
Nested Route Error
```

---

Execution:

```text
[blogID]/page.js

↓

[blogID]/error.js

↓

Handled
```

---

Again:

```text
global-error.js

↓

Not Used
```

---

# Root Layout Error

Now:

```jsx
layout.js;
```

throws:

```jsx
throw new Error("Root Layout Failed");
```

---

Execution:

```text
Root Layout

↓

Crash

↓

global-error.js

↓

Displayed
```

---

# Visual Comparison

## Page Error

```text
Page

↓

error.js
```

---

## Nested Page Error

```text
Nested Page

↓

Nearest error.js
```

---

## Layout Error

```text
Layout

↓

Parent error.js
```

---

## Root Layout Error

```text
Root Layout

↓

global-error.js
```

---

# How reset() Works Here

Example:

```jsx
<button onClick={() => reset()}>Retry</button>
```

---

Purpose:

```text
Retry Rendering
```

---

Flow:

```text
Global Error

↓

Retry

↓

Render Root Layout Again
```

---

If issue fixed:

```text
Application Loads
```

---

If issue still exists:

```text
global-error.js

Appears Again
```

---

# Example

Suppose:

```jsx
const shouldFail = false;
```

---

When:

```text
shouldFail = true
```

↓

Global Error Appears.

---

User clicks:

```text
Retry
```

↓

Root Layout Renders Again.

---

If:

```text
shouldFail = false
```

↓

Application Loads Successfully.

---

# Difference Between error.js and global-error.js

| error.js                   | global-error.js                    |
| -------------------------- | ---------------------------------- |
| Route-Level Error Boundary | Application-Level Error Boundary   |
| Handles Page Errors        | Handles Root Layout Errors         |
| Nested Route Support       | Entire Application                 |
| Doesn't Need `<html>`      | Must Include `<html>` and `<body>` |
| Most Common                | Used Rarely                        |

---

# When Is global-error.js Actually Needed?

In most applications:

```text
Rarely
```

because Root Layout usually contains:

```text
Navbar

Footer

Providers

Metadata
```

which are stable.

---

But if Root Layout contains:

```text
API Calls

Complex Logic

External Dependencies
```

then:

```text
global-error.js
```

becomes important.

---

# Real World Example

Imagine:

```text
layout.js
```

loads:

```text
Theme Provider

Auth Provider

User Settings
```

---

Suppose Auth Provider crashes.

Without:

```text
global-error.js
```

Entire application breaks.

---

With:

```text
global-error.js
```

Users see:

```text
Application Error

Retry
```

instead of a blank screen.

---

# Internal Mental Model

Think of Next.js internally as:

```jsx
<GlobalErrorBoundary>
  <RootLayout>
    <RouteErrorBoundary>
      <Page />
    </RouteErrorBoundary>
  </RootLayout>
</GlobalErrorBoundary>
```

---

Error Scenarios:

### Page Error

```text
Page

↓

Route Error Boundary
```

---

### Nested Route Error

```text
Nested Page

↓

Nearest Route Boundary
```

---

### Root Layout Error

```text
Root Layout

↓

Global Error Boundary
```

---

# Common Mistakes

### Mistake 1

Forgetting:

```jsx
<html>
<body>
```

inside:

```jsx
global - error.js;
```

---

### Mistake 2

Thinking:

```text
error.js

Handles Root Layout Errors
```

Wrong.

---

### Mistake 3

Forgetting:

```jsx
"use client";
```

---

Build Error.

---

# Best Practices

✅ Always add `global-error.js` in production applications.

✅ Keep the UI simple and user-friendly.

✅ Provide a retry button using `reset()`.

✅ Log detailed errors on the server.

✅ Avoid exposing sensitive information.

---

# Key Takeaways

- `global-error.js` is the highest-level Error Boundary in Next.js.
- It exists mainly to handle Root Layout failures.
- `error.js` cannot catch Root Layout errors.
- `global-error.js` must be a Client Component.
- It must include `<html>` and `<body>` tags.
- It receives `error` and `reset()` just like `error.js`.
- It provides a fallback UI when the entire application fails.

---

# Quick Revision

### Which file handles route-level errors?

```text
error.js
```

---

### Which file handles root layout errors?

```text
global-error.js
```

---

### Must global-error.js contain html/body?

✅ Yes

---

### Must global-error.js use "use client"?

✅ Yes

---

### What does reset() do?

Retries rendering the entire application.

---

# Interview Questions

### Q1. Why was global-error.js introduced?

Because `error.js` cannot catch errors that occur in the Root Layout.

---

### Q2. What type of errors does global-error.js handle?

Application-level errors, especially Root Layout failures.

---

### Q3. Why must global-error.js include `<html>` and `<body>` tags?

Because the Root Layout, which normally provides them, has failed to render.

---

### Q4. Can global-error.js replace error.js?

No. They serve different purposes. `error.js` handles route-level errors, while `global-error.js` handles application-level errors.

---

### Q5. What does reset() do inside global-error.js?

It retries rendering the Root Layout and the application.

---

# Summary

In this lecture, we learned about `global-error.js`, the highest-level Error Boundary provided by Next.js. Unlike `error.js`, which handles route-level failures, `global-error.js` exists specifically to recover from Root Layout errors that would otherwise crash the entire application. We learned why it must include `<html>` and `<body>` tags, why it must be a Client Component, and how `reset()` allows users to retry rendering the application. Together, `error.js` and `global-error.js` provide a complete error-handling strategy for both route-level and application-level failures in Next.js.
