# Lecture 44 - Dynamic Route Handlers in Next.js

## 📖 Introduction

In the previous lecture, we learned:

```text
Static Route Handlers
```

Example:

```text
/api/users
/api/products
/api/todos
```

The problem is:

```text
Always Returns Same Endpoint
```

---

Question:

How can we create APIs like:

```text
/api/todos/1

/api/todos/2

/api/todos/3
```

where the ID changes dynamically?

This is where:

```text
Dynamic Route Handlers
```

come into the picture.

---

# What Is A Dynamic Route Handler?

A Dynamic Route Handler is an API endpoint whose path contains dynamic values.

Example:

```text
/api/todos/1

/api/todos/2

/api/todos/3
```

Here:

```text
1

2

3
```

are dynamic values.

---

Instead of creating:

```text
/api/todos/1

/api/todos/2

/api/todos/3

/api/todos/4
```

manually,

we create:

```text
/api/todos/[todoID]
```

---

# Why Do We Need Dynamic Route Handlers?

Imagine a database contains:

```text
10,000 Todos
```

Should we create:

```text
/api/todos/1
/api/todos/2
/api/todos/3
...
/api/todos/10000
```

?

Impossible.

---

Instead:

```text
/api/todos/[todoID]
```

handles all IDs.

---

# File Structure

Example:

```text
app/

└── api/
    └── todos/
        └── [todoID]/
            └── route.js
```

---

Meaning:

```text
/api/todos/1

/api/todos/2

/api/todos/500
```

all use:

```text
route.js
```

---

# How Dynamic Parameters Work

Suppose user visits:

```text
/api/todos/5
```

---

Next.js automatically extracts:

```text
5
```

and provides it inside:

```jsx
params;
```

---

Example:

```jsx
export async function GET(request, { params }) {
  console.log(await params);
}
```

---

Request:

```text
/api/todos/5
```

---

Output:

```jsx
{
  todoID: "5";
}
```

---

# Dynamic Route Mental Model

Think:

```text
URL

↓

/api/todos/5

↓

params

↓

{
  todoID: "5"
}
```

---

# Why Is It Similar To Dynamic Pages?

Remember:

```text
blogs/[blogID]/page.js
```

---

URL:

```text
/blogs/10
```

---

Params:

```jsx
{
  blogID: "10";
}
```

---

Same concept.

Only difference:

```text
page.js

↓

Returns JSX

---------------------

route.js

↓

Returns Response
```

---

# Real World Examples

## User API

```text
/api/users/101
```

↓

```text
User 101 Details
```

---

## Product API

```text
/api/products/500
```

↓

```text
Product 500 Details
```

---

## Blog API

```text
/api/blogs/22
```

↓

```text
Blog 22 Details
```

---

# Understanding params

Example:

```jsx
export async function GET(request, { params }) {
  const values = await params;

  console.log(values);
}
```

---

Request:

```text
/api/todos/10
```

---

Output:

```jsx
{
  todoID: "10";
}
```

---

Notice:

```text
Everything Comes As String
```

---

Even:

```text
10
```

comes as:

```jsx
"10";
```

---

# Why Does Next.js Return String?

Because:

```text
URL

↓

Text

↓

String
```

---

Example:

```text
/api/todos/100
```

---

Browser sends:

```text
"100"
```

not:

```text
100
```

---

# Nested Dynamic Route Handler

Structure:

```text
api/

└── blogs/
    └── [blogID]/
        └── comments/
            └── [commentID]/
                └── route.js
```

---

Request:

```text
/api/blogs/10/comments/5
```

---

Params:

```jsx
{
  blogID: "10",
  commentID: "5"
}
```

---

# Catch-All Route Handler

Structure:

```text
api/

└── files/
    └── [...filePath]/
        └── route.js
```

---

Request:

```text
/api/files/images/profile/user.png
```

---

Params:

```jsx
{
  filePath: ["images", "profile", "user.png"];
}
```

---

Very useful for:

```text
File APIs

CMS Systems

Storage APIs
```

---

# Understanding Your Code

Now let's analyze your code line by line.

---

```jsx
import todoData from "../../../todos.json";
```

---

Purpose:

```text
Import Todo Data
```

---

Suppose:

```json
[
  {
    "id": 1,
    "title": "Learn Next.js"
  },
  {
    "id": 2,
    "title": "Learn API Routes"
  }
]
```

---

Now:

```text
todoData
```

contains:

```jsx
[
  { id: 1, title: ... },
  { id: 2, title: ... }
]
```

---

# Route Structure

This code is typically inside:

```text
api/

└── todos/
    └── [todoID]/
        └── route.js
```

---

Therefore:

```text
/api/todos/1

/api/todos/2

/api/todos/3
```

all hit this route.

---

# Function Definition

```jsx
export async function GET(
  request,
  { params }
)
```

---

Meaning:

```text
Handle GET Request
```

---

Example:

```text
/api/todos/2
```

---

# Extract Parameter

```jsx
const { todoID } = await params;
```

---

Suppose URL:

```text
/api/todos/2
```

---

Then:

```jsx
params;
```

contains:

```jsx
{
  todoID: "2";
}
```

---

After destructuring:

```jsx
todoID = "2";
```

---

# Find Matching Todo

```jsx
const data = todoData.find(({ id }) => id.toString() === todoID);
```

---

Let's understand.

---

Suppose:

```json
{
  "id": 2,
  "title": "Learn API"
}
```

---

Inside callback:

```jsx
id = 2;
```

---

Convert:

```jsx
id.toString();
```

↓

```jsx
"2";
```

---

Compare:

```jsx
"2" === "2";
```

↓

```text
true
```

---

Result:

```jsx
{
  id: 2,
  title: "Learn API"
}
```

is returned.

---

# Why Use toString()?

Because:

```text
JSON ID

↓

Number

2
```

---

But:

```text
URL Param

↓

String

"2"
```

---

Without conversion:

```jsx
2 === "2";
```

↓

```text
false
```

---

Therefore:

```jsx
id.toString();
```

is needed.

---

Alternative:

```jsx
Number(todoID);
```

---

Example:

```jsx
id === Number(todoID);
```

also works.

---

# Handling Invalid IDs

```jsx
if (!data) {
```

---

Suppose:

```text
/api/todos/999
```

---

No matching todo found.

---

Then:

```jsx
data;
```

becomes:

```jsx
undefined;
```

---

Condition:

```jsx
!data;
```

↓

```text
true
```

---

Return:

```jsx
Response.json({
  error: "ID Not Found",
});
```

---

Response:

```json
{
  "error": "ID Not Found"
}
```

---

# Handling Valid IDs

Example:

```text
/api/todos/2
```

---

Found:

```json
{
  "id": 2,
  "title": "Learn API"
}
```

---

Return:

```jsx
Response.json(data);
```

---

Response:

```json
{
  "id": 2,
  "title": "Learn API"
}
```

---

# Complete Flow

Request:

```text
/api/todos/2
```

↓

Next.js extracts:

```jsx
{
  todoID: "2";
}
```

↓

Find matching todo.

↓

If found:

```json
{
  "id": 2,
  "title": "Learn API"
}
```

↓

Return JSON.

---

If not found:

```json
{
  "error": "ID Not Found"
}
```

---

# Better Version (Status Codes)

Your code works perfectly.

But production APIs usually return status codes.

Example:

```jsx
if (!data) {
  return Response.json(
    {
      error: "ID Not Found",
    },
    {
      status: 404,
    },
  );
}
```

---

Now:

```text
404 Not Found
```

is returned.

---

Much better API design.

---

# Key Takeaways

- Dynamic Route Handlers use folder names like `[todoID]`.
- URL values are available inside `params`.
- All URL parameters arrive as strings.
- Dynamic Route Handlers are ideal for IDs, slugs, and resource-based APIs.
- `Response.json()` is commonly used to return API responses.
- Always handle invalid IDs gracefully.
- Returning proper HTTP status codes is a best practice.

---

# Quick Revision

### Dynamic API Route?

```text
/api/todos/[todoID]
```

---

### URL:

```text
/api/todos/5
```

---

### Params:

```jsx
{
  todoID: "5";
}
```

---

### Why use `toString()`?

Because URL params are strings.

---

### Response for valid ID?

```jsx
Response.json(data);
```

---

### Response for invalid ID?

```jsx
Response.json({
  error: "ID Not Found",
});
```

---

# Interview Questions

### Q1. What is a Dynamic Route Handler in Next.js?

A Route Handler that uses dynamic segments (e.g., `[id]`) to handle requests with variable URL values.

---

### Q2. How do you access dynamic values in a Route Handler?

Using the `params` object provided as the second argument to the handler function.

---

### Q3. Why are route parameters strings?

Because URL segments are transmitted as text.

---

### Q4. What does `Response.json()` do?

It converts JavaScript data into a JSON response and automatically sets the correct content type.

---

### Q5. Why should invalid IDs return a 404 status?

Because the requested resource does not exist, which semantically matches HTTP 404 Not Found.

---

# Summary

In this lecture, we learned how Dynamic Route Handlers work in Next.js. By using folder names such as `[todoID]`, we can create flexible API endpoints that handle any ID without manually creating separate routes. We explored how route parameters are accessed through `params`, why they arrive as strings, and how to use them to fetch specific data. Finally, we analyzed a real-world example that searches a JSON dataset, returns matching records, and handles invalid IDs gracefully.
