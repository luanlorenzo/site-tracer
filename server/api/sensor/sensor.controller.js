/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sensors              ->  index
 * POST    /api/sensors              ->  create
 * GET     /api/sensors/:id          ->  show
 * PUT     /api/sensors/:id          ->  update
 * DELETE  /api/sensors/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Sensor from './sensor.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Sensors
export function index(req, res) {
  return Sensor.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Sensor from the DB
export function show(req, res) {
  return Sensor.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function iniciaCalibracao(req, res) {
  var socketio = req.app.get('socketio');
  socketio.emit('inicia_calibracao');

  console.log('broadcasting inicia_calibracao')

  return res.status(200).end();
}

export function enviaCalibracao(req, res) {
  var socketio = req.app.get('socketio');
  socketio.emit('calibra', req.body.peso);

  console.log('broadcasting calibra')

  return res.status(200).end();
}

// Creates a new Sensor in the DB
export function create(req, res) {
  return Sensor.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Sensor in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Sensor.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Sensor from the DB
export function destroy(req, res) {
  return Sensor.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
