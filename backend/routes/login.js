const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user-model');

// Use a secret key for JWT (store this securely in environment variables)
const JWT_SECRET = process.env.JWT_TOKEN || 'eopjpowejfpowejfpoew';

// Route to Login a User
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // Create a JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email }, // Payload
            JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Token expiration time
        );

        res.cookie('authToken', token, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });


       return res.status(200).json({ message: 'User logged in successfully', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'User login failed' });
    }
});

module.exports = router;
