import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs'

const BASE_URL = "https://todolist-9z93.onrender.com";

function MyTodo() {
    const [todos, setTodos] = useState([])
    const userId = localStorage.getItem("userId")
    const userEmail = localStorage.getItem("userEmail") || "User"

    useEffect(() => {
        if (!userId) {
            window.location.href = "/login"
            return
        }
        axios.get(`${BASE_URL}/get/${userId}`)
            .then(result => setTodos(result.data))
            .catch(err => console.log(err))
    }, [userId])

    const handleLogout = () => {
        localStorage.clear()
        window.location.href = "/login"
    }

    const refreshTodos = () => {
        axios.get(`${BASE_URL}/get/${userId}`)
            .then(result => setTodos(result.data))
    }

    const handleEdit = (id) => {
        axios.put(`${BASE_URL}/update/${id}`)
            .then(() => {
                setTodos(prev => prev.map(todo =>
                    todo._id === id ? { ...todo, done: !todo.done } : todo
                ))
            })
    }

    const handleDelete = (id) => {
        axios.delete(`${BASE_URL}/delete/${id}`)
            .then(() => {
                setTodos(prev => prev.filter(todo => todo._id !== id))
            })
    }

    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
            padding: '16px',
            boxSizing: 'border-box',
            fontFamily: "'Segoe UI', sans-serif"
        }}>
            {/* Header */}
            <div style={{
                maxWidth: '640px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'clamp(12px, 3vw, 20px) 0',
                marginBottom: '10px'
            }}>
                <div>
                    <h1 style={{
                        color: 'white',
                        margin: 0,
                        fontSize: 'clamp(20px, 5vw, 28px)',
                        fontWeight: '700'
                    }}>📋 Todo List</h1>
                    <p style={{
                        color: 'rgba(255,255,255,0.5)',
                        margin: '4px 0 0',
                        fontSize: 'clamp(11px, 2.5vw, 13px)'
                    }}>👋 Welcome, {userEmail}</p>
                </div>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: 'clamp(7px, 2vw, 10px) clamp(12px, 3vw, 20px)',
                        borderRadius: '10px',
                        border: 'none',
                        background: 'rgba(255,80,80,0.2)',
                        color: '#ff6b6b',
                        fontSize: 'clamp(12px, 2.5vw, 14px)',
                        fontWeight: '600',
                        cursor: 'pointer',
                        border: '1px solid rgba(255,80,80,0.3)',
                        whiteSpace: 'nowrap'
                    }}
                >
                    🚪 Logout
                </button>
            </div>

            {/* Main Card */}
            <div style={{
                maxWidth: '640px',
                margin: '0 auto',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: 'clamp(16px, 4vw, 32px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxSizing: 'border-box'
            }}>
                <Create refreshTodos={refreshTodos} />

                <div style={{ marginTop: '20px' }}>
                    {todos.length === 0
                        ? <div style={{
                            textAlign: 'center',
                            padding: '40px 0',
                            color: 'rgba(255,255,255,0.3)',
                            fontSize: 'clamp(14px, 3vw, 16px)'
                        }}>
                            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎉</div>
                            No tasks yet! Add one above.
                        </div>
                        : todos.map(todo => (
                            <div key={todo._id} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: 'clamp(10px, 2vw, 14px) clamp(12px, 3vw, 18px)',
                                marginBottom: '10px',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.08)',
                                transition: 'all 0.2s'
                            }}>
                                <div
                                    style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', flex: 1 }}
                                    onClick={() => handleEdit(todo._id)}
                                >
                                    {todo.done
                                        ? <BsFillCheckCircleFill style={{ color: '#38ef7d', fontSize: 'clamp(18px, 4vw, 22px)', flexShrink: 0 }} />
                                        : <BsCircleFill style={{ color: 'rgba(255,255,255,0.2)', fontSize: 'clamp(18px, 4vw, 22px)', flexShrink: 0 }} />
                                    }
                                    <p style={{
                                        margin: 0,
                                        color: todo.done ? 'rgba(255,255,255,0.3)' : 'white',
                                        textDecoration: todo.done ? 'line-through' : 'none',
                                        fontSize: 'clamp(13px, 3vw, 15px)',
                                        wordBreak: 'break-word'
                                    }}>{todo.task}</p>
                                </div>
                                <BsFillTrashFill
                                    onClick={() => handleDelete(todo._id)}
                                    style={{
                                        color: '#ff6b6b',
                                        fontSize: 'clamp(16px, 3.5vw, 20px)',
                                        cursor: 'pointer',
                                        flexShrink: 0,
                                        marginLeft: '12px'
                                    }}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MyTodo