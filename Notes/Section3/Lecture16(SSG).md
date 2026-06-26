# Lecture 16 - Static Site Generation (SSG)

## 📖 Introduction

In the previous lecture, we learned two rendering strategies in Next.js:

- Static Rendering
- Dynamic Rendering

We also learned that **Dynamic Routes (`[blogID]`) do not necessarily mean Dynamic Rendering**.

This raises an important question:

> **If a page uses a Dynamic Route, can it still be statically generated?**

The answer is **Yes**.

Next.js provides a feature called **Static Site Generation (SSG)** that allows us to generate HTML for dynamic routes **during the build process** instead of generating them for every request.

---

# What is Static Site Generation (SSG)?

Static Site Generation (SSG) is a rendering technique where Next.js **pre-generates HTML pages at build time**.

Instead of generating HTML every time a user visits a page, Next.js generates the HTML once during:

```bash
npm run build
```

and stores it inside the production build.

Whenever users request those pages later, the server simply returns the already generated HTML.

---

# Why Do We Need SSG?

Suppose we have a blog website.

Folder Structure:

```text
app/
└── blogs/
    └── [blogID]/
        └── page.js
```

Possible URLs:

```text
/blogs/1
/blogs/2
/blogs/3
```

If these blogs rarely change, generating HTML every time is unnecessary.

Instead, we can generate:

```text
Blog 1 HTML

Blog 2 HTML

Blog 3 HTML
```

during the build.

After deployment, these pages are already ready.

---

# Dynamic Rendering vs SSG

Without SSG:

```text
Browser

↓

GET /blogs/1

↓

Server

↓

Run page.js

↓

Generate HTML

↓

Return HTML
```

This process repeats for **every request**.

---

With SSG:

```text
npm run build

↓

Generate Blog 1 HTML

↓

Generate Blog 2 HTML

↓

Generate Blog 3 HTML

↓

Store HTML
```

Later,

```text
Browser

↓

GET /blogs/1

↓

Server

↓

Return Existing HTML
```

Notice:

The server **does not generate HTML again**.

---

# Why is SSG Faster than Dynamic Rendering?

Dynamic Rendering performs work **every time** a request arrives.

Example:

```text
100 Users Visit

↓

Generate HTML

100 Times
```

Server workload:

```text
100 HTML Generations
```

---

With SSG:

```text
Build

↓

Generate HTML Once
```

Later,

```text
100 Users Visit

↓

Return Existing HTML

100 Times
```

Server workload:

```text
Only Reads Existing HTML
```

This is much faster.

---

# Benefits of Static Site Generation

## 1. Faster Response Time

HTML already exists.

The server simply returns it.

---

## 2. Less Server Processing

The server does not execute the React component for every request.

This reduces CPU usage significantly.

---

## 3. Better Performance

Users receive ready-made HTML immediately.

---

## 4. Better SEO

Search engines receive complete HTML instantly.

---

## 5. Better Scalability

Thousands of users can access the same static page without requiring the server to generate HTML repeatedly.

---

# Practical Example

Suppose our project structure is:

```text
app/
└── blogs/
    └── [blogID]/
        └── page.js
```

Initially,

this is just a Dynamic Route.

Next.js doesn't know which blog IDs should be generated.

We need to tell Next.js.

---

# `generateStaticParams()`

Next.js provides a special function:

```jsx
export function generateStaticParams() {
  return [{ blogID: "1" }, { blogID: "2" }, { blogID: "3" }];
}
```

This function tells Next.js:

> "Generate static pages for these blog IDs."

---

# Understanding the Returned Array

The function returns:

```js
[{ blogID: "1" }, { blogID: "2" }, { blogID: "3" }];
```

Each object represents **one route**.

Meaning:

```text
{ blogID: "1" }

↓

Generate

/blogs/1
```

---

```text
{ blogID: "2" }

↓

Generate

/blogs/2
```

---

```text
{ blogID: "3" }

↓

Generate

/blogs/3
```

---

# What Happens During Build?

Suppose we run:

```bash
npm run build
```

Execution Flow:

```text
Build Starts

↓

Calls generateStaticParams()

↓

Receives

[
 { blogID: "1" },
 { blogID: "2" },
 { blogID: "3" }
]

↓

Visits

/blogs/1

↓

Runs page.js

↓

Generates HTML

↓

Stores HTML

--------------------

Visits

/blogs/2

↓

Runs page.js

↓

Generates HTML

↓

Stores HTML

--------------------

Visits

/blogs/3

↓

Runs page.js

↓

Generates HTML

↓

Stores HTML
```

Notice something important.

Next.js is actually **visiting every returned slug during the build**.

---

# Visual Representation

```text
generateStaticParams()

↓

Returns

1
2
3

↓

Next.js

↓

Generate HTML

↓

Blog 1

Blog 2

Blog 3
```

---

# Browser Request

Now suppose a user requests:

```text
/blogs/2
```

Flow:

```text
Browser

↓

GET /blogs/2

↓

Server

↓

Already Has HTML

↓

Returns HTML
```

No rendering happens at request time.

---

# Proving That Server Rendering Doesn't Happen Again

A great way to verify this is by adding a console statement inside your page component.

Example:

```jsx
export default function Blog({ params }) {
  console.log("Rendering Blog Page");

  return <h1>Blog</h1>;
}
```

Now compare two scenarios.

### Without SSG (Dynamic Rendering)

Every request:

```text
/blogs/1

↓

Console:

Rendering Blog Page
```

appears because the server executes the page on every request.

---

### With SSG

During:

```bash
npm run build
```

Console:

```text
Rendering Blog Page
Rendering Blog Page
Rendering Blog Page
```

appears once for each generated page.

Later, when users visit:

```text
/blogs/1
```

the page is served from the pre-generated HTML.

The component does not need to be executed again for every request because the HTML already exists.

> **Note:** Depending on the environment (development vs production) and framework optimizations, you may still observe some logs during development. To understand true SSG behavior, always test using a **production build** (`npm run build` followed by `npm start`).

---

# Key Takeaways

- SSG is used to statically generate Dynamic Routes.
- `generateStaticParams()` tells Next.js which dynamic routes should be generated.
- HTML is created during `npm run build`.
- Users receive ready-made HTML.
- The server avoids generating HTML repeatedly.
- SSG provides excellent performance and scalability.

---

# Generating Static Pages Using an API

In the previous example, we manually returned:

```jsx
export function generateStaticParams() {
  return [{ blogID: "1" }, { blogID: "2" }, { blogID: "3" }];
}
```

This works fine for a few pages.

But imagine a real blog website with:

- 100 blogs
- 500 blogs
- 10,000 blogs

Manually writing every blog ID is impossible.

Instead, we fetch all available blog IDs from an API or a database.

---

# Why Can `generateStaticParams()` Be Async?

Since data usually comes from an API or a database, Next.js allows this function to be asynchronous.

Example:

```jsx
export async function generateStaticParams() {
  // Fetch data here
}
```

This means Next.js waits for the data before generating the pages.

---

# Practical Example Using JSONPlaceholder

We'll use the free JSONPlaceholder API.

```jsx
export async function generateStaticParams() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");

  const data = await response.json();

  return data.map(({ id }) => {
    return {
      blogID: `${id}`,
    };
  });
}
```

---

# Understanding the Code Step by Step

## Step 1 — Fetch Data

```jsx
const response = await fetch("https://jsonplaceholder.typicode.com/todos");
```

Next.js sends a request to the API during the **build process**, not when a user visits the page.

The API returns data like:

```json
[
  {
    "userId": 1,
    "id": 1,
    "title": "...",
    "completed": false
  },
  {
    "userId": 1,
    "id": 2,
    "title": "...",
    "completed": true
  }
]
```

---

## Step 2 — Convert Response to JSON

```jsx
const data = await response.json();
```

Now `data` becomes an array of JavaScript objects.

Example:

```js
[
  {
    id: 1,
    title: "...",
  },
  {
    id: 2,
    title: "...",
  },
  {
    id: 3,
    title: "...",
  },
];
```

---

## Step 3 — Create Route Parameters

```jsx
return data.map(({ id }) => {
  return {
    blogID: `${id}`,
  };
});
```

This converts:

```js
[{ id: 1 }, { id: 2 }, { id: 3 }];
```

into:

```js
[{ blogID: "1" }, { blogID: "2" }, { blogID: "3" }];
```

Notice:

The object key **must match** the dynamic folder name.

Folder:

```text
[blogID]
```

↓

Return:

```js
{
  blogID: "1";
}
```

If your folder were:

```text
[id]
```

you would return:

```js
{
  id: "1";
}
```

---

# What Happens During `npm run build`?

Imagine the API returns **200 todos**.

Build Flow:

```text
npm run build

↓

Call generateStaticParams()

↓

Fetch API

↓

Receive 200 Todos

↓

Extract IDs

↓

[
 { blogID: "1" },
 { blogID: "2" },
 ...
 { blogID: "200" }
]

↓

Next.js Starts Generating Pages
```

---

# Build Process Visualization

```text
Build

↓

Fetch API

↓

Get IDs

↓

1

↓

Generate

/blogs/1

----------------

2

↓

Generate

/blogs/2

----------------

3

↓

Generate

/blogs/3

----------------

...

----------------

200

↓

Generate

/blogs/200
```

At the end of the build, Next.js has already generated HTML for all 200 blog pages.

---

# Browser Request

Now the browser requests:

```text
/blogs/150
```

Flow:

```text
Browser

↓

GET /blogs/150

↓

Server

↓

Already Has HTML

↓

Returns HTML
```

No API request is made during page rendering because everything was prepared during the build.

---

# Build Time vs Request Time

## Build Time

```text
Fetch API

↓

Generate Routes

↓

Generate HTML

↓

Store HTML
```

---

## Request Time

```text
Browser

↓

Request Page

↓

Return Existing HTML
```

This is why SSG is so fast.

---

# Real-World Examples

## Blog Website

Fetch all published blog IDs.

Generate:

```text
/blogs/1
/blogs/2
/blogs/3
```

during the build.

---

## E-Commerce Website

Fetch all product IDs.

Generate:

```text
/products/101
/products/102
/products/103
```

during the build.

---

## Documentation Website

Fetch all documentation slugs.

Generate:

```text
/docs/react

/docs/nextjs

/docs/nodejs
```

during the build.

---

# Benefits of Fetching Data During Build

✅ No API call when users visit the page.

✅ Faster response time.

✅ Better SEO.

✅ Reduced server workload.

✅ Excellent scalability.

---

# Common Mistakes

### Mistake 1

Returning the wrong key.

Folder:

```text
[blogID]
```

Wrong:

```js
return {
  id: "1",
};
```

Correct:

```js
return {
  blogID: "1",
};
```

---

### Mistake 2

Forgetting to return an array.

Wrong:

```js
return {
  blogID: "1",
};
```

Correct:

```js
return [
  {
    blogID: "1",
  },
];
```

---

### Mistake 3

Thinking `generateStaticParams()` runs every time a user visits the page.

It only runs during the build process.

---

# Best Practices

✅ Use `generateStaticParams()` when the list of dynamic routes is known at build time.

✅ Fetch only the data needed to generate route parameters (such as IDs or slugs).

✅ Ensure the returned object keys exactly match the names of the dynamic folders.

✅ Use SSG for content that changes infrequently, such as blogs, documentation, and product catalogs.

---

# Key Takeaways

- `generateStaticParams()` can be asynchronous.
- It commonly fetches route parameters from APIs or databases.
- Next.js calls it during `npm run build`.
- Every returned object generates one static page.
- Users receive pre-generated HTML without waiting for server-side rendering.

---

# Quick Revision

### When does `generateStaticParams()` run?

During:

```text
npm run build
```

---

### Why is it usually async?

Because route parameters are often fetched from an API or database.

---

### What should it return?

An array of objects.

Example:

```js
[{ blogID: "1" }, { blogID: "2" }];
```

---

### What determines the object key?

The name of the dynamic folder.

Example:

```text
[blogID]
```

↓

```js
{
  blogID: "1";
}
```

---

# Interview Questions

### Q1. Why is `generateStaticParams()` useful?

It allows Next.js to statically generate dynamic routes during the build process.

---

### Q2. Can `generateStaticParams()` fetch data from an API?

Yes. It is commonly used to fetch IDs or slugs from APIs or databases.

---

### Q3. When does `generateStaticParams()` execute?

Only during the production build, not on every user request.

---

### Q4. What should `generateStaticParams()` return?

An array of objects where each object represents one dynamic route.

---

### Q5. Why is SSG generally faster than Dynamic Rendering?

Because the HTML is already generated during the build, so the server simply serves existing files instead of generating HTML for every request.

---

# Summary

In this lecture, we learned how **Static Site Generation (SSG)** works for dynamic routes using `generateStaticParams()`. Instead of manually specifying route parameters, we can fetch them from an API or database during the build process. Next.js then generates a static HTML page for each returned parameter, allowing users to receive pre-rendered pages with excellent performance, scalability, and SEO.
