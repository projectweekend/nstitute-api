var util = require('util');


var exports = module.exports = {};


var composeMongoIP = process.env.MONGO_PORT_27017_TCP_ADDR;
if (composeMongoIP) {
    exports.mongoURL = util.format('mongodb://%s:27017/dev', composeMongoIP);
} else {
    exports.mongoURL = process.env.MONGO_URL;
}
