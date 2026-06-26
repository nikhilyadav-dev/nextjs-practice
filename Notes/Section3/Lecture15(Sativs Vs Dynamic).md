# Lecture 15 - Static vs Dynamic Rendering in Next.js

## 📖 Introduction

In the previous lecture, we learned **where HTML is generated**.

- **Client Side Rendering (CSR)** → Browser generates HTML.
- **Server Side Rendering (SSR)** → Server generates HTML.

Now another important question arises:

> **When does the server generate HTML?**

Does it generate HTML:

- During project build?
- Every time a user requests a page?

The answer depends on the **Rendering Strategy** used by Next.js.

There are two major rendering strategies:

- **Static Rendering**
- **Dynamic Rendering**

Understanding these two concepts is one of the most important topics in Next.js because they directly affect:

- Website Performance
- SEO
- Initial Loading Speed
- Server Load
- Scalability

---

# Example Project Structure

Throughout this lecture, we'll use the following project:

```text
app/
├─ about/
│  └─ page.js
├─ blogs/
│  ├─ [blogID]/
│  │  └─ page.js
│  └─ page.js
├─ services/
│  └─ page.js
├─ favicon.ico
├─ globals.css
├─ layout.js
├─ page.js
└─ page.module.css
```

Assume every page initially contains only static JSX.

Example:

```jsx
export default function About() {
  return <h1>About Page</h1>;
}
```

Similarly,

```jsx
Home Page

Services Page

Blogs Page
```

do not fetch data from an API or database.

---

# What is Static Rendering?

Static Rendering means:

> **Next.js generates the HTML during the build process and stores it for future requests.**

Instead of generating HTML every time a user visits a page, Next.js generates it **once**.

After that, it simply serves the pre-generated HTML whenever the page is requested.

---

# Understanding Static Rendering Practically

Suppose our application contains:

```text
Home

About

Services

Blogs
```

Now run:

```bash
npm run build
```

Many beginners think this command only creates the `.next` folder.

In reality, Next.js does much more.

---

# What Happens During `npm run build`?

Think of the build process as Next.js visiting every page one by one.

Flow:

```text
Build Starts

↓

Visits Home Page

↓

Executes Home Component

↓

Generates Home HTML

↓

Stores Home HTML

↓

Visits About Page

↓

Executes About Component

↓

Generates About HTML

↓

Stores About HTML

↓

Visits Services Page

↓

Generates Services HTML

↓

Stores Services HTML

↓

Visits Blogs Page

↓

Generates Blogs HTML

↓

Stores Blogs HTML
```

Notice that the browser has not requested anything yet.

Everything happens **during the build**.

---

# Visual Representation

```text
npm run build

↓

Home Component

↓

Generate HTML

↓

Store HTML

---------------------

About Component

↓

Generate HTML

↓

Store HTML

---------------------

Services Component

↓

Generate HTML

↓

Store HTML
```

The result is that Next.js already has ready-made HTML pages before any user visits the website.

---

# What Gets Stored?

Inside the generated `.next` build output, Next.js stores the artifacts required to serve these pages efficiently.

Conceptually, you can think of it like this:

```text
.next/

↓

Home HTML

↓

About HTML

↓

Services HTML

↓

Blogs HTML
```

> **Note:** The actual `.next` folder is more complex and optimized internally. The important concept is that static pages are pre-rendered during the build.

---

# Browser Request (Static Page)

Suppose the user opens:

```text
/about
```

Browser sends:

```text
GET /about
```

Server already has:

```text
About HTML
```

So the server simply returns it.

Flow:

```text
Browser

↓

GET /about

↓

Next.js Server

↓

Already Has About HTML

↓

Returns HTML

↓

Browser Displays Page
```

Notice something important.

The server does **not** execute the React component again.

Because it already generated the HTML during the build.

---

# Another Example

User visits:

```text
/services
```

Flow:

```text
Browser

↓

GET /services

↓

Server

↓

Already Generated Services HTML

↓

Returns HTML
```

Again,

no rendering happens at request time.

---

# Why is Static Rendering Fast?

Because the expensive work has already been completed.

The server only needs to:

```text
Read HTML

↓

Send HTML
```

instead of:

```text
Run React

↓

Fetch Data

↓

Generate HTML

↓

Send HTML
```

This significantly reduces response time.

---

# Static Rendering Timeline

```text
Build Time

↓

Generate HTML

↓

Store HTML

↓

Deployment

↓

User Visits Website

↓

Return Existing HTML
```

Everything is prepared before users even open the website.

---

# Real-World Example

Imagine printing brochures for your company.

You print **10,000 brochures** before the event.

When visitors arrive:

```text
Visitor

↓

Requests Brochure

↓

Simply Hand Over Printed Copy
```

You don't print a new brochure for every visitor.

Static Rendering works the same way.

The HTML is already prepared.

---

# Network Behavior

When the browser requests:

```text
/about
```

Network Flow:

```text
Browser

↓

Request

↓

Server

↓

Returns Ready HTML

↓

Browser Displays Page

↓

Hydration Happens

↓

Interactive Website
```

Notice that the server does **not** create HTML after receiving the request.

It simply returns what was already built.

---

# Which Pages Are Good Candidates for Static Rendering?

Pages that rarely change.

Examples:

- Home Page
- About Page
- Services
- Contact
- Pricing
- Documentation
- Portfolio
- Company Information

These pages are excellent candidates because their content remains almost the same for every visitor.

---

# Benefits of Static Rendering

✅ Extremely Fast Response Time

✅ Better SEO

✅ Lower Server Load

✅ HTML is Ready Before Requests

✅ Better User Experience

✅ Easy CDN Caching

---

# Important Observation

Notice our project structure:

```text
app/
├── about/
├── services/
├── blogs/
```

If these pages only contain static content,

Next.js can pre-render all of them during the build.

No user request is required to generate their HTML.

---

# Key Takeaways

- Static Rendering generates HTML during the build process.
- `npm run build` does more than just create the `.next` folder—it also pre-renders eligible pages.
- Static pages are generated once and reused for every request.
- The server does not execute the page component again for every visitor.
- Static Rendering provides excellent performance and SEO.

---

# What is Dynamic Rendering?

Dynamic Rendering means:

> **Next.js generates the HTML every time a request arrives.**

Unlike Static Rendering, where HTML is created during the build process, Dynamic Rendering waits until a user requests a page.

Only then does Next.js execute the page component, generate HTML, and send it to the browser.

---

# Why Do We Need Dynamic Rendering?

Imagine a blogging website.

Every day new blogs are published.

Example:

```text
/blogs/1
/blogs/2
/blogs/3
...
/blogs/5000
```

Question:

Can Next.js generate HTML for every future blog during:

```bash
npm run build
```

Answer:

**No.**

Because blogs that will be created tomorrow don't exist today.

Therefore, HTML cannot always be generated during build time.

Instead,

Next.js generates the page only when someone requests it.

---

# Practical Example

Suppose our project has:

```text
app/
│
├── blogs/
│   ├── page.js
│   └── [blogID]/
│       └── page.js
```

Now assume:

```jsx
export default async function Blog({ params }) {
  const { blogID } = await params;

  const blog = await fetchBlog(blogID);

  return <h1>{blog.title}</h1>;
}
```

Notice something different.

This page is **not static anymore.**

Why?

Because every request may ask for a different blog.

---

# What Happens During Build?

Now run:

```bash
npm run build
```

Question:

Can Next.js generate HTML for:

```text
/blogs/1
/blogs/2
/blogs/3
...
/blogs/100000
```

Answer:

Impossible.

Next.js doesn't know which blog users will request.

So instead of generating HTML,

it prepares the server to generate HTML later.

---

# Browser Request

Suppose the browser requests:

```text
GET /blogs/25
```

Flow:

```text
Browser

↓

GET /blogs/25

↓

Next.js Server

↓

Runs page.js

↓

Reads params.blogID

↓

Fetches Blog Data

↓

Generates HTML

↓

Returns HTML

↓

Browser Displays Page
```

Notice:

HTML did **not** exist before the request.

It was generated after receiving the request.

---

# Another Example

User requests:

```text
/blogs/100
```

Flow:

```text
Request

↓

Server

↓

Execute React Component

↓

Fetch Blog 100

↓

Generate HTML

↓

Return HTML
```

Now another user requests:

```text
/blogs/101
```

Again,

the server repeats the entire process.

Unlike Static Rendering,

the HTML is created every single time.

---

# Dynamic Rendering Timeline

```text
Browser Request

↓

Execute React Component

↓

Fetch Data

↓

Generate HTML

↓

Return HTML
```

Everything happens **after** the request.

---

# Real-World Example

Imagine a restaurant.

Customer orders:

```text
Paneer Butter Masala
```

The chef prepares it after the order.

Next customer orders:

```text
Veg Biryani
```

Again,

the chef cooks a new dish.

Every request produces fresh output.

This is Dynamic Rendering.

---

# Static vs Dynamic Timeline

## Static Rendering

```text
Build Time

↓

Generate HTML

↓

Store HTML

↓

User Request

↓

Return Existing HTML
```

---

## Dynamic Rendering

```text
User Request

↓

Generate HTML

↓

Return HTML
```

This is the biggest difference between the two.

---

# Static Rendering vs Dynamic Rendering

| Static Rendering            | Dynamic Rendering               |
| --------------------------- | ------------------------------- |
| HTML generated during build | HTML generated on every request |
| Faster response             | Slightly slower                 |
| Lower server work           | More server work                |
| Excellent for static pages  | Excellent for changing data     |
| Better caching              | Fresh data every request        |

---

# Does a Dynamic Route Mean Dynamic Rendering?

This is one of the biggest misconceptions.

Many beginners think:

```text
blogs/
└── [blogID]
```

means:

```text
Dynamic Rendering
```

This is **not true.**

---

# Dynamic Route ≠ Dynamic Rendering

A Dynamic Route only means:

```text
The URL contains a variable.
```

Example:

```text
/blogs/10

/blogs/50

/blogs/100
```

The route changes.

But the rendering strategy is a completely different concept.

---

# Example

Folder:

```text
blogs/
└── [blogID]
```

If Next.js already knows all blog IDs during the build (using features like `generateStaticParams()` that you'll learn later),

it can generate:

```text
Blog 1 HTML

Blog 2 HTML

Blog 3 HTML
```

during:

```bash
npm run build
```

Even though the route is dynamic,

the rendering is still **Static**.

---

Likewise,

this page:

```text
/profile
```

has a static route,

but if it fetches:

- Logged-in user
- Cookies
- Live dashboard data

then it becomes **Dynamically Rendered**.

Therefore:

```text
Dynamic Route

≠

Dynamic Rendering
```

Always remember this distinction.

---

# How Does Next.js Decide?

Next.js analyzes your page.

If it only contains static content,

like:

```jsx
return <h1>About</h1>;
```

it can safely pre-render it during the build.

---

But if the page depends on request-time information, such as:

- Database queries
- Cookies
- Headers
- Uncached API responses

Next.js cannot know the result during the build.

So it waits until a request arrives and generates fresh HTML.

---

# Using Our Example Project

```text
app/
├── page.js
├── about/
│   └── page.js
├── services/
│   └── page.js
├── blogs/
│   ├── page.js
│   └── [blogID]/
│       └── page.js
```

Possible rendering strategy:

| Page        | Rendering                                |
| ----------- | ---------------------------------------- |
| `/`         | Static                                   |
| `/about`    | Static                                   |
| `/services` | Static                                   |
| `/blogs`    | Static                                   |
| `/blogs/25` | Dynamic (if data is fetched per request) |

Notice:

One project can contain both rendering strategies.

---

# Why is Next.js Called a Hybrid Framework?

Next.js doesn't force you to choose one rendering strategy for the entire application.

Instead,

each page can use the rendering strategy that best fits its needs.

Example:

```text
Home

↓

Static

----------------

About

↓

Static

----------------

Services

↓

Static

----------------

Blog Details

↓

Dynamic

----------------

Dashboard

↓

Dynamic
```

This flexibility is one of Next.js's biggest strengths.

---

# Best Practices

✅ Use Static Rendering whenever content rarely changes.

✅ Use Dynamic Rendering only when fresh data is required for every request.

✅ Don't assume that every dynamic route requires Dynamic Rendering.

✅ Choose the rendering strategy based on the nature of the data, not just the URL structure.

---

# Common Misconceptions

### ❌ Misconception

Dynamic Route means Dynamic Rendering.

### ✅ Reality

They are two completely different concepts.

---

### ❌ Misconception

Every page in a Next.js app must use the same rendering strategy.

### ✅ Reality

Each page can have its own rendering strategy.

---

### ❌ Misconception

Static pages cannot use dynamic routes.

### ✅ Reality

Dynamic routes can also be statically generated if all possible route values are known during the build.

---

# Key Takeaways

- Static Rendering generates HTML during the build process.
- Dynamic Rendering generates HTML on every request.
- Static pages provide faster responses because HTML is already available.
- Dynamic pages provide fresh data because HTML is generated when requested.
- Dynamic Routes and Dynamic Rendering are different concepts.
- A single Next.js application can use both rendering strategies.

---

# Quick Revision

### When is HTML generated in Static Rendering?

During:

```text
npm run build
```

---

### When is HTML generated in Dynamic Rendering?

After a user request reaches the server.

---

### Which rendering strategy is faster?

Static Rendering.

---

### Which rendering strategy provides the freshest data?

Dynamic Rendering.

---

### Does `[blogID]` automatically mean Dynamic Rendering?

No.

It only creates a Dynamic Route.

---

# Interview Questions

### Q1. What is the difference between Static Rendering and Dynamic Rendering?

Static Rendering generates HTML during the build process and reuses it for every request, while Dynamic Rendering generates HTML every time a request arrives.

---

### Q2. Can a Next.js application use both Static and Dynamic Rendering?

Yes. Different pages in the same application can use different rendering strategies.

---

### Q3. Does a Dynamic Route always use Dynamic Rendering?

No. A Dynamic Route only means the URL contains parameters. It can still be statically rendered if Next.js knows all route values during the build.

---

### Q4. Why is Static Rendering generally faster?

Because the HTML is already generated during the build, so the server only needs to send the existing HTML instead of generating it again.

---

### Q5. When should you choose Dynamic Rendering?

When the page depends on request-specific or frequently changing data, such as user dashboards, live data, or uncached database/API responses.

---

# Summary

In this lecture, we learned **when** Next.js generates HTML. We explored the difference between **Static Rendering**, where HTML is generated once during the build process, and **Dynamic Rendering**, where HTML is generated for every incoming request. We also clarified an important concept that **Dynamic Routes and Dynamic Rendering are not the same thing**. Finally, we saw that Next.js is a hybrid framework, allowing each page in an application to use the rendering strategy that best suits its content and performance requirements.
