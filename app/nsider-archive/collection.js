var JSONStream = require('JSONStream');


var exports = module.exports = {};


exports.get = function(req, res, next) {
    var collection = req.db.collection('nsider_archive');
    var cursor = collection.find({
        finished: 'Y'
    }).sort({published_date: -1}).limit(req.take).skip(req.skip);
    res.status(200);
    res.set('Content-Type', 'application/json');
    cursor.pipe(JSONStream.stringify()).pipe(res);
};
