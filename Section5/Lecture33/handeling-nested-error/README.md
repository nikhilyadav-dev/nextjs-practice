# Lecture 33 - Error Handling in Nested Routes in Next.js

## 📖 Introduction

In the previous lecture, we learned:

```text
error.js
```

acts as an:

```text
Error Boundary
```

for a route segment.

When an error occurs:

```text
Page

↓

Error

↓

error.js

↓

Fallback UI
```

Now an important question arises:

> What happens when we have nested routes?

Example:

```text
/blogs

/blogs/1

/blogs/2

/blogs/3
```

Which `error.js` will handle the error?

The nearest one?

The parent one?

The root one?

This lecture explains exactly how error boundaries work in nested routes.

---

# Core Rule

## Nearest Error Boundary Wins

Think:

```text
Error Occurs

↓

Find Closest error.js

↓

Render It
```

This is the most important rule of the lecture.

---

# Example 1

Structure:

```text
blogs/

├── page.js

└── [blogID]/
    ├── page.js
    └── error.js
```

---

# Component Hierarchy

Think of Next.js internally as:

```text
Root Layout

↓

Blogs Page

↓

Blog Detail Page

↓

Blog Error Boundary
```

---

Visualization:

```text
Root Layout

└── Blogs

    └── BlogDetail

        └── BlogErrorBoundary
```

---

Suppose:

```jsx
[blogID] / page.js;
```

throws:

```jsx
throw new Error("Blog Failed");
```

---

Execution:

```text
Blog Page

↓

Error

↓

Look For Nearest error.js

↓

Found

[blogID]/error.js

↓

Render It
```

---

Result:

```text
Only Blog Detail Area
```

shows error UI.

---

Parent routes remain intact.

Example:

```text
Header

Blogs Navigation

Sidebar

Blog Error Page
```

---

# Visualization

```text
Root Layout

↓

Blogs Page

↓

Blog Error

↓

[blogID]/error.js
```

---

# Example 2

Structure:

```text
blogs/

├── page.js
├── error.js

└── [blogID]/
    └── page.js
```

---

# Component Hierarchy

```text
Root Layout

↓

Blogs Error Boundary

↓

Blog Detail Page
```

---

Visualization:

```text
Root Layout

└── BlogsErrorBoundary

    └── BlogDetail
```

---

Suppose:

```jsx
[blogID] / page.js;
```

throws:

```jsx
throw new Error("Blog Failed");
```

---

Execution:

```text
Blog Page

↓

Error

↓

Nearest error.js?

↓

No

↓

Move Up

↓

blogs/error.js

↓

Render It
```

---

Result:

```text
blogs/error.js
```

handles the error.

---

# Important Learning

Errors bubble upward.

Just like:

```text
JavaScript Try/Catch
```

moves upward.

---

Think:

```text
Child Error

↓

Parent Error Boundary

↓

Root Error Boundary
```

---

# Error Boundary Tree

Example:

```text
Root

↓

Blogs

↓

Blog Detail
```

---

Error Search:

```text
Blog Detail

↓

error.js ?

↓

No

↓

Blogs error.js ?

↓

Yes

↓

Render It
```

---

# Visual Representation

```text
Blog Detail

↓

No Error Boundary

↓

Move Up

↓

Blogs Error Boundary

↓

Handle Error
```

---

# Example 3

Structure

```text
blogs/

├── page.js
├── error.js

└── [blogID]/
    ├── page.js
    └── error.js
```

---

# Component Hierarchy

```text
Root Layout

↓

Blogs Error Boundary

↓

Blog Error Boundary

↓

Blog Detail Page
```

---

Visualization:

```text
Root Layout

└── BlogsErrorBoundary

    └── BlogErrorBoundary

        └── BlogDetail
```

---

Suppose:

```jsx
[blogID] / page.js;
```

throws error.

---

Execution:

```text
Blog Page

↓

Error

↓

Nearest Boundary?

↓

[blogID]/error.js

↓

Render It
```

---

Result:

```text
blogs/error.js

↓

Ignored
```

because:

```text
Nearest Boundary Wins
```

---

# Error Bubbling Example

Think:

```text
Blog Detail Error

↓

Blog Error Boundary

↓

Handled

↓

Stop
```

No need to continue upward.

---

# Understanding Layout Errors

Now the interesting part.

Structure:

```text
blogs/

├── page.js
├── error.js

└── [blogID]/
    ├── page.js
    ├── error.js
    └── layout.js
```

---

Question:

What if:

```jsx
[blogID] / layout.js;
```

throws an error?

---

Example:

```jsx
export default function Layout({ children }) {
  throw new Error("Layout Failed");

  return children;
}
```

---

# Component Hierarchy

```text
Root Layout

↓

Blogs Error Boundary

↓

Blog Error Boundary

↓

Blog Layout

↓

Blog Page
```

---

Important:

```text
Error Boundary

Cannot Catch

Its Own Layout Error
```

---

Why?

Because:

```text
Layout

↓

Rendered Before

↓

Error Boundary Becomes Active
```

---

Execution:

```text
Blog Layout

↓

Error

↓

Blog Error Boundary

Cannot Handle It

↓

Move Up

↓

blogs/error.js

↓

Handle Error
```

---

# Important Rule

A route segment's:

```text
error.js
```

can catch errors from:

```text
page.js

child segments
```

but NOT from:

```text
its own layout.js
```

---

# Easy Memory Trick

```text
error.js

Can Catch

Things Below It

Not Above It
```

---

Visualization

```text
error.js

↓

Can Catch

page.js

children

grandchildren

----------------

Cannot Catch

Own Layout
```

---

# Real Example

```text
blogs/

├── error.js

└── [blogID]/
    ├── layout.js
    ├── page.js
    └── error.js
```

---

Error Inside:

```text
[blogID]/page.js
```

Handled By:

```text
[blogID]/error.js
```

---

Error Inside:

```text
[blogID]/layout.js
```

Handled By:

```text
blogs/error.js
```

---

# Why?

Because:

```text
Layout

↓

Parent Boundary Needed
```

---

# Root Page Error

Structure:

```text
app/

├── page.js
└── error.js
```

---

Component Hierarchy:

```text
Root Error Boundary

↓

Root Page
```

---

Error:

```jsx
throw new Error("Home Failed");
```

---

Execution:

```text
Root Page

↓

Error

↓

app/error.js
```

---

Works normally.

---

# Root Layout Error

Structure:

```text
app/

├── layout.js
├── page.js
└── error.js
```

---

Question:

What if:

```jsx
layout.js;
```

throws?

---

Execution:

```text
Root Layout

↓

Error
```

---

Problem:

```text
Root Layout

↓

Never Rendered

↓

Root Error Boundary

Never Mounted
```

---

Therefore:

```text
app/error.js

Cannot Catch

Root Layout Errors
```

---

# Solution: global-error.js

Next.js provides:

```text
global-error.js
```

for this situation.

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

# Purpose

```text
Root Layout Error

↓

global-error.js
```

---

# Component Hierarchy

Normal:

```text
Global Error

↓

Root Layout

↓

Root Error

↓

Pages
```

---

When Root Layout Fails:

```text
Root Layout

↓

Error

↓

global-error.js
```

---

# Difference Between error.js and global-error.js

| error.js               | global-error.js            |
| ---------------------- | -------------------------- |
| Route-Level            | Application-Level          |
| Handles Segment Errors | Handles Root Layout Errors |
| Nested Routes          | Entire App                 |
| Most Common            | Rarely Needed              |

---

# Visual Summary

```text
page.js Error

↓

Nearest error.js

--------------------

Nested page.js Error

↓

Nearest Parent error.js

--------------------

layout.js Error

↓

Parent error.js

--------------------

Root Layout Error

↓

global-error.js
```

---

# Complete Hierarchy Diagram

```text
global-error.js

↓

Root Layout

↓

Root error.js

↓

Blogs error.js

↓

[blogID] error.js

↓

Page
```

---

Error Search Flow

```text
Page Error

↓

Nearest Boundary

↓

Handle

--------------------

Layout Error

↓

Parent Boundary

↓

Handle

--------------------

Root Layout Error

↓

global-error.js
```

---

# Best Practices

✅ Create route-specific `error.js` files for important sections.

✅ Use parent boundaries to isolate failures.

✅ Use `global-error.js` for root layout failures.

✅ Keep error boundaries close to risky components.

---

# Common Mistakes

### Mistake 1

Thinking:

```text
error.js

Can Catch

Own Layout Errors
```

Wrong.

---

### Mistake 2

Thinking:

```text
app/error.js

Handles Root Layout Errors
```

Wrong.

Need:

```text
global-error.js
```

---

### Mistake 3

Ignoring nested error boundaries.

They help isolate failures.

---

# Key Takeaways

- Error boundaries work using the nearest `error.js`.
- Errors bubble upward until a boundary is found.
- A route's `error.js` catches errors from its page and child segments.
- A route's `error.js` cannot catch errors from its own layout.
- Layout errors are handled by parent boundaries.
- Root page errors are handled by `app/error.js`.
- Root layout errors require `global-error.js`.

---

# Quick Revision

### Which error boundary handles an error?

```text
Nearest error.js
```

---

### Can error.js catch its own layout error?

❌ No

---

### Who handles layout errors?

```text
Parent error.js
```

---

### Who handles root page errors?

```text
app/error.js
```

---

### Who handles root layout errors?

```text
global-error.js
```

---

# Interview Questions

### Q1. How does Next.js choose which error boundary to render?

It finds the nearest `error.js` in the route hierarchy and renders it.

---

### Q2. Can a segment's error.js catch errors from its own layout?

No. Layout errors are handled by a parent error boundary.

---

### Q3. What happens if no child error boundary exists?

The error bubbles upward until a parent boundary is found.

---

### Q4. What file handles root layout errors?

```text
global-error.js
```

---

### Q5. What is the difference between `error.js` and `global-error.js`?

`error.js` handles route-level errors, while `global-error.js` handles application-level errors such as failures in the root layout.

---

# Summary

In this lecture, we learned how error handling works across nested routes in Next.js. We saw that errors are always handled by the nearest available `error.js` boundary and that errors bubble upward when no local boundary exists. We also learned the important distinction between page errors and layout errors: a route's `error.js` can catch errors from pages and child segments but cannot catch errors from its own layout. Finally, we explored how root layout failures are handled using `global-error.js`, which acts as the highest-level error boundary for the entire application.
