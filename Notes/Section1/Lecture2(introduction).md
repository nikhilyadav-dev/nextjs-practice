# Lecture 2 - Introduction to Next.js & Project Setup

## 📖 What is Next.js?

Next.js is a React Framework developed by :contentReference[oaicite:0]{index=0} that helps developers build fast, scalable, and production-ready web applications.

While React is a JavaScript library used for building user interfaces, Next.js extends React by providing additional features such as:

- File-based Routing
- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- API Routes
- Image Optimization
- SEO Improvements
- Fast Performance
- Full Stack Capabilities

In simple words:

> React helps you build UI, while Next.js helps you build complete web applications.

---

# 🚀 Why Next.js?

Traditional React applications are rendered entirely in the browser, which can lead to:

- Slower initial page loads
- SEO challenges
- Additional configuration requirements

Next.js solves these problems by providing built-in solutions and powerful optimizations.

### Benefits of Next.js

✅ Better Performance

✅ SEO Friendly

✅ File-based Routing

✅ Server Components

✅ Full Stack Development

✅ Faster Development Experience

✅ Built-in Optimizations

---

# React vs Next.js

| React                             | Next.js                           |
| --------------------------------- | --------------------------------- |
| JavaScript Library                | React Framework                   |
| Client-side rendering by default  | Supports SSR, SSG & CSR           |
| Requires React Router for routing | Built-in Routing                  |
| Separate backend required         | Can build APIs inside the project |
| More configuration                | Most features pre-configured      |

---

# 📂 What We Need Before Starting?

Before creating a Next.js project, make sure the following tools are installed:

### 1. Node.js

Next.js runs on Node.js.

Check installation:

```bash
node -v
```

Example Output:

```bash
v22.15.0
```

---

### 2. npm

npm comes bundled with Node.js.

Check version:

```bash
npm -v
```

Example Output:

```bash
10.9.2
```

---

### 3. Visual Studio Code

Recommended code editor for Next.js development.

Features:

- Integrated Terminal
- IntelliSense
- Extensions Support
- Git Integration

---

# 🛠 Creating a Next.js Project

Next.js provides a tool called **create-next-app** which automatically sets up a new project with all required configurations.

### Command

```bash
npx create-next-app@latest
```

---

## Understanding the Command

```bash
npx create-next-app@latest
```

### npx

Executes a package without installing it globally.

### create-next-app

Official Next.js project creation tool.

### @latest

Downloads the latest version.

---

# Project Creation Process

Run:

```bash
npx create-next-app@latest
```

You may see prompts like:

```bash
What is your project name?
```

Example:

```bash
my-next-app
```

Then additional questions:

```bash
Would you like to use TypeScript?
```

```bash
Would you like to use ESLint?
```

```bash
Would you like to use Tailwind CSS?
```

```bash
Would you like your code inside a src/ directory?
```

```bash
Would you like to use App Router?
```

```bash
Would you like to customize the import alias?
```

Choose options according to your learning requirements.

---

# 📁 Enter the Project Folder

After project creation:

```bash
cd my-next-app
```

---

# Running the Development Server

Start the application:

```bash
npm run dev
```

Output:

```bash
Ready in 2.3s
```

The application will run on:

```text
http://localhost:3000
```

Open this URL in your browser.

---

# Opening the Project in VS Code

Move to project directory:

```bash
cd my-next-app
```

Open VS Code:

```bash
code .
```

The dot (`.`) means:

```text
Open the current folder in VS Code
```

---

# First Look at a Next.js Project Structure

A newly created Next.js application may look like:

```bash
my-next-app/
│
├── app/
│   ├── page.js
│   ├── layout.js
│
├── public/
│
├── node_modules/
│
├── package.json
├── next.config.js
└── README.md
```

---

# Important Files (Overview)

### app/

Contains application routes and pages.

---

### page.js

Represents the homepage route.

Example:

```jsx
export default function Home() {
  return <h1>Hello Next.js</h1>;
}
```

---

### layout.js

Provides a common layout shared across pages.

Example:

```jsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

---

### public/

Stores static assets:

- Images
- Icons
- PDFs
- Other public files

Example:

```text
/public/logo.png
```

---

### package.json

Contains:

- Dependencies
- Scripts
- Project metadata

Example scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

---

# Common Commands

### Create Project

```bash
npx create-next-app@latest
```

### Move into Project

```bash
cd project-name
```

### Open VS Code

```bash
code .
```

### Start Development Server

```bash
npm run dev
```

### Install Packages

```bash
npm install package-name
```

---

# Key Takeaways

- Next.js is a React Framework.
- Developed by Vercel.
- Provides routing, rendering, optimization, and backend capabilities.
- Uses React under the hood.
- Project can be created using `npx create-next-app@latest`.
- Development server runs using `npm run dev`.
- Default local URL is `http://localhost:3000`.
- VS Code is commonly used for development.

---

# Quick Revision

### What is Next.js?

A React framework used to build modern full-stack web applications.

---

### Who developed Next.js?

Vercel.

---

### Command to create a Next.js project?

```bash
npx create-next-app@latest
```

---

### Command to start the development server?

```bash
npm run dev
```

---

### Default local URL?

```text
http://localhost:3000
```

---

### Why use Next.js?

- Better Performance
- SEO Friendly
- File-based Routing
- Full Stack Features
- Production Ready

---

# Interview Questions

### Q1. What is the difference between React and Next.js?

React is a library for building user interfaces, whereas Next.js is a framework built on top of React that provides routing, rendering strategies, optimization, and backend capabilities.

---

### Q2. What does `npx` do?

`npx` executes packages directly without installing them globally.

---

### Q3. Which command is used to create a Next.js project?

```bash
npx create-next-app@latest
```

---

### Q4. Which command starts the Next.js development server?

```bash
npm run dev
```

---

### Q5. What is the default port used by Next.js?

```text
3000
```

---

# Summary

In this lecture, we learned what Next.js is, why it is used, how it differs from React, how to install and create a new Next.js application using `npx create-next-app@latest`, how to open the project in VS Code, and how to run the development server using `npm run dev`.

---

### 📝 Notes will be updated as each lecture is completed. Feel free to ⭐ this repo if you find it helpful!
