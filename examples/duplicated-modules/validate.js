function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function validatePhone(phone) { return /^\d{10}$/.test(phone); }
module.exports = { validateEmail, validatePhone };
