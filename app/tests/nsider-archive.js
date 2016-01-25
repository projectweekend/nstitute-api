var expect = require('chai').expect;
var supertest = require('supertest');
var startApp = require('../utils/testing').startApp;
var nstitute;

before(function(done) {
    startApp(function(err, app) {
        if (err) {
            return done(err);
        }
        nstitute = supertest(app);
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
