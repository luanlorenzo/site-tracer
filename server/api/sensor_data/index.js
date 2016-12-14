'use strict';

var express = require('express');
var controller = require('./sensor_data.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/get_sensor_data/:sensorId', controller.getSensorData);
router.get('/get_last_read/:sensorId', controller.getLastRead);
router.get('/send', controller.receive);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
