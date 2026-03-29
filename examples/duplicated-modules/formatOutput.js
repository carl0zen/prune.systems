function formatCurrency(amount) { return '$' + amount.toFixed(2); }
function formatDate(date) { return new Date(date).toLocaleDateString(); }
module.exports = { formatCurrency, formatDate };
