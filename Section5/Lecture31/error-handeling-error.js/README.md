# Lecture 31 - Error Handling in Server Components in Next.js

## 📖 Introduction

In previous lectures, we learned:

- Loading States (`loading.js`)
- Data Fetching
- Streaming
- Suspense

Now an important question arises:

> What happens if something goes wrong while rendering a page?

Examples:

```text
API Fails

Database Connection Fails

Invalid Data

Unexpected Exception
```

Without proper error handling:

```text
Application Crashes
```

To solve this problem, Next.js provides:

```text
error.js
```

which works similarly to:

```text
loading.js
```

but for errors.

---

# How Errors Occur?

Errors can occur anywhere.

Examples:

```jsx
throw new Error("Something Went Wrong");
```

---

```jsx
const user = null;

console.log(user.name);
```

Output:

```text
Cannot Read Property 'name'
```

---

```jsx
const response = await fetch("wrong-api-url");
```

API may fail.

---

```jsx
const result = 10 / 0;
```

Unexpected logic errors.

---

# How To Throw Error Explicitly?

Sometimes we intentionally throw errors.

Example:

```jsx
export default function Page() {
  throw new Error("Database Connection Failed");

  return <h1>Home</h1>;
}
```

---

Execution:

```text
Render Page

↓

Throw Error

↓

Rendering Stops
```

---

# Logging Errors on Server

Server Components execute on:

```text
Server
```

Therefore:

```jsx
console.log();
```

appears in:

```text
Terminal

↓

Node.js Console
```

not browser console.

---

Example:

```jsx
try {
  throw new Error("Database Error");
} catch (error) {
  console.log(error);
}
```

---

Output:

```text
Error:
Database Error
```

---

# Logging Error Messages

```jsx
try {
  throw new Error("Database Error");
} catch (error) {
  console.log(error.message);
}
```

Output:

```text
Database Error
```

---

# Logging Full Error Object

```jsx
try {
  throw new Error("Database Error");
} catch (error) {
  console.error(error);
}
```

Output:

```text
Error:
Database Error

Stack Trace...
```

---

# Best Practice

Instead of:

```jsx
console.log(error);
```

prefer:

```jsx
console.error(error);
```

because:

```text
Error Logs

↓

More Visible
```

inside server logs.

---

# What Happens If We Don't Handle Errors?

Example:

```jsx
export default function Page() {
  throw new Error("Database Failed");
}
```

---

# Development Mode

Run:

```bash
npm run dev
```

Next.js shows:

```text
Red Error Overlay
```

---

Visual:

```text
Runtime Error

Database Failed
```

with:

```text
Stack Trace

File Name

Line Number
```

---

Purpose:

```text
Developer Debugging
```

---

# Production Mode

Run:

```bash
npm run build

npm start
```

Now users do NOT see:

```text
Database Failed
```

because:

```text
Security Risk
```

---

Instead users see:

```text
Something Went Wrong
```

or

```text
Application Error
```

depending on configuration.

---

# Why Hide Errors In Production?

Imagine:

```text
Database Password Error

Internal File Path

Server Details
```

Showing these to users is dangerous.

Therefore Next.js hides internal information.

---

# Problem Without Error Handling

Without custom error handling:

```text
Error Occurs

↓

Page Crashes

↓

Poor User Experience
```

---

# Solution - error.js

Next.js provides:

```text
error.js
```

similar to:

```text
loading.js
```

---

# File Structure

```text
app/

└── services/
    ├── page.js
    └── error.js
```

---

# Example

```jsx
"use client";

export default function Error({ error, reset }) {
  return (
    <>
      <h1>Something Went Wrong</h1>

      <p>{error.message}</p>

      <button onClick={reset}>Try Again</button>
    </>
  );
}
```

---

# Important

`error.js` must be:

```jsx
"use client";
```

---

Why?

Because:

```text
Error Boundary

↓

React Client Feature
```

---

# What Happens Internally?

Suppose:

```jsx
throw new Error("Database Failed");
```

inside:

```jsx
page.js;
```

---

Execution:

```text
Render Page

↓

Error Occurs

↓

Next.js Detects Error

↓

Skip Page Rendering

↓

Render error.js

↓

Show Fallback UI
```

---

# Visualization

Normal Flow

```text
page.js

↓

HTML

↓

Browser
```

---

Error Flow

```text
page.js

↓

Error

↓

error.js

↓

Browser
```

---

# Why Is error.js Called An Error Fallback?

Because it acts as:

```text
Backup UI
```

when rendering fails.

---

Think:

```text
page.js

↓

Success?

YES

↓

Show Page

------------------

NO

↓

Show error.js
```

---

# Similarity with Suspense

Remember:

```jsx
<Suspense fallback={<Loading />}>
```

---

Flow:

```text
Loading

↓

Fallback UI
```

---

Error Boundary:

```text
Error

↓

Fallback UI
```

---

Very similar idea.

---

# Internal Structure (Conceptual)

You can think of Next.js doing something like:

```jsx
<ErrorBoundary fallback={<ErrorPage />}>
  <Page />
</ErrorBoundary>
```

---

When Page Works:

```text
Render Page
```

---

When Page Fails:

```text
Render ErrorPage
```

---

This is NOT actual Next.js source code,

but a useful mental model.

---

# Understanding `reset()`

Example:

```jsx
<button onClick={reset}>Try Again</button>
```

---

Purpose:

```text
Retry Rendering
```

---

Flow:

```text
Error

↓

Error UI

↓

User Clicks Retry

↓

Render Page Again
```

---

Useful for:

```text
Temporary API Failures

Network Issues

Server Glitches
```

---

# Route-Level Error Handling

Structure:

```text
app/

├── page.js

├── error.js
```

---

Error inside:

```text
page.js
```

↓

Handled by:

```text
error.js
```

---

# Nested Error Handling

Structure:

```text
app/

├── services/
│   ├── page.js
│   └── error.js
```

---

Now:

```text
Only Services Route
```

uses that error page.

---

Error in:

```text
/services
```

↓

Show:

```text
services/error.js
```

---

Other routes remain unaffected.

---

# Real World Example

Imagine:

```text
Dashboard
```

contains:

```text
Revenue

Orders

Users
```

---

Revenue API crashes.

Instead of:

```text
Whole Website Crashes
```

we show:

```text
Revenue Error

Try Again
```

Much better user experience.

---

# Loading.js vs Error.js

| loading.js            | error.js                  |
| --------------------- | ------------------------- |
| Handles Loading State | Handles Error State       |
| Shown While Waiting   | Shown When Error Occurs   |
| Based On Suspense     | Based On Error Boundaries |
| Temporary State       | Failure State             |

---

# Common Mistakes

### Mistake 1

Forgetting:

```jsx
"use client";
```

inside:

```jsx
error.js;
```

Result:

```text
Build Error
```

---

### Mistake 2

Thinking error.js catches every error.

It catches rendering errors in its route segment.

Not every possible server problem everywhere.

---

### Mistake 3

Showing sensitive details.

Avoid:

```jsx
<p>{error.stack}</p>
```

in production.

---

# Best Practices

✅ Use route-specific `error.js`.

✅ Keep error messages user-friendly.

✅ Log full errors on the server.

✅ Use `reset()` for retry functionality.

✅ Never expose sensitive server details.

---

# Key Takeaways

- Errors can occur during rendering, data fetching, or business logic.
- Server Component errors appear in terminal logs.
- Development mode shows detailed error overlays.
- Production mode hides internal details.
- `error.js` provides route-level error handling.
- `error.js` acts as an Error Boundary fallback UI.
- `reset()` allows retrying failed renders.
- `error.js` must be a Client Component.

---

# Quick Revision

### How to intentionally throw an error?

```jsx
throw new Error("Something Went Wrong");
```

---

### Where do Server Component logs appear?

```text
Terminal
```

---

### Which file handles route errors?

```text
error.js
```

---

### Must error.js use?

```jsx
"use client";
```

---

### What does reset() do?

Retries rendering.

---

# Interview Questions

### Q1. What is the purpose of `error.js` in Next.js?

It provides a route-level error boundary and fallback UI when rendering fails.

---

### Q2. Why must `error.js` be a Client Component?

Because React Error Boundaries are client-side features.

---

### Q3. What happens when an error occurs inside a route?

Next.js stops rendering the route and displays the corresponding `error.js` fallback UI.

---

### Q4. What is the difference between development and production error handling?

Development shows detailed debugging information, while production hides internal details for security.

---

### Q5. What does the `reset()` function do?

It retries rendering the route after an error occurs.

---

# Summary

In this lecture, we learned how error handling works in Next.js Server Components. We explored how errors occur, how to throw errors explicitly, and how errors appear differently in development and production environments. We also learned about the special `error.js` file, which acts as a route-level Error Boundary and displays a fallback UI whenever rendering fails. Finally, we saw how `reset()` allows users to retry failed renders and how Next.js internally uses Error Boundary concepts to provide a better user experience.
