const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  suite('GET /api/convert => conversion object', function() {
    //17.Convert a valid input such as 10L: GET request to /api/convert.
    test('Convert 10L (valid input)', function(done) {
      chai.request(server)
        .get('/api/convert')
        .query({ input: '10L' })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'L');
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
          done();
        });
    });

    //18.Convert an invalid input such as 32g: GET request to /api/convert.
    test('Convert 32g (invalid input unit)', function(done) {
      chai.request(server)
        .get('/api/convert')
        .query({ input: '32g' })
        .end((error, response) => {
          assert.equal(response.status, 200);
          assert.equal(response.body, 'invalid unit');
        });
      done();
    });

    //23.This checks the api route with an input of 3/7.2/4 kilograms.
    test('Convert 3/7.2/4kg (invalid number)', function(done) {
      chai.request(server)
        .get('/api/convert')
        .query({ input: '3/7.2/4kg' })
        .end((error, response) => {
          assert.equal(response.status, 200);
          assert.equal(response.body, 'invalid number');
        });
      done();
    });
    //25.Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.
    test('Convert 3/7.2/4kilomegagram (invalid number and unit)', function(done) {
      chai.request(server)
        .get('/api/convert')
        .query({ input: '3/7.2/4kilomegagram' })
        .end((error, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body, 'invalid number and unit');
        });
      done();
    });
    //33.Convert with no number such as kg: GET request to /api/convert. This makes a call to the api, giving just a unit, like 'kg' and check that the value of 1kg in pounds is returned in the returnNum field.
    test('Convert kg (no number)', function(done) {
      chai.request(server)
        .get('/api/convert')
        .query({ input: 'kg' })
        .end((error, response) => {
          assert.equal(response.status, 200);
          assert.equal(response.body.initNum, 1);
          assert.equal(response.body.initUnit, 'kg');
        });
      done();
    });
  });
  after(function() {
    chai.request(server)
      .get('/')
  });
});
