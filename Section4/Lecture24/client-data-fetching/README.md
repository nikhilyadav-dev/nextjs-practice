# Lecture 24 - Data Fetching in Client Components

## 📖 Introduction

In previous lectures, we learned:

- Server Components
- Client Components
- Hydration
- Streaming
- SSR vs CSR

Now an important question arises:

> If a component is marked with `"use client"`, how does data fetching work?

Many beginners assume:

```text
"use client"

↓

Pure CSR (React/Vite Style)
```

This is not completely correct.

Understanding this properly is very important because it helps explain:

- Why Next.js pages don't become blank
- How hydration works
- When API calls happen
- Difference between Next.js and React Vite

---

# First Important Question

## Does `"use client"` Mean Pure Client-Side Rendering?

Many students think:

```jsx
"use client";

export default function Likes() {
  return <h1>Likes</h1>;
}
```

becomes:

```text
React/Vite Style CSR
```

Wrong.

---

# What Actually Happens?

Client Components are rendered:

```text
Server

↓

Browser
```

both.

Remember from the previous lecture:

```text
Client Component

↓

Server Render

↓

HTML Generated

↓

Send HTML

↓

Send JS

↓

Hydration

↓

Browser Executes Again
```

---

# Example

```jsx
"use client";

export default function Page() {
  return <h1>Hello World</h1>;
}
```

Request Flow:

```text
Browser

↓

Request

↓

Server Executes Component

↓

Generate HTML

↓

Send HTML

↓

Send JS

↓

Browser Hydrates
```

---

# What Does Browser Initially Receive?

Not:

```html
<div id="root"></div>
```

like React Vite.

Instead:

```html
<h1>Hello World</h1>
```

already exists.

Therefore:

```text
Client Component

≠

Pure CSR
```

---

# React Vite vs Next.js Client Component

## React Vite

Server sends:

```html
<div id="root"></div>
```

Then:

```text
Download JS

↓

Run React

↓

Generate UI
```

---

## Next.js Client Component

Server sends:

```html
<h1>Hello World</h1>
```

Then:

```text
Download JS

↓

Hydration

↓

Interactivity Starts
```

---

# Visual Comparison

## React Vite

```text
Request

↓

Blank HTML

↓

Download JS

↓

Generate UI
```

---

## Next.js Client Component

```text
Request

↓

Pre-rendered HTML

↓

Download JS

↓

Hydration
```

---

# Why Is This Better?

Because users can immediately see content.

Instead of:

```text
Blank Page

↓

Loading

↓

Content
```

they see:

```text
Content

↓

Hydration

↓

Interactive Content
```

---

# Data Fetching in Client Components

Suppose:

```jsx
"use client";

import { useEffect } from "react";

export default function Users() {
  useEffect(() => {
    fetch("/api/users");
  }, []);

  return <h1>Users</h1>;
}
```

Question:

When does API call happen?

---

# Execution Flow

## Server Render

Server executes:

```jsx
return <h1>Users</h1>;
```

HTML:

```html
<h1>Users</h1>
```

generated.

---

Important:

```jsx
useEffect();
```

does NOT run on server.

---

Server sends:

```html
<h1>Users</h1>
```

to browser.

---

# Browser Hydration

JavaScript loads.

Hydration starts.

---

Now:

```jsx
useEffect();
```

runs.

---

API Call Happens

```text
Browser

↓

fetch("/api/users")

↓

Receive Data

↓

Update State

↓

Re-render UI
```

---

# Visual Timeline

```text
Request

↓

Server Generates HTML

↓

HTML Visible

↓

JS Downloads

↓

Hydration

↓

useEffect Runs

↓

API Call

↓

State Update

↓

New UI
```

---

# Practical Example

```jsx
"use client";

import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </>
  );
}
```

---

# What Happens Here?

## Server Render

Initial State:

```jsx
users = [];
```

Server generates:

```html
(empty list)
```

---

Browser sees:

```text
Nothing
```

or loading UI if provided.

---

# After Hydration

```jsx
useEffect();
```

runs.

---

API Call:

```text
Fetch Users
```

---

State Updated:

```jsx
setUsers(data);
```

---

React Re-renders:

```html
John Mike David
```

appear.

---

# Why Do We Usually Show Loading State?

Without loading state:

```text
Page Appears Empty
```

until API completes.

---

Example:

```jsx
const [loading, setLoading] = useState(true);
```

---

UI:

```jsx
if (loading) {
  return <h1>Loading...</h1>;
}
```

---

User Experience:

```text
Loading...

↓

Users Loaded
```

---

# Important Observation

Notice something:

```text
HTML Was Generated On Server

BUT

Data Was Fetched In Browser
```

This is different from Server Components.

---

# Server Component Data Fetching

Example:

```jsx
export default async function Users() {
  const res = await fetch(...);

  const data = await res.json();

  return <div>{data}</div>;
}
```

---

Flow:

```text
Server

↓

Fetch API

↓

Generate HTML

↓

Send Complete HTML
```

Browser immediately sees data.

---

# Client Component Data Fetching

Example:

```jsx
"use client";
```

-

```jsx
useEffect();
```

---

Flow:

```text
Server

↓

Generate Initial HTML

↓

Browser

↓

Hydration

↓

Fetch API

↓

Update UI
```

---

# Comparison

## Server Component

```text
Request

↓

Fetch API

↓

Generate HTML

↓

Send HTML
```

---

Browser receives:

```text
Data Already Present
```

---

## Client Component

```text
Request

↓

Generate Initial HTML

↓

Send HTML

↓

Hydration

↓

Fetch API

↓

Update UI
```

---

Browser initially sees:

```text
Loading State
```

or empty state.

---

# Real Example

Imagine Instagram.

---

## Server Component

Server already knows:

```text
Posts
```

before sending page.

User sees:

```text
Posts Immediately
```

---

## Client Component

User first sees:

```text
Loading Posts...
```

then:

```text
Posts Loaded
```

after API call.

---

# Common Misconception

### Wrong Thinking

```text
"use client"

↓

Server Doesn't Execute Component
```

Wrong.

Server still executes Client Components for initial HTML generation.

---

### Correct Thinking

```text
"use client"

↓

Server Render

+

Browser Render
```

---

# Another Misconception

### Wrong

```text
Client Component

↓

Blank HTML
```

Wrong.

That is React/Vite CSR.

---

### Correct

```text
Client Component

↓

Pre-rendered HTML

↓

Hydration
```

---

# When Should We Fetch Data in Client Components?

Use Client Component fetching when:

- Data depends on user interaction.
- Search functionality.
- Infinite scrolling.
- Live updates.
- User-specific dashboard widgets.
- Browser APIs are required.

---

# When Should We Prefer Server Components?

When:

- Data is needed immediately.
- SEO matters.
- Better performance is required.
- Content is public.
- Initial page load is important.

---

# Interview Question

### Does `"use client"` make the page fully CSR like React Vite?

No.

Client Components are still pre-rendered on the server to generate initial HTML.

Afterward, JavaScript is sent to the browser and hydration occurs.

---

# Key Takeaways

- `"use client"` does NOT mean pure CSR.
- Client Components render on both server and browser.
- Server generates initial HTML.
- Browser hydrates the component.
- `useEffect()` runs only in the browser.
- API calls inside `useEffect()` happen after hydration.
- Server Components fetch data before HTML is generated.
- Client Components usually show loading states while data is being fetched.

---

# Quick Revision

### Does `"use client"` mean React Vite style CSR?

❌ No

---

### Does server execute Client Components?

✅ Yes

---

### When does `useEffect()` run?

Only in the browser after hydration.

---

### When does API fetching happen in Client Components?

After hydration.

---

### What does browser initially receive?

Pre-rendered HTML, not a blank page.

---

# Summary

In this lecture, we learned how data fetching works inside Client Components. Even though a component is marked with `"use client"`, Next.js still renders it on the server to generate initial HTML. Unlike React Vite, Next.js does not send a blank HTML page. Instead, it sends pre-rendered HTML and later hydrates the component in the browser. When data is fetched using `useEffect()`, the API call occurs after hydration, which means users may initially see a loading state before the fetched data appears. This makes Client Component data fetching fundamentally different from Server Component data fetching.
