var expect = require('chai').expect;
var supertest = require('supertest');
var MongoClient = require('mongodb').MongoClient;
var config = require('../app/config');
var api = require('../app/api');
var nstitute;

before(function(done) {
    MongoClient.connect(config.mongoURL, function(err, db) {
        if (err) {
            return done(err);
        }
        nstitute = supertest(api.start(db));
        done();
    });
});


describe("get list of archive articles", function () {
    it("responds with articles", function (done) {
        nstitute.get('/nsider-archive')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(10);
                done();
            });
    });
});
