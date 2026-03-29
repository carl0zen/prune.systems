const { MAX_USERS } = require('./constants');
function validateUser(user) { return user.id > 0 && user.id <= MAX_USERS; }
module.exports = { validateUser };
