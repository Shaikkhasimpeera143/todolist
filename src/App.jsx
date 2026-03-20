import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MyTodo from './MyTodo'
import Login from './Login'
import Signup from './Signup'

function App() {
  const userId = localStorage.getItem("userId");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={userId ? <MyTodo /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App