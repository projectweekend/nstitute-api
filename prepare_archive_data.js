var async = require('async');
var MongoClient = require('mongodb').MongoClient;
var config = require('./app/config');


async.waterfall([
    connectToMongo,
    getArchiveArticlesCursor,
    addPagesToArticles
], function(err, data) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    process.exit(0);
});


function connectToMongo(done) {
    MongoClient.connect(config.mongoURL, function(err, db) {
        if (err) {
            return done(err);
        }
        return done(null, db);
    });
}

function getArchiveArticlesCursor(db, done) {
    var archiveAtricles = db.collection('staging_archive_nsider').find().project({
        nsider_id: 1,
        title: 1,
        published_date: 1,
        spill: 1,
        style: 1,
        feature: 1,
        feature_blurb: 1,
        feature_img: 1,
        linked_type: 1,
        linked_id: 1,
        finished: 1,
        date_created: 1,
        date_updated: 1,
        last_modified_by: 1,
        deleted: 1
    });
    return done(null, db, archiveAtricles);
}

function addPagesToArticles(db, archiveArticlesCursor, done) {
    var articlePagesCollection = db.collection('staging_archive_nsider_pages');
    var newArticlesCollection = db.collection('nsider_archive');
    archiveArticlesCursor.forEach(function(article) {
        article.pages = [];
        var articlePages = articlePagesCollection.find({
            nsider_id: article.nsider_id
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
        articlePages.forEach(function(page) {
            article.pages.push(page);
        });
        newArticlesCollection.insert(article, function(err, doc) {
            if (err) {
                return done(err);
            }
            return done(null);
        });
    });
}
