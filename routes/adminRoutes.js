const express = require('express');
const adminController = require('../controllers/adminController');
const verifyTokenByCookies = require('../middlewares/varifyTokenByCookies')
const verifyRole = require('../middlewares/verifyRole');
// const validateRequest = require('../middlewares/validateRequest');
// const { getProductsSchema, getProductByIdSchema } = require('../validators/adminValidators');


const router = express.Router();

// Admin authentication routes
router.post('/login', adminController.login); // Admin login

// Admin user handling routes
router.get('/users', verifyTokenByCookies, verifyRole('admin'), adminController.getAllUsers); // Get all users
router.get('/users/:id', verifyTokenByCookies, verifyRole('admin'), adminController.getUserById);//Get specific user
router.delete('/users/:id', verifyTokenByCookies, verifyRole('admin'), adminController.deleteUser); // Delete a user


//Admin can CRUD PRODUCTS
// create
router.post('/products',verifyTokenByCookies,verifyRole('admin'),adminController.createProduct);
// Fetch all products with pagination and filtering
router.get('/products',verifyTokenByCookies,verifyRole('admin'),adminController.getAllProducts);
// Fetch specific product details
router.get('/products/:id',verifyTokenByCookies,verifyRole('admin'),adminController.getProductById);
// Update an existing product
router.patch('/products/:id',verifyTokenByCookies,verifyRole('admin'),adminController.updateProduct);
// Soft delete a product
router.delete('/products/:id',verifyTokenByCookies,verifyRole('admin'),adminController.deleteProduct
);

//Admin can accessible order details
router.get('/stats', verifyTokenByCookies, verifyRole('admin'), adminController.getStats);

router.get('/orders', verifyTokenByCookies, verifyRole('admin'), adminController.getOrders);

module.exports = router;
