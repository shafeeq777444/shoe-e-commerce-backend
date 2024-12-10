// const Joi = require('joi');

// // Validation schema for fetching all products
// const getProductsSchema = Joi.object({
//     page: Joi.number().integer().min(1).optional().default(1), // Default page is 1
//     limit: Joi.number().integer().min(1).max(100).optional().default(10), // Default limit is 10
//     category: Joi.string().optional() // Category filter
// });

// // Validation schema for fetching a specific product
// const getProductByIdSchema = Joi.object({
//     id: Joi.string().hex().length(24).required() // MongoDB ObjectId validation
// });

// module.exports = {
//     getProductsSchema,
//     getProductByIdSchema
// };
