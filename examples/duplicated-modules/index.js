const validate = require('./validate');
const format = require('./format');
console.log(validate.validateEmail('test@test.com'));
console.log(format.formatCurrency(42.5));
