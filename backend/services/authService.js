const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  hashPassword,
  comparePassword,
  generateToken,
} = require('../utils/authUtils');

module.exports = {
  registerUser: async (password, email, firstName, lastName) => {
    const emailExists = await User.findOne({ email });
    if (emailExists) throw new Error('El email ya existe');

    const hashedPassword = await hashPassword(password);

    const user = new User({
      password: hashedPassword,
      email,
      firstName,
      lastName,
    });
    await user.save();
  },

  loginUser: async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Usuario no encontrado');

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error('Contraseña incorrecta');

    const token = await generateToken(user);

    user.password = undefined;

    return { token, user };
  },
  profileUser: async (userId) => {
    const user = await User.findById(userId).select('-password');
    if (!user) throw new Error('Usuario no encontrado');
    return user;
  },
  updateUser: async (userId, userData) => {
    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }
    const user = await User.findByIdAndUpdate(userId, userData, { new: true });
    if (!user) throw new Error('Usuario no encontrado');
    return user;
  },
};
