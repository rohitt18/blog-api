const express = require("express");
const categoriesRouter = express.Router();

const {
  createCategory,
  getAllCategories,
} = require("../controllers/categories");

categoriesRouter.route("/").post(createCategory).get(getAllCategories);

module.exports = categoriesRouter;
