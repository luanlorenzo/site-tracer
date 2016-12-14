'use strict';

var app = require('../..');
import request from 'supertest';

var newTeste;

describe('Teste API:', function() {

  describe('GET /api/testes', function() {
    var testes;

    beforeEach(function(done) {
      request(app)
        .get('/api/testes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          testes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      testes.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/testes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/testes')
        .send({
          name: 'New Teste',
          info: 'This is the brand new teste!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTeste = res.body;
          done();
        });
    });

    it('should respond with the newly created teste', function() {
      newTeste.name.should.equal('New Teste');
      newTeste.info.should.equal('This is the brand new teste!!!');
    });

  });

  describe('GET /api/testes/:id', function() {
    var teste;

    beforeEach(function(done) {
      request(app)
        .get('/api/testes/' + newTeste._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          teste = res.body;
          done();
        });
    });

    afterEach(function() {
      teste = {};
    });

    it('should respond with the requested teste', function() {
      teste.name.should.equal('New Teste');
      teste.info.should.equal('This is the brand new teste!!!');
    });

  });

  describe('PUT /api/testes/:id', function() {
    var updatedTeste;

    beforeEach(function(done) {
      request(app)
        .put('/api/testes/' + newTeste._id)
        .send({
          name: 'Updated Teste',
          info: 'This is the updated teste!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTeste = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTeste = {};
    });

    it('should respond with the updated teste', function() {
      updatedTeste.name.should.equal('Updated Teste');
      updatedTeste.info.should.equal('This is the updated teste!!!');
    });

  });

  describe('DELETE /api/testes/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/testes/' + newTeste._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when teste does not exist', function(done) {
      request(app)
        .delete('/api/testes/' + newTeste._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
