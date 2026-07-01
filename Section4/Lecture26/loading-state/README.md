# Lecture 26 - Handling Loading State While Fetching Data in Next.js

## 📖 Introduction

In previous lectures, we learned:

- Server Components
- Data Fetching in Server Components
- Streaming
- Suspense

Now let's solve a common problem:

> What should users see while a page is still loading?

Imagine a page that fetches data from an API.

Example:

```text
/todos
```

If the API takes:

```text
3 seconds
```

Should users see:

```text
Blank Page
```

for 3 seconds?

Of course not.

We should show a loading UI.

Next.js provides a very simple way to do this.

---

# The Problem

Suppose:

```text
/todos
```

contains:

```jsx
export default async function Todos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");

  const data = await response.json();

  return (
    <>
      {data.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </>
  );
}
```

---

Execution:

```text
Request

↓

Fetch API

↓

Wait

↓

Receive Data

↓

Generate HTML

↓

Show Page
```

If API is slow:

```text
User Waits
```

without feedback.

---

# Solution - `loading.js`

Next.js automatically supports loading states.

Simply create:

```text
/todos
│
├── page.js
└── loading.js
```

---

# Example Structure

```text
app/
│
├── todos/
│   ├── page.js
│   └── loading.js
```

---

# Creating `loading.js`

Example:

```jsx
export default function Loading() {
  return <h1>Loading Todos...</h1>;
}
```

That's it.

No imports.

No configuration.

No Suspense required.

---

# How Does It Work?

When user visits:

```text
/todos
```

Next.js does:

```text
Request

↓

Start Rendering Page

↓

Data Still Loading?

↓

Show loading.js

↓

Data Arrives

↓

Replace Loading UI

↓

Show Actual Page
```

---

# Visual Timeline

Suppose API takes:

```text
3 seconds
```

---

## Time = 0

User visits:

```text
/todos
```

Browser shows:

```text
Loading Todos...
```

---

## Time = 3 Seconds

Data arrives.

Next.js automatically replaces:

```text
Loading Todos...
```

with:

```text
Todo 1

Todo 2

Todo 3
```

---

# Why Is This Possible?

Because Next.js App Router uses:

```text
Streaming
```

under the hood.

Remember from the Streaming lecture:

```text
Send What Is Ready

↓

Continue Rendering

↓

Replace Fallback UI
```

`loading.js` is simply a special fallback UI.

---

# Relationship Between Loading.js and Suspense

Many beginners think:

```text
loading.js

and

Suspense
```

are different features.

Actually:

```text
loading.js

↓

Built On Top Of

↓

React Suspense
```

---

Think of:

```text
loading.js
```

as:

```jsx
<Suspense fallback={<Loading />}>
  <Page />
</Suspense>
```

automatically created by Next.js.

---

# Execution Flow

Request:

```text
Browser

↓

/todos

↓

loading.js Appears

↓

page.js Continues Rendering

↓

Data Loaded

↓

Page Appears
```

---

# Real-Life Example

Imagine opening YouTube.

Without loading state:

```text
Blank Screen

↓

Wait

↓

Videos Appear
```

Poor experience.

---

With loading state:

```text
Loading Videos...

↓

Videos Appear
```

Much better.

---

# Nested Route Example

Structure:

```text
app/
│
├── services/
│   ├── page.js
│   └── loading.js
```

When user visits:

```text
/services
```

Loading UI:

```jsx
export default function Loading() {
  return <h1>Loading Services...</h1>;
}
```

will automatically appear while:

```text
services/page.js
```

is rendering.

---

# Route-Specific Loading States

Every route can have its own loading UI.

Example:

```text
app/
│
├── blogs/
│   ├── loading.js
│   └── page.js
│
├── products/
│   ├── loading.js
│   └── page.js
```

---

Blog Loading:

```text
Loading Blogs...
```

---

Product Loading:

```text
Loading Products...
```

---

Each route controls its own loading state.

---

# Loading.js Scope

Suppose:

```text
app/
│
├── dashboard/
│   ├── loading.js
│   ├── page.js
│   │
│   └── analytics/
│       └── page.js
```

The loading UI can apply to the route segment and its nested content while they are loading.

Think:

```text
dashboard

↓

loading.js

↓

Used For Dashboard Rendering
```

---

# Difference Between Loading.js and Client-Side Loading State

---

## React Approach

Usually:

```jsx
const [loading, setLoading] = useState(true);
```

Then:

```jsx
if (loading) {
  return <Loading />;
}
```

Manual work.

---

# Next.js Approach

Simply:

```text
loading.js
```

No state required.

No useEffect required.

No manual loading management.

---

# Example Comparison

## React

```jsx
const [loading, setLoading] = useState(true);

if (loading) {
  return <Loading />;
}
```

---

## Next.js

```text
loading.js
```

Done.

---

# Loading.js vs Suspense

## loading.js

```text
Route Level Loading
```

Example:

```text
/todos
```

---

## Suspense

```text
Component Level Loading
```

Example:

```jsx
<Suspense fallback={<Loading />}>
  <Comments />
</Suspense>
```

---

Think:

```text
loading.js

↓

Whole Route

----------------

Suspense

↓

Specific Component
```

---

# Real Example

Page:

```text
Blog

Views

Likes

Comments
```

---

Using:

```text
loading.js
```

User sees:

```text
Loading Blog...
```

until page loads.

---

Using:

```jsx
<Suspense>
```

User sees:

```text
Blog Content

Views Loading...

Likes Loading...

Comments Loading...
```

which is more granular.

---

# Best Practices

✅ Use `loading.js` for route-level loading experiences.

✅ Keep loading UI lightweight.

✅ Show meaningful loading text.

✅ Use Suspense when only specific parts of the page are slow.

---

# Common Mistakes

### Mistake 1

Putting `loading.js` in the wrong folder.

Wrong:

```text
app/
loading.js
```

when route-specific loading is needed.

---

Correct:

```text
app/
└── todos/
    ├── page.js
    └── loading.js
```

---

### Mistake 2

Thinking loading.js runs after data arrives.

Wrong.

It appears while data is still loading.

---

### Mistake 3

Thinking loading.js replaces Suspense.

It does not.

Suspense provides more fine-grained control.

---

# Key Takeaways

- `loading.js` provides route-level loading UI.
- It must be placed in the same route segment as `page.js`.
- Next.js automatically shows it while the page is loading.
- It is built on top of React Suspense.
- It improves user experience by preventing blank screens.
- No state management is required.

---

# Quick Revision

### How to create a loading state?

Create:

```text
loading.js
```

inside the route folder.

---

### Example Structure?

```text
/todos
├── page.js
└── loading.js
```

---

### When is loading.js shown?

While the page is rendering or fetching data.

---

### Is loading.js built on Suspense?

✅ Yes

---

### Route-level or Component-level?

```text
loading.js

↓

Route-Level
```

---

# Interview Questions

### Q1. What is `loading.js` in Next.js?

It is a special file that automatically displays a loading UI while a route segment is rendering.

---

### Q2. Where should `loading.js` be placed?

Inside the same route segment as the corresponding `page.js`.

---

### Q3. Does loading.js require useState?

No. Next.js automatically manages it.

---

### Q4. What technology powers loading.js internally?

React Suspense and Streaming.

---

### Q5. What is the difference between loading.js and Suspense?

`loading.js` provides route-level loading states, while Suspense provides component-level loading states.

---

# Summary

In this lecture, we learned how to handle loading states in Next.js using the special `loading.js` file. By placing `loading.js` inside a route folder, Next.js automatically displays the loading UI while the route is being rendered or data is being fetched. This feature is built on top of React Suspense and Streaming, allowing users to see meaningful feedback instead of a blank screen. Compared to traditional React loading states, `loading.js` requires no manual state management and provides a much simpler developer experience.
