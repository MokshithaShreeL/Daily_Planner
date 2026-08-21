const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];
let nextId = 1;

app.get("/", (req, res) => {
    res.send("Daily Planner Backend is Running");
});

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const { task, date } = req.body;

    if (!task || !date) {
        return res.status(400).json({
            message: "Task and date are required"
        });
    }

    const newTask = {
        id: nextId++,
        task: task,
        date: date
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    tasks = tasks.filter(task => task.id !== id);

    res.json({
        message: "Task deleted successfully"
    });
});

app.listen(5000, () => {
    console.log("Backend server running on http://localhost:5000");
});