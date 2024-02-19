const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true, required: true, unique: true },
    username: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    birthYear: { type: Number, trim: true, required: true },
    role: { type: String, trim: true, required: true, default: 'user' },
    profileImage: { type: String, trim: true, required: true }
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

userSchema.pre('save', function () {
  //es necesario usar la sintaxis vieja para que la keyword this funcione bien
  this.password = bcrypt.hashSync(this.password, 10);
}); //este paso es para encriptar la contraseña antes de que se guarde en la BBDD
const User = mongoose.model('user', userSchema, 'users');

module.exports = User;
