# Lecture 5 - Nested Routing in Next.js

## 📖 Introduction

In real-world applications, we often need multiple levels of routes.

For example:

```text
/services
/services/web-dev
/services/app-dev
/services/ui-ux
```

Instead of creating all routes in a single file, Next.js allows us to organize routes using nested folders.

This concept is called:

> Nested Routing

Nested Routing helps us create structured, scalable, and easy-to-maintain applications.

---

# What is Nested Routing?

Nested Routing means creating routes inside routes using folders.

Every folder represents a segment of the URL.

Example:

```bash
app/
│
├── page.js
│
├── services/
│   ├── page.js
│   │
│   ├── web-dev/
│   │   └── page.js
│   │
│   ├── app-dev/
│   │   └── page.js
│   │
│   └── ui-ux/
│       └── page.js
```

---

# Generated Routes

| Folder Structure             | Route               |
| ---------------------------- | ------------------- |
| app/page.js                  | `/`                 |
| app/services/page.js         | `/services`         |
| app/services/web-dev/page.js | `/services/web-dev` |
| app/services/app-dev/page.js | `/services/app-dev` |
| app/services/ui-ux/page.js   | `/services/ui-ux`   |

---

# How Next.js Creates Nested Routes

Every folder becomes a URL segment.

Example:

```bash
app/
└── services/
    └── web-dev/
        └── page.js
```

Generated Route:

```text
/services/web-dev
```

Flow:

```text
services
   ↓
web-dev
   ↓
page.js
```

Final URL:

```text
/services/web-dev
```

---

# Example

## Home Page

```jsx
export default function Home() {
  return <h1>Home Page</h1>;
}
```

Route:

```text
/
```

---

## Services Page

```jsx
export default function Services() {
  return <h1>Services Page</h1>;
}
```

Route:

```text
/services
```

---

## Web Development Page

```jsx
export default function WebDevelopment() {
  return <h1>Web Development Service</h1>;
}
```

Route:

```text
/services/web-dev
```

---

# Important Point

## Full Path Must Be Used

Unlike React Router, where nested routes can sometimes be configured relative to a parent route, in Next.js the URL is generated directly from the folder structure.

Example Folder:

```bash
app/
└── services/
    └── web-dev/
        └── page.js
```

Actual Route:

```text
/services/web-dev
```

Not:

```text
/web-dev
```

When navigating, always use the complete route path.

Example:

```jsx
<Link href="/services/web-dev">Web Development</Link>
```

---

# React Router vs Next.js Nested Routing

## React Router

```jsx
<Route path="/services">
  <Route path="web-dev" />
</Route>
```

Generated Route:

```text
/services/web-dev
```

Routing is configured manually.

---

## Next.js

```bash
services/
└── web-dev/
    └── page.js
```

Generated Automatically:

```text
/services/web-dev
```

No route configuration is required.

---

# Route Path is Case Sensitive

### Important

Next.js routes are case-sensitive.

Example:

Correct:

```text
/services/web-dev
```

Different Route:

```text
/services/WEB-DEV
```

Different Route:

```text
/services/Web-Dev
```

These are treated as different URLs.

---

## Example

Folder:

```bash
services/
└── web-dev/
```

Valid URL:

```text
/services/web-dev
```

Invalid URL:

```text
/services/WEB-DEV
```

Result:

```text
404 Not Found
```

(if such a route does not exist)

---

# Recommended Naming Convention

Use:

```text
lowercase
```

and

```text
kebab-case
```

Example:

```text
web-dev
app-development
ui-ux-design
```

Avoid:

```text
WEBDEV
WebDev
webDev
```

Reason:

- Cleaner URLs
- Better readability
- Consistent project structure
- Avoids case-sensitivity issues

---

# Deeply Nested Routes

Next.js supports multiple levels of nesting.

Example:

```bash
app/
│
└── services/
    │
    └── web-dev/
        │
        └── frontend/
            │
            └── page.js
```

Generated Route:

```text
/services/web-dev/frontend
```

---

# Real World Example

Consider an agency website.

Folder Structure:

```bash
app/
│
├── page.js
│
├── services/
│   ├── page.js
│   │
│   ├── web-dev/
│   │   └── page.js
│   │
│   ├── app-dev/
│   │   └── page.js
│   │
│   └── ui-ux/
│       └── page.js
```

Generated URLs:

```text
/
/services
/services/web-dev
/services/app-dev
/services/ui-ux
```

---

# Navigation Example

```jsx
import Link from "next/link";

export default function Services() {
  return (
    <>
      <Link href="/services/web-dev">Web Development</Link>

      <br />

      <Link href="/services/app-dev">App Development</Link>

      <br />

      <Link href="/services/ui-ux">UI/UX Design</Link>
    </>
  );
}
```

---

# Benefits of Nested Routing

✅ Better Project Organization

✅ Easy Route Management

✅ Scalable Folder Structure

✅ Automatic Route Generation

✅ Cleaner URLs

✅ No Need for React Router

---

# Common Mistakes

### Mistake 1

Using wrong path:

```jsx
<Link href="/web-dev">
```

Correct:

```jsx
<Link href="/services/web-dev">
```

---

### Mistake 2

Using incorrect casing:

```text
/services/WEB-DEV
```

Correct:

```text
/services/web-dev
```

---

### Mistake 3

Forgetting `page.js`

Wrong:

```bash
services/
└── web-dev/
```

Correct:

```bash
services/
└── web-dev/
    └── page.js
```

Without `page.js`, Next.js cannot create a route.

---

# Key Takeaways

- Nested Routing is created using nested folders.
- Every folder becomes a URL segment.
- `page.js` creates the actual page for a route.
- Routes are generated automatically by Next.js.
- Always use the full route path.
- Route paths are case-sensitive.
- Prefer lowercase and kebab-case naming.
- Deep nesting is supported.
- No need for React Router configuration.

---

# Quick Revision

### What is Nested Routing?

Creating routes inside routes using nested folders.

---

### Which route is generated?

```bash
app/services/web-dev/page.js
```

Answer:

```text
/services/web-dev
```

---

### Is route matching case-sensitive?

Yes.

```text
/services/web-dev
```

and

```text
/services/WEB-DEV
```

are different routes.

---

### Which naming style is recommended?

```text
lowercase + kebab-case
```

Example:

```text
web-dev
app-development
ui-ux
```

---

# Interview Questions

### Q1. What is Nested Routing in Next.js?

A routing system where nested folders create nested URL paths automatically.

---

### Q2. How does Next.js create nested routes?

By converting folder structure inside the `app` directory into URL segments.

---

### Q3. Are Next.js routes case-sensitive?

Yes. Different letter casing creates different routes.

---

### Q4. What file is required to create a route?

```text
page.js
```

---

### Q5. What route is generated from this structure?

```bash
app/
└── services/
    └── web-dev/
        └── page.js
```

Answer:

```text
/services/web-dev
```

---

# Summary

In this lecture, we learned about Nested Routing in Next.js. We saw how routes are automatically generated from nested folder structures inside the `app` directory. We learned that every folder becomes a URL segment, full route paths must be used when navigating, and routes are case-sensitive. Nested Routing helps organize large applications and makes route management simple and scalable.

---

### 📝 Notes will be updated as each lecture is completed. Feel free to ⭐ this repo if you find it helpful!
