# Lecture 47 & 48 - Handling PUT and DELETE Requests in Next.js

## 📖 Introduction

In previous lectures, we learned:

```text
GET

↓

Read Data
```

and

```text
POST

↓

Create Data
```

Now the next question is:

> How do we update existing data?

> How do we delete existing data?

For that, we use:

```text
PUT

DELETE
```

---

# CRUD Operations

Almost every backend application performs:

```text
CRUD
```

---

Meaning:

| Operation | HTTP Method |
| --------- | ----------- |
| Create    | POST        |
| Read      | GET         |
| Update    | PUT         |
| Delete    | DELETE      |

---

Easy Memory Trick:

```text
POST

↓

Create

-------------------

GET

↓

Read

-------------------

PUT

↓

Update

-------------------

DELETE

↓

Delete
```

---

# Real World Example

Suppose we have:

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

Operations:

```text
Add Todo

↓

POST

----------------

Get Todos

↓

GET

----------------

Edit Todo

↓

PUT

----------------

Remove Todo

↓

DELETE
```

---

# Typical File Structure

```text
app/

└── api/
    └── todos/
        └── [todoID]/
            └── route.js
```

---

Examples:

```text
/api/todos/1

/api/todos/2

/api/todos/3
```

---

# Understanding PUT Request

## What Is PUT?

PUT means:

```text
Update Existing Data
```

---

Example:

Current Todo:

```json
{
  "id": 1,
  "title": "Learn React"
}
```

---

User wants:

```json
{
  "id": 1,
  "title": "Learn Next.js"
}
```

---

This is an:

```text
Update Operation
```

---

# Creating PUT Route Handler

```jsx
export async function PUT(request, { params }) {}
```

---

Notice:

```jsx
PUT();
```

instead of:

```jsx
GET();

POST();
```

---

Next.js automatically handles:

```text
PUT Requests
```

---

# Client Side PUT Request

```jsx
await fetch("/api/todos/1", {
  method: "PUT",

  body: JSON.stringify({
    title: "Learn Next.js",
  }),
});
```

---

Request:

```text
PUT /api/todos/1
```

---

Body:

```json
{
  "title": "Learn Next.js"
}
```

---

# Reading PUT Body

Server:

```jsx
export async function PUT(request, { params }) {
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

# Reading Dynamic ID

```jsx
const { todoID } = await params;
```

---

Request:

```text
/api/todos/5
```

---

Result:

```jsx
todoID = "5";
```

---

# Full PUT Example

```jsx
export async function PUT(request, { params }) {
  const body = await request.json();

  const { todoID } = await params;

  return Response.json({
    message: `Todo ${todoID} Updated`,
    updatedData: body,
  });
}
```

---

Request:

```text
PUT /api/todos/1
```

---

Body:

```json
{
  "title": "Learn Next.js"
}
```

---

Response:

```json
{
  "message": "Todo 1 Updated",

  "updatedData": {
    "title": "Learn Next.js"
  }
}
```

---

# Updating JSON Data Example

Suppose:

```json
[
  {
    "id": 1,
    "title": "React"
  },
  {
    "id": 2,
    "title": "Node"
  }
]
```

---

Request:

```text
PUT /api/todos/1
```

---

Body:

```json
{
  "title": "Next.js"
}
```

---

Flow:

```text
Find Todo

↓

Replace Data

↓

Save Data

↓

Return Updated Todo
```

---

# Understanding DELETE Request

## What Is DELETE?

DELETE means:

```text
Remove Resource
```

---

Example:

Current:

```json
[
  {
    "id": 1,
    "title": "React"
  },
  {
    "id": 2,
    "title": "Next.js"
  }
]
```

---

Delete:

```text
Todo ID 2
```

---

Result:

```json
[
  {
    "id": 1,
    "title": "React"
  }
]
```

---

# Creating DELETE Route Handler

```jsx
export async function DELETE(request, { params }) {}
```

---

Next.js automatically handles:

```text
DELETE Requests
```

---

# Client Side DELETE Request

```jsx
await fetch("/api/todos/2", {
  method: "DELETE",
});
```

---

Request:

```text
DELETE /api/todos/2
```

---

# Reading Dynamic ID

```jsx
const { todoID } = await params;
```

---

Result:

```jsx
todoID = "2";
```

---

# Full DELETE Example

```jsx
export async function DELETE(request, { params }) {
  const { todoID } = await params;

  return Response.json({
    message: `Todo ${todoID} Deleted`,
  });
}
```

---

Response:

```json
{
  "message": "Todo 2 Deleted"
}
```

---

# Real Delete Logic

Suppose:

```json
[
  {
    "id": 1,
    "title": "React"
  },
  {
    "id": 2,
    "title": "Next.js"
  }
]
```

---

Delete ID:

```text
2
```

---

Flow:

```text
Find Todo

↓

Remove Todo

↓

Save Remaining Data

↓

Return Success
```

---

Result:

```json
[
  {
    "id": 1,
    "title": "React"
  }
]
```

---

# PUT vs PATCH

Interview Topic.

---

## PUT

Typically:

```text
Replace Entire Resource
```

---

Example:

Current:

```json
{
  "name": "Nikhil",
  "age": 22
}
```

---

PUT:

```json
{
  "name": "Rahul",
  "age": 25
}
```

---

Entire object replaced.

---

# PATCH

Typically:

```text
Partial Update
```

---

Example:

```json
{
  "age": 25
}
```

---

Only age changes.

---

# Easy Memory Trick

```text
PUT

↓

Replace

------------------

PATCH

↓

Modify
```

---

# Common HTTP Status Codes

## Update Success

```text
200 OK
```

---

Example:

```jsx
return Response.json(data, {
  status: 200,
});
```

---

# Delete Success

```text
200 OK
```

or

```text
204 No Content
```

---

Example:

```jsx
return new Response(null, {
  status: 204,
});
```

---

# Resource Not Found

```text
404 Not Found
```

---

Example:

```jsx
if (!todo) {
  return Response.json(
    {
      error: "Todo Not Found",
    },
    {
      status: 404,
    },
  );
}
```

---

# Complete CRUD Flow

```text
POST

↓

Create Todo

-------------------

GET

↓

Read Todo

-------------------

PUT

↓

Update Todo

-------------------

DELETE

↓

Delete Todo
```

---

# Example Route File

```jsx
export async function GET() {}

export async function POST() {}

export async function PUT() {}

export async function DELETE() {}
```

---

All methods can exist inside:

```text
Same route.js
```

---

Next.js automatically chooses the correct function based on:

```text
HTTP Method
```

---

# Real World Example

```text
/api/users/1
```

---

GET

```text
Get User
```

---

PUT

```text
Update User
```

---

DELETE

```text
Delete User
```

---

Same URL.

Different methods.

---

# Common Mistakes

### Mistake 1

Using POST for updates.

---

Better:

```text
PUT
```

---

### Mistake 2

Using GET for deletion.

---

Wrong:

```text
GET /delete-user
```

---

Correct:

```text
DELETE /users/1
```

---

### Mistake 3

Forgetting:

```jsx
await request.json();
```

inside PUT.

---

# Best Practices

✅ Use PUT for updates.

✅ Use DELETE for deletions.

✅ Return meaningful status codes.

✅ Validate resource existence before updating/deleting.

✅ Use dynamic route handlers for resource IDs.

---

# Key Takeaways

- PUT updates existing resources.
- DELETE removes resources.
- Both often use dynamic route handlers.
- PUT commonly reads request body using `request.json()`.
- DELETE usually requires only the resource ID.
- Route Handlers support multiple HTTP methods in the same file.
- Proper status codes improve API design.

---

# Quick Revision

### Create Resource?

```text
POST
```

---

### Read Resource?

```text
GET
```

---

### Update Resource?

```text
PUT
```

---

### Delete Resource?

```text
DELETE
```

---

### Read Update Data?

```jsx
await request.json();
```

---

### Read Dynamic ID?

```jsx
const { todoID } = await params;
```

---

# Interview Questions

### Q1. What is the purpose of a PUT request?

A PUT request is used to update an existing resource on the server.

---

### Q2. What is the purpose of a DELETE request?

A DELETE request is used to remove a resource from the server.

---

### Q3. How do you access the request body in a PUT route handler?

Using:

```jsx
await request.json();
```

---

### Q4. What is the difference between PUT and PATCH?

PUT usually replaces the entire resource, while PATCH updates only specific fields.

---

### Q5. Can GET, POST, PUT, and DELETE exist in the same route.js file?

Yes. Next.js automatically selects the appropriate handler based on the HTTP method.

---

# Summary

In these lectures, we learned how to handle PUT and DELETE requests in Next.js Route Handlers. PUT requests are used to update existing resources, while DELETE requests remove resources. We saw how dynamic route parameters provide resource IDs, how request bodies are processed using `request.json()`, and how Next.js maps different HTTP methods to different functions inside the same `route.js` file. Together with GET and POST, PUT and DELETE complete the foundation of CRUD operations in modern Next.js applications.
