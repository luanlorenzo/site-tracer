'use strict';

import mongoose from 'mongoose';

var SensorSchema = new mongoose.Schema({
  name: String,
  info: String,
  alias: String,
  unit: String,
  data: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SensorData'
  }],
  active: Boolean
});

export default mongoose.model('Sensor', SensorSchema);
