const User = require("../model/User");
const Cart = require("../model/Cart");
const CustomError = require("../utils/customError");
exports.addToCart = async (userId, addingProducts) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new CustomError("invalid user", 400);
    }
    if (!addingProducts.length) {
        throw new CustomError("No adding products", 400);
    }
    //add product to cart
    let cart = await Cart.findOne({ userId: userId });
    if (!cart) {
        cart = new Cart({
            userId: userId,
            products: addingProducts.map((product) => ({
                productId: product.productId,
                quantity: product.quantity,
            })),
        });
        await cart.save();
        return res.status(200).json({ message: "success new" });
    } else {
        // cart is already exist in that user
        addingProducts.forEach((addingProduct) => {
            let existedProduct = cart.products.find(
                (cartProduct) => cartProduct.productId.toString() === addingProduct.productId.toString()
            );
            if (existedProduct) {
                existedProduct.quantity += addingProduct.quantity;
            } else {
                cart.products.push({ productId: addingProduct.productId, quantity: addingProduct.quantity });
            }
        });
        await cart.save();
        return { status: 200, message: "Cart updated successfully" };
    }
};
exports.getCart = async (userId) => {
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart) {
        throw new CustomError("No cart found for the user", 400);
    }
    return cart.products;
};
