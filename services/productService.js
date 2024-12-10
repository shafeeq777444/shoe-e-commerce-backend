const Product = require("../model/Product");

// Get all products
exports.getAllProducts = async () => {
    return await Product.find();
};

// Get products by category
exports.getProductsByCategory = async (categoryname) => {
    return await Product.find({ category:categoryname });
};

// Get a single product by ID
exports.getProductById = async (id) => {
    return await Product.findById(id);
};
