import todoData from "../../../todos.json";

export async function GET(request, { params }) {
  const { todoID } = await params;

  const data = todoData.find(({ id }) => id.toString() === todoID);

  console.log(typeof todoID);
  console.log(typeof data.id.toString());

  if (!data) {
    return Response.json({ error: "ID Not Found" });
  }

  return Response.json(data);
}
