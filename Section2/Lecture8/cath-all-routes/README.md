# Lecture 8 - Catch-All Routes in Next.js

## 📖 Introduction

In previous lectures, we learned:

- Static Routing
- Nested Routing
- Dynamic Routing
- Nested Dynamic Routing

But there is still one problem.

Suppose we are building:

- Google Drive
- File Manager
- Dropbox
- Cloud Storage System
- Documentation Website

where folders can be nested infinitely.

Example URLs:

```text
/files/images
/files/images/profile
/files/images/profile/user.png
/files/documents/college/notes/dbms.pdf
/files/projects/web/react/project1
```

How many nested dynamic folders will we create?

```bash
[folder1]
[folder2]
[folder3]
[folder4]
...
```

This becomes impossible to maintain.

To solve this problem, Next.js provides:

> Catch-All Routes

---

# Why Do We Need Catch-All Routes?

Imagine building a file explorer.

Folder Structure:

```text
Files
 ├── Images
 │    ├── Profile
 │    │      └── user.png
 │
 ├── Documents
 │    ├── Notes
 │    │      └── dbms.pdf
 │
 └── Projects
      └── React
```

Possible URLs:

```text
/files/images
/files/images/profile
/files/images/profile/user.png
/files/documents/notes/dbms.pdf
/files/projects/react
```

The nesting depth is unknown.

Without Catch-All Routes:

```bash
[folder]
  └── [subfolder]
       └── [childfolder]
            └── [anotherfolder]
```

Question:

```text
How much nesting will you hardcode?
```

Answer:

```text
You can't predict it.
```

This is exactly the problem Catch-All Routes solve.

---

# What is a Catch-All Route?

A Catch-All Route captures:

```text
One Segment
Two Segments
Three Segments
Four Segments
Unlimited Segments
```

using a single route definition.

Syntax:

```bash
[...filePath]
```

Anything written inside:

```text
[... ]
```

becomes a Catch-All Route.

---

# Creating a Catch-All Route

Folder Structure:

```bash
app/
│
└── [...filePath]/
     └── page.js
```

---

# How It Works

URL:

```text
/files
```

Captured Value:

```js
{
  filePath: ["files"];
}
```

---

URL:

```text
/files/images
```

Captured Value:

```js
{
  filePath: ["files", "images"];
}
```

---

URL:

```text
/files/images/profile
```

Captured Value:

```js
{
  filePath: ["files", "images", "profile"];
}
```

---

URL:

```text
/files/images/profile/user.png
```

Captured Value:

```js
{
  filePath: ["files", "images", "profile", "user.png"];
}
```

---

# Understanding the Output

Unlike normal dynamic routes:

```js
{
  blog: "12";
}
```

Catch-All Routes return:

```js
{
  filePath: [];
}
```

as an array because multiple segments can be captured.

---

# Example

Folder:

```bash
app/
└── [...filePath]/
    └── page.js
```

Code:

```jsx
export default async function Page({ params }) {
  const { filePath } = await params;

  console.log(filePath);

  return <h1>Catch All Route</h1>;
}
```

---

URL:

```text
/files/images/profile/user.png
```

Output:

```js
["files", "images", "profile", "user.png"];
```

---

# Route Priority in Next.js

### Important

Catch-All Routes do NOT override existing routes.

Next.js always gives priority to:

```text
Static Routes
```

first.

---

Example:

Folder Structure:

```bash
app/
│
├── about/
│   └── page.js
│
└── [...filePath]/
    └── page.js
```

---

URL:

```text
/about
```

Result:

```text
about/page.js
```

runs.

NOT

```text
[...filePath]
```

---

Why?

Because:

```text
Static Route > Catch-All Route
```

Priority Rule:

```text
Static Route
      ↓
Dynamic Route
      ↓
Catch-All Route
```

---

# When Does Catch-All Route Execute?

Only when:

```text
No Matching Route Exists
```

Example:

Existing Route:

```text
/about
```

URL:

```text
/about
```

Result:

```text
about/page.js
```

---

URL:

```text
/random-page
```

Result:

```text
[...filePath]
```

captures it.

---

# Real-World File Explorer Example

Folder Structure:

```bash
app/
│
└── files/
    │
    ├── page.js
    │
    └── [...files]/
         └── page.js
```

---

Generated Routes

```text
/files
/files/images
/files/images/profile
/files/images/profile/user.png
```

---

Example URL

```text
/files/image.png
```

Output:

```js
{
  files: ["image.png"];
}
```

---

URL:

```text
/files/images/profile/user.png
```

Output:

```js
{
  files: ["images", "profile", "user.png"];
}
```

---

# Required Catch-All Routes

Syntax:

```bash
[...files]
```

This means:

```text
At least one segment is required.
```

---

Example

Folder:

```bash
files/
└── [...files]/
```

---

Works:

```text
/files/image.png
/files/images/profile
```

---

Does NOT Work:

```text
/files
```

Result:

```text
404 Page Not Found
```

Because:

```text
After /files
something is required.
```

---

# Fixing the Problem

To support:

```text
/files
```

we need:

```bash
files/
│
├── page.js
│
└── [...files]/
```

Now:

```text
/files
```

is handled by:

```text
files/page.js
```

and

```text
/files/images
```

is handled by:

```text
[...files]
```

---

# Optional Catch-All Routes

Next.js provides:

```bash
[[...files]]
```

Notice:

```text
Double Square Brackets
```

---

Meaning:

```text
The segments are optional.
```

---

Folder Structure

```bash
app/
└── files/
    └── [[...files]]/
        └── page.js
```

---

Now These All Work

```text
/files
/files/images
/files/images/profile
/files/images/profile/user.png
```

No additional:

```bash
page.js
```

inside `files/` is required.

---

# Required vs Optional Catch-All Routes

## Required Catch-All Route

Syntax:

```bash
[...files]
```

Requirement:

```text
At least one path segment required
```

Examples:

```text
/files/images
/files/profile
```

Works ✅

---

```text
/files
```

Fails ❌

---

## Optional Catch-All Route

Syntax:

```bash
[[...files]]
```

Requirement:

```text
Path segment is optional
```

Examples:

```text
/files
/files/images
/files/profile/user.png
```

All work ✅

---

# Important Note

### Required Catch-All Route

Can be defined directly at the app level.

Example:

```bash
app/
└── [...slug]/
```

This is valid.

---

### Optional Catch-All Route

Generally used inside route segments like:

```bash
app/
└── files/
    └── [[...files]]/
```

because its primary purpose is to make nested segments optional.

---

# Real World Use Cases

### File Explorer

```text
/files/images/profile/user.png
```

---

### Documentation Website

```text
/docs/react/hooks/useState
```

---

### Google Drive Clone

```text
/drive/folder1/folder2/folder3
```

---

### Category System

```text
/products/electronics/laptops/gaming
```

---

### CMS Platforms

```text
/blog/2025/june/nextjs-routing
```

---

# Key Takeaways

- Catch-All Routes capture unlimited URL segments.
- Syntax:

```bash
[...slug]
```

- Output is always an array.
- Useful when nesting depth is unknown.
- Static routes always get higher priority.
- Catch-All routes execute only when a matching route is not found.
- Required Catch-All Routes require at least one segment.
- Optional Catch-All Routes allow zero or more segments.
- Optional Catch-All Routes use:

```bash
[[...slug]]
```

---

# Quick Revision

### What is a Catch-All Route?

A route that captures multiple URL segments using a single dynamic route.

---

### Syntax?

```bash
[...slug]
```

---

### What does it return?

An array.

Example:

```js
{
  slug: ["a", "b", "c"];
}
```

---

### What is an Optional Catch-All Route?

A Catch-All Route where the path segment is optional.

Syntax:

```bash
[[...slug]]
```

---

### Which route has higher priority?

```text
Static Route
```

---

# Interview Questions

### Q1. What is a Catch-All Route in Next.js?

A route that captures multiple path segments using a single dynamic route definition.

---

### Q2. What is the difference between `[...slug]` and `[[...slug]]`?

`[...slug]` requires at least one segment, while `[[...slug]]` allows zero or more segments.

---

### Q3. Why are Catch-All Routes useful?

They help handle unknown or deeply nested routes without hardcoding multiple dynamic folders.

---

### Q4. What does this URL produce?

```text
/files/images/profile
```

for:

```bash
[...files]
```

Answer:

```js
{
  files: ["images", "profile"];
}
```

---

### Q5. Which route gets priority?

```text
/about
```

or

```text
[...slug]
```

Answer:

```text
/about
```

because static routes have higher priority.

---

# Summary

In this lecture, we learned about Catch-All Routes and Optional Catch-All Routes in Next.js. These routes allow us to capture an unlimited number of URL segments using a single route definition, making them ideal for file explorers, documentation systems, cloud storage applications, and deeply nested categories. We also learned the priority order of routes, the difference between required and optional catch-all routes, and how Next.js converts captured segments into arrays.

---

### 📝 Notes will be updated as each lecture is completed. Feel free to ⭐ this repo if you find it helpful!
