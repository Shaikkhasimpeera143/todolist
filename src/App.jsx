import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MyTodo from './MyTodo'
import Login from './Login'
import Signup from './Signup'

function App() {
  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId")
    setUserId(storedUserId)
    setLoading(false)
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={userId ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={userId ? <Navigate to="/" /> : <Signup />} />
        <Route path="/" element={userId ? <MyTodo /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App