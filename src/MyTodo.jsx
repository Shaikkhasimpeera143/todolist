import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

const BASE_URL = "https://todolist-9z93.onrender.com";

function MyTodo() {
    const [todos, setTodos] = useState([])
    const userId = localStorage.getItem("userId");
    const userEmail = localStorage.getItem("userEmail");

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

    const handleLogout = () => {
        localStorage.clear()
        window.location.href = "/login"
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
            padding: '20px'
        }}>
            {/* Header with greeting + logout */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '600px',
                margin: '0 auto 20px auto'
            }}>
                <div>
                    <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: '13px' }}>👋 Welcome back,</p>
                    <p style={{ color: 'white', margin: 0, fontWeight: 'bold', fontSize: '15px' }}>
                        🌟 {userEmail || "Todo User"}
                    </p>
                </div>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: '8px 18px',
                        borderRadius: '20px',
                        border: '1px solid rgba(255,100,100,0.5)',
                        background: 'rgba(255,100,100,0.15)',
                        color: '#ff6b6b',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: 'bold'
                    }}
                >
                    🚪 Logout
                </button>
            </div>

            {/* Main card */}
            <div style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '30px',
                maxWidth: '600px',
                margin: '0 auto',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
                <h2 style={{
                    textAlign: 'center',
                    color: 'white',
                    marginTop: 0,
                    fontSize: '28px'
                }}>
                    📝 My Todo List
                </h2>

                <Create refreshTodos={() => {
                    axios.get(`${BASE_URL}/get/${userId}`)
                        .then(result => setTodos(result.data))
                }} />

                <div style={{ marginTop: '20px' }}>
                    {todos.length === 0
                        ? <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '30px' }}>
                            <div style={{ fontSize: '40px' }}>🎉</div>
                            <p>No tasks yet! Add your first task above.</p>
                          </div>
                        : todos.map(todo => (
                            <div key={todo._id} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: '12px',
                                padding: '14px 18px',
                                marginBottom: '10px',
                                border: '1px solid rgba(255,255,255,0.08)'
                            }}>
                                <div
                                    style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', flex: 1 }}
                                    onClick={() => handleEdit(todo._id)}
                                >
                                    {todo.done
                                        ? <BsFillCheckCircleFill style={{ color: '#38ef7d', fontSize: '20px', flexShrink: 0 }} />
                                        : <BsCircleFill style={{ color: 'rgba(255,255,255,0.3)', fontSize: '20px', flexShrink: 0 }} />
                                    }
                                    <p style={{
                                        margin: 0,
                                        color: todo.done ? 'rgba(255,255,255,0.3)' : 'white',
                                        textDecoration: todo.done ? 'line-through' : 'none',
                                        fontSize: '15px'
                                    }}>
                                        {todo.task}
                                    </p>
                                </div>
                                <BsFillTrashFill
                                    onClick={() => handleDelete(todo._id)}
                                    style={{ color: '#ff6b6b', fontSize: '18px', cursor: 'pointer', flexShrink: 0 }}
                                />
                            </div>
                        ))
                    }
                </div>

                {todos.length > 0 && (
                    <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '13px', marginBottom: 0 }}>
                        ✅ {todos.filter(t => t.done).length}/{todos.length} tasks completed
                    </p>
                )}
            </div>
        </div>
    )
}

export default MyTodo