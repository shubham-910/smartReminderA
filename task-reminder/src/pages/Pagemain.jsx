import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from '../components/TaskList';
import TaskModal from '../components/TaskModal';

const apiBaseUrl = 'https://fxyjx5w1n8.execute-api.us-east-1.amazonaws.com';

const Pagemain = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/fetchLambda`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div>
      <h1>Smart Reminder</h1>
      <TaskModal fetchTasks={fetchTasks} />
      <TaskList tasks={tasks} fetchTasks={fetchTasks} />
    </div>
  );
};

export default Pagemain;
