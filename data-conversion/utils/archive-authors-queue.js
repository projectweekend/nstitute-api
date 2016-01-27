var async = require('async');
var dateOrNull = require('../utils/dates').dateOrNull;


var exports = module.exports = {};


function fixAuthorDates(author) {
    author.date_created = dateOrNull(author.date_created);
    author.date_updated = dateOrNull(author.date_updated);
    return author;
}


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
        task.article.authors = authors.map(fixAuthorDates);
        return callback(null, task);
    });
}, 2);
