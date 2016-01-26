var exports = module.exports = {};


exports.get = function(req, res, next) {
    var collection = req.db.collection('nsider_archive');

    // default filters
    var filter = {
        'finished': 'Y',
        'published_date': {
            '$ne': '0000-00-00 00:00:00'
        }
    };

    // by nsider_staff_id
    if (req.query.staffID) {
        filter['authors.nsider_staff_id'] = req.query.staffID;
    }

    var sort = {
        published_date: -1
    };

    var cursor = collection.find(filter).sort(sort)
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
