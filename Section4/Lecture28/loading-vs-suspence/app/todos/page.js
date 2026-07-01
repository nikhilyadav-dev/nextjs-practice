import Todo from "@/components/Todo";
import { Suspense } from "react";

export default function Todos() {
  return (
    <>
      {" "}
      <h1>TODOS</h1>
      <div className="posts-container">
        <Suspense fallback={<div>Loading.....</div>}>
          <Todo />
        </Suspense>
      </div>
    </>
  );
}
