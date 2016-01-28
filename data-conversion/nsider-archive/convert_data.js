var async = require('async');
var MongoClient = require('mongodb').MongoClient;
var config = require('./app/config');
var PagesQueue = require('./data-conversion/utils/archive-pages-queue').PagesQueue;
var XrefQueue = require('./data-conversion/utils/archive-xref-queue').XrefQueue;
var AuthorsQueue = require('./data-conversion/utils/archive-authors-queue').AuthorsQueue;
var InsertQueue = require('./data-conversion/utils/archive-insert-queue').InsertQueue;
var dateOrNull = require('./data-conversion/utils/dates').dateOrNull;


var totalToInsert = 4161;
var insertedCount = 0;


function onPageCompleted(err, taskForXref) {
    if (err) {
        console.log('PagesQueue: ERROR!');
        process.exit(1);
    }
    XrefQueue.push(taskForXref, onXrefCompleted);
}


function onXrefCompleted(err, taskForAuthors) {
    if (err) {
        console.log('XrefQueue: ERROR!');
        process.exit(1);
    }
    AuthorsQueue.push(taskForAuthors, onAuthorCompleted);
}


function onAuthorCompleted(err, taskForInsert) {
    if (err) {
        console.log('AuthorsQueue: ERROR!');
        process.exit(1);
    }
    InsertQueue.push(taskForInsert, onInsertCompleted);
}


function onInsertCompleted(err) {
    if (err) {
        console.log('InsertQueue: ERROR!');
        process.exit(1);
    }
    insertedCount += 1;
    if (insertedCount === totalToInsert) {
        console.log('ALL DONE!');
        process.exit(0);
    }
}


MongoClient.connect(config.mongoURL, function(err, db) {
    if (err) {
        console.log('Could not connect to database');
        process.exit(2);
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
    db.collection('staging_archive_nsider').count(function(err, toProcess) {
        if (err) {
            console.log('Could not count records to process');
            process.exit(2);
        }
        archiveAtricles.forEach(function(article) {
            article.published_date = dateOrNull(article.published_date);
            article.date_created = dateOrNull(article.date_created);
            article.date_updated = dateOrNull(article.date_updated);
            var task = {
                db: db,
                article: article
            };
            PagesQueue.push(task, onPageCompleted);
        }, function(err) {
            if (err) {
                console.log('Could not create articles');
                process.exit(1);
            }
        });
    });
});
