const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

// Get cart of a user
router.get('/:userId', cartController.getCart);

// Add product to cart
router.post('/:userId', cartController.addToCart);

// Remove product from cart
router.delete('/:userId/:productId', cartController.removeFromCart);

// Clear cart
router.delete('/:userId', cartController.clearCart);

module.exports = router;
