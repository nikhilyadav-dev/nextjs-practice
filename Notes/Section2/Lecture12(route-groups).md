# Lecture 12 - Route Groups in Next.js

## 📖 Introduction

As an application grows, the number of pages also increases.

For example, an application may contain:

- Home
- About
- Services
- Blogs
- Files
- Dashboard
- Login
- Signup
- Admin

If we keep all these routes directly inside the `app` folder, the project quickly becomes difficult to organize and maintain.

Next.js solves this problem using **Route Groups**.

Route Groups allow us to organize related routes into separate folders **without affecting the URL**.

---

# What are Route Groups?

A Route Group is a special folder enclosed inside **parentheses `()`**.

Example:

```bash
(marketing)
(application)
(auth)
```

Unlike normal folders, Route Groups **do not become part of the URL**.

They are only used to organize the project structure.

---

# Why Do We Need Route Groups?

Imagine a large company website.

It contains two different sections.

### Marketing Pages

- Home
- About
- Services
- Contact

These pages are publicly accessible.

---

### Application Pages

- Blogs
- Files
- Dashboard
- Settings

These pages belong to the main application.

If we keep everything inside the same folder:

```bash
app/
│
├── about/
├── blogs/
├── contact/
├── dashboard/
├── files/
├── services/
├── settings/
```

After some time, the project becomes difficult to manage.

---

# Solution: Route Groups

We organize related routes into groups.

Example:

```bash
app/
│
├── (marketing)/
│   ├── about/
│   ├── services/
│   └── contact/
│
└── (application)/
    ├── blogs/
    ├── files/
    └── dashboard/
```

Now the project becomes much more organized.

---

# Important Point

Although the folders are named:

```text
(marketing)

(application)
```

they **do not appear in the URL**.

Example:

Folder:

```bash
(marketing)/
    about/
```

URL:

```text
/about
```

NOT

```text
/marketing/about
```

---

Another Example

Folder:

```bash
(application)/
    blogs/
```

URL:

```text
/blogs
```

NOT

```text
/application/blogs
```

---

# How to Create a Route Group?

Simply create a folder using parentheses.

Example:

```bash
(marketing)
```

or

```bash
(application)
```

That's all.

The parentheses tell Next.js:

> "This folder is only for organization.
> Do not include it in the URL."

---

# Example Folder Structure

```bash
app/
│
├── (marketing)/
│   ├── about/
│   │   └── page.js
│   │
│   └── services/
│       └── page.js
│
└── (application)/
    ├── blogs/
    │   └── page.js
    │
    └── files/
        └── page.js
```

Generated URLs

```text
/about

/services

/blogs

/files
```

Notice:

```text
(marketing)
(application)
```

never appear in the URL.

---

# Real-World Example

Suppose you build an e-commerce website.

Public Pages:

```text
/
About
Contact
Products
```

Authenticated Pages:

```text
Orders
Wishlist
Cart
Profile
```

Folder Structure:

```bash
app/
│
├── (public)/
│   ├── about/
│   ├── contact/
│   └── products/
│
└── (user)/
    ├── orders/
    ├── profile/
    └── wishlist/
```

This structure is much easier to understand than placing everything inside one folder.

---

# Benefits of Route Groups

✅ Better Project Organization

✅ Cleaner Folder Structure

✅ Easier Maintenance

✅ Supports Different Layouts

✅ Does Not Affect URLs

---

# Route Groups and Layouts

One of the biggest advantages of Route Groups is that each group can have its own layout.

Example:

```bash
(marketing)/
│
├── layout.js
├── about/
└── services/
```

Every page inside:

```text
(marketing)
```

will use:

```text
marketing/layout.js
```

Similarly,

```bash
(application)/
│
├── layout.js
├── blogs/
└── files/
```

Every page inside:

```text
(application)
```

uses:

```text
application/layout.js
```

---

# Why is This Useful?

Imagine your website.

Marketing pages have:

```text
Header

Navigation

Footer
```

Application pages have:

```text
Sidebar

Dashboard Navigation
```

Instead of writing conditions like:

```jsx
if (page === "/blogs") {
  // different layout
}
```

we simply use different layouts.

---

# Real Example

Suppose we have:

```bash
app/
│
├── layout.js
│
├── (marketing)/
│   ├── layout.js
│   ├── about/
│   └── services/
│
└── (application)/
    ├── layout.js
    ├── blogs/
    └── files/
```

---

Marketing Layout

```jsx
export default function MarketingLayout({ children }) {
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

Application Layout

```jsx
export default function AppLayout({ children }) {
  return (
    <>
      <Sidebar />

      {children}
    </>
  );
}
```

Now,

```text
/about
```

gets:

```text
Header

About

Footer
```

while

```text
/blogs
```

gets:

```text
Sidebar

Blogs
```

without affecting the URLs.

---

# Removing Header and Footer from the 404 Page

Suppose your Root Layout looks like this:

```jsx
<Header />;

{
  children;
}

<Footer />;
```

Now even the 404 page displays:

```text
Header

404 Page

Footer
```

Sometimes we don't want this.

We want a clean 404 page without navigation.

---

# Solution Using Route Groups

Instead of placing the Header and Footer inside:

```bash
app/layout.js
```

move them into separate Route Group layouts.

Example:

```bash
app/
│
├── layout.js
│
├── not-found.js
│
├── (marketing)/
│   ├── layout.js
│   ├── about/
│   └── services/
│
└── (application)/
    ├── layout.js
    ├── blogs/
    └── files/
```

---

## Root Layout

```jsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

Notice:

There is **no Header or Footer** here.

---

## Marketing Layout

```jsx
export default function MarketingLayout({ children }) {
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

## Application Layout

```jsx
export default function AppLayout({ children }) {
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

# How This Solves the Problem

When the user visits:

```text
/about
```

Rendering:

```text
Root Layout

↓

Marketing Layout

↓

About Page
```

Result:

```text
Header

About

Footer
```

---

When the user visits:

```text
/blogs
```

Rendering:

```text
Root Layout

↓

Application Layout

↓

Blogs Page
```

Result:

```text
Header

Blogs

Footer
```

---

When the user visits an invalid URL:

```text
/random-page
```

Rendering:

```text
Root Layout

↓

not-found.js
```

Since the Root Layout no longer contains:

```text
Header

Footer
```

The 404 page appears as:

```text
404

Page Not Found
```

without unnecessary navigation.

---

# Rendering Flow

User Visits

```text
/about
```

↓

```text
Root Layout

↓

Marketing Layout

↓

About Page
```

---

User Visits

```text
/blogs
```

↓

```text
Root Layout

↓

Application Layout

↓

Blogs Page
```

---

User Visits

```text
/random-page
```

↓

```text
Root Layout

↓

not-found.js
```

Notice:

The Route Group layouts are not involved because no valid route exists inside them.

---

# Common Mistakes

### Mistake 1

Thinking Route Groups affect URLs.

Wrong:

```text
/marketing/about
```

Correct:

```text
/about
```

---

### Mistake 2

Using normal folders instead of parentheses.

Wrong:

```bash
marketing/
```

Correct:

```bash
(marketing)/
```

---

### Mistake 3

Placing common UI inside the Root Layout when it should only apply to certain groups.

Instead, move shared UI into the appropriate Route Group layout.

---

# Best Practices

✅ Use Route Groups to organize large projects.

✅ Group related routes together (Marketing, Application, Auth, Admin).

✅ Use Route Groups to provide different layouts for different sections.

✅ Keep the Root Layout minimal if some pages (like custom 404 pages) should not display shared UI.

---

# Key Takeaways

- Route Groups organize routes without changing URLs.
- Route Groups are created using parentheses `()`.
- Route Groups improve project structure and maintainability.
- Each Route Group can have its own `layout.js`.
- Different sections of an application can use different layouts.
- Moving shared UI from the Root Layout into Route Group layouts allows pages like `not-found.js` to have a clean, independent layout.

---

# Quick Revision

### How do we create a Route Group?

```bash
(marketing)
```

---

### Does a Route Group appear in the URL?

No.

---

### Why are Route Groups useful?

To organize routes and assign different layouts without changing URLs.

---

### Can Route Groups have their own layouts?

Yes.

---

### Why move the Header and Footer out of the Root Layout?

So pages like `not-found.js` are not forced to display them.

---

# Interview Questions

### Q1. What is a Route Group in Next.js?

A Route Group is a special folder enclosed in parentheses that organizes routes without affecting the URL structure.

---

### Q2. How do you create a Route Group?

By wrapping the folder name in parentheses.

Example:

```bash
(marketing)
```

---

### Q3. Do Route Groups change URLs?

No. They are only used for organizing the project structure.

---

### Q4. Why are Route Groups commonly used with layouts?

Because each Route Group can have its own `layout.js`, allowing different sections of the application to share different UI.

---

### Q5. How can Route Groups help customize the 404 page?

By moving shared UI (such as Header and Footer) from the Root Layout into Route Group layouts, the global `not-found.js` page can render without those components.

---

# Summary

In this lecture, we learned about **Route Groups**, a powerful feature in Next.js used to organize large applications without changing the URL structure. We explored how Route Groups are created using parentheses, why they improve project organization, and how they allow different sections of an application to use different layouts. We also learned how Route Groups can be used to remove shared components like the Header and Footer from the global 404 page by keeping the Root Layout minimal and moving common UI into Route Group-specific layouts.
