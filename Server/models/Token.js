const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  earnedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Token', tokenSchema);
