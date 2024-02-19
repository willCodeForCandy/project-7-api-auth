const { isLogedIn, isAdmin } = require('../../middlewares/auth');
const {
  register,
  login,
  editUser,
  deleteUser,
  getUsers
} = require('../controllers/users');

const userRoutes = require('express').Router();

userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.get('/', getUsers);
userRoutes.put('/:id', [isLogedIn], editUser);
userRoutes.delete('/:id', [isLogedIn], [isAdmin], deleteUser);

module.exports = userRoutes;
