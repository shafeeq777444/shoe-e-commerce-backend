// const validateRequest = (schema) => (req, res, next) => {
//     const { error, value } = schema.validate({ ...req.params, ...req.query, ...req.body });

//     if (error) {
//         return res.status(400).json({ message: error.details[0].message });
//     }

//     // Replace the request object with validated data
//     req.params = value;
//     req.query = value;
//     req.body = value;

//     next();
// };

// module.exports = validateRequest;
