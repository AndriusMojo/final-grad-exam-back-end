const express = require('express');
const usersController = require('../controllers/usersController');

const userRoutes = express.Router();

userRoutes.get('/users', usersController.getAllUsers);
userRoutes.get('/users/user', usersController.getUserById);

module.exports = userRoutes;
