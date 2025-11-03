const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

// Get all orders of a user
router.get('/:userId', orderController.getOrders);

// Create a new order for a user
router.post('/:userId', orderController.createOrder);

// Update order status
router.put('/:orderId', orderController.updateOrderStatus);

// Delete an order
router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;
