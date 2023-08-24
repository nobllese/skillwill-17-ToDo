import React from "react";
import "./InProgressList.css";

const InProgressList = React.memo(
  ({ inProgressTasks, markAsDone, deleteTask }) => {
    return (
      <div className="in-progress-list">
        <h2>In Progress</h2>
        <ul>
          {inProgressTasks.map((task, index) => (
            <li key={index}>
              <span>{task.text}</span>
              <button onClick={() => markAsDone(index)}>Done</button>
              <button
                className="delete-button"
                onClick={() => deleteTask(index, "inProgress")}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default InProgressList;
