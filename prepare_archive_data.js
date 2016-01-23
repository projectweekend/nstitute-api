var async = require('async');
var MongoClient = require('mongodb').MongoClient;
var config = require('./app/config');


var addPagesQueue = async.queue(function(task, done) {
    var newArticles = task.db.collection('nsider_archive');
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
            return done(err);
        }
        var filter = {nsider_id: task.nsiderID};
        var update = {$set:{pages: pages}};
        newArticles.findOneAndUpdate(filter, update, function(err) {
            if (err) {
                console.log('Error adding pages to article');
                process.exit(3);
            }
            return done();
        });
    });
}, 3);
addPagesQueue.drain = function() {
    console.log('Adding pages: DONE!');
};


var newArticleQueue = async.queue(function(task, done) {
    var newArticles = task.db.collection('nsider_archive');
    newArticles.insert(task.article, function(err) {
        if (err) {
            console.log('Error adding article');
            process.exit(2);
        }
        var nextTask = {
            db: task.db,
            nsiderID: task.article.nsider_id
        };
        addPagesQueue.push(nextTask);
        return done();
    });
}, 3);
newArticleQueue.drain = function() {
    console.log('Adding articles: DONE!');
};


MongoClient.connect(config.mongoURL, function(err, db) {
    if (err) {
        console.log('Could not connect to database');
        process.exit(1);
    }
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
    archiveAtricles.forEach(function(article) {
        newArticleQueue.push({
            db: db,
            article: article
        });
    });
});
