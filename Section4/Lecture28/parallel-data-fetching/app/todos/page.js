export default async function Todos() {
  async function fetchFunction(url) {
    const response = await fetch(url);
    return await response.json();
  }

  const [todos, slowResponse1, slowResponse2] = await Promise.all([
    fetchFunction("https://jsonplaceholder.typicode.com/todos?_limit=10"),
    fetchFunction("https://procodrr.vercel.app/?sleep=3000"),
    fetchFunction("https://procodrr.vercel.app/?sleep=5000"),
  ]);

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
      <div>
        <h3>{slowResponse1.message}</h3>
        <h3>{slowResponse2.message}</h3>
      </div>
    </>
  );
}
