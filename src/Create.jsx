import React, { useState } from 'react'
import axios from 'axios'

const BASE_URL = "https://todolist-9z93.onrender.com";

function Create({ refreshTodos }) {
    const [task, setTask] = useState("")

    const userId = localStorage.getItem("userId"); // ✅ IMPORTANT

    const handleAdd = () => {
        if (!task) return;

        axios.post(`${BASE_URL}/add`, {
            task: task,
            userId: userId   // ✅ VERY IMPORTANT
        })
        .then(result => {
            setTask("")          // clear input
            refreshTodos()       // refresh list without reload
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='create_form'>
            <input 
                type="text" 
                placeholder='Enter Task' 
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button type="button" onClick={handleAdd}>
                Add
            </button>
        </div>
    )
}

export default Create