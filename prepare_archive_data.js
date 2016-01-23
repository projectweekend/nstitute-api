var async = require('async');
var MongoClient = require('mongodb').MongoClient;
var config = require('./app/config');


async.waterfall([
    connectToMongo,
    addDetailsToArticles
], function(err, data) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('ALL DONE!');
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


function addDetailsToArticles(db, done) {
    var archiveArticlesCursor = getArchiveArticlesCursor(db);
    archiveArticlesCursor.forEach(function(article) {
        // add pages to articles
        article.pages = [];
        var articlePages = getArchiveArticlePagesForByID(db, article.nsider_id);
        articlePages.forEach(function(page) {
            article.pages.push(page);
        });

        // find author xref for article
        var authorsXref = getArchiveArticleAuthorsXrefByID(db, article.nsider_id);

        // add staff to article for xref
        article.staff = [];
        authorsXref.forEach(function(xref) {
            var staff = getArchiveStaffByID(xref.nsider_staff_id);
            staff.forEach(function(s) {
                s.display_order = xref.display_order;
                s.contributor = xref.contributor;
                article.staff.push(s);
            });
        });

        // add prepared article to new collection
        var newArticlesCollection = db.collection('nsider_archive');
        newArticlesCollection.insert(article, function(err, doc) {
            if (err) {
                return done(err);
            }
            return done(null, db);
        });
    });
}


function getArchiveArticlesCursor(db) {
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
    return archiveAtricles;
}


function getArchiveArticlePagesForByID(db, nsiderID) {
    var articlePages = db.collection('staging_archive_nsider_pages').find({
        nsider_id: nsiderID
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
    return articlePages;
}


function getArchiveArticleAuthorsXrefByID(db, nsiderID) {
    var authorsXref = db.collection('staging_archive_nsider_authors').find({
        nsider_id: nsiderID
    }).project({
        nsider_id: 1,
        nsider_staff_id: 1,
        display_order: 1,
        contributor: 1
    }).sort({
        display_order: 1
    });
    return authorsXref;
}


function getArchiveStaffByID(db, nsiderStaffID) {
    var staff = db.collection('staging_archive_staff').find({
        nsider_staff_id: nsiderStaffID
    }).project({
        nsider_staff_id: 1,
        first_name: 1,
        last_name: 1,
        date_created: 1,
        date_updated: 1,
        last_modified_by: 1,
        deleted: 1
    });
    return staff;
}
