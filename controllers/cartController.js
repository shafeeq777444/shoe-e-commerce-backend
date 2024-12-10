const asycHandler = require('../utils/asyncHandler')
const { addToCart, getCart } = require("../services/cartService");
exports.addToCart = asycHandler (async (req, res) => {
    const userId = req.user.userid;
    const { addingProducts } = req.body;
        const result = await addToCart(userId, addingProducts);
        res.status(result.status).json(result.message);
});

exports.getCart = asycHandler (async (req, res) => {
    const userId = req.user.userid;
        const result = await getCart(userId);
        res.json(result);
});
