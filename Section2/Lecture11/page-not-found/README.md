# Lecture 11 - Customizing 404 Pages in Next.js

## 📖 Introduction

No matter how well we build an application, users can still visit:

- Invalid URLs
- Deleted Pages
- Wrong Blog IDs
- Broken Links

Instead of showing a generic error, we should display a **custom 404 page** that guides users back to valid content.

Next.js makes this very easy by providing:

- `notFound()` function
- `not-found.js` file
- Route-specific 404 pages

---

# What is a 404 Page?

A **404 (Not Found)** page is displayed when the requested page or resource does not exist.

Example:

```text
https://example.com/blogs/999999
```

If Blog **999999** doesn't exist, users should see:

```text
404
Blog Not Found
```

instead of a server error.

---

# How Next.js Handles 404 Pages

There are **two ways** to show a 404 page:

### 1. Automatically

When the requested route does not exist.

Example:

```text
/about123
```

↓

Next.js automatically shows the 404 page.

---

### 2. Manually

Using the:

```jsx
notFound();
```

function.

This allows us to display a 404 page based on our own conditions.

---

# Showing 404 Based on a Condition

Next.js provides:

```jsx
import { notFound } from "next/navigation";
```

We can call:

```jsx
notFound();
```

whenever we want.

---

## Example

```jsx
import { notFound } from "next/navigation";

export default async function Blog({ params }) {
  const { blog } = await params;

  if (blog === "test") {
    notFound();
  }

  return <h1>Blog {blog}</h1>;
}
```

---

## Execution Flow

User visits:

```text
/blogs/test
```

↓

Next.js extracts:

```js
blog = "test";
```

↓

Condition:

```jsx
if (blog === "test")
```

↓

True

↓

Execute

```jsx
notFound();
```

↓

Next.js immediately stops rendering the current page.

↓

Displays

```text
404 Page
```

---

# Why Use `notFound()`?

Imagine a database containing:

```text
Blog 1
Blog 2
Blog 3
```

User visits:

```text
/blogs/999
```

If Blog **999** doesn't exist:

```jsx
notFound();
```

is much better than showing:

```text
Blog 999
```

because the resource doesn't actually exist.

---

# Checking Whether a Route Parameter is a Number

Suppose our application expects:

```text
/blogs/1
/blogs/2
/blogs/3
```

But the user enters:

```text
/blogs/react
```

Since only numeric blog IDs are allowed, we should display a 404 page.

Example:

```jsx
import { notFound } from "next/navigation";

export default async function Blog({ params }) {
  const { blog } = await params;

  if (isNaN(blog)) {
    notFound();
  }

  return <h1>Blog {blog}</h1>;
}
```

---

# How Does `isNaN()` Work?

`isNaN()` means:

```text
Is Not A Number?
```

Syntax:

```js
isNaN(value);
```

Returns:

```text
true
```

if the value cannot be converted into a valid number.

---

## Examples

```js
isNaN(10);
```

Output:

```text
false
```

because 10 is a number.

---

```js
isNaN("25");
```

Output:

```text
false
```

because JavaScript converts `"25"` into:

```text
25
```

---

```js
isNaN("hello");
```

Output:

```text
true
```

because `"hello"` cannot be converted into a number.

---

```js
isNaN("abc123");
```

Output:

```text
true
```

---

# How Does `isNaN()` Work Internally?

JavaScript first tries to convert the value into a number.

Internally, it behaves conceptually like:

```js
Number(value);
```

Then checks:

```text
Is the result NaN?
```

Examples:

```js
Number("25");
```

↓

```text
25
```

Valid Number

↓

```js
isNaN("25");
```

↓

```text
false
```

---

Example:

```js
Number("hello");
```

↓

```text
NaN
```

↓

```js
isNaN("hello");
```

↓

```text
true
```

---

# Better Way to Check Numbers

Although the lecture uses:

```js
isNaN(blog);
```

a stricter and more reliable approach is:

```js
Number.isNaN(Number(blog));
```

Example:

```jsx
if (Number.isNaN(Number(blog))) {
  notFound();
}
```

```Flow Diagram

blog = "123"
      │
      ▼
Number(blog)
      │
      ▼
123
      │
      ▼
Number.isNaN(123)
      │
      ▼
false ✅ (Valid Number)

blog = "abc"
      │
      ▼
Number(blog)
      │
      ▼
NaN
      │
      ▼
Number.isNaN(NaN)
      │
      ▼
true ❌ (Not a Number)
```

This avoids some of the surprising behaviors of the global `isNaN()` function.

> **For learning purposes, `isNaN()` is perfectly fine. In production code, `Number.isNaN(Number(value))` is generally preferred for stricter validation.**

---

# Creating a Custom 404 Page

Next.js allows us to replace the default 404 page.

Create:

```bash
app/
│
└── not-found.js
```

Example:

```jsx
export default function NotFound() {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </>
  );
}
```

Now every unmatched route uses this custom page.

---

# Route-Specific 404 Pages

Sometimes only one section of the application needs a custom 404 page.

Example:

```bash
app/
│
└── blogs/
    │
    ├── page.js
    │
    ├── not-found.js
    │
    └── [blog]/
        └── page.js
```

Now:

```text
/blogs/999
```

shows:

```text
Blog Not Found
```

instead of the global 404 page.

---

# How Route-Specific 404 Works

User visits:

```text
/blogs/999
```

↓

Inside:

```jsx
page.js;
```

↓

Condition fails

↓

```jsx
notFound();
```

↓

Next.js first looks for:

```bash
blogs/not-found.js
```

If it exists:

```text
Uses it.
```

Otherwise:

```text
Falls back to app/not-found.js
```

---

# Showing the Invalid URL

Sometimes we want to display the invalid URL to help the user understand what went wrong.

Example:

```text
Blog Not Found!

Invalid URL:
/blogs/999
```

---

# `usePathname()` Hook

Next.js provides:

```jsx
usePathname();
```

to read the current URL.

Import:

```jsx
import { usePathname } from "next/navigation";
```

---

# Why `"use client"` is Required?

`usePathname()` is a **Client Component hook**.

It accesses browser information, so it **cannot** run inside a Server Component.

Therefore, the component must begin with:

```jsx
"use client";
```

---

# Example

```jsx
"use client";

import { usePathname } from "next/navigation";

export default function BlogNotFound() {
  const path = usePathname();

  return (
    <>
      <h1>Blog Not Found! {path}</h1>
      <p>Please enter a valid URL.</p>
    </>
  );
}
```

---

## Output

User visits:

```text
/blogs/999
```

Browser displays:

```text
Blog Not Found!
/blogs/999

Please enter a valid URL.
```

---

# Execution Flow

```text
User

↓

Visits

/blogs/999

↓

notFound()

↓

blogs/not-found.js

↓

"use client"

↓

usePathname()

↓

Reads

/blogs/999

↓

Displays

Blog Not Found!
/blogs/999
```

---

# Global vs Route-Specific 404

| Global              | Route-Specific           |
| ------------------- | ------------------------ |
| `app/not-found.js`  | `blogs/not-found.js`     |
| Used for entire app | Used only for that route |
| Common UI           | Customized UI            |

---

# Best Practices

✅ Use `notFound()` when requested data doesn't exist.

✅ Create a global `app/not-found.js` for a consistent experience.

✅ Create route-specific `not-found.js` files when different sections need customized messages.

✅ Use `usePathname()` only inside Client Components.

✅ Show helpful messages instead of generic errors.

---

# Common Mistakes

### Mistake 1

Calling:

```jsx
notFound;
```

instead of:

```jsx
notFound();
```

---

### Mistake 2

Using:

```jsx
usePathname();
```

inside a Server Component.

Always add:

```jsx
"use client";
```

---

### Mistake 3

Forgetting to import:

```jsx
notFound;
```

from:

```jsx
next / navigation;
```

---

# Key Takeaways

- Next.js automatically handles unknown routes with a 404 page.
- `notFound()` lets us trigger a 404 page manually.
- We can validate route parameters before rendering a page.
- `isNaN()` helps detect invalid numeric IDs.
- `app/not-found.js` creates a global custom 404 page.
- Route-specific `not-found.js` files customize 404 pages for specific sections.
- `usePathname()` reads the current URL.
- `usePathname()` requires a Client Component (`"use client"`).

---

# Quick Revision

### Which function displays a 404 page programmatically?

```jsx
notFound();
```

---

### Where is the global custom 404 page created?

```bash
app/not-found.js
```

---

### How do we create a Blog-specific 404 page?

```bash
app/blogs/not-found.js
```

---

### Which hook returns the current URL?

```jsx
usePathname();
```

---

### Why is `"use client"` required?

Because `usePathname()` is a Client Component hook.

---

# Interview Questions

### Q1. What is the purpose of `notFound()` in Next.js?

It programmatically stops rendering the current page and displays the nearest matching `not-found.js` page.

---

### Q2. What is the difference between a global and route-specific 404 page?

A global 404 page (`app/not-found.js`) is used across the entire application, while a route-specific `not-found.js` only applies to its own route segment.

---

### Q3. Why do we use `usePathname()`?

To read the current URL inside a Client Component.

---

### Q4. Why can't `usePathname()` be used in Server Components?

Because it relies on browser APIs that are only available on the client.

---

### Q5. How can you validate that a dynamic route parameter is numeric?

Use:

```jsx
if (Number.isNaN(Number(blog))) {
  notFound();
}
```

or, as shown in the lecture:

```jsx
if (isNaN(blog)) {
  notFound();
}
```

---

# Summary

In this lecture, we learned how to customize **404 pages** in Next.js. We explored how to manually trigger a 404 using `notFound()`, validate dynamic route parameters before rendering pages, create both global and route-specific `not-found.js` files, and display the invalid URL using the `usePathname()` hook. These features help build applications that provide a more user-friendly and professional experience when users navigate to invalid or unavailable resources.
