import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputForm from './Components/InputForm'
import { TodoProvider } from './Context/TodoContext'
import ToDoItems from './Components/ToDoItems'

function App() {

  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev)=>[{id:Date.now(),...todo},...prev]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };


  const updateTodo=(todo,id)=>{
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id===todo.id?todo:prevTodo)))
  }

  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  console.log("Todo Mapping")
  todos.map((todo)=>(
    console.log(todo)
  ))
  

  useEffect(() => {
    const todos=JSON.parse(localStorage.getItem("todos"));
      setTodos(todos)
  }, [])
  
  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }, [todos])

  return (
   <>
   <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleCompleted}}>
   <div className=" min-h-screen bg-slate-900 py-10">
      <div className=" bg-slate-700 max-w-2xl w-full mx-auto p-3 flex justify-center rounded-lg text-white flex-col items-center mb-3">
        <h1 className='text-3xl font-bold my-4'>Enter your Tasks here</h1>
        <InputForm/>
      </div>
      <div className="flex flex-wrap gap-y-1 bg-slate-800 w-1/2 mx-auto rounded-lg">
        {todos.map((todo)=>(
              <div key={todo.id} 
              className='w-full flex p-1'
              >
                <ToDoItems todo={todo}/>
              </div>
            ))}
      </div>
    </div>
   </TodoProvider>

   </>
  )
}

export default App