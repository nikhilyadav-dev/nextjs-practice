# Lecture 28 - Parallel Data Fetching in Next.js

## 📖 Introduction

In previous lectures, we learned how to fetch data in Server Components.

Example:

```jsx
export default async function Page() {
  const posts = await fetch("/api/posts");
  const users = await fetch("/api/users");

  return <h1>Hello</h1>;
}
```

Now an important question arises:

> What happens when we need data from multiple APIs?

Suppose a page needs:

- Blogs
- Users
- Comments
- Categories

Should we fetch them one by one?

Or all together?

This is where **Parallel Data Fetching** comes in.

---

# The Problem: Sequential Data Fetching

Consider:

```jsx
export default async function Page() {
  const postsResponse = await fetch("/api/posts");
  const posts = await postsResponse.json();

  const usersResponse = await fetch("/api/users");
  const users = await usersResponse.json();

  const commentsResponse = await fetch("/api/comments");
  const comments = await commentsResponse.json();

  return <div>Dashboard</div>;
}
```

---

# Execution Flow

```text
Fetch Posts

↓

Wait Until Complete

↓

Fetch Users

↓

Wait Until Complete

↓

Fetch Comments

↓

Wait Until Complete

↓

Generate HTML
```

---

# Example Timing

Suppose:

```text
Posts API     → 2 sec

Users API     → 3 sec

Comments API  → 1 sec
```

Total Time:

```text
2 + 3 + 1

↓

6 Seconds
```

---

# Visualization

```text
0s

↓

Posts Fetch

↓

2s

↓

Users Fetch

↓

5s

↓

Comments Fetch

↓

6s

↓

Page Rendered
```

This approach is called:

> **Sequential Data Fetching**

because requests happen one after another.

---

# Why is Sequential Fetching Slow?

Because:

```text
Users API

↓

Cannot Start

↓

Until Posts API Finishes
```

and

```text
Comments API

↓

Cannot Start

↓

Until Users API Finishes
```

Lots of unnecessary waiting.

---

# Solution: Parallel Data Fetching

Instead of:

```text
One By One
```

fetch everything together.

---

# Example

```jsx
export default async function Page() {
  const postsPromise = fetch("/api/posts");

  const usersPromise = fetch("/api/users");

  const commentsPromise = fetch("/api/comments");

  const [postsResponse, usersResponse, commentsResponse] = await Promise.all([
    postsPromise,
    usersPromise,
    commentsPromise,
  ]);

  return <div>Dashboard</div>;
}
```

---

# Execution Flow

```text
Posts API

Users API

Comments API

↓

All Start Together

↓

Wait For All

↓

Generate HTML
```

---

# Example Timing

Suppose:

```text
Posts API     → 2 sec

Users API     → 3 sec

Comments API  → 1 sec
```

---

Now:

```text
All Start Together
```

Total Time:

```text
Maximum Time

↓

3 Seconds
```

instead of:

```text
6 Seconds
```

---

# Visualization

Sequential:

```text
Posts      2s

↓

Users      3s

↓

Comments   1s

↓

Total = 6s
```

---

Parallel:

```text
Posts      2s
Users      3s
Comments   1s

↓

All Together

↓

Total = 3s
```

Huge improvement.

---

# Promise.all()

Parallel fetching is usually done using:

```jsx
Promise.all();
```

Syntax:

```jsx
const [a, b, c] = await Promise.all([promise1, promise2, promise3]);
```

---

# What Does Promise.all() Do?

It starts all promises immediately.

Then:

```text
Waits For All To Finish
```

before continuing.

---

Example

```jsx
const data = await Promise.all([fetch("/api/posts"), fetch("/api/users")]);
```

Flow:

```text
Posts Request

+

Users Request

↓

Run Together

↓

Wait

↓

Continue
```

---

# Real-World Example

Suppose Dashboard Page contains:

```text
Total Users

Revenue

Orders

Notifications
```

Each widget needs a separate API.

Without parallel fetching:

```text
Users

↓

Revenue

↓

Orders

↓

Notifications
```

Slow.

---

With parallel fetching:

```text
Users

Revenue

Orders

Notifications

↓

All Together
```

Much faster.

---

# Parallel Fetching in Server Components

Server Components are perfect for this.

Example:

```jsx
export default async function Dashboard() {
  const [users, orders, revenue] = await Promise.all([
    getUsers(),
    getOrders(),
    getRevenue(),
  ]);

  return (
    <>
      <Users data={users} />
      <Orders data={orders} />
      <Revenue data={revenue} />
    </>
  );
}
```

---

# Benefits of Parallel Data Fetching

## 1. Faster Page Rendering

Instead of:

```text
2 + 3 + 1 = 6 sec
```

we get:

```text
Max(2,3,1)

↓

3 sec
```

---

## 2. Better User Experience

Users wait less.

Pages appear faster.

---

## 3. Better Server Performance

Server spends less time waiting for sequential requests.

---

## 4. Better Scalability

Works well when pages require multiple APIs.

---

## 5. Improves Core Web Vitals

Faster rendering generally improves performance metrics.

---

# Sequential vs Parallel

| Feature        | Sequential        | Parallel             |
| -------------- | ----------------- | -------------------- |
| Requests Start | One After Another | Together             |
| Total Time     | Sum of All Times  | Longest Request Time |
| Performance    | Slower            | Faster               |
| Recommended    | Rarely            | Usually              |

---

# When Should We Use Parallel Fetching?

Use it when:

```text
Requests Are Independent
```

Example:

```text
Posts

Users

Comments
```

No dependency between them.

Perfect candidate.

---

# When Should We NOT Use Parallel Fetching?

Suppose:

```text
Fetch User

↓

Need User ID

↓

Fetch Orders
```

Now:

```text
Orders API

Depends On

User API
```

This cannot be parallel.

---

Example:

```jsx
const user = await getUser();

const orders = await getOrders(user.id);
```

Must remain sequential.

---

# Sequential Dependency Example

```text
Get User

↓

Get User ID

↓

Fetch Orders

↓

Fetch Payments
```

Each step depends on previous data.

Parallel fetching is impossible here.

---

# Parallel Fetching + Streaming

Very powerful combination.

Example:

```jsx
<Suspense fallback={<Loading />}>
  <Comments />
</Suspense>

<Suspense fallback={<Loading />}>
  <Likes />
</Suspense>
```

Each component can fetch data independently.

---

Flow:

```text
Comments Fetch

Likes Fetch

↓

Run Together

↓

Stream UI As Ready
```

Result:

```text
Faster Page

+

Better UX
```

---

# Common Mistakes

### Mistake 1

Using sequential fetches unnecessarily.

Wrong:

```jsx
await fetch("/posts");

await fetch("/users");

await fetch("/comments");
```

---

### Mistake 2

Not using Promise.all()

Correct:

```jsx
await Promise.all([fetch("/posts"), fetch("/users"), fetch("/comments")]);
```

---

### Mistake 3

Trying parallel fetching when APIs depend on each other.

This can cause logic errors.

---

# Best Practices

✅ Use Parallel Fetching whenever requests are independent.

✅ Use Promise.all() for multiple API calls.

✅ Combine Parallel Fetching with Streaming for maximum performance.

✅ Keep dependent requests sequential.

---

# Key Takeaways

- Parallel Fetching means starting multiple requests simultaneously.
- It is usually implemented using `Promise.all()`.
- Total waiting time becomes the longest request time instead of the sum of all request times.
- It significantly improves performance.
- Use it when requests are independent.
- Avoid it when requests depend on each other.

---

# Quick Revision

### What is Parallel Data Fetching?

Running multiple API requests at the same time.

---

### Which method is commonly used?

```jsx
Promise.all();
```

---

### Total time in Parallel Fetching?

```text
Longest Request Time
```

---

### Total time in Sequential Fetching?

```text
Sum Of All Request Times
```

---

### When should Parallel Fetching be avoided?

When requests depend on each other's results.

---

# Interview Questions

### Q1. What is Parallel Data Fetching?

Parallel Data Fetching is the process of executing multiple asynchronous requests simultaneously instead of sequentially.

---

### Q2. Why is Parallel Fetching faster?

Because all requests start together, reducing total waiting time to approximately the duration of the slowest request.

---

### Q3. Which JavaScript API is commonly used for Parallel Fetching?

```jsx
Promise.all();
```

---

### Q4. When should you avoid Parallel Fetching?

When one request depends on data returned by another request.

---

### Q5. Can Parallel Fetching be combined with Streaming?

Yes. Parallel Fetching retrieves data faster, while Streaming allows UI to be displayed as soon as individual sections are ready.

---

# Summary

In this lecture, we learned about **Parallel Data Fetching**, a technique used to improve performance by running multiple API requests simultaneously. Using `Promise.all()`, independent requests can start together, reducing total page load time from the sum of all request durations to only the duration of the slowest request. Parallel Fetching is especially useful in dashboards, analytics pages, e-commerce applications, and any page that requires data from multiple independent sources. When combined with Streaming and Suspense, it provides one of the fastest and most efficient data-fetching patterns in Next.js.
