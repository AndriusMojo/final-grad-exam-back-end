const express = require('express');
const {
  getAllRecipes, createRecipe, deleteRecipe, getSingleRecipe, getRecipesByCategory, getUserRecipes, updateUserRecipe,
} = require('../controllers/recipesController');
const { isLoggedIn, validateToken } = require('../utilities/middleware');

const recipeRoutes = express.Router();

recipeRoutes.get('/recipes', getAllRecipes);
recipeRoutes.get('/recipes/user', isLoggedIn, validateToken, getUserRecipes);
recipeRoutes.post('/createRecipe', isLoggedIn, createRecipe);
recipeRoutes.delete('/recipes/:id', isLoggedIn, validateToken, deleteRecipe);
recipeRoutes.get('/recipes/:id', getSingleRecipe);
recipeRoutes.get('/recipes/cat/:catId', getRecipesByCategory);
recipeRoutes.put('/recipes/update/:id', isLoggedIn, validateToken, updateUserRecipe);

module.exports = recipeRoutes;
