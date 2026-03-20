import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { auth, googleProvider } from './firebase'
import { signInWithPopup } from 'firebase/auth'

const BASE_URL = "https://todolist-9z93.onrender.com";

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${BASE_URL}/get/ping`).catch(() => {})
    }, [])

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

    const handleGoogleLogin = async () => {
        setGoogleLoading(true)
        try {
            const result = await signInWithPopup(auth, googleProvider)
            const user = result.user
            const res = await axios.post(`${BASE_URL}/google-login`, {
                email: user.email,
                googleId: user.uid,
                name: user.displayName
            })
            if(res.data.userId){
                localStorage.setItem("userId", res.data.userId)
                localStorage.setItem("userEmail", user.email)
                window.location.href = "/"
            }
        } catch (err) {
            alert("Google login failed!")
            setGoogleLoading(false)
        }
    }

    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
            padding: '16px',
            boxSizing: 'border-box',
            fontFamily: "'Segoe UI', sans-serif"
        }}>
            <div style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: 'clamp(24px, 5vw, 48px)',
                width: '100%',
                maxWidth: '440px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxSizing: 'border-box'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                    <div style={{ fontSize: 'clamp(36px, 8vw, 52px)' }}>✅</div>
                    <h2 style={{
                        color: 'white',
                        margin: '10px 0 6px',
                        fontSize: 'clamp(22px, 5vw, 30px)',
                        fontWeight: '700'
                    }}>Welcome Back!</h2>
                    <p style={{
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: 'clamp(12px, 3vw, 15px)',
                        margin: 0
                    }}>Login to your Todo List</p>
                </div>

                {/* Google Button */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={googleLoading}
                    style={{
                        width: '100%',
                        padding: 'clamp(10px, 2vw, 14px)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: 'white',
                        color: '#333',
                        fontSize: 'clamp(13px, 3vw, 15px)',
                        fontWeight: '600',
                        cursor: googleLoading ? 'not-allowed' : 'pointer',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        boxSizing: 'border-box',
                        transition: 'opacity 0.2s',
                        opacity: googleLoading ? 0.7 : 1
                    }}
                >
                    <img src="https://www.google.com/favicon.ico" width="20" height="20" alt="Google" />
                    {googleLoading ? '⏳ Connecting...' : 'Continue with Google'}
                </button>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.15)' }} />
                    <span style={{ color: 'rgba(255,255,255,0.35)', padding: '0 12px', fontSize: '13px' }}>or</span>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.15)' }} />
                </div>

                {/* Email */}
                <div style={{ marginBottom: '16px' }}>
                    <label style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: 'clamp(12px, 2.5vw, 14px)',
                        marginBottom: '6px',
                        display: 'block',
                        fontWeight: '500'
                    }}>📧 Email</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: '100%',
                            padding: 'clamp(10px, 2vw, 13px) 16px',
                            borderRadius: '10px',
                            border: '1px solid rgba(255,255,255,0.15)',
                            background: 'rgba(255,255,255,0.08)',
                            color: 'white',
                            fontSize: 'clamp(13px, 3vw, 15px)',
                            outline: 'none',
                            boxSizing: 'border-box',
                            transition: 'border 0.2s'
                        }}
                    />
                </div>

                {/* Password */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: 'clamp(12px, 2.5vw, 14px)',
                        marginBottom: '6px',
                        display: 'block',
                        fontWeight: '500'
                    }}>🔒 Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        style={{
                            width: '100%',
                            padding: 'clamp(10px, 2vw, 13px) 16px',
                            borderRadius: '10px',
                            border: '1px solid rgba(255,255,255,0.15)',
                            background: 'rgba(255,255,255,0.08)',
                            color: 'white',
                            fontSize: 'clamp(13px, 3vw, 15px)',
                            outline: 'none',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                {/* Login Button */}
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: 'clamp(11px, 2vw, 14px)',
                        borderRadius: '12px',
                        border: 'none',
                        background: loading ? '#555' : 'linear-gradient(135deg, #667eea, #764ba2)',
                        color: 'white',
                        fontSize: 'clamp(14px, 3vw, 16px)',
                        fontWeight: 'bold',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        marginBottom: '18px',
                        transition: 'all 0.3s',
                        boxSizing: 'border-box',
                        letterSpacing: '0.5px'
                    }}
                >
                    {loading ? '⏳ Logging in...' : '🚀 Login'}
                </button>

                {/* Signup Link */}
                <p style={{
                    textAlign: 'center',
                    color: 'rgba(255,255,255,0.45)',
                    fontSize: 'clamp(12px, 2.5vw, 14px)',
                    margin: 0
                }}>
                    Don't have an account?{' '}
                    <span
                        onClick={() => navigate('/signup')}
                        style={{ color: '#667eea', cursor: 'pointer', fontWeight: '700' }}
                    >
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Login