const Product = require("../model/Product");
const CustomError = require("../utils/customError");

// Get all products
exports.getAllProducts = async () => {
    const products = await Product.find();
    if (!products || !products.length) {
        throw new CustomError("No products found", 404);
    }
    return products;
};

// Get products by category
exports.getProductsByCategory = async (categoryname) => {
    const categorizedProducts = await Product.find({ category: categoryname });
    if (!categorizedProducts || !categorizedProducts.length) {
        throw new CustomError(`No products found in category: ${categoryname}`, 404);
    }
    return categorizedProducts;
};

// Get a single product by ID
exports.getProductById = async (id) => {
    const product = await Product.findById(id);
    if (!product) {
        throw new CustomError("Product not found", 404);
    }
    return product;
};
