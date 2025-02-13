const { request, response } = require('express');
const { verifyToken } = require('../utils/authUtils');

const { User } = require('../models');

const validateJWT = async (req = request, res = response, next) => {
  const authorization = req.get('Authorization');
  let token = null;
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7);
  }
  if (!token)
    return res.status(401).json({
      msg: 'No autorized',
    });

  try {
    const { id } = await verifyToken(token);

    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json({
        msg: 'token no valida o expirada',
      });
    }
    if (user.banned) {
      return res.status(401).json({
        msg: 'Usuario no autorizado',
      });
    }

    req.user = user._id;
    req.role = user.role;

    next();
  } catch (error) {
    return res.status(401).json({
      msg: 'not valid token',
    });
  }
};

module.exports = {
  validateJWT,
};
