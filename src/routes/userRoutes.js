const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware'); 

router.get("/", jwtMiddleware.verifyToken, jwtMiddleware.verifyAdmin, controller.selectAllUser);


router.post('/', controller.createNewUser);

router.get('/:userid', controller.readUserById);
router.put('/:userid', controller.updateUserById);

router.delete('/:userid', controller.deleteUserById);

router.post('/login', controller.loginUser,jwtMiddleware.generateToken,jwtMiddleware.sendToken);


module.exports = router;