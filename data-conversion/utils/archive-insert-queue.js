var async = require('async');


var exports = module.exports = {};


exports.InsertQueue = async.queue(function (task, callback) {
    task.db.collection('nsider_archive').insert(task.article, function(err) {
        if (err) {
            return callback(err);
        }
        return callback();
    });
}, 2);
