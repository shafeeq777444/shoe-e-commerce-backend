const adminService = require('../services/adminService')

// Admin login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { token, admin } = await adminService.adminLogin(email, password);
        res.cookie('authToken', token, { httpOnly: true }); // Send token as a cookie
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await adminService.fetchAllUsers();
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get specific user

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id; // Extract user ID from the route params

        // Call the service to fetch the user
        const user = await adminService.getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user); // Return user details
    } catch (error) {
        console.error("Error in getUserById controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Delete a user
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await adminService.removeUser(id);
        res.status(200).json({ message: 'User deleted successfully', result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// CRUD PRODUCTS

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const productData = req.body;

        // Create product via service
        const newProduct = await adminService.createProduct(productData);

        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error('Error in createProduct controller:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Read Products
// Fetch all products with pagination and category filtering
exports.getAllProducts = async (req, res) => {
    try {
        const { category, page = 1, limit = 10 } = req.query;

        // Call service to fetch paginated products with filters
        const products = await adminService.fetchProducts({ category, page, limit });

        res.status(200).json(products);
    } catch (error) {
        console.error('Error in getAllProducts controller:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Fetch specific product by ID
exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;

        // Call service to fetch product by ID
        const product = await adminService.fetchProductById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error in getProductById controller:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Update product via service
        const updatedProduct = await adminService.updateProduct(id, updates);

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error('Error in updateProduct controller:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Soft delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Soft delete product via service
        const deletedProduct = await adminService.softDeleteProduct(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product soft-deleted successfully' });
    } catch (error) {
        console.error('Error in deleteProduct controller:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};



// order Details

exports.getStats = async (req, res) => {
    try {
        const stats = await adminService.calculateStats();

        res.status(200).json({
            status: 'SUCCESS',
            message: 'Stats fetched successfully',
            data: stats,
        });
    } catch (error) {
        console.error("Error in getStats controller:", error);
        res.status(500).json({
            status: 'ERROR',
            message: 'Failed to fetch stats',
        });
    }
};

// getAllOrders
exports.getOrders = async (req, res) => {
    try {
        const orders = await adminService.getAllOrders();

        res.status(200).json({
            status: 'SUCCESS',
            message: 'Orders fetched successfully',
            data: orders,
        });
    } catch (error) {
        console.error("Error in getOrders controller:", error);
        res.status(500).json({
            status: 'ERROR',
            message: 'Failed to fetch orders',
        });
    }
};
