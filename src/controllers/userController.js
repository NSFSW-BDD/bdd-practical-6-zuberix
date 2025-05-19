// controllers/userController.js controllers need to tell what to do.

//see if can write in the var form that require exports at the end. follow video. try to map the fields to be more concise. although the req.body also works.

const userModel = require('../models/userModel');

// GET /users
var selectAllUser = (req, res) => {
  userModel.selectAllUsers((err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

// POST /users
var createNewUser = (req, res) => {
  const newUser = req.body;

  userModel.insertNewUser(newUser, (err, results) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'User created', userId: results.insertId });
  });
};

// GET /users/:userid
var readUserById = (req, res) => {
  const userid = parseInt(req.params.userid);

  userModel.selectUserById({ userid }, (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(results[0]);
  });
};

// PUT /users/:userid (only update provided fields)
var updateUserById = (req, res) => {
  const userid = parseInt(req.params.userid);
  const updatedFields = {};

  // Dynamically check which fields are provided in the request body
  if (req.body.email) updatedFields.email = req.body.email;
  if (req.body.password) updatedFields.password = req.body.password;
  if (req.body.username) updatedFields.username = req.body.username;
  if (req.body.role) updatedFields.role = req.body.role;

  if (Object.keys(updatedFields).length === 0) {
    return res.status(400).json({ error: 'No fields provided for update' });
  }

  // Add the userid field for the WHERE clause
  updatedFields.userid = userid;

  userModel.updateUserById(updatedFields, (err, results) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User updated' });
  });
};

// DELETE /users/:userid
var deleteUserById = (req, res) => {
  const userid = parseInt(req.params.userid);

  userModel.deleteUserById({ userid }, (err, results) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  });
};

var loginUser= (req, res, next) => {

    const data = {

      email: req.body.email,

      password: req.body.password

    };

    const callback = (error, results, fields) => {

      if (error) {

        console.error("Error Login:", error);

        res.status(500).json(error);

      } else {

        if (results.length == 0) {//no match 

          res.status(404).json({

            message: "email/password wrong",

          });

        } else { //match email and password

          res.locals.userid = results[0].userid;//saves userid from database in res.locals for use in jwt payload

          res.locals.role = results[0].role;  //saves role from database in res.locals for use in jwt payload

          next(); //call next middleware to issue token

        }

      }

    };

    userModel.loginUser(data, callback);

  }

// Export all functions at the end
module.exports = {
  selectAllUser,
  createNewUser,
  readUserById,
  updateUserById,
  deleteUserById,
  loginUser
};




