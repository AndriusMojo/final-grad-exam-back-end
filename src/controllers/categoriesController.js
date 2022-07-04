const { getAllCategoriesFromDb, createCategoryInDb } = require('../models/categoriesModel');
const { failResponse, successResponse } = require('../utilities/dbHelper');

async function getAllCategories(req, res) {
  const allCategories = await getAllCategoriesFromDb();
  return allCategories === false
    ? failResponse(res)
    : successResponse(res, allCategories);
}

async function createCategory(req, res) {
  const newCategoryData = req.body;
  const categoryCreateResult = await createCategoryInDb(
    newCategoryData
  );
  return categoryCreateResult === false
    ? failResponse(res)
    : successResponse(res, categoryCreateResult);
}

module.exports = {
  getAllCategories,
  createCategory,
};
