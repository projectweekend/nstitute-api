var async = require('async');


var exports = module.exports = {};


exports.PagesQueue = async.queue(function (task, callback) {
    var articlePages = task.db.collection('staging_archive_nsider_pages').find({
        nsider_id: task.nsiderID
    }).project({
        nsider_page_id: 1,
        nsider_id: 1,
        page_num: 1,
        page_content: 1,
        sidebar_content: 1,
        date_created: 1,
        date_updated: 1,
        last_modified_by: 1,
        deleted: 1
    }).sort({
        page_num: 1
    });
    articlePages.toArray(function(err, pages) {
        if (err) {
            return callback(err);
        }
        task.article.pages = pages;
        return callback(null, task);
    });
}, 2);
