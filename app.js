const express = require("express");
const connectDB = require("./config/db");
const { application } = require("./config/config");
const authRoutes=require('./routes/authRoutes')
const cartRoutes=require('./routes/cartRoutes')
const productRoutes=require('./routes/productRoutes')
const whishlistRoutes=require('./routes/whishlistRoutes')
const orderRoutes=require('./routes/orderRoutes')
const adminRoutes=require('./routes/adminRoutes')
const cookieParser = require('cookie-parser');


// Initialize the app
const app = express();

// Connect to MongoDB
connectDB(); // Call the connection function to start the database connection

// Enable cookie parsing
app.use(cookieParser());

// Middleware and Routes (placeholder)
app.use(express.json()); // Incoming json data payloads convert to various formats depending on the requirements of your application.

// Route Mounts
app.use('/api/users',authRoutes)
app.use('/api/users',cartRoutes)
app.use('/api/users',productRoutes)
app.use('/api/users',whishlistRoutes)
app.use('/api/users',orderRoutes)

// admin routes
app.use('/api/admin',adminRoutes)


// start the server
app.listen(application.port, () => {
    console.log("port is worked on 4600");
});
