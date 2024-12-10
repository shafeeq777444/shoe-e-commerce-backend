const Admin = require('../model/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const Product = require('../model/Product');
const Order = require('../model/Order');
const CustomError = require('../utils/customError'); // Import CustomError class

// Admin login
const adminLogin = async (email, password) => {
    const admin = await Admin.findOne({ email, role: 'admin' }); // Ensure the user is an admin
    if (!admin) {
        throw new CustomError('Admin not found', 404);
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        throw new CustomError('Incorrect password', 401);
    }

    // Generate JWT
    const token = jwt.sign(
        { id: admin._id, role: admin.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return { token };
};

// Fetch all users (excluding admins)
const fetchAllUsers = async () => {
    return await User.find({ role: 'user', isDeleted: false });
};

// Get specific user
const getUserById = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new CustomError("User not found", 404); // Error for non-existing user
    }

    if (user.isDeleted) {
        throw new CustomError("User is deleted", 404); // Error for soft-deleted user
    }

    return user; // Return the user object if valid
};

// Delete a user
const removeUser = async (id) => {
    const user = await User.findById(id);

    if (!user) {
        throw new CustomError('User not found', 404); // User not found
    }

    if (user.role === 'admin') {
        throw new CustomError('Cannot delete an admin user', 400); // Cannot delete admin
    }

    // Soft delete user
    user.isDeleted = true;
    await user.save();

    return { id, message: 'User has been marked as deleted' };
};

// CRUD PRODUCTS

// Create a new product
const createProduct = async (productData) => {
    const product = new Product(productData);
    return await product.save();
};

// Fetch paginated products with category filtering
const fetchProducts = async ({ category, page, limit }) => {
    const query = {};
    if (category) {
        query.category = category; // Add category filter
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
        .skip(skip)
        .limit(Number(limit)); // Pagination logic

    const totalProducts = await Product.countDocuments(query); // Total count for pagination

    return {
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: Number(page),
        products
    };
};

// Fetch specific product by ID
const fetchProductById = async (productId) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new CustomError('Product not found', 404); // Product not found
    }
    return product;
};

// Update an existing product
const updateProduct = async (id, updates) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true
    });
    if (!updatedProduct) {
        throw new CustomError('Product not found', 404); // Product not found
    }
    return updatedProduct;
};

// Soft delete a product (mark isDeleted as true)
const softDeleteProduct = async (id) => {
    const deletedProduct = await Product.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );
    if (!deletedProduct) {
        throw new CustomError('Product not found', 404); // Product not found
    }
    return deletedProduct;
};

// Order details

const calculateStats = async () => {
    const totalProductsSold = await Order.aggregate([
        { $unwind: '$products' },
        { $group: { _id: null, total: { $sum: '$products.quantity' } } },
    ]);

    const totalRevenue = await Order.aggregate([
        { $unwind: '$products' },
        {
            $group: {
                _id: null,
                revenue: { $sum: { $multiply: ['$products.quantity', '$products.price'] } },
            },
        },
    ]);

    return {
        totalProductsSold: totalProductsSold[0]?.total || 0,
        totalRevenue: totalRevenue[0]?.revenue || 0,
    };
};

const getAllOrders = async () => {
    const orders = await Order.find().populate('userId').populate('products.productId');
    return orders;
};

module.exports = {
    adminLogin,
    fetchAllUsers,
    removeUser,
    getUserById,
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    softDeleteProduct,
    calculateStats,
    getAllOrders
};
