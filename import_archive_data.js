var fs = require('fs');
var csv = require('fast-csv');
var MongoClient = require('mongodb').MongoClient;
var config = require('./app/config');
var MongoCollectionWriter = require('./app/data-conversion/database').MongoCollectionWriter;

var csvConfig = {
    objectMode: true,
    headers: true
};

var inputFiles = [
    {
        mongoCollection: 'staging_archive_nsider_authors',
        mongoUniqueIndex: {
            xref_id: 1
        },
        fileStream: fs.createReadStream('./data-conversion/archive_nsider_authors.csv'),
        csvStream: csv(csvConfig)
    },
    {
        mongoCollection: 'staging_archive_nsider_pages',
        mongoUniqueIndex: {
            nsider_page_id: 1
        },
        fileStream: fs.createReadStream('./data-conversion/archive_nsider_pages.csv'),
        csvStream: csv(csvConfig)
    },
    {
        mongoCollection: 'staging_archive_nsider_staff',
        mongoUniqueIndex: {
            nsider_staff_id: 1
        },
        fileStream: fs.createReadStream('./data-conversion/archive_nsider_staff.csv'),
        csvStream: csv(csvConfig)
    },
    {
        mongoCollection: 'staging_archive_nsider',
        mongoUniqueIndex: {
            nsider_id: 1
        },
        fileStream: fs.createReadStream('./data-conversion/archive_nsider.csv'),
        csvStream: csv(csvConfig)
    }
];

MongoClient.connect(config.mongoURL, function(err, db) {
    inputFiles.forEach(function(item, index) {
        var collection = db.collection(item.mongoCollection);
        collection.createIndex(item.mongoUniqueIndex, {unique: true});
        var mongoCollectionWriter = new MongoCollectionWriter(collection);
        mongoCollectionWriter.on('end', function(data) {
            console.log(item.mongoCollection + ': DONE');
            if (index === (inputFiles.length - 1)) {
                process.exit(0);
            }
        });
        mongoCollectionWriter.on('error', function(err) {
            console.log(err);
            process.exit(1);
        });
        item.fileStream.pipe(item.csvStream).pipe(mongoCollectionWriter);
    });
});
