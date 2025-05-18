const pool = require('../services/db.js');

var categoryModel = {
  // Get all categories
  selectAllCategory: (callback) => {
    const SQLSTATMENT = `
      SELECT * FROM category;
    `;
    pool.query(SQLSTATMENT, callback);
  },

  // Insert a new category (catid should be auto-incremented)
  insertNewCategory: (data, callback) => {
    const SQLSTATMENT = `
      INSERT INTO category (catid, name, description)
      VALUES (?, ?, ?);
    `;
    const VALUES = [data.catid, data.name, data.description];

    pool.query(SQLSTATMENT, VALUES, callback);
  },

  // Select category by ID
  selectCategoryById: (data, callback) => {
    const SQLSTATMENT = `
      SELECT * FROM category WHERE catid = ?;
    `;
    const VALUES = [data.catid];

    pool.query(SQLSTATMENT, VALUES, callback);
  },

  // Update category by ID (only provided fields)
  updateCategoryById: (data, callback) => {
    const SQLSTATMENT = `
      UPDATE category
      SET name = ?, description = ?
      WHERE catid = ?;
    `;
    const VALUES = [data.name, data.description, data.catid];

    pool.query(SQLSTATMENT, VALUES, callback);
  },

  // Delete category by ID
  deleteCategoryById: (data, callback) => {
    const SQLSTATMENT = `
      DELETE FROM category WHERE catid = ?;
    `;
    const VALUES = [data.catid];

    pool.query(SQLSTATMENT, VALUES, callback);
  }
};

module.exports = categoryModel;
