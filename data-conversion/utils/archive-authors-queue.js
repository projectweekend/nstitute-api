var async = require('async');


var exports = module.exports = {};


exports.AuthorsQueue = async.queue(function (task, callback) {
    var staffCollection = task.db.collection('staging_archive_nsider_staff');
    var queries = task.xrefs.map(function(x) {
        return function(cb) {
            var staff = staffCollection.find({
                nsider_staff_id: x.nsider_staff_id
            }).project({
                nsider_staff_id: 1,
                first_name: 1,
                last_name: 1,
                date_created: 1,
                date_updated: 1,
                last_modified_by: 1,
                deleted: 1
            }).limit(1).next(function(err, s) {
                if (err) {
                    return cb(err);
                }
                s.display_order = x.display_order;
                s.contributor = x.contributor;
                return cb(null, s);
            });
        };
    });
    async.series(queries, function(err, authors) {
        if (err) {
            return callback(err);
        }
        task.article.authors = authors;
        return callback(null, task);
    });
}, 2);
