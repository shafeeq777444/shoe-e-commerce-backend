const Wishlist = require("../model/Whishlist");
const CustomError = require('../utils/customError');

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
            throw new CustomError("Product already exists in wishlist", 400);
        }
    }
};

// Remove from Wishlist
exports.removeFromWishlist = async (userId, productId) => {
    const updatedWishlist = await Wishlist.findOneAndUpdate(
        { userId },
        { $pull: { products: productId } },
        { new: true }
    );

    if (!updatedWishlist) {
        throw new CustomError("Wishlist not found", 404);
    }

    return updatedWishlist;
};

// Get Wishlist
exports.getWishlist = async (userId) => {
    const wishlist = await Wishlist.findOne({ userId }).populate('products');

    if (!wishlist) {
        throw new CustomError("Wishlist not found", 404);
    }

    return wishlist;
};
