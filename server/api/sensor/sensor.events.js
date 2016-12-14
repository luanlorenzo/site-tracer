/**
 * Sensor model events
 */

'use strict';

import {EventEmitter} from 'events';
import Sensor from './sensor.model';
var SensorEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SensorEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Sensor.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SensorEvents.emit(event + ':' + doc._id, doc);
    SensorEvents.emit(event, doc);
  }
}

export default SensorEvents;
