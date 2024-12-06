const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_TOKEN || 'eopjpowejfpowejfpoew';

const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"]?.split(' ')[1];
    console.log("token", token);

    if (!token) {
        return res.status(401).json({
            message: 'Authentication failed. No token provided.',
            success: false
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("decoded", decoded);
        req.user = decoded; // Attach the decoded token to the request object
        next(); // Pass control to the next middleware/route handler
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: 'Authentication failed. Invalid token.',
            success: false,
        });
    }
};

module.exports = authMiddleware;
