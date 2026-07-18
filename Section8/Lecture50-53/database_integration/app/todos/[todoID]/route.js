import Todo from "@/models/todo_model";
import { connectDB } from "@/lib/index";

//GET 1 Data
export async function GET(request, { params }) {
  const { todoID } = await params;
  await connectDB();
  const todo = await Todo.findById(todoID);
  return Response.json(todo);
}

//PUT
export async function PUT(request, { params }) {
  const { todoID } = await params;
  await connectDB();
  const body = await request.json();
  const editedTodo = await Todo.findByIdAndUpdate(todoID, body, {
    new: true,
  });
  return Response.json(editedTodo);
}

//DELETE
export async function DELETE(request, { params }) {
  const { todoID } = await params;
  await connectDB();
  const deletedTodo = await Todo.findByIdAndDelete(todoID);
  return Response.json(deletedTodo);
}
