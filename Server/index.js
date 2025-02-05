const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo')

const app = express();
app.use(express.json());  // Enable JSON parsing
app.use(cors());  // Allow frontend requests

mongoose.connect('mongodb://localhost:27017/todolist', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

const TaskSchema = new mongoose.Schema({
    task: { type: String, required: true }
});

const Task = mongoose.model('Task', TaskSchema);


app.get('/get', async (req, res) => {
    try {
        const tasks = await Task.find(); // Fetch all tasks from MongoDB
        res.status(200).json(tasks);
    } catch (error) {
        console.error("❌ Error fetching tasks:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update Route
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate(id, { done: true }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Delete Route
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});


app.post('/add', async (req, res) => {
    try {
        // console.log("🔹 Request received:", req.body);  // Remove this line

        if (!req.body.task) {
            return res.status(400).json({ error: "Task is required" });
        }

        const newTask = new Task({ task: req.body.task });
        const savedTask = await newTask.save();

        // console.log("✅ Task saved:", savedTask);  // Remove this line
        res.status(201).json({ message: "Task added", task: savedTask });

    } catch (error) {
        console.error("❌ Error adding task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.listen(3001, () => console.log('🚀 Server running on port 3001'));
