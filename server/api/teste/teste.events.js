/**
 * Teste model events
 */

'use strict';

import {EventEmitter} from 'events';
import Teste from './teste.model';
var TesteEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TesteEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Teste.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TesteEvents.emit(event + ':' + doc._id, doc);
    TesteEvents.emit(event, doc);
  }
}

export default TesteEvents;
