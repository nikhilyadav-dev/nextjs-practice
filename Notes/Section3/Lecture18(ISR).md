# Lecture 18 - Incremental Static Regeneration (ISR)

## 📖 Introduction

In previous lectures, we learned:

### Static Site Generation (SSG)

```text
Build Time

↓

Generate HTML

↓

Store HTML

↓

Serve Same HTML Forever
```

### Dynamic Rendering

```text
Request

↓

Generate HTML

↓

Return HTML
```

Now a problem arises.

---

# The Problem with SSG

Suppose we have a Blog Website.

Blog:

```text
/blogs/1
```

During build:

```bash
npm run build
```

Next.js generates:

```html
<h1>Learning Next.js</h1>
```

and stores it.

---

After deployment, the blog author updates the title.

Old Title:

```text
Learning Next.js
```

New Title:

```text
Mastering Next.js
```

Question:

Will users see the updated title?

Answer:

❌ No

Because the HTML was generated during the build.

The server keeps serving the old HTML.

To update it, we must rebuild the entire application.

```bash
npm run build
```

again.

---

## Problem Summary

### SSG

Advantages:

```text
Fast
SEO Friendly
Low Server Load
```

Disadvantage:

```text
Data Can Become Outdated
```

---

# The Problem with Dynamic Rendering

Dynamic Rendering solves the freshness problem.

Every request:

```text
Browser

↓

Server

↓

Fetch Latest Data

↓

Generate HTML

↓

Return HTML
```

Users always receive fresh content.

---

## Problem Summary

### Dynamic Rendering

Advantages:

```text
Always Fresh Data
```

Disadvantages:

```text
More Server Work
Slower Than Static
HTML Generated On Every Request
```

---

# What is ISR?

ISR stands for:

```text
Incremental Static Regeneration
```

ISR combines the benefits of:

```text
SSG

+

Dynamic Rendering
```

Think of ISR as:

```text
Static Page

↓

Serve Cached HTML

↓

After Some Time

↓

Regenerate Automatically

↓

Serve Updated HTML
```

---

# Definition

Incremental Static Regeneration (ISR) allows Next.js to:

> Generate pages statically at build time and automatically regenerate them after a specified interval.

---

# Why Do We Need ISR?

We want:

✅ Fast pages like SSG

and

✅ Fresh data like Dynamic Rendering

ISR provides both.

---

# Understanding ISR Visually

## SSG

```text
Build

↓

Generate HTML

↓

Store HTML

↓

Serve Forever
```

---

## Dynamic Rendering

```text
Request

↓

Generate HTML

↓

Return HTML
```

---

## ISR

```text
Build

↓

Generate HTML

↓

Store HTML

↓

Serve Cached Version

↓

Cache Expires

↓

Regenerate HTML

↓

Store New Version
```

---

# Page-Level Revalidation

Next.js allows ISR using:

```jsx
export const revalidate = 5;
```

Example:

```jsx
export const revalidate = 5;

export default function Page() {
  return <h1>Blogs</h1>;
}
```

Meaning:

```text
Cache this page

↓

Keep it for 5 seconds

↓

After 5 seconds

↓

Allow regeneration
```

---

# Understanding `revalidate`

```jsx
export const revalidate = 5;
```

means:

```text
This page can remain cached for 5 seconds.
```

After that:

```text
Next.js can regenerate it.
```

---

# Timeline Example

Suppose:

```jsx
export const revalidate = 5;
```

Current Blog Title:

```text
Learning Next.js
```

---

## Build Time

```text
Generate HTML

↓

Store HTML
```

---

## Time = 0 Seconds

User visits:

```text
/blogs/1
```

Output:

```text
Learning Next.js
```

---

## Time = 2 Seconds

User visits again.

Output:

```text
Learning Next.js
```

Still using cached HTML.

---

## Time = 4 Seconds

User visits again.

Output:

```text
Learning Next.js
```

Still cached.

---

## Time = 6 Seconds

Cache lifetime exceeded.

User visits.

Next.js does:

```text
Serve Existing Cached Page

↓

Start Regeneration In Background

↓

Generate New HTML

↓

Replace Old Cache
```

Important:

The user does **not** wait.

They still receive a response immediately.

---

## Next Request

User visits again.

Output:

```text
Updated HTML
```

because regeneration has already completed.

---

# Why Is It Called Incremental Static Regeneration?

Let's break the name.

---

## Static

Because pages are stored as static HTML.

---

## Regeneration

Because pages can be rebuilt.

---

## Incremental

Because only affected pages are regenerated.

Not the entire application.

---

# Your Lecture Example

```jsx
export const revalidate = 5;

export default async function Blog({ params }) {
  const { blogID } = await params;

  console.log("blogID:", blogID);

  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

  const data = await response.json();

  return <h1>{data.title}</h1>;
}
```

---

## Execution Flow

Build:

```text
Fetch API

↓

Generate HTML

↓

Store HTML
```

---

Requests During First 5 Seconds:

```text
Return Cached HTML
```

---

After 5 Seconds:

```text
Request Arrives

↓

Serve Cached HTML

↓

Fetch Fresh API Data

↓

Generate New HTML

↓

Update Cache
```

---

# Fetch-Level Revalidation

Instead of revalidating the entire page,

Next.js can revalidate individual fetch requests.

Example:

```jsx
const response = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
  next: {
    revalidate: 5,
  },
});
```

---

# What Does This Mean?

```text
Cache This API Response

↓

Keep For 5 Seconds

↓

Fetch Fresh Data

↓

Update Cache
```

---

# Page Revalidate vs Fetch Revalidate

This is one of the most important interview concepts.

---

## Page-Level Revalidate

```jsx
export const revalidate = 5;
```

Affects:

```text
Entire Route
```

Everything on the page is regenerated.

---

Visual:

```text
Page

├── Blogs
├── Categories
├── Sidebar
└── Footer

↓

Entire Page Regenerated
```

---

## Fetch-Level Revalidate

```jsx
fetch(url, {
  next: {
    revalidate: 5,
  },
});
```

Affects:

```text
Only That Fetch Request
```

---

Visual:

```text
Blogs API

↓

Revalidate Every 5 Seconds

----------------------

Categories API

↓

Revalidate Every 60 Seconds
```

---

# Example

```jsx
const blogs = await fetch("/api/blogs", {
  next: {
    revalidate: 5,
  },
});

const categories = await fetch("/api/categories", {
  next: {
    revalidate: 60,
  },
});
```

Result:

```text
Blogs

↓

Update Every 5 Seconds

----------------------

Categories

↓

Update Every 60 Seconds
```

Each fetch can have its own cache policy.

---

# Real-World Example

Imagine an e-commerce website.

---

## Product Information

```text
iPhone 17
```

Changes very rarely.

Can be cached for:

```text
24 Hours
```

---

## Stock Count

```text
Only 5 Left
```

Changes frequently.

Can be cached for:

```text
10 Seconds
```

---

Implementation:

```jsx
const product = await fetch("/api/product", {
  next: {
    revalidate: 86400,
  },
});

const stock = await fetch("/api/stock", {
  next: {
    revalidate: 10,
  },
});
```

---

# SSG vs ISR vs Dynamic Rendering

| Feature          | SSG            | ISR                  | Dynamic                  |
| ---------------- | -------------- | -------------------- | ------------------------ |
| Build-Time HTML  | ✅             | ✅                   | ❌                       |
| Auto Updates     | ❌             | ✅                   | ✅                       |
| Fresh Data       | ❌             | Partial              | ✅                       |
| Fast Performance | ✅             | ✅                   | ❌                       |
| Server Work      | Low            | Medium               | High                     |
| Best For         | Static Content | Semi-Dynamic Content | Frequently Changing Data |

---

# When Should We Use ISR?

Use ISR when:

- Content changes occasionally.
- Rebuilding the entire application is expensive.
- You want fast pages and fresh data.

Examples:

- Blogs
- News Articles
- E-Commerce Products
- Documentation Websites
- Marketing Pages

---

# When Should We Avoid ISR?

Avoid ISR when data must always be up-to-date.

Examples:

- Live Sports Scores
- Stock Market Prices
- Real-Time Chat
- Live Dashboards

For these cases:

```text
Dynamic Rendering
```

is usually better.

---

# Common Misconceptions

### Mistake 1

Thinking ISR regenerates pages exactly after:

```text
5 seconds
```

Wrong.

ISR regenerates only when a request arrives after the cache expires.

---

### Mistake 2

Thinking users wait during regeneration.

Wrong.

Next.js serves cached content first and regenerates in the background.

---

### Mistake 3

Confusing page revalidation with fetch revalidation.

Page:

```jsx
export const revalidate = 5;
```

Fetch:

```jsx
fetch(url, {
  next: {
    revalidate: 5,
  },
});
```

They are related but operate at different levels.

---

# Key Takeaways

- ISR combines the advantages of SSG and Dynamic Rendering.
- Pages are generated statically and automatically regenerated later.
- `export const revalidate = 5` enables page-level ISR.
- `fetch(...,{ next:{ revalidate:5 } })` enables fetch-level ISR.
- ISR provides fast pages while keeping data reasonably fresh.
- Regeneration happens in the background after cache expiration.

---

# Quick Revision

### What does ISR stand for?

```text
Incremental Static Regeneration
```

---

### What does:

```jsx
export const revalidate = 5;
```

mean?

Revalidate the page after 5 seconds.

---

### What does:

```jsx
fetch(url, {
  next: {
    revalidate: 5,
  },
});
```

mean?

Cache the fetch result for 5 seconds.

---

### Is ISR static or dynamic?

Both.

It starts as static and periodically regenerates.

---

### Does ISR regenerate the entire application?

No.

Only affected pages are regenerated.

---

# Interview Questions

### Q1. What is ISR?

ISR is a Next.js rendering strategy that generates pages statically and automatically regenerates them after a specified interval.

---

### Q2. Why is ISR useful?

It combines the speed of static pages with the freshness of dynamic data.

---

### Q3. What is the difference between SSG and ISR?

SSG generates pages once during the build, while ISR can regenerate pages automatically after deployment.

---

### Q4. What is the difference between page-level and fetch-level revalidation?

Page-level revalidation affects the entire route, while fetch-level revalidation only affects a specific fetch request.

---

### Q5. Does ISR regenerate pages immediately after the revalidate time expires?

No. Regeneration happens when a request arrives after the cache has expired.

---

# Summary

In this lecture, we learned about **Incremental Static Regeneration (ISR)**, a rendering strategy that combines the speed of Static Site Generation with the freshness of Dynamic Rendering. ISR allows Next.js to generate pages during the build process, cache them, and automatically regenerate them after a specified interval using `revalidate`. We also explored fetch-level revalidation, where individual API requests can have their own cache durations. ISR is ideal for applications such as blogs, e-commerce websites, and documentation platforms where content changes occasionally but not on every request.
