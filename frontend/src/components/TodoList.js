import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';

function TodoList({ tasks,getList }) {
  const [editTask, setEditTask] = useState(null);

  const handleTaskDelete = async (taskId) => {
    try {
      // Make a DELETE request to delete the task
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      // Handle the response and update the task list if needed
      const updatedTasks = tasks.filter((task) => task._id !== taskId);

      getList()
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleTaskStatusChange = async (taskId, completed) => {
    try {
      // Make a PUT request to update the task status
      await axios.put(`http://localhost:5000/tasks/${taskId}`, { completed });

      // Update the task list in the state
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, completed } : task
      );
      getList()

      console.log('Task status updated successfully!');
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleEditTask = async (editedTask) => {
    try {
      // Make a PUT request to update the task
      await axios.put(`http://localhost:5000/tasks/${editedTask._id}`, editedTask);

      // Update the task list in the state
      const updatedTasks = tasks.map((task) =>
        task._id === editedTask._id ? editedTask : task
      );
      getList()

      console.log('Task updated successfully!');
      setEditTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="" style={{ zIndex: 999 }}>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          title={task.title}
          completed={task.completed}
          task={task}
          setEditTask={setEditTask}
          onTaskStatusChange={handleTaskStatusChange}
          onTaskDelete={handleTaskDelete}
          handleEditTask={handleEditTask} // Pass the handleEditTask function to TaskItem
        />
      ))}
    </div>
  );
}

export default TodoList;
