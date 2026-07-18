"use client";

import { useEffect, useState } from "react";
import TodoList from "@/components/TodoList";
import TodoForm from "@/components/TodoForm";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

export default function Home() {
  useEffect(() => {
    fetchTodos();
  }, []);
  // Fetch todos from the API
  const fetchTodos = async () => {
    const response = await fetch("/todos");
    const todosList = await response.json();
    console.log(todosList);
    setTodos(todosList);
  };

  const [todos, setTodos] = useState([]);
  const { theme = "dark", setTheme } = useTheme();

  // Add new todo
  const addTodo = async (text) => {
    const newTodo = {
      text,
    };
    const response = await fetch("/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    const todosList = await response.json();
    setTodos([todosList, ...todos]);
  };

  // Update todo text
  const updateTodo = async (id, newText) => {
    const response = await fetch(`/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ text: newText }),
    });
    fetchTodos();
  };

  // Delete todo
  const deleteTodo = async (id) => {
    const response = await fetch(`/todos/${id}`, {
      method: "DELETE",
    });
    const todosList = await response.json();
    fetchTodos();
  };

  // Toggle todo completion
  const toggleTodo = async (id) => {
    const todoResponse = await fetch(`/todos/${id}`);
    const todo = await todoResponse.json();

    const response = await fetch(`/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    fetchTodos();
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6">
      <div className="w-full max-w-lg">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent  from-blue-500 to-purple-600">
            Todo App
          </h1>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        </header>

        <TodoForm addTodo={addTodo} />

        <main className="mt-6">
          <TodoList
            todos={todos}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
            updateTodo={updateTodo}
          />
        </main>
      </div>
    </div>
  );
}
