# Lecture 20 - Streaming in Next.js

## 📖 Introduction

In previous lectures, we learned:

- Static Rendering
- Dynamic Rendering
- ISR
- Dynamic Pages

Now let's understand a very important performance feature of Next.js:

# 🚀 Streaming

Streaming allows Next.js to send parts of a page to the browser **as soon as they are ready**, instead of waiting for the entire page to finish rendering.

This makes applications feel significantly faster.

---

# The Problem Before Streaming

Suppose we have a page:

```jsx
export default async function Dashboard() {
  const user = await getUser();
  const views = await getViews();
  const likes = await getLikes();
  const comments = await getComments();

  return (
    <>
      <User />
      <Views />
      <Likes />
      <Comments />
    </>
  );
}
```

Assume:

```text
User Data      → 1 sec
Views Data     → 3 sec
Likes Data     → 5 sec
Comments Data  → 7 sec
```

---

# Without Streaming

Execution:

```text
Request

↓

Fetch User

↓

Fetch Views

↓

Fetch Likes

↓

Fetch Comments

↓

Generate HTML

↓

Send Response
```

Total Time:

```text
7 Seconds
```

---

## User Experience

For 7 seconds:

```text
Blank Screen
```

Then suddenly:

```text
Everything Appears
```

---

Visual:

```text
0s   1s   2s   3s   4s   5s   6s   7s

Loading...

Loading...

Loading...

Loading...

Loading...

Loading...

Loading...

↓

Entire Page Appears
```

This is a poor user experience.

---

# Solution: Streaming

Instead of waiting for everything,

Next.js can send content piece by piece.

Example:

```text
User Section Ready?

↓

Send It

----------------

Views Ready?

↓

Send It

----------------

Likes Ready?

↓

Send It

----------------

Comments Ready?

↓

Send It
```

This process is called:

> Streaming

---

# What is Streaming?

Streaming means:

> Sending UI to the browser in chunks as soon as it becomes available.

Instead of:

```text
Wait For Everything

↓

Send Everything
```

we do:

```text
Ready?

↓

Send Immediately
```

---

# Real-Life Example

Imagine ordering food.

## Without Streaming

Restaurant says:

```text
Wait until every dish is ready.
```

After 20 minutes:

```text
Starter
Main Course
Dessert

All arrive together.
```

---

## With Streaming

As soon as the starter is ready:

```text
Serve Starter
```

Later:

```text
Serve Main Course
```

Later:

```text
Serve Dessert
```

You start eating immediately.

Streaming works exactly like this.

---

# Streaming in Next.js

Next.js uses React's:

```jsx
<Suspense>
```

component.

Example:

```jsx
<Suspense fallback={<Loading />}>
  <Views />
</Suspense>
```

---

# What is Suspense?

Suspense tells React:

```text
This component may take time.

Until it finishes,

show fallback UI.
```

---

Syntax:

```jsx
<Suspense fallback={<Loading />}>
  <Component />
</Suspense>
```

---

Components:

### Suspense

Controls asynchronous rendering.

---

### fallback

Temporary UI shown while loading.

---

### Component

Actual component that will render later.

---

# Your Example

```jsx
<Suspense fallback={<Loading>Views</Loading>}>
  <Views />
</Suspense>

<Suspense fallback={<Loading>Likes</Loading>}>
  <Likes />
</Suspense>

<Suspense fallback={<Loading>Comments</Loading>}>
  <Comments />
</Suspense>
```

---

# Understanding the Components

Suppose:

```jsx
Views;
```

takes:

```text
3 Seconds
```

---

```jsx
Likes;
```

takes:

```text
5 Seconds
```

---

```jsx
Comments;
```

takes:

```text
7 Seconds
```

---

# Initial Response

Immediately after page load:

Browser sees:

```text
Loading Views...

Loading Likes...

Loading Comments...
```

because the actual data is still being fetched.

---

Visual:

```text
---------------------------------

Loading Views...

Loading Likes...

Loading Comments...

---------------------------------
```

---

# After 3 Seconds

Views finishes.

Next.js streams:

```text
Views: 10,000
```

Browser now shows:

```text
Views: 10,000

Loading Likes...

Loading Comments...
```

Notice:

The page did not wait for Likes and Comments.

---

# After 5 Seconds

Likes finishes.

Browser updates:

```text
Views: 10,000

Likes: 1,500

Loading Comments...
```

---

# After 7 Seconds

Comments finishes.

Browser updates:

```text
Views: 10,000

Likes: 1,500

Comments: 250
```

Everything is now visible.

---

# Streaming Timeline

Without Streaming:

```text
0s   1s   2s   3s   4s   5s   6s   7s

Loading...

Loading...

Loading...

Loading...

Loading...

Loading...

Loading...

↓

Entire Page Appears
```

---

With Streaming:

```text
0s

Loading Views
Loading Likes
Loading Comments

↓

3s

Views Appears

↓

5s

Likes Appears

↓

7s

Comments Appears
```

The page becomes useful much sooner.

---

# Example Loading Component

```jsx
export default function Loading({ children }) {
  return <p>Loading {children}...</p>;
}
```

Usage:

```jsx
<Suspense fallback={<Loading>Views</Loading>}>
  <Views />
</Suspense>
```

Output:

```text
Loading Views...
```

until the component is ready.

---

# Why Use Multiple Suspense Boundaries?

Your code:

```jsx
<Suspense fallback={<Loading>Views</Loading>}>
  <Views />
</Suspense>

<Suspense fallback={<Loading>Likes</Loading>}>
  <Likes />
</Suspense>

<Suspense fallback={<Loading>Comments</Loading>}>
  <Comments />
</Suspense>
```

creates:

```text
3 Independent Loading Zones
```

This is much better than:

```jsx
<Suspense fallback={<Loading />}>
  <Views />
  <Likes />
  <Comments />
</Suspense>
```

because then:

```text
Views

Likes

Comments
```

must all finish before the Suspense boundary resolves.

---

# How Next.js Streaming Works Internally

Request:

```text
Browser

↓

Next.js Server

↓

Render Page

↓

Views Pending

↓

Send Fallback

↓

Likes Pending

↓

Send Fallback

↓

Comments Pending

↓

Send Fallback
```

As components finish:

```text
Server

↓

Streams New HTML Chunks

↓

Browser Updates UI
```

without refreshing the page.

---

# Streaming vs Traditional SSR

## Traditional SSR

```text
Request

↓

Wait For Everything

↓

Generate Full HTML

↓

Send HTML
```

---

## Streaming SSR

```text
Request

↓

Generate Available HTML

↓

Send Immediately

↓

Continue Rendering

↓

Stream Remaining HTML
```

---

# Benefits of Streaming

## Faster Perceived Performance

Users see content earlier.

---

## Better User Experience

No large blank screens.

---

## Independent Loading States

Each section can load separately.

---

## Great for Dashboards

Example:

```text
Analytics

Views

Revenue

Comments

Notifications
```

Each widget can load independently.

---

# Real-World Examples

### YouTube

```text
Video Loads

↓

Comments Load Later

↓

Recommendations Load Later
```

---

### Instagram

```text
Post Loads

↓

Likes Load

↓

Comments Load
```

---

### Dashboard

```text
Revenue Widget

↓

Users Widget

↓

Analytics Widget
```

all load independently.

---

# Best Practices

✅ Use multiple Suspense boundaries for independent sections.

✅ Show meaningful fallback UIs.

✅ Use streaming for slow data sources.

✅ Avoid one huge Suspense around the entire page.

---

# Common Mistakes

### Mistake 1

Wrapping the entire page in one Suspense.

```jsx
<Suspense fallback={<Loading />}>
  <EntirePage />
</Suspense>
```

This reduces the benefits of streaming.

---

### Mistake 2

Using generic loading text everywhere.

Instead use:

```text
Loading Views...

Loading Likes...

Loading Comments...
```

---

### Mistake 3

Thinking Suspense is only for loading spinners.

It is actually a rendering boundary that enables streaming.

---

# Key Takeaways

- Streaming allows HTML to be sent in chunks.
- It improves perceived performance.
- React Suspense enables streaming.
- `fallback` is displayed while data loads.
- Components render independently as they become ready.
- Multiple Suspense boundaries provide better user experience.

---

# Quick Revision

### What is Streaming?

Sending UI to the browser in chunks as soon as it is ready.

---

### Which React component enables Streaming?

```jsx
<Suspense>
```

---

### What is `fallback`?

Temporary UI displayed while a component is loading.

---

### Why use multiple Suspense boundaries?

To allow different sections of the page to load independently.

---

### Main benefit of Streaming?

Users see content sooner instead of waiting for the entire page.

---

# Interview Questions

### Q1. What is Streaming in Next.js?

Streaming is the process of sending parts of a page to the browser as soon as they are rendered instead of waiting for the entire page to finish.

---

### Q2. What role does Suspense play in Streaming?

Suspense creates boundaries that allow React and Next.js to stream UI incrementally.

---

### Q3. What is the purpose of `fallback`?

It provides temporary content while the actual component is still loading.

---

### Q4. Why is Streaming better than traditional SSR?

Because users can see and interact with available content earlier instead of waiting for the entire page to render.

---

### Q5. When should Streaming be used?

For pages with slow API calls, dashboards, analytics pages, comments sections, and any UI where different parts load at different speeds.

---

# Summary

In this lecture, we learned about **Streaming**, a performance optimization in Next.js that allows parts of a page to be sent to the browser as soon as they are ready. Using React's **Suspense** component and fallback UIs, Next.js can progressively render content instead of making users wait for the entire page to finish loading. Streaming significantly improves perceived performance, user experience, and responsiveness, especially for dashboards, analytics pages, comments sections, and other data-heavy applications.
