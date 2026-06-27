# Lecture 19 - Dynamically Rendering Static Pages

## 📖 Introduction

In previous lectures, we learned:

### Static Rendering

```text
Build Time

↓

Generate HTML

↓

Store HTML

↓

Serve Same HTML To Everyone
```

---

### Dynamic Rendering

```text
Request

↓

Generate HTML

↓

Return HTML
```

---

Now an important question arises:

> What if Next.js thinks a page is static, but we want it to become dynamic?

This lecture explains exactly that.

---

# What is Dynamically Rendering a Static Page?

Suppose we have:

```jsx
export default function Services() {
  return <h1>Services Page</h1>;
}
```

This page contains:

- No API call
- No Cookies
- No Search Params
- No User-Specific Data

Next.js sees:

```text
Static Content
```

and automatically chooses:

```text
Static Rendering
```

---

Now imagine we want:

```text
Different users

↓

Different content
```

or

```text
Fresh content on every request
```

In that case, we need to convert the page into a:

```text
Dynamic Page
```

even though it originally looked static.

This process is commonly called:

> Dynamically Rendering a Static Page

---

# Real-Life Example

Suppose we have:

```text
/dashboard
```

Page Structure:

```jsx
export default function Dashboard() {
  return <h1>Dashboard</h1>;
}
```

Initially:

```text
Static Page
```

---

Now requirement changes.

We want:

```text
User A

↓

Welcome Nikhil

----------------

User B

↓

Welcome Rahul
```

The page now depends on:

```text
Current User
```

which is request-specific data.

Therefore:

```text
Static Rendering

↓

Dynamic Rendering
```

---

# How Does Next.js Decide?

By default:

```jsx
export const dynamic = "auto";
```

This is the default behavior.

Next.js analyzes the page.

If it finds:

```text
Static Content
```

↓

Uses:

```text
Static Rendering
```

---

If it finds:

```text
Cookies
Headers
Search Params
Uncached Fetches
```

↓

Uses:

```text
Dynamic Rendering
```

automatically.

---

# Method 1 - `dynamic`

Next.js provides:

```jsx
export const dynamic = "...";
```

to explicitly control rendering.

---

# `force-dynamic`

Example:

```jsx
export const dynamic = "force-dynamic";
```

Meaning:

```text
Always Render Dynamically
```

Even if the page could be statically generated.

---

Example:

```jsx
export const dynamic = "force-dynamic";

export default function Services() {
  return <h1>Services</h1>;
}
```

Normally:

```text
Static
```

Now:

```text
Dynamic
```

because we forced it.

---

## Execution Flow

Every request:

```text
Browser

↓

Request

↓

Execute Component

↓

Generate HTML

↓

Return HTML
```

---

# Real-Life Example

Current Time Page:

```jsx
export const dynamic = "force-dynamic";

export default function Time() {
  return <h1>{Date.now()}</h1>;
}
```

Every refresh:

```text
New Time
```

because HTML is regenerated every request.

---

# `force-static`

Example:

```jsx
export const dynamic = "force-static";
```

Meaning:

```text
Always Use Static Rendering
```

Even if Next.js might otherwise choose dynamic behavior.

---

Example:

```jsx
export const dynamic = "force-static";

export default function About() {
  return <h1>About Us</h1>;
}
```

Generated:

```text
Build Time
```

and reused.

---

# Real-Life Example

Company Website:

```text
About
Mission
Vision
History
```

Content rarely changes.

Perfect for:

```jsx
force - static;
```

---

# `error`

Example:

```jsx
export const dynamic = "error";
```

Meaning:

```text
Throw an Error
```

if anything forces dynamic rendering.

---

Example:

```jsx
export const dynamic = "error";
```

Then later:

```jsx
const myCookies = cookies();
```

Next.js throws an error because cookies require dynamic rendering.

---

Why is this useful?

To guarantee that a page always remains static.

---

# Real-Life Example

Documentation Website

```text
/docs/react
/docs/nextjs
/docs/nodejs
```

You want:

```text
100% Static
```

No accidental dynamic behavior.

Use:

```jsx
dynamic = "error";
```

---

# `auto` (Default)

Example:

```jsx
export const dynamic = "auto";
```

This is the default behavior.

Meaning:

```text
Let Next.js Decide
```

Next.js analyzes the page.

---

If page contains:

```jsx
return <h1>Home</h1>;
```

↓

Static

---

If page contains:

```jsx
cookies();
```

↓

Dynamic

---

If page contains:

```jsx
searchParams;
```

↓

Dynamic

---

If page contains:

```jsx
fetch(...,{
 cache:"no-store"
})
```

↓

Dynamic

---

# Summary of Dynamic Values

| Value             | Meaning                             |
| ----------------- | ----------------------------------- |
| `"auto"`          | Next.js decides                     |
| `"force-static"`  | Always static                       |
| `"force-dynamic"` | Always dynamic                      |
| `"error"`         | Throw error if page becomes dynamic |

---

# Method 2 - Using Search Params

Example URL:

```text
/services?category=web&price=100
```

Query String:

```text
?category=web&price=100
```

becomes:

```js
{
 category:"web",
 price:"100"
}
```

---

Example:

```jsx
export default async function Services({ searchParams }) {
  const search = await searchParams;

  console.log(search);

  return <h1>Services</h1>;
}
```

Output:

```js
{
 category:"web",
 price:"100"
}
```

---

# Why Does This Make the Page Dynamic?

Because every request may contain different query parameters.

Example:

Request 1:

```text
/services?category=web
```

Output:

```js
{
  category: "web";
}
```

---

Request 2:

```text
/services?category=app
```

Output:

```js
{
  category: "app";
}
```

---

Since output depends on the request,

Next.js cannot generate one static HTML for everyone.

Therefore:

```text
Dynamic Rendering
```

---

# Real-Life Examples

### Product Filters

```text
/products?category=mobile
```

---

### Search

```text
/search?q=iphone
```

---

### Sorting

```text
/products?sort=price
```

---

# Method 3 - Using Cookies

Example:

```jsx
import { cookies } from "next/headers";

export default async function Services() {
  const myCookies = await cookies();

  console.log(myCookies);

  return <h1>Services</h1>;
}
```

---

# Why Does This Make the Page Dynamic?

Cookies are different for every user.

Example:

User A:

```text
theme=dark
```

---

User B:

```text
theme=light
```

---

User C:

```text
language=hindi
```

---

Because output depends on the current request,

Next.js cannot pre-generate a single HTML page.

Therefore:

```text
Dynamic Rendering
```

---

# Real-Life Examples of Cookies

### Authentication

```text
Logged-In User
```

---

### Theme

```text
Dark Mode
Light Mode
```

---

### Language

```text
English
Hindi
French
```

---

### Session Data

```text
Current User Information
```

---

# Other Ways to Make a Page Dynamic

---

# Using Headers

```jsx
import { headers } from "next/headers";

export default async function Page() {
  const headerList = await headers();

  return <h1>Page</h1>;
}
```

Headers depend on the incoming request.

Therefore:

```text
Dynamic Rendering
```

---

# Using `cache: "no-store"`

Example:

```jsx
const response = await fetch("https://api.com/data", {
  cache: "no-store",
});
```

Meaning:

```text
Never Cache

↓

Always Fetch Fresh Data

↓

Dynamic Rendering
```

---

# Using Request-Time Data

Examples:

```text
Current User

Current Time

IP Address

Location

Authentication
```

All of these require dynamic rendering.

---

# Static vs Dynamic Trigger Table

| Feature          | Static | Dynamic |
| ---------------- | ------ | ------- |
| Plain JSX        | ✅     | ❌      |
| searchParams     | ❌     | ✅      |
| cookies()        | ❌     | ✅      |
| headers()        | ❌     | ✅      |
| cache:"no-store" | ❌     | ✅      |
| force-dynamic    | ❌     | ✅      |

---

# Why Would We Force Dynamic Rendering?

Use Dynamic Rendering when:

- Data changes frequently
- Content differs per user
- Authentication is required
- Search and filters are used
- Real-time information is needed

---

# Best Practices

✅ Use `auto` unless you have a specific reason to override it.

✅ Use `force-static` for content that rarely changes.

✅ Use `force-dynamic` only when every request requires fresh HTML.

✅ Use cookies and search params only when request-specific content is needed.

---

# Common Mistakes

### Mistake 1

Thinking dynamic routes automatically mean dynamic rendering.

Wrong.

```text
[blogID]
```

can still be statically generated.

---

### Mistake 2

Using:

```jsx
force - dynamic;
```

for pages that never change.

This wastes server resources.

---

### Mistake 3

Thinking cookies work in static pages.

Cookies require request-specific information.

Therefore they trigger dynamic rendering.

---

# Key Takeaways

- Next.js automatically chooses Static or Dynamic Rendering using `auto`.
- `force-dynamic` forces request-time rendering.
- `force-static` forces build-time rendering.
- `error` prevents accidental dynamic behavior.
- `searchParams`, `cookies()`, and `headers()` trigger dynamic rendering because they depend on the current request.
- Dynamic Rendering is useful for user-specific and frequently changing content.

---

# Quick Revision

### Force dynamic rendering?

```jsx
export const dynamic = "force-dynamic";
```

---

### Force static rendering?

```jsx
export const dynamic = "force-static";
```

---

### Default value?

```jsx
export const dynamic = "auto";
```

---

### Throw error on dynamic usage?

```jsx
export const dynamic = "error";
```

---

### Which APIs trigger dynamic rendering?

```text
searchParams
cookies()
headers()
cache:"no-store"
```

---

# Interview Questions

### Q1. What is `dynamic = "force-dynamic"`?

It forces Next.js to render the page dynamically on every request.

---

### Q2. What does `dynamic = "auto"` do?

It allows Next.js to automatically decide whether the page should be statically or dynamically rendered.

---

### Q3. Why do cookies trigger dynamic rendering?

Because cookie values are different for each request and user.

---

### Q4. What is the purpose of `dynamic = "error"`?

It prevents accidental dynamic rendering by throwing an error if request-time data is used.

---

### Q5. Can `searchParams` make a page dynamic?

Yes. Different query parameters can produce different output, so Next.js treats the page as dynamic.
