var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest( 'http://192.168.99.101:3000' );
// var api = supertest(server);


describe("get list of archive articles", function () {
    it("responds with articles", function (done) {
        api.get('/nsider-archive')
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
