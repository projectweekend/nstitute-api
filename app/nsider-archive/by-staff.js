var restify = require('restify');
var defaultFields = require('./data').defaultFields;
var defaultFilter = require('./data').defaultFilter;
var defaultSort = require('./data').defaultSort;


var exports = module.exports = {};


exports.get = function(req, res, next) {

    var fields = defaultFields();

    var filter = defaultFilter();
    filter['authors.nsider_staff_id'] = req.params.staffID;

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
        if (!articles.length) {
            return next(new restify.errors.NotFoundError());
        }
        return res.send(200, articles);
    }
};
