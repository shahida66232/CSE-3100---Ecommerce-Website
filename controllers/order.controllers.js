const Order = require('../model/order.model.js');

/**
 * Get all orders of a user
 */
exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.params.userId }).populate('products.product');
        res.status(200).json({ success: true, data: orders });
    } catch (err) {
        next(err);
    }
};

/**
 * Create a new order
 */
exports.createOrder = async (req, res, next) => {
    try {
        const { products, totalPrice } = req.body;

        const newOrder = await Order.create({
            user: req.params.userId,
            products,
            totalPrice
        });

        res.status(201).json({ success: true, data: newOrder });
    } catch (err) {
        next(err);
    }
};

/**
 * Update order status
 */
exports.updateOrderStatus = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.orderId,
            { status: req.body.status },
            { new: true, runValidators: true }
        );
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

        res.status(200).json({ success: true, data: order });
    } catch (err) {
        next(err);
    }
};

/**
 * Delete an order
 */
exports.deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.orderId);
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

        res.status(200).json({ success: true, message: 'Order deleted successfully' });
    } catch (err) {
        next(err);
    }
};
