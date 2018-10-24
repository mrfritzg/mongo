const mongoose = require('mongoose');

const obj = {
  name: { type: String, require: true },
  meat: { type: Boolean, require: true }
};

const toppingSchema = new mongoose.Schema(obj);

const Topping = mongoose.model('Topping', toppingSchema);

module.exports = Topping;
