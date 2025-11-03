// index.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.router');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Test route to check backend status
app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Backend is working!' });
});

// Routes
app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});


// MongoDB connection
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error('MONGO_URI not defined in .env file');
    process.exit(1);
}

mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
    })
    .catch(err => {
        console.error('MongoDB Connection Error:', err.message);
        process.exit(1);
    });

    const cartRouter = require('./routes/cart.router');
const orderRouter = require('./routes/order.router');

app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/users', userRoutes);
