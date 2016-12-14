/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sensor_data              ->  index
 * POST    /api/sensor_data              ->  create
 * GET     /api/sensor_data/:id          ->  show
 * PUT     /api/sensor_data/:id          ->  update
 * DELETE  /api/sensor_data/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import moment from 'moment';
import SensorData from './sensor_data.model';
import Sensor from '../sensor/sensor.model';

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

export function receive(req, res) {
  var date = req.query.data;

  var socketio = req.app.get('socketio');

  if(date) {
    console.log(date);
    date = moment(date, 'DD/MM/YYYY HH:mm:ss').toDate();
    console.log(date);
    console.log('Pegou data do arduino');
  }
  else {
    date = moment().toDate();
    console.log('Pegou data do servidor');
  }

  var query = _.omit(req.query, ['data']);

  for(var q in query) {
    Sensor.findOne({ alias: q }).exec()
      .then(sensor => {
        if(sensor) {
          var sensorData = new SensorData();
          sensorData.date = date;
          sensorData.value = query[q];
          sensorData.sensor = sensor._id;

          sensorData.save()
            .then(s => {
              console.log('Sensor data saved: ' + sensor.name);
              socketio.sockets.emit('data_arrived:' + sensor._id, sensorData);
              return s;
            });
        }
        return sensor;
      })
      .catch(err => {
        console.log(err);
      });
  }

  res.status(200).json({success: 1});
}

// Gets a list of SensorDatas with filters
export function getSensorData(req, res) {

  SensorData.find({
      'sensor': req.query.id,
      'date': { '$gte': req.query.date_start, '$lte': req.query.date_end}
  })
    .sort({
      'date': -1
    })
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function getLastRead(req, res) {

  SensorData.find({
      'sensor': req.params.sensorId
  })
    .sort({
      'date': -1
    })
    .limit(1)
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of SensorDatas
export function index(req, res) {
  return SensorData.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single SensorData from the DB
export function show(req, res) {
  return SensorData.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new SensorData in the DB
export function create(req, res) {
  return SensorData.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing SensorData in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return SensorData.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a SensorData from the DB
export function destroy(req, res) {
  return SensorData.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
