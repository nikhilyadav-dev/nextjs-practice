# Lecture 42 - Writing Backend Code in Next.js | Backend Development with Next.js

## 📖 Introduction

One of the biggest advantages of Next.js over React is:

```text
React

↓

Frontend Only

--------------------

Next.js

↓

Frontend + Backend
```

This means:

```text
Single Project

↓

Frontend

+

Backend
```

can exist together.

---

# Why Next.js Is Called a Full Stack Framework?

Because Next.js allows us to write:

```text
UI Components

↓

Frontend
```

and

```text
API Endpoints

↓

Backend
```

inside the same project.

---

Example:

```text
app/

├── page.js
├── about/page.js
└── api/
    └── users/
        └── route.js
```

---

Here:

```text
page.js

↓

Frontend
```

and

```text
route.js

↓

Backend
```

---

# page.js vs route.js

This is one of the most important concepts.

---

# page.js

Purpose:

```text
Generate UI
```

---

Example:

```jsx
export default function Home() {
  return <h1>Home Page</h1>;
}
```

---

Route:

```text
/
```

---

Response:

```html
<h1>Home Page</h1>
```

---

Think:

```text
page.js

↓

UI

↓

HTML
```

---

# route.js

Purpose:

```text
Create API Endpoint
```

---

Example:

```jsx
export async function GET() {
  return Response.json({
    message: "Hello",
  });
}
```

---

Route:

```text
/api/users
```

---

Response:

```json
{
  "message": "Hello"
}
```

---

Think:

```text
route.js

↓

Backend Logic

↓

JSON Response
```

---

# Comparison

| page.js      | route.js         |
| ------------ | ---------------- |
| Generates UI | Generates API    |
| Returns JSX  | Returns Response |
| Frontend     | Backend          |
| Browser Page | API Endpoint     |

---

# Example Structure

```text
app/

├── page.js

└── api/
    └── users/
        └── route.js
```

---

Access:

```text
localhost:3000
```

↓

```text
page.js
```

---

Access:

```text
localhost:3000/api/users
```

↓

```text
route.js
```

---

# route.js HTTP Methods

Next.js allows:

```jsx
GET();

POST();

PUT();

PATCH();

DELETE();
```

---

Example

```jsx
export async function GET() {
  return Response.json({
    success: true,
  });
}
```

---

# Backend Code in Next.js

Because:

```text
route.js

↓

Runs On Server
```

we can use:

```text
File System

Database

Node APIs

Environment Variables
```

---

This is impossible in normal React.

---

# process.cwd()

One of the most common Node.js methods used in Next.js.

---

Meaning:

```text
Current Working Directory
```

---

Example:

```jsx
console.log(process.cwd());
```

Output:

```text
C:/Projects/my-next-app
```

---

Think:

```text
Project Root Folder
```

---

Visualization

```text
my-next-app/

├── app/
├── public/
├── package.json
```

---

`process.cwd()`

↓

```text
my-next-app
```

---

# Why Is It Useful?

Suppose we want to save:

```text
notes.txt
```

inside project.

---

Instead of:

```text
C:/Users/Nikhil/Desktop/...
```

hardcoding paths,

we can use:

```jsx
process.cwd();
```

---

Example:

```jsx
const filePath = process.cwd() + "/notes.txt";
```

---

Result:

```text
ProjectRoot/notes.txt
```

---

# writeFile()

Node.js provides:

```jsx
writeFile();
```

for writing files.

---

Import

```jsx
import { writeFile } from "fs/promises";
```

---

Example

```jsx
await writeFile("test.txt", "Hello Next.js");
```

---

Result

```text
test.txt

↓

Created
```

---

Content

```text
Hello Next.js
```

---

# Example With process.cwd()

```jsx
const path = process.cwd() + "/test.txt";

await writeFile(path, "Hello World");
```

---

Execution

```text
Project Folder

↓

test.txt Created

↓

Content Written
```

---

# readFile()

Used for reading files.

---

Import

```jsx
import { readFile } from "fs/promises";
```

---

Example

```jsx
const data = await readFile("test.txt", "utf-8");
```

---

Result

```text
Hello World
```

---

Visualization

```text
test.txt

↓

readFile()

↓

String Returned
```

---

# Full Example

```jsx
import { writeFile, readFile } from "fs/promises";

export async function GET() {
  const path = process.cwd() + "/test.txt";

  await writeFile(path, "Hello Next.js");

  const data = await readFile(path, "utf-8");

  return Response.json({
    data,
  });
}
```

---

Execution

```text
API Hit

↓

File Created

↓

File Read

↓

JSON Returned
```

---

Response

```json
{
  "data": "Hello Next.js"
}
```

---

# Why Can We Use File System APIs?

Because:

```text
route.js

↓

Server Side
```

---

Node.js APIs are available.

---

Examples:

```text
fs

path

crypto

process
```

---

But NOT inside:

```text
Client Components
```

---

Example

```jsx
"use client";

import { readFile } from "fs/promises";
```

---

Result

```text
Build Error
```

---

Why?

Because:

```text
Browser

↓

Cannot Access Server Files
```

---

# Can We Create HTTP Server Manually?

Yes.

Node.js allows:

```jsx
import http from "http";
```

---

Example

```jsx
const server = http.createServer((req, res) => {
  res.end("Hello");
});

server.listen(4000);
```

---

Execution

```text
localhost:4000

↓

Hello
```

---

# But Should We Do This Inside Next.js?

Generally:

```text
No
```

---

Because Next.js already has its own server.

---

Next.js internally starts:

```text
HTTP Server

↓

Routing

↓

API Handling
```

for us.

---

Creating another server:

```jsx
server.listen(4000);
```

inside Next.js is usually:

```text
Not Recommended
```

---

# Why?

Suppose:

```text
Next.js

↓

Port 3000
```

already running.

---

Now:

```text
Custom HTTP Server

↓

Port 4000
```

---

You now have:

```text
Two Servers
```

which defeats the purpose of using Next.js routing.

---

# When Is Manual HTTP Server Used?

Mostly:

```text
Learning Node.js

Custom Server Setup

Advanced Infrastructure
```

---

Not for normal:

```text
route.js APIs
```

---

# How Next.js Replaces Express

Traditional Node.js

```text
Express

↓

GET /users

↓

Return JSON
```

---

Next.js

```text
route.js

↓

GET()

↓

Return Response
```

---

Same idea,

but integrated into framework.

---

# Real World Example

File Upload API

```text
Frontend Form

↓

POST Request

↓

route.js

↓

writeFile()

↓

Save Image
```

---

File Viewer

```text
GET Request

↓

readFile()

↓

Return File Content
```

---

This is how backend features are built in Next.js.

---

# Common Mistakes

### Mistake 1

Thinking:

```text
page.js

↓

Backend
```

Wrong.

---

```text
page.js

↓

UI Route
```

---

### Mistake 2

Using:

```jsx
fs;

readFile;

writeFile;
```

inside Client Components.

Not possible.

---

### Mistake 3

Creating unnecessary custom HTTP servers.

Next.js already provides routing and APIs.

---

# Best Practices

✅ Use `page.js` for UI.

✅ Use `route.js` for APIs.

✅ Use `process.cwd()` for project paths.

✅ Use `writeFile()` and `readFile()` only on the server.

✅ Prefer Next.js Route Handlers over custom HTTP servers.

---

# Key Takeaways

- Next.js supports frontend and backend development.
- `page.js` creates UI routes.
- `route.js` creates API routes.
- `process.cwd()` returns the project root directory.
- `writeFile()` writes data to files.
- `readFile()` reads file contents.
- These Node.js APIs work only on the server.
- Next.js already includes an HTTP server, so manual servers are rarely needed.

---

# Quick Revision

### page.js?

```text
Frontend Route
```

---

### route.js?

```text
Backend API Route
```

---

### process.cwd()?

```text
Current Working Directory
```

---

### writeFile()?

```text
Write File
```

---

### readFile()?

```text
Read File
```

---

### Can Client Components use fs?

❌ No

---

### Can route.js use fs?

✅ Yes

---

# Interview Questions

### Q1. What is the difference between `page.js` and `route.js`?

`page.js` generates UI pages, while `route.js` creates API endpoints and backend functionality.

---

### Q2. What does `process.cwd()` return?

It returns the current working directory, usually the root folder of the Next.js project.

---

### Q3. Why can `readFile()` and `writeFile()` be used inside route.js?

Because route handlers execute on the server where Node.js APIs are available.

---

### Q4. Can Client Components access the file system?

No. Browsers cannot access server-side files directly.

---

### Q5. Should we create a custom HTTP server inside a Next.js application?

Generally no, because Next.js already provides routing and server capabilities through Route Handlers.

---

# Summary

In this lecture, we learned how Next.js supports backend development through Route Handlers. We explored the difference between `page.js` and `route.js`, understood how `process.cwd()` helps locate the project root, and learned how to use Node.js file system APIs such as `writeFile()` and `readFile()` inside server-side code. We also discussed manual HTTP server creation and why it is usually unnecessary because Next.js already provides built-in server functionality and API routing.
