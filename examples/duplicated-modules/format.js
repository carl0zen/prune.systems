function formatCurrency(amount) { return '$' + amount.toFixed(2); }
function formatPercent(value) { return (value * 100).toFixed(1) + '%'; }
module.exports = { formatCurrency, formatPercent };
