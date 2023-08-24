import React, { useState, useCallback } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import InProgressList from "./components/InProgressList";
import CompletedList from "./components/CompletedList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const addTask = useCallback((text) => {
    setTasks((prevTasks) => [...prevTasks, { text }]);
  }, []);

  const moveInProgress = useCallback(
    (index) => {
      setInProgressTasks((prevInProgressTasks) => [
        ...prevInProgressTasks,
        tasks[index],
      ]);
      setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    },
    [tasks]
  );

  const markAsDone = useCallback(
    (index) => {
      setCompletedTasks((prevCompletedTasks) => [
        ...prevCompletedTasks,
        inProgressTasks[index],
      ]);
      setInProgressTasks((prevInProgressTasks) =>
        prevInProgressTasks.filter((_, i) => i !== index)
      );
    },
    [inProgressTasks]
  );

  const deleteTask = useCallback((index, listType) => {
    if (listType === "inProgress") {
      setInProgressTasks((prevInProgressTasks) =>
        prevInProgressTasks.filter((_, i) => i !== index)
      );
    } else if (listType === "completed") {
      setCompletedTasks((prevCompletedTasks) =>
        prevCompletedTasks.filter((_, i) => i !== index)
      );
    } else {
      setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    }
  }, []);

  return (
    <div className="App">
      <h1>Task Management</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a new task..."
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addTask(e.target.value);
              e.target.value = "";
            }
          }}
        />
      </div>
      <div className="lists">
        <TodoList tasks={tasks} moveInProgress={moveInProgress} />
        <InProgressList
          inProgressTasks={inProgressTasks}
          markAsDone={markAsDone}
          deleteTask={deleteTask}
        />
        <CompletedList
          completedTasks={completedTasks}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;
