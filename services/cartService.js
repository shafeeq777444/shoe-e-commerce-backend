const User = require("../model/User");
const Cart = require("../model/Cart");
exports.addToCart=async(userId,addingProducts)=>{

    const user = await User.findById(userId);
    if (!user) {
        return res.status(400).json({ message: "invalid user " });
    }
    if (!addingProducts.length) {
        return res.status(400).json({ message: "no addingProducts " });
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
        return {status:200,message:"Cart updated successfully"}
    }
}
exports.getCart=async (userId)=>{
    try {
        const cart = await Cart.findOne({ userId }).populate('products.productId');
        if (!cart) {
            return { status: 400, message: "No cart found for the user" };
        }
        return cart.products;
    } catch (err) {
        throw new Error("Error fetching cart: " + err.message);
    }
}