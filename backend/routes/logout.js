const express = require('express');
const router = express.Router();

router.get('/logout', async (req, res) => {
    try {
        res.clearCookie('authToken'); // Clears the cookie named 'authToken'
        return res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;
