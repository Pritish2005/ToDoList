import { createContext, useContext } from "react";

export const TodoContext=createContext({
    todos:[
        {id:1,
         todo:'message',
         completed:false   
        }
    ],
    addTodo:(todo)=>{},
    deleteTodo:(id)=>{},
    updateTodo:(todo,id)=>{},
    toggleCompleted:(id)=>{}
    }
)

export const TodoProvider=TodoContext.Provider

export const useTodo=()=>{
    return useContext(TodoContext);
}