import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
    const [task, setTask] = useState("");

    const handleAdd = async () => {
        if (!task.trim()) {
            alert("Task cannot be empty");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/add', { task });
            location.reload();
            alert("Task added successfully!");
            setTask(""); // Clear input field after adding task
        } catch (error) {
            console.error("Error adding task:", error);
            alert("Failed to add task");
        }
    };

    return (
        <div className="create_form">
            <input
                type="text"
                placeholder="Enter Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    );
};

export default Create;
