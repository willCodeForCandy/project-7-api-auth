const { register } = require('../controllers/users');

const userRoutes = require('express').Router();

userRoutes.post('/register', register);

module.exports = userRoutes;
