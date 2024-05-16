import React, { useEffect, useState } from 'react';
import './App.css';
import InputForm from './Components/InputForm';
import { TodoProvider } from './Context/TodoContext';
import ToDoItems from './Components/ToDoItems';
import Pagination from './Components/Pagination';

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage=10;

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

  const lastTodoIndex=currentPage * todosPerPage;
  const firstTodoIndex= lastTodoIndex-todosPerPage;
  const currentTodos=todos.slice(firstTodoIndex,lastTodoIndex);
  const allDeleted = currentTodos.length === 0; 
    if (allDeleted && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  console.log(currentTodos)

  const paginate=(pageNumber)=>{setCurrentPage(pageNumber)};

  return (
    <>
      <TodoProvider
  value={{ currentTodos, addTodo, updateTodo, deleteTodo, toggleCompleted }}
>
  <div className="min-h-screen bg-slate-900 py-10">
    <div className="bg-slate-700 max-w-2xl w-full mx-auto p-3 flex justify-center rounded-lg text-white flex-col items-center mb-3">
      <h1 className="text-3xl font-bold my-4">Enter your Tasks here</h1>
      <InputForm />
    </div>
    <div className="flex flex-wrap gap-y-1 bg-slate-800 w-1/2 mx-auto rounded-lg">
      {currentTodos.map((todo) => (
        <div key={todo.id} className="w-full flex p-1">
          <ToDoItems todo={todo} />
        </div>
      ))}
    </div>
    <Pagination
      className=""
      todosPerPage={todosPerPage}
      totalTodos={todos.length}
      paginate={paginate}
      currentPage={currentPage}
    />
  </div>
</TodoProvider>

    </>
  );
}

export default App;
