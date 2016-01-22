var MongoClient = require('mongodb').MongoClient;
var config = require('./app/config');


MongoClient.connect(config.mongoURL, function(err, db) {
    var newArticlesCollection = db.collection('nsider_archive');
    var newArticles = newArticlesCollection.find();
    newArticles.forEach(function(article) {
        console.log(article);
        process.exit(0);
    });
});
