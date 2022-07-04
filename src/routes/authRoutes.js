const express = require('express');
const authController = require('../controllers/authController');
const { registerUserValidate, loginUserValidate } = require('../utilities/middleware');

const authRoutes = express.Router();

authRoutes.post('/register', registerUserValidate, authController.userRegister);
authRoutes.post('/login', loginUserValidate, authController.userLogin);

module.exports = authRoutes;
