import { connectDB } from "@/lib/index";
import Todo from "@/models/todo_model";

//GET
export async function GET() {
  await connectDB();
  const todos = await Todo.find();
  return Response.json(todos);
}

//POST
export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const todoData = {
    text: body.text,
    completed: false,
  };
  const newTodo = await Todo.create(todoData);
  return Response.json(newTodo, { status: 201 });
}
