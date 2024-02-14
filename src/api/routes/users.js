const { isLogedIn, isAdmin } = require('../../middlewares/auth');
const {
  register,
  login,
  editUser,
  deleteUser
} = require('../controllers/users');

const userRoutes = require('express').Router();

userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.put('/:id', [isLogedIn], editUser);
userRoutes.delete('/:id', [isAdmin], deleteUser);

module.exports = userRoutes;
