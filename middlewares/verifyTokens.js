const jwt = require('jsonwebtoken');
const {auth}=require('../config/config')
const verifyToken = (req, res, next) => {
    // Extract token from the "Authorization" header
    const authHeader = req.header("Authorization"); // Fix spelling: "Authorization"
    const token = authHeader && authHeader.split(" ")[1]; // Extract the token after "Bearer"
    
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, auth.jwtSecret);
        req.user = decoded; // Add the user info (decoded payload) to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: "Invalid token", error: error.message });
    }
};

module.exports = verifyToken;
