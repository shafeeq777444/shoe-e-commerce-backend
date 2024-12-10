const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const verifyToken = require("../middlewares/verifyTokens");

// Route to get all products
router.get("/product", verifyToken, productController.getAllProducts);

// Route to get products by category
router.get("/product/category/:categoryname", verifyToken, productController.getProductsByCategory);

// Route to get a single product by ID
router.get("/product/:id", verifyToken, productController.getProductById);

module.exports = router;
