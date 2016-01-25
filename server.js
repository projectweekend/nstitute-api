var restify = require('restify');
var MongoClient = require('mongodb').MongoClient;
var config = require('./app/config');
var middleware = require('./app/middleware');
var nsiderArchiveCollection = require('./app/nsider-archive/collection');
var nsiderArchiveItem = require('./app/nsider-archive/item');


MongoClient.connect(config.mongoURL, function(err, db) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Connected to MongoDB');
    // configure
    var server = restify.createServer({
        name: 'nstitute-api'
    });

    // add middleware
    server.use(restify.CORS());
    server.use(restify.queryParser());
    server.use(middleware.addDatabase(db));
    server.use(middleware.parseSkipTake);

    // add routes
    server.get('/nsider-archive', nsiderArchiveCollection.get);
    server.get('/nsider-archive/:nsiderID', nsiderArchiveItem.get);

    // start
    server.listen(3000);
});
