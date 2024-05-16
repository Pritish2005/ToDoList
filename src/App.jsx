import React, { useEffect, useState } from 'react';
import './App.css';
import InputForm from './Components/InputForm';
import { TodoProvider } from './Context/TodoContext';
import ToDoItems from './Components/ToDoItems';

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const updateTodo = (todo, id) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === todo.id ? todo : prevTodo))
    );
  };

  const toggleCompleted = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <TodoProvider
        value={{ todos, addTodo, updateTodo, deleteTodo, toggleCompleted }}
      >
        <div className="min-h-screen bg-slate-900 py-10">
          <div className="bg-slate-700 max-w-2xl w-full mx-auto p-3 flex justify-center rounded-lg text-white flex-col items-center mb-3">
            <h1 className="text-3xl font-bold my-4">Enter your Tasks here</h1>
            <InputForm />
          </div>
          <div className="flex flex-wrap gap-y-1 bg-slate-800 w-1/2 mx-auto rounded-lg">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full flex p-1">
                <ToDoItems todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </TodoProvider>
    </>
  );
}

export default App;
