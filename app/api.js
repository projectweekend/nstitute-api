var restify = require('restify');
var middleware = require('./middleware');
var nsiderArchiveCollection = require('./nsider-archive/collection');
var nsiderArchiveItem = require('./nsider-archive/item');


var exports = module.exports = {};


exports.start = start;


function start(db) {
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
    return server;
}