const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const { isLoggedIn, validateToken } = require('../utilities/middleware');

const categoriesRoutes = express.Router();

categoriesRoutes.get('/categories', categoriesController.getAllCategories);
categoriesRoutes.post('/createCat', isLoggedIn, validateToken, categoriesController.createCategory);

module.exports = categoriesRoutes;
