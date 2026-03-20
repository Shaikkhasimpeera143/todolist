import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const BASE_URL = "https://todolist-9z93.onrender.com";

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = () => {
        if (!email || !password) {
            alert("Please enter email and password")
            return
        }
        setLoading(true)
        axios.post(`${BASE_URL}/login`, { email, password })
        .then(res => {
            if(res.data.userId){
                localStorage.setItem("userId", res.data.userId)
                localStorage.setItem("userEmail", email)
                window.location.href = "/"
            } else {
                alert("❌ " + res.data)
                setLoading(false)
            }
        })
        .catch(err => {
            alert("Something went wrong!")
            setLoading(false)
        })
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)'
        }}>
            <div style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '40px',
                width: '380px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{ fontSize: '48px' }}>✅</div>
                    <h2 style={{ color: 'white', margin: '10px 0 5px', fontSize: '28px' }}>Welcome Back!</h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Login to your Todo List</p>
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginBottom: '6px', display: 'block' }}>📧 Email</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: '10px',
                            border: '1px solid rgba(255,255,255,0.2)',
                            background: 'rgba(255,255,255,0.08)',
                            color: 'white',
                            fontSize: '14px',
                            outline: 'none',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginBottom: '6px', display: 'block' }}>🔒 Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: '10px',
                            border: '1px solid rgba(255,255,255,0.2)',
                            background: 'rgba(255,255,255,0.08)',
                            color: 'white',
                            fontSize: '14px',
                            outline: 'none',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '13px',
                        borderRadius: '10px',
                        border: 'none',
                        background: loading ? '#555' : 'linear-gradient(135deg, #667eea, #764ba2)',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        marginBottom: '16px',
                        transition: 'all 0.3s'
                    }}
                >
                    {loading ? '⏳ Logging in...' : '🚀 Login'}
                </button>

                <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                    Don't have an account?{' '}
                    <span
                        onClick={() => navigate('/signup')}
                        style={{ color: '#667eea', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Login