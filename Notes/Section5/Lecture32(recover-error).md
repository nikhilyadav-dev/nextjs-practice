# Lecture 32 - How to Recover from Errors in Next.js?

## 📖 Introduction

In the previous lecture, we learned:

```text
error.js
```

which acts as an:

```text
Error Boundary
```

for a route.

When an error occurs:

```text
page.js

↓

Throws Error

↓

error.js Appears
```

Now an important question arises:

> After showing the error page, how can we recover and render the page again?

Example:

```text
API Temporarily Failed

Database Temporarily Down

Network Issue

Server Timeout
```

The user should be able to:

```text
Retry
```

instead of refreshing the entire website manually.

---

# Example Error Page

```jsx
"use client";

export default function Error({ error, reset }) {
  return (
    <>
      <h1>Something Went Wrong</h1>

      <button>Retry</button>
    </>
  );
}
```

Question:

What should happen when user clicks:

```text
Retry
```

?

---

# Method 1 - `window.location.reload()`

Many beginners use:

```jsx
<button
  onClick={() => {
    window.location.reload();
  }}
>
  Retry
</button>
```

---

# What Does It Do?

Execution:

```text
Browser

↓

Reload Entire Page

↓

Request Again

↓

Render Again
```

---

# Visualization

```text
Current Page

↓

Reload

↓

Browser Request

↓

Server Response

↓

Page Reloaded
```

---

# Why Does It Work?

Because:

```text
Everything Starts Again
```

If the error was temporary:

```text
API Works Now

↓

Page Loads Successfully
```

---

# Why Is It NOT Recommended?

Because:

```text
Full Browser Reload
```

is expensive.

---

# Problems with `window.location.reload()`

## 1. Entire App Reloads

Not just the failed route.

Everything restarts.

---

Example:

```text
Navbar

Sidebar

Footer

Page
```

All reload.

---

## 2. Loses Client State

Example:

```text
Shopping Cart

Theme

Form Inputs

Open Modals
```

may reset.

---

## 3. Worse User Experience

Users see:

```text
White Screen

↓

Page Reload

↓

Everything Reloaded
```

instead of a smooth retry.

---

## 4. Slower

Because:

```text
New HTTP Request

↓

Reload JS

↓

Reload Data
```

Everything starts from scratch.

---

# Modern Next.js Solution

Instead of:

```text
Reload Browser
```

Next.js allows:

```text
Refresh Route
```

only.

---

# Method 2 - `router.refresh() + reset()`

Example:

```jsx
"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function Error({ error, reset }) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        startTransition(() => {
          router.refresh();
          reset();
        });
      }}
    >
      Retry
    </button>
  );
}
```

This is the recommended Next.js approach.

---

# Understanding `router.refresh()`

```jsx
router.refresh();
```

means:

```text
Re-fetch Current Route Data

↓

Re-render Route

↓

Keep Client State If Possible
```

---

Think:

```text
Refresh Route

NOT

Refresh Browser
```

---

# Example

Current Route:

```text
/blogs/1
```

---

Call:

```jsx
router.refresh();
```

---

Next.js:

```text
Request Fresh Server Data

↓

Render Route Again

↓

Update UI
```

without:

```text
Full Page Reload
```

---

# What Does `reset()` Do?

Remember:

```text
error.js

↓

Error Boundary
```

When an error occurs:

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
Leave Error State

↓

Try Rendering Again
```

---

Visualization

```text
Page

↓

Error

↓

Error Boundary Active

↓

reset()

↓

Render Page Again
```

---

# Why Do We Need Both?

Many students ask:

```text
If reset() retries,

why use router.refresh()?
```

Good question.

---

# `reset()` Only

```jsx
reset();
```

tries rendering again.

---

But:

```text
Data

↓

May Still Be Old
```

because no fresh server request happened.

---

# `router.refresh()` Only

```jsx
router.refresh();
```

gets fresh data.

---

But:

```text
Error Boundary

↓

Still Showing Error UI
```

---

Therefore:

```text
router.refresh()

+

reset()
```

is the safest approach.

---

# Execution Flow

User clicks:

```text
Retry
```

---

Step 1

```jsx
router.refresh();
```

↓

```text
Request Fresh Data
```

---

Step 2

```jsx
reset();
```

↓

```text
Clear Error Boundary State
```

---

Step 3

```text
Render Route Again
```

---

Step 4

If successful:

```text
Page Appears
```

---

If error still exists:

```text
Error Page Appears Again
```

---

# Why Use `startTransition()`?

Example:

```jsx
startTransition(() => {
  router.refresh();
  reset();
});
```

---

# What Is a Transition?

React distinguishes:

```text
Urgent Updates

and

Non-Urgent Updates
```

---

Urgent:

```text
Typing

Button Clicks

Input Updates
```

---

Non-Urgent:

```text
Page Refresh

Large UI Updates

Data Reloads
```

---

# What Does `startTransition()` Do?

It tells React:

```text
This Update Is Not Urgent
```

---

React can:

```text
Keep UI Responsive

↓

Perform Update In Background
```

---

Without:

```jsx
startTransition();
```

React may block the UI during large updates.

---

# Visualization

Without Transition:

```text
Click Retry

↓

Large Re-render

↓

UI May Freeze Briefly
```

---

With Transition:

```text
Click Retry

↓

React Schedules Update

↓

UI Stays Responsive
```

---

# Why Does Next.js Documentation Use It?

Because:

```jsx
router.refresh();
```

can trigger:

```text
Server Requests

Data Fetching

Re-rendering
```

which may be expensive.

Using:

```jsx
startTransition();
```

gives a smoother experience.

---

# Real World Example

Imagine:

```text
Dashboard
```

contains:

```text
Revenue

Users

Orders

Analytics
```

---

Revenue API fails.

Error page appears.

---

User clicks:

```text
Retry
```

---

Execution:

```text
router.refresh()

↓

Fetch Fresh Revenue Data

↓

reset()

↓

Retry Rendering

↓

Dashboard Appears
```

without reloading the entire website.

---

# Internal Mental Model

Think:

```text
window.location.reload()

↓

Restart Browser Page

----------------------

router.refresh()

↓

Refresh Next.js Route

----------------------

reset()

↓

Reset Error Boundary

----------------------

startTransition()

↓

Perform Retry Smoothly
```

---

# Which Approach Should Be Used?

## Small Projects

Even:

```jsx
window.location.reload();
```

works.

---

## Production Applications

Use:

```jsx
startTransition(() => {
  router.refresh();
  reset();
});
```

because it:

- Preserves UI state better
- Avoids full reload
- Provides smoother UX
- Uses Next.js routing system

---

# Best Practices

✅ Prefer `router.refresh()` over `window.location.reload()`.

✅ Combine `router.refresh()` with `reset()`.

✅ Wrap retries in `startTransition()`.

✅ Keep retry buttons user-friendly.

---

# Common Mistakes

### Mistake 1

Using:

```jsx
reset();
```

without refreshing data.

Sometimes stale data remains.

---

### Mistake 2

Using:

```jsx
window.location.reload();
```

for every error.

This loses the advantages of Next.js routing.

---

### Mistake 3

Thinking `reset()` reloads the page.

It only resets the Error Boundary.

---

# Key Takeaways

- `window.location.reload()` reloads the entire browser page.
- It works but is not ideal in modern Next.js applications.
- `router.refresh()` refreshes the current route's server data.
- `reset()` resets the Error Boundary state.
- `startTransition()` marks the retry as a non-urgent update.
- The recommended recovery pattern is:

```jsx
startTransition(() => {
  router.refresh();
  reset();
});
```

---

# Quick Revision

### Reload entire browser page?

```jsx
window.location.reload();
```

---

### Refresh current route?

```jsx
router.refresh();
```

---

### Reset Error Boundary?

```jsx
reset();
```

---

### Mark retry as non-urgent?

```jsx
startTransition();
```

---

### Recommended pattern?

```jsx
startTransition(() => {
  router.refresh();
  reset();
});
```

---

# Interview Questions

### Q1. Why is `window.location.reload()` not recommended in Next.js?

Because it reloads the entire application, loses client-side state, and provides a poorer user experience.

---

### Q2. What does `router.refresh()` do?

It requests fresh server-rendered data for the current route and updates the UI without a full page reload.

---

### Q3. What does `reset()` do in `error.js`?

It resets the Error Boundary and attempts to render the route again.

---

### Q4. Why are `router.refresh()` and `reset()` often used together?

`router.refresh()` gets fresh data, while `reset()` clears the Error Boundary state and retries rendering.

---

### Q5. What is the purpose of `startTransition()`?

It marks the update as non-urgent so React can keep the UI responsive during the retry process.

---

# Summary

In this lecture, we learned how to recover from errors in Next.js. While `window.location.reload()` can retry a failed page, it performs a full browser reload and may lose important client-side state. Next.js provides a better solution using `router.refresh()` to fetch fresh route data and `reset()` to clear the Error Boundary state. By wrapping these operations in `startTransition()`, React can perform the retry smoothly without blocking the user interface. This combination represents the recommended production-ready approach for error recovery in modern Next.js applications.
