# Lecture 6 - Dynamic Routing and Props in Next.js

## 📖 Introduction

In previous lectures, we learned how to create static routes such as:

```text
/
/about
/services
/contact
```

But in real-world applications, we often don't know all routes beforehand.

Examples:

```text
/blogs/1
/blogs/2
/blogs/3
/blogs/100
/products/101
/products/102
/users/nikhil
/users/rahul
```

Creating a separate folder and page for every blog, product, or user is impossible.

To solve this problem, Next.js provides:

- Dynamic Routing
- Route Parameters (params)
- Query Parameters (searchParams)

---

# Props in Next.js

In App Router, page components receive props from Next.js.

These props are:

```js
{
  (params, searchParams);
}
```

Both are provided by Next.js automatically.

Example:

```jsx
export default async function Home({ params, searchParams }) {
  console.log(await params);
  console.log(await searchParams);

  return <h1>Hello Next.js</h1>;
}
```

---

# Understanding the Props Object

The page receives:

```js
{
  params: Promise,
  searchParams: Promise
}
```

When resolved:

```js
await params;
await searchParams;
```

Initially, if nothing is passed through the URL:

```js
{
}
{
}
```

Output:

```js
params = {};
searchParams = {};
```

---

# What is searchParams?

`searchParams` is used to read values passed in the URL using query strings.

Example URL:

```text
http://localhost:3000/?name=nikhil&age=22
```

Everything after:

```text
?
```

is called a query string.

---

# Passing Values Using searchParams

URL:

```text
http://localhost:3000/?name=nikhil&age=22
```

Page:

```jsx
export default async function Home({ searchParams }) {
  console.log(await searchParams);

  return <h1>Home Page</h1>;
}
```

Output:

```js
{
  name: "nikhil",
  age: "22"
}
```

---

# Query String Structure

```text
?key=value
```

Example:

```text
?name=nikhil
```

Multiple values:

```text
?name=nikhil&age=22
```

Result:

```js
{
  name: "nikhil",
  age: "22"
}
```

---

# Real-World Uses of searchParams

### Search Feature

```text
/products?search=laptop
```

---

### Filtering

```text
/products?category=electronics
```

---

### Sorting

```text
/products?sort=price
```

---

### Pagination

```text
/products?page=2
```

---

# What is Dynamic Routing?

Dynamic Routing allows us to create routes whose values change dynamically.

Instead of:

```bash
blogs/
├── blog1/page.js
├── blog2/page.js
├── blog3/page.js
```

we create:

```bash
blogs/
└── [blog]/
    └── page.js
```

This single page can handle unlimited blog routes.

---

# Problem Without Dynamic Routing

Suppose we have:

```text
1000 blogs
```

Without Dynamic Routing:

```bash
blogs/
├── blog1/
├── blog2/
├── blog3/
├── blog4/
...
├── blog1000/
```

This is impossible to maintain.

---

# Solution: Dynamic Route Segment

Create:

```bash
app/
│
└── blogs/
    │
    └── [blog]/
        │
        └── page.js
```

The square brackets:

```text
[blog]
```

tell Next.js:

> "This part of the URL is dynamic."

---

# Understanding Slugs

A slug is the dynamic value passed in the URL.

Example:

```text
/blogs/12
```

Here:

```text
12
```

is the slug value.

---

# Example

Folder Structure:

```bash
app/
└── blogs/
    └── [blog]/
        └── page.js
```

URL:

```text
http://localhost:3000/blogs/12
```

---

# Receiving the Slug

```jsx
export default async function Blog({ params }) {
  console.log(await params);

  return <h1>Blog Page</h1>;
}
```

Output:

```js
{
  blog: "12";
}
```

---

# Why "blog" Key Appears?

Folder Name:

```text
[blog]
```

Because the folder name is:

```text
blog
```

Next.js creates:

```js
{
  blog: "12";
}
```

---

# Another Example

Folder:

```bash
products/
└── [id]/
    └── page.js
```

URL:

```text
/products/101
```

Output:

```js
{
  id: "101";
}
```

---

# Visual Representation

Folder:

```bash
blogs/
└── [blog]/
    └── page.js
```

Request:

```text
/blogs/12
```

Flow:

```text
12
 ↓
Stored in
 ↓
params.blog
```

Output:

```js
{
  blog: "12";
}
```

---

# Single-Level Dynamic Routing

The example discussed in the lecture is:

```bash
blogs/
└── [blog]/
    └── page.js
```

This is called:

> Single-Level Dynamic Routing

Because only one dynamic segment exists.

Example:

```text
/blogs/12
```

Output:

```js
{
  blog: "12";
}
```

---

# Combining params and searchParams

URL:

```text
/blogs/12?author=nikhil
```

Code:

```jsx
export default async function Blog({ params, searchParams }) {
  console.log(await params);
  console.log(await searchParams);

  return <h1>Blog Page</h1>;
}
```

Output:

```js
params: {
  blog: "12";
}
```

```js
searchParams: {
  author: "nikhil";
}
```

---

# params vs searchParams

| Feature      | params                | searchParams           |
| ------------ | --------------------- | ---------------------- |
| Source       | Dynamic Route Segment | Query String           |
| URL Position | Path                  | After `?`              |
| Example      | `/blogs/12`           | `?author=nikhil`       |
| Result       | `{ blog: "12" }`      | `{ author: "nikhil" }` |

---

# Folder Structure Examples

### Dynamic Blog Route

```bash
app/
└── blogs/
    └── [blog]/
        └── page.js
```

Route:

```text
/blogs/anything
```

---

### Dynamic Product Route

```bash
app/
└── products/
    └── [id]/
        └── page.js
```

Route:

```text
/products/101
/products/500
/products/999
```

---

# Benefits of Dynamic Routing

✅ Less Code

✅ Scalable Structure

✅ Handles Unlimited Routes

✅ Perfect for Blogs

✅ Perfect for Products

✅ Perfect for User Profiles

---

# Common Mistakes

### Mistake 1

Creating separate pages for every blog:

```bash
blog1/
blog2/
blog3/
```

Use:

```bash
[blog]/
```

instead.

---

### Mistake 2

Confusing params with searchParams.

Wrong Thinking:

```text
/blogs/12
```

comes from searchParams ❌

Correct:

```text
/blogs/12
```

comes from params ✅

---

### Mistake 3

Using query string for route segments.

Wrong:

```text
/blogs?id=12
```

when the route is dynamic.

Better:

```text
/blogs/12
```

---

# Key Takeaways

- Next.js pages receive `params` and `searchParams`.
- `searchParams` reads query strings from the URL.
- `params` reads values from dynamic routes.
- Dynamic routes are created using square brackets.
- `[blog]` creates a dynamic segment named `blog`.
- Slugs are values passed through dynamic routes.
- `/blogs/12` results in `{ blog: "12" }`.
- Dynamic Routing helps create scalable applications.
- The lecture covered Single-Level Dynamic Routing.

---

# Quick Revision

### What props does a page receive?

```js
{
  (params, searchParams);
}
```

---

### What is searchParams used for?

Reading query strings.

Example:

```text
?name=nikhil
```

---

### What is params used for?

Reading dynamic route values.

Example:

```text
/blogs/12
```

---

### How do we create a dynamic route?

```bash
[blog]
```

---

### What is a slug?

The dynamic value passed in the URL.

Example:

```text
/blogs/12
```

Slug:

```text
12
```

---

# Interview Questions

### Q1. What is Dynamic Routing in Next.js?

A routing system where route segments can change dynamically using square brackets.

---

### Q2. How do we create a dynamic route?

```bash
[id]
```

or

```bash
[blog]
```

---

### Q3. What is the difference between params and searchParams?

`params` comes from dynamic route segments, while `searchParams` comes from query strings.

---

### Q4. What is a slug?

A dynamic value passed inside the URL path.

Example:

```text
/blogs/12
```

where `12` is the slug.

---

### Q5. What is the output of this URL?

```text
/blogs/12
```

for folder:

```bash
blogs/
└── [blog]/
```

Answer:

```js
{
  blog: "12";
}
```

---

# Summary

In this lecture, we learned how Next.js passes `params` and `searchParams` to page components. We explored how query strings work using `searchParams`, how dynamic routing works using route segments like `[blog]`, and how slugs are extracted through `params`. Dynamic Routing allows a single page to handle unlimited routes, making applications more scalable and maintainable.

---

### 📝 Notes will be updated as each lecture is completed. Feel free to ⭐ this repo if you find it helpful!
