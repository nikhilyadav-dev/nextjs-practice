import todosData from "../../todos.json";
import path from "path";
import { writeFile, readFile } from "fs/promises";

//GET
export async function GET() {
  const filePath = path.join(process.cwd(), "todos.json");
  const fileContent = await readFile(filePath, "utf-8");
  const todosData = JSON.parse(fileContent);
  return Response.json(todosData);
}

//POST
export async function POST(request) {
  const filePath = path.join(process.cwd(), "todos.json");
  const fileContent = await readFile(filePath, "utf-8");
  const todosData = JSON.parse(fileContent);
  const newTodo = await request.json();
  const newTodosData = [...todosData, newTodo];
  await writeFile(filePath, JSON.stringify(newTodosData, null, 2), "utf-8");
  return Response.json(newTodo, { status: 201 });
}
