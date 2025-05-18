const express = require('express');
const router = express.Router();

const controller = require('../controllers/categoryController');

router.get('/', controller.readAllCategory);
router.post('/', controller.createNewCategory);
router.get('/:catid', controller.readCategoryById);
router.put('/:catid', controller.updateCategoryById);
router.delete('/:catid', controller.deleteCategoryById);

module.exports = router;