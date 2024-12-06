const express = require('express');
const router = express.Router();

// Import bcrypt for password hashing

const bcrypt = require('bcrypt');

// Import User Model

const User = require('../models/user-model');

// Route to Register a User
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Hash the password

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user and save it to the database

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', success: true, data: { user: newUser } });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'User Registration failed' });
    }

})

module.exports = router;