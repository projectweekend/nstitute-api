var exports = module.exports = {};


exports.parseSkipTake = function(req, res, next) {
    req.skip = parseInt(req.query.skip, 10) || 0;
    req.take = parseInt(req.query.take, 10) || 10;
    if (req.take > 50) {
        req.take = 50;
    }
    next();
};


exports.addDatabase = function(db) {
    return function(req, res, next) {
        req.db = db;
        next();
    };
};
