const {
  getSingleRecipeById,
  getRecipesByCategoryId,
  deleteRecipeInDb,
  createRecipeInDb,
  getAllRecipesFromDb,
  updateRecipeInDb,
  getUserRecipesByUserToken,
} = require('../models/recipesModel');
const {
  failResponse,
  successResponse,
} = require('../utilities/dbHelper');
const {
  getObjWithUserId, getUserId,
} = require('../utilities/middleware');

async function getAllRecipes(req, res) {
  const allRecipes = await getAllRecipesFromDb();
  return allRecipes === false
    ? failResponse(res)
    : successResponse(res, allRecipes);
}

async function createRecipe(req, res) {
  const newRecipeData = req.body;
  const recipeCreateResult = await createRecipeInDb(
    getObjWithUserId(req, newRecipeData),
  );
  return recipeCreateResult === false
    ? failResponse(res)
    : successResponse(res, recipeCreateResult);
}

async function deleteRecipe(req, res) {
  const recipeId = req.params.id;
  const recipeDeleteResult = await deleteRecipeInDb(
    recipeId, getUserId(req),
  );
  return recipeDeleteResult === false
    ? failResponse(res)
    : successResponse(res, recipeDeleteResult);
}

async function getSingleRecipe(req, res) {
  const recipeId = req.params.id;
  const recipeGetResult = await getSingleRecipeById(
    recipeId
  );
  return recipeGetResult === false
    ? failResponse(res)
    : successResponse(res, recipeGetResult);
}

async function getRecipesByCategory(req, res) {
  const categoryId = req.params.catId;
  const recipesGetResult = await getRecipesByCategoryId(
    categoryId
  );
  return recipesGetResult === false
    ? failResponse(res)
    : successResponse(res, recipesGetResult);
}

async function getUserRecipes(req, res) {
  const recipesGetResult = await getUserRecipesByUserToken(
    getUserId(req),
  );
  return recipesGetResult === false
    ? failResponse(res)
    : successResponse(res, recipesGetResult);
}

async function updateUserRecipe(req, res) {
  const recipeUpdateId = req.params.id
  const newRecipeData = req.body;
  const recipeUpdateResult = await updateRecipeInDb(
    newRecipeData,
    recipeUpdateId,
    getUserId(req)
  );

  return recipeUpdateResult === false
    ? failResponse(res)
    : successResponse(res, recipeUpdateResult);
}

module.exports = {
  getAllRecipes,
  createRecipe,
  deleteRecipe,
  getSingleRecipe,
  getRecipesByCategory,
  getUserRecipes,
  updateUserRecipe,
};
