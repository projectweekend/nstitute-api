var expect = require('chai').expect;
var supertest = require('supertest');
var startApp = require('../utils/testing').startApp;


describe("nsider-archive by year", function () {
    var nstitute;
    var app;
    before(function(done) {
        startApp(function(err, api) {
            if (err) {
                return done(err);
            }
            app = api;
            nstitute = supertest(api);
            done();
        });
    });

    after(function(done) {
        app.close();
        done();
    });

    describe("get list of articles", function () {
        it("responds with only articles from that year", function (done) {
            nstitute.get('/nsider-archive/year/2011')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(10);
                res.body.forEach(function(article) {
                    expect(article.year).to.equal(2011);
                });
                done();
            });
        });
    });
});
