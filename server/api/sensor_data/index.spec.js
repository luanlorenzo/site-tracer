'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var sensorDataCtrlStub = {
  index: 'sensorDataCtrl.index',
  show: 'sensorDataCtrl.show',
  create: 'sensorDataCtrl.create',
  update: 'sensorDataCtrl.update',
  destroy: 'sensorDataCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var sensorDataIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './sensor_data.controller': sensorDataCtrlStub
});

describe('SensorData API Router:', function() {

  it('should return an express router instance', function() {
    sensorDataIndex.should.equal(routerStub);
  });

  describe('GET /api/sensor_data', function() {

    it('should route to sensorData.controller.index', function() {
      routerStub.get
        .withArgs('/', 'sensorDataCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/sensor_data/:id', function() {

    it('should route to sensorData.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'sensorDataCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/sensor_data', function() {

    it('should route to sensorData.controller.create', function() {
      routerStub.post
        .withArgs('/', 'sensorDataCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/sensor_data/:id', function() {

    it('should route to sensorData.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'sensorDataCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/sensor_data/:id', function() {

    it('should route to sensorData.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'sensorDataCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/sensor_data/:id', function() {

    it('should route to sensorData.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'sensorDataCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
