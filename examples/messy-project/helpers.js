function formatDate(date) { return new Date(date).toISOString(); }
function slugify(text) { return text.toLowerCase().replace(/\s+/g, '-'); }
module.exports = { formatDate, slugify };
