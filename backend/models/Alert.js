
const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  email: { type: String, required: true },
  city: { type: String, required: true },
  threshold: { type: Number, required: true },
});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;
