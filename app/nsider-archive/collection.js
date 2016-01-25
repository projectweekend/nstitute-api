var exports = module.exports = {};


exports.get = function(req, res, next) {
    var collection = req.db.collection('nsider_archive');
    var cursor = collection.find({
        finished: 'Y'
    }).sort({
        published_date: -1
    }).limit(req.take).skip(req.skip).toArray(function(err, articles) {
        /* istanbul ignore if */
        if (err) {
            return next(err);
        }
        return res.send(200, articles);
    });
};
