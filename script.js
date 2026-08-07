const API_URL = "http://localhost:5000/tasks";

async function addTask() {
    const task = document.getElementById("taskInput").value;
    const date = document.getElementById("date").value;

    if (!task || !date) {
        alert("Please enter task and date");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ task, date })
    });

    document.getElementById("taskInput").value = "";
    document.getElementById("date").value = "";

    loadTasks();
}

async function loadTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `${task.task} - ${task.date}
        <button onclick="deleteTask(${task.id})">Delete</button>`;
        taskList.appendChild(li);
    });
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}

loadTasks();