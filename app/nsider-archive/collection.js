var defaultFields = require('./data').defaultFields;
var defaultFilter = require('./data').defaultFilter;
var defaultSort = require('./data').defaultSort;


var exports = module.exports = {};


exports.get = function(req, res, next) {

    var fields = defaultFields();
    var filter = defaultFilter();
    var sort = defaultSort();

    var collection = req.db.collection('nsider_archive');
    collection.find(filter)
        .project(fields).sort(sort)
        .limit(req.take).skip(req.skip)
        .toArray(sendResponse);

    function sendResponse(err, articles) {
        /* istanbul ignore if */
        if (err) {
            return next(err);
        }
        return res.send(200, articles);
    }
};
