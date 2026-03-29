function formatName(name) { return name.charAt(0).toUpperCase() + name.slice(1); }
function formatDate(date) { return new Date(date).toISOString(); }
function slugify(str) { return str.toLowerCase().replace(/\s+/g, '-'); }
module.exports = { formatName, formatDate, slugify };
