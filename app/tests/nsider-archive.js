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
                var article = res.body[0];
                expect(article.nsider_id).to.be.a('string');
                expect(article.title).to.be.a('string');
                expect(article.published_date).to.be.a('string');
                expect(article.spill).to.be.a('string');
                expect(article.style).to.be.a('string');
                expect(article.feature).to.be.a('string');
                expect(article.feature_blurb).to.be.a('string');
                expect(article.feature_img).to.be.a('string');
                expect(article.linked_type).to.be.a('string');
                expect(article.linked_id).to.be.a('string');
                expect(article.finished).to.be.a('string');
                expect(article.date_created).to.be.a('string');
                expect(article.date_updated).to.be.a('string');
                expect(article.deleted).to.be.a('string');
                expect(article.pages).to.be.an('array');
                expect(article.authors).to.be.an('array');
                done();
            });
    });
});


describe("get list of archive articles with skip & take", function () {
    it("responds with the correct number of articles", function (done) {
        nstitute.get('/nsider-archive?skip=0&take=1')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(1);
                done();
            });
    });
});


describe("get list of archive articles with take above max", function () {
    it("responds with no more than 50 articles", function (done) {
        nstitute.get('/nsider-archive?skip=0&take=100')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(50);
                done();
            });
    });
});


describe("get a single article that exists", function () {
    it("responds with an article", function (done) {
        nstitute.get('/nsider-archive/4207')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.body).to.be.an('object');
                var article = res.body;
                expect(article.nsider_id).to.be.a('string');
                expect(article.title).to.be.a('string');
                expect(article.published_date).to.be.a('string');
                expect(article.spill).to.be.a('string');
                expect(article.style).to.be.a('string');
                expect(article.feature).to.be.a('string');
                expect(article.feature_blurb).to.be.a('string');
                expect(article.feature_img).to.be.a('string');
                expect(article.linked_type).to.be.a('string');
                expect(article.linked_id).to.be.a('string');
                expect(article.finished).to.be.a('string');
                expect(article.date_created).to.be.a('string');
                expect(article.date_updated).to.be.a('string');
                expect(article.deleted).to.be.a('string');
                expect(article.pages).to.be.an('array');
                expect(article.authors).to.be.an('array');
                done();
            });
    });
});


describe("get a single article that does not exist", function () {
    it("responds with a 404", function (done) {
        nstitute.get('/nsider-archive/99999')
            .expect(404)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});
