'use strict';

import mongoose from 'mongoose';

var TesteSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Teste', TesteSchema);
