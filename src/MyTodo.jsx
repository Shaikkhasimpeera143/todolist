import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        axios.get('https://todolist-9z93.onrender.com/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleEdit = (id) => {
        axios.put('https://todolist-9z93.onrender.com/update/'+id)
        .then(result => {
            // Instantly update the UI without reloading
            setTodos(prevTodos => 
                prevTodos.map(todo => 
                    todo._id === id ? {...todo, done: !todo.done} : todo
                )
            )
        })
        .catch(err => console.log(err))
    }

    const handleDelete = (id) => {
        axios.delete('https://todolist-9z93.onrender.com/delete/'+id)
        .then(result => {
            // Instantly remove from UI without reloading
            setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id))
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='home'>
        {/* UPDATED TITLE HERE */}
        <h2 className='title'>Todo List</h2>
        <Create />
        <div className="task-container">
            {
                todos.length === 0 
                ? 
                <div className='no-record'><h2>No Tasks Found</h2></div>
                :
                todos.map(todo => (
                    <div className='task' key={todo._id}>
                        <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                            {todo.done ? 
                                <BsFillCheckCircleFill className='icon checked'></BsFillCheckCircleFill>
                            :
                                <BsCircleFill className='icon unchecked'/>
                            }
                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                        </div>
                        <div>
                            <span><BsFillTrashFill className='icon delete-icon' onClick={() => handleDelete(todo._id)}/></span>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Home