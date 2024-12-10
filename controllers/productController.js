const productService = require("../services/productService");
const asyncHandler = require("../utils/asyncHandler"); // Import asyncHandler

// Get all products
exports.getAllProducts = asyncHandler(async (req, res) => {
    const allProducts = await productService.getAllProducts();
    res.status(200).json({ allProducts });
});

// Get products by category
exports.getProductsByCategory = asyncHandler(async (req, res) => {
    const { categoryname } = req.params;
    const categorizedProducts = await productService.getProductsByCategory(categoryname);
    if (!categorizedProducts.length) {
        return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ categorizedProducts });
});

// Get a single product by ID
exports.getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product });
});
