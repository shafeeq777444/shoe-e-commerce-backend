const productService = require("../services/productService");

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const allProducts = await productService.getAllProducts();
        res.status(200).json({ allProducts });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
    const { categoryname } = req.params;
    try {
        const categorizedProducts = await productService.getProductsByCategory(categoryname);
        if (!categorizedProducts.length) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ categorizedProducts });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productService.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ product });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
