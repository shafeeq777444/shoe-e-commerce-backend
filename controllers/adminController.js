const adminService = require("../services/adminService");
const asyncHandler = require("../utils/asyncHandler"); // Import asyncHandler

// Admin login
exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { token, admin } = await adminService.adminLogin(email, password);
    res.cookie("authToken", token, { httpOnly: true }); // Send token as a cookie
    res.status(200).json({ message: "Login successful" });
});

// Get all users
exports.getAllUsers = asyncHandler(async (req, res) => {
    const users = await adminService.fetchAllUsers();
    res.status(200).json({ users });
});

// Get specific user
exports.getUserById = asyncHandler(async (req, res) => {
    const userId = req.params.id; // Extract user ID from the route params
    const user = await adminService.getUserById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user); // Return user details
});

// Delete a user
exports.deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await adminService.removeUser(id);
    res.status(200).json({ message: "User deleted successfully", result });
});

// CRUD PRODUCTS

// Create a new product
exports.createProduct = asyncHandler(async (req, res) => {
    const productData = req.body;
    const newProduct = await adminService.createProduct(productData);
    res.status(201).json({ message: "Product created successfully", product: newProduct });
});

// Read Products
// Fetch all products with pagination and category filtering
exports.getAllProducts = asyncHandler(async (req, res) => {
    const { category, page = 1, limit = 10 } = req.query;
    const products = await adminService.fetchProducts({ category, page, limit });
    res.status(200).json(products);
});

// Fetch specific product by ID
exports.getProductById = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await adminService.fetchProductById(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
});

// Update an existing product
exports.updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const updatedProduct = await adminService.updateProduct(id, updates);
    if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
});

// Soft delete a product
exports.deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await adminService.softDeleteProduct(id);
    if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product soft-deleted successfully" });
});

// Order Details

exports.getStats = asyncHandler(async (req, res) => {
    const stats = await adminService.calculateStats();
    res.status(200).json({
        status: "SUCCESS",
        message: "Stats fetched successfully",
        data: stats,
    });
});

// getAllOrders
exports.getOrders = asyncHandler(async (req, res) => {
    const orders = await adminService.getAllOrders();
    res.status(200).json({
        status: "SUCCESS",
        message: "Orders fetched successfully",
        data: orders,
    });
});


// Your service layer focuses on business logic, and the controller uses asyncHandler to handle errors automatically.