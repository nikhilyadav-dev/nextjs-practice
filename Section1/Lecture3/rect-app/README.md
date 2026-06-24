# Lecture 3 - React vs Next.js | Understanding Rendering

## 📖 Introduction

In this lecture, we compared how React (Vite) and Next.js render applications and deliver content to the browser.

The main focus was understanding:

- Client Side Rendering (CSR)
- Server Side Rendering (SSR)
- How React and Next.js send content to the browser
- Server Components
- Client Components

---

# React vs Next.js

| Feature         | React (Vite)                | Next.js                                 |
| --------------- | --------------------------- | --------------------------------------- |
| Rendering       | Client Side Rendering (CSR) | Server Side Rendering (SSR) + CSR + SSG |
| Routing         | Requires React Router       | Built-in File Based Routing             |
| Initial HTML    | Mostly Empty                | Pre-rendered HTML                       |
| SEO             | Poor by Default             | Better SEO                              |
| Performance     | More Client Work            | Less Client Work                        |
| Backend Support | Separate Backend Required   | Built-in Backend Support                |

---

# Method 1: View Source & Network Inspection

## Steps

### React (Vite)

1. Open Application
2. Right Click → View Page Source
3. Open Developer Tools
4. Network Tab
5. Inspect Response

---

## React (Vite) Result

When viewing the page source:

```html
<body>
  <div id="root"></div>
</body>
```

The browser initially receives a minimal HTML file.

After that:

1. JavaScript files are downloaded
2. React executes in the browser
3. Components are rendered
4. UI becomes visible

This process is called:

> Client Side Rendering (CSR)

---

## Next.js Result

When viewing the page source:

```html
<body>
  <div>
    <h1>Welcome</h1>
    <p>Hello Next.js</p>
  </div>
</body>
```

The server already generates the page HTML before sending it to the browser.

The browser receives:

- HTML
- Required CSS
- JavaScript for hydration

As a result, content appears much faster.

This is called:

> Server Side Rendering (SSR)

or

> Pre-rendering

depending on the rendering strategy used.

---

# Understanding What Happens Behind The Scenes

## React (Vite)

```text
Browser Request
       ↓
Server Sends Empty HTML
       ↓
Browser Downloads JS
       ↓
React Executes
       ↓
UI Rendered
```

---

## Next.js

```text
Browser Request
       ↓
Next.js Server Generates HTML
       ↓
HTML Sent To Browser
       ↓
Browser Displays Content
       ↓
Hydration Happens
```

---

# Important Concept

## Static Server vs Dynamic Server

### React (Vite)

The Vite development server mainly serves project files and assets during development.

```text
localhost:5173
```

The browser receives:

- HTML
- CSS
- JavaScript

and React handles rendering on the client side.

---

### Next.js

Next.js runs a Node.js server.

```text
localhost:3000
```

The server can:

- Execute JavaScript
- Fetch Data
- Generate HTML
- Handle API Routes
- Perform Server Side Rendering

before sending the response to the browser.

---

# About node_modules

During the lecture, it was observed that many server-related packages exist inside:

```text
node_modules/
```

Examples:

```text
node_modules/next
node_modules/react
node_modules/react-dom
```

These packages contain the framework implementation.

⚠️ Important:

Although you can technically modify files inside `node_modules`, it is **not recommended** because:

- Changes are temporary
- Reinstalling dependencies removes changes
- It can break your application

Always configure behavior through project configuration files instead.

---

# Method 2: Disable JavaScript

## Steps

1. Open Chrome DevTools
2. Press:

```text
Ctrl + Shift + P
```

3. Search:

```text
Disable JavaScript
```

4. Refresh the page

---

## React (Vite) Result

The page becomes mostly blank.

Reason:

```text
React requires JavaScript
to render components.
```

Since JavaScript is disabled:

- React cannot execute
- Components cannot render
- UI disappears

This demonstrates Client Side Rendering.

---

## Next.js Result

The page content is still visible.

Reason:

```text
HTML was already generated
on the server.
```

Even without JavaScript:

- Content remains visible
- Text can still be read
- SEO remains effective

However:

- Buttons may stop working
- Interactive features may not function

because hydration requires JavaScript.

---

# Method 3: console.log Comparison

## React (Vite)

### App.jsx

```jsx
console.log("Running Vite");

function App() {
  return <h1>Hello React</h1>;
}

export default App;
```

Output:

```text
Running Vite
```

appears inside:

```text
Browser Console
```

Reason:

React components execute in the browser.

---

## Next.js

### page.js

```jsx
console.log("Running Next");

export default function Home() {
  return <h1>Hello Next.js</h1>;
}
```

Output appears inside:

```text
Terminal
```

or

```text
Node.js Server Console
```

Reason:

By default, Next.js pages are Server Components.

They execute on the server before HTML is sent to the browser.

---

# Server Components

## What Are Server Components?

Server Components are components that execute on the server.

Example:

```jsx
export default function Home() {
  return <h1>Server Component</h1>;
}
```

Characteristics:

✅ Runs on Server

✅ Better Performance

✅ Smaller Client Bundle

✅ Direct Database Access

✅ Better Security

---

# Client Components

Sometimes we need:

- useState
- useEffect
- Event Handlers
- Browser APIs

For these cases we use:

```jsx
"use client";
```

at the top of the file.

Example:

```jsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

# Server Component vs Client Component

| Feature             | Server Component | Client Component |
| ------------------- | ---------------- | ---------------- |
| Runs On             | Server           | Browser          |
| useState            | ❌               | ✅               |
| useEffect           | ❌               | ✅               |
| Event Handlers      | ❌               | ✅               |
| Faster Initial Load | ✅               | ❌               |
| Access Browser APIs | ❌               | ✅               |

---

# Key Takeaways

- React (Vite) primarily uses Client Side Rendering.
- Next.js supports Server Side Rendering.
- React requires JavaScript to render UI.
- Next.js can show content even when JavaScript is disabled.
- By default, components in the `app` directory are Server Components.
- Client Components require `"use client"`.
- Server Components execute on the server.
- Client Components execute in the browser.
- Next.js provides better SEO and initial page performance.

---

# Quick Revision

### What is CSR?

Client Side Rendering.

Browser downloads JavaScript and renders the UI.

---

### What is SSR?

Server Side Rendering.

Server generates HTML before sending it to the browser.

---

### Why does React show a blank page when JavaScript is disabled?

Because React needs JavaScript to render components.

---

### Why does Next.js still show content when JavaScript is disabled?

Because HTML is already generated on the server.

---

### How do we create a Client Component?

```jsx
"use client";
```

---

### What is the default component type in Next.js App Router?

Server Component.

---

# Interview Questions

### Q1. What is the major difference between React and Next.js rendering?

React primarily uses Client Side Rendering, whereas Next.js supports Server Side Rendering and pre-rendering.

---

### Q2. What are Server Components?

Components that execute on the server before HTML is sent to the browser.

---

### Q3. Why is Next.js considered SEO-friendly?

Because page content is available in the HTML generated by the server.

---

### Q4. What does `"use client"` do?

Marks a component as a Client Component so it can use hooks, event handlers, and browser APIs.

---

### Q5. Where does `console.log()` appear in a Server Component?

In the terminal/server console, not the browser console.

---

# Summary

This lecture demonstrated the practical differences between React (Vite) and Next.js. By inspecting page source, disabling JavaScript, and comparing console logs, we learned how React relies on Client Side Rendering while Next.js can render content on the server. We also introduced Server Components and Client Components, which form the foundation of modern Next.js applications.

---

### 📝 Notes will be updated as each lecture is completed. Feel free to ⭐ this repo if you find it helpful!
