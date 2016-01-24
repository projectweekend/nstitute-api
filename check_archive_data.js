var MongoClient = require('mongodb').MongoClient;
var config = require('./app/config');


MongoClient.connect(config.mongoURL, function(err, db) {
    var newArticlesCollection = db.collection('nsider_archive');
    newArticlesCollection.count(function(err, count) {
        console.log(count);
    });
});
