const express = require('express');
const router = express.Router();

const categoryRoutes = require('./categoryRoutes');
const furnitureRoutes = require('./furnitureRoutes');
const userRoutes = require('./userRoutes');


router.use("/category", categoryRoutes);
router.use("/furniture", furnitureRoutes);
router.use("/user", userRoutes);

module.exports = router;


//In Express, router is not predefined. It's created using the express.Router() function, which is part of the Express API. 
//The express.Router() function allows you to create modular, mountable route handlers, essentially organizing your routes into separate modules.