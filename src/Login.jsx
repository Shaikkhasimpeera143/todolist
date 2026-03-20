import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const BASE_URL = "https://todolist-9z93.onrender.com";

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = () => {
        if (!email || !password) {
            alert("Please enter email and password")
            return
        }

        axios.post(`${BASE_URL}/login`, { email, password })
            .then(res => {
                console.log("Login response:", res.data)
                
                if (res.data.userId) {
                    localStorage.setItem("userId", res.data.userId)
                    console.log("UserId saved, navigating to /")
                    navigate('/')
                } else {
                    alert("Login failed: " + res.data)
                }
            })
            .catch(err => {
                console.log("Login error:", err)
                alert("Login error: " + err.message)
            })
    }

    return (
        <div>
            <h2>Login</h2>
            <input 
                type="text" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button onClick={handleLogin}>Login</button>

            <p>Don't have an account? 
                <span 
                    onClick={() => navigate('/signup')} 
                    style={{color: 'blue', cursor: 'pointer', marginLeft: '5px'}}
                >
                    Signup
                </span>
            </p>
        </div>
    )
}

export default Login