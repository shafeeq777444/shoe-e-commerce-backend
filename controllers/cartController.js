
const { addToCart, getCart } = require("../services/cartService");
exports.addToCart = async (req, res) => {
    const userId = req.user.userid;
    const { addingProducts } = req.body;
    try {
        const result = await addToCart(userId, addingProducts);
        res.status(result.status).json(result.message);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.getCart = async (req, res) => {
    const userId = req.user.userid;
    try {
        const result = await getCart(userId);
        res.json(result);
    } catch (er) {
        res.status(400).json({ message: er.message });
    }
};
