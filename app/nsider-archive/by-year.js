var restify = require('restify');
var defaultFields = require('./data').defaultFields;
var defaultFilter = require('./data').defaultFilter;
var defaultSort = require('./data').defaultSort;


var exports = module.exports = {};


exports.get = function(req, res, next) {

    var publishedFilter = {
        '$match': defaultFilter()
    };

    var project = {
        '$project': defaultFields()
    };
    project.$project.year = {
        '$year': '$published_date'
    };

    var sort = {
        '$sort': defaultSort()
    };

    var dateFilter = {
        '$match': {
            'year': parseInt(req.params.publishedYear, 10)
        }
    };

    var skip = {
        '$skip': req.skip
    };

    var limit = {
        '$limit': req.take
    };

    var collection = req.db.collection('nsider_archive');
    var cursor = collection.aggregate([
        publishedFilter,
        project,
        dateFilter,
        sort,
        skip,
        limit
    ]).toArray(sendResponse);

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
