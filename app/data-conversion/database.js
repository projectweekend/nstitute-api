var util = require('util');
var Writable = require('stream').Writable;


var exports = module.exports = {};
exports.MongoWriter = MongoWriter;


function MongoWriter(collection) {
    Writable.call(this, {
        objectMode: true
    });
    this.collection = collection;
}
util.inherits(MongoWriter, Writable);

MongoWriter.prototype._write = function (message, enc, next) {
    this.collection.insert(message, function(err) {
        if (err) {
            return next(err);
        }
        return next();
    });
};

MongoWriter.prototype.end = function () {
    this.emit('end');
};
