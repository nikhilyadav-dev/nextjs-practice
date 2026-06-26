# Lecture 17 - `dynamicParams` in Next.js

## 📖 Introduction

In the previous lecture, we learned how to use:

```jsx
generateStaticParams();
```

to generate static pages for dynamic routes.

Example:

```jsx
export function generateStaticParams() {
  return [{ blogID: "1" }, { blogID: "2" }, { blogID: "3" }];
}
```

During:

```bash
npm run build
```

Next.js generates:

```text
/blogs/1

/blogs/2

/blogs/3
```

Now an important question arises.

What happens if a user requests:

```text
/blogs/4
```

which was **not** generated?

This is exactly what `dynamicParams` controls.

---

# What is `dynamicParams`?

`dynamicParams` is a special configuration in Next.js that controls what should happen when a user requests a **dynamic route that was not generated** by `generateStaticParams()`.

Syntax:

```jsx
export const dynamicParams = false;
```

It tells Next.js:

> "Only allow the routes generated during the build."

---

# Understanding the Problem

Suppose we have:

```text
app/
└── blogs/
    └── [blogID]/
        └── page.js
```

and

```jsx
export function generateStaticParams() {
  return [{ blogID: "1" }, { blogID: "2" }, { blogID: "3" }];
}
```

Build output:

```text
/blogs/1

/blogs/2

/blogs/3
```

These pages already exist.

Now the browser requests:

```text
/blogs/2
```

Everything works.

---

But suppose someone types:

```text
/blogs/100
```

Question:

Should Next.js generate it?

Or should it show:

```text
404 Page Not Found
```

This decision is controlled by:

```jsx
dynamicParams;
```

---

# `dynamicParams = false`

Example:

```jsx
export const dynamicParams = false;
```

Meaning:

```text
Only the paths returned by
generateStaticParams()

are allowed.
```

Everything else becomes:

```text
404 Page Not Found
```

---

# Practical Example

```jsx
export function generateStaticParams() {
  return [{ blogID: "1" }, { blogID: "2" }, { blogID: "3" }];
}

export const dynamicParams = false;
```

Generated pages:

```text
/blogs/1

/blogs/2

/blogs/3
```

---

### Browser Requests

Request:

```text
/blogs/2
```

Flow:

```text
Browser

↓

GET /blogs/2

↓

Page Exists

↓

Return HTML
```

Works successfully.

---

Request:

```text
/blogs/100
```

Flow:

```text
Browser

↓

GET /blogs/100

↓

Not Generated

↓

dynamicParams = false

↓

404 Page
```

---

# Visual Representation

```text
generateStaticParams()

↓

1

2

3

↓

Generated Pages

↓

1

2

3

------------------------

User Requests

↓

2

↓

Page Exists

↓

Return HTML

------------------------

User Requests

↓

100

↓

Not Generated

↓

404
```

---

# Why Use `dynamicParams = false`?

Suppose your website contains only:

```text
Blog 1

Blog 2

Blog 3
```

You know that:

```text
Blog 100
```

doesn't exist.

Instead of trying to generate it,

you should immediately show:

```text
404 Page Not Found
```

This improves:

- User Experience
- Performance
- SEO

---

# Real-World Examples

## Documentation Website

Generated Pages:

```text
/docs/react

/docs/nextjs

/docs/nodejs
```

User requests:

```text
/docs/python
```

If no Python documentation exists,

show:

```text
404
```

instead of generating an empty page.

---

## Product Website

Generated Products:

```text
/products/101

/products/102

/products/103
```

User requests:

```text
/products/999
```

Result:

```text
404
```

---

## Blog Website

Generated Blogs:

```text
/blogs/1

/blogs/2

/blogs/3
```

User requests:

```text
/blogs/999
```

Result:

```text
404
```

---

# What Happens During Build?

Build Flow:

```text
npm run build

↓

generateStaticParams()

↓

Receive

1

2

3

↓

Generate

/blogs/1

/blogs/2

/blogs/3

↓

Build Complete
```

Notice:

No other pages are generated.

---

# Browser Request Flow

Request:

```text
/blogs/1
```

↓

```text
Already Generated

↓

Return HTML
```

---

Request:

```text
/blogs/200
```

↓

```text
Not Generated

↓

dynamicParams = false

↓

404
```

---

# `dynamicParams = true` (Default Behavior)

If you **do not** set:

```jsx
export const dynamicParams = false;
```

Next.js behaves as if:

```jsx
export const dynamicParams = true;
```

This means:

If a requested slug was **not** generated during the build,

Next.js is allowed to generate it dynamically (depending on your rendering strategy and page configuration).

---

Example:

Generated:

```text
/blogs/1

/blogs/2

/blogs/3
```

User requests:

```text
/blogs/100
```

With:

```text
dynamicParams = true
```

Next.js can attempt to render that page instead of immediately returning a 404.

---

# `dynamicParams = true` vs `false`

| `dynamicParams = true`                            | `dynamicParams = false`                            |
| ------------------------------------------------- | -------------------------------------------------- |
| Unknown routes may be rendered dynamically        | Unknown routes immediately return 404              |
| More flexible                                     | More restrictive                                   |
| Good when new content can appear after deployment | Good when all valid routes are known at build time |

---

# When Should We Use `dynamicParams = false`?

Use it when:

- Every valid route is known during the build.
- The content rarely changes.
- Unknown routes should never exist.

Examples:

- Documentation
- Company Pages
- Course Lessons
- Product Catalogs
- Static Blogs

---

# When Should We Avoid It?

Avoid it when:

- New blogs are published frequently.
- Products are added regularly.
- User-generated content appears after deployment.
- The list of routes changes often.

In these cases, allowing dynamic rendering may be more appropriate.

---

# Best Practices

✅ Return all known route parameters from `generateStaticParams()`.

✅ Use `dynamicParams = false` only when you are certain that no additional routes should exist.

✅ Combine it with a custom `not-found.js` page for a better user experience.

---

# Common Mistakes

### Mistake 1

Thinking `dynamicParams` creates static pages.

Wrong.

Static pages are created by:

```jsx
generateStaticParams();
```

`dynamicParams` only controls what happens for **unknown** routes.

---

### Mistake 2

Forgetting to return all valid IDs.

If:

```text
Blog 4
```

exists but isn't returned by `generateStaticParams()`,

then:

```text
/blogs/4
```

will return:

```text
404
```

when:

```jsx
dynamicParams = false;
```

---

### Mistake 3

Thinking `dynamicParams` affects static routes.

It only applies to **dynamic routes**, such as:

```text
[blogID]
```

---

# Key Takeaways

- `dynamicParams` works with dynamic routes.
- It controls what happens when a requested route wasn't generated during the build.
- `dynamicParams = false` restricts access to only the routes returned by `generateStaticParams()`.
- Unknown routes automatically return a 404 page.
- This feature is useful when all valid routes are known ahead of time.

---

# Quick Revision

### What does `dynamicParams = false` do?

It allows only the routes generated during the build and returns a 404 for any unknown route.

---

### Which function generates static dynamic routes?

```jsx
generateStaticParams();
```

---

### Does `dynamicParams` generate pages?

No.

It only controls access to routes that were **not** generated.

---

### Which route returns 404?

Generated:

```text
1

2

3
```

Request:

```text
100
```

↓

```text
404
```

---

# Interview Questions

### Q1. What is the purpose of `dynamicParams`?

It controls whether dynamic routes not generated during the build should be rendered or return a 404 page.

---

### Q2. What happens when `dynamicParams = false`?

Only routes returned by `generateStaticParams()` are valid. Any other route immediately returns a 404 page.

---

### Q3. Does `dynamicParams` generate static pages?

No. Static pages are generated by `generateStaticParams()`. `dynamicParams` only controls unknown routes.

---

### Q4. When should `dynamicParams = false` be used?

When all valid routes are known during the build and unknown routes should never exist.

---

### Q5. What is the default behavior if `dynamicParams` is not specified?

The default behavior is effectively `true`, meaning Next.js can attempt to handle unknown dynamic routes according to the page's rendering strategy.

---

# Summary

In this lecture, we learned about **`dynamicParams`**, a configuration option that works with dynamic routes generated by `generateStaticParams()`. We saw that `dynamicParams = false` restricts access to only the routes generated during the build and automatically returns a 404 page for any unknown route. This feature is particularly useful for applications where all valid routes are known ahead of time, such as documentation sites, product catalogs, and static blogs.
