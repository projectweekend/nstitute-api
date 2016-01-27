var exports = module.exports = {};


exports.dateOrNull = function (dateString) {
    var parsed = Date.parse(dateString);
    if (isNaN(parsed)) {
        return null;
    }
    return new Date(parsed);
};
