import todoData from "../../../todos.json";
import { writeFile } from "fs/promises";

//GET 1 Data
export async function GET(request, { params }) {
  const { todoID } = await params;
  const data = todoData.find(({ id }) => id.toString() === todoID);
  if (!data) {
    return Response.json({ error: "ID Not Found" });
  }
  return Response.json(data);
}

//PUT
export async function PUT(request, { params }) {
  const { todoID } = await params;
  const index = todoData.findIndex(({ id }) => id.toString() === todoID);
  if (index === -1) {
    return Response.json({ error: "ID Not Found" });
  }
  const todo = todoData[index];
  const body = await request.json();
  const editTodo = { ...todo, ...body };
  todoData[index] = editTodo;
  await writeFile("todos.json", JSON.stringify(todoData, null, 2));

  return Response.json(todoData);
}

//DELETE
export async function DELETE(request, { params }) {
  const { todoID } = await params;
  const index = todoData.findIndex(({ id }) => id.toString() === todoID);
  if (index === -1) {
    return Response.json({ error: "ID Not Found" });
  }
  todoData.splice(index, 1);
  console.log("response coming");
  await writeFile("todos.json", JSON.stringify(todoData, null, 2));
  return Response.json(todoData);
}
