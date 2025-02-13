const route = require('express').Router();
const authRoute = require('./auth');

route.use('/auth', authRoute);

module.exports = route;
