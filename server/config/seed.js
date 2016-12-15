/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import moment from 'moment';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Sensor from '../api/sensor/sensor.model'
import SensorData from '../api/sensor_data/sensor_data.model'

Sensor.find({}).remove()
  .then(() => {
    Sensor.create({
      name: 'Modulo Convencional - Temperatura',
      alias: 'mod_conv_temp',
      idModulo: 1,
      idSensor: 1,
      unit: 'ºC'
    },{
      name: 'Módulo Vidro e Silicone - Temperatura',
      alias: 'mod_vidsil_temp',
      idModulo: 2,
      idSensor: 1,
      unit: 'ºC'
    },{
      name: 'Módulo Vidro e EVA - Temperatura',
      alias: 'mod_videva_temp',
      idModulo: 3,
      idSensor: 1,
      unit: 'ºC'
    },{
      name: 'Módulo Semiflexivel - Temperatura',
      alias: 'mod_semi_temp',
      idModulo: 4,
      idSensor: 1,
      unit: 'ºC'
    },{
      name: 'Módulo PU - Temperatura',
      alias: 'mod_pu_temp',
      idModulo: 5,
      idSensor: 1,
      unit: 'ºC'
    },{
      name: 'Módulo de Referência 1',
      alias: 'mod_ref1_temp',
      idModulo: 6,
      idSensor: 5,
      unit: 'W/m²'
    },{
      name: 'Módulo de Referência 2',
      alias: 'mod_ref2_temp',
      idModulo: 7,
      idSensor: 5,
      unit: 'W/m²'
    },{
      name: 'Radiação Piranometro',
      alias: 'mod_radpira_temp',
      idModulo: 0,
      idSensor: 6,
      unit: 'W/m²'
    }).then(() => {
      Sensor.findOne().exec()
        .then(sensor => {

          SensorData.find({}).remove()
            .then(() => {
              var date = moment();

              for (var i = 0; i < 0; i++) {
                var _date = date.add(10, 'minutes');
                var sensorData = new SensorData();
                sensorData.date = _date;
                sensorData.value = Math.random() * 30;
                sensorData.sensor = sensor._id;

                sensorData.save();
              }
            })
        });
    })
  });


User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
