var MongoClient = require('mongodb').MongoClient;
var config = require('./app/config');
var api = require('./app/api');


MongoClient.connect(config.mongoURL, function(err, db) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Connected to MongoDB');
    api.start(db);
});
