import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

const BASE_URL = "https://todolist-9z93.onrender.com";

function MyTodo() {
    const [todos, setTodos] = useState([])
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (!userId) {
            window.location.href = "/login";
            return;
        }
        axios.get(`${BASE_URL}/get/${userId}`)
            .then(result => setTodos(result.data))
            .catch(err => console.log(err))
    }, [userId])

    const handleEdit = (id) => {
        axios.put(`${BASE_URL}/update/${id}`)
            .then(() => {
                setTodos(prevTodos =>
                    prevTodos.map(todo =>
                        todo._id === id ? { ...todo, done: !todo.done } : todo
                    )
                )
            })
            .catch(err => console.log(err))
    }

    const handleDelete = (id) => {
        axios.delete(`${BASE_URL}/delete/${id}`)
            .then(() => {
                setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id))
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='home'>
            <h2 className='title'>Todo List</h2>
            <Create refreshTodos={() => {
                axios.get(`${BASE_URL}/get/${userId}`)
                    .then(result => setTodos(result.data))
            }} />
            <div className="task-container">
                {todos.length === 0
                    ? <div className='no-record'><h2>No Tasks Found</h2></div>
                    : todos.map(todo => (
                        <div className='task' key={todo._id}>
                            <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                                {todo.done
                                    ? <BsFillCheckCircleFill className='icon checked' />
                                    : <BsCircleFill className='icon unchecked' />
                                }
                                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                            </div>
                            <div>
                                <span>
                                    <BsFillTrashFill
                                        className='icon delete-icon'
                                        onClick={() => handleDelete(todo._id)}
                                    />
                                </span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MyTodo