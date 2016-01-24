var async = require('async');
var MongoClient = require('mongodb').MongoClient;
var config = require('./app/config');
var ConversionManager = require('./data-conversion/utils/archive-converter').ConversionManager;


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
        var converter = new ConversionManager();
        converter.on('countProcessed', function(countProcessed) {
            if (countProcessed === toProcess) {
                console.log('ALL DONE!');
                process.exit(0);
            }
        });
        archiveAtricles.forEach(function(article) {
            var task = {
                db: db,
                article: article
            };
            converter.emit('getPages', task);
        }, function(err) {
            if (err) {
                console.log('Could not create articles');
                process.exit(1);
            }
        });
    });
});
