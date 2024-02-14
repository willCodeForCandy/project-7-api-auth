const { generateSign } = require('../../utils/jwt');
const User = require('../models/users');
const bcrypt = require('bcrypt');

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

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username }); //validar user
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        //validar password
        const token = generateSign(user._id);
        return res.status(200).json({ user, token });
      } else {
        return res.status(400).json('Usuario o contraseña incorrectos');
      }
    } else {
      return res.status(400).json('Usuario o contraseña incorrectos');
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

const editUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user._id === id || req.user.role === 'admin') {
      //Quiero que solo el mismo usuario o un administrador puedan editar los datos del usuario
      const newUser = new User(req.body);
      newUser._id = id;
      const updatedUser = await User.findByIdAndUpdate(id, newUser, {
        new: true
      });
      return res.status(200).json({
        message: 'Usuario actualizado correctamente',
        usuario: updatedUser
      });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { register, login, editUser };
