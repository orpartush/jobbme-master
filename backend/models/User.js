const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
  name: { type: String },
  positions: {
    type: [
      {
        title: { type: String, required: true },
        description: { type: String, required: false },
        company: { type: String, required: false },
        url: { type: String, required: false },
        stage: { type: String, required: false, default: 'Sent CV' },
        date: { type: Date, required: true },
        didAnswer: { type: Boolean, default: false },
        answer: { type: String, required: false },
        location: { type: String, required: false, default: 'Unknown' },
        number: { type: Number, required: false },
      },
    ],
    required: false,
  },
});

module.exports = mongoose.model('User', UserSchema);
