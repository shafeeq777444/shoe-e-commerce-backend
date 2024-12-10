const wishlistService = require('../services/whishlistService');

// Add to Wishlist
exports.addToWishlist = async (req, res) => {
    const userId = req.user.userid;
    const productId = req.body.productId;

    try {
        const result = await wishlistService.addToWishlist(userId, productId);
        res.status(200).json({ message: result });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Remove from Wishlist
exports.removeFromWishlist = async (req, res) => {
    const userId = req.user.userid;
    const productId = req.body.productId;

    try {
        const updatedWishlist = await wishlistService.removeFromWishlist(userId, productId);

        if (!updatedWishlist) {
            return res.status(400).json({ message: "Wishlist not found" });
        }

        res.status(200).json({ wishlist: updatedWishlist });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

// Get Wishlist
exports.getWishlist = async (req, res) => {
    const userId = req.user.userid;

    try {
        const wishlist = await wishlistService.getWishlist(userId);

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        res.status(200).json( wishlist );
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
