const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyTokens');
const whishlistController = require('../controllers/whishlistController');

router.post('/:id/whishlists', verifyToken, whishlistController.addToWishlist);
router.delete('/:id/whishlists', verifyToken, whishlistController.removeFromWishlist);
router.get('/:id/whishlists', verifyToken, whishlistController.getWishlist);

module.exports = router;
