const { validateJWT } = require('./validate-jwt');
const { isAdminRole, hasRole } = require('./validate-role');

module.exports = {
  ...validateJWT,
  ...isAdminRole,
  ...hasRole,
};
