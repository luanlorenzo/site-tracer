'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var testeCtrlStub = {
  index: 'testeCtrl.index',
  show: 'testeCtrl.show',
  create: 'testeCtrl.create',
  update: 'testeCtrl.update',
  destroy: 'testeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var testeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './teste.controller': testeCtrlStub
});

describe('Teste API Router:', function() {

  it('should return an express router instance', function() {
    testeIndex.should.equal(routerStub);
  });

  describe('GET /api/testes', function() {

    it('should route to teste.controller.index', function() {
      routerStub.get
        .withArgs('/', 'testeCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/testes/:id', function() {

    it('should route to teste.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'testeCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/testes', function() {

    it('should route to teste.controller.create', function() {
      routerStub.post
        .withArgs('/', 'testeCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/testes/:id', function() {

    it('should route to teste.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'testeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/testes/:id', function() {

    it('should route to teste.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'testeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/testes/:id', function() {

    it('should route to teste.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'testeCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
