import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const BASE_URL = "https://todolist-9z93.onrender.com";

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = () => {
        axios.post(`${BASE_URL}/login`, { email, password })
        .then(res => {
            if(res.data.userId){
                localStorage.setItem("userId", res.data.userId)
                navigate('/')
            } else {
                alert(res.data)
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login