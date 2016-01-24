var util = require('util');
var Writable = require('stream').Writable;


var exports = module.exports = {};
exports.MongoCollectionWriter = MongoCollectionWriter;


function MongoCollectionWriter(collection) {
    Writable.call(this, {
        objectMode: true
    });
    this.collection = collection;
}
util.inherits(MongoCollectionWriter, Writable);

MongoCollectionWriter.prototype._write = function (message, enc, next) {
    this.collection.insert(message, function(err) {
        if (err) {
            return next(err);
        }
        return next();
    });
};

MongoCollectionWriter.prototype.end = function () {
    this.emit('end');
};
