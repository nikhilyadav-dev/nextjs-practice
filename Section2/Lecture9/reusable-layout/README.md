# Lecture 9 - Building Reusable Layouts in Next.js

## 📖 Introduction

As applications grow, many pages share the same UI components.

For example:

- Header
- Navigation Bar
- Sidebar
- Footer
- Dashboard Menu

If we manually add these components to every page, we'll end up writing the same code repeatedly.

Next.js solves this problem using **Layouts**.

A Layout allows us to create **shared UI** that automatically wraps multiple pages without repeating code.

---

# What is a Layout in Next.js?

A Layout is a special file named:

```text
layout.js
```

that wraps one or more pages with common UI.

Think of it as a **template** that surrounds your page content.

Example:

```text
-----------------------
Header
-----------------------

Page Content

-----------------------
Footer
-----------------------
```

Every page inside that route automatically gets this layout.

---

# Why Do We Need Layouts?

Suppose we have three pages:

```text
Home
About
Contact
```

Without layouts:

```jsx
export default function Home() {
  return (
    <>
      <Header />
      <HomeContent />
      <Footer />
    </>
  );
}
```

```jsx
export default function About() {
  return (
    <>
      <Header />
      <AboutContent />
      <Footer />
    </>
  );
}
```

```jsx
export default function Contact() {
  return (
    <>
      <Header />
      <ContactContent />
      <Footer />
    </>
  );
}
```

Notice that:

```text
Header
Footer
```

are repeated on every page.

This violates the **DRY (Don't Repeat Yourself)** principle.

---

# Solution: Root Layout

Instead of repeating code, we place shared components inside:

```bash
app/
└── layout.js
```

Example:

```jsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
```

Now every page automatically gets:

```text
Header

Current Page

Footer
```

---

# The Most Important File: `layout.js`

The `layout.js` file is one of the most important files in the Next.js App Router.

It is responsible for:

- Creating common UI
- Wrapping pages
- Avoiding duplicate code
- Organizing application structure
- Providing shared layouts for nested routes

You can think of it as the **parent component** of all pages inside its folder.

---

# Understanding the `children` Prop

The most important part of a layout is:

```jsx
{
  children;
}
```

Example:

```jsx
export default function RootLayout({ children }) {
  return (
    <>
      <Header />

      {children}

      <Footer />
    </>
  );
}
```

---

## What is `children`?

`children` represents the page that is currently being visited.

For example:

If the user visits:

```text
/about
```

then:

```jsx
{
  children;
}
```

becomes:

```jsx
<AboutPage />
```

If the user visits:

```text
/contact
```

then:

```jsx
{
  children;
}
```

becomes:

```jsx
<ContactPage />
```

So, `children` is simply a placeholder where the matching page is rendered.

---

# How Does Rendering Work Under the Hood?

This is one of the most important concepts in Next.js.

Suppose we have:

```bash
app/
│
├── layout.js
├── page.js
└── about/
    └── page.js
```

User visits:

```text
/about
```

### Step 1

Next.js checks the URL.

```text
/about
```

↓

Matches:

```bash
about/page.js
```

---

### Step 2

Before rendering the page,

Next.js checks:

```text
Does this route have any layout?
```

Yes.

```bash
app/layout.js
```

---

### Step 3

Next.js renders:

```jsx
<RootLayout>
  <AboutPage />
</RootLayout>
```

Internally it behaves almost like:

```jsx
RootLayout({
  children: <AboutPage />,
});
```

---

### Step 4

Inside the layout:

```jsx
<>
  Header
  {children}
  Footer
</>
```

becomes:

```jsx
<>
  Header
  <AboutPage />
  Footer
</>
```

---

### Final Output

```text
-----------------
Header
-----------------

About Page

-----------------
Footer
-----------------
```

---

# Visual Representation

```text
User visits:

/about

        ↓

Next.js finds

about/page.js

        ↓

Looks for layout.js

        ↓

Creates

<Layout>
   <AboutPage />
</Layout>

        ↓

children becomes

<AboutPage />

        ↓

Browser renders

Header

About Page

Footer
```

---

# Nested Layouts

Layouts are not limited to the root of the application.

We can also create layouts for specific sections.

Example:

```bash
services/
├─ app-dev/
│  └─ page.js
├─ web-dev/
│  └─ page.js
├─ layout.js
└─ page.js
```

---

## Service Layout

```jsx
export default function ServiceLayout({ children }) {
  return (
    <section>
      Service Layout
      {children}
    </section>
  );
}
```

---

# How Nested Layout Works

Suppose the user visits:

```text
/services/web-dev
```

Next.js renders:

```jsx
RootLayout
    ↓
ServiceLayout
    ↓
WebDevPage
```

Internally, it is similar to:

```jsx
<RootLayout>
  <ServiceLayout>
    <WebDevPage />
  </ServiceLayout>
</RootLayout>
```

---

# Rendering Flow

```text
User

↓

/services/web-dev

↓

Root Layout

↓

Service Layout

↓

Web Development Page
```

---

# Final UI

```text
-------------------
Global Header
-------------------

Service Layout

-------------------

Web Development Page

-------------------

Global Footer
-------------------
```

Notice that:

- Header comes from `app/layout.js`
- "Service Layout" comes from `services/layout.js`
- Page content comes from `services/web-dev/page.js`

Each layout wraps the page beneath it.

---

# Layout Hierarchy

```text
Root Layout

      ↓

Services Layout

      ↓

Web Development Page
```

You can have multiple layout levels depending on your folder structure.

---

# Why Does `layout.js` Render Before `page.js`?

Because the layout acts as the **parent wrapper**.

The page is passed into the layout through the `children` prop.

Conceptually, Next.js does something like this:

```jsx
<ServiceLayout>
  <Page />
</ServiceLayout>
```

Since the layout contains the page, the layout must be created first.

Only after the layout is ready does React insert the page into:

```jsx
{
  children;
}
```

This is why the layout always renders before the page.

---

# Benefits of Layouts

✅ Reusable UI

✅ Cleaner Code

✅ No Duplicate Components

✅ Better Folder Organization

✅ Easy Maintenance

✅ Supports Nested Layouts

✅ Shared Navigation

---

# Common Mistakes

### Mistake 1

Forgetting to render `children`.

Wrong:

```jsx
export default function Layout() {
  return <>Header</>;
}
```

No page will appear because there is no place to render it.

---

Correct:

```jsx
export default function Layout({ children }) {
  return (
    <>
      Header
      {children}
    </>
  );
}
```

---

### Mistake 2

Repeating the same Header and Footer in every page.

Instead, place them inside `layout.js`.

---

### Mistake 3

Creating layouts when only one page needs that UI.

Use layouts only when multiple pages share the same structure.

---

# Key Takeaways

- `layout.js` is a special file used to create reusable layouts.
- Shared components like Header and Footer belong inside layouts.
- `children` represents the currently active page.
- Layouts wrap pages automatically.
- Nested folders can have their own layouts.
- Layouts are rendered before pages because they act as parent wrappers.
- Multiple layouts can be nested together.

---

# Quick Revision

### What is `layout.js`?

A special file that creates shared UI for multiple pages.

---

### Why do we use layouts?

To avoid repeating common components such as Header, Footer, and Navigation.

---

### What is `children`?

The currently active page rendered inside the layout.

---

### Which renders first?

```text
layout.js
```

Then:

```text
page.js
```

because the page is inserted into the layout through `children`.

---

### Can layouts be nested?

Yes.

Every folder can have its own `layout.js`.

---

# Interview Questions

### Q1. What is the purpose of `layout.js` in Next.js?

It provides reusable UI that wraps pages and prevents code duplication.

---

### Q2. What is the `children` prop?

It is a placeholder where Next.js renders the current page component.

---

### Q3. Why does `layout.js` render before `page.js`?

Because the layout is the parent wrapper, and the page is passed into it through the `children` prop.

---

### Q4. Can multiple layouts exist in one application?

Yes. Next.js supports nested layouts based on the folder structure.

---

### Q5. What happens when the user visits `/services/web-dev`?

Next.js renders:

```text
Root Layout
      ↓
Services Layout
      ↓
Web Development Page
```

forming a hierarchy where each layout wraps the page beneath it.

---

# Summary

In this lecture, we learned how **Layouts** work in Next.js. The `layout.js` file acts as a reusable wrapper for pages, allowing us to share common UI such as headers, footers, and navigation across multiple routes. We explored the role of the `children` prop, which represents the current page, and understood the rendering process where layouts are created first and pages are injected into them. We also learned how nested layouts work, enabling different sections of an application to have their own shared layouts while still inheriting the global layout.
