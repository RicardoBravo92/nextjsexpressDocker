const authService = require('../services/authService');

const register = async (req, res) => {
  const { password, email, firstName, lastName } = req.body;
  try {
    await authService.registerUser(password, email, firstName, lastName);
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await authService.loginUser(email, password);
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const profile = async (req, res) => {
  const user = req.user;
  try {
    const userProfile = await authService.profileUser(user._id);
    res.json({ userProfile });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  const user = req.user;
  const userData = req.body;
  try {
    const updatedUser = await authService.updateUser(user._id, userData);
    res.json({ updatedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { register, login, profile, updateUser };
