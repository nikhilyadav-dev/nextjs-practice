# Lecture 7 - Nested Dynamic Routing in Next.js

## 📖 Introduction

In the previous lecture, we learned about **Dynamic Routing** using a single dynamic segment:

```text
/blogs/12
```

Folder Structure:

```bash
blogs/
└── [blog]/
    └── page.js
```

Output:

```js
{
  blog: "12";
}
```

But in real-world applications, a single dynamic segment is often not enough.

For example:

```text
Blog 12
   ↓
Comment 5
```

We need a way to access both:

```text
Blog ID
Comment ID
```

at the same time.

This is where **Nested Dynamic Routing** becomes useful.

---

# What is Nested Dynamic Routing?

Nested Dynamic Routing means:

> Using multiple dynamic route segments inside one route hierarchy.

Example:

```text
/blogs/12/comments/5
```

Here:

```text
12 → Blog ID
5  → Comment ID
```

Both values are dynamic.

---

# Why Do We Need Nested Dynamic Routing?

Imagine building a blogging platform like:

- Medium
- Dev.to
- Hashnode
- WordPress

Every blog contains:

- Blog Details
- Comments
- Replies
- Authors

Suppose we want to open:

Comment #5 on Blog #12

URL:

```text
/blogs/12/comments/5
```

Questions:

```text
Which Blog?
→ Blog 12

Which Comment?
→ Comment 5
```

A single dynamic route cannot handle this efficiently.

Therefore we need:

```text
Blog Slug
+
Comment Slug
```

This is called:

> Nested Dynamic Routing

---

# Folder Structure

The lecture used the following structure:

```bash
app/
│
└── blogs/
    │
    ├── page.js
    │
    └── [blog]/
        │
        ├── page.js
        │
        └── comments/
            │
            ├── page.js
            │
            └── [comment]/
                │
                └── page.js
```

---

# Generated Routes

| Folder Structure                        | Route                            |
| --------------------------------------- | -------------------------------- |
| blogs/page.js                           | `/blogs`                         |
| blogs/[blog]/page.js                    | `/blogs/:blog`                   |
| blogs/[blog]/comments/page.js           | `/blogs/:blog/comments`          |
| blogs/[blog]/comments/[comment]/page.js | `/blogs/:blog/comments/:comment` |

---

# Understanding Each Route

## Route 1

Folder:

```bash
blogs/page.js
```

URL:

```text
/blogs
```

Purpose:

```text
Show all blogs
```

Example:

```text
Blog 1
Blog 2
Blog 3
```

---

## Route 2

Folder:

```bash
blogs/[blog]/page.js
```

URL:

```text
/blogs/12
```

Output:

```js
{
  blog: "12";
}
```

Purpose:

```text
Show Blog 12
```

---

## Route 3

Folder:

```bash
blogs/[blog]/comments/page.js
```

URL:

```text
/blogs/12/comments
```

Purpose:

```text
Show all comments of Blog 12
```

---

## Route 4

Folder:

```bash
blogs/[blog]/comments/[comment]/page.js
```

URL:

```text
/blogs/12/comments/5
```

Purpose:

```text
Show Comment 5 of Blog 12
```

---

# Visualizing URL Segments

URL:

```text
/blogs/12/comments/5
```

Breakdown:

```text
blogs
  ↓
12
  ↓
comments
  ↓
5
```

Meaning:

```text
blogs      → Static Route
12         → Dynamic Blog Slug
comments   → Static Route
5          → Dynamic Comment Slug
```

---

# Understanding Slugs

Dynamic folders:

```bash
[blog]
[comment]
```

create:

```js
params.blog;
params.comment;
```

respectively.

---

# Example URL

```text
http://localhost:3000/blogs/12/comments/5
```

Next.js extracts:

```js
{
  blog: "12",
  comment: "5"
}
```

automatically.

---

# Code Example

### page.js

```jsx
export default async function Comment({ params }) {
  const { blog, comment } = await params;

  return (
    <>
      <h1>
        Comment No: <i>{comment}</i> On Blog: <i>{blog}</i>
      </h1>
    </>
  );
}
```

---

# How This Code Works

Suppose the URL is:

```text
/blogs/12/comments/5
```

Next.js automatically generates:

```js
{
  blog: "12",
  comment: "5"
}
```

---

## Step 1

Receive params:

```js
const { blog, comment } = await params;
```

Result:

```js
blog = "12";
comment = "5";
```

---

## Step 2

Render UI:

```jsx
<h1>Comment No: 5 On Blog: 12</h1>
```

Output:

```text
Comment No: 5 On Blog: 12
```

---

# Another Example

URL:

```text
/blogs/101/comments/25
```

Generated Object:

```js
{
  blog: "101",
  comment: "25"
}
```

Output:

```text
Comment No: 25 On Blog: 101
```

---

# Route Flow Diagram

```text
URL:
↓
/blogs/12/comments/5

Next.js Matches:

blogs
 ↓
[blog]
 ↓
comments
 ↓
[comment]

Creates:

{
  blog: "12",
  comment: "5"
}
```

---

# Real World Examples

## Blogging Website

```text
/blogs/12/comments/5
```

Meaning:

```text
Comment 5 on Blog 12
```

---

## E-Commerce Website

```text
/products/100/reviews/20
```

Meaning:

```text
Review 20 of Product 100
```

---

## Learning Platform

```text
/courses/react/lessons/5
```

Meaning:

```text
Lesson 5 of React Course
```

---

## Social Media

```text
/posts/50/comments/7
```

Meaning:

```text
Comment 7 on Post 50
```

---

# Benefits of Nested Dynamic Routing

✅ Supports complex applications

✅ Creates meaningful URLs

✅ Easily captures multiple dynamic values

✅ Better organization of routes

✅ Scalable architecture

✅ Cleaner codebase

---

# Common Mistakes

### Mistake 1

Expecting only one parameter.

URL:

```text
/blogs/12/comments/5
```

Actually provides:

```js
{
  blog: "12",
  comment: "5"
}
```

Not:

```js
{
  blog: "12";
}
```

---

### Mistake 2

Wrong folder structure.

Wrong:

```bash
blogs/
└── comments/
```

Correct:

```bash
blogs/
└── [blog]/
    └── comments/
        └── [comment]/
```

---

### Mistake 3

Using incorrect URL.

Folder:

```bash
[blog]
```

Correct:

```text
/blogs/12
```

Not:

```text
/blogs?id=12
```

---

# Key Takeaways

- Nested Dynamic Routing allows multiple dynamic segments.
- Dynamic folders are created using square brackets.
- `[blog]` creates `params.blog`.
- `[comment]` creates `params.comment`.
- URL values automatically become route parameters.
- Multiple slugs can exist in a single route.
- Useful for blogs, comments, products, reviews, courses, and social media applications.
- Next.js automatically extracts all dynamic values from the URL.

---

# Quick Revision

### What is Nested Dynamic Routing?

Using multiple dynamic route segments in one route hierarchy.

---

### What route does this create?

```bash
blogs/
└── [blog]/
    └── comments/
        └── [comment]/
```

Answer:

```text
/blogs/:blog/comments/:comment
```

---

### What is the output for:

```text
/blogs/12/comments/5
```

Answer:

```js
{
  blog: "12",
  comment: "5"
}
```

---

### Which folder creates `params.blog`?

```bash
[blog]
```

---

### Which folder creates `params.comment`?

```bash
[comment]
```

---

# Interview Questions

### Q1. What is Nested Dynamic Routing?

A routing technique where multiple dynamic route segments are used in a single URL hierarchy.

---

### Q2. What parameters are generated for this route?

```text
/blogs/12/comments/5
```

Answer:

```js
{
  blog: "12",
  comment: "5"
}
```

---

### Q3. How does Next.js create route parameters?

By using folder names wrapped in square brackets.

Example:

```bash
[id]
```

creates:

```js
params.id;
```

---

### Q4. Why is Nested Dynamic Routing useful?

It helps represent hierarchical data such as blogs → comments, products → reviews, and courses → lessons.

---

### Q5. What is the output of the provided code for URL:

```text
/blogs/50/comments/9
```

Answer:

```text
Comment No: 9 On Blog: 50
```

---

# Summary

In this lecture, we learned about Nested Dynamic Routing in Next.js. Unlike single dynamic routes, nested dynamic routes allow us to capture multiple dynamic values from a URL. Using folders like `[blog]` and `[comment]`, Next.js automatically extracts values into the `params` object. This feature is extremely useful for real-world applications such as blogging platforms, e-commerce websites, social media apps, and learning management systems where resources have hierarchical relationships.

---

### 📝 Notes will be updated as each lecture is completed. Feel free to ⭐ this repo if you find it helpful!
