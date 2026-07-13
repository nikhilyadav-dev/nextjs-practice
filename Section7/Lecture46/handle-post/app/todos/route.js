// import todosData from "../../todos.json";
import path from "path";
import { writeFile, readFile } from "fs/promises";

export function GET() {
  return new Response(JSON.stringify({ name: "Nikhil" }), {
    headers: { "content-type": "application/json" },
    status: 200,
    statusText: "ProCodrr",
  });
}

// export async function POST(request) {
//   const filePath = path.join(process.cwd(), "todos.json");
//   const fileContent = await readFile(filePath, "utf-8");
//   // const todosData = JSON.parse(fileContent);
//   console.log(fileContent);

// const newTodo = await request.json();
// const filePath = path.join(process.cwd(), "todos.json");
// const readData = await readFile(filePath, "");
// const allTodos = await JSON.parse(readData);
// console.log(allTodos);
// const newTodosData = [...todoData, newTodo];
// console.log(newTodosData);
// await writeFile(filePath, JSON.stringify(newTodosData));
// return Response.json({ success: "Todo added successfully" });
// }

export async function POST(request) {
  // const filePath = path.join(process.cwd(), "todos.json");
  // const readTodos = await readFile(filePath, "utf-8");
  // const data = await JSON.parse(readTodos);
  // console.log(data);

  const filePath = path.join(process.cwd(), "todos.json");

  const fileContent = await readFile(filePath, "utf-8");
  const todosData = JSON.parse(fileContent);

  const newTodo = await request.json();

  const newTodosData = [...todosData, newTodo];

  await writeFile(filePath, JSON.stringify(newTodosData, null, 2), "utf-8");
}
