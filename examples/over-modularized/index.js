const userService = require('./userService');
const user = userService.getUser(1);
console.log(userService.formatUser(user));
