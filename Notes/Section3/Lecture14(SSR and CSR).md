# Lecture 14 - Rendering Paradigms in Next.js

## 📖 Introduction

One of the biggest differences between React and Next.js is **where the HTML is generated**.

When a user opens a website, the browser ultimately needs **HTML** to display the page.

The question is:

> **Who generates this HTML?**

There are two possibilities:

1. The **Server** generates it.
2. The **Browser (Client)** generates it.

This concept is called a **Rendering Paradigm**.

Understanding rendering paradigms is one of the most important concepts in modern web development because it directly affects:

- Performance
- SEO
- Initial Loading Speed
- User Experience
- Server Load

---

# What is Rendering?

Rendering simply means:

> Converting your React Components into HTML that the browser can display.

Example:

```jsx
function Home() {
  return <h1>Hello World</h1>;
}
```

Eventually, the browser displays:

```html
<h1>Hello World</h1>
```

The question becomes:

**Who converted this React component into HTML?**

---

# Where Can HTML Be Generated?

There are mainly two places.

## 1. Server Side Rendering (SSR)

The server generates the HTML before sending it to the browser.

Used by:

- Next.js
- Nuxt.js
- Remix
- SvelteKit

---

## 2. Client Side Rendering (CSR)

The browser downloads JavaScript and generates HTML itself.

Used by:

- React
- Vue
- Angular

---

# Types of Server Rendering in Next.js

Next.js supports multiple rendering strategies.

## Server Side Rendering (SSR)

HTML is generated on every request.

Useful for:

- News Websites
- Dashboards
- Personalized Pages

---

## Static Site Generation (SSG)

HTML is generated once during build time.

Useful for:

- Portfolio Websites
- Landing Pages
- Documentation

---

## Incremental Static Regeneration (ISR)

Static pages are regenerated after a specified interval.

Useful for:

- Blogs
- E-commerce Products
- News Articles

> **Note:** SSG and ISR will be covered in upcoming lectures.

---

# Understanding CSR and SSR Practically

To understand the difference properly, we should compare both frameworks in **Production Mode**, not Development Mode.

Why?

Because Development Mode contains:

- Hot Reload
- Fast Refresh
- Source Maps
- Development Bundles
- Debugging Code

These extra files make it difficult to understand the actual rendering process.

Production mode shows what users actually receive.

---

# React (Vite) Production Build

Commands:

```bash
npm run build
```

Creates:

```text
dist/
```

Then run:

```bash
npm run preview
```

This starts the production server.

---

# What Does the `dist` Folder Contain?

A production React application generally contains:

```text
dist/
│
├── index.html
├── assets/
│     ├── index.css
│     └── index.js
```

---

## index.html

Initially contains almost nothing.

Example:

```html
<body>
  <div id="root"></div>
</body>
```

Notice:

There is **no Home page**, **no About page**, **no Services page**.

Only an empty container exists.

---

## CSS File

Contains:

```text
All compiled styles.
```

---

## JavaScript Bundle

Contains:

```text
Home Component

About Component

Services Component

Routing Logic

React Code

Everything
```

Almost the entire application is bundled into JavaScript.

---

# How React (CSR) Works

Suppose the user opens:

```text
/
```

Network Flow:

```text
Browser

↓

Requests index.html

↓

Receives

index.html

↓

Downloads CSS

↓

Downloads JavaScript

↓

JavaScript Executes

↓

React Creates HTML

↓

UI Appears
```

---

# Browser Network

Initially, the browser receives:

```text
index.html

index.css

index.js
```

That's it.

Then React creates the page.

---

# Visual Representation

```text
Browser Request

↓

Server

↓

Returns

index.html

↓

Browser Downloads

CSS

↓

Browser Downloads

JavaScript

↓

React Executes

↓

Creates HTML

↓

Displays Home Page
```

---

# Why Does React Send Only Three Files?

Because React doesn't know which page the user wants.

It simply sends:

- HTML
- CSS
- JavaScript

The browser decides what to render.

The server doesn't render individual pages.

---

# Navigation in React

Suppose we click:

```text
About
```

Question:

Will another request be sent?

Answer:

**No.**

Why?

Because the browser already has:

- Home Component
- About Component
- Services Component

inside the JavaScript bundle.

React simply changes the UI.

---

Visual Representation

```text
Home

↓

Click About

↓

React Router

↓

Changes Component

↓

No Server Request
```

---

# What Happens During Refresh?

Suppose the user is currently on:

```text
/services
```

Then presses:

```text
Refresh
```

The browser again requests:

```text
index.html
```

↓

Downloads:

```text
CSS

JavaScript
```

↓

React executes again.

↓

React Router checks:

```text
/services
```

↓

Displays the Services component.

Notice:

The server still doesn't generate a special HTML page for:

```text
/services
```

It always sends the same `index.html`.

---

# Important Learning from CSR

## Learning 1

The server **does not generate page-specific HTML**.

It always sends the same HTML shell.

---

## Learning 2

The browser creates the entire UI using JavaScript.

---

## Learning 3

All application pages are bundled into JavaScript.

---

## Learning 4

Navigation between pages does not require another server request because the browser already has all the required JavaScript.

---

## Learning 5

Refreshing any route downloads the same HTML shell again, and React rebuilds the UI in the browser.

---

# Summary (React CSR)

```text
Server

↓

Sends

HTML

+

CSS

+

JavaScript

↓

Browser Executes JavaScript

↓

Browser Generates HTML

↓

Browser Displays UI
```

---

# Key Takeaways

- React follows Client Side Rendering (CSR) by default.
- The server sends an almost empty HTML file.
- The browser downloads JavaScript and builds the page.
- Navigation between pages happens entirely on the client.
- Refreshing any route causes the HTML shell and assets to be downloaded again before React rebuilds the page.

---

# Next.js Production Build

Unlike React (Vite), Next.js does not create a `dist` folder.

Instead, running:

```bash
npm run build
```

creates:

```text
.next/
```

This folder contains everything Next.js needs to serve the application efficiently.

Then start the production server:

```bash
npm start
```

Now the application runs exactly as it would in production.

---

# What Does the `.next` Folder Contain?

The `.next` folder contains many optimized files generated during the build.

Some important ones are:

```text
.next/
│
├── server/
│
├── static/
│
├── cache/
│
├── app/
│
└── build-manifest.json
```

You generally **should not edit** these files manually.

They are generated automatically whenever you run:

```bash
npm run build
```

---

# What Gets Generated?

Unlike React, Next.js generates much more than a single HTML shell.

Depending on the rendering strategy, it may generate:

- HTML
- JavaScript
- CSS
- React Server Component (RSC) Payloads

---

# Understanding `.rsc` Files

One new thing you'll notice is:

```text
.rsc
```

These are:

> **React Server Component Payloads**

Think of them as instructions describing what the UI should look like.

They are **not HTML**.

They are **not JavaScript bundles**.

Instead, they contain serialized information about your Server Components.

---

Suppose we have:

```jsx
export default function Home() {
  return <h1>Home</h1>;
}
```

The server converts this into an internal RSC payload.

The browser later combines:

- HTML
- RSC Payload
- JavaScript

to create an interactive application.

---

# Network Analysis of Next.js

Suppose the user visits:

```text
/
```

The browser sends:

```text
GET /
```

to the server.

Unlike React, Next.js knows exactly which route is being requested.

---

# Server Side Rendering (SSR)

Suppose the requested URL is:

```text
/
```

Next.js executes:

```text
Home Page

↓

Layout

↓

Server Components

↓

Metadata

↓

Generates HTML
```

Now the browser receives:

```text
Complete HTML
```

instead of:

```html
<div id="root"></div>
```

---

# Visual Representation

```text
Browser

↓

Request "/"

↓

Next.js Server

↓

Runs Home Component

↓

Creates HTML

↓

Returns HTML

↓

Browser Displays Page Immediately
```

---

# What Does the Browser Receive?

The browser receives:

- Fully rendered HTML
- CSS
- JavaScript
- RSC Payload

Notice:

The HTML already contains:

```html
<h1>Home</h1>
```

The browser doesn't need JavaScript to create it.

---

# Why Does the Page Appear Faster?

Because the browser doesn't wait for React to execute.

It simply receives ready-made HTML.

Example:

React:

```text
Receive HTML

↓

Download JS

↓

Execute JS

↓

Create HTML
```

Next.js:

```text
Receive HTML

↓

Display Immediately
```

This is one reason why Next.js provides a much faster **First Contentful Paint (FCP)**.

---

# Then Why Is JavaScript Still Downloaded?

Good question.

If HTML already exists,

why download JavaScript?

Answer:

Because HTML is **static**.

JavaScript makes it interactive.

Example:

Without JavaScript:

```text
Button

Counter

Dropdown

Modal
```

cannot respond to user actions.

---

# Hydration

After HTML reaches the browser,

React downloads JavaScript and attaches event listeners.

This process is called:

> **Hydration**

---

Example

Server sends:

```html
<button>Count</button>
```

Initially,

the button is only HTML.

It cannot respond to clicks.

After JavaScript loads,

React connects:

```jsx
onClick;
```

to that button.

Now it becomes interactive.

---

Visual Representation

```text
Server

↓

HTML

↓

Browser Displays HTML

↓

Downloads JavaScript

↓

Hydration

↓

Interactive Website
```

---

# Client Side Navigation in Next.js

Now suppose the user clicks:

```text
About
```

Question:

Will the browser request another complete HTML page?

Not necessarily.

In the App Router,

Next.js often performs **Client-side Navigation**.

Instead of refreshing the entire page,

it requests only the data needed for the next route (often as an RSC payload) and updates the UI.

This makes navigation feel very fast.

---

# Why Does It Feel Like CSR After the First Load?

Because after the first page:

- JavaScript is already loaded.
- React is already running.
- The browser can reuse existing layouts and components.
- Next.js only fetches the data required for the next route.

So subsequent navigations often feel similar to a Single Page Application (SPA).

---

# Refresh Behavior

Suppose the user refreshes:

```text
/services
```

The browser sends:

```text
GET /services
```

to the server.

Now Next.js knows:

```text
The user wants Services Page.
```

Instead of sending a generic HTML shell,

it generates:

```text
Services HTML
```

and returns it.

---

Visual Representation

```text
Refresh

↓

GET /services

↓

Next.js Server

↓

Executes

Services Page

↓

Returns

Services HTML
```

Unlike React,

the server understands which route is requested.

---

# React vs Next.js

## React

```text
Request

↓

index.html

↓

JavaScript

↓

Browser Builds UI
```

---

## Next.js

```text
Request

↓

Next.js Server

↓

Creates HTML

↓

Browser Displays HTML

↓

Hydration

↓

Interactive UI
```

---

# Why Next.js is a Hybrid Framework

Many beginners think:

> "Next.js only uses SSR."

This is **not correct**.

Next.js combines multiple rendering techniques.

### First Page Load

Uses:

✅ Server Side Rendering

because HTML comes from the server.

---

### After JavaScript Loads

Uses:

✅ Client-side Navigation

because route changes happen without full page refreshes.

---

### Interactive Features

Use:

✅ Hydration

to connect JavaScript with the HTML.

---

So the flow looks like:

```text
Server Rendering

↓

HTML

↓

Hydration

↓

Client-side Navigation
```

This combination is why Next.js is called a **Hybrid Rendering Framework**.

---

# CSR vs SSR Comparison

| Feature                | React (CSR)     | Next.js (SSR + Hybrid) |
| ---------------------- | --------------- | ---------------------- |
| Initial HTML           | Almost Empty    | Fully Rendered         |
| SEO                    | Poor by Default | Excellent              |
| Initial Load           | Slower          | Faster                 |
| Browser Creates HTML   | Yes             | No (Server does)       |
| Server Knows Route     | No              | Yes                    |
| Client-side Navigation | Yes             | Yes                    |
| Hydration              | Yes             | Yes                    |
| Uses RSC               | No              | Yes                    |

---

# Real-World Analogy

Imagine ordering food.

## CSR (React)

Restaurant gives you:

- Raw vegetables
- Bread
- Sauce
- Recipe

You cook everything yourself.

---

## SSR (Next.js)

Restaurant cooks the meal first.

You receive a ready-to-eat plate.

---

## Hydration

After serving,

the waiter gives you:

- Spoon
- Fork
- Knife

Now you can interact with the meal comfortably.

Similarly,

Next.js first serves ready-made HTML,

then JavaScript adds interactivity.

---

# Best Practices

✅ Use production mode when comparing rendering behavior.

✅ Understand that HTML and JavaScript have different responsibilities.

✅ Remember that SSR improves SEO and initial loading performance.

✅ Don't think of Next.js as "only SSR"; it uses a hybrid rendering model.

---

# Common Misconceptions

### ❌ Misconception

Next.js only performs SSR.

### ✅ Reality

Next.js combines:

- SSR
- React Server Components
- Hydration
- Client-side Navigation

---

### ❌ Misconception

JavaScript isn't needed in SSR.

### ✅ Reality

JavaScript is still needed for interactivity after hydration.

---

### ❌ Misconception

RSC files are HTML files.

### ✅ Reality

They are serialized React Server Component payloads used by React to update the UI efficiently.

---

# Key Takeaways

- React generates HTML in the browser (CSR).
- Next.js generates HTML on the server (SSR) for the initial request.
- Next.js builds production assets inside the `.next` folder.
- `.rsc` files contain React Server Component payloads.
- HTML reaches the browser before JavaScript executes.
- Hydration makes the HTML interactive.
- Client-side navigation makes route changes fast after the initial load.
- Next.js combines SSR, RSC, Hydration, and CSR, making it a Hybrid Rendering Framework.

---

# Quick Revision

### Where does React generate HTML?

In the browser.

---

### Where does Next.js generate HTML?

On the server (for the initial request).

---

### What folder is created after `npm run build`?

```text
.next
```

---

### What is Hydration?

The process of attaching JavaScript and event listeners to server-rendered HTML.

---

### Why is Next.js called a Hybrid Framework?

Because it combines Server-side Rendering, React Server Components, Hydration, and Client-side Navigation.

---

# Interview Questions

### Q1. What is the difference between CSR and SSR?

CSR generates HTML in the browser using JavaScript, while SSR generates HTML on the server before sending it to the browser.

---

### Q2. Why is Next.js better for SEO?

Because search engines receive fully rendered HTML instead of an empty HTML shell.

---

### Q3. What is Hydration?

Hydration is the process where React attaches JavaScript behavior and event handlers to server-rendered HTML.

---

### Q4. What are `.rsc` files?

They contain serialized React Server Component payloads used by Next.js during rendering and client-side navigation.

---

### Q5. Why is Next.js considered a Hybrid Rendering Framework?

Because it combines SSR for the initial request, React Server Components for efficient rendering, Hydration for interactivity, and Client-side Navigation for fast subsequent page transitions.

---

# Summary

In this lecture, we explored the fundamental difference between **Client-Side Rendering (CSR)** and **Server-Side Rendering (SSR)** by comparing a production-built React (Vite) application with a Next.js application. We learned how React sends a minimal HTML shell and relies on JavaScript to build the UI, while Next.js generates complete HTML on the server, improving performance and SEO. We also introduced **React Server Components (RSC)**, **Hydration**, and **Client-side Navigation**, understanding that Next.js is not purely SSR but a **Hybrid Rendering Framework** that combines the strengths of both server-side and client-side rendering.
