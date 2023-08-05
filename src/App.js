import React, { useState } from "react";
import "./App.css";

const App = () => {
    const [tasks, setTasks] = useState([])
    const [taskText, setTaskText] = useState("")

    const addTaskFunction = () => {
        const newTask = {
            id: Date.now(),
            text: taskText,
        };

        setTasks([...tasks, newTask])
        setTaskText("")
    }

    const handleAddTask = (event) => {
        if (taskText.trim() === "") return
        if (event.key === 'Enter') {
            addTaskFunction()
        }
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    };

    const handleEditTask = (id) => {
        const editedText = prompt("Edit the task:", tasks.find((task) => task.id === id).text)
        if (editedText !== null) {
            setTasks(
                tasks.map((task) => {
                    if (task.id === id) {
                        return {
                            ...task,
                            text: editedText,
                        };
                    }
                    return task
                })
            );
        }
    };

    return (
        <div className="App">
            <h1>Todo List</h1>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter a new task..."
                    value={taskText}
                    onKeyPress={handleAddTask}
                    onChange={(e) => setTaskText(e.target.value)}
                />
                <button onClick={addTaskFunction}>Add</button>
            </div>
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id}>
                        <div className={'left'}>
                            <input type="checkbox"/>
                            <span>{task.text}</span>
                        </div>
                        <div>
                            <button className={'edit'} onClick={() => handleEditTask(task.id)}>Edit</button>
                            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App
