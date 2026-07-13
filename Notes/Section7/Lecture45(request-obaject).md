# Lecture 45 - Understanding Request Object in Next.js

## 📖 Introduction

In previous lectures, we learned:

```jsx
export async function GET(request, { params }) {
  return Response.json({
    message: "Hello",
  });
}
```

Most students focus on:

```jsx
Response;
```

but ignore:

```jsx
request;
```

However, in real-world APIs:

```text
Authentication

Query Parameters

Headers

Cookies

Body Data

Form Submission
```

all come through:

```text
Request Object
```

---

# What Is A Request Object?

When a browser sends a request:

```text
Browser

↓

Server
```

it doesn't send only:

```text
URL
```

It sends a complete package.

---

Example:

```text
GET /api/users?id=10

Headers

Cookies

Body

Method
```

All of this is wrapped inside:

```jsx
request;
```

---

Think:

```text
Request Object

↓

Everything Client Sent
```

---

# Real World Flow

```text
Browser

↓

fetch()

↓

HTTP Request

↓

Request Object

↓

route.js
```

---

Example:

```jsx
export async function GET(request) {
  console.log(request);
}
```

---

Whenever:

```text
/api/users
```

is called,

Next.js automatically creates a:

```jsx
Request;
```

object and passes it to the route handler.

---

# Request vs Response

Easy Rule:

```text
Request

↓

Client → Server

------------------

Response

↓

Server → Client
```

---

Visualization

```text
Browser
   ↓
 Request
   ↓
 Server
   ↓
 Response
   ↓
 Browser
```

---

# Understanding fetch()

Example:

```jsx
const response = await fetch("/api/users");
```

---

Question:

What happens internally?

---

Execution:

```text
fetch()

↓

Creates Request

↓

Sends To Server

↓

Server Creates Response

↓

Returns Response

↓

fetch Receives Response
```

---

# Internal Mental Model

Think:

```jsx
fetch("/api/users");
```

roughly becomes:

```jsx
const request = new Request("/api/users");

send(request);
```

---

Server:

```jsx
GET(request) {
}
```

receives:

```jsx
request;
```

---

So:

```text
fetch()

↓

Creates Request

↓

Sends It
```

---

# Understanding new Request()

JavaScript provides:

```jsx
new Request();
```

---

Example:

```jsx
const request = new Request("https://example.com/api");
```

---

Result:

```text
Request Object Created
```

---

Think:

```text
Request

↓

Blueprint Of HTTP Request
```

---

# Example

```jsx
const request = new Request("https://example.com/api", {
  method: "POST",
});
```

---

Now request contains:

```text
URL

Method

Headers

Body
```

---

# Relationship Between fetch() and Request()

This is one of the most important concepts.

---

Example:

```jsx
fetch("/api/users");
```

---

Internally similar to:

```jsx
const req = new Request("/api/users");

fetch(req);
```

---

Meaning:

```text
fetch()

↓

Uses Request Objects
```

---

You can even do:

```jsx
const req = new Request("/api/users");

const response = await fetch(req);
```

---

This works too.

---

# Visual Relationship

```text
new Request()

↓

Creates Request

↓

fetch()

↓

Sends Request

↓

Receives Response
```

---

# Accessing Request URL

Example:

```jsx
export async function GET(request) {
  console.log(request.url);
}
```

---

Request:

```text
/api/users?id=10
```

---

Output:

```text
http://localhost:3000/api/users?id=10
```

---

# Accessing Request Method

```jsx
console.log(request.method);
```

---

Output:

```text
GET
```

---

or

```text
POST
```

---

depending on request.

---

# Accessing Headers

Suppose browser sends:

```jsx
fetch("/api/users", {
  headers: {
    token: "123",
  },
});
```

---

Server:

```jsx
console.log(request.headers);
```

---

Read specific header:

```jsx
request.headers.get("token");
```

---

Output:

```text
123
```

---

# What Are Headers?

Headers are:

```text
Extra Information
```

sent with request.

---

Examples:

```text
Authorization

Content-Type

Language

Token
```

---

# Example

Request:

```text
Authorization:
Bearer xyz
```

---

Server:

```jsx
const token = request.headers.get("Authorization");
```

---

# Accessing Query Parameters

Request:

```text
/api/users?id=10&name=nikhil
```

---

URL:

```jsx
request.url;
```

↓

```text
http://localhost:3000/api/users?id=10&name=nikhil
```

---

Create URL object:

```jsx
const url = new URL(request.url);
```

---

Get parameter:

```jsx
url.searchParams.get("id");
```

---

Output:

```text
10
```

---

Get name:

```jsx
url.searchParams.get("name");
```

---

Output:

```text
nikhil
```

---

# Visual Flow

```text
/api/users?id=10

↓

request.url

↓

new URL()

↓

searchParams

↓

10
```

---

# Accessing Request Body

Used mostly in:

```text
POST

PUT

PATCH
```

---

Example:

Client:

```jsx
fetch("/api/users", {
  method: "POST",
  body: JSON.stringify({
    name: "Nikhil",
  }),
});
```

---

Server:

```jsx
const body = await request.json();
```

---

Result:

```jsx
{
  name: "Nikhil";
}
```

---

# Why request.json()?

Remember:

Client sends:

```jsx
JSON.stringify(data);
```

---

Server receives:

```text
JSON String
```

---

Then:

```jsx
request.json();
```

converts it into:

```jsx
JavaScript Object
```

---

# Important Conversion Diagram

Client

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

# Other Useful Request Methods

## request.json()

Reads JSON Body.

---

Example:

```jsx
const data = await request.json();
```

---

# request.text()

Reads plain text.

---

Example:

```jsx
const text = await request.text();
```

---

# request.formData()

Reads form data.

---

Example:

```jsx
const form = await request.formData();
```

---

Useful for:

```text
File Uploads

Forms
```

---

# request.arrayBuffer()

Reads binary data.

---

Example:

```jsx
const file = await request.arrayBuffer();
```

---

# request.blob()

Reads files and media.

---

Example:

```jsx
const image = await request.blob();
```

---

# Real World Example

Client:

```jsx
await fetch("/api/login", {
  method: "POST",
  body: JSON.stringify({
    email: "test@gmail.com",
    password: "123",
  }),
});
```

---

Server:

```jsx
export async function POST(request) {
  const body = await request.json();

  console.log(body);

  return Response.json({
    success: true,
  });
}
```

---

Body:

```jsx
{
  email:
    "test@gmail.com",

  password:
    "123"
}
```

---

# Request Lifecycle

```text
Client

↓

fetch()

↓

Request Object Created

↓

Sent To Server

↓

route.js Receives Request

↓

Reads Data

↓

Creates Response

↓

Returns Response

↓

Client Receives Response
```

---

# Common Mistakes

### Mistake 1

Using:

```jsx
request.body;
```

directly.

Prefer:

```jsx
await request.json();
```

---

### Mistake 2

Confusing:

```jsx
request.json();
```

and

```jsx
response.json();
```

---

Request:

```text
Incoming Data
```

---

Response:

```text
Outgoing Data
```

---

### Mistake 3

Reading body multiple times.

The request body can usually be consumed only once.

---

# Best Practices

✅ Use `request.url` for query parameters.

✅ Use `request.headers` for tokens and metadata.

✅ Use `request.json()` for JSON payloads.

✅ Validate incoming data before processing.

---

# Key Takeaways

- The Request object contains everything sent by the client.
- `fetch()` creates and sends Request objects.
- `new Request()` manually creates Request objects.
- Request data includes URL, method, headers, cookies, and body.
- `request.json()` converts JSON request bodies into JavaScript objects.
- Query parameters can be accessed using `new URL(request.url)`.
- Headers can be accessed using `request.headers.get()`.

---

# Quick Revision

### Request represents?

```text
Client → Server Data
```

---

### Response represents?

```text
Server → Client Data
```

---

### fetch() does?

```text
Creates + Sends Request
```

---

### request.url?

```text
Current Request URL
```

---

### request.method?

```text
GET / POST / PUT / DELETE
```

---

### request.json()?

```text
JSON String → JavaScript Object
```

---

### request.headers.get()?

```text
Read Header Value
```

---

# Interview Questions

### Q1. What is the Request object in Next.js?

The Request object contains all information sent by the client, including URL, headers, method, cookies, and body.

---

### Q2. How are fetch() and Request related?

`fetch()` creates or uses a Request object and sends it to the server, then returns a Response object.

---

### Q3. What does request.json() do?

It reads the request body and converts JSON data into a JavaScript object.

---

### Q4. How do you access query parameters from a Request?

By creating a URL object from `request.url` and reading values from `searchParams`.

---

### Q5. How do you access custom headers?

Using:

```jsx
request.headers.get("header-name");
```

---

# Summary

In this lecture, we learned how the Request object works in Next.js Route Handlers. We explored how `fetch()` creates and sends Request objects, how `new Request()` can be used manually, and how servers receive requests through the `request` parameter. We also learned how to access URLs, methods, headers, query parameters, and request bodies using APIs such as `request.url`, `request.headers`, and `request.json()`. Understanding the Request object is essential because almost every backend feature—authentication, forms, APIs, and file uploads—depends on it.
