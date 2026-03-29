const config = require('./config');
const utils = require('./utils');
function fetchUsers() { return config.API_URL + '/users'; }
function fetchPosts() { return config.API_URL + '/posts'; }
module.exports = { fetchUsers, fetchPosts };
