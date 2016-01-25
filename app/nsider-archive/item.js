var restify = require('restify');


var exports = module.exports = {};


exports.get = function(req, res, next) {
    var nsiderID = req.params.nsiderID;
    var collection = req.db.collection('nsider_archive');
    var cursor = collection.find({
        finished: 'Y',
        nsider_id: nsiderID
    }).limit(1).next(function(err, article) {
        if (err) {
            return next(err);
        }
        if (!article) {
            return next(new restify.errors.NotFoundError());
        }
        return res.send(200, article);
    });
};
