const express = require('express');
const { validateFields } = require('../utils/validateFields');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { auth: controller } = require('../controllers');

const router = express.Router();

router.post(
  '/register',
  [
    check('email', 'Email is required/invalid').not().isEmpty().isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),

    validateFields,
  ],
  controller.register,
);
router.post(
  '/login',
  [
    check('email', 'Email is required/invalid').not().isEmpty().isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields,
  ],
  controller.login,
);

//profile
router.get('/profile', validateJWT, controller.profile);

//updateUser
router.put('/updateUser', validateJWT, controller.updateUser);

module.exports = router;
