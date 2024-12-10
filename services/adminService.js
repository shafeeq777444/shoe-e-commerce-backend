const Admin = require('../model/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User=require('../model/User')
const Product=require('../model/Product')
const Order=require('../model/Order')
// Admin login
const adminLogin = async (email, password) => {
    const admin = await Admin.findOne({ email, role: 'admin' }); // Ensure the user is an admin
    if (!admin) {
        throw new Error('Admin not found');
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        throw new Error('Incorrect password');
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
    // Fetch all users with role 'user' and isDeleted as false
    const users = await User.find({ role: 'user', isDeleted: false });
    return users;
};


// Get specific user
const getUserById = async (userId) => {
    try {
        // Fetch the user by ID and check for existence
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found"); // Error for non-existing user
        }

        if (user.isDeleted) {
            throw new Error("User is deleted"); // Error for soft-deleted user
        }

        return user; // Return the user object if valid
    } catch (error) {
        console.error("Error in getUserById service:", error.message);
        throw new Error(error.message); // Propagate the error for the controller
    }
};



// Delete a user
const removeUser = async (id) => {
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
        throw new Error('User not found'); // Throw error if user does not exist
    }

    // Prevent deletion of admin users
    if (user.role === 'admin') {
        throw new Error('Cannot delete an admin user'); // Throw error for admin deletion attempt
    }

    // Update the isDeleted field to true (soft delete)
    user.isDeleted = true;
    await user.save();

    return { id, message: 'User has been marked as deleted' }; // Return a success response
};

// CRUD PRODUCTS

// Create a new product
const createProduct = async (productData) => {
    try {
        const product = new Product(productData);
        return await product.save();
    } catch (error) {
        console.error('Error in createProduct service:', error.message);
        throw new Error('Failed to create product');
    }
};

// Read products
// Fetch paginated products with category filtering
const fetchProducts = async ({ category, page, limit }) => {
    try {
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
    } catch (error) {
        console.error('Error in fetchProducts service:', error.message);
        throw new Error('Failed to fetch products');
    }
};

// Fetch specific product by ID
const fetchProductById = async (productId) => {
    try {
        const product = await Product.findById(productId);
        return product; // Return product object (or null if not found)
    } catch (error) {
        console.error('Error in fetchProductById service:', error.message);
        throw new Error('Failed to fetch product');
    }
};

// Update an existing product
const updateProduct = async (id, updates) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
            // When set to true, this option ensures that the updated document is returned as the result of the findByIdAndUpdate method.
            // If it is not set or set to false, the method will return the document before the update.
            new: true,
            // This ensures that the update operation runs the schema validators defined in your Mongoose schema.
            // Without this option, validators (like required, minLength, or custom validations) are not applied during updates.
            // casting error is worked without this
            runValidators: true
        });
        return updatedProduct;
    } catch (error) {
        console.error('Error in updateProduct service:', error.message);
        throw new Error('Failed to update product');
    }
};


// Soft delete a product (mark isDeleted as true)
const softDeleteProduct = async (id) => {
    try {
        const deletedProduct = await Product.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );
        return deletedProduct;
    } catch (error) {
        console.error('Error in softDeleteProduct service:', error.message);
        throw new Error('Failed to delete product');
    }
};


// order details

const calculateStats = async () => {
    try {
        const totalProductsSold = await Order.aggregate([
            { $unwind: '$products' }, // Unwind products array in orders
            { $group: { _id: null, total: { $sum: '$products.quantity' } } }, // Calculate total quantity of products sold
        ]);

        const totalRevenue = await Order.aggregate([
            { $unwind: '$products' },
            {
                $group: {
                    _id: null,
                    revenue: { $sum: { $multiply: ['$products.quantity', '$products.price'] } }, // Calculate revenue based on quantity and price
                },
            },
        ]);

        return {
            totalProductsSold: totalProductsSold[0]?.total || 0,
            totalRevenue: totalRevenue[0]?.revenue || 0,
        };
    } catch (error) {
        console.error("Error in calculateStats service:", error);
        throw new Error('Failed to calculate stats');
    }
};


const getAllOrders = async () => {
    try {
        const orders = await Order.find().populate('userId').populate('products.productId')
        return orders;
    } catch (error) {
        console.error("Error in getAllOrders service:", error);
        throw new Error('Failed to fetch orders');
    }
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
