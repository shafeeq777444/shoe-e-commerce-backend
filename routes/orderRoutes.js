const express = require("express");
const { placeOrderController, getUserOrderController } = require("../controllers/orderController");
const verifyToken = require("../middlewares/verifyTokens");
const router = express.Router();

// placeOrder routes
router.post("/order", verifyToken, placeOrderController);
router.get("/order", verifyToken, getUserOrderController);

module.exports = router;
