const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/user.controllers.js');

// CRUD Routes
router.get('/', getUsers);           // Get all users
router.get('/:id', getUserById);    // Get a single user
router.post('/', createUser);        // Create a user
router.put('/:id', updateUser);     // Update a user
router.delete('/:id', deleteUser);  // Delete a user

module.exports = router;
