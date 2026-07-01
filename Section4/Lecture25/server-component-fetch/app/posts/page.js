export default async function Todos() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10",
  );
  const todos = await response.json();

  return (
    <>
      {" "}
      <h1>TODOS</h1>
      <div className="posts-container">
        {todos.map(({ id, title, completed }) => (
          <div className="todo-item" key={id}>
            <input type="checkbox" value={completed} />
            <p>{title}</p>
          </div>
        ))}
      </div>
    </>
  );
}
