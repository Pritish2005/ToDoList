import React, { useState, useEffect } from 'react';
import { useTodo } from '../Context/TodoContext';

function ToDoItems({todo}) {
    console.log("todo.todo= "+todo.todo);
  const [ifEditable, setIfEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.Todo);
    console.log("todoMsg= "+todoMsg)

  const { updateTodo, deleteTodo, toggleCompleted } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIfEditable(false);
  };

  const toggleComplete = () => {
    toggleCompleted(todo.id);
  };

  return (
    <div className="w-full flex items-center justify-center mx-auto text-white">
      <input
        type="checkbox"
        className="cursor-pointer mx-2"
        checked={todo.completed}
        onChange={toggleComplete}
      />
      <div className="flex-grow">
        <input
          type="text"
          className={`p-1  outline-none ${(ifEditable)?"pl-8 border-dashed border-2 border-black":""} text-white w-full ${(todo.completed)?" bg-green-500/55":"bg-white/20"}`}
          value={todoMsg}
          placeholder={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          readOnly={!ifEditable}
        />
      </div>
      <button
        className="bg-blue-700 hover:bg-blue-600 rounded-md  w-10 p-1 ml-2"
        onClick={() => {
          if (todo.completed) return;
          if (ifEditable) {
            editTodo(todoMsg, todo.id);
          } else {
            setIfEditable((prev) => !prev);
          }
        }}
        disabled={todo.completed}
      >
        {ifEditable ? "Set" : "Edit"}
      </button>
      <button
        className="bg-blue-700 hover:bg-blue-600 rounded-md p-1 ml-2"
        onClick={() => deleteTodo(todo.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default ToDoItems;
