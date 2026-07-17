# Lecture 46 - Handling POST Requests in Next.js

## 📖 Introduction

In previous lectures, we learned:

```text
GET Request

↓

Read Data
```

Example:

```text
Get User

Get Product

Get Todo
```

---

But what if we want to:

```text
Create User

Create Todo

Register User

Submit Form
```

?

We use:

```text
POST Request
```

---

# What Is A POST Request?

POST is used when we want to:

```text
Send Data

↓

Client → Server
```

---

Examples:

```text
Login Form

Registration Form

Create Blog

Add Product

Add Todo
```

---

# GET vs POST

## GET

Purpose:

```text
Read Data
```

---

Example:

```text
/api/todos
```

↓

Returns Todos

---

## POST

Purpose:

```text
Create Data
```

---

Example:

```text
/api/todos
```

↓

Adds New Todo

---

# Easy Memory Trick

```text
GET

↓

Give Me Data

-------------------

POST

↓

Take My Data
```

---

# Creating POST Route Handler

Structure:

```text
app/

└── api/
    └── todos/
        └── route.js
```

---

Example:

```jsx
export async function POST(request) {
  return Response.json({
    success: true,
  });
}
```

---

Now:

```text
POST /api/todos
```

is supported.

---

# How Client Sends POST Request

Example:

```jsx
await fetch("/api/todos", {
  method: "POST",
});
```

---

Notice:

```jsx
method: "POST";
```

---

Without it:

```text
Default = GET
```

---

# Sending Data To Server

Example:

```jsx
await fetch("/api/todos", {
  method: "POST",

  body: JSON.stringify({
    title: "Learn Next.js",
  }),
});
```

---

Client sends:

```json
{
  "title": "Learn Next.js"
}
```

to server.

---

# Understanding request.json()

Server:

```jsx
export async function POST(request) {
  const body = await request.json();

  console.log(body);
}
```

---

Output:

```jsx
{
  title: "Learn Next.js";
}
```

---

# What Happens Internally?

Client:

```jsx
JSON.stringify(data);
```

↓

JSON String

↓

HTTP Request

↓

Server

↓

```jsx
request.json();
```

↓

JavaScript Object

---

# Complete Example

## Client

```jsx
await fetch("/api/todos", {
  method: "POST",

  body: JSON.stringify({
    title: "Learn Next.js",
  }),
});
```

---

## Server

```jsx
export async function POST(request) {
  const body = await request.json();

  return Response.json({
    received: body,
  });
}
```

---

Response:

```json
{
  "received": {
    "title": "Learn Next.js"
  }
}
```

---

# Why request.json() Needs await?

Because:

```text
HTTP Body

↓

Read From Stream

↓

Asynchronous Operation
```

---

Therefore:

```jsx
await request.json();
```

is required.

---

# Content-Type Header

Most POST requests send:

```json
{
  "name": "Nikhil"
}
```

---

Therefore client usually sends:

```jsx
headers: {
  "Content-Type":
   "application/json"
}
```

---

Example:

```jsx
await fetch("/api/todos", {
  method: "POST",

  headers: {
    "Content-Type": "application/json",
  },

  body: JSON.stringify({
    title: "Learn Next.js",
  }),
});
```

---

# Why Content-Type Is Important?

Server needs to know:

```text
JSON ?

Text ?

Image ?

PDF ?
```

---

Content-Type tells server:

```text
application/json
```

↓

JSON Data Incoming

---

# Real World Example

## Create User

Client:

```jsx
await fetch("/api/users", {
  method: "POST",

  body: JSON.stringify({
    name: "Nikhil",
    age: 22,
  }),
});
```

---

Server:

```jsx
export async function POST(request) {
  const user = await request.json();

  console.log(user);

  return Response.json({
    success: true,
  });
}
```

---

Received:

```jsx
{
  name: "Nikhil",
  age: 22
}
```

---

# Saving Data Example

Suppose:

```json
[
  {
    "id": 1,
    "title": "Learn React"
  }
]
```

exists.

---

Client sends:

```json
{
  "title": "Learn Next.js"
}
```

---

Server:

```jsx
const todo = await request.json();
```

---

Append:

```json
[
  {
    "id": 1,
    "title": "Learn React"
  },

  {
    "id": 2,
    "title": "Learn Next.js"
  }
]
```

---

Return:

```json
{
  "success": true
}
```

---

# Validation

Never trust incoming data.

---

Bad Example:

```jsx
const body = await request.json();
```

and directly save.

---

Better:

```jsx
if (!body.title) {
  return Response.json(
    {
      error: "Title Required",
    },
    {
      status: 400,
    },
  );
}
```

---

# HTTP Status Codes

Success:

```jsx
return Response.json(
  {
    success: true,
  },
  {
    status: 201,
  },
);
```

---

Meaning:

```text
201 Created
```

---

Validation Error:

```text
400 Bad Request
```

---

Unauthorized:

```text
401 Unauthorized
```

---

Not Found:

```text
404 Not Found
```

---

Server Error:

```text
500 Internal Server Error
```

---

# GET and POST Together

Same file:

```jsx
export async function GET() {
  return Response.json(todos);
}

export async function POST(request) {
  const todo = await request.json();

  return Response.json(todo);
}
```

---

Now:

```text
GET /api/todos
```

returns todos.

---

And:

```text
POST /api/todos
```

creates todo.

---

# Common Mistakes

### Mistake 1

Forgetting:

```jsx
await request.json();
```

---

Wrong:

```jsx
const data = request.json();
```

---

Correct:

```jsx
const data = await request.json();
```

---

### Mistake 2

Using POST without body.

---

### Mistake 3

Forgetting:

```jsx
JSON.stringify();
```

on client.

---

Wrong:

```jsx
body: {
  title: "Hello";
}
```

---

Correct:

```jsx
body: JSON.stringify({
  title: "Hello",
});
```

---

# request.json() vs Response.json()

Very Important.

---

## request.json()

Reads incoming data.

```text
Client

↓

Server
```

---

## Response.json()

Sends outgoing data.

```text
Server

↓

Client
```

---

Visualization:

```text
Client

↓

JSON.stringify()

↓

request.json()

↓

Server Processing

↓

Response.json()

↓

response.json()

↓

Client
```

---

# Key Takeaways

- POST requests are used to create or submit data.
- Client sends data using `fetch()` with `method: "POST"`.
- Data is usually sent as JSON.
- `request.json()` reads incoming JSON data.
- `Response.json()` sends JSON back to the client.
- Always validate incoming data.
- Use proper HTTP status codes.

---

# Quick Revision

### GET Request?

```text
Read Data
```

---

### POST Request?

```text
Create Data
```

---

### Read POST Body?

```jsx
await request.json();
```

---

### Send JSON Response?

```jsx
Response.json(data);
```

---

### Convert Object To JSON?

```jsx
JSON.stringify();
```

---

### Status Code For Created Resource?

```text
201
```

---

# Interview Questions

### Q1. When should POST requests be used?

POST requests are used when sending data from the client to the server, usually to create a new resource.

---

### Q2. How do you read request body data in Next.js?

Using:

```jsx
await request.json();
```

---

### Q3. Why is JSON.stringify() used before sending data?

Because HTTP transmits text, so JavaScript objects must be converted into JSON strings.

---

### Q4. What is the difference between request.json() and Response.json()?

`request.json()` reads incoming JSON data, while `Response.json()` sends JSON data back to the client.

---

### Q5. What status code should be returned after successfully creating a resource?

```text
201 Created
```

---

# Summary

In this lecture, we learned how POST Route Handlers work in Next.js. Unlike GET requests, which retrieve data, POST requests are used to send data from the client to the server. We explored how data is sent using `fetch()`, converted into JSON using `JSON.stringify()`, read on the server using `request.json()`, and returned using `Response.json()`. We also learned the importance of validation, content types, and HTTP status codes when building production-ready APIs.
