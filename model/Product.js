const mongoose = require('mongoose');

// Define product schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"], // Custom error message
        trim: true
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be a positive number"] // Validation for positive numbers
    },
    image: {
        type: String,
        required: [true, "Image URL is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }); // Enable timestamps for createdAt and updatedAt

module.exports = mongoose.model('Product', productSchema);
