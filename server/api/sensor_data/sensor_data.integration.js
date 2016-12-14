'use strict';

var app = require('../..');
import request from 'supertest';

var newSensorData;

describe('SensorData API:', function() {

  describe('GET /api/sensor_data', function() {
    var sensorDatas;

    beforeEach(function(done) {
      request(app)
        .get('/api/sensor_data')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          sensorDatas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      sensorDatas.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/sensor_data', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/sensor_data')
        .send({
          name: 'New SensorData',
          info: 'This is the brand new sensorData!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSensorData = res.body;
          done();
        });
    });

    it('should respond with the newly created sensorData', function() {
      newSensorData.name.should.equal('New SensorData');
      newSensorData.info.should.equal('This is the brand new sensorData!!!');
    });

  });

  describe('GET /api/sensor_data/:id', function() {
    var sensorData;

    beforeEach(function(done) {
      request(app)
        .get('/api/sensor_data/' + newSensorData._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          sensorData = res.body;
          done();
        });
    });

    afterEach(function() {
      sensorData = {};
    });

    it('should respond with the requested sensorData', function() {
      sensorData.name.should.equal('New SensorData');
      sensorData.info.should.equal('This is the brand new sensorData!!!');
    });

  });

  describe('PUT /api/sensor_data/:id', function() {
    var updatedSensorData;

    beforeEach(function(done) {
      request(app)
        .put('/api/sensor_data/' + newSensorData._id)
        .send({
          name: 'Updated SensorData',
          info: 'This is the updated sensorData!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSensorData = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSensorData = {};
    });

    it('should respond with the updated sensorData', function() {
      updatedSensorData.name.should.equal('Updated SensorData');
      updatedSensorData.info.should.equal('This is the updated sensorData!!!');
    });

  });

  describe('DELETE /api/sensor_data/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/sensor_data/' + newSensorData._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when sensorData does not exist', function(done) {
      request(app)
        .delete('/api/sensor_data/' + newSensorData._id)
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
