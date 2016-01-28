var restify = require('restify');
var defaultFields = require('./data').defaultFields;
var defaultFilter = require('./data').defaultFilter;
var defaultSort = require('./data').defaultSort;


var exports = module.exports = {};


exports.get = function(req, res, next) {

    var fields = defaultFields();

    var filter = defaultFilter();
    filter.nsider_id = req.params.nsiderID;

    var collection = req.db.collection('nsider_archive');
    collection.find(filter).project(fields).limit(1).next(sendResponse);

    function sendResponse(err, article) {
        /* istanbul ignore if */
        if (err) {
            return next(err);
        }
        if (!article) {
            return next(new restify.errors.NotFoundError());
        }
        return res.send(200, article);
    }
};
