var async = require('async');


var exports = module.exports = {};


exports.XrefQueue = async.queue(function (task, callback) {
    var authorsXref = task.db.collection('staging_archive_nsider_authors').find({
        nsider_id: task.article.nsider_id
    }).project({
        xref_id: 1,
        nsider_id: 1,
        nsider_staff_id: 1,
        display_order: 1,
        contributor: 1
    }).sort({
        display_order: 1
    });
    authorsXref.toArray(function(err, xrefs) {
        if (err) {
            return callback(err);
        }
        task.xrefs = xrefs;
        return callback(null, task);
    });
}, 2);
