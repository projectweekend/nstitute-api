var restify = require('restify');

var serverConfig = {
    name: 'nstitute-api'
};

var server = restify.createServer();

server.listen(3000);
