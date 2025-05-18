// controllers/userController.js controllers need to tell what to do.

//see if can write in the var form that require exports at the end. follow video. try to map the fields to be more concise. although the req.body also works.

const categoryModel = require('../models/categoryModel');

// GET /category
var readAllCategory = (req, res) => {
  categoryModel.selectAllCategory((err, results) => {
    if (err) {
      console.error('Error fetching category:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

// POST /category
var createNewCategory = (req, res) => {
  const newCategory = req.body;

  categoryModel.insertNewCategory(newCategory, (err, results) => {
    if (err) {
      console.error('Error inserting category:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Category created' });
  });
};

// GET /category/:catid
var readCategoryById = (req, res) => {
  const catid = parseInt(req.params.catid);

  categoryModel.selectCategoryById({ catid }, (err, results) => {
    if (err) {
      console.error('Error fetching category:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(results[0]);
  });
};

// PUT /category/:catid (only update provided fields)
var updateCategoryById = (req, res) => {
  const catid = parseInt(req.params.catid);
  const updatedFields = {};

  // Dynamically check which fields are provided in the request body
  if (req.body.name) updatedFields.name = req.body.name;
  if (req.body.description) updatedFields.description = req.body.description;

  if (Object.keys(updatedFields).length === 0) {
    return res.status(400).json({ error: 'No fields provided for update' });
  }

  // Add the catid field for the WHERE clause
  updatedFields.catid = catid;

  categoryModel.updateCategoryById(updatedFields, (err, results) => {
    if (err) {
      console.error('Error updating category:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category updated' });
  });
};

// DELETE /category/:catid
var deleteCategoryById = (req, res) => {
  const catid = parseInt(req.params.catid);

  categoryModel.deleteCategoryById({ catid }, (err, results) => {
    if (err) {
      console.error('Error deleting category:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category deleted' });
  });
};

// Export all functions at the end
module.exports = {
  readAllCategory,
  createNewCategory,
  readCategoryById,
  updateCategoryById,
  deleteCategoryById
};


