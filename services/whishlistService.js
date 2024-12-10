const Wishlist = require("../model/Whishlist");

// Add to Wishlist
exports.addToWishlist = async (userId, productId) => {
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
        // Create new wishlist
        wishlist = new Wishlist({
            userId,
            products: [productId],
        });
        await wishlist.save();
        return "New wishlist created and product added";
    } else {
        // Add product to existing wishlist
        if (!wishlist.products.includes(productId)) {
            wishlist.products.push(productId);
            await wishlist.save();
            return "Product added to existing wishlist";
        } else {
            return "Product already exists in wishlist";
        }
    }
};

// Remove from Wishlist
exports.removeFromWishlist = async (userId, productId) => {
    return await Wishlist.findOneAndUpdate(
        { userId },
        { $pull: { products: productId } },
        { new: true }
    );
};

// Get Wishlist
exports.getWishlist = async (userId) => {
    return await Wishlist.findOne({ userId }).populate('products')
};
