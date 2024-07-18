const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  steps: { type: Number, required: true },
  distance: { type: Number, required: true },
  duration: { type: Number, required: true }, // Thời gian hoạt động (phút)
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', activitySchema);
