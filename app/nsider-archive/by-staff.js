var restify = require('restify');


var exports = module.exports = {};


exports.get = function(req, res, next) {

    var filter = {
        'finished': 'Y',
        'published_date': {
            '$ne': '0000-00-00 00:00:00'
        },
        'authors.nsider_staff_id': req.params.staffID
    };

    var sort = {
        published_date: -1
    };

    var collection = req.db.collection('nsider_archive');
    var cursor = collection.find(filter).sort(sort)
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
