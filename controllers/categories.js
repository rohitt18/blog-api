const Category = require("../models/Category");

// we have only name in the Category Model therefore its v easy

// we dont wanna update or delete, we'll just create new one & get all categories

// Create category
const createCategory = async (req, res) => {
  try {
    const cat = await Category.create(req.body);
    return res.status(200).json(cat);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const cat = await Category.find({});
    return res.status(200).json(cat);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { createCategory, getAllCategories };
