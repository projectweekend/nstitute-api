var async = require('async');
var dateOrNull = require('../utils/dates').dateOrNull;


var exports = module.exports = {};


function fixPageDates(page) {
    page.date_created = dateOrNull(page.date_created);
    page.date_updated = dateOrNull(page.date_updated);
    return page;
}


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
        task.article.pages = pages.map(fixPageDates);
        return callback(null, task);
    });
}, 2);
