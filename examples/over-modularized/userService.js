const { getUser } = require('./getUser');
const { formatUser } = require('./formatUser');
const { validateUser } = require('./validateUser');
function getUserFormatted(id) { const u = getUser(id); return validateUser(u) ? formatUser(u) : null; }
module.exports = { getUser, formatUser, validateUser, getUserFormatted };
