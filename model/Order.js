const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            price: {
                type: Number,
                required: true, // Price for each product
            },
        },
    ],
    purchaseDate: {
        type: Date,
        default: () => Date.now(),
    },
    orderId: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    totalItems: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Order', orderSchema);
