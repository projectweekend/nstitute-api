var restify = require('restify');


var server = restify.createServer({
    name: 'nstitute-api'
});

server.use(restify.CORS());
server.use(restify.queryParser());

server.listen(3000);
