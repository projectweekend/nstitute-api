var defaultFields = require('./data').defaultFields;
var defaultFilter = require('./data').defaultFilter;
var defaultSort = require('./data').defaultSort;


var exports = module.exports = {};


exports.get = function(req, res, next) {

    var queryFields = defaultFields();
    var queryFilter = defaultFilter();
    var querySort = defaultSort();

    var keyword = req.query.keyword;
    if (keyword) {
        queryFilter.title = {
            '$regex': new RegExp('.*' + keyword + '.*', 'i')
        };
    }

    var collection = req.db.collection('nsider_archive');
    collection.find(queryFilter)
        .project(queryFields).sort(querySort)
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
