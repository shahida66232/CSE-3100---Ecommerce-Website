const Product = require('../model/product.model.js');

/**
 * Get all products
 */
exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (err) {
        next(err);
    }
};

/**
 * Get a single product by ID
 */
exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
};

/**
 * Create a new product
 */
exports.createProduct = async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({ success: true, data: newProduct });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: 'Product already exists' });
        }
        next(err);
    }
};

/**
 * Update a product by ID
 */
exports.updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProduct) return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: 'Product already exists' });
        }
        next(err);
    }
};

/**
 * Delete a product by ID
 */
exports.deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (err) {
        next(err);
    }
};
