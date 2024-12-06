import React, { useState } from 'react';

const AddTaskPage = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send the data to a server or manage it locally
    console.log('Task added:', task);
    // Reset the form after submission
    setTask({ title: '', description: '', completed: false });
  };

  return (
    <div className="w-full h-[95vh] fixed flex justify-center items-center bg-gray-400">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-8">
        
        {/* First Form: Add Some Info (Above Add Task) */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Get Started</h1>
          <p className="text-gray-600">Complete the form below to add a task to your to-do list.</p>
        </div>

        {/* Add Task Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-6">Add New Task</h2>

          {/* Title Field */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Description Field */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter task description"
              rows="4"
            />
          </div>

          {/* Completed Checkbox */}
          <div className="mb-6">
            <label htmlFor="completed" className="flex items-center text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                id="completed"
                name="completed"
                checked={task.completed}
                onChange={handleChange}
                className="mr-2"
              />
              Completed
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskPage;
