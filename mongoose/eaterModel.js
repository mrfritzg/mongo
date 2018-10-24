const mongoose = require('mongoose');

const obj = {
  name: { type: String, require: true },
  vegetarian: { type: Boolean, require: true }
};

const eaterSchema = new mongoose.Schema(obj);

const Eater = mongoose.model('Eater', eaterSchema);

module.exports = Eater;
