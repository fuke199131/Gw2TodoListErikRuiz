import React, { useState, useEffect } from "react";

const username = "ErikRuiz"; 

function TodoList({ apiKey }) {
  const [tasks, setTasks] = useState([]);
  const [taskLabel, setTaskLabel] = useState("");

  const getTasks = () => {
    fetch(`https://playground.4geeks.com/todo/todos/${username}`)
      .then(res => res.json())
      .then(data => setTasks(data.todos || []));
  };

  const createUser = () => {
    fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
      method: "POST",
      body: JSON.stringify({ label: "Primer tarea", is_done: false }),
      headers: { "Content-Type": "application/json" }
    }).then(() => getTasks());
  };

  useEffect(() => {
    fetch(`https://playground.4geeks.com/todo/todos/${username}`)
      .then(res => {
        if (res.status === 404) createUser();
        else return res.json();
      })
      .then(data => {
        if (data?.todos) setTasks(data.todos);
      });
  }, []);

  const addTask = () => {
    if (!taskLabel) return;
    const newTask = { label: taskLabel, is_done: false };

    fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: { "Content-Type": "application/json" }
    }).then(() => {
      setTaskLabel("");
      getTasks();
    });
  };

  const deleteTask = (taskId) => {
    fetch(`https://playground.4geeks.com/todo/todos/${username}/${taskId}`, {
      method: "DELETE"
    }).then(() => getTasks());
  };

  const clearAll = () => {
    fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
      method: "DELETE"
    }).then(() => getTasks());
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nueva tarea"
        value={taskLabel}
        onChange={(e) => setTaskLabel(e.target.value)}
      />
      <button onClick={addTask}>Añadir</button>
      <button onClick={clearAll}>🧹 Limpiar todo</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.label}
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;