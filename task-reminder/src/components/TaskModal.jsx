import React, { useState } from 'react';
import axios from 'axios';

const TaskModal = ({ fetchTasks }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDateTime] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      taskName: taskName,
      taskDescription: taskDescription,
      taskDate: taskDate
    };
    await axios.post('https://ix03r4q895.execute-api.us-east-1.amazonaws.com/postLambda', JSON.stringify(newTask), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    fetchTasks();
    setShowModal(false);
  };

  return (
    <div className="center">
      <button className="add-task-button" onClick={() => setShowModal(true)}>Add Task</button>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={() => setShowModal(false)}>X</button>
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Task Name:</label>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>
              <div>
                <label>Task Description:</label>
                <input
                  type="text"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </div>
              <div>
                <label>Alert Time:</label>
                <input
                  type="datetime-local"
                  value={taskDate}
                  onChange={(e) => setTaskDateTime(e.target.value)}
                />
              </div>
              <button type="submit">Add Task</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskModal;
