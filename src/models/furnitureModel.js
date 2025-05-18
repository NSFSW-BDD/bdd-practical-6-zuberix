const pool = require('../services/db.js');

var furnitureModel = {
  // Get all furniture
  selectAllFurniture: (callback) => {
    const SQLSTATEMENT = `
      SELECT * FROM furniture;
    `;
    pool.query(SQLSTATEMENT, callback);
  },

  // Get furniture by ID
  selectFurnitureById: (data, callback) => {
    const SQLSTATEMENT = `
      SELECT * FROM furniture
      WHERE fid = ?;
    `;
    const VALUES = [data.fid];

    pool.query(SQLSTATEMENT, VALUES, callback);
  },

  // Insert new furniture
  insertNewFurniture: (data, callback) => {
    const SQLSTATEMENT = `
      INSERT INTO furniture (name, description, price, quantity, catid)
      VALUES (?, ?, ?, ?, ?);
    `;
    const VALUES = [
      data.name,
      data.description,
      data.price,
      data.quantity,
      data.catid
    ];

    pool.query(SQLSTATEMENT, VALUES, callback);
  },

  // Update furniture by ID (only provided fields)
  updateFurnitureById: (data, callback) => {
    let updates = [];
    let values = [];

    if (data.name) {
      updates.push('name = ?');
      values.push(data.name);
    }
    if (data.description) {
      updates.push('description = ?');
      values.push(data.description);
    }
    if (data.price) {
      updates.push('price = ?');
      values.push(data.price);
    }
    if (data.quantity) {
      updates.push('quantity = ?');
      values.push(data.quantity);
    }
    if (data.catid) {
      updates.push('catid = ?');
      values.push(data.catid);
    }

    // Must have at least one field to update
    if (updates.length === 0) {
      return callback(new Error('No fields to update'), null);
    }

    const SQLSTATEMENT = `
      UPDATE furniture
      SET ${updates.join(', ')}
      WHERE fid = ?;
    `;
    values.push(data.fid);

    pool.query(SQLSTATEMENT, values, callback);
  },

  // Delete furniture by ID
  deleteFurnitureById: (data, callback) => {
    const SQLSTATEMENT = `
      DELETE FROM furniture
      WHERE fid = ?;
    `;
    const VALUES = [data.fid];

    pool.query(SQLSTATEMENT, VALUES, callback);
  }
};

module.exports = furnitureModel;
