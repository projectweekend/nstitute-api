var async = require('async');
var EventEmitter = require('events');
var util = require('util');


var exports = module.exports = {};
exports.ConversionManager = ConversionManager;


function ConversionManager() {
    var _this = this;
    EventEmitter.call(_this);
    _this.countProcessed = 0;
    _this.on('error', function(err) {
        console.log(err);
        process.exit(1);
    });
    _this.on('getPages', function(task) {
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
                _this.emit('error', 'Error getting pages for article');
                return;
            }
            task.article.pages = pages;
            _this.emit('getXref', task);
        });
    });
    _this.on('getXref', function(task) {
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
                _this.emit('error', 'Error getting article xrefs');
                return;
            }
            task.xrefs = xrefs;
            _this.emit('getAuthors', task);
        });
    });
    _this.on('getAuthors', function(task) {
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
                _this.emit('error', 'Error getting authors for xref');
                return;
            }
            task.article.authors = authors;
            _this.emit('insert', task);
        });
    });
    _this.on('insert', function(task) {
        task.db.collection('nsider_archive').insert(task.article, function(err) {
            if (err) {
                _this.emit('error', 'Error saving article');
                return;
            }
            _this.countProcessed += 1;
            _this.emit('countProcessed', _this.countProcessed);
        });
    });
}
util.inherits(ConversionManager, EventEmitter);
