const jwt = require('jsonwebtoken');
const { auth } = require('../config/config');

const verifyToken = (req, res, next) => {
    // Log cookies to ensure the token is present
    console.log("Cookies:", req.cookies);

    // Extract token from cookies
    const token = req.cookies?.authToken;

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded JWT payload:", decoded); // Debug decoded payload
        req.user = decoded; // Add user info to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: "Invalid token", error: error.message });
    }
};

module.exports = verifyToken;
