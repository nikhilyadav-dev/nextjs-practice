# Lecture 25 - Data Fetching in Server Components

## 📖 Introduction

In the previous lecture, we learned:

```text
Client Component Data Fetching
```

using:

```jsx
"use client";

useEffect(() => {
  fetch(...);
}, []);
```

We learned that:

```text
HTML Generated

↓

Hydration

↓

API Call

↓

UI Updates
```

Now let's learn the preferred way of fetching data in Next.js:

# 🚀 Data Fetching in Server Components

This is one of the biggest advantages of Next.js over traditional React applications.

---

# Why Server Component Data Fetching?

Suppose we want to show:

```text
Blogs

Products

Users

Posts
```

from an API.

Question:

Should we:

```text
Send Empty UI

↓

Hydrate

↓

Fetch Data

↓

Update UI
```

or

```text
Fetch Data First

↓

Generate HTML

↓

Send Complete HTML
```

?

Next.js prefers the second approach.

---

# Example

```jsx
export default async function Users() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  const users = await response.json();

  return (
    <>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </>
  );
}
```

Notice:

```jsx
async function
```

This is possible because:

```text
Server Components
```

run on the server.

---

# Important Learning

## Server Components Can Be Async

Example:

```jsx
export default async function Page() {
  const response = await fetch(...);

  return <h1>Hello</h1>;
}
```

Perfectly valid.

---

# Why?

Because the component executes on:

```text
Server
```

before HTML is generated.

---

# Client Components Cannot Be Async

Wrong:

```jsx
"use client";

export default async function Page() {
  const response = await fetch(...);

  return <h1>Hello</h1>;
}
```

This causes an error.

---

# Why?

Because Client Components are React components that run in the browser.

React expects:

```jsx
function Component()
```

not:

```jsx
async function Component()
```

for Client Components.

---

# Server Fetch vs Client Fetch

This is one of the most important interview topics.

---

# Client Component Fetching

Example:

```jsx
"use client";

useEffect(() => {
  fetch("/api/users");
}, []);
```

---

Execution:

```text
Request Page

↓

Generate Initial HTML

↓

Send HTML

↓

Hydration

↓

API Call

↓

Receive Data

↓

Update UI
```

---

Visual:

```text
Browser

↓

Loading...

↓

Fetch API

↓

Show Data
```

---

# Server Component Fetching

Example:

```jsx
export default async function Users() {
  const response = await fetch(...);

  const data = await response.json();

  return <div>{data}</div>;
}
```

---

Execution:

```text
Request

↓

Server Fetch API

↓

Receive Data

↓

Generate HTML

↓

Send Complete HTML
```

---

Visual:

```text
Browser

↓

Receives Data Already Rendered
```

No loading state required.

---

# Comparison

| Client Fetch               | Server Fetch             |
| -------------------------- | ------------------------ |
| Runs In Browser            | Runs On Server           |
| Uses useEffect             | Uses async/await         |
| Data Arrives Later         | Data Arrives Before HTML |
| Loading State Often Needed | Usually Not Needed       |
| More Client Work           | Less Client Work         |
| Worse SEO                  | Better SEO               |

---

# Real Example

Imagine Instagram Feed.

---

## Client Fetch

```text
Open Feed

↓

Loading...

↓

Fetch Posts

↓

Show Posts
```

---

## Server Fetch

```text
Open Feed

↓

Server Fetches Posts

↓

Generate HTML

↓

Show Posts Immediately
```

Much better user experience.

---

# Is Node.js Fetch Different from Next.js Fetch?

Yes.

This is one of the most important Next.js concepts.

---

# Normal Node.js Fetch

Example:

```js
const response = await fetch(url);
```

Node.js simply:

```text
Request API

↓

Return Response
```

No special caching.

No revalidation.

No Next.js optimizations.

---

# Next.js Fetch

Next.js extends the standard Fetch API.

Meaning:

```jsx
fetch(url);
```

looks normal,

but Next.js adds extra features.

---

# Extra Features

Next.js Fetch supports:

```text
Caching

Revalidation

Deduplication

ISR Integration
```

---

# Example

```jsx
const response = await fetch("https://api.com/posts", {
  next: {
    revalidate: 60,
  },
});
```

Normal Node.js:

```text
Not Supported
```

---

Next.js:

```text
Supported
```

because Next.js wraps and enhances Fetch.

---

# Fetch Deduplication

Suppose:

```jsx
await fetch("/api/posts");
await fetch("/api/posts");
```

inside the same request.

Next.js can reuse results internally instead of making duplicate network requests.

This is a Next.js optimization.

---

# Page-Level Revalidation

Example:

```jsx
export const revalidate = 5;
```

---

Meaning:

```text
Entire Page

↓

Cache For 5 Seconds

↓

Then Regenerate
```

---

# Example

```jsx
export const revalidate = 5;

export default async function Page() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

  const data = await response.json();

  return <h1>{data.title}</h1>;
}
```

---

# Timeline

Build:

```text
Generate HTML

↓

Store HTML
```

---

User Visits:

```text
0 sec

↓

Serve Cached HTML
```

---

```text
3 sec

↓

Serve Cached HTML
```

---

```text
6 sec

↓

Cache Expired

↓

Regenerate Page

↓

Update Cache
```

---

# What Happens on Reload?

Suppose:

```jsx
export const revalidate = 5;
```

---

Reload at:

```text
2 seconds
```

Result:

```text
Cached Page Returned
```

No new fetch.

---

Reload at:

```text
6 seconds
```

Result:

```text
Cache Expired

↓

Fresh Fetch

↓

Regenerate Page
```

---

# Fetch-Level Revalidation

Instead of revalidating the entire page:

```jsx
fetch(url, {
  next: {
    revalidate: 5,
  },
});
```

revalidates only that fetch.

---

Example:

```jsx
const posts = await fetch("/api/posts", {
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

---

# Execution

Posts:

```text
Update Every 5 Seconds
```

---

Categories:

```text
Update Every 60 Seconds
```

---

Same page.

Different cache rules.

---

# Page-Level vs Fetch-Level Revalidation

## Page Level

```jsx
export const revalidate = 5;
```

Affects:

```text
Entire Route
```

---

Visual:

```text
Page

├── Posts
├── Categories
├── Sidebar
└── Footer

↓

Regenerate Everything
```

---

# Fetch Level

```jsx
fetch(url, {
  next: {
    revalidate: 5,
  },
});
```

Affects:

```text
Single Fetch Request
```

---

Visual:

```text
Posts

↓

5 Seconds

----------------

Categories

↓

60 Seconds
```

---

# Which One Wins?

Suppose:

```jsx
export const revalidate = 60;
```

and

```jsx
fetch(url, {
  next: {
    revalidate: 5,
  },
});
```

The lower revalidation value effectively controls how frequently that data is refreshed because Next.js chooses the more frequently updated requirement.

Think:

```text
Page Wants

60 sec

----------------

Fetch Wants

5 sec

----------------

Result

5 sec
```

---

# Real-World Example

E-commerce Website:

---

Product Information:

```text
iPhone 17
```

Rarely changes.

---

Stock Information:

```text
Only 5 Left
```

Changes frequently.

---

Implementation:

```jsx
const product = await fetch("/api/product", {
  next: {
    revalidate: 3600,
  },
});

const stock = await fetch("/api/stock", {
  next: {
    revalidate: 10,
  },
});
```

Result:

```text
Product

↓

1 Hour Cache

----------------

Stock

↓

10 Second Cache
```

Perfect optimization.

---

# Why Server Fetching is Usually Preferred

Because:

```text
Data

↓

HTML

↓

Browser
```

instead of:

```text
HTML

↓

Browser

↓

Fetch Data

↓

Update UI
```

Benefits:

✅ Better SEO

✅ Better Performance

✅ Faster Initial Page Load

✅ Smaller Client Bundle

✅ Less Browser Work

---

# Best Practices

✅ Fetch data in Server Components whenever possible.

✅ Use Client Component fetching only when data depends on user interaction.

✅ Use page-level revalidation for whole-page updates.

✅ Use fetch-level revalidation for fine-grained control.

---

# Common Mistakes

### Mistake 1

Using Client Component fetching for public data.

Server fetching is usually better.

---

### Mistake 2

Thinking Next.js fetch is identical to Node.js fetch.

Next.js fetch includes caching and revalidation features.

---

### Mistake 3

Using `revalidate` without understanding caching behavior.

Revalidation controls when cached data can be refreshed.

---

# Key Takeaways

- Server Components can be async.
- Client Components cannot be async components.
- Server fetching happens before HTML generation.
- Client fetching happens after hydration.
- Next.js extends the native Fetch API.
- Page-level revalidation affects the entire route.
- Fetch-level revalidation affects only a specific fetch request.
- Server-side fetching is usually preferred for public content.

---

# Quick Revision

### Can Server Components be async?

✅ Yes

---

### Can Client Components be async components?

❌ No

---

### Where does Server Fetch run?

On the server.

---

### Where does Client Fetch run?

In the browser.

---

### What does:

```jsx
export const revalidate = 5;
```

mean?

Regenerate the page after 5 seconds.

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

Revalidate only that fetch request every 5 seconds.

---

# Interview Questions

### Q1. Why can Server Components use async/await directly?

Because they execute on the server before HTML is generated.

---

### Q2. Why can't Client Components be async components?

Because React Client Components must return JSX synchronously, and browser-side async component rendering is not supported in this way.

---

### Q3. How is Next.js fetch different from Node.js fetch?

Next.js extends fetch with caching, revalidation, request deduplication, and ISR integration.

---

### Q4. What is the difference between page-level and fetch-level revalidation?

Page-level revalidation regenerates the entire route, while fetch-level revalidation only refreshes a specific fetch request.

---

### Q5. Which approach is usually preferred for public content?

Server Component data fetching, because it improves SEO and performance.

---

# Summary

In this lecture, we learned how data fetching works inside Server Components. Unlike Client Components, Server Components can directly use async/await and fetch data before generating HTML. This allows users to receive fully rendered content immediately without waiting for browser-side API calls. We also learned that Next.js extends the standard Fetch API with powerful features such as caching, revalidation, request deduplication, and ISR integration. Finally, we explored page-level and fetch-level revalidation and understood how they affect data freshness and caching behavior.
