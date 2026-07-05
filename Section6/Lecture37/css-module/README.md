# Lecture 36 - Using CSS Modules in Next.js

## 📖 Introduction

When building a Next.js application, we need styling for:

- Pages
- Components
- Layouts
- Buttons
- Cards
- Forms

There are multiple ways to add CSS in Next.js:

```text
1. Global CSS

2. CSS Modules

3. Tailwind CSS

4. CSS-in-JS Libraries
```

In this lecture, we'll focus on:

```text
Global CSS

vs

CSS Modules
```

and understand why CSS Modules are usually preferred for component-level styling.

---

# What is Global CSS?

Example:

```css
/* home.css */

.title {
  color: red;
}

.btn {
  background: blue;
}
```

Imported as:

```jsx
import "./home.css";
```

---

# How Global CSS Works

When imported:

```jsx
import "./home.css";
```

Next.js loads the CSS into the application.

---

Result:

```text
.title

↓

Available Everywhere
```

---

Think:

```text
Global CSS

↓

One Big CSS File

↓

Entire App Can Use It
```

---

# Example

Home Page:

```jsx
<h1 className="title">Home Page</h1>
```

---

About Page:

```jsx
<h1 className="title">About Page</h1>
```

---

Both use:

```css
.title {
  color: red;
}
```

because the class is global.

---

# Problem with Global CSS

Suppose:

---

Home CSS

```css
.title {
  color: red;
}
```

---

About CSS

```css
.title {
  color: blue;
}
```

---

Question:

Which color wins?

---

Answer:

```text
Depends On CSS Loading Order
```

---

This creates:

```text
CSS Conflicts
```

---

# Example

Component A

```css
.card {
  background: red;
}
```

---

Component B

```css
.card {
  background: blue;
}
```

---

Result:

```text
Both Components

↓

Same Class Name

↓

Conflict
```

---

# Why Is This Problematic?

Imagine:

```text
50 Components

200 CSS Classes

Multiple Developers
```

---

Soon you'll see:

```text
Unexpected Styling

CSS Overrides

Hard To Debug
```

---

This is called:

```text
CSS Namespace Collision
```

---

# Real World Example

Suppose:

```text
Navbar Component

↓

.title
```

---

Blog Component

↓

```text
.title
```

---

Product Component

↓

```text
.title
```

---

Now:

```text
Which .title Is Applied?
```

Hard to predict.

---

# Solution - CSS Modules

Next.js provides:

```text
CSS Modules
```

to solve this problem.

---

# What is a CSS Module?

A CSS Module is:

```text
Locally Scoped CSS
```

---

Meaning:

```text
Class Names

↓

Available Only

↓

Inside That Component
```

---

# Creating CSS Module

Example:

```text
Home.module.css
```

---

```css
.title {
  color: red;
}

.btn {
  background: blue;
}
```

---

# Importing CSS Module

```jsx
import styles from "./Home.module.css";
```

---

Usage:

```jsx
<h1 className={styles.title}>Home Page</h1>
```

---

# What Happens Internally?

You write:

```jsx
styles.title;
```

---

Next.js generates:

```html
<h1 class="Home_title_a8x2k"></h1>
```

---

Another component:

```jsx
styles.title;
```

might become:

```html
<h1 class="About_title_h3k7s"></h1>
```

---

Notice:

```text
Different Class Names
```

---

# Internal Transformation

You Write:

```css
.title
```

---

Next.js Generates:

```css
.Home_title_a8x2k
```

---

Therefore:

```text
No Collision
```

---

# Visualization

Global CSS

```text
.title

↓

Everyone Uses Same Class
```

---

CSS Module

```text
Home_title_a8x2k

About_title_h3k7s

Product_title_g7m2d
```

---

Each component gets:

```text
Unique CSS Class
```

---

# Why CSS Modules Are Better

## 1. No Naming Conflicts

Global CSS:

```text
.title

.title

.title
```

---

CSS Modules:

```text
Home_title_xxx

About_title_xxx

Blog_title_xxx
```

---

No collision.

---

## 2. Component Isolation

Styles belong only to:

```text
That Component
```

---

Example:

```text
Home.module.css

↓

Only Home Component
```

---

# 3. Easier Maintenance

When deleting:

```text
Home Component
```

---

You can safely delete:

```text
Home.module.css
```

because styles are isolated.

---

# 4. Better Scalability

Large applications may have:

```text
Hundreds Of Components
```

---

CSS Modules keep styles organized.

---

# Example Comparison

## Global CSS

```css
.card {
  border: 1px solid black;
}
```

---

Usage:

```jsx
<div className="card">
```

---

Problem:

```text
Any Component

Can Affect This Class
```

---

# CSS Module

```css
.card {
  border: 1px solid black;
}
```

---

Usage:

```jsx
<div className={styles.card}>
```

---

Result:

```text
Only This Component

Uses It
```

---

# Typical Next.js Structure

```text
components/

├── Header.jsx
├── Header.module.css

├── Card.jsx
├── Card.module.css

├── Button.jsx
├── Button.module.css
```

---

Benefits:

```text
Component

↓

Own CSS
```

---

Very organized.

---

# When Should We Use Global CSS?

Global CSS is still useful.

---

Examples:

```text
Body Styling

Reset CSS

Typography

Root Variables

Theme Variables
```

---

Example:

```css
body {
  margin: 0;
}
```

---

```css
* {
  box-sizing: border-box;
}
```

---

These belong globally.

---

# globals.css

Next.js usually provides:

```text
app/globals.css
```

---

Purpose:

```text
Application-Wide Styles
```

---

Examples:

```css
body {
  margin: 0;
}
```

---

```css
:root {
  --primary-color: blue;
}
```

---

```css
* {
  box-sizing: border-box;
}
```

---

# Good Practice

Use:

```text
globals.css
```

for:

```text
Global Styles
```

---

Use:

```text
.module.css
```

for:

```text
Component Styles
```

---

# How Next.js Treats CSS Modules

Build Time:

```text
Home.module.css

↓

Processed

↓

Unique Class Names Generated

↓

Optimized CSS
```

---

Browser receives:

```text
Collision-Free CSS
```

---

# Example

File:

```text
Button.module.css
```

---

```css
.btn {
  background: blue;
}
```

---

Component:

```jsx
import styles from "./Button.module.css";

export default function Button() {
  return <button className={styles.btn}>Click</button>;
}
```

---

Generated HTML:

```html
<button class="Button_btn_x7k8p">Click</button>
```

---

# Common Mistakes

### Mistake 1

Using:

```jsx
className = "btn";
```

with CSS Modules.

Wrong.

---

Correct:

```jsx
className={styles.btn}
```

---

### Mistake 2

Forgetting:

```jsx
import styles
```

---

### Mistake 3

Putting component styles in:

```text
globals.css
```

---

Leads to unnecessary global classes.

---

# Best Practices

✅ Use `globals.css` only for truly global styles.

✅ Use CSS Modules for component styling.

✅ Keep CSS file next to its component.

✅ Use meaningful class names.

---

# Global CSS vs CSS Modules

| Global CSS               | CSS Modules                     |
| ------------------------ | ------------------------------- |
| Global Scope             | Local Scope                     |
| Class Conflicts Possible | No Class Conflicts              |
| Harder To Maintain       | Easier To Maintain              |
| Good For App-Wide Styles | Good For Component Styles       |
| Uses `className="title"` | Uses `className={styles.title}` |

---

# Key Takeaways

- Global CSS affects the entire application.
- Global CSS can create class name conflicts.
- CSS Modules provide locally scoped styles.
- Next.js generates unique class names automatically.
- CSS Modules improve maintainability and scalability.
- Use `globals.css` for application-wide styles.
- Use `.module.css` files for component-specific styles.

---

# Quick Revision

### What is Global CSS?

CSS available throughout the entire application.

---

### Main problem of Global CSS?

```text
Class Name Collisions
```

---

### What is CSS Module?

Locally scoped CSS.

---

### File Naming Convention?

```text
Component.module.css
```

---

### Import Syntax?

```jsx
import styles from "./Home.module.css";
```

---

### Usage?

```jsx
className={styles.title}
```

---

# Interview Questions

### Q1. Why are CSS Modules preferred over Global CSS?

Because they prevent class name collisions and keep styles scoped to individual components.

---

### Q2. How does Next.js prevent CSS conflicts in CSS Modules?

By generating unique class names during the build process.

---

### Q3. When should Global CSS be used?

For application-wide styles such as resets, typography, variables, and body styling.

---

### Q4. What happens internally when using CSS Modules?

Next.js transforms class names into unique identifiers so that styles remain isolated.

---

### Q5. What is the naming convention for CSS Modules?

```text
Component.module.css
```

---

# Summary

In this lecture, we learned the difference between Global CSS and CSS Modules in Next.js. While Global CSS applies styles across the entire application and can cause naming conflicts, CSS Modules provide locally scoped styles by generating unique class names during the build process. This makes applications easier to maintain, debug, and scale. A common best practice is to keep global styles inside `globals.css` and component-specific styles inside `.module.css` files.
