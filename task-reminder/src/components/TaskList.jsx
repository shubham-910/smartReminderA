import React from 'react';
import axios from 'axios';

const TaskList = ({ tasks, fetchTasks }) => {
  const handleDelete = async (taskId) => {
    try {
      await axios({
        method: 'DELETE',
        url: `https://bras87jsn7.execute-api.us-east-1.amazonaws.com/deleteLambda`,
        data: {
          pathParameters: {
            taskId: taskId.toString(),
          },
          body: "{}"
        }
      });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container">
      <h2>Task List</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.taskId}>
            <div>
              <h3>{task.taskName}</h3>
              <p>{task.taskDescription}</p>
              <p>{task.taskDate}</p>
            </div>
            <button onClick={() => handleDelete(task.taskId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
