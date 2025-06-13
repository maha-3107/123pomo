"use client";
import { useState } from "react";

export default function ToDoList() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, done: false }]);
    setTask("");
  };

  const toggleDone = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">To-Do List</h1>
      <div className="flex mb-4 gap-2">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task..."
          className="flex-1 border px-3 py-2 rounded"
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
      </div>
      <ul>
        {tasks.map((t, index) => (
          <li
            key={index}
            className={`flex justify-between items-center mb-2 p-2 rounded shadow ${
              t.done ? "bg-green-100 line-through" : "bg-gray-100"
            }`}
          >
            <span onClick={() => toggleDone(index)} className="cursor-pointer">
              {t.text}
            </span>
            <button onClick={() => deleteTask(index)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
