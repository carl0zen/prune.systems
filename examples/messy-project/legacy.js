const config = require('./config');
function oldFetch(endpoint) { return 'GET ' + config.API_URL + endpoint; }
module.exports = { oldFetch };
