import React, { useState } from 'react'
import { useTodo } from '../Context/TodoContext';

function InputForm() {
    const [Todo,setTodo]=useState("");

    const {addTodo}=useTodo();

    

    const add=(e)=>{
        e.preventDefault();
        if(!Todo)return;
        addTodo({Todo,completed:false});
        console.log(Todo);
        setTodo("");
    }


  return (
    <>
    <form 
    id=''
    onSubmit={add}
    className='flex gap-4 items-center justify-center'
    >
        <input 
        type="text" 
        value={Todo}
        placeholder="Enter text..."
        onChange={(e)=>setTodo(e.target.value)}
        className=' p-1 border-solid border-2 border-white outline-none text-white w-10/12 bg-white/20 '
       />
       <button 
       type="submit"
       className='bg-blue-700 hover:bg-blue-600 rounded-md p-1'>
        Add
       </button>
    </form>
      
    </>

  )
}

export default InputForm
