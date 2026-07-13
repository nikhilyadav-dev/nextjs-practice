# Lecture 43 - Creating GET Route Handlers in Next.js

## 📖 Introduction

In the previous lecture, we learned:

```text
page.js

↓

Frontend UI Route

------------------

route.js

↓

Backend API Route
```

Now we will learn:

```text
GET Route Handlers
```

which are the most commonly used APIs in Next.js.

---

# What Is A Route Handler?

A Route Handler is simply:

```text
Backend Function

↓

Receives Request

↓

Returns Response
```

Example:

```jsx
// app/api/user/route.js

export async function GET() {
  return Response.json({
    name: "Nikhil Yadav",
  });
}
```

---

Access:

```text
http://localhost:3000/api/user
```

---

Response:

```json
{
  "name": "Nikhil Yadav"
}
```

---

# Why Does route.js Throw Error If We Return JSX?

Example:

```jsx
export async function GET() {
  return <h1>Hello</h1>;
}
```

---

Result:

```text
Error
```

---

# Why?

Because:

```text
route.js

↓

Backend API

↓

Must Return Response Object
```

---

Not:

```text
React Component
```

---

Remember:

```text
page.js

↓

Returns JSX

------------------

route.js

↓

Returns Response
```

---

# Visual Comparison

## page.js

```jsx
export default function Page() {
  return <h1>Hello</h1>;
}
```

---

Result:

```html
<h1>Hello</h1>
```

---

# route.js

```jsx
export async function GET() {
  return Response.json({
    message: "Hello",
  });
}
```

---

Result:

```json
{
  "message": "Hello"
}
```

---

# Rule

```text
page.js

↓

Return JSX

----------------

route.js

↓

Return Response
```

---

# Understanding Response()

Example:

```jsx
export async function GET() {
  return new Response("Hello World");
}
```

---

Response:

```text
Hello World
```

---

Think:

```text
Response

↓

Represents HTTP Response
```

---

# Understanding JSON Responses

Example:

```jsx
export async function GET() {
  return new Response(
    JSON.stringify({
      name: "Nikhil Yadav",
    }),
  );
}
```

---

Response Body:

```json
{
  "name": "Nikhil Yadav"
}
```

---

# Why Use JSON.stringify()?

Important concept.

---

Suppose:

```jsx
{
  name: "Nikhil";
}
```

is a JavaScript object.

---

HTTP can send:

```text
Text

Binary

JSON String
```

---

It cannot directly send:

```text
Raw JavaScript Object
```

---

Therefore:

```jsx
JSON.stringify();
```

converts:

```jsx
{
  name: "Nikhil";
}
```

into:

```json
"{\"name\":\"Nikhil\"}"
```

which is a string.

---

# Visualization

JavaScript Object

```jsx
{
  name: "Nikhil";
}
```

↓

JSON.stringify()

↓

```json
"{\"name\":\"Nikhil\"}"
```

↓

Sent Through HTTP

---

# What Is JSON?

JSON means:

```text
JavaScript Object Notation
```

---

It is a standard format used for:

```text
Frontend

Backend

Databases

APIs
```

to exchange data.

---

Example

```json
{
  "name": "Nikhil",
  "age": 22
}
```

---

Think:

```text
JSON

↓

Language Independent Data Format
```

---

# Why Do APIs Use JSON?

Because:

```text
React

Angular

Vue

Node

Java

Python

PHP
```

can all understand JSON.

---

# Understanding res.json()

Example:

```jsx
const res = await fetch("/api/user");

const data = await res.json();
```

---

Question:

What is:

```jsx
res.json();
```

doing?

---

# Execution Flow

Server Sends:

```json
{
  "name": "Nikhil"
}
```

---

Browser Receives:

```text
JSON String
```

---

Then:

```jsx
await res.json();
```

converts it into:

```jsx
{
  name: "Nikhil";
}
```

---

Visualization

Server

↓

```json
{
  "name": "Nikhil"
}
```

↓

Browser Receives Text

↓

`res.json()`

↓

JavaScript Object

```jsx
{
  name: "Nikhil";
}
```

---

# Easy Memory Trick

```text
JSON.stringify()

↓

Object → JSON String

-------------------

res.json()

↓

JSON String → Object
```

---

# Other Useful Response Functions

## res.text()

Suppose API returns:

```text
Hello World
```

---

Read:

```jsx
const data = await res.text();
```

---

Result:

```text
Hello World
```

---

# res.json()

API returns:

```json
{
  "name": "Nikhil"
}
```

---

Read:

```jsx
const data = await res.json();
```

---

Result:

```jsx
{
  name: "Nikhil";
}
```

---

# res.blob()

Used for:

```text
Images

Videos

Files
```

---

Example:

```jsx
const image = await res.blob();
```

---

# res.arrayBuffer()

Used for:

```text
Binary Data
```

---

Example:

```jsx
const data = await res.arrayBuffer();
```

---

# Content-Type

Very Important Interview Topic.

---

Question:

How does browser know whether response is:

```text
JSON

HTML

Image

PDF
```

?

---

Answer:

```text
Content-Type Header
```

---

Example

```jsx
return new Response(
  JSON.stringify({
    name: "Nikhil",
  }),
  {
    headers: {
      "Content-Type": "application/json",
    },
  },
);
```

---

Header tells browser:

```text
This Is JSON Data
```

---

# Common Content Types

## JSON

```text
application/json
```

---

Example

```json
{
  "name": "Nikhil"
}
```

---

# HTML

```text
text/html
```

---

Example

```html
<h1>Hello</h1>
```

---

# Plain Text

```text
text/plain
```

---

Example

```text
Hello World
```

---

# CSS

```text
text/css
```

---

Example

```css
body {
  color: red;
}
```

---

# JavaScript

```text
application/javascript
```

---

# Image PNG

```text
image/png
```

---

# Image JPG

```text
image/jpeg
```

---

# PDF

```text
application/pdf
```

---

# Example Returning HTML

```jsx
export async function GET() {
  return new Response("<h1>Hello</h1>", {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
```

---

Response:

```html
<h1>Hello</h1>
```

---

Browser renders HTML.

---

# Example Returning Text

```jsx
export async function GET() {
  return new Response("Hello World", {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
```

---

Response:

```text
Hello World
```

---

# Passing Data To route.js From page.js

Page:

```jsx
const response = await fetch("/api/user");

const data = await response.json();
```

---

Flow:

```text
page.js

↓

HTTP Request

↓

route.js

↓

JSON Response

↓

response.json()

↓

JavaScript Object
```

---

# Response.json()

Next.js provides a shortcut.

Instead of:

```jsx
return new Response(JSON.stringify(data), {
  headers: {
    "Content-Type": "application/json",
  },
});
```

---

Write:

```jsx
return Response.json(data);
```

---

Much simpler.

---

# Example

```jsx
export async function GET() {
  return Response.json({
    name: "Nikhil",
    age: 22,
  });
}
```

---

Internally Next.js does:

```jsx
new Response(JSON.stringify(data), {
  headers: {
    "Content-Type": "application/json",
  },
});
```

---

Automatically.

---

# Why Response.json() Is Preferred

Benefits:

✅ Less Code

✅ Cleaner

✅ Automatically Sets Content-Type

✅ Easier To Read

---

# Real World Example

```jsx
export async function GET() {
  const users = [
    {
      id: 1,
      name: "Nikhil",
    },
    {
      id: 2,
      name: "Rahul",
    },
  ];

  return Response.json(users);
}
```

---

Response:

```json
[
  {
    "id": 1,
    "name": "Nikhil"
  },
  {
    "id": 2,
    "name": "Rahul"
  }
]
```

---

# Common Mistakes

### Mistake 1

Returning JSX from route.js

Wrong:

```jsx
return <h1>Hello</h1>;
```

---

### Mistake 2

Returning raw object

Wrong:

```jsx
return {
  name: "Nikhil",
};
```

---

Correct:

```jsx
return Response.json({
  name: "Nikhil",
});
```

---

### Mistake 3

Forgetting Content-Type

When using custom Response objects.

---

# Best Practices

✅ Use `Response.json()` for JSON APIs.

✅ Return proper HTTP responses.

✅ Use Content-Type correctly.

✅ Use `res.json()` to parse JSON responses.

---

# Key Takeaways

- `route.js` is used for backend APIs.
- It must return a `Response` object.
- JSX cannot be returned from `route.js`.
- JSON is the standard API communication format.
- `JSON.stringify()` converts objects into JSON strings.
- `res.json()` converts JSON responses into JavaScript objects.
- Content-Type tells the browser what kind of data is being returned.
- `Response.json()` is the preferred way to return JSON in Next.js.

---

# Quick Revision

### page.js returns?

```text
JSX
```

---

### route.js returns?

```text
Response
```

---

### JSON.stringify()?

```text
Object → JSON String
```

---

### res.json()?

```text
JSON String → Object
```

---

### JSON Content-Type?

```text
application/json
```

---

### Preferred JSON Response?

```jsx
Response.json(data);
```

---

# Interview Questions

### Q1. Why can't we return JSX from route.js?

Because route handlers are backend endpoints and must return HTTP Response objects, not React elements.

---

### Q2. What is JSON.stringify() used for?

It converts a JavaScript object into a JSON string that can be sent over HTTP.

---

### Q3. What does res.json() do?

It parses a JSON response body and converts it into a JavaScript object.

---

### Q4. What is Content-Type?

A response header that tells the client what type of data is being returned.

---

### Q5. Why is Response.json() preferred?

Because it automatically converts data to JSON, sets the correct Content-Type header, and produces cleaner code.

---

# Summary

In this lecture, we learned how GET Route Handlers work in Next.js. We explored why `route.js` must return a `Response` object instead of JSX, how JSON is used to exchange data between frontend and backend, and how `JSON.stringify()` and `res.json()` perform opposite conversions. We also learned the importance of the `Content-Type` header and saw why `Response.json()` is the preferred method for returning JSON responses in modern Next.js applications.
