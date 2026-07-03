# Lecture 34 - Handling Client-Side Exceptions in Next.js

## 📖 Introduction

In previous lectures, we learned:

- Server Component Errors
- `error.js`
- Nested Route Error Handling
- `global-error.js`
- Error Recovery using `reset()`

Now an important question arises:

> What happens when an error occurs inside a Client Component?

Example:

```jsx
"use client";

export default function Likes() {
  throw new Error("Likes Failed");

  return <div>Likes</div>;
}
```

Is this handled the same way as Server Component errors?

Not exactly.

To understand this, we must first understand:

```text
Server Errors

vs

Client Errors
```

---

# Server-Side Error vs Client-Side Error

## Server-Side Error

Occurs when code executes on:

```text
Server
```

Examples:

```jsx
export default async function Page() {
  throw new Error("Database Failed");
}
```

---

Execution:

```text
Server

↓

Error

↓

HTML Cannot Be Generated
```

---

Examples:

```text
Database Failure

API Failure

File System Error

Server Component Error
```

---

# Client-Side Error

Occurs when code executes on:

```text
Browser
```

Example:

```jsx
"use client";

export default function Likes() {
  throw new Error("Likes Failed");
}
```

---

Execution:

```text
Browser

↓

Component Render

↓

Error
```

---

Examples:

```text
useState Error

Event Handler Error

DOM Error

Browser API Error

Client Component Error
```

---

# Visual Comparison

## Server Error

```text
Request

↓

Server Component

↓

Error

↓

HTML Not Generated
```

---

## Client Error

```text
HTML Generated

↓

Hydration

↓

Client Component Executes

↓

Error
```

---

# Why Are They Different?

Because they happen in different environments.

---

## Server Error

Occurs in:

```text
Node.js Runtime
```

---

## Client Error

Occurs in:

```text
Browser Runtime
```

---

# Why Does Digest ID Appear In Server Errors?

You may have seen:

```text
Error:
Something Went Wrong

Digest: 123456789
```

---

Question:

Why does Next.js show:

```text
Digest ID
```

for server errors?

---

# Reason

Production applications should NOT expose:

```text
Database Names

File Paths

API Keys

Internal Logic
```

to users.

---

Therefore:

```text
Actual Server Error

↓

Hidden

↓

Digest ID Generated
```

---

Example:

```text
Database Password Invalid
```

becomes:

```text
Digest:
87273627
```

---

Developer can:

```text
Check Server Logs

↓

Match Digest

↓

Find Real Error
```

---

# Why Doesn't Client Error Have Digest ID?

Because:

```text
Client Error

↓

Already Running In Browser
```

---

User already has access to:

```text
JavaScript

Component Tree

Browser Console
```

---

Nothing sensitive needs to be hidden.

Therefore:

```text
Real Error Message
```

can be shown.

---

# Why Is Client Error Stack Shown In Browser?

Example:

```jsx
"use client";

export default function Likes() {
  throw new Error("Likes Failed");
}
```

---

Browser can directly inspect:

```text
Component

Line Number

File Name

Stack Trace
```

because the code is already running there.

---

Example Browser Output:

```text
Error:
Likes Failed

at Likes()

at page.js:12
```

---

# Why Is Server Stack Not Shown?

Server stack may contain:

```text
Internal Files

Database Queries

Server Paths
```

which should remain private.

---

# How Client-Side Errors Are Generated

Example 1

```jsx
"use client";

export default function Page() {
  const user = null;

  return <h1>{user.name}</h1>;
}
```

---

Execution:

```text
user = null

↓

user.name

↓

Runtime Error
```

---

# Example 2

```jsx
"use client";

export default function Page() {
  throw new Error("Manual Error");
}
```

---

Execution:

```text
Component Render

↓

Throw Error

↓

Crash
```

---

# Example 3

```jsx
"use client";

export default function Page() {
  const [count, setCount] = useState();

  return (
    <button
      onClick={() => {
        throw new Error("Button Failed");
      }}
    >
      Click
    </button>
  );
}
```

---

Execution:

```text
User Click

↓

Error

↓

Client Exception
```

---

# What Happens Without Error Handling?

Development:

```text
Red Error Overlay
```

appears.

---

Production:

```text
Component Crashes
```

and users may see:

```text
Broken UI
```

---

# How To Handle Client-Side Errors?

Good news:

```text
error.js
```

can handle client-rendering errors too.

---

Example:

```text
blogs/

├── page.js
└── error.js
```

---

Client Component:

```jsx
"use client";

export default function Likes() {
  throw new Error("Likes Failed");
}
```

---

Execution:

```text
Likes Component

↓

Error

↓

error.js

↓

Fallback UI
```

---

# Why Does This Work?

Because:

```text
error.js

↓

React Error Boundary
```

---

And React Error Boundaries are designed to catch:

```text
Client Rendering Errors
```

---

# Internal Mental Model

Think:

```jsx
<ErrorBoundary>
  <Likes />
</ErrorBoundary>
```

---

If:

```jsx
<Likes />
```

fails

↓

```text
Error Boundary Activated
```

↓

Fallback UI Appears

---

# Understanding reset()

Example:

```jsx
"use client";

export default function Error({ error, reset }) {
  return (
    <>
      <h1>Something Went Wrong</h1>

      <button onClick={() => reset()}>Retry</button>
    </>
  );
}
```

---

# What Does reset() Do?

Remember:

```text
Error Boundary

↓

Entered Error State
```

---

Calling:

```jsx
reset();
```

means:

```text
Clear Error State

↓

Render Component Again
```

---

Visualization

```text
Component

↓

Error

↓

Error Boundary

↓

reset()

↓

Try Again
```

---

# Example

Suppose:

```jsx
let shouldFail = false;
```

---

First Render:

```jsx
throw new Error("Failed");
```

↓

Error UI.

---

User Clicks:

```jsx
reset();
```

↓

Component re-renders.

---

If error fixed:

```text
Page Appears
```

---

If error still exists:

```text
Error UI Again
```

---

# Difference Between reset() in Server Errors and Client Errors

Interestingly:

```text
Same Function
```

but different purpose.

---

## Server Error

Usually combined with:

```jsx
router.refresh();
```

because fresh data may be needed.

---

Flow:

```text
Refresh Server Data

↓

Retry Render
```

---

## Client Error

Often:

```jsx
reset();
```

alone is enough.

---

Flow:

```text
Clear Error State

↓

Re-render Component
```

---

# Real World Example

Imagine:

```text
Theme Toggle Component
```

crashes due to:

```text
Bad State
```

---

Error UI appears.

---

User clicks:

```text
Retry
```

---

Execution:

```text
reset()

↓

Theme Component Re-renders

↓

Works Again
```

without reloading the entire page.

---

# Important Limitation

Error Boundaries catch:

✅ Rendering Errors

✅ Lifecycle Errors

✅ Component Render Failures

---

But NOT:

❌ Async errors in `setTimeout`

❌ Errors inside API callbacks

❌ Errors outside React tree

---

Example:

```jsx
setTimeout(() => {
  throw new Error("Timer Failed");
}, 1000);
```

---

This is NOT caught by:

```text
error.js
```

because it happens outside React rendering.

---

# Visual Summary

## Server Error

```text
Server

↓

Error

↓

Digest ID

↓

error.js
```

---

## Client Error

```text
Browser

↓

Error

↓

Stack Trace

↓

error.js
```

---

# Development vs Production

## Development

Shows:

```text
Red Overlay

Stack Trace

Line Number

Component Name
```

---

Purpose:

```text
Debugging
```

---

## Production

Shows:

```text
Fallback UI

error.js
```

while protecting users from unnecessary details.

---

# Best Practices

✅ Use `error.js` for client rendering failures.

✅ Provide a retry button using `reset()`.

✅ Keep error messages user-friendly.

✅ Use browser console for debugging client errors.

---

# Common Mistakes

### Mistake 1

Thinking only Server Components can trigger `error.js`.

Wrong.

Client rendering errors can also activate it.

---

### Mistake 2

Confusing digest IDs with client errors.

Digest IDs are mainly associated with server-side failures.

---

### Mistake 3

Expecting `error.js` to catch every JavaScript error.

It only catches errors inside the React rendering tree.

---

# Key Takeaways

- Server errors occur on the server; client errors occur in the browser.
- Server errors may show digest IDs to hide sensitive details.
- Client errors usually show full stack traces in development.
- `error.js` can catch both server-rendering and client-rendering component errors.
- `reset()` clears the Error Boundary state and retries rendering.
- Error Boundaries catch rendering errors but not all asynchronous JavaScript errors.

---

# Quick Revision

### Where do server errors occur?

```text
Server
```

---

### Where do client errors occur?

```text
Browser
```

---

### Why do server errors show digest IDs?

To hide sensitive server details.

---

### Why do client errors show stack traces?

Because the code is already running in the browser.

---

### What does reset() do?

Retries rendering after clearing the Error Boundary state.

---

### Can error.js catch client rendering errors?

✅ Yes

---

# Interview Questions

### Q1. What is the difference between a server-side error and a client-side error?

Server-side errors occur while rendering on the server, whereas client-side errors occur while executing code in the browser.

---

### Q2. Why does Next.js use digest IDs for server errors?

To avoid exposing sensitive internal server information while still allowing developers to identify the error through logs.

---

### Q3. Why are client-side stack traces visible in the browser?

Because the code executes directly in the browser and debugging information is available there.

---

### Q4. Can `error.js` handle client-side rendering errors?

Yes. It acts as a React Error Boundary and can catch rendering errors from Client Components.

---

### Q5. What does the `reset()` function do?

It resets the Error Boundary state and attempts to render the failed component again.

---

# Summary

In this lecture, we learned how client-side exceptions differ from server-side exceptions in Next.js. We saw that server errors occur on the server and often use digest IDs to protect sensitive information, while client errors occur in the browser and can expose full stack traces during development. We also learned that `error.js` acts as a React Error Boundary and can catch rendering failures from Client Components. Finally, we explored how `reset()` allows users to recover from client-side rendering errors by clearing the error state and retrying the render process.
