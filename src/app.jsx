import React, { useState } from "react";
import TodoList from "../src/js/components/TodoList";
import "../src/styles/index.css"

function App() {
  const [apiKey, setApiKey] = useState("");

  return (
    <div className="overlay">
      <h1>📜 Guild wars 2 Lista de tareas por hacer Erik Ruiz 📜</h1>
      {!apiKey ? (
        <input
          type="text"
          placeholder="Introduce tu API Key de GW2"
          onChange={(e) => setApiKey(e.target.value)}
        />
      ) : (
        <TodoList apiKey={apiKey} />
      )}
    </div>
  );
}

export default App;