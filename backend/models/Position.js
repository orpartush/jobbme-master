const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  company: { type: String, required: false },
  url: { type: String, required: false },
  stage: { type: String, required: false, default: 'Sent CV' },
  date: { type: Date, required: true },
  didAnswer: { type: Boolean, default: false },
  answer: { type: String, required: false },
  location: { type: String, required: false, default: 'Unknown' },
});

module.exports = mongoose.model('Position', PositionSchema);
