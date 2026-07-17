// import todosData from "../../todos.json";
import path from "path";
import { writeFile, readFile } from "fs/promises";

//GET
export function GET() {
  return new Response(JSON.stringify({ name: "Nikhil" }), {
    headers: { "content-type": "application/json" },
    status: 200,
    statusText: "ProCodrr",
  });
}

//POST
export async function POST(request) {
  const filePath = path.join(process.cwd(), "todos.json");

  const fileContent = await readFile(filePath, "utf-8");
  const todosData = JSON.parse(fileContent);

  const newTodo = await request.json();

  const newTodosData = [...todosData, newTodo];

  await writeFile(filePath, JSON.stringify(newTodosData, null, 2), "utf-8");
}

//PATCH
export async function PATCH(request) {}
