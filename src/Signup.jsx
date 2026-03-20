import React, { useState } from 'react'
import axios from 'axios'

const BASE_URL = "https://todolist-9z93.onrender.com";

function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignup = () => {
        axios.post(`${BASE_URL}/signup`, { email, password })
        .then(res => {
            alert("Signup successful")
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <h2>Signup</h2>
            <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={handleSignup}>Signup</button>
        </div>
    )
}

export default Signup