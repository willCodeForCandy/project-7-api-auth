const User = require('../models/users');

const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json('Ese nombre de usuario ya existe');
    }
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { register };
