const furnitureModel = require('../models/furnitureModel');

// GET /furniture
var readAllFurniture = (req, res) => {
  furnitureModel.selectAllFurniture((err, results) => {
    if (err) {
      console.error('Error fetching furniture:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

// POST /furniture
var createNewFurniture = (req, res) => {
  const newFurniture = req.body;

  furnitureModel.insertNewFurniture(newFurniture, (err, results) => {
    if (err) {
      console.error('Error inserting furniture:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Furniture created', fid: results.insertId });
  });
};

// GET /furniture/:fid
var readFurnitureById = (req, res) => {
  const fid = parseInt(req.params.fid);

  furnitureModel.selectFurnitureById({ fid }, (err, results) => {
    if (err) {
      console.error('Error fetching furniture:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Furniture not found' });
    }
    res.json(results[0]);
  });
};

// PUT /furniture/:fid (only update provided fields)
var updateFurnitureById = (req, res) => {
  const fid = parseInt(req.params.fid);
  const updatedFields = {};

  if (req.body.name) updatedFields.name = req.body.name;
  if (req.body.description) updatedFields.description = req.body.description;
  if (req.body.price) updatedFields.price = req.body.price;
  if (req.body.quantity) updatedFields.quantity = req.body.quantity;
  if (req.body.catid) updatedFields.catid = req.body.catid;

  if (Object.keys(updatedFields).length === 0) {
    return res.status(400).json({ error: 'No fields provided for update' });
  }

  updatedFields.fid = fid;

  furnitureModel.updateFurnitureById(updatedFields, (err, results) => {
    if (err) {
      console.error('Error updating furniture:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Furniture not found' });
    }
    res.json({ message: 'Furniture updated' });
  });
};

// DELETE /furniture/:fid
var deleteFurnitureById = (req, res) => {
  const fid = parseInt(req.params.fid);

  furnitureModel.deleteFurnitureById({ fid }, (err, results) => {
    if (err) {
      console.error('Error deleting furniture:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Furniture not found' });
    }
    res.json({ message: 'Furniture deleted' });
  });
};

// Export all functions at the end
module.exports = {
  readAllFurniture,
  createNewFurniture,
  readFurnitureById,
  updateFurnitureById,
  deleteFurnitureById
};
