const express = require('express');
const router = express.Router();
const Todo = require('../models/todo-model');
const User = require('../models/user-model');
const authMiddleware = require('../middleware/authMiddleware');

// Route to Add a Task
router.post('/addtask', authMiddleware, async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const { userId } = req.user;

        // Check if a task with the same title already exists for this user
        const existingTask = await Todo.findOne({
            title: { $regex: `^${title}$`, $options: 'i' },  // Case-insensitive match
            userId,  // Check only within the current user's tasks
        });

        if (existingTask) {
            return res.status(400).json({
                message: 'Task with the same title already exists.',
                success: false,
            });
        }

        // Create and save the new task
        const newTodo = new Todo({
            title,
            description,
            completed,
            userId,
        });

        await newTodo.save();

        res.status(201).json({
            message: 'Task added successfully',
            success: true,
            data: { todo: newTodo },
        });
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({
            message: 'Failed to add task. Please try again later.',
            success: false,
        });
    }
});

// Route to Get All Tasks for the Logged-in User
router.get('/gettasks', authMiddleware, async (req, res) => {
    try {

        const tasks = await Todo.find({});

        if (tasks.length > 0) {
            res.status(200).json({
                message: 'Tasks retrieved successfully',
                success: true,
                data: { tasks },
            });
        } else {
            res.status(404).json({
                message: 'No tasks found for.',
                success: false,
            });
        }
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({
            message: 'Failed to retrieve tasks. Please try again later.',
            success: false,
        });
    }
});

// Route to Get All Tasks for a Specific User (with userId)
router.get('/gettasks/getalltasks', authMiddleware, async (req, res) => {
    try {
        const { userId } = req.user;

        const tasks = await Todo.find({ userId });

        if (tasks.length > 0) {
            res.status(200).json({
                message: 'Tasks retrieved successfully',
                success: true,
                data: { tasks },
            });
        } else {
            res.status(404).json({
                message: 'No tasks found for this user.',
                success: false,
            });
        }
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({
            message: 'Failed to retrieve tasks. Please try again later.',
            success: false,
        });
    }
});

// Route to Update Task
router.put('/updatetask/:id', authMiddleware, async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const { userId } = req.user; // Extract userId from the authenticated user

        // Find the task by its ID and ensure that the task belongs to the logged-in user
        const task = await Todo.findOne({ _id: req.params.id, userId });

        // If the task doesn't exist or doesn't belong to the user, return an error
        if (!task) {
            return res.status(404).json({
                message: 'Task not found or you do not have permission to update it.',
                success: false,
            });
        }

        // Check if a task with the same title already exists for this user, excluding the current task being updated
        const existingTask = await Todo.findOne({
            title: { $regex: `^${title}$`, $options: 'i' },  // Case-insensitive match
            userId,
            _id: { $ne: req.params.id }, // Exclude the current task
        });

        if (existingTask) {
            return res.status(400).json({
                message: 'A task with the same title already exists.',
                success: false,
            });
        }

        // Proceed with updating the task
        task.title = title;
        task.description = description;
        task.completed = completed;

        await task.save();

        res.status(200).json({
            message: 'Task updated successfully',
            success: true,
            data: { task },
        });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({
            message: 'Failed to update task. Please try again later.',
            success: false,
        });
    }
});


// Route to Delete Task
router.delete('/deletetask/:id', authMiddleware, async (req, res) => {
    try {
        const { userId } = req.user; // Extract userId from the authenticated user

        // Find the task by its ID and ensure that the task belongs to the logged-in user
        const task = await Todo.findOne({ _id: req.params.id, userId });

        // If the task doesn't exist or doesn't belong to the user, return an error
        if (!task) {
            return res.status(404).json({
                message: 'Task not found or you do not have permission to delete it.',
                success: false,
            });
        }

        // Delete the task
        await Todo.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'Task deleted successfully',
            success: true,
            data: { task },
        });

    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({
            message: 'Failed to delete task. Please try again later.',
            success: false,
        });
    }
});


module.exports = router;
