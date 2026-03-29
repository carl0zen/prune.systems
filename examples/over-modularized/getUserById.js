const { getUser } = require('./getUser');
function getUserById(id) { return getUser(id); }
module.exports = { getUserById };
