const express = require("express");
// const Product = require("../model/Product");

const verifyToken = require("../middlewares/verifyTokens");
const router = express.Router();
const {addToCart,getCart}=require('../controllers/cartController')

// @route  POST/cart
// @desc   Adding cart
router.post("/:id/cart", verifyToken, addToCart);

// @route  Get/cart
// @desc   display cart
router.get("/:id/cart", verifyToken,getCart);

module.exports = router;
