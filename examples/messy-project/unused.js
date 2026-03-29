function legacyParser(data) { return JSON.parse(data); }
function legacyFormatter(obj) { return JSON.stringify(obj, null, 2); }
module.exports = { legacyParser, legacyFormatter };
