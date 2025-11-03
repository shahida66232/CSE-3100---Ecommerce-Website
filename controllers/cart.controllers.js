const Cart = require('../model/cart.model.js');

/**
 * Get cart by user
 */
exports.getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId }).populate('products.product');
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });
        res.status(200).json({ success: true, data: cart });
    } catch (err) {
        next(err);
    }
};

/**
 * Add product to cart
 */
exports.addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne({ user: req.params.userId });
        if (!cart) {
            cart = await Cart.create({ user: req.params.userId, products: [{ product: productId, quantity }] });
        } else {
            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }
            await cart.save();
        }
        res.status(200).json({ success: true, data: cart });
    } catch (err) {
        next(err);
    }
};

/**
 * Remove product from cart
 */
exports.removeFromCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId });
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        cart.products = cart.products.filter(p => p.product.toString() !== req.params.productId);
        await cart.save();

        res.status(200).json({ success: true, data: cart });
    } catch (err) {
        next(err);
    }
};

/**
 * Clear cart
 */
exports.clearCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId });
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        cart.products = [];
        await cart.save();
        res.status(200).json({ success: true, message: 'Cart cleared' });
    } catch (err) {
        next(err);
    }
};
