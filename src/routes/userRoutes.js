const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');

router.get('/', controller.readAllUser);

router.post('/', controller.createNewUser);

router.get('/:userid', controller.readUserById);
router.put('/:userid', controller.updateUserById);

router.delete('/:userid', controller.deleteUserById);


module.exports = router;