import { useState } from 'react';
import Head from 'next/head';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="container">
      <Head>
        <title>Tasks - Pomodoro Task Manager</title>
      </Head>

      <h1>Task List</h1>

      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks added yet.</p>
      ) : (
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span>{task.text}</span>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}

      <style jsx>{`
        .container {
          padding: 2rem;
        }
        .add-task {
          margin: 1rem 0;
          display: flex;
          gap: 1rem;
        }
        input[type="text"] {
          padding: 0.5rem;
          flex-grow: 1;
        }
        button {
          padding: 0.5rem 1rem;
          background: #0070f3;
          color: white;
          border: none;
          cursor: pointer;
        }
        .task-list {
          list-style: none;
          padding: 0;
        }
        .task-list li {
          padding: 0.5rem;
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .completed span {
          text-decoration: line-through;
          color: #888;
        }
        .delete-btn {
          background: transparent;
          color: red;
          border: none;
          font-size: 1rem;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
