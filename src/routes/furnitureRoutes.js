const express = require('express');
const router = express.Router();

const controller = require('../controllers/furnitureController');

router.get('/', controller.readAllFurniture);
router.post('/', controller.createNewFurniture);
router.get('/:fid', controller.readFurnitureById);
router.put('/:fid', controller.updateFurnitureById);
router.delete('/:fid', controller.deleteFurnitureById);

module.exports = router;