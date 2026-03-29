function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function validateName(name) { return name.length > 0 && name.length < 100; }
module.exports = { validateEmail, validateName };
