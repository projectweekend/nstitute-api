var MongoClient = require('mongodb').MongoClient;
var config = require('../config');
var api = require('../api');


var exports = module.exports = {};


// Starts app with Mongo connection and returns app instance
// in callback for use with supertest
exports.startApp = function(done) {
    MongoClient.connect(config.mongoURL, function(err, db) {
        /* istanbul ignore if */
        if (err) {
            return done(err);
        }
        return done(null, api.start(db));
    });
};
