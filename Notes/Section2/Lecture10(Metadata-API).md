# Lecture 10 - Metadata API in Next.js

## 📖 Introduction

When you open a website, have you ever noticed the text displayed on the browser tab?

Example:

```text
Google
Facebook
GitHub
YouTube
```

That text is called the **Page Title**, which is a part of a webpage's **Metadata**.

Metadata is information **about a webpage** that is not directly visible inside the page content but is used by:

- Browsers
- Search Engines (Google, Bing, Yahoo)
- Social Media Platforms (Facebook, Twitter, LinkedIn)
- Search Engine Crawlers

Next.js provides a built-in feature called the **Metadata API** to manage all this information in a clean, SEO-friendly way.

---

# What is Metadata?

Metadata means:

> **Data about Data**

For a webpage, metadata is information that describes the page.

Examples include:

- Page Title
- Description
- Keywords
- Author
- Robots
- Open Graph Tags
- Twitter Cards
- Icons
- Theme Color

Although users usually don't see metadata directly, browsers and search engines use it extensively.

---

# Why is Metadata Important?

Metadata plays a huge role in:

## Better SEO

Google reads metadata to understand your page.

Example:

```text
<title>Next.js Tutorial</title>
```

Google knows:

"This page is about Next.js."

---

## Browser Tab Title

Example:

```text
Technical Agency
```

appears on the browser tab.

---

## Social Media Sharing

When someone shares your website on:

- Facebook
- LinkedIn
- Twitter

metadata decides:

- Title
- Description
- Preview Image

---

## User Experience

Proper titles help users identify tabs easily.

Instead of:

```text
localhost:3000
```

Users see:

```text
Services | Technical Agency
```

---

# Ways to Set Page Title

There are two common ways.

---

## Method 1 — HTML `<title>` Tag

Example:

```jsx
export default function Home() {
  return (
    <>
      <title>Home Page</title>

      <h1>Home</h1>
    </>
  );
}
```

Although this works in normal HTML and older React projects, **it is NOT the recommended approach in the Next.js App Router.**

---

## Why Shouldn't We Use `<title>`?

Using `<title>` manually has several disadvantages.

❌ Hard to manage

❌ Difficult for nested layouts

❌ Doesn't integrate with Next.js Metadata system

❌ Doesn't support automatic metadata merging

❌ Less maintainable

---

# Method 2 — Metadata API ✅ (Recommended)

Instead of writing:

```jsx
<title>Home</title>
```

Next.js recommends:

```jsx
export const metadata = {
  title: "Home",
};
```

This is called the **Metadata API**.

---

# What is the Metadata API?

The Metadata API is a built-in feature of Next.js that automatically generates HTML metadata for your pages.

Instead of manually writing HTML tags like:

```html
<title></title>

<meta></meta>
```

Next.js creates them automatically.

You only need to export a special object:

```jsx
export const metadata = {
  title: "Home",
};
```

---

# Static Metadata

When metadata does not change, it is called **Static Metadata**.

Example:

```jsx
export const metadata = {
  title: "Home",
};
```

No matter who visits the page, the title remains:

```text
Home
```

---

# Writing Static Metadata

Example:

```jsx
export const metadata = {
  title: "Services",
};
```

Browser Tab:

```text
Services
```

---

# Root Layout Metadata

Most applications have a common website name.

Example:

```text
Technical Agency
```

Instead of writing this everywhere, we define it once inside:

```bash
app/layout.js
```

Example:

```jsx
export const metadata = {
  title: {
    default: "Technical Agency",

    template: "%s | Technical Agency",
  },
};
```

This becomes the default metadata for the entire application.

---

# Understanding `default`

Example:

```jsx
title: {
    default: "Technical Agency"
}
```

This title is used whenever a page does **not** define its own title.

Example:

Home Page:

```jsx
export default function Home() {
  return <h1>Home</h1>;
}
```

No metadata exists.

Browser Title:

```text
Technical Agency
```

because it uses the **default** title.

---

# Understanding `template`

Example:

```jsx
title: {
  template: "%s | Technical Agency";
}
```

Here,

```text
%s
```

acts as a placeholder.

Think of it like:

```text
Replace me with page title.
```

---

Example:

Page:

```jsx
export const metadata = {
  title: "Services",
};
```

Next.js performs:

```text
%s
```

↓

Replace with:

```text
Services
```

Final Title:

```text
Services | Technical Agency
```

---

# Another Example

Root Layout:

```jsx
export const metadata = {
  title: {
    default: "Technical Agency",
    template: "%s | Technical Agency",
  },
};
```

About Page:

```jsx
export const metadata = {
  title: "About",
};
```

Browser Title:

```text
About | Technical Agency
```

---

Contact Page:

```jsx
export const metadata = {
  title: "Contact",
};
```

Browser Title:

```text
Contact | Technical Agency
```

Notice that only the page title changes.

The website name remains consistent.

---

# Where Can We Write Metadata?

Metadata can be written inside:

```bash
layout.js
```

OR

```bash
page.js
```

Both are valid.

Example:

```bash
app/
│
├── layout.js
│
├── about/
│   └── page.js
│
└── services/
    ├── layout.js
    └── page.js
```

Every layout and page can define its own metadata.

---

# Metadata Hierarchy

Metadata follows the same hierarchy as layouts.

Example:

```text
Root Layout

↓

Services Layout

↓

Services Page
```

Each level can contribute metadata.

---

# How Does Metadata Override Work?

This is one of the most important concepts.

Suppose:

Root Layout:

```jsx
export const metadata = {
  title: {
    default: "Technical Agency",
    template: "%s | Technical Agency",
  },
};
```

Services Page:

```jsx
export const metadata = {
  title: "Services",
};
```

Question:

Which title appears?

Answer:

```text
Services | Technical Agency
```

The page metadata overrides the **default title**, but still follows the template from the parent layout.

---

# Understanding Metadata Merging

Think of metadata like inheritance.

Example:

```text
Root Layout

↓

Services Layout

↓

Services Page
```

Next.js combines metadata from parent layouts and child pages.

Visual Representation:

```text
Root Metadata

↓

Merged with

↓

Services Metadata

↓

Merged with

↓

Current Page Metadata
```

This automatic combination is called:

> Metadata Merging

---

# Override Rules

| Location      | Priority |
| ------------- | -------- |
| Root Layout   | Lowest   |
| Nested Layout | Medium   |
| Page Metadata | Highest  |

Example:

```text
Root Layout

↓

Services Layout

↓

Services Page
```

If all three define the same metadata field:

```text
Services Page
```

wins because it has the highest priority.

---

# Example

Root Layout

```jsx
title: "Website";
```

Services Layout

```jsx
title: "Services";
```

Services Page

```jsx
title: "Web Development";
```

Final Browser Title:

```text
Web Development
```

because the page overrides the parent layouts.

---

# Dynamic Metadata

Sometimes, metadata cannot be predefined.

For example, imagine a blog website.

URLs:

```text
/blogs/react
/blogs/nextjs
/blogs/javascript
/blogs/nodejs
```

Each blog should have its own browser title.

Example:

```text
React | Technical Agency
Next.js | Technical Agency
JavaScript | Technical Agency
```

Since we don't know all blog names in advance, **Static Metadata** is not enough.

This is where **Dynamic Metadata** comes in.

---

# What is Dynamic Metadata?

Dynamic Metadata allows us to generate metadata at runtime based on:

- Route Parameters (`params`)
- Search Parameters (`searchParams`)
- Database Data
- API Response

Instead of exporting a static object:

```jsx
export const metadata = {
  title: "Blogs",
};
```

we export a function:

```jsx
export async function generateMetadata() {}
```

---

# `generateMetadata()` Function

Syntax:

```jsx
export async function generateMetadata({ params }) {
  return {
    title: "Some Title",
  };
}
```

⚠️ **Important**

The function name must be exactly:

```text
generateMetadata
```

Wrong:

```jsx
generateMetaData;
```

```jsx
GenerateMetadata;
```

```jsx
metadataGenerator;
```

These will **not work**.

Everything is **case-sensitive**.

---

# Example Folder Structure

```bash
app/
│
└── blogs/
    │
    ├── page.js
    │
    └── [blog]/
        └── page.js
```

Suppose the URL is:

```text
/blogs/react
```

The dynamic folder:

```bash
[blog]
```

creates:

```js
params.blog;
```

whose value becomes:

```text
react
```

---

# Dynamic Metadata Example

```jsx
export async function generateMetadata({ params }) {
  const { blog } = await params;

  return {
    title: `Blog ${blog}`,
  };
}

export default function BlogPage() {
  return <h1>Blog Page</h1>;
}
```

---

# URL Example

URL:

```text
/blogs/react
```

Step 1

Next.js extracts:

```js
{
  blog: "react";
}
```

↓

Step 2

Calls:

```jsx
generateMetadata({ params });
```

↓

Step 3

Inside function:

```jsx
const { blog } = await params;
```

becomes

```jsx
const blog = "react";
```

↓

Step 4

Returns

```jsx
{
  title: "Blog react";
}
```

↓

Final Browser Tab

```text
Blog react | Technical Agency
```

because the Root Layout template is still applied.

---

# Another Example

URL:

```text
/blogs/javascript
```

Output:

```text
Blog javascript | Technical Agency
```

---

URL:

```text
/blogs/nodejs
```

Output:

```text
Blog nodejs | Technical Agency
```

Notice that we never created separate metadata for each blog.

One function handles all routes.

---

# How `generateMetadata()` Works Under the Hood

Suppose the user visits:

```text
/blogs/react
```

Execution Flow:

```text
User Request

        ↓

Next.js matches

blogs/[blog]/page.js

        ↓

Extracts params

{
   blog: "react"
}

        ↓

Calls

generateMetadata()

        ↓

Returns

{
   title: "Blog react"
}

        ↓

Generates HTML <head>

        ↓

Renders Page

        ↓

Sends HTML to Browser
```

Notice something important:

**Metadata is generated before the page is rendered.**

This ensures that search engines receive the correct metadata immediately.

---

# Why Does Next.js Generate Metadata First?

Imagine Google visits your website.

If the page renders first and metadata comes later:

```text
Google

↓

Reads Page

↓

No Title Found
```

Bad for SEO.

Instead, Next.js performs:

```text
Generate Metadata

↓

Generate HTML

↓

Send Everything Together
```

This is one of the reasons why Next.js is considered SEO-friendly.

---

# Static Metadata vs Dynamic Metadata

| Static Metadata         | Dynamic Metadata                |
| ----------------------- | ------------------------------- |
| Fixed value             | Changes dynamically             |
| Uses `metadata` object  | Uses `generateMetadata()`       |
| Same title for everyone | Title depends on route/data     |
| Faster                  | Slightly more processing        |
| Best for static pages   | Best for blogs, products, users |

---

# Absolute Title

Sometimes we don't want the Root Layout template.

Root Layout:

```jsx
title: {
  default: "Technical Agency",
  template: "%s | Technical Agency",
}
```

Normally:

```jsx
title: "Services";
```

becomes:

```text
Services | Technical Agency
```

But what if we only want:

```text
My Files
```

without the template?

Use:

```jsx
export const metadata = {
  title: {
    absolute: "My Files",
  },
};
```

Browser Title:

```text
My Files
```

Notice:

The template is completely ignored.

---

# When Should We Use `absolute`?

Use `absolute` when a page should have its own independent title.

Examples:

- Login Page
- Admin Dashboard
- Error Pages
- Special Landing Pages

Example:

```jsx
export const metadata = {
  title: {
    absolute: "Admin Dashboard",
  },
};
```

Result:

```text
Admin Dashboard
```

Not:

```text
Admin Dashboard | Technical Agency
```

---

# Metadata Priority

When multiple metadata objects exist, Next.js follows this priority:

```text
Root Layout

↓

Nested Layout

↓

Page Metadata

↓

generateMetadata()
```

The closer the metadata is to the current page, the higher its priority.

---

# Important Rules

### Rule 1

`metadata`

is case-sensitive.

Correct:

```jsx
export const metadata = {};
```

Wrong:

```jsx
export const Metadata = {};
```

---

### Rule 2

`generateMetadata`

must be written exactly.

Correct:

```jsx
export async function generateMetadata() {}
```

Wrong:

```jsx
generateMetaData();
```

---

### Rule 3

Don't export both for the same route.

Wrong:

```jsx
export const metadata = {};

export async function generateMetadata() {}
```

Choose one:

- Static Metadata
- Dynamic Metadata

---

# Best Practices

✅ Define common metadata in the Root Layout.

✅ Use page metadata for page-specific titles.

✅ Use `generateMetadata()` when metadata depends on dynamic data.

✅ Use `template` to keep branding consistent.

✅ Use `absolute` only when you intentionally want to ignore the template.

✅ Keep titles short and descriptive (around 50–60 characters is a common SEO guideline).

---

# Common Mistakes

### Mistake 1

Using `<title>` inside App Router pages.

Prefer:

```jsx
export const metadata = {};
```

---

### Mistake 2

Incorrect function name.

Wrong:

```jsx
generateMetaData();
```

Correct:

```jsx
generateMetadata();
```

---

### Mistake 3

Incorrect export.

Wrong:

```jsx
const metadata = {};
```

Correct:

```jsx
export const metadata = {};
```

---

### Mistake 4

Forgetting that `absolute` ignores the template.

---

# Key Takeaways

- Metadata controls browser titles and SEO information.
- The Metadata API is the recommended way to manage metadata in the App Router.
- `metadata` is used for static metadata.
- `generateMetadata()` is used for dynamic metadata.
- Root layouts can define `default` and `template` titles.
- Child pages override parent metadata when needed.
- `absolute` bypasses the parent template.
- Metadata is generated before the page is rendered.
- `metadata` and `generateMetadata` are case-sensitive.

---

# Quick Revision

### Which API is recommended for metadata?

```text
Metadata API
```

---

### Which export is used for static metadata?

```jsx
export const metadata = {};
```

---

### Which function is used for dynamic metadata?

```jsx
export async function generateMetadata() {}
```

---

### What does `%s` represent?

The page title placeholder inside a template.

---

### What does `absolute` do?

Ignores the parent template and uses the given title exactly.

---

# Interview Questions

### Q1. What is the Metadata API?

The Metadata API is a built-in Next.js feature that allows developers to manage page metadata such as titles, descriptions, and SEO information without manually writing HTML `<head>` tags.

---

### Q2. What is the difference between `metadata` and `generateMetadata()`?

`metadata` is used for static values, while `generateMetadata()` generates metadata dynamically based on route parameters, search parameters, or fetched data.

---

### Q3. What is the purpose of the `template` property?

It creates a consistent title format by inserting the page title into a predefined pattern using `%s`.

---

### Q4. What is `absolute`?

`absolute` defines a page title that completely ignores any parent layout template.

---

### Q5. Why is Metadata API better than manually writing `<title>`?

Because it integrates with Next.js App Router, supports metadata merging, dynamic metadata generation, nested layouts, and provides better SEO support.

---

# Summary

In this lecture, we learned about the **Metadata API**, one of the most important SEO features in Next.js. We explored static metadata using the `metadata` object, dynamic metadata using the `generateMetadata()` function, metadata inheritance and overriding across layouts and pages, the `default`, `template`, and `absolute` title options, and how Next.js generates metadata before rendering the page. Understanding the Metadata API is essential for building SEO-friendly, professional web applications with Next.js.
