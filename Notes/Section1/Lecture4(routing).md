# Lecture 4 - Routing in Next.js

## 📖 Introduction

Routing is one of the most important features of Next.js.

Unlike React, where we need packages like `react-router-dom` to create routes, Next.js provides **File-Based Routing** out of the box.

In Next.js, routes are automatically created based on the folder and file structure inside the `app` directory.

---

# What is Routing?

Routing is the process of navigating between different pages of a website.

For example:

```text
/               -> Home Page
/about          -> About Page
/contact        -> Contact Page
/blog           -> Blog Page
```

Whenever a user visits a URL, Next.js determines which page should be displayed.

---

# Q. How Routing Works in Next.js?

## File-Based Routing

Next.js automatically creates routes based on folders inside the `app` directory.

### Example Structure

```bash
app/
│
├── page.js
│
├── about/
│   └── page.js
│
├── contact/
│   └── page.js
```

---

## Generated Routes

| Folder Structure    | Route    |
| ------------------- | -------- |
| app/page.js         | /        |
| app/about/page.js   | /about   |
| app/contact/page.js | /contact |

---

## Home Page

```jsx
export default function Home() {
  return <h1>Home Page</h1>;
}
```

Route:

```text
http://localhost:3000/
```

---

## About Page

```jsx
export default function About() {
  return <h1>About Page</h1>;
}
```

Route:

```text
http://localhost:3000/about
```

---

## Contact Page

```jsx
export default function Contact() {
  return <h1>Contact Page</h1>;
}
```

Route:

```text
http://localhost:3000/contact
```

---

# Visual Representation

```text
app
│
├── page.js
│       ↓
│      "/"
│
├── about
│   └── page.js
│       ↓
│    "/about"
│
├── contact
│   └── page.js
│       ↓
│   "/contact"
```

---

# Advantages of File-Based Routing

✅ Easy to Understand

✅ No Extra Routing Package Required

✅ Less Boilerplate Code

✅ Faster Development

✅ Better Project Structure

---

# Navigation Between Pages

To move from one page to another, we create links.

There are two ways:

### Method 1

```html
<a href="/about">About</a>
```

### Method 2 (Recommended)

```jsx
<Link href="/about">About</Link>
```

---

# Q. Why Use `<Link>` Instead of `<a>`?

Next.js provides a special component called:

```jsx
import Link from "next/link";
```

which is specifically designed for navigation.

---

# Using Anchor Tag (`<a>`)

Example:

```html
<a href="/about">About</a>
```

When clicked:

```text
Current Page
      ↓
Browser Requests New Page
      ↓
Entire Page Reloads
      ↓
New Page Loads
```

Result:

❌ Full Page Refresh

❌ Slower Navigation

❌ React State Resets

❌ More Network Requests

---

# Using Next.js Link

Example:

```jsx
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/about">About</Link>
    </>
  );
}
```

---

## What Happens Internally?

```text
Current Page
      ↓
Next.js Fetches Route
      ↓
Only Required Data Changes
      ↓
Page Updates Instantly
```

Result:

✅ No Full Reload

✅ Faster Navigation

✅ Better User Experience

✅ Preserves Application State

---

# Example Comparison

## Using Anchor Tag

```jsx
<a href="/about">Go to About</a>
```

Result:

```text
Page Refreshes Completely
```

---

## Using Link Component

```jsx
<Link href="/about">Go to About</Link>
```

Result:

```text
Navigation Happens Without Refresh
```

This is called:

> Client-Side Navigation

---

# When Should We Use `<a>`?

Use `<a>` for:

### External Websites

```jsx
<a href="https://google.com" target="_blank">
  Google
</a>
```

---

Use `<Link>` for:

### Internal Pages

```jsx
<Link href="/about">About</Link>
```

---

# Summary of Link vs Anchor

| Feature                | `<a>`           | `<Link>`     |
| ---------------------- | --------------- | ------------ |
| Page Refresh           | Yes             | No           |
| Client-Side Navigation | No              | Yes          |
| Faster Navigation      | No              | Yes          |
| Internal Routes        | Not Recommended | Recommended  |
| External Links         | Yes             | Not Required |

---

# Q. What is Layout File in Next.js?

A Layout is a special file used to create a common UI shared across multiple pages.

File Name:

```text
layout.js
```

---

# Why Do We Need Layouts?

Imagine a website having:

- Navbar
- Sidebar
- Footer

These components are needed on every page.

Without Layout:

```jsx
Home Page
Navbar
Content
Footer

About Page
Navbar
Content
Footer

Contact Page
Navbar
Content
Footer
```

We would have to repeat code again and again.

---

# Problem Without Layout

```jsx
export default function Home() {
  return (
    <>
      <Navbar />
      <h1>Home</h1>
      <Footer />
    </>
  );
}
```

```jsx
export default function About() {
  return (
    <>
      <Navbar />
      <h1>About</h1>
      <Footer />
    </>
  );
}
```

Notice:

```text
Navbar and Footer repeated everywhere
```

This violates:

> DRY (Don't Repeat Yourself)

---

# Solution: Layout File

### app/layout.js

```jsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <nav>Navbar</nav>

        {children}

        <footer>Footer</footer>
      </body>
    </html>
  );
}
```

---

# How It Works

```text
Layout
│
├── Navbar
│
├── Children
│    ↓
│  Current Page
│
└── Footer
```

Whenever a page is rendered:

```text
Navbar
Current Page Content
Footer
```

is automatically displayed.

---

# What is `children`?

The `children` prop represents the page content that will be rendered inside the layout.

Example:

```jsx
export default function RootLayout({ children }) {
  return <body>{children}</body>;
}
```

---

Suppose:

```jsx
app / about / page.js;
```

contains:

```jsx
export default function About() {
  return <h1>About Page</h1>;
}
```

Then:

```jsx
{
  children;
}
```

becomes:

```jsx
<h1>About Page</h1>
```

---

# Root Layout

Every Next.js App Router project must have:

```text
app/layout.js
```

This is called:

> Root Layout

It wraps the entire application.

---

# Nested Layouts

Next.js also supports layouts for specific routes.

Example:

```bash
app/
│
├── layout.js
│
├── dashboard/
│   ├── layout.js
│   ├── page.js
```

---

## Result

```text
Root Layout
      ↓
Dashboard Layout
      ↓
Dashboard Page
```

This allows different sections of the app to have different layouts.

---

# Benefits of Layouts

✅ Reusable UI

✅ Cleaner Code

✅ No Repetition

✅ Better Project Structure

✅ Easy Maintenance

✅ Shared Navigation Components

---

# Key Takeaways

- Next.js uses File-Based Routing.
- Every folder inside `app` can become a route.
- `page.js` represents a page.
- Use `Link` for internal navigation.
- Avoid using `<a>` for internal routes.
- `layout.js` creates shared UI across pages.
- Root Layout wraps the entire application.
- `children` represents page content.
- Layouts help avoid code duplication.

---

# Quick Revision

### How does routing work in Next.js?

Using File-Based Routing.

Folders and `page.js` files automatically become routes.

---

### What route does this create?

```bash
app/about/page.js
```

Answer:

```text
/about
```

---

### Why use `<Link>`?

Because it enables Client-Side Navigation and prevents full page reloads.

---

### When should we use `<a>`?

For external websites.

---

### What is `layout.js`?

A special file used to create shared UI across multiple pages.

---

### What is `children`?

The page content rendered inside a layout.

---

# Interview Questions

### Q1. What is File-Based Routing?

A routing system where folders and files automatically generate routes.

---

### Q2. Why is `<Link>` preferred over `<a>` in Next.js?

Because `<Link>` provides Client-Side Navigation and avoids full page refreshes.

---

### Q3. What is a Root Layout?

The main `layout.js` file inside the `app` directory that wraps the entire application.

---

### Q4. What is the purpose of the `children` prop?

It renders the currently active page inside a layout.

---

### Q5. Can Next.js have multiple layouts?

Yes. Next.js supports nested layouts for different sections of the application.

---

# Summary

In this lecture, we learned how Next.js implements File-Based Routing using the `app` directory. We explored how routes are automatically created using folders and `page.js` files, why the `Link` component is preferred over the traditional anchor tag for internal navigation, and how `layout.js` helps create reusable layouts with shared components like Navbar and Footer. We also learned about the `children` prop, Root Layouts, and Nested Layouts.

---

### 📝 Notes will be updated as each lecture is completed. Feel free to ⭐ this repo if you find it helpful!
